-- Add analytical fields to chat_history table to track exactly where and how leads interact with Ana.
ALTER TABLE chat_history
ADD COLUMN IF NOT EXISTS ip_address text,
ADD COLUMN IF NOT EXISTS post_url text,
ADD COLUMN IF NOT EXISTS post_title text,
ADD COLUMN IF NOT EXISTS metadata jsonb DEFAULT '{}'::jsonb;
