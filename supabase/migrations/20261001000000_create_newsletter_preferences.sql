create table if not exists public.newsletter_preferences (
  user_id uuid primary key references auth.users (id) on delete cascade,
  free_briefing boolean not null default false,
  premium_briefing boolean not null default false,
  updated_at timestamptz not null default pg_catalog.now()
);

alter table public.newsletter_preferences enable row level security;
revoke all on public.newsletter_preferences from anon, authenticated;
grant select, insert, update on public.newsletter_preferences to authenticated;

drop policy if exists "Users can read their own newsletter preferences"
  on public.newsletter_preferences;
create policy "Users can read their own newsletter preferences"
  on public.newsletter_preferences
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can create their own newsletter preferences"
  on public.newsletter_preferences;
create policy "Users can create their own newsletter preferences"
  on public.newsletter_preferences
  for insert
  to authenticated
  with check (
    (select auth.uid()) = user_id
    and (
      not premium_briefing
      or exists (
        select 1
        from public.profiles
        where id = (select auth.uid())
          and (subscription_status <> 'free' or role = 'admin')
      )
    )
  );

drop policy if exists "Users can update their own newsletter preferences"
  on public.newsletter_preferences;
create policy "Users can update their own newsletter preferences"
  on public.newsletter_preferences
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check (
    (select auth.uid()) = user_id
    and (
      not premium_briefing
      or exists (
        select 1
        from public.profiles
        where id = (select auth.uid())
          and (subscription_status <> 'free' or role = 'admin')
      )
    )
  );