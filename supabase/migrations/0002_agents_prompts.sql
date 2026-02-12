-- Add base_prompt and active_prompt columns
ALTER TABLE ai_agents 
ADD COLUMN base_prompt text,
ADD COLUMN active_prompt text;

-- Migrate existing system_prompt to active_prompt and base_prompt
UPDATE ai_agents 
SET active_prompt = system_prompt,
    base_prompt = system_prompt;

-- Make columns not null after population (optional, but good for integrity)
-- ALTER TABLE ai_agents ALTER COLUMN base_prompt SET NOT NULL;
-- ALTER TABLE ai_agents ALTER COLUMN active_prompt SET NOT NULL;

-- We will keep system_prompt for now to avoid breaking existing code immediately, 
-- but ideally we should transition to use active_prompt.
