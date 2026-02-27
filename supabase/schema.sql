-- Run this in Supabase SQL Editor (Dashboard -> SQL Editor) after creating a project.

-- Recipes table
create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  ingredients jsonb not null default '[]'::jsonb,
  calories integer,
  created_at timestamptz not null default now()
);

-- Optional: allow all for anonymous access (no auth). Tighten with RLS when you add auth.
alter table public.recipes enable row level security;

create policy "Allow all for now"
  on public.recipes
  for all
  using (true)
  with check (true);

-- Example ingredient shape in jsonb: [{"name": "flour", "quantity": 200, "unit": "grams"}]
