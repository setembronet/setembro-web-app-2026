-- Enable RLS on tables if not already enabled
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on blog_posts"
ON blog_posts FOR SELECT
TO public
USING (true); -- Or (is_published = true) depending on requirement, but usually we filter in query

CREATE POLICY "Allow public read access on authors"
ON authors FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public read access on categories"
ON categories FOR SELECT
TO public
USING (true);

-- Also for testimonials if needed
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on testimonials"
ON testimonials FOR SELECT
TO public
USING (is_published = true);
