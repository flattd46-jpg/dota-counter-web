-- Counter Web: cloud draft sync for Supabase
-- Run this once in Supabase Dashboard -> SQL Editor -> New query -> Run

create table if not exists public.user_drafts (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_drafts enable row level security;

create policy "user_drafts_select_own" on public.user_drafts
  for select to authenticated
  using (auth.uid() = user_id);

create policy "user_drafts_insert_own" on public.user_drafts
  for insert to authenticated
  with check (auth.uid() = user_id);

create policy "user_drafts_update_own" on public.user_drafts
  for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "user_drafts_delete_own" on public.user_drafts
  for delete to authenticated
  using (auth.uid() = user_id);
