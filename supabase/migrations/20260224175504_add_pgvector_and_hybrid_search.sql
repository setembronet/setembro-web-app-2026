-- 1. Enable the pgvector extension to work with embedding vectors
create extension if not exists vector;

-- 2. Add an "embedding" column to the blog_posts table. 
-- The dimension for Gemini's text-embedding-004 is 768.
alter table public.blog_posts 
add column if not exists embedding vector(768);

-- 3. Create an HNSW index to optimize vector searches (cosine distance)
create index on public.blog_posts using hnsw (embedding vector_cosine_ops);

-- 4. Create an RPC function for Hybrid Search 
-- (Combines semantic similarity from embeddings and keyword match from text search)
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
    -- Cosine similarity: 1 - cosine distance
    -- (<=> is the cosine distance operator in pgvector)
    select
      blog_posts.id,
      (1 - (blog_posts.embedding <=> query_embedding)) as similarity
    from public.blog_posts
    -- You can add a threshold here if needed, eg.: where 1 - (embedding <=> query_embedding) > 0.3
  ),
  keyword_matches as (
    -- FTS (Full Text Search) using Portuguese config if available or simple
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
    sm.similarity as semantic_similarity,
    coalesce(km.keyword_rank, 0.0) as keyword_score
  from public.blog_posts p
  left join semantic_matches sm on sm.id = p.id
  left join keyword_matches km on km.id = p.id
  -- We only return posts that are published and not in the future
  where p.status = 'published' and p.published_at <= now()
  -- Order combining both scores (simple addition for now, can be weighted)
  order by (sm.similarity * 0.7) + (coalesce(km.keyword_rank, 0.0) * 0.3) desc
  limit match_count;
end;
$$;
