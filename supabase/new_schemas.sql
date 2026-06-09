-- Additional schema for Siddarth's portfolio
-- Run these in the Supabase SQL Editor

-- experiences
create table if not exists experiences (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  company text not null,
  duration text not null,
  description text,
  skills text[], -- list of tech/libs used
  link text,
  pinned boolean default false,
  published boolean default true,
  order_index integer default 0,
  created_at timestamptz default now()
);

-- skills
create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null, -- e.g., 'Languages', 'Frameworks', 'Tools'
  order_index integer default 0,
  created_at timestamptz default now()
);

-- Row Level Security
alter table experiences enable row level security;
alter table skills enable row level security;

-- experiences: public read (published only)
create policy "Public read published experiences"
  on experiences for select
  using (published = true);

-- skills: public read
create policy "Public read skills"
  on skills for select
  using (true);
