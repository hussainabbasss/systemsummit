-- ===================================================================
-- System Summit — admin panel schema
--
-- Run once: Supabase Dashboard -> SQL Editor -> New query -> paste -> Run.
-- Safe to re-run (every statement is idempotent).
-- ===================================================================

create extension if not exists pgcrypto;

-- -------------------------------------------------------------------
-- leads — submissions from the "Get a Website" form
-- -------------------------------------------------------------------
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  mun_name    text not null,
  phone       text not null,
  -- Triage state, driven from the admin panel.
  status      text not null default 'new',
  -- Light attribution: which page the form was submitted from, and what
  -- referred that visit. No IP address is ever stored.
  source_path text,
  referrer    text,
  user_agent  text,
  constraint leads_status_check check (status in ('new', 'contacted', 'archived'))
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

-- -------------------------------------------------------------------
-- page_views — one row per page view, written by /api/track
--
-- visitor_id: first-party cookie, 1 year   -> unique visitors
-- session_id: first-party cookie, 30 min   -> sessions
-- Cookie-based, not IP-based, so nothing personally identifying is stored.
-- -------------------------------------------------------------------
create table if not exists public.page_views (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  path       text not null,
  referrer   text,
  visitor_id uuid not null,
  session_id uuid not null,
  user_agent text
);

create index if not exists page_views_created_at_idx on public.page_views (created_at desc);
create index if not exists page_views_path_idx on public.page_views (path);
create index if not exists page_views_visitor_id_idx on public.page_views (visitor_id);

-- -------------------------------------------------------------------
-- Row Level Security: enabled with ZERO policies, which denies every
-- request made with the publishable/anon key. The app only ever touches
-- these tables server-side with the secret key, which bypasses RLS.
-- -------------------------------------------------------------------
alter table public.leads enable row level security;
alter table public.page_views enable row level security;
