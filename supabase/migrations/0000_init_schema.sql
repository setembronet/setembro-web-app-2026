-- Enable pgvector extension for RAG
create extension if not exists vector;

-- Enums
create type service_category as enum (
  'development',
  'systems',
  'automation',
  'marketing',
  'seo',
  'design',
  'hosting'
);

create type lead_status as enum (
  'new',
  'contacted',
  'qualified',
  'converted',
  'lost'
);

-- Trigger Function for updated_at
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Services Table
create table services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null,
  category service_category not null,
  features jsonb default '[]'::jsonb,
  price_range text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create trigger set_timestamp_services before update on services for each row execute procedure handle_updated_at();

-- Category Table
create table categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create trigger set_timestamp_categories before update on categories for each row execute procedure handle_updated_at();

-- Authors Table (NEW)
create table authors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  bio text,
  avatar_url text,
  social_links jsonb default '{}'::jsonb, -- { twitter, linkedin, github }
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create trigger set_timestamp_authors before update on authors for each row execute procedure handle_updated_at();

-- Blog Posts Table
create table blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  content text not null,
  excerpt text,
  cover_image text,
  category_id uuid references categories(id),
  author_id uuid references authors(id), -- Linked to authors table
  seo_metadata jsonb default '{}'::jsonb,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create trigger set_timestamp_blog_posts before update on blog_posts for each row execute procedure handle_updated_at();

-- Leads Table
create table leads (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  user_name text not null,
  user_email text not null,
  user_phone text,
  message text,
  metadata jsonb default '{}'::jsonb,
  status lead_status default 'new',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create trigger set_timestamp_leads before update on leads for each row execute procedure handle_updated_at();

-- AI Agents Table
create table ai_agents (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  role text not null,
  system_prompt text not null,
  temperature float default 0.7,
  model_config jsonb default '{}'::jsonb,
  avatar_url text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create trigger set_timestamp_ai_agents before update on ai_agents for each row execute procedure handle_updated_at();

-- Chat History Table
create table chat_history (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid references ai_agents(id),
  user_id uuid,
  session_id text not null,
  messages jsonb default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create trigger set_timestamp_chat_history before update on chat_history for each row execute procedure handle_updated_at();

-- Document Chunks Table (RAG)
create table document_chunks (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  metadata jsonb default '{}'::jsonb,
  embedding vector(1536),
  created_at timestamptz default now()
);
-- No updated_at for chunks usually, but can add if needed. Content usually immutable or replaced.

-- Indexes
create index idx_services_category on services(category);
create index idx_blog_posts_slug on blog_posts(slug);
create index idx_blog_posts_category on blog_posts(category_id);
create index idx_blog_posts_author on blog_posts(author_id);
create index idx_chat_history_session on chat_history(session_id);

-- RAG Search Function
create or replace function match_documents (
  query_embedding vector(1536),
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
  from document_chunks
  where 1 - (embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;
