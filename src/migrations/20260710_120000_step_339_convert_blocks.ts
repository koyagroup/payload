import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// step-339: additive — three new /convert page blocks (convertPricing, convertTrust,
// convertMarkets) so the whole convert page is CMS-controlled. Purely new tables/enums
// (no existing data touched); down drops them. DDL transcribed mechanically from the
// live schema's featureGrid analog (pg_dump of a fully-migrated PG16), since
// migrate:create remains unusable (the hand-written step-334 migration left no drizzle
// snapshot). Proven up->down->up on Postgres 16 + a payload local-API create/read proof.

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
-- ── convert_pricing ──
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__pages_v_blocks_convert_pricing_items_icon') THEN CREATE TYPE public.enum__pages_v_blocks_convert_pricing_items_icon AS ENUM (
    'percent',
    'radio',
    'shield',
    'lock',
    'chart',
    'zap'
); END IF; END $$;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__pages_v_blocks_convert_pricing_variant') THEN CREATE TYPE public.enum__pages_v_blocks_convert_pricing_variant AS ENUM (
    'default',
    'elevated',
    'subtle',
    'inverted'
); END IF; END $$;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_pages_blocks_convert_pricing_items_icon') THEN CREATE TYPE public.enum_pages_blocks_convert_pricing_items_icon AS ENUM (
    'percent',
    'radio',
    'shield',
    'lock',
    'chart',
    'zap'
); END IF; END $$;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_pages_blocks_convert_pricing_variant') THEN CREATE TYPE public.enum_pages_blocks_convert_pricing_variant AS ENUM (
    'default',
    'elevated',
    'subtle',
    'inverted'
); END IF; END $$;
CREATE TABLE public._pages_v_blocks_convert_pricing (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    variant public.enum__pages_v_blocks_convert_pricing_variant DEFAULT 'default'::public.enum__pages_v_blocks_convert_pricing_variant,
    _uuid character varying,
    block_name character varying
);
CREATE SEQUENCE public._pages_v_blocks_convert_pricing_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_convert_pricing_id_seq OWNED BY public._pages_v_blocks_convert_pricing.id;
CREATE TABLE public._pages_v_blocks_convert_pricing_items (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    icon public.enum__pages_v_blocks_convert_pricing_items_icon,
    _uuid character varying
);
CREATE SEQUENCE public._pages_v_blocks_convert_pricing_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_convert_pricing_items_id_seq OWNED BY public._pages_v_blocks_convert_pricing_items.id;
CREATE TABLE public._pages_v_blocks_convert_pricing_items_locales (
    title character varying,
    body character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._pages_v_blocks_convert_pricing_items_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_convert_pricing_items_locales_id_seq OWNED BY public._pages_v_blocks_convert_pricing_items_locales.id;
CREATE TABLE public._pages_v_blocks_convert_pricing_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._pages_v_blocks_convert_pricing_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_convert_pricing_locales_id_seq OWNED BY public._pages_v_blocks_convert_pricing_locales.id;
CREATE TABLE public.pages_blocks_convert_pricing (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    variant public.enum_pages_blocks_convert_pricing_variant DEFAULT 'default'::public.enum_pages_blocks_convert_pricing_variant,
    block_name character varying
);
CREATE TABLE public.pages_blocks_convert_pricing_items (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    icon public.enum_pages_blocks_convert_pricing_items_icon
);
CREATE TABLE public.pages_blocks_convert_pricing_items_locales (
    title character varying,
    body character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.pages_blocks_convert_pricing_items_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_blocks_convert_pricing_items_locales_id_seq OWNED BY public.pages_blocks_convert_pricing_items_locales.id;
CREATE TABLE public.pages_blocks_convert_pricing_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.pages_blocks_convert_pricing_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_blocks_convert_pricing_locales_id_seq OWNED BY public.pages_blocks_convert_pricing_locales.id;
ALTER TABLE ONLY public._pages_v_blocks_convert_pricing ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_convert_pricing_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_convert_pricing_items ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_convert_pricing_items_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_convert_pricing_items_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_convert_pricing_items_locales_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_convert_pricing_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_convert_pricing_locales_id_seq'::regclass);
ALTER TABLE ONLY public.pages_blocks_convert_pricing_items_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_convert_pricing_items_locales_id_seq'::regclass);
ALTER TABLE ONLY public.pages_blocks_convert_pricing_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_convert_pricing_locales_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_convert_pricing_items_locales
    ADD CONSTRAINT _pages_v_blocks_convert_pricing_items_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_convert_pricing_items
    ADD CONSTRAINT _pages_v_blocks_convert_pricing_items_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_convert_pricing_locales
    ADD CONSTRAINT _pages_v_blocks_convert_pricing_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_convert_pricing
    ADD CONSTRAINT _pages_v_blocks_convert_pricing_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_convert_pricing_items_locales
    ADD CONSTRAINT pages_blocks_convert_pricing_items_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_convert_pricing_items
    ADD CONSTRAINT pages_blocks_convert_pricing_items_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_convert_pricing_locales
    ADD CONSTRAINT pages_blocks_convert_pricing_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_convert_pricing
    ADD CONSTRAINT pages_blocks_convert_pricing_pkey PRIMARY KEY (id);
CREATE UNIQUE INDEX _pages_v_blocks_convert_pricing_items_locales_locale_parent_id_ ON public._pages_v_blocks_convert_pricing_items_locales USING btree (_locale, _parent_id);
CREATE INDEX _pages_v_blocks_convert_pricing_items_order_idx ON public._pages_v_blocks_convert_pricing_items USING btree (_order);
CREATE INDEX _pages_v_blocks_convert_pricing_items_parent_id_idx ON public._pages_v_blocks_convert_pricing_items USING btree (_parent_id);
CREATE UNIQUE INDEX _pages_v_blocks_convert_pricing_locales_locale_parent_id_unique ON public._pages_v_blocks_convert_pricing_locales USING btree (_locale, _parent_id);
CREATE INDEX _pages_v_blocks_convert_pricing_order_idx ON public._pages_v_blocks_convert_pricing USING btree (_order);
CREATE INDEX _pages_v_blocks_convert_pricing_parent_id_idx ON public._pages_v_blocks_convert_pricing USING btree (_parent_id);
CREATE INDEX _pages_v_blocks_convert_pricing_path_idx ON public._pages_v_blocks_convert_pricing USING btree (_path);
CREATE UNIQUE INDEX pages_blocks_convert_pricing_items_locales_locale_parent_id_uni ON public.pages_blocks_convert_pricing_items_locales USING btree (_locale, _parent_id);
CREATE INDEX pages_blocks_convert_pricing_items_order_idx ON public.pages_blocks_convert_pricing_items USING btree (_order);
CREATE INDEX pages_blocks_convert_pricing_items_parent_id_idx ON public.pages_blocks_convert_pricing_items USING btree (_parent_id);
CREATE UNIQUE INDEX pages_blocks_convert_pricing_locales_locale_parent_id_unique ON public.pages_blocks_convert_pricing_locales USING btree (_locale, _parent_id);
CREATE INDEX pages_blocks_convert_pricing_order_idx ON public.pages_blocks_convert_pricing USING btree (_order);
CREATE INDEX pages_blocks_convert_pricing_parent_id_idx ON public.pages_blocks_convert_pricing USING btree (_parent_id);
CREATE INDEX pages_blocks_convert_pricing_path_idx ON public.pages_blocks_convert_pricing USING btree (_path);
ALTER TABLE ONLY public._pages_v_blocks_convert_pricing_items_locales
    ADD CONSTRAINT _pages_v_blocks_convert_pricing_items_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_convert_pricing_items(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_convert_pricing_items
    ADD CONSTRAINT _pages_v_blocks_convert_pricing_items_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_convert_pricing(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_convert_pricing_locales
    ADD CONSTRAINT _pages_v_blocks_convert_pricing_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_convert_pricing(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_convert_pricing
    ADD CONSTRAINT _pages_v_blocks_convert_pricing_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_convert_pricing_items_locales
    ADD CONSTRAINT pages_blocks_convert_pricing_items_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_convert_pricing_items(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_convert_pricing_items
    ADD CONSTRAINT pages_blocks_convert_pricing_items_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_convert_pricing(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_convert_pricing_locales
    ADD CONSTRAINT pages_blocks_convert_pricing_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_convert_pricing(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_convert_pricing
    ADD CONSTRAINT pages_blocks_convert_pricing_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;
-- ── convert_trust ──
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__pages_v_blocks_convert_trust_items_icon') THEN CREATE TYPE public.enum__pages_v_blocks_convert_trust_items_icon AS ENUM (
    'percent',
    'radio',
    'shield',
    'lock',
    'chart',
    'zap'
); END IF; END $$;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__pages_v_blocks_convert_trust_variant') THEN CREATE TYPE public.enum__pages_v_blocks_convert_trust_variant AS ENUM (
    'default',
    'elevated',
    'subtle',
    'inverted'
); END IF; END $$;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_pages_blocks_convert_trust_items_icon') THEN CREATE TYPE public.enum_pages_blocks_convert_trust_items_icon AS ENUM (
    'percent',
    'radio',
    'shield',
    'lock',
    'chart',
    'zap'
); END IF; END $$;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_pages_blocks_convert_trust_variant') THEN CREATE TYPE public.enum_pages_blocks_convert_trust_variant AS ENUM (
    'default',
    'elevated',
    'subtle',
    'inverted'
); END IF; END $$;
CREATE TABLE public._pages_v_blocks_convert_trust (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    variant public.enum__pages_v_blocks_convert_trust_variant DEFAULT 'default'::public.enum__pages_v_blocks_convert_trust_variant,
    _uuid character varying,
    block_name character varying
);
CREATE SEQUENCE public._pages_v_blocks_convert_trust_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_convert_trust_id_seq OWNED BY public._pages_v_blocks_convert_trust.id;
CREATE TABLE public._pages_v_blocks_convert_trust_items (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    icon public.enum__pages_v_blocks_convert_trust_items_icon,
    _uuid character varying
);
CREATE SEQUENCE public._pages_v_blocks_convert_trust_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_convert_trust_items_id_seq OWNED BY public._pages_v_blocks_convert_trust_items.id;
CREATE TABLE public._pages_v_blocks_convert_trust_items_locales (
    title character varying,
    body character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._pages_v_blocks_convert_trust_items_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_convert_trust_items_locales_id_seq OWNED BY public._pages_v_blocks_convert_trust_items_locales.id;
CREATE TABLE public._pages_v_blocks_convert_trust_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._pages_v_blocks_convert_trust_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_convert_trust_locales_id_seq OWNED BY public._pages_v_blocks_convert_trust_locales.id;
CREATE TABLE public.pages_blocks_convert_trust (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    variant public.enum_pages_blocks_convert_trust_variant DEFAULT 'default'::public.enum_pages_blocks_convert_trust_variant,
    block_name character varying
);
CREATE TABLE public.pages_blocks_convert_trust_items (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    icon public.enum_pages_blocks_convert_trust_items_icon
);
CREATE TABLE public.pages_blocks_convert_trust_items_locales (
    title character varying,
    body character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.pages_blocks_convert_trust_items_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_blocks_convert_trust_items_locales_id_seq OWNED BY public.pages_blocks_convert_trust_items_locales.id;
CREATE TABLE public.pages_blocks_convert_trust_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.pages_blocks_convert_trust_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_blocks_convert_trust_locales_id_seq OWNED BY public.pages_blocks_convert_trust_locales.id;
ALTER TABLE ONLY public._pages_v_blocks_convert_trust ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_convert_trust_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_convert_trust_items ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_convert_trust_items_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_convert_trust_items_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_convert_trust_items_locales_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_convert_trust_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_convert_trust_locales_id_seq'::regclass);
ALTER TABLE ONLY public.pages_blocks_convert_trust_items_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_convert_trust_items_locales_id_seq'::regclass);
ALTER TABLE ONLY public.pages_blocks_convert_trust_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_convert_trust_locales_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_convert_trust_items_locales
    ADD CONSTRAINT _pages_v_blocks_convert_trust_items_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_convert_trust_items
    ADD CONSTRAINT _pages_v_blocks_convert_trust_items_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_convert_trust_locales
    ADD CONSTRAINT _pages_v_blocks_convert_trust_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_convert_trust
    ADD CONSTRAINT _pages_v_blocks_convert_trust_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_convert_trust_items_locales
    ADD CONSTRAINT pages_blocks_convert_trust_items_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_convert_trust_items
    ADD CONSTRAINT pages_blocks_convert_trust_items_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_convert_trust_locales
    ADD CONSTRAINT pages_blocks_convert_trust_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_convert_trust
    ADD CONSTRAINT pages_blocks_convert_trust_pkey PRIMARY KEY (id);
CREATE UNIQUE INDEX _pages_v_blocks_convert_trust_items_locales_locale_parent_id_ ON public._pages_v_blocks_convert_trust_items_locales USING btree (_locale, _parent_id);
CREATE INDEX _pages_v_blocks_convert_trust_items_order_idx ON public._pages_v_blocks_convert_trust_items USING btree (_order);
CREATE INDEX _pages_v_blocks_convert_trust_items_parent_id_idx ON public._pages_v_blocks_convert_trust_items USING btree (_parent_id);
CREATE UNIQUE INDEX _pages_v_blocks_convert_trust_locales_locale_parent_id_unique ON public._pages_v_blocks_convert_trust_locales USING btree (_locale, _parent_id);
CREATE INDEX _pages_v_blocks_convert_trust_order_idx ON public._pages_v_blocks_convert_trust USING btree (_order);
CREATE INDEX _pages_v_blocks_convert_trust_parent_id_idx ON public._pages_v_blocks_convert_trust USING btree (_parent_id);
CREATE INDEX _pages_v_blocks_convert_trust_path_idx ON public._pages_v_blocks_convert_trust USING btree (_path);
CREATE UNIQUE INDEX pages_blocks_convert_trust_items_locales_locale_parent_id_uni ON public.pages_blocks_convert_trust_items_locales USING btree (_locale, _parent_id);
CREATE INDEX pages_blocks_convert_trust_items_order_idx ON public.pages_blocks_convert_trust_items USING btree (_order);
CREATE INDEX pages_blocks_convert_trust_items_parent_id_idx ON public.pages_blocks_convert_trust_items USING btree (_parent_id);
CREATE UNIQUE INDEX pages_blocks_convert_trust_locales_locale_parent_id_unique ON public.pages_blocks_convert_trust_locales USING btree (_locale, _parent_id);
CREATE INDEX pages_blocks_convert_trust_order_idx ON public.pages_blocks_convert_trust USING btree (_order);
CREATE INDEX pages_blocks_convert_trust_parent_id_idx ON public.pages_blocks_convert_trust USING btree (_parent_id);
CREATE INDEX pages_blocks_convert_trust_path_idx ON public.pages_blocks_convert_trust USING btree (_path);
ALTER TABLE ONLY public._pages_v_blocks_convert_trust_items_locales
    ADD CONSTRAINT _pages_v_blocks_convert_trust_items_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_convert_trust_items(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_convert_trust_items
    ADD CONSTRAINT _pages_v_blocks_convert_trust_items_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_convert_trust(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_convert_trust_locales
    ADD CONSTRAINT _pages_v_blocks_convert_trust_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_convert_trust(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_convert_trust
    ADD CONSTRAINT _pages_v_blocks_convert_trust_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_convert_trust_items_locales
    ADD CONSTRAINT pages_blocks_convert_trust_items_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_convert_trust_items(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_convert_trust_items
    ADD CONSTRAINT pages_blocks_convert_trust_items_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_convert_trust(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_convert_trust_locales
    ADD CONSTRAINT pages_blocks_convert_trust_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_convert_trust(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_convert_trust
    ADD CONSTRAINT pages_blocks_convert_trust_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;
-- ── convert_markets ──
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__pages_v_blocks_convert_markets_variant') THEN CREATE TYPE public.enum__pages_v_blocks_convert_markets_variant AS ENUM (
    'default',
    'elevated',
    'subtle',
    'inverted'
); END IF; END $$;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_pages_blocks_convert_markets_variant') THEN CREATE TYPE public.enum_pages_blocks_convert_markets_variant AS ENUM (
    'default',
    'elevated',
    'subtle',
    'inverted'
); END IF; END $$;
CREATE TABLE public._pages_v_blocks_convert_markets (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    variant public.enum__pages_v_blocks_convert_markets_variant DEFAULT 'default'::public.enum__pages_v_blocks_convert_markets_variant,
    _uuid character varying,
    block_name character varying
);
CREATE SEQUENCE public._pages_v_blocks_convert_markets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_convert_markets_id_seq OWNED BY public._pages_v_blocks_convert_markets.id;
CREATE TABLE public._pages_v_blocks_convert_markets_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);
CREATE SEQUENCE public._pages_v_blocks_convert_markets_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public._pages_v_blocks_convert_markets_locales_id_seq OWNED BY public._pages_v_blocks_convert_markets_locales.id;
CREATE TABLE public.pages_blocks_convert_markets (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    variant public.enum_pages_blocks_convert_markets_variant DEFAULT 'default'::public.enum_pages_blocks_convert_markets_variant,
    block_name character varying
);
CREATE TABLE public.pages_blocks_convert_markets_locales (
    eyebrow character varying,
    heading character varying,
    subheading character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);
CREATE SEQUENCE public.pages_blocks_convert_markets_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_blocks_convert_markets_locales_id_seq OWNED BY public.pages_blocks_convert_markets_locales.id;
ALTER TABLE ONLY public._pages_v_blocks_convert_markets ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_convert_markets_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_convert_markets_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_convert_markets_locales_id_seq'::regclass);
ALTER TABLE ONLY public.pages_blocks_convert_markets_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_convert_markets_locales_id_seq'::regclass);
ALTER TABLE ONLY public._pages_v_blocks_convert_markets_locales
    ADD CONSTRAINT _pages_v_blocks_convert_markets_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._pages_v_blocks_convert_markets
    ADD CONSTRAINT _pages_v_blocks_convert_markets_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_convert_markets_locales
    ADD CONSTRAINT pages_blocks_convert_markets_locales_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages_blocks_convert_markets
    ADD CONSTRAINT pages_blocks_convert_markets_pkey PRIMARY KEY (id);
CREATE UNIQUE INDEX _pages_v_blocks_convert_markets_locales_locale_parent_id_unique ON public._pages_v_blocks_convert_markets_locales USING btree (_locale, _parent_id);
CREATE INDEX _pages_v_blocks_convert_markets_order_idx ON public._pages_v_blocks_convert_markets USING btree (_order);
CREATE INDEX _pages_v_blocks_convert_markets_parent_id_idx ON public._pages_v_blocks_convert_markets USING btree (_parent_id);
CREATE INDEX _pages_v_blocks_convert_markets_path_idx ON public._pages_v_blocks_convert_markets USING btree (_path);
CREATE UNIQUE INDEX pages_blocks_convert_markets_locales_locale_parent_id_unique ON public.pages_blocks_convert_markets_locales USING btree (_locale, _parent_id);
CREATE INDEX pages_blocks_convert_markets_order_idx ON public.pages_blocks_convert_markets USING btree (_order);
CREATE INDEX pages_blocks_convert_markets_parent_id_idx ON public.pages_blocks_convert_markets USING btree (_parent_id);
CREATE INDEX pages_blocks_convert_markets_path_idx ON public.pages_blocks_convert_markets USING btree (_path);
ALTER TABLE ONLY public._pages_v_blocks_convert_markets_locales
    ADD CONSTRAINT _pages_v_blocks_convert_markets_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_convert_markets(id) ON DELETE CASCADE;
ALTER TABLE ONLY public._pages_v_blocks_convert_markets
    ADD CONSTRAINT _pages_v_blocks_convert_markets_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_convert_markets_locales
    ADD CONSTRAINT pages_blocks_convert_markets_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_convert_markets(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.pages_blocks_convert_markets
    ADD CONSTRAINT pages_blocks_convert_markets_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
DROP TABLE IF EXISTS public.pages_blocks_convert_pricing_items_locales CASCADE;
DROP TABLE IF EXISTS public.pages_blocks_convert_pricing_items CASCADE;
DROP TABLE IF EXISTS public.pages_blocks_convert_pricing_locales CASCADE;
DROP TABLE IF EXISTS public.pages_blocks_convert_pricing CASCADE;
DROP TABLE IF EXISTS public._pages_v_blocks_convert_pricing_items_locales CASCADE;
DROP TABLE IF EXISTS public._pages_v_blocks_convert_pricing_items CASCADE;
DROP TABLE IF EXISTS public._pages_v_blocks_convert_pricing_locales CASCADE;
DROP TABLE IF EXISTS public._pages_v_blocks_convert_pricing CASCADE;
DROP TABLE IF EXISTS public.pages_blocks_convert_trust_items_locales CASCADE;
DROP TABLE IF EXISTS public.pages_blocks_convert_trust_items CASCADE;
DROP TABLE IF EXISTS public.pages_blocks_convert_trust_locales CASCADE;
DROP TABLE IF EXISTS public.pages_blocks_convert_trust CASCADE;
DROP TABLE IF EXISTS public._pages_v_blocks_convert_trust_items_locales CASCADE;
DROP TABLE IF EXISTS public._pages_v_blocks_convert_trust_items CASCADE;
DROP TABLE IF EXISTS public._pages_v_blocks_convert_trust_locales CASCADE;
DROP TABLE IF EXISTS public._pages_v_blocks_convert_trust CASCADE;
DROP TABLE IF EXISTS public.pages_blocks_convert_markets_locales CASCADE;
DROP TABLE IF EXISTS public.pages_blocks_convert_markets CASCADE;
DROP TABLE IF EXISTS public._pages_v_blocks_convert_markets_locales CASCADE;
DROP TABLE IF EXISTS public._pages_v_blocks_convert_markets CASCADE;
DROP TYPE IF EXISTS public.enum_pages_blocks_convert_pricing_variant;
DROP TYPE IF EXISTS public.enum_pages_blocks_convert_pricing_items_icon;
DROP TYPE IF EXISTS public.enum__pages_v_blocks_convert_pricing_variant;
DROP TYPE IF EXISTS public.enum__pages_v_blocks_convert_pricing_items_icon;
DROP TYPE IF EXISTS public.enum_pages_blocks_convert_trust_variant;
DROP TYPE IF EXISTS public.enum_pages_blocks_convert_trust_items_icon;
DROP TYPE IF EXISTS public.enum__pages_v_blocks_convert_trust_variant;
DROP TYPE IF EXISTS public.enum__pages_v_blocks_convert_trust_items_icon;
DROP TYPE IF EXISTS public.enum_pages_blocks_convert_markets_variant;
DROP TYPE IF EXISTS public.enum__pages_v_blocks_convert_markets_variant;
`)
}
