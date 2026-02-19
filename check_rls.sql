
-- Check if tables exist and RLS is enabled
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';

-- Check policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename IN ('blog_posts', 'categories', 'authors');

-- Check grants
SELECT grantee, privilege_type 
FROM information_schema.role_table_grants 
WHERE table_name IN ('blog_posts', 'categories', 'authors');
