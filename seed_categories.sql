
-- Seeding Categories based on Navbar
-- Run this in Supabase SQL Editor

INSERT INTO public.categories (name, slug, description)
VALUES 
    ('Inteligência Artificial', 'inteligencia-artificial', 'Artigos sobre IA, LLMs e o futuro da tecnologia'),
    ('Automação', 'automacao', 'Tutoriais e dicas sobre automação de processos e n8n'),
    ('Desenvolvimento Web', 'desenvolvimento-web', 'Front-end, Back-end e tecnologias modernas'),
    ('Design', 'design', 'UI/UX, tendências visuais e criação de interfaces'),
    ('Marketing & SEO', 'marketing-seo', 'Estratégias de crescimento e otimização para buscadores'),
    ('Hospedagem', 'hospedagem', 'Infraestrutura, servidores e cloud computing'),
    ('Sistemas', 'sistemas', 'Sistemas corporativos e gestão')
ON CONFLICT (slug) DO NOTHING;
