
-- 1. Create document_chunks table with 768 dimensions for Gemini
create table if not exists public.document_chunks (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  metadata jsonb default '{}'::jsonb,
  embedding vector(768),
  created_at timestamptz default now()
);

-- 2. Create index for performance
create index if not exists idx_document_chunks_embedding 
on public.document_chunks using hnsw (embedding vector_cosine_ops);

-- 3. Update the hybrid search function to prioritize RAG if needed,
-- but for now ensure it refers to the right tables and dimensions.
-- The current search_posts_hybrid uses blog_posts.embedding.
-- Let's ensure blog_posts also has 768.

alter table public.blog_posts 
alter column embedding type vector(768);

-- 4. Create an additional match function specifically for the chunks if Ana needs it
create or replace function public.match_document_chunks (
  query_embedding vector(768),
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
)
language sql stable
as $$
  select
    id,
    content,
    metadata,
    1 - (embedding <=> query_embedding) as similarity
  from public.document_chunks
  where 1 - (embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;
