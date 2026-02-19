-- FIX FOREIGN KEYS & RELOAD SCHEMA
BEGIN;

-- 1. Ensure Foreign Keys exist explicitly
ALTER TABLE blog_posts 
DROP CONSTRAINT IF EXISTS blog_posts_category_id_fkey;

ALTER TABLE blog_posts
ADD CONSTRAINT blog_posts_category_id_fkey
FOREIGN KEY (category_id) REFERENCES categories(id)
ON DELETE SET NULL;

ALTER TABLE blog_posts 
DROP CONSTRAINT IF EXISTS blog_posts_author_id_fkey;

ALTER TABLE blog_posts
ADD CONSTRAINT blog_posts_author_id_fkey
FOREIGN KEY (author_id) REFERENCES authors(id)
ON DELETE SET NULL;

-- 2. Notify PostgREST to reload schema
NOTIFY pgrst, 'reload config';

COMMIT;
