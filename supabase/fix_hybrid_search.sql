
-- Update the search function to handle NULL embeddings gracefully
-- by using COALESCE on similarity scores.

create or replace function public.search_posts_hybrid(
  query_embedding vector(768),
  query_text text,
  match_count int default 10
)
returns table (
  id uuid,
  title text,
  slug text,
  excerpt text,
  featured_image text,
  published_at timestamp with time zone,
  category_id uuid,
  semantic_similarity float,
  keyword_score real
)
language plpgsql
as $$
begin
  return query
  with semantic_matches as (
    select
      blog_posts.id,
      (1 - (blog_posts.embedding <=> query_embedding)) as similarity
    from public.blog_posts
    where blog_posts.embedding is not null
  ),
  keyword_matches as (
    select
      blog_posts.id,
      ts_rank(
        to_tsvector('portuguese', coalesce(blog_posts.title, '') || ' ' || coalesce(blog_posts.excerpt, '') || ' ' || coalesce(blog_posts.content, '')),
        websearch_to_tsquery('portuguese', query_text)
      ) as keyword_rank
    from public.blog_posts
  )
  select
    p.id,
    p.title,
    p.slug,
    p.excerpt,
    p.featured_image,
    p.published_at,
    p.category_id,
    coalesce(sm.similarity, 0.0) as semantic_similarity,
    coalesce(km.keyword_rank, 0.0) as keyword_score
  from public.blog_posts p
  left join semantic_matches sm on sm.id = p.id
  left join keyword_matches km on km.id = p.id
  where p.status = 'published' and p.published_at <= now()
  order by (coalesce(sm.similarity, 0.0) * 0.7) + (coalesce(km.keyword_rank, 0.0) * 0.3) desc
  limit match_count;
end;
$$;
