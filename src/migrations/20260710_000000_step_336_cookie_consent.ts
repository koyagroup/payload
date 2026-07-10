import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// step-336: additive — the new `cookie-consent` global (localized heading + body).
// Purely new tables/enums (no existing data touched); down drops them. Generated
// from the push-materialised target schema diffed against the current prod schema
// (migrate:create is unusable here — the hand-written step-334 migration left no
// drizzle snapshot). Proven up->down->up on Postgres 16.

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_cookie_consent_status') THEN CREATE TYPE "enum_cookie_consent_status" AS ENUM ('draft', 'published'); END IF; END $$;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__cookie_consent_v_version_status') THEN CREATE TYPE "enum__cookie_consent_v_version_status" AS ENUM ('draft', 'published'); END IF; END $$;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__cookie_consent_v_published_locale') THEN CREATE TYPE "enum__cookie_consent_v_published_locale" AS ENUM ('en'); END IF; END $$;
-- cookie_consent global tables (verbatim push DDL): base + _locales + version + version _locales
CREATE TABLE public._cookie_consent_v (
    id integer NOT NULL,
    version__status public.enum__cookie_consent_v_version_status DEFAULT 'draft'::public.enum__cookie_consent_v_version_status,
    version_updated_at timestamp(3) with time zone,
    version_created_at timestamp(3) with time zone,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    snapshot boolean,
    published_locale public.enum__cookie_consent_v_published_locale,
    latest boolean,
    autosave boolean
);
CREATE SEQUENCE public._cookie_consent_v_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._cookie_consent_v_id_seq OWNED BY public._cookie_consent_v.id;
CREATE TABLE public._cookie_consent_v_locales (
    version_heading character varying,
    version_body character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._cookie_consent_v_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._cookie_consent_v_locales_id_seq OWNED BY public._cookie_consent_v_locales.id;
CREATE TABLE public.cookie_consent (
    id integer NOT NULL,
    _status public.enum_cookie_consent_status DEFAULT 'draft'::public.enum_cookie_consent_status,
    updated_at timestamp(3) with time zone,
    created_at timestamp(3) with time zone
);
CREATE SEQUENCE public.cookie_consent_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.cookie_consent_id_seq OWNED BY public.cookie_consent.id;
CREATE TABLE public.cookie_consent_locales (
    heading character varying,
    body character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public.cookie_consent_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.cookie_consent_locales_id_seq OWNED BY public.cookie_consent_locales.id;
ALTER TABLE ONLY public._cookie_consent_v ALTER COLUMN id SET DEFAULT nextval('public._cookie_consent_v_id_seq'::regclass);
ALTER TABLE ONLY public._cookie_consent_v_locales ALTER COLUMN id SET DEFAULT nextval('public._cookie_consent_v_locales_id_seq'::regclass);
ALTER TABLE ONLY public.cookie_consent ALTER COLUMN id SET DEFAULT nextval('public.cookie_consent_id_seq'::regclass);
ALTER TABLE ONLY public.cookie_consent_locales ALTER COLUMN id SET DEFAULT nextval('public.cookie_consent_locales_id_seq'::regclass);
ALTER TABLE ONLY public._cookie_consent_v_locales
    ADD CONSTRAINT _cookie_consent_v_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._cookie_consent_v
    ADD CONSTRAINT _cookie_consent_v_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.cookie_consent_locales
    ADD CONSTRAINT cookie_consent_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.cookie_consent
    ADD CONSTRAINT cookie_consent_pkey PRIMARY KEY (id);
CREATE INDEX _cookie_consent_v_autosave_idx ON public._cookie_consent_v USING btree (autosave);
CREATE INDEX _cookie_consent_v_created_at_idx ON public._cookie_consent_v USING btree (created_at);
CREATE INDEX _cookie_consent_v_latest_idx ON public._cookie_consent_v USING btree (latest);
CREATE UNIQUE INDEX _cookie_consent_v_locales_locale_parent_id_unique ON public._cookie_consent_v_locales USING btree (_locale, _parent_id);
CREATE INDEX _cookie_consent_v_published_locale_idx ON public._cookie_consent_v USING btree (published_locale);
CREATE INDEX _cookie_consent_v_snapshot_idx ON public._cookie_consent_v USING btree (snapshot);
CREATE INDEX _cookie_consent_v_updated_at_idx ON public._cookie_consent_v USING btree (updated_at);
CREATE INDEX _cookie_consent_v_version_version__status_idx ON public._cookie_consent_v USING btree (version__status);
CREATE INDEX cookie_consent__status_idx ON public.cookie_consent USING btree (_status);
CREATE UNIQUE INDEX cookie_consent_locales_locale_parent_id_unique ON public.cookie_consent_locales USING btree (_locale, _parent_id);
ALTER TABLE ONLY public._cookie_consent_v_locales
    ADD CONSTRAINT _cookie_consent_v_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._cookie_consent_v(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.cookie_consent_locales
    ADD CONSTRAINT cookie_consent_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.cookie_consent(id) ON DELETE CASCADE;
`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
DROP TABLE IF EXISTS "cookie_consent_locales" CASCADE;
DROP TABLE IF EXISTS "cookie_consent" CASCADE;
DROP TABLE IF EXISTS "_cookie_consent_v_locales" CASCADE;
DROP TABLE IF EXISTS "_cookie_consent_v" CASCADE;
DROP TYPE IF EXISTS "enum_cookie_consent_status";
DROP TYPE IF EXISTS "enum__cookie_consent_v_version_status";
DROP TYPE IF EXISTS "enum__cookie_consent_v_published_locale";
`)
}
