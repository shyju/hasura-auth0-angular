CREATE TABLE "public"."skills" ("skill_id" uuid NOT NULL DEFAULT gen_random_uuid(), "skill_name" text NOT NULL, "exprience" float4 NOT NULL, "user_id" text NOT NULL, PRIMARY KEY ("skill_id") , UNIQUE ("skill_id"));COMMENT ON TABLE "public"."skills" IS E'skills';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
