
DROP TABLE "public"."users";

ALTER TABLE "public"."skills" ALTER COLUMN "user_id" TYPE text;

ALTER TABLE "public"."skills" ALTER COLUMN "user_id" TYPE uuid;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."skills" add column "user_id" uuid
--  null;

ALTER TABLE "public"."skills" ALTER COLUMN "exprience" TYPE real;

ALTER TABLE "public"."skills" ALTER COLUMN "exprience" TYPE real;

alter table "public"."skills" alter column "exprience" set default '0';

alter table "public"."skills" alter column "exprience" set default '0';

ALTER TABLE "public"."skills" ALTER COLUMN "exprience" TYPE integer;

DROP TABLE "public"."skills";
