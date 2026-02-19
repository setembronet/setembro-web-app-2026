
-- Add status column and migrate data
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft';

-- Migrate existing boolean to status
UPDATE public.blog_posts 
SET status = CASE 
    WHEN is_published = true THEN 'published' 
    ELSE 'draft' 
END;

-- Verify
SELECT id, title, is_published, status FROM public.blog_posts LIMIT 5;

-- Optional: Drop is_published after verifying (or keep for backward compat for a bit)
-- ALTER TABLE public.blog_posts DROP COLUMN is_published;
