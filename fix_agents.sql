ALTER TABLE ai_agents ADD COLUMN IF NOT EXISTS role TEXT;
ALTER TABLE ai_agents ADD COLUMN IF NOT EXISTS active_prompt TEXT;
DELETE FROM ai_agents WHERE id IS NOT NULL;
INSERT INTO ai_agents (name, role, is_active, temperature, active_prompt) VALUES 
('O Pivot', 'Gerente de Contas', true, 0.5, ''), 
('Ana', 'Consultora SDR', true, 0.7, ''), 
('Julia', 'Copywriter/SEO', true, 0.8, ''), 
('Sofia', 'Diretora (CMO)', true, 0.4, ''), 
('Carlos', 'Engenheiro DevOps', true, 0.2, '');
