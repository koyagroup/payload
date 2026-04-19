import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_market_ribbon_ticker_mode" AS ENUM('scroll', 'static');
  CREATE TYPE "public"."enum_pages_blocks_market_ribbon_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum_pages_blocks_hero_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum_pages_blocks_guest_widget_embed_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum_pages_blocks_trust_strip_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_items_icon" AS ENUM('shield', 'wallet', 'globe', 'card', 'chart');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_how_it_works_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum_pages_blocks_security_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum_pages_blocks_cards_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum_pages_blocks_global_finance_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum_pages_blocks_final_cta_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum_pages_blocks_convert_hero_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum_pages_blocks_trust_footer_items_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_content_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum_pages_blocks_media_showcase_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum_pages_blocks_media_showcase_layout" AS ENUM('grid', 'carousel');
  CREATE TYPE "public"."enum_pages_blocks_cta_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum_pages_seo_robots" AS ENUM('index,follow', 'noindex,follow', 'noindex,nofollow');
  CREATE TYPE "public"."enum_pages_theme_override_preset" AS ENUM('koyaDefault', 'midnight', 'sandstone', 'emerald');
  CREATE TYPE "public"."enum_pages_theme_override_section_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum_pages_theme_override_button_variant" AS ENUM('solid', 'outline', 'ghost');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_market_ribbon_ticker_mode" AS ENUM('scroll', 'static');
  CREATE TYPE "public"."enum__pages_v_blocks_market_ribbon_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum__pages_v_blocks_guest_widget_embed_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum__pages_v_blocks_trust_strip_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_items_icon" AS ENUM('shield', 'wallet', 'globe', 'card', 'chart');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_how_it_works_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum__pages_v_blocks_security_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum__pages_v_blocks_cards_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum__pages_v_blocks_global_finance_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum__pages_v_blocks_final_cta_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum__pages_v_blocks_convert_hero_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum__pages_v_blocks_trust_footer_items_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_content_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum__pages_v_blocks_media_showcase_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum__pages_v_blocks_media_showcase_layout" AS ENUM('grid', 'carousel');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum__pages_v_version_seo_robots" AS ENUM('index,follow', 'noindex,follow', 'noindex,nofollow');
  CREATE TYPE "public"."enum__pages_v_version_theme_override_preset" AS ENUM('koyaDefault', 'midnight', 'sandstone', 'emerald');
  CREATE TYPE "public"."enum__pages_v_version_theme_override_section_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum__pages_v_version_theme_override_button_variant" AS ENUM('solid', 'outline', 'ghost');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_faqs_category" AS ENUM('general', 'payments', 'security', 'legal');
  CREATE TYPE "public"."enum_faqs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__faqs_v_version_category" AS ENUM('general', 'payments', 'security', 'legal');
  CREATE TYPE "public"."enum__faqs_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_legal_pages_seo_robots" AS ENUM('index,follow', 'noindex,follow', 'noindex,nofollow');
  CREATE TYPE "public"."enum_legal_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__legal_pages_v_version_seo_robots" AS ENUM('index,follow', 'noindex,follow', 'noindex,nofollow');
  CREATE TYPE "public"."enum__legal_pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor', 'publisher');
  CREATE TYPE "public"."enum_redirects_target_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_redirects_status_code" AS ENUM('301', '302', '307', '308');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_folders_folder_type" AS ENUM('media');
  CREATE TYPE "public"."enum_site_settings_social_links_platform" AS ENUM('x', 'discord', 'github', 'linkedin', 'instagram');
  CREATE TYPE "public"."enum_site_settings_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_settings_v_version_social_links_platform" AS ENUM('x', 'discord', 'github', 'linkedin', 'instagram');
  CREATE TYPE "public"."enum__site_settings_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_seo_defaults_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__seo_defaults_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_theme_settings_section_variant_map_section_type" AS ENUM('marketRibbon', 'hero', 'guestWidgetEmbed', 'trustStrip', 'featureGrid', 'howItWorks', 'security', 'cards', 'globalFinance', 'finalCta', 'convertHero', 'trustFooterItems', 'richTextContent', 'mediaShowcase', 'cta');
  CREATE TYPE "public"."enum_theme_settings_section_variant_map_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum_theme_settings_preset" AS ENUM('koyaDefault', 'midnight', 'sandstone', 'emerald');
  CREATE TYPE "public"."enum_theme_settings_primary_token" AS ENUM('gold-500', 'gold-600', 'cyan-500', 'emerald-500', 'slate-900', 'slate-950', 'neutral-100', 'neutral-900');
  CREATE TYPE "public"."enum_theme_settings_accent_token" AS ENUM('gold-500', 'gold-600', 'cyan-500', 'emerald-500', 'slate-900', 'slate-950', 'neutral-100', 'neutral-900');
  CREATE TYPE "public"."enum_theme_settings_background_mode" AS ENUM('dark', 'light');
  CREATE TYPE "public"."enum_theme_settings_button_variant_default" AS ENUM('solid', 'outline', 'ghost');
  CREATE TYPE "public"."enum_theme_settings_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__theme_settings_v_version_section_variant_map_section_type" AS ENUM('marketRibbon', 'hero', 'guestWidgetEmbed', 'trustStrip', 'featureGrid', 'howItWorks', 'security', 'cards', 'globalFinance', 'finalCta', 'convertHero', 'trustFooterItems', 'richTextContent', 'mediaShowcase', 'cta');
  CREATE TYPE "public"."enum__theme_settings_v_version_section_variant_map_variant" AS ENUM('default', 'elevated', 'subtle', 'inverted');
  CREATE TYPE "public"."enum__theme_settings_v_version_preset" AS ENUM('koyaDefault', 'midnight', 'sandstone', 'emerald');
  CREATE TYPE "public"."enum__theme_settings_v_version_primary_token" AS ENUM('gold-500', 'gold-600', 'cyan-500', 'emerald-500', 'slate-900', 'slate-950', 'neutral-100', 'neutral-900');
  CREATE TYPE "public"."enum__theme_settings_v_version_accent_token" AS ENUM('gold-500', 'gold-600', 'cyan-500', 'emerald-500', 'slate-900', 'slate-950', 'neutral-100', 'neutral-900');
  CREATE TYPE "public"."enum__theme_settings_v_version_background_mode" AS ENUM('dark', 'light');
  CREATE TYPE "public"."enum__theme_settings_v_version_button_variant_default" AS ENUM('solid', 'outline', 'ghost');
  CREATE TYPE "public"."enum__theme_settings_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_navigation_items_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_navigation_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__navigation_v_version_items_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__navigation_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_footer_columns_links_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_footer_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__footer_v_version_columns_links_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__footer_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "pages_blocks_market_ribbon" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_live_rates" boolean DEFAULT true,
  	"ticker_mode" "enum_pages_blocks_market_ribbon_ticker_mode" DEFAULT 'scroll',
  	"variant" "enum_pages_blocks_market_ribbon_variant" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum_pages_blocks_hero_variant" DEFAULT 'default',
  	"media_id" integer,
  	"primary_cta_label" varchar,
  	"primary_cta_href" varchar,
  	"secondary_cta_label" varchar,
  	"secondary_cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_guest_widget_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum_pages_blocks_guest_widget_embed_variant" DEFAULT 'default',
  	"badge_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_trust_strip_signals" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_trust_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum_pages_blocks_trust_strip_variant" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum_pages_blocks_feature_grid_items_icon"
  );
  
  CREATE TABLE "pages_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum_pages_blocks_feature_grid_variant" DEFAULT 'default',
  	"columns" "enum_pages_blocks_feature_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "pages_blocks_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum_pages_blocks_how_it_works_variant" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_security_controls" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_security" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum_pages_blocks_security_variant" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cards_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum_pages_blocks_cards_variant" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_global_finance_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_global_finance" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum_pages_blocks_global_finance_variant" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_final_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum_pages_blocks_final_cta_variant" DEFAULT 'default',
  	"primary_cta_label" varchar,
  	"primary_cta_href" varchar,
  	"secondary_cta_label" varchar,
  	"secondary_cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_convert_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum_pages_blocks_convert_hero_variant" DEFAULT 'default',
  	"badge_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_trust_footer_items_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_trust_footer_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum_pages_blocks_trust_footer_items_variant" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum_pages_blocks_rich_text_content_variant" DEFAULT 'default',
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum_pages_blocks_media_showcase_variant" DEFAULT 'default',
  	"layout" "enum_pages_blocks_media_showcase_layout" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum_pages_blocks_cta_variant" DEFAULT 'default',
  	"primary_cta_label" varchar,
  	"primary_cta_href" varchar,
  	"secondary_cta_label" varchar,
  	"secondary_cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"path" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_robots" "enum_pages_seo_robots" DEFAULT 'index,follow',
  	"theme_override_preset" "enum_pages_theme_override_preset",
  	"theme_override_section_variant" "enum_pages_theme_override_section_variant",
  	"theme_override_button_variant" "enum_pages_theme_override_button_variant",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_market_ribbon" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_live_rates" boolean DEFAULT true,
  	"ticker_mode" "enum__pages_v_blocks_market_ribbon_ticker_mode" DEFAULT 'scroll',
  	"variant" "enum__pages_v_blocks_market_ribbon_variant" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum__pages_v_blocks_hero_variant" DEFAULT 'default',
  	"media_id" integer,
  	"primary_cta_label" varchar,
  	"primary_cta_href" varchar,
  	"secondary_cta_label" varchar,
  	"secondary_cta_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_guest_widget_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum__pages_v_blocks_guest_widget_embed_variant" DEFAULT 'default',
  	"badge_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_trust_strip_signals" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_trust_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum__pages_v_blocks_trust_strip_variant" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum__pages_v_blocks_feature_grid_items_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum__pages_v_blocks_feature_grid_variant" DEFAULT 'default',
  	"columns" "enum__pages_v_blocks_feature_grid_columns" DEFAULT '3',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum__pages_v_blocks_how_it_works_variant" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_security_controls" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_security" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum__pages_v_blocks_security_variant" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cards_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum__pages_v_blocks_cards_variant" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_global_finance_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_global_finance" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum__pages_v_blocks_global_finance_variant" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_final_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum__pages_v_blocks_final_cta_variant" DEFAULT 'default',
  	"primary_cta_label" varchar,
  	"primary_cta_href" varchar,
  	"secondary_cta_label" varchar,
  	"secondary_cta_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_convert_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum__pages_v_blocks_convert_hero_variant" DEFAULT 'default',
  	"badge_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_trust_footer_items_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_trust_footer_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum__pages_v_blocks_trust_footer_items_variant" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum__pages_v_blocks_rich_text_content_variant" DEFAULT 'default',
  	"body" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum__pages_v_blocks_media_showcase_variant" DEFAULT 'default',
  	"layout" "enum__pages_v_blocks_media_showcase_layout" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum__pages_v_blocks_cta_variant" DEFAULT 'default',
  	"primary_cta_label" varchar,
  	"primary_cta_href" varchar,
  	"secondary_cta_label" varchar,
  	"secondary_cta_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_path" varchar,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_robots" "enum__pages_v_version_seo_robots" DEFAULT 'index,follow',
  	"version_theme_override_preset" "enum__pages_v_version_theme_override_preset",
  	"version_theme_override_section_variant" "enum__pages_v_version_theme_override_section_variant",
  	"version_theme_override_button_variant" "enum__pages_v_version_theme_override_button_variant",
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" jsonb,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"category" "enum_faqs_category" DEFAULT 'general',
  	"sort_order" numeric DEFAULT 0,
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_faqs_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_faqs_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_question" varchar,
  	"version_answer" varchar,
  	"version_category" "enum__faqs_v_version_category" DEFAULT 'general',
  	"version_sort_order" numeric DEFAULT 0,
  	"version_is_active" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__faqs_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "legal_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"path" varchar,
  	"body" jsonb,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_robots" "enum_legal_pages_seo_robots" DEFAULT 'index,follow',
  	"last_updated" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_legal_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_legal_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_path" varchar,
  	"version_body" jsonb,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_robots" "enum__legal_pages_v_version_seo_robots" DEFAULT 'index,follow',
  	"version_last_updated" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__legal_pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "whatsapp_preview_links" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"path" varchar NOT NULL,
  	"og_title" varchar NOT NULL,
  	"og_description" varchar NOT NULL,
  	"og_image_id" integer,
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from_path" varchar NOT NULL,
  	"target_type" "enum_redirects_target_type" DEFAULT 'internal' NOT NULL,
  	"to" varchar NOT NULL,
  	"status_code" "enum_redirects_status_code" DEFAULT '302' NOT NULL,
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_folders_folder_type" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_payload_folders_folder_type",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload_folders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"media_id" integer,
  	"faqs_id" integer,
  	"legal_pages_id" integer,
  	"whatsapp_preview_links_id" integer,
  	"users_id" integer,
  	"redirects_id" integer,
  	"payload_folders_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_social_links_platform",
  	"url" varchar
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar,
  	"site_tagline" varchar,
  	"site_description" varchar,
  	"default_meta_title" varchar,
  	"default_meta_description" varchar,
  	"logo_mark_id" integer,
  	"logo_icon_id" integer,
  	"apple_icon_id" integer,
  	"default_og_image_id" integer,
  	"company_name" varchar,
  	"contact_email" varchar,
  	"_status" "enum_site_settings_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_site_settings_v_version_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"platform" "enum__site_settings_v_version_social_links_platform",
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_site_name" varchar,
  	"version_site_tagline" varchar,
  	"version_site_description" varchar,
  	"version_default_meta_title" varchar,
  	"version_default_meta_description" varchar,
  	"version_logo_mark_id" integer,
  	"version_logo_icon_id" integer,
  	"version_apple_icon_id" integer,
  	"version_default_og_image_id" integer,
  	"version_company_name" varchar,
  	"version_contact_email" varchar,
  	"version__status" "enum__site_settings_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "seo_defaults" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title_suffix" varchar,
  	"fallback_title" varchar,
  	"fallback_description" varchar,
  	"fallback_og_image_id" integer,
  	"robots_txt" varchar,
  	"_status" "enum_seo_defaults_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_seo_defaults_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_title_suffix" varchar,
  	"version_fallback_title" varchar,
  	"version_fallback_description" varchar,
  	"version_fallback_og_image_id" integer,
  	"version_robots_txt" varchar,
  	"version__status" "enum__seo_defaults_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "theme_settings_section_variant_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_type" "enum_theme_settings_section_variant_map_section_type",
  	"variant" "enum_theme_settings_section_variant_map_variant"
  );
  
  CREATE TABLE "theme_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"preset" "enum_theme_settings_preset" DEFAULT 'koyaDefault',
  	"primary_token" "enum_theme_settings_primary_token",
  	"accent_token" "enum_theme_settings_accent_token",
  	"background_mode" "enum_theme_settings_background_mode" DEFAULT 'dark',
  	"button_variant_default" "enum_theme_settings_button_variant_default" DEFAULT 'solid',
  	"_status" "enum_theme_settings_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_theme_settings_v_version_section_variant_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_type" "enum__theme_settings_v_version_section_variant_map_section_type",
  	"variant" "enum__theme_settings_v_version_section_variant_map_variant",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_theme_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_preset" "enum__theme_settings_v_version_preset" DEFAULT 'koyaDefault',
  	"version_primary_token" "enum__theme_settings_v_version_primary_token",
  	"version_accent_token" "enum__theme_settings_v_version_accent_token",
  	"version_background_mode" "enum__theme_settings_v_version_background_mode" DEFAULT 'dark',
  	"version_button_variant_default" "enum__theme_settings_v_version_button_variant_default" DEFAULT 'solid',
  	"version__status" "enum__theme_settings_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "navigation_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sort_order" numeric DEFAULT 0,
  	"is_cta" boolean DEFAULT false,
  	"link_label" varchar,
  	"link_type" "enum_navigation_items_link_type" DEFAULT 'internal',
  	"link_href" varchar,
  	"link_open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_navigation_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_navigation_v_version_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sort_order" numeric DEFAULT 0,
  	"is_cta" boolean DEFAULT false,
  	"link_label" varchar,
  	"link_type" "enum__navigation_v_version_items_link_type" DEFAULT 'internal',
  	"link_href" varchar,
  	"link_open_in_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_navigation_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__navigation_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sort_order" numeric DEFAULT 0,
  	"link_label" varchar,
  	"link_type" "enum_footer_columns_links_link_type" DEFAULT 'internal',
  	"link_href" varchar,
  	"link_open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"sort_order" numeric DEFAULT 0
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"legal_text" varchar,
  	"_status" "enum_footer_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_footer_v_version_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sort_order" numeric DEFAULT 0,
  	"link_label" varchar,
  	"link_type" "enum__footer_v_version_columns_links_link_type" DEFAULT 'internal',
  	"link_href" varchar,
  	"link_open_in_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_footer_v_version_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"sort_order" numeric DEFAULT 0,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_footer_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_legal_text" varchar,
  	"version__status" "enum__footer_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "pages_blocks_market_ribbon" ADD CONSTRAINT "pages_blocks_market_ribbon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_guest_widget_embed" ADD CONSTRAINT "pages_blocks_guest_widget_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_strip_signals" ADD CONSTRAINT "pages_blocks_trust_strip_signals_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_trust_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_strip" ADD CONSTRAINT "pages_blocks_trust_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_items" ADD CONSTRAINT "pages_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid" ADD CONSTRAINT "pages_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_how_it_works_steps" ADD CONSTRAINT "pages_blocks_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_how_it_works" ADD CONSTRAINT "pages_blocks_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_security_controls" ADD CONSTRAINT "pages_blocks_security_controls_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_security"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_security" ADD CONSTRAINT "pages_blocks_security_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cards_features" ADD CONSTRAINT "pages_blocks_cards_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cards" ADD CONSTRAINT "pages_blocks_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_global_finance_highlights" ADD CONSTRAINT "pages_blocks_global_finance_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_global_finance"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_global_finance" ADD CONSTRAINT "pages_blocks_global_finance_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_final_cta" ADD CONSTRAINT "pages_blocks_final_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_convert_hero" ADD CONSTRAINT "pages_blocks_convert_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_footer_items_items" ADD CONSTRAINT "pages_blocks_trust_footer_items_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_trust_footer_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_footer_items" ADD CONSTRAINT "pages_blocks_trust_footer_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text_content" ADD CONSTRAINT "pages_blocks_rich_text_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_showcase" ADD CONSTRAINT "pages_blocks_media_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_market_ribbon" ADD CONSTRAINT "_pages_v_blocks_market_ribbon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_guest_widget_embed" ADD CONSTRAINT "_pages_v_blocks_guest_widget_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trust_strip_signals" ADD CONSTRAINT "_pages_v_blocks_trust_strip_signals_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_trust_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trust_strip" ADD CONSTRAINT "_pages_v_blocks_trust_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid_items" ADD CONSTRAINT "_pages_v_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid" ADD CONSTRAINT "_pages_v_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_how_it_works_steps" ADD CONSTRAINT "_pages_v_blocks_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_how_it_works" ADD CONSTRAINT "_pages_v_blocks_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_security_controls" ADD CONSTRAINT "_pages_v_blocks_security_controls_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_security"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_security" ADD CONSTRAINT "_pages_v_blocks_security_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cards_features" ADD CONSTRAINT "_pages_v_blocks_cards_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cards" ADD CONSTRAINT "_pages_v_blocks_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_global_finance_highlights" ADD CONSTRAINT "_pages_v_blocks_global_finance_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_global_finance"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_global_finance" ADD CONSTRAINT "_pages_v_blocks_global_finance_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_final_cta" ADD CONSTRAINT "_pages_v_blocks_final_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_convert_hero" ADD CONSTRAINT "_pages_v_blocks_convert_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trust_footer_items_items" ADD CONSTRAINT "_pages_v_blocks_trust_footer_items_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_trust_footer_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trust_footer_items" ADD CONSTRAINT "_pages_v_blocks_trust_footer_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text_content" ADD CONSTRAINT "_pages_v_blocks_rich_text_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_showcase" ADD CONSTRAINT "_pages_v_blocks_media_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_faqs_v" ADD CONSTRAINT "_faqs_v_parent_id_faqs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."faqs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "legal_pages" ADD CONSTRAINT "legal_pages_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_legal_pages_v" ADD CONSTRAINT "_legal_pages_v_parent_id_legal_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."legal_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_legal_pages_v" ADD CONSTRAINT "_legal_pages_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "whatsapp_preview_links" ADD CONSTRAINT "whatsapp_preview_links_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders_folder_type" ADD CONSTRAINT "payload_folders_folder_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders" ADD CONSTRAINT "payload_folders_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_legal_pages_fk" FOREIGN KEY ("legal_pages_id") REFERENCES "public"."legal_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_whatsapp_preview_links_fk" FOREIGN KEY ("whatsapp_preview_links_id") REFERENCES "public"."whatsapp_preview_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_folders_fk" FOREIGN KEY ("payload_folders_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_mark_id_media_id_fk" FOREIGN KEY ("logo_mark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_icon_id_media_id_fk" FOREIGN KEY ("logo_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_apple_icon_id_media_id_fk" FOREIGN KEY ("apple_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_og_image_id_media_id_fk" FOREIGN KEY ("default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_social_links" ADD CONSTRAINT "_site_settings_v_version_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_logo_mark_id_media_id_fk" FOREIGN KEY ("version_logo_mark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_logo_icon_id_media_id_fk" FOREIGN KEY ("version_logo_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_apple_icon_id_media_id_fk" FOREIGN KEY ("version_apple_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_default_og_image_id_media_id_fk" FOREIGN KEY ("version_default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seo_defaults" ADD CONSTRAINT "seo_defaults_fallback_og_image_id_media_id_fk" FOREIGN KEY ("fallback_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_seo_defaults_v" ADD CONSTRAINT "_seo_defaults_v_version_fallback_og_image_id_media_id_fk" FOREIGN KEY ("version_fallback_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "theme_settings_section_variant_map" ADD CONSTRAINT "theme_settings_section_variant_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."theme_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_theme_settings_v_version_section_variant_map" ADD CONSTRAINT "_theme_settings_v_version_section_variant_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_theme_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_items" ADD CONSTRAINT "navigation_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_navigation_v_version_items" ADD CONSTRAINT "_navigation_v_version_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_navigation_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_columns_links" ADD CONSTRAINT "_footer_v_version_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v_version_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_columns" ADD CONSTRAINT "_footer_v_version_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_market_ribbon_order_idx" ON "pages_blocks_market_ribbon" USING btree ("_order");
  CREATE INDEX "pages_blocks_market_ribbon_parent_id_idx" ON "pages_blocks_market_ribbon" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_market_ribbon_path_idx" ON "pages_blocks_market_ribbon" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_media_idx" ON "pages_blocks_hero" USING btree ("media_id");
  CREATE INDEX "pages_blocks_guest_widget_embed_order_idx" ON "pages_blocks_guest_widget_embed" USING btree ("_order");
  CREATE INDEX "pages_blocks_guest_widget_embed_parent_id_idx" ON "pages_blocks_guest_widget_embed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_guest_widget_embed_path_idx" ON "pages_blocks_guest_widget_embed" USING btree ("_path");
  CREATE INDEX "pages_blocks_trust_strip_signals_order_idx" ON "pages_blocks_trust_strip_signals" USING btree ("_order");
  CREATE INDEX "pages_blocks_trust_strip_signals_parent_id_idx" ON "pages_blocks_trust_strip_signals" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_trust_strip_order_idx" ON "pages_blocks_trust_strip" USING btree ("_order");
  CREATE INDEX "pages_blocks_trust_strip_parent_id_idx" ON "pages_blocks_trust_strip" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_trust_strip_path_idx" ON "pages_blocks_trust_strip" USING btree ("_path");
  CREATE INDEX "pages_blocks_feature_grid_items_order_idx" ON "pages_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_grid_items_parent_id_idx" ON "pages_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_order_idx" ON "pages_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_grid_parent_id_idx" ON "pages_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_path_idx" ON "pages_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_how_it_works_steps_order_idx" ON "pages_blocks_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_how_it_works_steps_parent_id_idx" ON "pages_blocks_how_it_works_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_how_it_works_order_idx" ON "pages_blocks_how_it_works" USING btree ("_order");
  CREATE INDEX "pages_blocks_how_it_works_parent_id_idx" ON "pages_blocks_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_how_it_works_path_idx" ON "pages_blocks_how_it_works" USING btree ("_path");
  CREATE INDEX "pages_blocks_security_controls_order_idx" ON "pages_blocks_security_controls" USING btree ("_order");
  CREATE INDEX "pages_blocks_security_controls_parent_id_idx" ON "pages_blocks_security_controls" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_security_order_idx" ON "pages_blocks_security" USING btree ("_order");
  CREATE INDEX "pages_blocks_security_parent_id_idx" ON "pages_blocks_security" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_security_path_idx" ON "pages_blocks_security" USING btree ("_path");
  CREATE INDEX "pages_blocks_cards_features_order_idx" ON "pages_blocks_cards_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_cards_features_parent_id_idx" ON "pages_blocks_cards_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cards_order_idx" ON "pages_blocks_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_cards_parent_id_idx" ON "pages_blocks_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cards_path_idx" ON "pages_blocks_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_global_finance_highlights_order_idx" ON "pages_blocks_global_finance_highlights" USING btree ("_order");
  CREATE INDEX "pages_blocks_global_finance_highlights_parent_id_idx" ON "pages_blocks_global_finance_highlights" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_global_finance_order_idx" ON "pages_blocks_global_finance" USING btree ("_order");
  CREATE INDEX "pages_blocks_global_finance_parent_id_idx" ON "pages_blocks_global_finance" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_global_finance_path_idx" ON "pages_blocks_global_finance" USING btree ("_path");
  CREATE INDEX "pages_blocks_final_cta_order_idx" ON "pages_blocks_final_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_final_cta_parent_id_idx" ON "pages_blocks_final_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_final_cta_path_idx" ON "pages_blocks_final_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_convert_hero_order_idx" ON "pages_blocks_convert_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_convert_hero_parent_id_idx" ON "pages_blocks_convert_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_convert_hero_path_idx" ON "pages_blocks_convert_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_trust_footer_items_items_order_idx" ON "pages_blocks_trust_footer_items_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_trust_footer_items_items_parent_id_idx" ON "pages_blocks_trust_footer_items_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_trust_footer_items_order_idx" ON "pages_blocks_trust_footer_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_trust_footer_items_parent_id_idx" ON "pages_blocks_trust_footer_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_trust_footer_items_path_idx" ON "pages_blocks_trust_footer_items" USING btree ("_path");
  CREATE INDEX "pages_blocks_rich_text_content_order_idx" ON "pages_blocks_rich_text_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_content_parent_id_idx" ON "pages_blocks_rich_text_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_content_path_idx" ON "pages_blocks_rich_text_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_showcase_order_idx" ON "pages_blocks_media_showcase" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_showcase_parent_id_idx" ON "pages_blocks_media_showcase" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_showcase_path_idx" ON "pages_blocks_media_showcase" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_path_idx" ON "pages" USING btree ("path");
  CREATE INDEX "pages_seo_seo_og_image_idx" ON "pages" USING btree ("seo_og_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_media_id_idx" ON "pages_rels" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_market_ribbon_order_idx" ON "_pages_v_blocks_market_ribbon" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_market_ribbon_parent_id_idx" ON "_pages_v_blocks_market_ribbon" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_market_ribbon_path_idx" ON "_pages_v_blocks_market_ribbon" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_media_idx" ON "_pages_v_blocks_hero" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_guest_widget_embed_order_idx" ON "_pages_v_blocks_guest_widget_embed" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_guest_widget_embed_parent_id_idx" ON "_pages_v_blocks_guest_widget_embed" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_guest_widget_embed_path_idx" ON "_pages_v_blocks_guest_widget_embed" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_trust_strip_signals_order_idx" ON "_pages_v_blocks_trust_strip_signals" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_trust_strip_signals_parent_id_idx" ON "_pages_v_blocks_trust_strip_signals" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_trust_strip_order_idx" ON "_pages_v_blocks_trust_strip" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_trust_strip_parent_id_idx" ON "_pages_v_blocks_trust_strip" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_trust_strip_path_idx" ON "_pages_v_blocks_trust_strip" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feature_grid_items_order_idx" ON "_pages_v_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_grid_items_parent_id_idx" ON "_pages_v_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_order_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_grid_parent_id_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_path_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_how_it_works_steps_order_idx" ON "_pages_v_blocks_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_how_it_works_steps_parent_id_idx" ON "_pages_v_blocks_how_it_works_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_how_it_works_order_idx" ON "_pages_v_blocks_how_it_works" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_how_it_works_parent_id_idx" ON "_pages_v_blocks_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_how_it_works_path_idx" ON "_pages_v_blocks_how_it_works" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_security_controls_order_idx" ON "_pages_v_blocks_security_controls" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_security_controls_parent_id_idx" ON "_pages_v_blocks_security_controls" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_security_order_idx" ON "_pages_v_blocks_security" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_security_parent_id_idx" ON "_pages_v_blocks_security" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_security_path_idx" ON "_pages_v_blocks_security" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cards_features_order_idx" ON "_pages_v_blocks_cards_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cards_features_parent_id_idx" ON "_pages_v_blocks_cards_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cards_order_idx" ON "_pages_v_blocks_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cards_parent_id_idx" ON "_pages_v_blocks_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cards_path_idx" ON "_pages_v_blocks_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_global_finance_highlights_order_idx" ON "_pages_v_blocks_global_finance_highlights" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_global_finance_highlights_parent_id_idx" ON "_pages_v_blocks_global_finance_highlights" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_global_finance_order_idx" ON "_pages_v_blocks_global_finance" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_global_finance_parent_id_idx" ON "_pages_v_blocks_global_finance" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_global_finance_path_idx" ON "_pages_v_blocks_global_finance" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_final_cta_order_idx" ON "_pages_v_blocks_final_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_final_cta_parent_id_idx" ON "_pages_v_blocks_final_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_final_cta_path_idx" ON "_pages_v_blocks_final_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_convert_hero_order_idx" ON "_pages_v_blocks_convert_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_convert_hero_parent_id_idx" ON "_pages_v_blocks_convert_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_convert_hero_path_idx" ON "_pages_v_blocks_convert_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_trust_footer_items_items_order_idx" ON "_pages_v_blocks_trust_footer_items_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_trust_footer_items_items_parent_id_idx" ON "_pages_v_blocks_trust_footer_items_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_trust_footer_items_order_idx" ON "_pages_v_blocks_trust_footer_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_trust_footer_items_parent_id_idx" ON "_pages_v_blocks_trust_footer_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_trust_footer_items_path_idx" ON "_pages_v_blocks_trust_footer_items" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_rich_text_content_order_idx" ON "_pages_v_blocks_rich_text_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_content_parent_id_idx" ON "_pages_v_blocks_rich_text_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_content_path_idx" ON "_pages_v_blocks_rich_text_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_showcase_order_idx" ON "_pages_v_blocks_media_showcase" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_showcase_parent_id_idx" ON "_pages_v_blocks_media_showcase" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_showcase_path_idx" ON "_pages_v_blocks_media_showcase" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_path_idx" ON "_pages_v" USING btree ("version_path");
  CREATE INDEX "_pages_v_version_seo_version_seo_og_image_idx" ON "_pages_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_media_id_idx" ON "_pages_v_rels" USING btree ("media_id");
  CREATE INDEX "media_folder_idx" ON "media" USING btree ("folder_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE INDEX "faqs__status_idx" ON "faqs" USING btree ("_status");
  CREATE INDEX "_faqs_v_parent_idx" ON "_faqs_v" USING btree ("parent_id");
  CREATE INDEX "_faqs_v_version_version_updated_at_idx" ON "_faqs_v" USING btree ("version_updated_at");
  CREATE INDEX "_faqs_v_version_version_created_at_idx" ON "_faqs_v" USING btree ("version_created_at");
  CREATE INDEX "_faqs_v_version_version__status_idx" ON "_faqs_v" USING btree ("version__status");
  CREATE INDEX "_faqs_v_created_at_idx" ON "_faqs_v" USING btree ("created_at");
  CREATE INDEX "_faqs_v_updated_at_idx" ON "_faqs_v" USING btree ("updated_at");
  CREATE INDEX "_faqs_v_latest_idx" ON "_faqs_v" USING btree ("latest");
  CREATE INDEX "_faqs_v_autosave_idx" ON "_faqs_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "legal_pages_slug_idx" ON "legal_pages" USING btree ("slug");
  CREATE UNIQUE INDEX "legal_pages_path_idx" ON "legal_pages" USING btree ("path");
  CREATE INDEX "legal_pages_seo_seo_og_image_idx" ON "legal_pages" USING btree ("seo_og_image_id");
  CREATE INDEX "legal_pages_updated_at_idx" ON "legal_pages" USING btree ("updated_at");
  CREATE INDEX "legal_pages_created_at_idx" ON "legal_pages" USING btree ("created_at");
  CREATE INDEX "legal_pages__status_idx" ON "legal_pages" USING btree ("_status");
  CREATE INDEX "_legal_pages_v_parent_idx" ON "_legal_pages_v" USING btree ("parent_id");
  CREATE INDEX "_legal_pages_v_version_version_slug_idx" ON "_legal_pages_v" USING btree ("version_slug");
  CREATE INDEX "_legal_pages_v_version_version_path_idx" ON "_legal_pages_v" USING btree ("version_path");
  CREATE INDEX "_legal_pages_v_version_seo_version_seo_og_image_idx" ON "_legal_pages_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_legal_pages_v_version_version_updated_at_idx" ON "_legal_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_legal_pages_v_version_version_created_at_idx" ON "_legal_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_legal_pages_v_version_version__status_idx" ON "_legal_pages_v" USING btree ("version__status");
  CREATE INDEX "_legal_pages_v_created_at_idx" ON "_legal_pages_v" USING btree ("created_at");
  CREATE INDEX "_legal_pages_v_updated_at_idx" ON "_legal_pages_v" USING btree ("updated_at");
  CREATE INDEX "_legal_pages_v_latest_idx" ON "_legal_pages_v" USING btree ("latest");
  CREATE INDEX "_legal_pages_v_autosave_idx" ON "_legal_pages_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "whatsapp_preview_links_key_idx" ON "whatsapp_preview_links" USING btree ("key");
  CREATE INDEX "whatsapp_preview_links_og_image_idx" ON "whatsapp_preview_links" USING btree ("og_image_id");
  CREATE INDEX "whatsapp_preview_links_updated_at_idx" ON "whatsapp_preview_links" USING btree ("updated_at");
  CREATE INDEX "whatsapp_preview_links_created_at_idx" ON "whatsapp_preview_links" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "redirects_from_path_idx" ON "redirects" USING btree ("from_path");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_folders_folder_type_order_idx" ON "payload_folders_folder_type" USING btree ("order");
  CREATE INDEX "payload_folders_folder_type_parent_idx" ON "payload_folders_folder_type" USING btree ("parent_id");
  CREATE INDEX "payload_folders_name_idx" ON "payload_folders" USING btree ("name");
  CREATE INDEX "payload_folders_folder_idx" ON "payload_folders" USING btree ("folder_id");
  CREATE INDEX "payload_folders_updated_at_idx" ON "payload_folders" USING btree ("updated_at");
  CREATE INDEX "payload_folders_created_at_idx" ON "payload_folders" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_legal_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("legal_pages_id");
  CREATE INDEX "payload_locked_documents_rels_whatsapp_preview_links_id_idx" ON "payload_locked_documents_rels" USING btree ("whatsapp_preview_links_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_locked_documents_rels_payload_folders_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_folders_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_logo_mark_idx" ON "site_settings" USING btree ("logo_mark_id");
  CREATE INDEX "site_settings_logo_icon_idx" ON "site_settings" USING btree ("logo_icon_id");
  CREATE INDEX "site_settings_apple_icon_idx" ON "site_settings" USING btree ("apple_icon_id");
  CREATE INDEX "site_settings_default_og_image_idx" ON "site_settings" USING btree ("default_og_image_id");
  CREATE INDEX "site_settings__status_idx" ON "site_settings" USING btree ("_status");
  CREATE INDEX "_site_settings_v_version_social_links_order_idx" ON "_site_settings_v_version_social_links" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_social_links_parent_id_idx" ON "_site_settings_v_version_social_links" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_version_logo_mark_idx" ON "_site_settings_v" USING btree ("version_logo_mark_id");
  CREATE INDEX "_site_settings_v_version_version_logo_icon_idx" ON "_site_settings_v" USING btree ("version_logo_icon_id");
  CREATE INDEX "_site_settings_v_version_version_apple_icon_idx" ON "_site_settings_v" USING btree ("version_apple_icon_id");
  CREATE INDEX "_site_settings_v_version_version_default_og_image_idx" ON "_site_settings_v" USING btree ("version_default_og_image_id");
  CREATE INDEX "_site_settings_v_version_version__status_idx" ON "_site_settings_v" USING btree ("version__status");
  CREATE INDEX "_site_settings_v_created_at_idx" ON "_site_settings_v" USING btree ("created_at");
  CREATE INDEX "_site_settings_v_updated_at_idx" ON "_site_settings_v" USING btree ("updated_at");
  CREATE INDEX "_site_settings_v_latest_idx" ON "_site_settings_v" USING btree ("latest");
  CREATE INDEX "_site_settings_v_autosave_idx" ON "_site_settings_v" USING btree ("autosave");
  CREATE INDEX "seo_defaults_fallback_og_image_idx" ON "seo_defaults" USING btree ("fallback_og_image_id");
  CREATE INDEX "seo_defaults__status_idx" ON "seo_defaults" USING btree ("_status");
  CREATE INDEX "_seo_defaults_v_version_version_fallback_og_image_idx" ON "_seo_defaults_v" USING btree ("version_fallback_og_image_id");
  CREATE INDEX "_seo_defaults_v_version_version__status_idx" ON "_seo_defaults_v" USING btree ("version__status");
  CREATE INDEX "_seo_defaults_v_created_at_idx" ON "_seo_defaults_v" USING btree ("created_at");
  CREATE INDEX "_seo_defaults_v_updated_at_idx" ON "_seo_defaults_v" USING btree ("updated_at");
  CREATE INDEX "_seo_defaults_v_latest_idx" ON "_seo_defaults_v" USING btree ("latest");
  CREATE INDEX "_seo_defaults_v_autosave_idx" ON "_seo_defaults_v" USING btree ("autosave");
  CREATE INDEX "theme_settings_section_variant_map_order_idx" ON "theme_settings_section_variant_map" USING btree ("_order");
  CREATE INDEX "theme_settings_section_variant_map_parent_id_idx" ON "theme_settings_section_variant_map" USING btree ("_parent_id");
  CREATE INDEX "theme_settings__status_idx" ON "theme_settings" USING btree ("_status");
  CREATE INDEX "_theme_settings_v_version_section_variant_map_order_idx" ON "_theme_settings_v_version_section_variant_map" USING btree ("_order");
  CREATE INDEX "_theme_settings_v_version_section_variant_map_parent_id_idx" ON "_theme_settings_v_version_section_variant_map" USING btree ("_parent_id");
  CREATE INDEX "_theme_settings_v_version_version__status_idx" ON "_theme_settings_v" USING btree ("version__status");
  CREATE INDEX "_theme_settings_v_created_at_idx" ON "_theme_settings_v" USING btree ("created_at");
  CREATE INDEX "_theme_settings_v_updated_at_idx" ON "_theme_settings_v" USING btree ("updated_at");
  CREATE INDEX "_theme_settings_v_latest_idx" ON "_theme_settings_v" USING btree ("latest");
  CREATE INDEX "_theme_settings_v_autosave_idx" ON "_theme_settings_v" USING btree ("autosave");
  CREATE INDEX "navigation_items_order_idx" ON "navigation_items" USING btree ("_order");
  CREATE INDEX "navigation_items_parent_id_idx" ON "navigation_items" USING btree ("_parent_id");
  CREATE INDEX "navigation__status_idx" ON "navigation" USING btree ("_status");
  CREATE INDEX "_navigation_v_version_items_order_idx" ON "_navigation_v_version_items" USING btree ("_order");
  CREATE INDEX "_navigation_v_version_items_parent_id_idx" ON "_navigation_v_version_items" USING btree ("_parent_id");
  CREATE INDEX "_navigation_v_version_version__status_idx" ON "_navigation_v" USING btree ("version__status");
  CREATE INDEX "_navigation_v_created_at_idx" ON "_navigation_v" USING btree ("created_at");
  CREATE INDEX "_navigation_v_updated_at_idx" ON "_navigation_v" USING btree ("updated_at");
  CREATE INDEX "_navigation_v_latest_idx" ON "_navigation_v" USING btree ("latest");
  CREATE INDEX "_navigation_v_autosave_idx" ON "_navigation_v" USING btree ("autosave");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE INDEX "footer__status_idx" ON "footer" USING btree ("_status");
  CREATE INDEX "_footer_v_version_columns_links_order_idx" ON "_footer_v_version_columns_links" USING btree ("_order");
  CREATE INDEX "_footer_v_version_columns_links_parent_id_idx" ON "_footer_v_version_columns_links" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_version_columns_order_idx" ON "_footer_v_version_columns" USING btree ("_order");
  CREATE INDEX "_footer_v_version_columns_parent_id_idx" ON "_footer_v_version_columns" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_version_version__status_idx" ON "_footer_v" USING btree ("version__status");
  CREATE INDEX "_footer_v_created_at_idx" ON "_footer_v" USING btree ("created_at");
  CREATE INDEX "_footer_v_updated_at_idx" ON "_footer_v" USING btree ("updated_at");
  CREATE INDEX "_footer_v_latest_idx" ON "_footer_v" USING btree ("latest");
  CREATE INDEX "_footer_v_autosave_idx" ON "_footer_v" USING btree ("autosave");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_market_ribbon" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_guest_widget_embed" CASCADE;
  DROP TABLE "pages_blocks_trust_strip_signals" CASCADE;
  DROP TABLE "pages_blocks_trust_strip" CASCADE;
  DROP TABLE "pages_blocks_feature_grid_items" CASCADE;
  DROP TABLE "pages_blocks_feature_grid" CASCADE;
  DROP TABLE "pages_blocks_how_it_works_steps" CASCADE;
  DROP TABLE "pages_blocks_how_it_works" CASCADE;
  DROP TABLE "pages_blocks_security_controls" CASCADE;
  DROP TABLE "pages_blocks_security" CASCADE;
  DROP TABLE "pages_blocks_cards_features" CASCADE;
  DROP TABLE "pages_blocks_cards" CASCADE;
  DROP TABLE "pages_blocks_global_finance_highlights" CASCADE;
  DROP TABLE "pages_blocks_global_finance" CASCADE;
  DROP TABLE "pages_blocks_final_cta" CASCADE;
  DROP TABLE "pages_blocks_convert_hero" CASCADE;
  DROP TABLE "pages_blocks_trust_footer_items_items" CASCADE;
  DROP TABLE "pages_blocks_trust_footer_items" CASCADE;
  DROP TABLE "pages_blocks_rich_text_content" CASCADE;
  DROP TABLE "pages_blocks_media_showcase" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_market_ribbon" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_guest_widget_embed" CASCADE;
  DROP TABLE "_pages_v_blocks_trust_strip_signals" CASCADE;
  DROP TABLE "_pages_v_blocks_trust_strip" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_grid_items" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_how_it_works_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_how_it_works" CASCADE;
  DROP TABLE "_pages_v_blocks_security_controls" CASCADE;
  DROP TABLE "_pages_v_blocks_security" CASCADE;
  DROP TABLE "_pages_v_blocks_cards_features" CASCADE;
  DROP TABLE "_pages_v_blocks_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_global_finance_highlights" CASCADE;
  DROP TABLE "_pages_v_blocks_global_finance" CASCADE;
  DROP TABLE "_pages_v_blocks_final_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_convert_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_trust_footer_items_items" CASCADE;
  DROP TABLE "_pages_v_blocks_trust_footer_items" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text_content" CASCADE;
  DROP TABLE "_pages_v_blocks_media_showcase" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "_faqs_v" CASCADE;
  DROP TABLE "legal_pages" CASCADE;
  DROP TABLE "_legal_pages_v" CASCADE;
  DROP TABLE "whatsapp_preview_links" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_folders_folder_type" CASCADE;
  DROP TABLE "payload_folders" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_social_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "_site_settings_v_version_social_links" CASCADE;
  DROP TABLE "_site_settings_v" CASCADE;
  DROP TABLE "seo_defaults" CASCADE;
  DROP TABLE "_seo_defaults_v" CASCADE;
  DROP TABLE "theme_settings_section_variant_map" CASCADE;
  DROP TABLE "theme_settings" CASCADE;
  DROP TABLE "_theme_settings_v_version_section_variant_map" CASCADE;
  DROP TABLE "_theme_settings_v" CASCADE;
  DROP TABLE "navigation_items" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "_navigation_v_version_items" CASCADE;
  DROP TABLE "_navigation_v" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "_footer_v_version_columns_links" CASCADE;
  DROP TABLE "_footer_v_version_columns" CASCADE;
  DROP TABLE "_footer_v" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_market_ribbon_ticker_mode";
  DROP TYPE "public"."enum_pages_blocks_market_ribbon_variant";
  DROP TYPE "public"."enum_pages_blocks_hero_variant";
  DROP TYPE "public"."enum_pages_blocks_guest_widget_embed_variant";
  DROP TYPE "public"."enum_pages_blocks_trust_strip_variant";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_items_icon";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_variant";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_how_it_works_variant";
  DROP TYPE "public"."enum_pages_blocks_security_variant";
  DROP TYPE "public"."enum_pages_blocks_cards_variant";
  DROP TYPE "public"."enum_pages_blocks_global_finance_variant";
  DROP TYPE "public"."enum_pages_blocks_final_cta_variant";
  DROP TYPE "public"."enum_pages_blocks_convert_hero_variant";
  DROP TYPE "public"."enum_pages_blocks_trust_footer_items_variant";
  DROP TYPE "public"."enum_pages_blocks_rich_text_content_variant";
  DROP TYPE "public"."enum_pages_blocks_media_showcase_variant";
  DROP TYPE "public"."enum_pages_blocks_media_showcase_layout";
  DROP TYPE "public"."enum_pages_blocks_cta_variant";
  DROP TYPE "public"."enum_pages_seo_robots";
  DROP TYPE "public"."enum_pages_theme_override_preset";
  DROP TYPE "public"."enum_pages_theme_override_section_variant";
  DROP TYPE "public"."enum_pages_theme_override_button_variant";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_market_ribbon_ticker_mode";
  DROP TYPE "public"."enum__pages_v_blocks_market_ribbon_variant";
  DROP TYPE "public"."enum__pages_v_blocks_hero_variant";
  DROP TYPE "public"."enum__pages_v_blocks_guest_widget_embed_variant";
  DROP TYPE "public"."enum__pages_v_blocks_trust_strip_variant";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_items_icon";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_variant";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_columns";
  DROP TYPE "public"."enum__pages_v_blocks_how_it_works_variant";
  DROP TYPE "public"."enum__pages_v_blocks_security_variant";
  DROP TYPE "public"."enum__pages_v_blocks_cards_variant";
  DROP TYPE "public"."enum__pages_v_blocks_global_finance_variant";
  DROP TYPE "public"."enum__pages_v_blocks_final_cta_variant";
  DROP TYPE "public"."enum__pages_v_blocks_convert_hero_variant";
  DROP TYPE "public"."enum__pages_v_blocks_trust_footer_items_variant";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_content_variant";
  DROP TYPE "public"."enum__pages_v_blocks_media_showcase_variant";
  DROP TYPE "public"."enum__pages_v_blocks_media_showcase_layout";
  DROP TYPE "public"."enum__pages_v_blocks_cta_variant";
  DROP TYPE "public"."enum__pages_v_version_seo_robots";
  DROP TYPE "public"."enum__pages_v_version_theme_override_preset";
  DROP TYPE "public"."enum__pages_v_version_theme_override_section_variant";
  DROP TYPE "public"."enum__pages_v_version_theme_override_button_variant";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_faqs_category";
  DROP TYPE "public"."enum_faqs_status";
  DROP TYPE "public"."enum__faqs_v_version_category";
  DROP TYPE "public"."enum__faqs_v_version_status";
  DROP TYPE "public"."enum_legal_pages_seo_robots";
  DROP TYPE "public"."enum_legal_pages_status";
  DROP TYPE "public"."enum__legal_pages_v_version_seo_robots";
  DROP TYPE "public"."enum__legal_pages_v_version_status";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_redirects_target_type";
  DROP TYPE "public"."enum_redirects_status_code";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_payload_folders_folder_type";
  DROP TYPE "public"."enum_site_settings_social_links_platform";
  DROP TYPE "public"."enum_site_settings_status";
  DROP TYPE "public"."enum__site_settings_v_version_social_links_platform";
  DROP TYPE "public"."enum__site_settings_v_version_status";
  DROP TYPE "public"."enum_seo_defaults_status";
  DROP TYPE "public"."enum__seo_defaults_v_version_status";
  DROP TYPE "public"."enum_theme_settings_section_variant_map_section_type";
  DROP TYPE "public"."enum_theme_settings_section_variant_map_variant";
  DROP TYPE "public"."enum_theme_settings_preset";
  DROP TYPE "public"."enum_theme_settings_primary_token";
  DROP TYPE "public"."enum_theme_settings_accent_token";
  DROP TYPE "public"."enum_theme_settings_background_mode";
  DROP TYPE "public"."enum_theme_settings_button_variant_default";
  DROP TYPE "public"."enum_theme_settings_status";
  DROP TYPE "public"."enum__theme_settings_v_version_section_variant_map_section_type";
  DROP TYPE "public"."enum__theme_settings_v_version_section_variant_map_variant";
  DROP TYPE "public"."enum__theme_settings_v_version_preset";
  DROP TYPE "public"."enum__theme_settings_v_version_primary_token";
  DROP TYPE "public"."enum__theme_settings_v_version_accent_token";
  DROP TYPE "public"."enum__theme_settings_v_version_background_mode";
  DROP TYPE "public"."enum__theme_settings_v_version_button_variant_default";
  DROP TYPE "public"."enum__theme_settings_v_version_status";
  DROP TYPE "public"."enum_navigation_items_link_type";
  DROP TYPE "public"."enum_navigation_status";
  DROP TYPE "public"."enum__navigation_v_version_items_link_type";
  DROP TYPE "public"."enum__navigation_v_version_status";
  DROP TYPE "public"."enum_footer_columns_links_link_type";
  DROP TYPE "public"."enum_footer_status";
  DROP TYPE "public"."enum__footer_v_version_columns_links_link_type";
  DROP TYPE "public"."enum__footer_v_version_status";`)
}
