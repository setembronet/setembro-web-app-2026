-- FIX SCHEMA & DATA TYPES SCRIPT v4
-- Copy and run in Supabase SQL Editor

BEGIN;

-- 1. Create Categories Table (if missing)
CREATE TABLE IF NOT EXISTS categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Create Authors Table (if missing)
CREATE TABLE IF NOT EXISTS authors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  bio text,
  avatar_url text,
  social_links jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. Fix Column Types in blog_posts (Crucial Step: Ensure UUID)
-- We use a safe cast. If data is not a valid UUID, it becomes NULL to avoid crashing
-- This handles the text to uuid conversion that was failing

DO $$
BEGIN
    -- Check if category_id is text
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'blog_posts' 
        AND column_name = 'category_id' 
        AND data_type = 'text'
    ) THEN
        -- Safely convert to UUID. Invalid UUID strings become NULL.
        -- We try casting directly if valid uuid string, else null
        ALTER TABLE blog_posts 
        ALTER COLUMN category_id TYPE uuid 
        USING (CASE WHEN category_id ~ '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$' THEN category_id::uuid ELSE NULL END);
    END IF;
END $$;

-- 4. Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- 5. Create Public Access Policies (Drop old ones to be safe)
DROP POLICY IF EXISTS "Allow public read access on authors" ON authors;
CREATE POLICY "Allow public read access on authors" ON authors FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Allow public read access on categories" ON categories;
CREATE POLICY "Allow public read access on categories" ON categories FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Allow public read access on blog_posts" ON blog_posts;
CREATE POLICY "Allow public read access on blog_posts" ON blog_posts FOR SELECT TO public USING (true);

-- 6. Insert Default Data (Seed)
DO $$
DECLARE
  default_author_id uuid;
  default_category_id uuid;
BEGIN
  -- Ensure at least one author exists
  INSERT INTO authors (name, bio)
  VALUES ('Equipe Setembro.net', 'Equipe de conteúdo oficial.')
  ON CONFLICT DO NOTHING;
  
  SELECT id INTO default_author_id FROM authors LIMIT 1;

  -- Ensure at least one category exists
  INSERT INTO categories (name, slug, description)
  VALUES ('Geral', 'geral', 'Conteúdos gerais.')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO default_category_id FROM categories WHERE slug = 'geral' LIMIT 1;

  -- 7. Fix Orphan Posts
  -- Uses the ID variables which are UUIDs, matching the column type we just fixed
  UPDATE blog_posts 
  SET author_id = default_author_id 
  WHERE author_id IS NULL OR author_id NOT IN (SELECT id FROM authors);

  UPDATE blog_posts 
  SET category_id = default_category_id 
  WHERE category_id IS NULL OR category_id NOT IN (SELECT id FROM categories);
  
END $$;

COMMIT;
