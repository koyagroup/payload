import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_landing_hero_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum_pages_blocks_why_koya_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum_pages_blocks_stocks_ticker_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum_pages_blocks_waitlist_cta_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum__pages_v_blocks_landing_hero_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum__pages_v_blocks_why_koya_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum__pages_v_blocks_stocks_ticker_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum__pages_v_blocks_waitlist_cta_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TABLE "pages_blocks_landing_hero_trust_signals" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_landing_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum_pages_blocks_landing_hero_variant" DEFAULT 'default',
  	"primary_cta_label" varchar,
  	"primary_cta_href" varchar,
  	"secondary_cta_label" varchar,
  	"secondary_cta_href" varchar,
  	"widget_footnote" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_why_koya_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_why_koya" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum_pages_blocks_why_koya_variant" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stocks_ticker" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum_pages_blocks_stocks_ticker_variant" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_waitlist_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum_pages_blocks_waitlist_cta_variant" DEFAULT 'default',
  	"email_placeholder" varchar,
  	"button_label" varchar,
  	"success_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_landing_hero_trust_signals" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_landing_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum__pages_v_blocks_landing_hero_variant" DEFAULT 'default',
  	"primary_cta_label" varchar,
  	"primary_cta_href" varchar,
  	"secondary_cta_label" varchar,
  	"secondary_cta_href" varchar,
  	"widget_footnote" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_why_koya_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_why_koya" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum__pages_v_blocks_why_koya_variant" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stocks_ticker" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum__pages_v_blocks_stocks_ticker_variant" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_waitlist_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum__pages_v_blocks_waitlist_cta_variant" DEFAULT 'default',
  	"email_placeholder" varchar,
  	"button_label" varchar,
  	"success_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "waitlist_signups" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"source" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "waitlist_signups_id" integer;
  ALTER TABLE "pages_blocks_landing_hero_trust_signals" ADD CONSTRAINT "pages_blocks_landing_hero_trust_signals_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_landing_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_landing_hero" ADD CONSTRAINT "pages_blocks_landing_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_koya_stats" ADD CONSTRAINT "pages_blocks_why_koya_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_why_koya"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_koya" ADD CONSTRAINT "pages_blocks_why_koya_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stocks_ticker" ADD CONSTRAINT "pages_blocks_stocks_ticker_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_waitlist_cta" ADD CONSTRAINT "pages_blocks_waitlist_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_landing_hero_trust_signals" ADD CONSTRAINT "_pages_v_blocks_landing_hero_trust_signals_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_landing_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_landing_hero" ADD CONSTRAINT "_pages_v_blocks_landing_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_why_koya_stats" ADD CONSTRAINT "_pages_v_blocks_why_koya_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_why_koya"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_why_koya" ADD CONSTRAINT "_pages_v_blocks_why_koya_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stocks_ticker" ADD CONSTRAINT "_pages_v_blocks_stocks_ticker_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_waitlist_cta" ADD CONSTRAINT "_pages_v_blocks_waitlist_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_landing_hero_trust_signals_order_idx" ON "pages_blocks_landing_hero_trust_signals" USING btree ("_order");
  CREATE INDEX "pages_blocks_landing_hero_trust_signals_parent_id_idx" ON "pages_blocks_landing_hero_trust_signals" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_landing_hero_order_idx" ON "pages_blocks_landing_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_landing_hero_parent_id_idx" ON "pages_blocks_landing_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_landing_hero_path_idx" ON "pages_blocks_landing_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_why_koya_stats_order_idx" ON "pages_blocks_why_koya_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_why_koya_stats_parent_id_idx" ON "pages_blocks_why_koya_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_why_koya_order_idx" ON "pages_blocks_why_koya" USING btree ("_order");
  CREATE INDEX "pages_blocks_why_koya_parent_id_idx" ON "pages_blocks_why_koya" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_why_koya_path_idx" ON "pages_blocks_why_koya" USING btree ("_path");
  CREATE INDEX "pages_blocks_stocks_ticker_order_idx" ON "pages_blocks_stocks_ticker" USING btree ("_order");
  CREATE INDEX "pages_blocks_stocks_ticker_parent_id_idx" ON "pages_blocks_stocks_ticker" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stocks_ticker_path_idx" ON "pages_blocks_stocks_ticker" USING btree ("_path");
  CREATE INDEX "pages_blocks_waitlist_cta_order_idx" ON "pages_blocks_waitlist_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_waitlist_cta_parent_id_idx" ON "pages_blocks_waitlist_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_waitlist_cta_path_idx" ON "pages_blocks_waitlist_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_landing_hero_trust_signals_order_idx" ON "_pages_v_blocks_landing_hero_trust_signals" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_landing_hero_trust_signals_parent_id_idx" ON "_pages_v_blocks_landing_hero_trust_signals" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_landing_hero_order_idx" ON "_pages_v_blocks_landing_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_landing_hero_parent_id_idx" ON "_pages_v_blocks_landing_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_landing_hero_path_idx" ON "_pages_v_blocks_landing_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_why_koya_stats_order_idx" ON "_pages_v_blocks_why_koya_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_why_koya_stats_parent_id_idx" ON "_pages_v_blocks_why_koya_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_why_koya_order_idx" ON "_pages_v_blocks_why_koya" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_why_koya_parent_id_idx" ON "_pages_v_blocks_why_koya" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_why_koya_path_idx" ON "_pages_v_blocks_why_koya" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stocks_ticker_order_idx" ON "_pages_v_blocks_stocks_ticker" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stocks_ticker_parent_id_idx" ON "_pages_v_blocks_stocks_ticker" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stocks_ticker_path_idx" ON "_pages_v_blocks_stocks_ticker" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_waitlist_cta_order_idx" ON "_pages_v_blocks_waitlist_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_waitlist_cta_parent_id_idx" ON "_pages_v_blocks_waitlist_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_waitlist_cta_path_idx" ON "_pages_v_blocks_waitlist_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "waitlist_signups_email_idx" ON "waitlist_signups" USING btree ("email");
  CREATE INDEX "waitlist_signups_updated_at_idx" ON "waitlist_signups" USING btree ("updated_at");
  CREATE INDEX "waitlist_signups_created_at_idx" ON "waitlist_signups" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_waitlist_signups_fk" FOREIGN KEY ("waitlist_signups_id") REFERENCES "public"."waitlist_signups"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_waitlist_signups_id_idx" ON "payload_locked_documents_rels" USING btree ("waitlist_signups_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_landing_hero_trust_signals" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_landing_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_why_koya_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_why_koya" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stocks_ticker" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_waitlist_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_landing_hero_trust_signals" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_landing_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_why_koya_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_why_koya" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stocks_ticker" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_waitlist_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "waitlist_signups" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_landing_hero_trust_signals" CASCADE;
  DROP TABLE "pages_blocks_landing_hero" CASCADE;
  DROP TABLE "pages_blocks_why_koya_stats" CASCADE;
  DROP TABLE "pages_blocks_why_koya" CASCADE;
  DROP TABLE "pages_blocks_stocks_ticker" CASCADE;
  DROP TABLE "pages_blocks_waitlist_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_landing_hero_trust_signals" CASCADE;
  DROP TABLE "_pages_v_blocks_landing_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_why_koya_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_why_koya" CASCADE;
  DROP TABLE "_pages_v_blocks_stocks_ticker" CASCADE;
  DROP TABLE "_pages_v_blocks_waitlist_cta" CASCADE;
  DROP TABLE "waitlist_signups" CASCADE;
  -- IF EXISTS: the DROP TABLE "waitlist_signups" CASCADE above already removes
  -- this FK, so the generated bare DROP CONSTRAINT fails on a real rollback.
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_waitlist_signups_fk";

  DROP INDEX IF EXISTS "payload_locked_documents_rels_waitlist_signups_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "waitlist_signups_id";
  DROP TYPE "public"."enum_pages_blocks_landing_hero_variant";
  DROP TYPE "public"."enum_pages_blocks_why_koya_variant";
  DROP TYPE "public"."enum_pages_blocks_stocks_ticker_variant";
  DROP TYPE "public"."enum_pages_blocks_waitlist_cta_variant";
  DROP TYPE "public"."enum__pages_v_blocks_landing_hero_variant";
  DROP TYPE "public"."enum__pages_v_blocks_why_koya_variant";
  DROP TYPE "public"."enum__pages_v_blocks_stocks_ticker_variant";
  DROP TYPE "public"."enum__pages_v_blocks_waitlist_cta_variant";`)
}
