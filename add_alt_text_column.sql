
-- Add featured_image_alt column to blog_posts
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS featured_image_alt TEXT;

-- Verify
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'blog_posts' AND column_name = 'featured_image_alt';
