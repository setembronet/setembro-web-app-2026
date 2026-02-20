-- Adicionando campos para o Monitor de Leads Inteligente (Prioridade 5)
ALTER TABLE "public"."leads" ADD COLUMN IF NOT EXISTS "company" text;
ALTER TABLE "public"."leads" ADD COLUMN IF NOT EXISTS "score" integer DEFAULT 0;
ALTER TABLE "public"."leads" ADD COLUMN IF NOT EXISTS "summary" text;

-- Atualizar metadados para indexação/performance
CREATE INDEX IF NOT EXISTS "leads_score_idx" ON "public"."leads" ("score" DESC);
