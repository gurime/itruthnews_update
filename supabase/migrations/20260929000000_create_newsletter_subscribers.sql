create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default pg_catalog.now()
);

create unique index if not exists newsletter_subscribers_email_lower_key
  on public.newsletter_subscribers (pg_catalog.lower(email));

alter table public.newsletter_subscribers enable row level security;

grant insert (email) on public.newsletter_subscribers to anon, authenticated;

drop policy if exists "Public can subscribe to newsletter"
  on public.newsletter_subscribers;
create policy "Public can subscribe to newsletter"
  on public.newsletter_subscribers
  for insert
  to anon, authenticated
  with check (email = pg_catalog.lower(pg_catalog.btrim(email)));