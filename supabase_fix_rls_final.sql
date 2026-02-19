-- FINAL RLS FIX
-- Run this in Supabase SQL Editor

BEGIN;

-- 1. Enable RLS (just in case)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow public read access on blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Public can view all posts" ON blog_posts;
DROP POLICY IF EXISTS "Public can view published posts" ON blog_posts;

DROP POLICY IF EXISTS "Allow public read access on categories" ON categories;
DROP POLICY IF EXISTS "Public can view all categories" ON categories;

DROP POLICY IF EXISTS "Allow public read access on authors" ON authors;
DROP POLICY IF EXISTS "Public can view all authors" ON authors;

-- 3. Create permissive public read policies
CREATE POLICY "Public can view all posts" ON blog_posts FOR SELECT TO public USING (true);
CREATE POLICY "Public can view all categories" ON categories FOR SELECT TO public USING (true);
CREATE POLICY "Public can view all authors" ON authors FOR SELECT TO public USING (true);

-- 4. Grant usage on schema just in case
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;

GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO service_role;

COMMIT;
