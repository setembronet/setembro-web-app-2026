-- Idempotent Seed for Authors, Agents, and Posts
DO $$
DECLARE
  ana_id uuid;
  carlos_id uuid;
  julia_id uuid;
  sofia_id uuid;
  lucas_id uuid;
  marketing_cat_id uuid;
  automacao_cat_id uuid;
  gestao_cat_id uuid;
BEGIN
  -- 1. Authors (Check by name)
  
  -- Ana
  SELECT id INTO ana_id FROM authors WHERE name = 'Ana';
  IF ana_id IS NULL THEN
    INSERT INTO authors (name, bio, avatar_url, social_links) 
    VALUES ('Ana', 'Especialista em Gestão e Estratégia de Negócios.', '/avatars/ana.png', '{"linkedin": "#"}'::jsonb)
    RETURNING id INTO ana_id;
  END IF;

  -- Carlos
  SELECT id INTO carlos_id FROM authors WHERE name = 'Carlos';
  IF carlos_id IS NULL THEN
    INSERT INTO authors (name, bio, avatar_url, social_links) 
    VALUES ('Carlos', 'Desenvolvedor Sênior e Arquiteto de Soluções.', '/avatars/carlos.png', '{"github": "#"}'::jsonb)
    RETURNING id INTO carlos_id;
  END IF;

  -- Julia
  SELECT id INTO julia_id FROM authors WHERE name = 'Julia';
  IF julia_id IS NULL THEN
    INSERT INTO authors (name, bio, avatar_url, social_links) 
    VALUES ('Julia', 'Especialista em Marketing Digital e Growth.', '/avatars/julia.png', '{"twitter": "#"}'::jsonb)
    RETURNING id INTO julia_id;
  END IF;

  -- Sofia
  SELECT id INTO sofia_id FROM authors WHERE name = 'Sofia';
  IF sofia_id IS NULL THEN
    INSERT INTO authors (name, bio, avatar_url, social_links) 
    VALUES ('Sofia', 'Redatora e Estrategista de Conteúdo.', '/avatars/sofia.png', '{"instagram": "#"}'::jsonb)
    RETURNING id INTO sofia_id;
  END IF;

  -- Lucas
  SELECT id INTO lucas_id FROM authors WHERE name = 'Lucas';
  IF lucas_id IS NULL THEN
    INSERT INTO authors (name, bio, avatar_url, social_links) 
    VALUES ('Lucas', 'Cientista de Dados e Analista de BI.', '/avatars/lucas.png', '{"linkedin": "#"}'::jsonb)
    RETURNING id INTO lucas_id;
  END IF;

  -- 2. AI Agents (slug is unique, use ON CONFLICT)
  INSERT INTO ai_agents (slug, name, role, system_prompt, is_active, avatar_url) VALUES
  ('ana-gestao', 'Ana', 'Gestão & Estratégia', 'You are Ana, a business strategy expert.', true, '/avatars/ana.png'),
  ('carlos-dev', 'Carlos', 'Desenvolvimento Técnico', 'You are Carlos, a senior software engineer.', true, '/avatars/carlos.png'),
  ('julia-marketing', 'Julia', 'Marketing & Growth', 'You are Julia, a marketing specialist.', true, '/avatars/julia.png'),
  ('sofia-content', 'Sofia', 'Conteúdo & Redação', 'You are Sofia, a content strategist.', true, '/avatars/sofia.png'),
  ('lucas-data', 'Lucas', 'Análise de Dados', 'You are Lucas, a data scientist.', true, '/avatars/lucas.png')
  ON CONFLICT (slug) DO NOTHING;

  -- 3. Blog Posts (slug is unique)
  -- Get Category IDs
  SELECT id INTO marketing_cat_id FROM categories WHERE slug = 'marketing-digital';
  SELECT id INTO automacao_cat_id FROM categories WHERE slug = 'automacao-inteligente';
  SELECT id INTO gestao_cat_id FROM categories WHERE slug = 'gestao-empresarial';

  -- Ensure categories exist (simple check, they should be in 0003 or seeds)
  -- Accessing them safely for inserts using explicit variables
  
  IF marketing_cat_id IS NOT NULL AND julia_id IS NOT NULL THEN
    INSERT INTO blog_posts (slug, title, content, excerpt, category_id, author_id, published_at)
    VALUES (
      'como-ia-revoluciona-marketing',
      'Como a IA está revolucionando o Marketing',
      'Conteúdo completo sobre IA no marketing...',
      'Descubra como a Inteligência Artificial está transformando as estratégias de marketing digital.',
      marketing_cat_id,
      julia_id,
      NOW()
    ) ON CONFLICT (slug) DO NOTHING;
  END IF;

  IF automacao_cat_id IS NOT NULL AND carlos_id IS NOT NULL THEN
    INSERT INTO blog_posts (slug, title, content, excerpt, category_id, author_id, published_at)
    VALUES (
      '5-ferramentas-automacao-2024',
      '5 Ferramentas de Automação para 2024',
      'Conteúdo sobre ferramentas de automação...',
      'As principais ferramentas que você precisa conhecer para automatizar seu negócio este ano.',
      automacao_cat_id,
      carlos_id,
      NOW()
    ) ON CONFLICT (slug) DO NOTHING;
  END IF;

  IF gestao_cat_id IS NOT NULL AND ana_id IS NOT NULL THEN
    INSERT INTO blog_posts (slug, title, content, excerpt, category_id, author_id, published_at)
    VALUES (
      'futuro-gestao-empresarial',
      'O Futuro da Gestão Empresarial com IA',
      'Conteúdo sobre gestão e IA...',
      'Como líderes estão usando IA para tomar decisões melhores e mais rápidas.',
      gestao_cat_id,
      ana_id,
      NOW()
    ) ON CONFLICT (slug) DO NOTHING;
  END IF;

END $$;
