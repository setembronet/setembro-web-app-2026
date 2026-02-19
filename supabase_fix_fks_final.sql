
-- Final Fix for Foreign Keys and Column Types
-- Run this in the Supabase Dashboard SQL Editor

BEGIN;

-- 1. Ensure Categories table exists and has correct structure
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Ensure Authors table exists
CREATE TABLE IF NOT EXISTS public.authors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Fix blog_posts column types (Force UUID)
-- We use USING to convert existing text to uuid if needed
ALTER TABLE public.blog_posts 
    ALTER COLUMN category_id TYPE UUID USING category_id::uuid,
    ALTER COLUMN author_id TYPE UUID USING author_id::uuid;

-- 4. Drop existing constraints if they exist (to clean up)
ALTER TABLE public.blog_posts DROP CONSTRAINT IF EXISTS blog_posts_category_id_fkey;
ALTER TABLE public.blog_posts DROP CONSTRAINT IF EXISTS fk_blog_category;
ALTER TABLE public.blog_posts DROP CONSTRAINT IF EXISTS blog_posts_author_id_fkey;
ALTER TABLE public.blog_posts DROP CONSTRAINT IF EXISTS fk_blog_author;

-- 5. Helper: Insert 'Geral' category if not exists (to avoid orphan keys)
DO $$
DECLARE
    geral_id UUID;
BEGIN
    SELECT id INTO geral_id FROM public.categories WHERE slug = 'geral';
    
    IF geral_id IS NULL THEN
        INSERT INTO public.categories (name, slug, description)
        VALUES ('Geral', 'geral', 'Categoria padrão')
        RETURNING id INTO geral_id;
    END IF;

    -- Update any posts with NULL or invalid category_id to 'Geral'
    UPDATE public.blog_posts 
    SET category_id = geral_id 
    WHERE category_id IS NULL 
       OR category_id NOT IN (SELECT id FROM public.categories);
       
    -- Create Default Author if needed
    IF NOT EXISTS (SELECT 1 FROM public.authors LIMIT 1) THEN
        INSERT INTO public.authors (name, bio) VALUES ('Equipe Setembro.net', 'Autores do Blog');
    END IF;
    
    -- Update posts with invalid author to the first author found
    UPDATE public.blog_posts
    SET author_id = (SELECT id FROM public.authors LIMIT 1)
    WHERE author_id IS NULL
       OR author_id NOT IN (SELECT id FROM public.authors);
END $$;

-- 6. Add Foreign Key Constraints
ALTER TABLE public.blog_posts
    ADD CONSTRAINT blog_posts_category_id_fkey 
    FOREIGN KEY (category_id) REFERENCES public.categories(id)
    ON DELETE SET NULL;

ALTER TABLE public.blog_posts
    ADD CONSTRAINT blog_posts_author_id_fkey 
    FOREIGN KEY (author_id) REFERENCES public.authors(id)
    ON DELETE SET NULL;

-- 7. Grant permissions just in case
GRANT SELECT ON public.categories TO anon, authenticated, service_role;
GRANT SELECT ON public.authors TO anon, authenticated, service_role;

COMMIT;
