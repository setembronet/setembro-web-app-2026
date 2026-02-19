-- Evolve blog_posts table for SEO and Blocks
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS reading_time INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS content_blocks JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS meta_title TEXT,
ADD COLUMN IF NOT EXISTS meta_description TEXT,
ADD COLUMN IF NOT EXISTS canonical_url TEXT;

-- Add index for is_featured for quick filtering
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(is_featured);
