import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// step-334: enable Payload localization (launch locale set = ['en']).
// This is a DESTRUCTIVE-in-place change for every field flagged `localized`:
// each moves out of its base/version table into a sibling `<table>_locales`
// table keyed by (_locale, _parent_id). Payload's own migrate:create emits NO
// backfill and would orphan existing content, so this migration is hand-built
// from the real pre-loc -> localized schema diff:
//   up:   create the `_locales` enum + all 68 `_locales` tables (verbatim push
//         DDL) -> backfill each from its parent at locale 'en' -> drop the moved
//         columns from base + `_pages_v`/`_*_v` version tables.
//   down: re-add the columns (nullable, as Payload had them) -> backfill from
//         `_locales` at 'en' -> drop the `_locales` tables + enum.
// Proven up->down->up with zero data loss on a seeded Postgres 16 (step-334 doc).

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__pages_v_published_locale') THEN CREATE TYPE "enum__pages_v_published_locale" AS ENUM ('en'); END IF; END $$;
ALTER TABLE "_pages_v" ADD COLUMN "snapshot" boolean;
ALTER TABLE "_pages_v" ADD COLUMN "published_locale" "enum__pages_v_published_locale";
CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" ("snapshot");
CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" ("published_locale");
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__faqs_v_published_locale') THEN CREATE TYPE "enum__faqs_v_published_locale" AS ENUM ('en'); END IF; END $$;
ALTER TABLE "_faqs_v" ADD COLUMN "snapshot" boolean;
ALTER TABLE "_faqs_v" ADD COLUMN "published_locale" "enum__faqs_v_published_locale";
CREATE INDEX "_faqs_v_snapshot_idx" ON "_faqs_v" ("snapshot");
CREATE INDEX "_faqs_v_published_locale_idx" ON "_faqs_v" ("published_locale");
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__legal_pages_v_published_locale') THEN CREATE TYPE "enum__legal_pages_v_published_locale" AS ENUM ('en'); END IF; END $$;
ALTER TABLE "_legal_pages_v" ADD COLUMN "snapshot" boolean;
ALTER TABLE "_legal_pages_v" ADD COLUMN "published_locale" "enum__legal_pages_v_published_locale";
CREATE INDEX "_legal_pages_v_snapshot_idx" ON "_legal_pages_v" ("snapshot");
CREATE INDEX "_legal_pages_v_published_locale_idx" ON "_legal_pages_v" ("published_locale");
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__navigation_v_published_locale') THEN CREATE TYPE "enum__navigation_v_published_locale" AS ENUM ('en'); END IF; END $$;
ALTER TABLE "_navigation_v" ADD COLUMN "snapshot" boolean;
ALTER TABLE "_navigation_v" ADD COLUMN "published_locale" "enum__navigation_v_published_locale";
CREATE INDEX "_navigation_v_snapshot_idx" ON "_navigation_v" ("snapshot");
CREATE INDEX "_navigation_v_published_locale_idx" ON "_navigation_v" ("published_locale");
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__footer_v_published_locale') THEN CREATE TYPE "enum__footer_v_published_locale" AS ENUM ('en'); END IF; END $$;
ALTER TABLE "_footer_v" ADD COLUMN "snapshot" boolean;
ALTER TABLE "_footer_v" ADD COLUMN "published_locale" "enum__footer_v_published_locale";
CREATE INDEX "_footer_v_snapshot_idx" ON "_footer_v" ("snapshot");
CREATE INDEX "_footer_v_published_locale_idx" ON "_footer_v" ("published_locale");
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__site_settings_v_published_locale') THEN CREATE TYPE "enum__site_settings_v_published_locale" AS ENUM ('en'); END IF; END $$;
ALTER TABLE "_site_settings_v" ADD COLUMN "snapshot" boolean;
ALTER TABLE "_site_settings_v" ADD COLUMN "published_locale" "enum__site_settings_v_published_locale";
CREATE INDEX "_site_settings_v_snapshot_idx" ON "_site_settings_v" ("snapshot");
CREATE INDEX "_site_settings_v_published_locale_idx" ON "_site_settings_v" ("published_locale");
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__seo_defaults_v_published_locale') THEN CREATE TYPE "enum__seo_defaults_v_published_locale" AS ENUM ('en'); END IF; END $$;
ALTER TABLE "_seo_defaults_v" ADD COLUMN "snapshot" boolean;
ALTER TABLE "_seo_defaults_v" ADD COLUMN "published_locale" "enum__seo_defaults_v_published_locale";
CREATE INDEX "_seo_defaults_v_snapshot_idx" ON "_seo_defaults_v" ("snapshot");
CREATE INDEX "_seo_defaults_v_published_locale_idx" ON "_seo_defaults_v" ("published_locale");
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__theme_settings_v_published_locale') THEN CREATE TYPE "enum__theme_settings_v_published_locale" AS ENUM ('en'); END IF; END $$;
ALTER TABLE "_theme_settings_v" ADD COLUMN "snapshot" boolean;
ALTER TABLE "_theme_settings_v" ADD COLUMN "published_locale" "enum__theme_settings_v_published_locale";
CREATE INDEX "_theme_settings_v_snapshot_idx" ON "_theme_settings_v" ("snapshot");
CREATE INDEX "_theme_settings_v_published_locale_idx" ON "_theme_settings_v" ("published_locale");
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = '_locales') THEN CREATE TYPE "_locales" AS ENUM ('en'); END IF; END $$;
-- create all _locales sequences/tables/defaults/pkeys/fkeys/unique-indexes (verbatim push DDL)
CREATE TABLE public._faqs_v_locales (
    version_question character varying,
    version_answer character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._faqs_v_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._faqs_v_locales_id_seq OWNED BY public._faqs_v_locales.id;
CREATE TABLE public._footer_v_locales (
    version_legal_text character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._footer_v_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._footer_v_locales_id_seq OWNED BY public._footer_v_locales.id;
CREATE TABLE public._footer_v_version_columns_links_locales (
    link_label character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._footer_v_version_columns_links_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._footer_v_version_columns_links_locales_id_seq OWNED BY public._footer_v_version_columns_links_locales.id;
CREATE TABLE public._footer_v_version_columns_locales (
    title character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._footer_v_version_columns_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._footer_v_version_columns_locales_id_seq OWNED BY public._footer_v_version_columns_locales.id;
CREATE TABLE public._legal_pages_v_locales (
    version_title character varying,
    version_body jsonb,
    version_seo_meta_title character varying,
    version_seo_meta_description character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._legal_pages_v_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._legal_pages_v_locales_id_seq OWNED BY public._legal_pages_v_locales.id;
CREATE TABLE public._navigation_v_version_items_locales (
    link_label character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._navigation_v_version_items_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._navigation_v_version_items_locales_id_seq OWNED BY public._navigation_v_version_items_locales.id;
CREATE TABLE public._pages_v_blocks_cards_features_locales (
    title character varying,
    description character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._pages_v_blocks_cards_features_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_cards_features_locales_id_seq OWNED BY public._pages_v_blocks_cards_features_locales.id;
CREATE TABLE public._pages_v_blocks_cards_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._pages_v_blocks_cards_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_cards_locales_id_seq OWNED BY public._pages_v_blocks_cards_locales.id;
CREATE TABLE public._pages_v_blocks_convert_hero_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    badge_text character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._pages_v_blocks_convert_hero_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_convert_hero_locales_id_seq OWNED BY public._pages_v_blocks_convert_hero_locales.id;
CREATE TABLE public._pages_v_blocks_cta_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    primary_cta_label character varying,
    secondary_cta_label character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._pages_v_blocks_cta_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_cta_locales_id_seq OWNED BY public._pages_v_blocks_cta_locales.id;
CREATE TABLE public._pages_v_blocks_feature_grid_items_locales (
    title character varying,
    description character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._pages_v_blocks_feature_grid_items_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_feature_grid_items_locales_id_seq OWNED BY public._pages_v_blocks_feature_grid_items_locales.id;
CREATE TABLE public._pages_v_blocks_feature_grid_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._pages_v_blocks_feature_grid_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_feature_grid_locales_id_seq OWNED BY public._pages_v_blocks_feature_grid_locales.id;
CREATE TABLE public._pages_v_blocks_final_cta_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    primary_cta_label character varying,
    secondary_cta_label character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._pages_v_blocks_final_cta_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_final_cta_locales_id_seq OWNED BY public._pages_v_blocks_final_cta_locales.id;
CREATE TABLE public._pages_v_blocks_global_finance_highlights_locales (
    title character varying,
    description character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._pages_v_blocks_global_finance_highlights_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_global_finance_highlights_locales_id_seq OWNED BY public._pages_v_blocks_global_finance_highlights_locales.id;
CREATE TABLE public._pages_v_blocks_global_finance_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._pages_v_blocks_global_finance_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_global_finance_locales_id_seq OWNED BY public._pages_v_blocks_global_finance_locales.id;
CREATE TABLE public._pages_v_blocks_guest_widget_embed_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    badge_text character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._pages_v_blocks_guest_widget_embed_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_guest_widget_embed_locales_id_seq OWNED BY public._pages_v_blocks_guest_widget_embed_locales.id;
CREATE TABLE public._pages_v_blocks_hero_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    primary_cta_label character varying,
    secondary_cta_label character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._pages_v_blocks_hero_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_hero_locales_id_seq OWNED BY public._pages_v_blocks_hero_locales.id;
CREATE TABLE public._pages_v_blocks_how_it_works_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._pages_v_blocks_how_it_works_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_how_it_works_locales_id_seq OWNED BY public._pages_v_blocks_how_it_works_locales.id;
CREATE TABLE public._pages_v_blocks_how_it_works_steps_locales (
    title character varying,
    body character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._pages_v_blocks_how_it_works_steps_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_how_it_works_steps_locales_id_seq OWNED BY public._pages_v_blocks_how_it_works_steps_locales.id;
CREATE TABLE public._pages_v_blocks_landing_hero_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    primary_cta_label character varying,
    secondary_cta_label character varying,
    widget_footnote character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._pages_v_blocks_landing_hero_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_landing_hero_locales_id_seq OWNED BY public._pages_v_blocks_landing_hero_locales.id;
CREATE TABLE public._pages_v_blocks_landing_hero_trust_signals_locales (
    label character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._pages_v_blocks_landing_hero_trust_signals_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_landing_hero_trust_signals_locales_id_seq OWNED BY public._pages_v_blocks_landing_hero_trust_signals_locales.id;
CREATE TABLE public._pages_v_blocks_media_showcase_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._pages_v_blocks_media_showcase_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_media_showcase_locales_id_seq OWNED BY public._pages_v_blocks_media_showcase_locales.id;
CREATE TABLE public._pages_v_blocks_rich_text_content_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    body jsonb,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._pages_v_blocks_rich_text_content_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_rich_text_content_locales_id_seq OWNED BY public._pages_v_blocks_rich_text_content_locales.id;
CREATE TABLE public._pages_v_blocks_security_controls_locales (
    title character varying,
    description character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._pages_v_blocks_security_controls_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_security_controls_locales_id_seq OWNED BY public._pages_v_blocks_security_controls_locales.id;
CREATE TABLE public._pages_v_blocks_security_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._pages_v_blocks_security_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_security_locales_id_seq OWNED BY public._pages_v_blocks_security_locales.id;
CREATE TABLE public._pages_v_blocks_stocks_ticker_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._pages_v_blocks_stocks_ticker_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_stocks_ticker_locales_id_seq OWNED BY public._pages_v_blocks_stocks_ticker_locales.id;
CREATE TABLE public._pages_v_blocks_trust_footer_items_items_locales (
    label character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._pages_v_blocks_trust_footer_items_items_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_trust_footer_items_items_locales_id_seq OWNED BY public._pages_v_blocks_trust_footer_items_items_locales.id;
CREATE TABLE public._pages_v_blocks_trust_footer_items_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._pages_v_blocks_trust_footer_items_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_trust_footer_items_locales_id_seq OWNED BY public._pages_v_blocks_trust_footer_items_locales.id;
CREATE TABLE public._pages_v_blocks_trust_strip_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._pages_v_blocks_trust_strip_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_trust_strip_locales_id_seq OWNED BY public._pages_v_blocks_trust_strip_locales.id;
CREATE TABLE public._pages_v_blocks_trust_strip_signals_locales (
    label character varying,
    value character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._pages_v_blocks_trust_strip_signals_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_trust_strip_signals_locales_id_seq OWNED BY public._pages_v_blocks_trust_strip_signals_locales.id;
CREATE TABLE public._pages_v_blocks_waitlist_cta_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    email_placeholder character varying,
    button_label character varying,
    success_text character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._pages_v_blocks_waitlist_cta_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_waitlist_cta_locales_id_seq OWNED BY public._pages_v_blocks_waitlist_cta_locales.id;
CREATE TABLE public._pages_v_blocks_why_koya_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._pages_v_blocks_why_koya_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_why_koya_locales_id_seq OWNED BY public._pages_v_blocks_why_koya_locales.id;
CREATE TABLE public._pages_v_blocks_why_koya_stats_locales (
    value character varying,
    label character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._pages_v_blocks_why_koya_stats_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_why_koya_stats_locales_id_seq OWNED BY public._pages_v_blocks_why_koya_stats_locales.id;
CREATE TABLE public._pages_v_locales (
    version_title character varying,
    version_seo_meta_title character varying,
    version_seo_meta_description character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._pages_v_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_locales_id_seq OWNED BY public._pages_v_locales.id;
CREATE TABLE public.faqs_locales (
    question character varying,
    answer character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public.faqs_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.faqs_locales_id_seq OWNED BY public.faqs_locales.id;
CREATE TABLE public.footer_columns_links_locales (
    link_label character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.footer_columns_links_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.footer_columns_links_locales_id_seq OWNED BY public.footer_columns_links_locales.id;
CREATE TABLE public.footer_columns_locales (
    title character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.footer_columns_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.footer_columns_locales_id_seq OWNED BY public.footer_columns_locales.id;
CREATE TABLE public.footer_locales (
    legal_text character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public.footer_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.footer_locales_id_seq OWNED BY public.footer_locales.id;
CREATE TABLE public.legal_pages_locales (
    title character varying,
    body jsonb,
    seo_meta_title character varying,
    seo_meta_description character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public.legal_pages_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.legal_pages_locales_id_seq OWNED BY public.legal_pages_locales.id;
CREATE TABLE public.navigation_items_locales (
    link_label character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.navigation_items_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.navigation_items_locales_id_seq OWNED BY public.navigation_items_locales.id;
CREATE TABLE public.pages_blocks_cards_features_locales (
    title character varying,
    description character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.pages_blocks_cards_features_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_blocks_cards_features_locales_id_seq OWNED BY public.pages_blocks_cards_features_locales.id;
CREATE TABLE public.pages_blocks_cards_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.pages_blocks_cards_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_blocks_cards_locales_id_seq OWNED BY public.pages_blocks_cards_locales.id;
CREATE TABLE public.pages_blocks_convert_hero_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    badge_text character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.pages_blocks_convert_hero_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_blocks_convert_hero_locales_id_seq OWNED BY public.pages_blocks_convert_hero_locales.id;
CREATE TABLE public.pages_blocks_cta_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    primary_cta_label character varying,
    secondary_cta_label character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.pages_blocks_cta_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_blocks_cta_locales_id_seq OWNED BY public.pages_blocks_cta_locales.id;
CREATE TABLE public.pages_blocks_feature_grid_items_locales (
    title character varying,
    description character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.pages_blocks_feature_grid_items_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_blocks_feature_grid_items_locales_id_seq OWNED BY public.pages_blocks_feature_grid_items_locales.id;
CREATE TABLE public.pages_blocks_feature_grid_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.pages_blocks_feature_grid_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_blocks_feature_grid_locales_id_seq OWNED BY public.pages_blocks_feature_grid_locales.id;
CREATE TABLE public.pages_blocks_final_cta_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    primary_cta_label character varying,
    secondary_cta_label character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.pages_blocks_final_cta_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_blocks_final_cta_locales_id_seq OWNED BY public.pages_blocks_final_cta_locales.id;
CREATE TABLE public.pages_blocks_global_finance_highlights_locales (
    title character varying,
    description character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.pages_blocks_global_finance_highlights_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_blocks_global_finance_highlights_locales_id_seq OWNED BY public.pages_blocks_global_finance_highlights_locales.id;
CREATE TABLE public.pages_blocks_global_finance_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.pages_blocks_global_finance_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_blocks_global_finance_locales_id_seq OWNED BY public.pages_blocks_global_finance_locales.id;
CREATE TABLE public.pages_blocks_guest_widget_embed_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    badge_text character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.pages_blocks_guest_widget_embed_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_blocks_guest_widget_embed_locales_id_seq OWNED BY public.pages_blocks_guest_widget_embed_locales.id;
CREATE TABLE public.pages_blocks_hero_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    primary_cta_label character varying,
    secondary_cta_label character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.pages_blocks_hero_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_blocks_hero_locales_id_seq OWNED BY public.pages_blocks_hero_locales.id;
CREATE TABLE public.pages_blocks_how_it_works_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.pages_blocks_how_it_works_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_blocks_how_it_works_locales_id_seq OWNED BY public.pages_blocks_how_it_works_locales.id;
CREATE TABLE public.pages_blocks_how_it_works_steps_locales (
    title character varying,
    body character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.pages_blocks_how_it_works_steps_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_blocks_how_it_works_steps_locales_id_seq OWNED BY public.pages_blocks_how_it_works_steps_locales.id;
CREATE TABLE public.pages_blocks_landing_hero_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    primary_cta_label character varying,
    secondary_cta_label character varying,
    widget_footnote character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.pages_blocks_landing_hero_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_blocks_landing_hero_locales_id_seq OWNED BY public.pages_blocks_landing_hero_locales.id;
CREATE TABLE public.pages_blocks_landing_hero_trust_signals_locales (
    label character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.pages_blocks_landing_hero_trust_signals_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_blocks_landing_hero_trust_signals_locales_id_seq OWNED BY public.pages_blocks_landing_hero_trust_signals_locales.id;
CREATE TABLE public.pages_blocks_media_showcase_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.pages_blocks_media_showcase_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_blocks_media_showcase_locales_id_seq OWNED BY public.pages_blocks_media_showcase_locales.id;
CREATE TABLE public.pages_blocks_rich_text_content_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    body jsonb,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.pages_blocks_rich_text_content_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_blocks_rich_text_content_locales_id_seq OWNED BY public.pages_blocks_rich_text_content_locales.id;
CREATE TABLE public.pages_blocks_security_controls_locales (
    title character varying,
    description character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.pages_blocks_security_controls_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_blocks_security_controls_locales_id_seq OWNED BY public.pages_blocks_security_controls_locales.id;
CREATE TABLE public.pages_blocks_security_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.pages_blocks_security_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_blocks_security_locales_id_seq OWNED BY public.pages_blocks_security_locales.id;
CREATE TABLE public.pages_blocks_stocks_ticker_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.pages_blocks_stocks_ticker_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_blocks_stocks_ticker_locales_id_seq OWNED BY public.pages_blocks_stocks_ticker_locales.id;
CREATE TABLE public.pages_blocks_trust_footer_items_items_locales (
    label character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.pages_blocks_trust_footer_items_items_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_blocks_trust_footer_items_items_locales_id_seq OWNED BY public.pages_blocks_trust_footer_items_items_locales.id;
CREATE TABLE public.pages_blocks_trust_footer_items_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.pages_blocks_trust_footer_items_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_blocks_trust_footer_items_locales_id_seq OWNED BY public.pages_blocks_trust_footer_items_locales.id;
CREATE TABLE public.pages_blocks_trust_strip_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.pages_blocks_trust_strip_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_blocks_trust_strip_locales_id_seq OWNED BY public.pages_blocks_trust_strip_locales.id;
CREATE TABLE public.pages_blocks_trust_strip_signals_locales (
    label character varying,
    value character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.pages_blocks_trust_strip_signals_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_blocks_trust_strip_signals_locales_id_seq OWNED BY public.pages_blocks_trust_strip_signals_locales.id;
CREATE TABLE public.pages_blocks_waitlist_cta_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    email_placeholder character varying,
    button_label character varying,
    success_text character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.pages_blocks_waitlist_cta_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_blocks_waitlist_cta_locales_id_seq OWNED BY public.pages_blocks_waitlist_cta_locales.id;
CREATE TABLE public.pages_blocks_why_koya_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.pages_blocks_why_koya_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_blocks_why_koya_locales_id_seq OWNED BY public.pages_blocks_why_koya_locales.id;
CREATE TABLE public.pages_blocks_why_koya_stats_locales (
    value character varying,
    label character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.pages_blocks_why_koya_stats_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_blocks_why_koya_stats_locales_id_seq OWNED BY public.pages_blocks_why_koya_stats_locales.id;
CREATE TABLE public.pages_locales (
    title character varying,
    seo_meta_title character varying,
    seo_meta_description character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public.pages_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_locales_id_seq OWNED BY public.pages_locales.id;
ALTER TABLE ONLY public._faqs_v_locales ALTER COLUMN id SET DEFAULT nextval('public._faqs_v_locales_id_seq'::regclass);
ALTER TABLE ONLY public._footer_v_locales ALTER COLUMN id SET DEFAULT nextval('public._footer_v_locales_id_seq'::regclass);
ALTER TABLE ONLY public._footer_v_version_columns_links_locales ALTER COLUMN id SET DEFAULT nextval('public._footer_v_version_columns_links_locales_id_seq'::regclass);
ALTER TABLE ONLY public._footer_v_version_columns_locales ALTER COLUMN id SET DEFAULT nextval('public._footer_v_version_columns_locales_id_seq'::regclass);
ALTER TABLE ONLY public._legal_pages_v_locales ALTER COLUMN id SET DEFAULT nextval('public._legal_pages_v_locales_id_seq'::regclass);
ALTER TABLE ONLY public._navigation_v_version_items_locales ALTER COLUMN id SET DEFAULT nextval('public._navigation_v_version_items_locales_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_cards_features_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_cards_features_locales_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_cards_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_cards_locales_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_convert_hero_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_convert_hero_locales_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_cta_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_cta_locales_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_feature_grid_items_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_feature_grid_items_locales_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_feature_grid_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_feature_grid_locales_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_final_cta_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_final_cta_locales_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_global_finance_highlights_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_global_finance_highlights_locales_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_global_finance_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_global_finance_locales_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_guest_widget_embed_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_guest_widget_embed_locales_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_hero_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_hero_locales_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_how_it_works_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_how_it_works_locales_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_how_it_works_steps_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_how_it_works_steps_locales_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_landing_hero_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_landing_hero_locales_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_landing_hero_trust_signals_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_landing_hero_trust_signals_locales_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_media_showcase_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_media_showcase_locales_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_rich_text_content_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_rich_text_content_locales_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_security_controls_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_security_controls_locales_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_security_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_security_locales_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_stocks_ticker_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_stocks_ticker_locales_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_trust_footer_items_items_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_trust_footer_items_items_locales_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_trust_footer_items_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_trust_footer_items_locales_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_trust_strip_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_trust_strip_locales_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_trust_strip_signals_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_trust_strip_signals_locales_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_waitlist_cta_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_waitlist_cta_locales_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_why_koya_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_why_koya_locales_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_why_koya_stats_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_why_koya_stats_locales_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_locales_id_seq'::regclass);
ALTER TABLE ONLY public.faqs_locales ALTER COLUMN id SET DEFAULT nextval('public.faqs_locales_id_seq'::regclass);
ALTER TABLE ONLY public.footer_columns_links_locales ALTER COLUMN id SET DEFAULT nextval('public.footer_columns_links_locales_id_seq'::regclass);
ALTER TABLE ONLY public.footer_columns_locales ALTER COLUMN id SET DEFAULT nextval('public.footer_columns_locales_id_seq'::regclass);
ALTER TABLE ONLY public.footer_locales ALTER COLUMN id SET DEFAULT nextval('public.footer_locales_id_seq'::regclass);
ALTER TABLE ONLY public.legal_pages_locales ALTER COLUMN id SET DEFAULT nextval('public.legal_pages_locales_id_seq'::regclass);
ALTER TABLE ONLY public.navigation_items_locales ALTER COLUMN id SET DEFAULT nextval('public.navigation_items_locales_id_seq'::regclass);
ALTER TABLE ONLY public.pages_blocks_cards_features_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_cards_features_locales_id_seq'::regclass);
ALTER TABLE ONLY public.pages_blocks_cards_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_cards_locales_id_seq'::regclass);
ALTER TABLE ONLY public.pages_blocks_convert_hero_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_convert_hero_locales_id_seq'::regclass);
ALTER TABLE ONLY public.pages_blocks_cta_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_cta_locales_id_seq'::regclass);
ALTER TABLE ONLY public.pages_blocks_feature_grid_items_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_feature_grid_items_locales_id_seq'::regclass);
ALTER TABLE ONLY public.pages_blocks_feature_grid_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_feature_grid_locales_id_seq'::regclass);
ALTER TABLE ONLY public.pages_blocks_final_cta_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_final_cta_locales_id_seq'::regclass);
ALTER TABLE ONLY public.pages_blocks_global_finance_highlights_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_global_finance_highlights_locales_id_seq'::regclass);
ALTER TABLE ONLY public.pages_blocks_global_finance_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_global_finance_locales_id_seq'::regclass);
ALTER TABLE ONLY public.pages_blocks_guest_widget_embed_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_guest_widget_embed_locales_id_seq'::regclass);
ALTER TABLE ONLY public.pages_blocks_hero_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_hero_locales_id_seq'::regclass);
ALTER TABLE ONLY public.pages_blocks_how_it_works_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_how_it_works_locales_id_seq'::regclass);
ALTER TABLE ONLY public.pages_blocks_how_it_works_steps_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_how_it_works_steps_locales_id_seq'::regclass);
ALTER TABLE ONLY public.pages_blocks_landing_hero_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_landing_hero_locales_id_seq'::regclass);
ALTER TABLE ONLY public.pages_blocks_landing_hero_trust_signals_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_landing_hero_trust_signals_locales_id_seq'::regclass);
ALTER TABLE ONLY public.pages_blocks_media_showcase_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_media_showcase_locales_id_seq'::regclass);
ALTER TABLE ONLY public.pages_blocks_rich_text_content_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_rich_text_content_locales_id_seq'::regclass);
ALTER TABLE ONLY public.pages_blocks_security_controls_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_security_controls_locales_id_seq'::regclass);
ALTER TABLE ONLY public.pages_blocks_security_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_security_locales_id_seq'::regclass);
ALTER TABLE ONLY public.pages_blocks_stocks_ticker_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_stocks_ticker_locales_id_seq'::regclass);
ALTER TABLE ONLY public.pages_blocks_trust_footer_items_items_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_trust_footer_items_items_locales_id_seq'::regclass);
ALTER TABLE ONLY public.pages_blocks_trust_footer_items_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_trust_footer_items_locales_id_seq'::regclass);
ALTER TABLE ONLY public.pages_blocks_trust_strip_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_trust_strip_locales_id_seq'::regclass);
ALTER TABLE ONLY public.pages_blocks_trust_strip_signals_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_trust_strip_signals_locales_id_seq'::regclass);
ALTER TABLE ONLY public.pages_blocks_waitlist_cta_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_waitlist_cta_locales_id_seq'::regclass);
ALTER TABLE ONLY public.pages_blocks_why_koya_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_why_koya_locales_id_seq'::regclass);
ALTER TABLE ONLY public.pages_blocks_why_koya_stats_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_why_koya_stats_locales_id_seq'::regclass);
ALTER TABLE ONLY public.pages_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_locales_id_seq'::regclass);
ALTER TABLE ONLY public._faqs_v_locales
    ADD CONSTRAINT _faqs_v_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._footer_v_locales
    ADD CONSTRAINT _footer_v_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._footer_v_version_columns_links_locales
    ADD CONSTRAINT _footer_v_version_columns_links_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._footer_v_version_columns_locales
    ADD CONSTRAINT _footer_v_version_columns_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._legal_pages_v_locales
    ADD CONSTRAINT _legal_pages_v_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._navigation_v_version_items_locales
    ADD CONSTRAINT _navigation_v_version_items_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_cards_features_locales
    ADD CONSTRAINT _pages_v_blocks_cards_features_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_cards_locales
    ADD CONSTRAINT _pages_v_blocks_cards_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_convert_hero_locales
    ADD CONSTRAINT _pages_v_blocks_convert_hero_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_cta_locales
    ADD CONSTRAINT _pages_v_blocks_cta_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_feature_grid_items_locales
    ADD CONSTRAINT _pages_v_blocks_feature_grid_items_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_feature_grid_locales
    ADD CONSTRAINT _pages_v_blocks_feature_grid_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_final_cta_locales
    ADD CONSTRAINT _pages_v_blocks_final_cta_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_global_finance_highlights_locales
    ADD CONSTRAINT _pages_v_blocks_global_finance_highlights_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_global_finance_locales
    ADD CONSTRAINT _pages_v_blocks_global_finance_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_guest_widget_embed_locales
    ADD CONSTRAINT _pages_v_blocks_guest_widget_embed_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_hero_locales
    ADD CONSTRAINT _pages_v_blocks_hero_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_how_it_works_locales
    ADD CONSTRAINT _pages_v_blocks_how_it_works_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_how_it_works_steps_locales
    ADD CONSTRAINT _pages_v_blocks_how_it_works_steps_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_landing_hero_locales
    ADD CONSTRAINT _pages_v_blocks_landing_hero_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_landing_hero_trust_signals_locales
    ADD CONSTRAINT _pages_v_blocks_landing_hero_trust_signals_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_media_showcase_locales
    ADD CONSTRAINT _pages_v_blocks_media_showcase_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_rich_text_content_locales
    ADD CONSTRAINT _pages_v_blocks_rich_text_content_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_security_controls_locales
    ADD CONSTRAINT _pages_v_blocks_security_controls_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_security_locales
    ADD CONSTRAINT _pages_v_blocks_security_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_stocks_ticker_locales
    ADD CONSTRAINT _pages_v_blocks_stocks_ticker_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_trust_footer_items_items_locales
    ADD CONSTRAINT _pages_v_blocks_trust_footer_items_items_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_trust_footer_items_locales
    ADD CONSTRAINT _pages_v_blocks_trust_footer_items_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_trust_strip_locales
    ADD CONSTRAINT _pages_v_blocks_trust_strip_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_trust_strip_signals_locales
    ADD CONSTRAINT _pages_v_blocks_trust_strip_signals_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_waitlist_cta_locales
    ADD CONSTRAINT _pages_v_blocks_waitlist_cta_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_why_koya_locales
    ADD CONSTRAINT _pages_v_blocks_why_koya_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_why_koya_stats_locales
    ADD CONSTRAINT _pages_v_blocks_why_koya_stats_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_locales
    ADD CONSTRAINT _pages_v_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.faqs_locales
    ADD CONSTRAINT faqs_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.footer_columns_links_locales
    ADD CONSTRAINT footer_columns_links_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.footer_columns_locales
    ADD CONSTRAINT footer_columns_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.footer_locales
    ADD CONSTRAINT footer_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.legal_pages_locales
    ADD CONSTRAINT legal_pages_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.navigation_items_locales
    ADD CONSTRAINT navigation_items_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_cards_features_locales
    ADD CONSTRAINT pages_blocks_cards_features_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_cards_locales
    ADD CONSTRAINT pages_blocks_cards_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_convert_hero_locales
    ADD CONSTRAINT pages_blocks_convert_hero_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_cta_locales
    ADD CONSTRAINT pages_blocks_cta_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_feature_grid_items_locales
    ADD CONSTRAINT pages_blocks_feature_grid_items_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_feature_grid_locales
    ADD CONSTRAINT pages_blocks_feature_grid_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_final_cta_locales
    ADD CONSTRAINT pages_blocks_final_cta_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_global_finance_highlights_locales
    ADD CONSTRAINT pages_blocks_global_finance_highlights_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_global_finance_locales
    ADD CONSTRAINT pages_blocks_global_finance_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_guest_widget_embed_locales
    ADD CONSTRAINT pages_blocks_guest_widget_embed_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_hero_locales
    ADD CONSTRAINT pages_blocks_hero_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_how_it_works_locales
    ADD CONSTRAINT pages_blocks_how_it_works_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_how_it_works_steps_locales
    ADD CONSTRAINT pages_blocks_how_it_works_steps_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_landing_hero_locales
    ADD CONSTRAINT pages_blocks_landing_hero_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_landing_hero_trust_signals_locales
    ADD CONSTRAINT pages_blocks_landing_hero_trust_signals_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_media_showcase_locales
    ADD CONSTRAINT pages_blocks_media_showcase_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_rich_text_content_locales
    ADD CONSTRAINT pages_blocks_rich_text_content_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_security_controls_locales
    ADD CONSTRAINT pages_blocks_security_controls_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_security_locales
    ADD CONSTRAINT pages_blocks_security_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_stocks_ticker_locales
    ADD CONSTRAINT pages_blocks_stocks_ticker_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_trust_footer_items_items_locales
    ADD CONSTRAINT pages_blocks_trust_footer_items_items_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_trust_footer_items_locales
    ADD CONSTRAINT pages_blocks_trust_footer_items_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_trust_strip_locales
    ADD CONSTRAINT pages_blocks_trust_strip_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_trust_strip_signals_locales
    ADD CONSTRAINT pages_blocks_trust_strip_signals_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_waitlist_cta_locales
    ADD CONSTRAINT pages_blocks_waitlist_cta_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_why_koya_locales
    ADD CONSTRAINT pages_blocks_why_koya_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_why_koya_stats_locales
    ADD CONSTRAINT pages_blocks_why_koya_stats_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_locales
    ADD CONSTRAINT pages_locales_pkey PRIMARY KEY (id);
CREATE UNIQUE INDEX _faqs_v_locales_locale_parent_id_unique ON public._faqs_v_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX _footer_v_locales_locale_parent_id_unique ON public._footer_v_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX _footer_v_version_columns_links_locales_locale_parent_id_uni ON public._footer_v_version_columns_links_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX _footer_v_version_columns_locales_locale_parent_id_unique ON public._footer_v_version_columns_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX _legal_pages_v_locales_locale_parent_id_unique ON public._legal_pages_v_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX _navigation_v_version_items_locales_locale_parent_id_unique ON public._navigation_v_version_items_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX _pages_v_blocks_cards_features_locales_locale_parent_id_uniq ON public._pages_v_blocks_cards_features_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX _pages_v_blocks_cards_locales_locale_parent_id_unique ON public._pages_v_blocks_cards_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX _pages_v_blocks_convert_hero_locales_locale_parent_id_unique ON public._pages_v_blocks_convert_hero_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX _pages_v_blocks_cta_locales_locale_parent_id_unique ON public._pages_v_blocks_cta_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX _pages_v_blocks_feature_grid_items_locales_locale_parent_id_ ON public._pages_v_blocks_feature_grid_items_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX _pages_v_blocks_feature_grid_locales_locale_parent_id_unique ON public._pages_v_blocks_feature_grid_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX _pages_v_blocks_final_cta_locales_locale_parent_id_unique ON public._pages_v_blocks_final_cta_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX _pages_v_blocks_global_finance_highlights_locales_locale_par ON public._pages_v_blocks_global_finance_highlights_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX _pages_v_blocks_global_finance_locales_locale_parent_id_uniq ON public._pages_v_blocks_global_finance_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX _pages_v_blocks_guest_widget_embed_locales_locale_parent_id_ ON public._pages_v_blocks_guest_widget_embed_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX _pages_v_blocks_hero_locales_locale_parent_id_unique ON public._pages_v_blocks_hero_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX _pages_v_blocks_how_it_works_locales_locale_parent_id_unique ON public._pages_v_blocks_how_it_works_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX _pages_v_blocks_how_it_works_steps_locales_locale_parent_id_ ON public._pages_v_blocks_how_it_works_steps_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX _pages_v_blocks_landing_hero_locales_locale_parent_id_unique ON public._pages_v_blocks_landing_hero_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX _pages_v_blocks_landing_hero_trust_signals_locales_locale_pa ON public._pages_v_blocks_landing_hero_trust_signals_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX _pages_v_blocks_media_showcase_locales_locale_parent_id_uniq ON public._pages_v_blocks_media_showcase_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX _pages_v_blocks_rich_text_content_locales_locale_parent_id_u ON public._pages_v_blocks_rich_text_content_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX _pages_v_blocks_security_controls_locales_locale_parent_id_u ON public._pages_v_blocks_security_controls_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX _pages_v_blocks_security_locales_locale_parent_id_unique ON public._pages_v_blocks_security_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX _pages_v_blocks_stocks_ticker_locales_locale_parent_id_uniqu ON public._pages_v_blocks_stocks_ticker_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX _pages_v_blocks_trust_footer_items_items_locales_locale_pare ON public._pages_v_blocks_trust_footer_items_items_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX _pages_v_blocks_trust_footer_items_locales_locale_parent_id_ ON public._pages_v_blocks_trust_footer_items_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX _pages_v_blocks_trust_strip_locales_locale_parent_id_unique ON public._pages_v_blocks_trust_strip_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX _pages_v_blocks_trust_strip_signals_locales_locale_parent_id ON public._pages_v_blocks_trust_strip_signals_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX _pages_v_blocks_waitlist_cta_locales_locale_parent_id_unique ON public._pages_v_blocks_waitlist_cta_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX _pages_v_blocks_why_koya_locales_locale_parent_id_unique ON public._pages_v_blocks_why_koya_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX _pages_v_blocks_why_koya_stats_locales_locale_parent_id_uniq ON public._pages_v_blocks_why_koya_stats_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX _pages_v_locales_locale_parent_id_unique ON public._pages_v_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX faqs_locales_locale_parent_id_unique ON public.faqs_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX footer_columns_links_locales_locale_parent_id_unique ON public.footer_columns_links_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX footer_columns_locales_locale_parent_id_unique ON public.footer_columns_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX footer_locales_locale_parent_id_unique ON public.footer_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX legal_pages_locales_locale_parent_id_unique ON public.legal_pages_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX navigation_items_locales_locale_parent_id_unique ON public.navigation_items_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX pages_blocks_cards_features_locales_locale_parent_id_unique ON public.pages_blocks_cards_features_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX pages_blocks_cards_locales_locale_parent_id_unique ON public.pages_blocks_cards_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX pages_blocks_convert_hero_locales_locale_parent_id_unique ON public.pages_blocks_convert_hero_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX pages_blocks_cta_locales_locale_parent_id_unique ON public.pages_blocks_cta_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX pages_blocks_feature_grid_items_locales_locale_parent_id_uni ON public.pages_blocks_feature_grid_items_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX pages_blocks_feature_grid_locales_locale_parent_id_unique ON public.pages_blocks_feature_grid_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX pages_blocks_final_cta_locales_locale_parent_id_unique ON public.pages_blocks_final_cta_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX pages_blocks_global_finance_highlights_locales_locale_parent ON public.pages_blocks_global_finance_highlights_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX pages_blocks_global_finance_locales_locale_parent_id_unique ON public.pages_blocks_global_finance_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX pages_blocks_guest_widget_embed_locales_locale_parent_id_uni ON public.pages_blocks_guest_widget_embed_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX pages_blocks_hero_locales_locale_parent_id_unique ON public.pages_blocks_hero_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX pages_blocks_how_it_works_locales_locale_parent_id_unique ON public.pages_blocks_how_it_works_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX pages_blocks_how_it_works_steps_locales_locale_parent_id_uni ON public.pages_blocks_how_it_works_steps_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX pages_blocks_landing_hero_locales_locale_parent_id_unique ON public.pages_blocks_landing_hero_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX pages_blocks_landing_hero_trust_signals_locales_locale_paren ON public.pages_blocks_landing_hero_trust_signals_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX pages_blocks_media_showcase_locales_locale_parent_id_unique ON public.pages_blocks_media_showcase_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX pages_blocks_rich_text_content_locales_locale_parent_id_uniq ON public.pages_blocks_rich_text_content_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX pages_blocks_security_controls_locales_locale_parent_id_uniq ON public.pages_blocks_security_controls_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX pages_blocks_security_locales_locale_parent_id_unique ON public.pages_blocks_security_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX pages_blocks_stocks_ticker_locales_locale_parent_id_unique ON public.pages_blocks_stocks_ticker_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX pages_blocks_trust_footer_items_items_locales_locale_parent_ ON public.pages_blocks_trust_footer_items_items_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX pages_blocks_trust_footer_items_locales_locale_parent_id_uni ON public.pages_blocks_trust_footer_items_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX pages_blocks_trust_strip_locales_locale_parent_id_unique ON public.pages_blocks_trust_strip_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX pages_blocks_trust_strip_signals_locales_locale_parent_id_un ON public.pages_blocks_trust_strip_signals_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX pages_blocks_waitlist_cta_locales_locale_parent_id_unique ON public.pages_blocks_waitlist_cta_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX pages_blocks_why_koya_locales_locale_parent_id_unique ON public.pages_blocks_why_koya_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX pages_blocks_why_koya_stats_locales_locale_parent_id_unique ON public.pages_blocks_why_koya_stats_locales USING btree (_locale, _parent_id);
CREATE UNIQUE INDEX pages_locales_locale_parent_id_unique ON public.pages_locales USING btree (_locale, _parent_id);
ALTER TABLE ONLY public._faqs_v_locales
    ADD CONSTRAINT _faqs_v_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._faqs_v(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._footer_v_locales
    ADD CONSTRAINT _footer_v_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._footer_v(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._footer_v_version_columns_links_locales
    ADD CONSTRAINT _footer_v_version_columns_links_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._footer_v_version_columns_links(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._footer_v_version_columns_locales
    ADD CONSTRAINT _footer_v_version_columns_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._footer_v_version_columns(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._legal_pages_v_locales
    ADD CONSTRAINT _legal_pages_v_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._legal_pages_v(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._navigation_v_version_items_locales
    ADD CONSTRAINT _navigation_v_version_items_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._navigation_v_version_items(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_cards_features_locales
    ADD CONSTRAINT _pages_v_blocks_cards_features_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_cards_features(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_cards_locales
    ADD CONSTRAINT _pages_v_blocks_cards_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_cards(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_convert_hero_locales
    ADD CONSTRAINT _pages_v_blocks_convert_hero_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_convert_hero(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_cta_locales
    ADD CONSTRAINT _pages_v_blocks_cta_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_cta(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_feature_grid_items_locales
    ADD CONSTRAINT _pages_v_blocks_feature_grid_items_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_feature_grid_items(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_feature_grid_locales
    ADD CONSTRAINT _pages_v_blocks_feature_grid_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_feature_grid(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_final_cta_locales
    ADD CONSTRAINT _pages_v_blocks_final_cta_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_final_cta(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_global_finance_highlights_locales
    ADD CONSTRAINT _pages_v_blocks_global_finance_highlights_locales_parent__fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_global_finance_highlights(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_global_finance_locales
    ADD CONSTRAINT _pages_v_blocks_global_finance_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_global_finance(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_guest_widget_embed_locales
    ADD CONSTRAINT _pages_v_blocks_guest_widget_embed_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_guest_widget_embed(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_hero_locales
    ADD CONSTRAINT _pages_v_blocks_hero_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_hero(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_how_it_works_locales
    ADD CONSTRAINT _pages_v_blocks_how_it_works_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_how_it_works(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_how_it_works_steps_locales
    ADD CONSTRAINT _pages_v_blocks_how_it_works_steps_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_how_it_works_steps(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_landing_hero_locales
    ADD CONSTRAINT _pages_v_blocks_landing_hero_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_landing_hero(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_landing_hero_trust_signals_locales
    ADD CONSTRAINT _pages_v_blocks_landing_hero_trust_signals_locales_parent_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_landing_hero_trust_signals(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_media_showcase_locales
    ADD CONSTRAINT _pages_v_blocks_media_showcase_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_media_showcase(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_rich_text_content_locales
    ADD CONSTRAINT _pages_v_blocks_rich_text_content_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_rich_text_content(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_security_controls_locales
    ADD CONSTRAINT _pages_v_blocks_security_controls_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_security_controls(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_security_locales
    ADD CONSTRAINT _pages_v_blocks_security_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_security(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_stocks_ticker_locales
    ADD CONSTRAINT _pages_v_blocks_stocks_ticker_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_stocks_ticker(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_trust_footer_items_items_locales
    ADD CONSTRAINT _pages_v_blocks_trust_footer_items_items_locales_parent_i_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_trust_footer_items_items(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_trust_footer_items_locales
    ADD CONSTRAINT _pages_v_blocks_trust_footer_items_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_trust_footer_items(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_trust_strip_locales
    ADD CONSTRAINT _pages_v_blocks_trust_strip_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_trust_strip(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_trust_strip_signals_locales
    ADD CONSTRAINT _pages_v_blocks_trust_strip_signals_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_trust_strip_signals(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_waitlist_cta_locales
    ADD CONSTRAINT _pages_v_blocks_waitlist_cta_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_waitlist_cta(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_why_koya_locales
    ADD CONSTRAINT _pages_v_blocks_why_koya_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_why_koya(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_why_koya_stats_locales
    ADD CONSTRAINT _pages_v_blocks_why_koya_stats_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_why_koya_stats(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_locales
    ADD CONSTRAINT _pages_v_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.faqs_locales
    ADD CONSTRAINT faqs_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.faqs(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.footer_columns_links_locales
    ADD CONSTRAINT footer_columns_links_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.footer_columns_links(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.footer_columns_locales
    ADD CONSTRAINT footer_columns_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.footer_columns(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.footer_locales
    ADD CONSTRAINT footer_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.footer(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.legal_pages_locales
    ADD CONSTRAINT legal_pages_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.legal_pages(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.navigation_items_locales
    ADD CONSTRAINT navigation_items_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.navigation_items(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_cards_features_locales
    ADD CONSTRAINT pages_blocks_cards_features_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_cards_features(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_cards_locales
    ADD CONSTRAINT pages_blocks_cards_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_cards(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_convert_hero_locales
    ADD CONSTRAINT pages_blocks_convert_hero_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_convert_hero(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_cta_locales
    ADD CONSTRAINT pages_blocks_cta_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_cta(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_feature_grid_items_locales
    ADD CONSTRAINT pages_blocks_feature_grid_items_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_feature_grid_items(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_feature_grid_locales
    ADD CONSTRAINT pages_blocks_feature_grid_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_feature_grid(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_final_cta_locales
    ADD CONSTRAINT pages_blocks_final_cta_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_final_cta(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_global_finance_highlights_locales
    ADD CONSTRAINT pages_blocks_global_finance_highlights_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_global_finance_highlights(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_global_finance_locales
    ADD CONSTRAINT pages_blocks_global_finance_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_global_finance(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_guest_widget_embed_locales
    ADD CONSTRAINT pages_blocks_guest_widget_embed_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_guest_widget_embed(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_hero_locales
    ADD CONSTRAINT pages_blocks_hero_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_hero(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_how_it_works_locales
    ADD CONSTRAINT pages_blocks_how_it_works_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_how_it_works(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_how_it_works_steps_locales
    ADD CONSTRAINT pages_blocks_how_it_works_steps_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_how_it_works_steps(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_landing_hero_locales
    ADD CONSTRAINT pages_blocks_landing_hero_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_landing_hero(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_landing_hero_trust_signals_locales
    ADD CONSTRAINT pages_blocks_landing_hero_trust_signals_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_landing_hero_trust_signals(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_media_showcase_locales
    ADD CONSTRAINT pages_blocks_media_showcase_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_media_showcase(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_rich_text_content_locales
    ADD CONSTRAINT pages_blocks_rich_text_content_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_rich_text_content(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_security_controls_locales
    ADD CONSTRAINT pages_blocks_security_controls_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_security_controls(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_security_locales
    ADD CONSTRAINT pages_blocks_security_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_security(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_stocks_ticker_locales
    ADD CONSTRAINT pages_blocks_stocks_ticker_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_stocks_ticker(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_trust_footer_items_items_locales
    ADD CONSTRAINT pages_blocks_trust_footer_items_items_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_trust_footer_items_items(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_trust_footer_items_locales
    ADD CONSTRAINT pages_blocks_trust_footer_items_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_trust_footer_items(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_trust_strip_locales
    ADD CONSTRAINT pages_blocks_trust_strip_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_trust_strip(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_trust_strip_signals_locales
    ADD CONSTRAINT pages_blocks_trust_strip_signals_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_trust_strip_signals(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_waitlist_cta_locales
    ADD CONSTRAINT pages_blocks_waitlist_cta_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_waitlist_cta(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_why_koya_locales
    ADD CONSTRAINT pages_blocks_why_koya_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_why_koya(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_why_koya_stats_locales
    ADD CONSTRAINT pages_blocks_why_koya_stats_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_why_koya_stats(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_locales
    ADD CONSTRAINT pages_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;
-- backfill each _locales table from its parent at locale 'en'
INSERT INTO "_faqs_v_locales" ("_locale", "_parent_id", "version_question", "version_answer") SELECT 'en', p."id", p."version_question", p."version_answer" FROM "_faqs_v" p;
INSERT INTO "_footer_v_locales" ("_locale", "_parent_id", "version_legal_text") SELECT 'en', p."id", p."version_legal_text" FROM "_footer_v" p;
INSERT INTO "_footer_v_version_columns_links_locales" ("_locale", "_parent_id", "link_label") SELECT 'en', p."id", p."link_label" FROM "_footer_v_version_columns_links" p;
INSERT INTO "_footer_v_version_columns_locales" ("_locale", "_parent_id", "title") SELECT 'en', p."id", p."title" FROM "_footer_v_version_columns" p;
INSERT INTO "_legal_pages_v_locales" ("_locale", "_parent_id", "version_title", "version_body", "version_seo_meta_title", "version_seo_meta_description") SELECT 'en', p."id", p."version_title", p."version_body", p."version_seo_meta_title", p."version_seo_meta_description" FROM "_legal_pages_v" p;
INSERT INTO "_navigation_v_version_items_locales" ("_locale", "_parent_id", "link_label") SELECT 'en', p."id", p."link_label" FROM "_navigation_v_version_items" p;
INSERT INTO "_pages_v_blocks_cards_features_locales" ("_locale", "_parent_id", "title", "description") SELECT 'en', p."id", p."title", p."description" FROM "_pages_v_blocks_cards_features" p;
INSERT INTO "_pages_v_blocks_cards_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading" FROM "_pages_v_blocks_cards" p;
INSERT INTO "_pages_v_blocks_convert_hero_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading", "badge_text") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading", p."badge_text" FROM "_pages_v_blocks_convert_hero" p;
INSERT INTO "_pages_v_blocks_cta_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading", "primary_cta_label", "secondary_cta_label") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading", p."primary_cta_label", p."secondary_cta_label" FROM "_pages_v_blocks_cta" p;
INSERT INTO "_pages_v_blocks_feature_grid_items_locales" ("_locale", "_parent_id", "title", "description") SELECT 'en', p."id", p."title", p."description" FROM "_pages_v_blocks_feature_grid_items" p;
INSERT INTO "_pages_v_blocks_feature_grid_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading" FROM "_pages_v_blocks_feature_grid" p;
INSERT INTO "_pages_v_blocks_final_cta_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading", "primary_cta_label", "secondary_cta_label") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading", p."primary_cta_label", p."secondary_cta_label" FROM "_pages_v_blocks_final_cta" p;
INSERT INTO "_pages_v_blocks_global_finance_highlights_locales" ("_locale", "_parent_id", "title", "description") SELECT 'en', p."id", p."title", p."description" FROM "_pages_v_blocks_global_finance_highlights" p;
INSERT INTO "_pages_v_blocks_global_finance_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading" FROM "_pages_v_blocks_global_finance" p;
INSERT INTO "_pages_v_blocks_guest_widget_embed_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading", "badge_text") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading", p."badge_text" FROM "_pages_v_blocks_guest_widget_embed" p;
INSERT INTO "_pages_v_blocks_hero_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading", "primary_cta_label", "secondary_cta_label") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading", p."primary_cta_label", p."secondary_cta_label" FROM "_pages_v_blocks_hero" p;
INSERT INTO "_pages_v_blocks_how_it_works_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading" FROM "_pages_v_blocks_how_it_works" p;
INSERT INTO "_pages_v_blocks_how_it_works_steps_locales" ("_locale", "_parent_id", "title", "body") SELECT 'en', p."id", p."title", p."body" FROM "_pages_v_blocks_how_it_works_steps" p;
INSERT INTO "_pages_v_blocks_landing_hero_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading", "primary_cta_label", "secondary_cta_label", "widget_footnote") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading", p."primary_cta_label", p."secondary_cta_label", p."widget_footnote" FROM "_pages_v_blocks_landing_hero" p;
INSERT INTO "_pages_v_blocks_landing_hero_trust_signals_locales" ("_locale", "_parent_id", "label") SELECT 'en', p."id", p."label" FROM "_pages_v_blocks_landing_hero_trust_signals" p;
INSERT INTO "_pages_v_blocks_media_showcase_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading" FROM "_pages_v_blocks_media_showcase" p;
INSERT INTO "_pages_v_blocks_rich_text_content_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading", "body") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading", p."body" FROM "_pages_v_blocks_rich_text_content" p;
INSERT INTO "_pages_v_blocks_security_controls_locales" ("_locale", "_parent_id", "title", "description") SELECT 'en', p."id", p."title", p."description" FROM "_pages_v_blocks_security_controls" p;
INSERT INTO "_pages_v_blocks_security_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading" FROM "_pages_v_blocks_security" p;
INSERT INTO "_pages_v_blocks_stocks_ticker_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading" FROM "_pages_v_blocks_stocks_ticker" p;
INSERT INTO "_pages_v_blocks_trust_footer_items_items_locales" ("_locale", "_parent_id", "label") SELECT 'en', p."id", p."label" FROM "_pages_v_blocks_trust_footer_items_items" p;
INSERT INTO "_pages_v_blocks_trust_footer_items_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading" FROM "_pages_v_blocks_trust_footer_items" p;
INSERT INTO "_pages_v_blocks_trust_strip_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading" FROM "_pages_v_blocks_trust_strip" p;
INSERT INTO "_pages_v_blocks_trust_strip_signals_locales" ("_locale", "_parent_id", "label", "value") SELECT 'en', p."id", p."label", p."value" FROM "_pages_v_blocks_trust_strip_signals" p;
INSERT INTO "_pages_v_blocks_waitlist_cta_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading", "email_placeholder", "button_label", "success_text") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading", p."email_placeholder", p."button_label", p."success_text" FROM "_pages_v_blocks_waitlist_cta" p;
INSERT INTO "_pages_v_blocks_why_koya_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading" FROM "_pages_v_blocks_why_koya" p;
INSERT INTO "_pages_v_blocks_why_koya_stats_locales" ("_locale", "_parent_id", "value", "label") SELECT 'en', p."id", p."value", p."label" FROM "_pages_v_blocks_why_koya_stats" p;
INSERT INTO "_pages_v_locales" ("_locale", "_parent_id", "version_title", "version_seo_meta_title", "version_seo_meta_description") SELECT 'en', p."id", p."version_title", p."version_seo_meta_title", p."version_seo_meta_description" FROM "_pages_v" p;
INSERT INTO "faqs_locales" ("_locale", "_parent_id", "question", "answer") SELECT 'en', p."id", p."question", p."answer" FROM "faqs" p;
INSERT INTO "footer_columns_links_locales" ("_locale", "_parent_id", "link_label") SELECT 'en', p."id", p."link_label" FROM "footer_columns_links" p;
INSERT INTO "footer_columns_locales" ("_locale", "_parent_id", "title") SELECT 'en', p."id", p."title" FROM "footer_columns" p;
INSERT INTO "footer_locales" ("_locale", "_parent_id", "legal_text") SELECT 'en', p."id", p."legal_text" FROM "footer" p;
INSERT INTO "legal_pages_locales" ("_locale", "_parent_id", "title", "body", "seo_meta_title", "seo_meta_description") SELECT 'en', p."id", p."title", p."body", p."seo_meta_title", p."seo_meta_description" FROM "legal_pages" p;
INSERT INTO "navigation_items_locales" ("_locale", "_parent_id", "link_label") SELECT 'en', p."id", p."link_label" FROM "navigation_items" p;
INSERT INTO "pages_blocks_cards_features_locales" ("_locale", "_parent_id", "title", "description") SELECT 'en', p."id", p."title", p."description" FROM "pages_blocks_cards_features" p;
INSERT INTO "pages_blocks_cards_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading" FROM "pages_blocks_cards" p;
INSERT INTO "pages_blocks_convert_hero_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading", "badge_text") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading", p."badge_text" FROM "pages_blocks_convert_hero" p;
INSERT INTO "pages_blocks_cta_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading", "primary_cta_label", "secondary_cta_label") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading", p."primary_cta_label", p."secondary_cta_label" FROM "pages_blocks_cta" p;
INSERT INTO "pages_blocks_feature_grid_items_locales" ("_locale", "_parent_id", "title", "description") SELECT 'en', p."id", p."title", p."description" FROM "pages_blocks_feature_grid_items" p;
INSERT INTO "pages_blocks_feature_grid_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading" FROM "pages_blocks_feature_grid" p;
INSERT INTO "pages_blocks_final_cta_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading", "primary_cta_label", "secondary_cta_label") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading", p."primary_cta_label", p."secondary_cta_label" FROM "pages_blocks_final_cta" p;
INSERT INTO "pages_blocks_global_finance_highlights_locales" ("_locale", "_parent_id", "title", "description") SELECT 'en', p."id", p."title", p."description" FROM "pages_blocks_global_finance_highlights" p;
INSERT INTO "pages_blocks_global_finance_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading" FROM "pages_blocks_global_finance" p;
INSERT INTO "pages_blocks_guest_widget_embed_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading", "badge_text") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading", p."badge_text" FROM "pages_blocks_guest_widget_embed" p;
INSERT INTO "pages_blocks_hero_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading", "primary_cta_label", "secondary_cta_label") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading", p."primary_cta_label", p."secondary_cta_label" FROM "pages_blocks_hero" p;
INSERT INTO "pages_blocks_how_it_works_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading" FROM "pages_blocks_how_it_works" p;
INSERT INTO "pages_blocks_how_it_works_steps_locales" ("_locale", "_parent_id", "title", "body") SELECT 'en', p."id", p."title", p."body" FROM "pages_blocks_how_it_works_steps" p;
INSERT INTO "pages_blocks_landing_hero_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading", "primary_cta_label", "secondary_cta_label", "widget_footnote") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading", p."primary_cta_label", p."secondary_cta_label", p."widget_footnote" FROM "pages_blocks_landing_hero" p;
INSERT INTO "pages_blocks_landing_hero_trust_signals_locales" ("_locale", "_parent_id", "label") SELECT 'en', p."id", p."label" FROM "pages_blocks_landing_hero_trust_signals" p;
INSERT INTO "pages_blocks_media_showcase_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading" FROM "pages_blocks_media_showcase" p;
INSERT INTO "pages_blocks_rich_text_content_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading", "body") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading", p."body" FROM "pages_blocks_rich_text_content" p;
INSERT INTO "pages_blocks_security_controls_locales" ("_locale", "_parent_id", "title", "description") SELECT 'en', p."id", p."title", p."description" FROM "pages_blocks_security_controls" p;
INSERT INTO "pages_blocks_security_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading" FROM "pages_blocks_security" p;
INSERT INTO "pages_blocks_stocks_ticker_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading" FROM "pages_blocks_stocks_ticker" p;
INSERT INTO "pages_blocks_trust_footer_items_items_locales" ("_locale", "_parent_id", "label") SELECT 'en', p."id", p."label" FROM "pages_blocks_trust_footer_items_items" p;
INSERT INTO "pages_blocks_trust_footer_items_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading" FROM "pages_blocks_trust_footer_items" p;
INSERT INTO "pages_blocks_trust_strip_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading" FROM "pages_blocks_trust_strip" p;
INSERT INTO "pages_blocks_trust_strip_signals_locales" ("_locale", "_parent_id", "label", "value") SELECT 'en', p."id", p."label", p."value" FROM "pages_blocks_trust_strip_signals" p;
INSERT INTO "pages_blocks_waitlist_cta_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading", "email_placeholder", "button_label", "success_text") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading", p."email_placeholder", p."button_label", p."success_text" FROM "pages_blocks_waitlist_cta" p;
INSERT INTO "pages_blocks_why_koya_locales" ("_locale", "_parent_id", "eyebrow", "heading", "subheading") SELECT 'en', p."id", p."eyebrow", p."heading", p."subheading" FROM "pages_blocks_why_koya" p;
INSERT INTO "pages_blocks_why_koya_stats_locales" ("_locale", "_parent_id", "value", "label") SELECT 'en', p."id", p."value", p."label" FROM "pages_blocks_why_koya_stats" p;
INSERT INTO "pages_locales" ("_locale", "_parent_id", "title", "seo_meta_title", "seo_meta_description") SELECT 'en', p."id", p."title", p."seo_meta_title", p."seo_meta_description" FROM "pages" p;
-- drop the now-migrated localized columns from base + version tables
ALTER TABLE "_faqs_v" DROP COLUMN "version_question";
ALTER TABLE "_faqs_v" DROP COLUMN "version_answer";
ALTER TABLE "_footer_v" DROP COLUMN "version_legal_text";
ALTER TABLE "_footer_v_version_columns_links" DROP COLUMN "link_label";
ALTER TABLE "_footer_v_version_columns" DROP COLUMN "title";
ALTER TABLE "_legal_pages_v" DROP COLUMN "version_title";
ALTER TABLE "_legal_pages_v" DROP COLUMN "version_body";
ALTER TABLE "_legal_pages_v" DROP COLUMN "version_seo_meta_title";
ALTER TABLE "_legal_pages_v" DROP COLUMN "version_seo_meta_description";
ALTER TABLE "_navigation_v_version_items" DROP COLUMN "link_label";
ALTER TABLE "_pages_v_blocks_cards_features" DROP COLUMN "title";
ALTER TABLE "_pages_v_blocks_cards_features" DROP COLUMN "description";
ALTER TABLE "_pages_v_blocks_cards" DROP COLUMN "eyebrow";
ALTER TABLE "_pages_v_blocks_cards" DROP COLUMN "heading";
ALTER TABLE "_pages_v_blocks_cards" DROP COLUMN "subheading";
ALTER TABLE "_pages_v_blocks_convert_hero" DROP COLUMN "eyebrow";
ALTER TABLE "_pages_v_blocks_convert_hero" DROP COLUMN "heading";
ALTER TABLE "_pages_v_blocks_convert_hero" DROP COLUMN "subheading";
ALTER TABLE "_pages_v_blocks_convert_hero" DROP COLUMN "badge_text";
ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "eyebrow";
ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "heading";
ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "subheading";
ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "primary_cta_label";
ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "secondary_cta_label";
ALTER TABLE "_pages_v_blocks_feature_grid_items" DROP COLUMN "title";
ALTER TABLE "_pages_v_blocks_feature_grid_items" DROP COLUMN "description";
ALTER TABLE "_pages_v_blocks_feature_grid" DROP COLUMN "eyebrow";
ALTER TABLE "_pages_v_blocks_feature_grid" DROP COLUMN "heading";
ALTER TABLE "_pages_v_blocks_feature_grid" DROP COLUMN "subheading";
ALTER TABLE "_pages_v_blocks_final_cta" DROP COLUMN "eyebrow";
ALTER TABLE "_pages_v_blocks_final_cta" DROP COLUMN "heading";
ALTER TABLE "_pages_v_blocks_final_cta" DROP COLUMN "subheading";
ALTER TABLE "_pages_v_blocks_final_cta" DROP COLUMN "primary_cta_label";
ALTER TABLE "_pages_v_blocks_final_cta" DROP COLUMN "secondary_cta_label";
ALTER TABLE "_pages_v_blocks_global_finance_highlights" DROP COLUMN "title";
ALTER TABLE "_pages_v_blocks_global_finance_highlights" DROP COLUMN "description";
ALTER TABLE "_pages_v_blocks_global_finance" DROP COLUMN "eyebrow";
ALTER TABLE "_pages_v_blocks_global_finance" DROP COLUMN "heading";
ALTER TABLE "_pages_v_blocks_global_finance" DROP COLUMN "subheading";
ALTER TABLE "_pages_v_blocks_guest_widget_embed" DROP COLUMN "eyebrow";
ALTER TABLE "_pages_v_blocks_guest_widget_embed" DROP COLUMN "heading";
ALTER TABLE "_pages_v_blocks_guest_widget_embed" DROP COLUMN "subheading";
ALTER TABLE "_pages_v_blocks_guest_widget_embed" DROP COLUMN "badge_text";
ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "eyebrow";
ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "heading";
ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "subheading";
ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "primary_cta_label";
ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "secondary_cta_label";
ALTER TABLE "_pages_v_blocks_how_it_works" DROP COLUMN "eyebrow";
ALTER TABLE "_pages_v_blocks_how_it_works" DROP COLUMN "heading";
ALTER TABLE "_pages_v_blocks_how_it_works" DROP COLUMN "subheading";
ALTER TABLE "_pages_v_blocks_how_it_works_steps" DROP COLUMN "title";
ALTER TABLE "_pages_v_blocks_how_it_works_steps" DROP COLUMN "body";
ALTER TABLE "_pages_v_blocks_landing_hero" DROP COLUMN "eyebrow";
ALTER TABLE "_pages_v_blocks_landing_hero" DROP COLUMN "heading";
ALTER TABLE "_pages_v_blocks_landing_hero" DROP COLUMN "subheading";
ALTER TABLE "_pages_v_blocks_landing_hero" DROP COLUMN "primary_cta_label";
ALTER TABLE "_pages_v_blocks_landing_hero" DROP COLUMN "secondary_cta_label";
ALTER TABLE "_pages_v_blocks_landing_hero" DROP COLUMN "widget_footnote";
ALTER TABLE "_pages_v_blocks_landing_hero_trust_signals" DROP COLUMN "label";
ALTER TABLE "_pages_v_blocks_media_showcase" DROP COLUMN "eyebrow";
ALTER TABLE "_pages_v_blocks_media_showcase" DROP COLUMN "heading";
ALTER TABLE "_pages_v_blocks_media_showcase" DROP COLUMN "subheading";
ALTER TABLE "_pages_v_blocks_rich_text_content" DROP COLUMN "eyebrow";
ALTER TABLE "_pages_v_blocks_rich_text_content" DROP COLUMN "heading";
ALTER TABLE "_pages_v_blocks_rich_text_content" DROP COLUMN "subheading";
ALTER TABLE "_pages_v_blocks_rich_text_content" DROP COLUMN "body";
ALTER TABLE "_pages_v_blocks_security_controls" DROP COLUMN "title";
ALTER TABLE "_pages_v_blocks_security_controls" DROP COLUMN "description";
ALTER TABLE "_pages_v_blocks_security" DROP COLUMN "eyebrow";
ALTER TABLE "_pages_v_blocks_security" DROP COLUMN "heading";
ALTER TABLE "_pages_v_blocks_security" DROP COLUMN "subheading";
ALTER TABLE "_pages_v_blocks_stocks_ticker" DROP COLUMN "eyebrow";
ALTER TABLE "_pages_v_blocks_stocks_ticker" DROP COLUMN "heading";
ALTER TABLE "_pages_v_blocks_stocks_ticker" DROP COLUMN "subheading";
ALTER TABLE "_pages_v_blocks_trust_footer_items_items" DROP COLUMN "label";
ALTER TABLE "_pages_v_blocks_trust_footer_items" DROP COLUMN "eyebrow";
ALTER TABLE "_pages_v_blocks_trust_footer_items" DROP COLUMN "heading";
ALTER TABLE "_pages_v_blocks_trust_footer_items" DROP COLUMN "subheading";
ALTER TABLE "_pages_v_blocks_trust_strip" DROP COLUMN "eyebrow";
ALTER TABLE "_pages_v_blocks_trust_strip" DROP COLUMN "heading";
ALTER TABLE "_pages_v_blocks_trust_strip" DROP COLUMN "subheading";
ALTER TABLE "_pages_v_blocks_trust_strip_signals" DROP COLUMN "label";
ALTER TABLE "_pages_v_blocks_trust_strip_signals" DROP COLUMN "value";
ALTER TABLE "_pages_v_blocks_waitlist_cta" DROP COLUMN "eyebrow";
ALTER TABLE "_pages_v_blocks_waitlist_cta" DROP COLUMN "heading";
ALTER TABLE "_pages_v_blocks_waitlist_cta" DROP COLUMN "subheading";
ALTER TABLE "_pages_v_blocks_waitlist_cta" DROP COLUMN "email_placeholder";
ALTER TABLE "_pages_v_blocks_waitlist_cta" DROP COLUMN "button_label";
ALTER TABLE "_pages_v_blocks_waitlist_cta" DROP COLUMN "success_text";
ALTER TABLE "_pages_v_blocks_why_koya" DROP COLUMN "eyebrow";
ALTER TABLE "_pages_v_blocks_why_koya" DROP COLUMN "heading";
ALTER TABLE "_pages_v_blocks_why_koya" DROP COLUMN "subheading";
ALTER TABLE "_pages_v_blocks_why_koya_stats" DROP COLUMN "value";
ALTER TABLE "_pages_v_blocks_why_koya_stats" DROP COLUMN "label";
ALTER TABLE "_pages_v" DROP COLUMN "version_title";
ALTER TABLE "_pages_v" DROP COLUMN "version_seo_meta_title";
ALTER TABLE "_pages_v" DROP COLUMN "version_seo_meta_description";
ALTER TABLE "faqs" DROP COLUMN "question";
ALTER TABLE "faqs" DROP COLUMN "answer";
ALTER TABLE "footer_columns_links" DROP COLUMN "link_label";
ALTER TABLE "footer_columns" DROP COLUMN "title";
ALTER TABLE "footer" DROP COLUMN "legal_text";
ALTER TABLE "legal_pages" DROP COLUMN "title";
ALTER TABLE "legal_pages" DROP COLUMN "body";
ALTER TABLE "legal_pages" DROP COLUMN "seo_meta_title";
ALTER TABLE "legal_pages" DROP COLUMN "seo_meta_description";
ALTER TABLE "navigation_items" DROP COLUMN "link_label";
ALTER TABLE "pages_blocks_cards_features" DROP COLUMN "title";
ALTER TABLE "pages_blocks_cards_features" DROP COLUMN "description";
ALTER TABLE "pages_blocks_cards" DROP COLUMN "eyebrow";
ALTER TABLE "pages_blocks_cards" DROP COLUMN "heading";
ALTER TABLE "pages_blocks_cards" DROP COLUMN "subheading";
ALTER TABLE "pages_blocks_convert_hero" DROP COLUMN "eyebrow";
ALTER TABLE "pages_blocks_convert_hero" DROP COLUMN "heading";
ALTER TABLE "pages_blocks_convert_hero" DROP COLUMN "subheading";
ALTER TABLE "pages_blocks_convert_hero" DROP COLUMN "badge_text";
ALTER TABLE "pages_blocks_cta" DROP COLUMN "eyebrow";
ALTER TABLE "pages_blocks_cta" DROP COLUMN "heading";
ALTER TABLE "pages_blocks_cta" DROP COLUMN "subheading";
ALTER TABLE "pages_blocks_cta" DROP COLUMN "primary_cta_label";
ALTER TABLE "pages_blocks_cta" DROP COLUMN "secondary_cta_label";
ALTER TABLE "pages_blocks_feature_grid_items" DROP COLUMN "title";
ALTER TABLE "pages_blocks_feature_grid_items" DROP COLUMN "description";
ALTER TABLE "pages_blocks_feature_grid" DROP COLUMN "eyebrow";
ALTER TABLE "pages_blocks_feature_grid" DROP COLUMN "heading";
ALTER TABLE "pages_blocks_feature_grid" DROP COLUMN "subheading";
ALTER TABLE "pages_blocks_final_cta" DROP COLUMN "eyebrow";
ALTER TABLE "pages_blocks_final_cta" DROP COLUMN "heading";
ALTER TABLE "pages_blocks_final_cta" DROP COLUMN "subheading";
ALTER TABLE "pages_blocks_final_cta" DROP COLUMN "primary_cta_label";
ALTER TABLE "pages_blocks_final_cta" DROP COLUMN "secondary_cta_label";
ALTER TABLE "pages_blocks_global_finance_highlights" DROP COLUMN "title";
ALTER TABLE "pages_blocks_global_finance_highlights" DROP COLUMN "description";
ALTER TABLE "pages_blocks_global_finance" DROP COLUMN "eyebrow";
ALTER TABLE "pages_blocks_global_finance" DROP COLUMN "heading";
ALTER TABLE "pages_blocks_global_finance" DROP COLUMN "subheading";
ALTER TABLE "pages_blocks_guest_widget_embed" DROP COLUMN "eyebrow";
ALTER TABLE "pages_blocks_guest_widget_embed" DROP COLUMN "heading";
ALTER TABLE "pages_blocks_guest_widget_embed" DROP COLUMN "subheading";
ALTER TABLE "pages_blocks_guest_widget_embed" DROP COLUMN "badge_text";
ALTER TABLE "pages_blocks_hero" DROP COLUMN "eyebrow";
ALTER TABLE "pages_blocks_hero" DROP COLUMN "heading";
ALTER TABLE "pages_blocks_hero" DROP COLUMN "subheading";
ALTER TABLE "pages_blocks_hero" DROP COLUMN "primary_cta_label";
ALTER TABLE "pages_blocks_hero" DROP COLUMN "secondary_cta_label";
ALTER TABLE "pages_blocks_how_it_works" DROP COLUMN "eyebrow";
ALTER TABLE "pages_blocks_how_it_works" DROP COLUMN "heading";
ALTER TABLE "pages_blocks_how_it_works" DROP COLUMN "subheading";
ALTER TABLE "pages_blocks_how_it_works_steps" DROP COLUMN "title";
ALTER TABLE "pages_blocks_how_it_works_steps" DROP COLUMN "body";
ALTER TABLE "pages_blocks_landing_hero" DROP COLUMN "eyebrow";
ALTER TABLE "pages_blocks_landing_hero" DROP COLUMN "heading";
ALTER TABLE "pages_blocks_landing_hero" DROP COLUMN "subheading";
ALTER TABLE "pages_blocks_landing_hero" DROP COLUMN "primary_cta_label";
ALTER TABLE "pages_blocks_landing_hero" DROP COLUMN "secondary_cta_label";
ALTER TABLE "pages_blocks_landing_hero" DROP COLUMN "widget_footnote";
ALTER TABLE "pages_blocks_landing_hero_trust_signals" DROP COLUMN "label";
ALTER TABLE "pages_blocks_media_showcase" DROP COLUMN "eyebrow";
ALTER TABLE "pages_blocks_media_showcase" DROP COLUMN "heading";
ALTER TABLE "pages_blocks_media_showcase" DROP COLUMN "subheading";
ALTER TABLE "pages_blocks_rich_text_content" DROP COLUMN "eyebrow";
ALTER TABLE "pages_blocks_rich_text_content" DROP COLUMN "heading";
ALTER TABLE "pages_blocks_rich_text_content" DROP COLUMN "subheading";
ALTER TABLE "pages_blocks_rich_text_content" DROP COLUMN "body";
ALTER TABLE "pages_blocks_security_controls" DROP COLUMN "title";
ALTER TABLE "pages_blocks_security_controls" DROP COLUMN "description";
ALTER TABLE "pages_blocks_security" DROP COLUMN "eyebrow";
ALTER TABLE "pages_blocks_security" DROP COLUMN "heading";
ALTER TABLE "pages_blocks_security" DROP COLUMN "subheading";
ALTER TABLE "pages_blocks_stocks_ticker" DROP COLUMN "eyebrow";
ALTER TABLE "pages_blocks_stocks_ticker" DROP COLUMN "heading";
ALTER TABLE "pages_blocks_stocks_ticker" DROP COLUMN "subheading";
ALTER TABLE "pages_blocks_trust_footer_items_items" DROP COLUMN "label";
ALTER TABLE "pages_blocks_trust_footer_items" DROP COLUMN "eyebrow";
ALTER TABLE "pages_blocks_trust_footer_items" DROP COLUMN "heading";
ALTER TABLE "pages_blocks_trust_footer_items" DROP COLUMN "subheading";
ALTER TABLE "pages_blocks_trust_strip" DROP COLUMN "eyebrow";
ALTER TABLE "pages_blocks_trust_strip" DROP COLUMN "heading";
ALTER TABLE "pages_blocks_trust_strip" DROP COLUMN "subheading";
ALTER TABLE "pages_blocks_trust_strip_signals" DROP COLUMN "label";
ALTER TABLE "pages_blocks_trust_strip_signals" DROP COLUMN "value";
ALTER TABLE "pages_blocks_waitlist_cta" DROP COLUMN "eyebrow";
ALTER TABLE "pages_blocks_waitlist_cta" DROP COLUMN "heading";
ALTER TABLE "pages_blocks_waitlist_cta" DROP COLUMN "subheading";
ALTER TABLE "pages_blocks_waitlist_cta" DROP COLUMN "email_placeholder";
ALTER TABLE "pages_blocks_waitlist_cta" DROP COLUMN "button_label";
ALTER TABLE "pages_blocks_waitlist_cta" DROP COLUMN "success_text";
ALTER TABLE "pages_blocks_why_koya" DROP COLUMN "eyebrow";
ALTER TABLE "pages_blocks_why_koya" DROP COLUMN "heading";
ALTER TABLE "pages_blocks_why_koya" DROP COLUMN "subheading";
ALTER TABLE "pages_blocks_why_koya_stats" DROP COLUMN "value";
ALTER TABLE "pages_blocks_why_koya_stats" DROP COLUMN "label";
ALTER TABLE "pages" DROP COLUMN "title";
ALTER TABLE "pages" DROP COLUMN "seo_meta_title";
ALTER TABLE "pages" DROP COLUMN "seo_meta_description";
`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
-- re-add dropped columns (nullable), backfill from _locales, restore NOT NULL
ALTER TABLE "_faqs_v" ADD COLUMN "version_question" varchar;
ALTER TABLE "_faqs_v" ADD COLUMN "version_answer" varchar;
UPDATE "_faqs_v" p SET "version_question" = l."version_question", "version_answer" = l."version_answer" FROM "_faqs_v_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "_footer_v" ADD COLUMN "version_legal_text" varchar;
UPDATE "_footer_v" p SET "version_legal_text" = l."version_legal_text" FROM "_footer_v_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "_footer_v_version_columns_links" ADD COLUMN "link_label" varchar;
UPDATE "_footer_v_version_columns_links" p SET "link_label" = l."link_label" FROM "_footer_v_version_columns_links_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "_footer_v_version_columns" ADD COLUMN "title" varchar;
UPDATE "_footer_v_version_columns" p SET "title" = l."title" FROM "_footer_v_version_columns_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "_legal_pages_v" ADD COLUMN "version_title" varchar;
ALTER TABLE "_legal_pages_v" ADD COLUMN "version_body" jsonb;
ALTER TABLE "_legal_pages_v" ADD COLUMN "version_seo_meta_title" varchar;
ALTER TABLE "_legal_pages_v" ADD COLUMN "version_seo_meta_description" varchar;
UPDATE "_legal_pages_v" p SET "version_title" = l."version_title", "version_body" = l."version_body", "version_seo_meta_title" = l."version_seo_meta_title", "version_seo_meta_description" = l."version_seo_meta_description" FROM "_legal_pages_v_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "_navigation_v_version_items" ADD COLUMN "link_label" varchar;
UPDATE "_navigation_v_version_items" p SET "link_label" = l."link_label" FROM "_navigation_v_version_items_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "_pages_v_blocks_cards_features" ADD COLUMN "title" varchar;
ALTER TABLE "_pages_v_blocks_cards_features" ADD COLUMN "description" varchar;
UPDATE "_pages_v_blocks_cards_features" p SET "title" = l."title", "description" = l."description" FROM "_pages_v_blocks_cards_features_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "_pages_v_blocks_cards" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "_pages_v_blocks_cards" ADD COLUMN "heading" varchar;
ALTER TABLE "_pages_v_blocks_cards" ADD COLUMN "subheading" varchar;
UPDATE "_pages_v_blocks_cards" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading" FROM "_pages_v_blocks_cards_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "_pages_v_blocks_convert_hero" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "_pages_v_blocks_convert_hero" ADD COLUMN "heading" varchar;
ALTER TABLE "_pages_v_blocks_convert_hero" ADD COLUMN "subheading" varchar;
ALTER TABLE "_pages_v_blocks_convert_hero" ADD COLUMN "badge_text" varchar;
UPDATE "_pages_v_blocks_convert_hero" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading", "badge_text" = l."badge_text" FROM "_pages_v_blocks_convert_hero_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "heading" varchar;
ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "subheading" varchar;
ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "primary_cta_label" varchar;
ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "secondary_cta_label" varchar;
UPDATE "_pages_v_blocks_cta" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading", "primary_cta_label" = l."primary_cta_label", "secondary_cta_label" = l."secondary_cta_label" FROM "_pages_v_blocks_cta_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "_pages_v_blocks_feature_grid_items" ADD COLUMN "title" varchar;
ALTER TABLE "_pages_v_blocks_feature_grid_items" ADD COLUMN "description" varchar;
UPDATE "_pages_v_blocks_feature_grid_items" p SET "title" = l."title", "description" = l."description" FROM "_pages_v_blocks_feature_grid_items_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "_pages_v_blocks_feature_grid" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "_pages_v_blocks_feature_grid" ADD COLUMN "heading" varchar;
ALTER TABLE "_pages_v_blocks_feature_grid" ADD COLUMN "subheading" varchar;
UPDATE "_pages_v_blocks_feature_grid" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading" FROM "_pages_v_blocks_feature_grid_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "_pages_v_blocks_final_cta" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "_pages_v_blocks_final_cta" ADD COLUMN "heading" varchar;
ALTER TABLE "_pages_v_blocks_final_cta" ADD COLUMN "subheading" varchar;
ALTER TABLE "_pages_v_blocks_final_cta" ADD COLUMN "primary_cta_label" varchar;
ALTER TABLE "_pages_v_blocks_final_cta" ADD COLUMN "secondary_cta_label" varchar;
UPDATE "_pages_v_blocks_final_cta" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading", "primary_cta_label" = l."primary_cta_label", "secondary_cta_label" = l."secondary_cta_label" FROM "_pages_v_blocks_final_cta_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "_pages_v_blocks_global_finance_highlights" ADD COLUMN "title" varchar;
ALTER TABLE "_pages_v_blocks_global_finance_highlights" ADD COLUMN "description" varchar;
UPDATE "_pages_v_blocks_global_finance_highlights" p SET "title" = l."title", "description" = l."description" FROM "_pages_v_blocks_global_finance_highlights_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "_pages_v_blocks_global_finance" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "_pages_v_blocks_global_finance" ADD COLUMN "heading" varchar;
ALTER TABLE "_pages_v_blocks_global_finance" ADD COLUMN "subheading" varchar;
UPDATE "_pages_v_blocks_global_finance" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading" FROM "_pages_v_blocks_global_finance_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "_pages_v_blocks_guest_widget_embed" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "_pages_v_blocks_guest_widget_embed" ADD COLUMN "heading" varchar;
ALTER TABLE "_pages_v_blocks_guest_widget_embed" ADD COLUMN "subheading" varchar;
ALTER TABLE "_pages_v_blocks_guest_widget_embed" ADD COLUMN "badge_text" varchar;
UPDATE "_pages_v_blocks_guest_widget_embed" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading", "badge_text" = l."badge_text" FROM "_pages_v_blocks_guest_widget_embed_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "heading" varchar;
ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "subheading" varchar;
ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "primary_cta_label" varchar;
ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "secondary_cta_label" varchar;
UPDATE "_pages_v_blocks_hero" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading", "primary_cta_label" = l."primary_cta_label", "secondary_cta_label" = l."secondary_cta_label" FROM "_pages_v_blocks_hero_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "_pages_v_blocks_how_it_works" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "_pages_v_blocks_how_it_works" ADD COLUMN "heading" varchar;
ALTER TABLE "_pages_v_blocks_how_it_works" ADD COLUMN "subheading" varchar;
UPDATE "_pages_v_blocks_how_it_works" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading" FROM "_pages_v_blocks_how_it_works_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "_pages_v_blocks_how_it_works_steps" ADD COLUMN "title" varchar;
ALTER TABLE "_pages_v_blocks_how_it_works_steps" ADD COLUMN "body" varchar;
UPDATE "_pages_v_blocks_how_it_works_steps" p SET "title" = l."title", "body" = l."body" FROM "_pages_v_blocks_how_it_works_steps_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "_pages_v_blocks_landing_hero" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "_pages_v_blocks_landing_hero" ADD COLUMN "heading" varchar;
ALTER TABLE "_pages_v_blocks_landing_hero" ADD COLUMN "subheading" varchar;
ALTER TABLE "_pages_v_blocks_landing_hero" ADD COLUMN "primary_cta_label" varchar;
ALTER TABLE "_pages_v_blocks_landing_hero" ADD COLUMN "secondary_cta_label" varchar;
ALTER TABLE "_pages_v_blocks_landing_hero" ADD COLUMN "widget_footnote" varchar;
UPDATE "_pages_v_blocks_landing_hero" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading", "primary_cta_label" = l."primary_cta_label", "secondary_cta_label" = l."secondary_cta_label", "widget_footnote" = l."widget_footnote" FROM "_pages_v_blocks_landing_hero_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "_pages_v_blocks_landing_hero_trust_signals" ADD COLUMN "label" varchar;
UPDATE "_pages_v_blocks_landing_hero_trust_signals" p SET "label" = l."label" FROM "_pages_v_blocks_landing_hero_trust_signals_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "_pages_v_blocks_media_showcase" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "_pages_v_blocks_media_showcase" ADD COLUMN "heading" varchar;
ALTER TABLE "_pages_v_blocks_media_showcase" ADD COLUMN "subheading" varchar;
UPDATE "_pages_v_blocks_media_showcase" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading" FROM "_pages_v_blocks_media_showcase_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "_pages_v_blocks_rich_text_content" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "_pages_v_blocks_rich_text_content" ADD COLUMN "heading" varchar;
ALTER TABLE "_pages_v_blocks_rich_text_content" ADD COLUMN "subheading" varchar;
ALTER TABLE "_pages_v_blocks_rich_text_content" ADD COLUMN "body" jsonb;
UPDATE "_pages_v_blocks_rich_text_content" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading", "body" = l."body" FROM "_pages_v_blocks_rich_text_content_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "_pages_v_blocks_security_controls" ADD COLUMN "title" varchar;
ALTER TABLE "_pages_v_blocks_security_controls" ADD COLUMN "description" varchar;
UPDATE "_pages_v_blocks_security_controls" p SET "title" = l."title", "description" = l."description" FROM "_pages_v_blocks_security_controls_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "_pages_v_blocks_security" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "_pages_v_blocks_security" ADD COLUMN "heading" varchar;
ALTER TABLE "_pages_v_blocks_security" ADD COLUMN "subheading" varchar;
UPDATE "_pages_v_blocks_security" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading" FROM "_pages_v_blocks_security_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "_pages_v_blocks_stocks_ticker" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "_pages_v_blocks_stocks_ticker" ADD COLUMN "heading" varchar;
ALTER TABLE "_pages_v_blocks_stocks_ticker" ADD COLUMN "subheading" varchar;
UPDATE "_pages_v_blocks_stocks_ticker" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading" FROM "_pages_v_blocks_stocks_ticker_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "_pages_v_blocks_trust_footer_items_items" ADD COLUMN "label" varchar;
UPDATE "_pages_v_blocks_trust_footer_items_items" p SET "label" = l."label" FROM "_pages_v_blocks_trust_footer_items_items_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "_pages_v_blocks_trust_footer_items" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "_pages_v_blocks_trust_footer_items" ADD COLUMN "heading" varchar;
ALTER TABLE "_pages_v_blocks_trust_footer_items" ADD COLUMN "subheading" varchar;
UPDATE "_pages_v_blocks_trust_footer_items" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading" FROM "_pages_v_blocks_trust_footer_items_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "_pages_v_blocks_trust_strip" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "_pages_v_blocks_trust_strip" ADD COLUMN "heading" varchar;
ALTER TABLE "_pages_v_blocks_trust_strip" ADD COLUMN "subheading" varchar;
UPDATE "_pages_v_blocks_trust_strip" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading" FROM "_pages_v_blocks_trust_strip_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "_pages_v_blocks_trust_strip_signals" ADD COLUMN "label" varchar;
ALTER TABLE "_pages_v_blocks_trust_strip_signals" ADD COLUMN "value" varchar;
UPDATE "_pages_v_blocks_trust_strip_signals" p SET "label" = l."label", "value" = l."value" FROM "_pages_v_blocks_trust_strip_signals_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "_pages_v_blocks_waitlist_cta" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "_pages_v_blocks_waitlist_cta" ADD COLUMN "heading" varchar;
ALTER TABLE "_pages_v_blocks_waitlist_cta" ADD COLUMN "subheading" varchar;
ALTER TABLE "_pages_v_blocks_waitlist_cta" ADD COLUMN "email_placeholder" varchar;
ALTER TABLE "_pages_v_blocks_waitlist_cta" ADD COLUMN "button_label" varchar;
ALTER TABLE "_pages_v_blocks_waitlist_cta" ADD COLUMN "success_text" varchar;
UPDATE "_pages_v_blocks_waitlist_cta" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading", "email_placeholder" = l."email_placeholder", "button_label" = l."button_label", "success_text" = l."success_text" FROM "_pages_v_blocks_waitlist_cta_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "_pages_v_blocks_why_koya" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "_pages_v_blocks_why_koya" ADD COLUMN "heading" varchar;
ALTER TABLE "_pages_v_blocks_why_koya" ADD COLUMN "subheading" varchar;
UPDATE "_pages_v_blocks_why_koya" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading" FROM "_pages_v_blocks_why_koya_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "_pages_v_blocks_why_koya_stats" ADD COLUMN "value" varchar;
ALTER TABLE "_pages_v_blocks_why_koya_stats" ADD COLUMN "label" varchar;
UPDATE "_pages_v_blocks_why_koya_stats" p SET "value" = l."value", "label" = l."label" FROM "_pages_v_blocks_why_koya_stats_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "_pages_v" ADD COLUMN "version_title" varchar;
ALTER TABLE "_pages_v" ADD COLUMN "version_seo_meta_title" varchar;
ALTER TABLE "_pages_v" ADD COLUMN "version_seo_meta_description" varchar;
UPDATE "_pages_v" p SET "version_title" = l."version_title", "version_seo_meta_title" = l."version_seo_meta_title", "version_seo_meta_description" = l."version_seo_meta_description" FROM "_pages_v_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "faqs" ADD COLUMN "question" varchar;
ALTER TABLE "faqs" ADD COLUMN "answer" varchar;
UPDATE "faqs" p SET "question" = l."question", "answer" = l."answer" FROM "faqs_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "footer_columns_links" ADD COLUMN "link_label" varchar;
UPDATE "footer_columns_links" p SET "link_label" = l."link_label" FROM "footer_columns_links_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "footer_columns" ADD COLUMN "title" varchar;
UPDATE "footer_columns" p SET "title" = l."title" FROM "footer_columns_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "footer" ADD COLUMN "legal_text" varchar;
UPDATE "footer" p SET "legal_text" = l."legal_text" FROM "footer_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "legal_pages" ADD COLUMN "title" varchar;
ALTER TABLE "legal_pages" ADD COLUMN "body" jsonb;
ALTER TABLE "legal_pages" ADD COLUMN "seo_meta_title" varchar;
ALTER TABLE "legal_pages" ADD COLUMN "seo_meta_description" varchar;
UPDATE "legal_pages" p SET "title" = l."title", "body" = l."body", "seo_meta_title" = l."seo_meta_title", "seo_meta_description" = l."seo_meta_description" FROM "legal_pages_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "navigation_items" ADD COLUMN "link_label" varchar;
UPDATE "navigation_items" p SET "link_label" = l."link_label" FROM "navigation_items_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "pages_blocks_cards_features" ADD COLUMN "title" varchar;
ALTER TABLE "pages_blocks_cards_features" ADD COLUMN "description" varchar;
UPDATE "pages_blocks_cards_features" p SET "title" = l."title", "description" = l."description" FROM "pages_blocks_cards_features_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "pages_blocks_cards" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "pages_blocks_cards" ADD COLUMN "heading" varchar;
ALTER TABLE "pages_blocks_cards" ADD COLUMN "subheading" varchar;
UPDATE "pages_blocks_cards" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading" FROM "pages_blocks_cards_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "pages_blocks_convert_hero" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "pages_blocks_convert_hero" ADD COLUMN "heading" varchar;
ALTER TABLE "pages_blocks_convert_hero" ADD COLUMN "subheading" varchar;
ALTER TABLE "pages_blocks_convert_hero" ADD COLUMN "badge_text" varchar;
UPDATE "pages_blocks_convert_hero" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading", "badge_text" = l."badge_text" FROM "pages_blocks_convert_hero_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "pages_blocks_cta" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "pages_blocks_cta" ADD COLUMN "heading" varchar;
ALTER TABLE "pages_blocks_cta" ADD COLUMN "subheading" varchar;
ALTER TABLE "pages_blocks_cta" ADD COLUMN "primary_cta_label" varchar;
ALTER TABLE "pages_blocks_cta" ADD COLUMN "secondary_cta_label" varchar;
UPDATE "pages_blocks_cta" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading", "primary_cta_label" = l."primary_cta_label", "secondary_cta_label" = l."secondary_cta_label" FROM "pages_blocks_cta_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "pages_blocks_feature_grid_items" ADD COLUMN "title" varchar;
ALTER TABLE "pages_blocks_feature_grid_items" ADD COLUMN "description" varchar;
UPDATE "pages_blocks_feature_grid_items" p SET "title" = l."title", "description" = l."description" FROM "pages_blocks_feature_grid_items_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "pages_blocks_feature_grid" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "pages_blocks_feature_grid" ADD COLUMN "heading" varchar;
ALTER TABLE "pages_blocks_feature_grid" ADD COLUMN "subheading" varchar;
UPDATE "pages_blocks_feature_grid" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading" FROM "pages_blocks_feature_grid_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "pages_blocks_final_cta" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "pages_blocks_final_cta" ADD COLUMN "heading" varchar;
ALTER TABLE "pages_blocks_final_cta" ADD COLUMN "subheading" varchar;
ALTER TABLE "pages_blocks_final_cta" ADD COLUMN "primary_cta_label" varchar;
ALTER TABLE "pages_blocks_final_cta" ADD COLUMN "secondary_cta_label" varchar;
UPDATE "pages_blocks_final_cta" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading", "primary_cta_label" = l."primary_cta_label", "secondary_cta_label" = l."secondary_cta_label" FROM "pages_blocks_final_cta_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "pages_blocks_global_finance_highlights" ADD COLUMN "title" varchar;
ALTER TABLE "pages_blocks_global_finance_highlights" ADD COLUMN "description" varchar;
UPDATE "pages_blocks_global_finance_highlights" p SET "title" = l."title", "description" = l."description" FROM "pages_blocks_global_finance_highlights_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "pages_blocks_global_finance" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "pages_blocks_global_finance" ADD COLUMN "heading" varchar;
ALTER TABLE "pages_blocks_global_finance" ADD COLUMN "subheading" varchar;
UPDATE "pages_blocks_global_finance" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading" FROM "pages_blocks_global_finance_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "pages_blocks_guest_widget_embed" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "pages_blocks_guest_widget_embed" ADD COLUMN "heading" varchar;
ALTER TABLE "pages_blocks_guest_widget_embed" ADD COLUMN "subheading" varchar;
ALTER TABLE "pages_blocks_guest_widget_embed" ADD COLUMN "badge_text" varchar;
UPDATE "pages_blocks_guest_widget_embed" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading", "badge_text" = l."badge_text" FROM "pages_blocks_guest_widget_embed_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "pages_blocks_hero" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "pages_blocks_hero" ADD COLUMN "heading" varchar;
ALTER TABLE "pages_blocks_hero" ADD COLUMN "subheading" varchar;
ALTER TABLE "pages_blocks_hero" ADD COLUMN "primary_cta_label" varchar;
ALTER TABLE "pages_blocks_hero" ADD COLUMN "secondary_cta_label" varchar;
UPDATE "pages_blocks_hero" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading", "primary_cta_label" = l."primary_cta_label", "secondary_cta_label" = l."secondary_cta_label" FROM "pages_blocks_hero_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "pages_blocks_how_it_works" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "pages_blocks_how_it_works" ADD COLUMN "heading" varchar;
ALTER TABLE "pages_blocks_how_it_works" ADD COLUMN "subheading" varchar;
UPDATE "pages_blocks_how_it_works" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading" FROM "pages_blocks_how_it_works_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "pages_blocks_how_it_works_steps" ADD COLUMN "title" varchar;
ALTER TABLE "pages_blocks_how_it_works_steps" ADD COLUMN "body" varchar;
UPDATE "pages_blocks_how_it_works_steps" p SET "title" = l."title", "body" = l."body" FROM "pages_blocks_how_it_works_steps_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "pages_blocks_landing_hero" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "pages_blocks_landing_hero" ADD COLUMN "heading" varchar;
ALTER TABLE "pages_blocks_landing_hero" ADD COLUMN "subheading" varchar;
ALTER TABLE "pages_blocks_landing_hero" ADD COLUMN "primary_cta_label" varchar;
ALTER TABLE "pages_blocks_landing_hero" ADD COLUMN "secondary_cta_label" varchar;
ALTER TABLE "pages_blocks_landing_hero" ADD COLUMN "widget_footnote" varchar;
UPDATE "pages_blocks_landing_hero" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading", "primary_cta_label" = l."primary_cta_label", "secondary_cta_label" = l."secondary_cta_label", "widget_footnote" = l."widget_footnote" FROM "pages_blocks_landing_hero_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "pages_blocks_landing_hero_trust_signals" ADD COLUMN "label" varchar;
UPDATE "pages_blocks_landing_hero_trust_signals" p SET "label" = l."label" FROM "pages_blocks_landing_hero_trust_signals_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "pages_blocks_media_showcase" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "pages_blocks_media_showcase" ADD COLUMN "heading" varchar;
ALTER TABLE "pages_blocks_media_showcase" ADD COLUMN "subheading" varchar;
UPDATE "pages_blocks_media_showcase" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading" FROM "pages_blocks_media_showcase_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "pages_blocks_rich_text_content" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "pages_blocks_rich_text_content" ADD COLUMN "heading" varchar;
ALTER TABLE "pages_blocks_rich_text_content" ADD COLUMN "subheading" varchar;
ALTER TABLE "pages_blocks_rich_text_content" ADD COLUMN "body" jsonb;
UPDATE "pages_blocks_rich_text_content" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading", "body" = l."body" FROM "pages_blocks_rich_text_content_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "pages_blocks_security_controls" ADD COLUMN "title" varchar;
ALTER TABLE "pages_blocks_security_controls" ADD COLUMN "description" varchar;
UPDATE "pages_blocks_security_controls" p SET "title" = l."title", "description" = l."description" FROM "pages_blocks_security_controls_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "pages_blocks_security" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "pages_blocks_security" ADD COLUMN "heading" varchar;
ALTER TABLE "pages_blocks_security" ADD COLUMN "subheading" varchar;
UPDATE "pages_blocks_security" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading" FROM "pages_blocks_security_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "pages_blocks_stocks_ticker" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "pages_blocks_stocks_ticker" ADD COLUMN "heading" varchar;
ALTER TABLE "pages_blocks_stocks_ticker" ADD COLUMN "subheading" varchar;
UPDATE "pages_blocks_stocks_ticker" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading" FROM "pages_blocks_stocks_ticker_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "pages_blocks_trust_footer_items_items" ADD COLUMN "label" varchar;
UPDATE "pages_blocks_trust_footer_items_items" p SET "label" = l."label" FROM "pages_blocks_trust_footer_items_items_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "pages_blocks_trust_footer_items" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "pages_blocks_trust_footer_items" ADD COLUMN "heading" varchar;
ALTER TABLE "pages_blocks_trust_footer_items" ADD COLUMN "subheading" varchar;
UPDATE "pages_blocks_trust_footer_items" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading" FROM "pages_blocks_trust_footer_items_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "pages_blocks_trust_strip" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "pages_blocks_trust_strip" ADD COLUMN "heading" varchar;
ALTER TABLE "pages_blocks_trust_strip" ADD COLUMN "subheading" varchar;
UPDATE "pages_blocks_trust_strip" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading" FROM "pages_blocks_trust_strip_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "pages_blocks_trust_strip_signals" ADD COLUMN "label" varchar;
ALTER TABLE "pages_blocks_trust_strip_signals" ADD COLUMN "value" varchar;
UPDATE "pages_blocks_trust_strip_signals" p SET "label" = l."label", "value" = l."value" FROM "pages_blocks_trust_strip_signals_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "pages_blocks_waitlist_cta" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "pages_blocks_waitlist_cta" ADD COLUMN "heading" varchar;
ALTER TABLE "pages_blocks_waitlist_cta" ADD COLUMN "subheading" varchar;
ALTER TABLE "pages_blocks_waitlist_cta" ADD COLUMN "email_placeholder" varchar;
ALTER TABLE "pages_blocks_waitlist_cta" ADD COLUMN "button_label" varchar;
ALTER TABLE "pages_blocks_waitlist_cta" ADD COLUMN "success_text" varchar;
UPDATE "pages_blocks_waitlist_cta" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading", "email_placeholder" = l."email_placeholder", "button_label" = l."button_label", "success_text" = l."success_text" FROM "pages_blocks_waitlist_cta_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "pages_blocks_why_koya" ADD COLUMN "eyebrow" varchar;
ALTER TABLE "pages_blocks_why_koya" ADD COLUMN "heading" varchar;
ALTER TABLE "pages_blocks_why_koya" ADD COLUMN "subheading" varchar;
UPDATE "pages_blocks_why_koya" p SET "eyebrow" = l."eyebrow", "heading" = l."heading", "subheading" = l."subheading" FROM "pages_blocks_why_koya_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "pages_blocks_why_koya_stats" ADD COLUMN "value" varchar;
ALTER TABLE "pages_blocks_why_koya_stats" ADD COLUMN "label" varchar;
UPDATE "pages_blocks_why_koya_stats" p SET "value" = l."value", "label" = l."label" FROM "pages_blocks_why_koya_stats_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
ALTER TABLE "pages" ADD COLUMN "title" varchar;
ALTER TABLE "pages" ADD COLUMN "seo_meta_title" varchar;
ALTER TABLE "pages" ADD COLUMN "seo_meta_description" varchar;
UPDATE "pages" p SET "title" = l."title", "seo_meta_title" = l."seo_meta_title", "seo_meta_description" = l."seo_meta_description" FROM "pages_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
-- drop _locales tables (CASCADE removes their sequences/fks/indexes) then the enum
DROP TABLE IF EXISTS "_faqs_v_locales" CASCADE;
DROP TABLE IF EXISTS "_footer_v_locales" CASCADE;
DROP TABLE IF EXISTS "_footer_v_version_columns_links_locales" CASCADE;
DROP TABLE IF EXISTS "_footer_v_version_columns_locales" CASCADE;
DROP TABLE IF EXISTS "_legal_pages_v_locales" CASCADE;
DROP TABLE IF EXISTS "_navigation_v_version_items_locales" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_cards_features_locales" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_cards_locales" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_convert_hero_locales" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_cta_locales" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_feature_grid_items_locales" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_feature_grid_locales" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_final_cta_locales" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_global_finance_highlights_locales" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_global_finance_locales" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_guest_widget_embed_locales" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_hero_locales" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_how_it_works_locales" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_how_it_works_steps_locales" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_landing_hero_locales" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_landing_hero_trust_signals_locales" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_media_showcase_locales" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_rich_text_content_locales" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_security_controls_locales" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_security_locales" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_stocks_ticker_locales" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_trust_footer_items_items_locales" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_trust_footer_items_locales" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_trust_strip_locales" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_trust_strip_signals_locales" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_waitlist_cta_locales" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_why_koya_locales" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_why_koya_stats_locales" CASCADE;
DROP TABLE IF EXISTS "_pages_v_locales" CASCADE;
DROP TABLE IF EXISTS "faqs_locales" CASCADE;
DROP TABLE IF EXISTS "footer_columns_links_locales" CASCADE;
DROP TABLE IF EXISTS "footer_columns_locales" CASCADE;
DROP TABLE IF EXISTS "footer_locales" CASCADE;
DROP TABLE IF EXISTS "legal_pages_locales" CASCADE;
DROP TABLE IF EXISTS "navigation_items_locales" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_cards_features_locales" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_cards_locales" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_convert_hero_locales" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_cta_locales" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_feature_grid_items_locales" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_feature_grid_locales" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_final_cta_locales" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_global_finance_highlights_locales" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_global_finance_locales" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_guest_widget_embed_locales" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_hero_locales" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_how_it_works_locales" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_how_it_works_steps_locales" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_landing_hero_locales" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_landing_hero_trust_signals_locales" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_media_showcase_locales" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_rich_text_content_locales" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_security_controls_locales" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_security_locales" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_stocks_ticker_locales" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_trust_footer_items_items_locales" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_trust_footer_items_locales" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_trust_strip_locales" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_trust_strip_signals_locales" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_waitlist_cta_locales" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_why_koya_locales" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_why_koya_stats_locales" CASCADE;
DROP TABLE IF EXISTS "pages_locales" CASCADE;
DROP TYPE IF EXISTS "_locales";
-- drop version-table snapshot/published_locale cols (drops their indexes) + enums
ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "published_locale";
ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "snapshot";
DROP TYPE IF EXISTS "enum__pages_v_published_locale";
ALTER TABLE "_faqs_v" DROP COLUMN IF EXISTS "published_locale";
ALTER TABLE "_faqs_v" DROP COLUMN IF EXISTS "snapshot";
DROP TYPE IF EXISTS "enum__faqs_v_published_locale";
ALTER TABLE "_legal_pages_v" DROP COLUMN IF EXISTS "published_locale";
ALTER TABLE "_legal_pages_v" DROP COLUMN IF EXISTS "snapshot";
DROP TYPE IF EXISTS "enum__legal_pages_v_published_locale";
ALTER TABLE "_navigation_v" DROP COLUMN IF EXISTS "published_locale";
ALTER TABLE "_navigation_v" DROP COLUMN IF EXISTS "snapshot";
DROP TYPE IF EXISTS "enum__navigation_v_published_locale";
ALTER TABLE "_footer_v" DROP COLUMN IF EXISTS "published_locale";
ALTER TABLE "_footer_v" DROP COLUMN IF EXISTS "snapshot";
DROP TYPE IF EXISTS "enum__footer_v_published_locale";
ALTER TABLE "_site_settings_v" DROP COLUMN IF EXISTS "published_locale";
ALTER TABLE "_site_settings_v" DROP COLUMN IF EXISTS "snapshot";
DROP TYPE IF EXISTS "enum__site_settings_v_published_locale";
ALTER TABLE "_seo_defaults_v" DROP COLUMN IF EXISTS "published_locale";
ALTER TABLE "_seo_defaults_v" DROP COLUMN IF EXISTS "snapshot";
DROP TYPE IF EXISTS "enum__seo_defaults_v_published_locale";
ALTER TABLE "_theme_settings_v" DROP COLUMN IF EXISTS "published_locale";
ALTER TABLE "_theme_settings_v" DROP COLUMN IF EXISTS "snapshot";
DROP TYPE IF EXISTS "enum__theme_settings_v_published_locale";
`)
}
