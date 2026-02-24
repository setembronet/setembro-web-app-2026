-- Add the role column if it somehow doesn't exist (Supabase Studio or manual deletion)
ALTER TABLE ai_agents ADD COLUMN IF NOT EXISTS role TEXT;
ALTER TABLE ai_agents ADD COLUMN IF NOT EXISTS active_prompt TEXT;

-- Clear previous dummy or invalid agents
DELETE FROM ai_agents;

-- Insert the 5 Official Ecosystem Agents
INSERT INTO ai_agents (name, role, is_active, temperature, active_prompt) VALUES 
('O Pivot', 'Gerente de Contas', true, 0.5, ''), 
('Ana', 'Consultora SDR', true, 0.7, ''), 
('Julia', 'Copywriter/SEO', true, 0.8, ''), 
('Sofia', 'Diretora (CMO)', true, 0.4, ''), 
('Carlos', 'Engenheiro DevOps', true, 0.2, '');
