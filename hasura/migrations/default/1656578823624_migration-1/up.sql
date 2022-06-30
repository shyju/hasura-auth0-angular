
CREATE TABLE "public"."skills" ("skill_id" UUID NOT NULL DEFAULT gen_random_uuid(), "skill_name" text NOT NULL, "exprience" integer NOT NULL DEFAULT 0, PRIMARY KEY ("skill_id") , UNIQUE ("skill_id"));

ALTER TABLE "public"."skills" ALTER COLUMN "exprience" TYPE float4;

ALTER TABLE "public"."skills" ALTER COLUMN "exprience" drop default;

ALTER TABLE "public"."skills" ALTER COLUMN "exprience" drop default;

ALTER TABLE "public"."skills" ALTER COLUMN "exprience" TYPE int;

ALTER TABLE "public"."skills" ALTER COLUMN "exprience" TYPE int;

alter table "public"."skills" add column "user_id" uuid
 null;

ALTER TABLE "public"."skills" ALTER COLUMN "user_id" TYPE text;

ALTER TABLE "public"."skills" ALTER COLUMN "user_id" TYPE Text;

CREATE TABLE "public"."users" ("id" text NOT NULL, "nickname" text NOT NULL, "last_seen" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , UNIQUE ("id"));COMMENT ON TABLE "public"."users" IS E'users';
