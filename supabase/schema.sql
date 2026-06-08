-- Portfolio schema for siddharthb.me
-- Run in Supabase SQL Editor

-- projects
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  long_description text,
  tags text[],
  github_url text,
  live_url text,
  thumbnail_url text,
  pinned boolean default false,
  published boolean default true,
  created_at timestamptz default now()
);

-- posts
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- contact_submissions
create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);

-- page_views
create table if not exists page_views (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  referrer text,
  user_agent text,
  created_at timestamptz default now()
);

-- Row Level Security
alter table projects enable row level security;
alter table posts enable row level security;
alter table contact_submissions enable row level security;
alter table page_views enable row level security;

-- projects: public read (published only), no public write
create policy "Public read published projects"
  on projects for select
  using (published = true);

-- posts: public read (published only), no public write
create policy "Public read published posts"
  on posts for select
  using (published = true);

-- contact_submissions: public insert only, no read
create policy "Public insert contact submissions"
  on contact_submissions for insert
  with check (true);

-- page_views: no public policies — inserts via service role only
