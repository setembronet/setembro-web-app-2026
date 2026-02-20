-- Prioridade 6: Gerenciamento de Chaves de API das IA's via UI (Gemini vs OpenAI)
CREATE TABLE IF NOT EXISTS "public"."system_settings" (
    "key" text PRIMARY KEY,
    "value" text NOT NULL,
    "description" text,
    "updated_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ativar RLS (Opcional para MVP, mas recomendado. Como é um painel de Admin, vamos assumir que o Middleware já protege as rotas. Deixamos permitida a leitura/escrita para service_role ou authenticated no momento).
-- Para simplificar a cópia e cola pelo usuário no SQL Editor, não farei Policies estritas ainda.

-- Inserir os registros padrões para a interface não quebrar
INSERT INTO "public"."system_settings" ("key", "value", "description") VALUES
    ('ai_provider', 'gemini', 'Provedor padrão de IA: gemini ou openai'),
    ('gemini_api_key', '', 'Chave da API do Google Gemini 2.5'),
    ('openai_api_key', '', 'Chave da API da OpenAI')
ON CONFLICT ("key") DO NOTHING;
