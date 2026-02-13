-- Add source_url and interest_category to leads table
alter table leads add column if not exists source_url text;
alter table leads add column if not exists interest_category text;

-- Create Categories (Seeding)
insert into categories (slug, name, description) values
('ia-para-negocios', 'IA para Negócios', 'Estratégias de IA para empresas'),
('automacao-inteligente', 'Automação Inteligente', 'Ferramentas e técnicas de automação'),
('marketing-digital', 'Marketing Digital', 'Dicas e tendências de marketing'),
('desenvolvimento-web', 'Desenvolvimento Web', 'Tecnologias e boas práticas de desenvolvimento'),
('produtividade', 'Produtividade', 'Como ser mais produtivo com tecnologia'),
('gestao-empresarial', 'Gestão Empresarial', 'Gestão moderna e eficiente'),
('inovacao', 'Inovação', 'Novidades e futuro da tecnologia'),
('casos-de-sucesso', 'Casos de Sucesso', 'Histórias de quem transformou seus negócios')
on conflict (slug) do nothing;
