
-- Add faq_items column to blog_posts
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS faq_items JSONB DEFAULT '[]'::jsonb;

-- Verify
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'blog_posts' AND column_name = 'faq_items';
