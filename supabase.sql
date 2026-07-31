create table if not exists public.user_drafts (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.user_drafts enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'user_drafts' and policyname = 'user_drafts_select_own') then
    create policy "user_drafts_select_own" on public.user_drafts for select to authenticated using (auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'user_drafts' and policyname = 'user_drafts_insert_own') then
    create policy "user_drafts_insert_own" on public.user_drafts for insert to authenticated with check (auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'user_drafts' and policyname = 'user_drafts_update_own') then
    create policy "user_drafts_update_own" on public.user_drafts for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'user_drafts' and policyname = 'user_drafts_delete_own') then
    create policy "user_drafts_delete_own" on public.user_drafts for delete to authenticated using (auth.uid() = user_id);
  end if;
end $$;