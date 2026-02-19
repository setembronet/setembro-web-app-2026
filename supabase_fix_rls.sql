-- FIX RLS POLICIES SCRIPT
-- Copy and run in Supabase SQL Editor

BEGIN;

-- 1. Blog Posts Policies
-- Allow authenticated users (Admins) to ALL operations
DROP POLICY IF EXISTS "Allow authenticated insert on blog_posts" ON blog_posts;
CREATE POLICY "Allow authenticated insert on blog_posts" ON blog_posts FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated update on blog_posts" ON blog_posts;
CREATE POLICY "Allow authenticated update on blog_posts" ON blog_posts FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated delete on blog_posts" ON blog_posts;
CREATE POLICY "Allow authenticated delete on blog_posts" ON blog_posts FOR DELETE TO authenticated USING (true);

-- Ensure public read is still there
DROP POLICY IF EXISTS "Allow public read access on blog_posts" ON blog_posts;
CREATE POLICY "Allow public read access on blog_posts" ON blog_posts FOR SELECT TO public USING (true);


-- 2. Authors Policies
DROP POLICY IF EXISTS "Allow authenticated all on authors" ON authors;
CREATE POLICY "Allow authenticated all on authors" ON authors FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read access on authors" ON authors;
CREATE POLICY "Allow public read access on authors" ON authors FOR SELECT TO public USING (true);


-- 3. Categories Policies
DROP POLICY IF EXISTS "Allow authenticated all on categories" ON categories;
CREATE POLICY "Allow authenticated all on categories" ON categories FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read access on categories" ON categories;
CREATE POLICY "Allow public read access on categories" ON categories FOR SELECT TO public USING (true);

COMMIT;
