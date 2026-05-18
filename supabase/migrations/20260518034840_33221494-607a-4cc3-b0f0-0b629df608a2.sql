create schema if not exists app_private;

grant usage on schema app_private to authenticated;

create or replace function app_private.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

create or replace function app_private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select app_private.has_role(auth.uid(), 'admin')
$$;

create or replace function app_private.no_admin_exists()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select not exists (
    select 1
    from public.user_roles
    where role = 'admin'
  )
$$;

grant execute on function app_private.has_role(uuid, public.app_role) to authenticated;
grant execute on function app_private.is_admin() to authenticated;
grant execute on function app_private.no_admin_exists() to authenticated;

alter policy "admins all banners" on public.banners
  using (app_private.is_admin())
  with check (app_private.is_admin());

alter policy "admins all posts" on public.blog_posts
  using (app_private.is_admin())
  with check (app_private.is_admin());

alter policy "admins all faqs" on public.faqs
  using (app_private.is_admin())
  with check (app_private.is_admin());

alter policy "admins all sections" on public.sections
  using (app_private.is_admin())
  with check (app_private.is_admin());

alter policy "admins read all services" on public.services
  using (app_private.is_admin());

alter policy "admins write services" on public.services
  using (app_private.is_admin())
  with check (app_private.is_admin());

alter policy "admins write site_settings" on public.site_settings
  using (app_private.is_admin())
  with check (app_private.is_admin());

alter policy "admins write social" on public.social_links
  using (app_private.is_admin())
  with check (app_private.is_admin());

alter policy "admins all team" on public.team_members
  using (app_private.is_admin())
  with check (app_private.is_admin());

alter policy "admins all testimonials" on public.testimonials
  using (app_private.is_admin())
  with check (app_private.is_admin());

alter policy "admins manage roles" on public.user_roles
  using (app_private.is_admin())
  with check (app_private.is_admin());

alter policy "admins read all roles" on public.user_roles
  using (app_private.is_admin());

create unique index if not exists user_roles_user_id_role_key
  on public.user_roles (user_id, role);

drop policy if exists "first user can claim admin" on public.user_roles;
create policy "first user can claim admin"
on public.user_roles
for insert
to authenticated
with check (
  user_id = auth.uid()
  and role = 'admin'
  and app_private.no_admin_exists()
);

create or replace function public.claim_first_admin()
returns void
language plpgsql
security invoker
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'Must be authenticated';
  end if;

  insert into public.user_roles (user_id, role)
  values (auth.uid(), 'admin');
end;
$$;

revoke execute on function public.has_role(uuid, public.app_role) from public, anon, authenticated;
revoke execute on function public.is_admin() from public, anon, authenticated;
grant execute on function public.claim_first_admin() to authenticated;