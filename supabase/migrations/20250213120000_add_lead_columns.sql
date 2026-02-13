-- Add new columns for lead tracking
ALTER TABLE "public"."leads" ADD COLUMN "source_url" text;
ALTER TABLE "public"."leads" ADD COLUMN "interest_category" text;

-- Add indexes for filtering
CREATE INDEX IF NOT EXISTS "leads_interest_category_idx" ON "public"."leads" ("interest_category");
