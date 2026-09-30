create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  article_slug text not null,
  article_title text not null,
  article_url text not null,
  article_excerpt text,
  created_at timestamptz not null default pg_catalog.now(),
  constraint bookmarks_user_article_key unique (user_id, article_slug)
);

create index if not exists bookmarks_user_created_at_idx
  on public.bookmarks (user_id, created_at desc);

alter table public.bookmarks enable row level security;
revoke all on public.bookmarks from anon, authenticated;
grant select, insert, delete on public.bookmarks to authenticated;

drop policy if exists "Users can read their own bookmarks" on public.bookmarks;
create policy "Users can read their own bookmarks"
  on public.bookmarks for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can create their own bookmarks" on public.bookmarks;
create policy "Users can create their own bookmarks"
  on public.bookmarks for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can remove their own bookmarks" on public.bookmarks;
create policy "Users can remove their own bookmarks"
  on public.bookmarks for delete to authenticated
  using ((select auth.uid()) = user_id);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  article_slug text not null,
  article_title text not null,
  content text not null check (char_length(pg_catalog.btrim(content)) between 1 and 5000),
  created_at timestamptz not null default pg_catalog.now()
);

create index if not exists comments_article_created_at_idx
  on public.comments (article_slug, created_at desc);
create index if not exists comments_user_created_at_idx
  on public.comments (user_id, created_at desc);

alter table public.comments enable row level security;
revoke all on public.comments from anon, authenticated;
grant select (id, article_slug, article_title, content, created_at) on public.comments to anon;
grant select (id, user_id, article_slug, article_title, content, created_at) on public.comments to authenticated;
grant delete on public.comments to authenticated;
grant insert (user_id, article_slug, content) on public.comments to authenticated;

drop policy if exists "Anyone can read article comments" on public.comments;
create policy "Anyone can read article comments"
  on public.comments for select to anon, authenticated
  using (true);

drop policy if exists "Authenticated users can comment as themselves" on public.comments;
create policy "Authenticated users can comment as themselves"
  on public.comments for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete their own comments" on public.comments;
create policy "Users can delete their own comments"
  on public.comments for delete to authenticated
  using ((select auth.uid()) = user_id);