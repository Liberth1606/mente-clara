drop policy if exists "admins upload site-assets" on storage.objects;
drop policy if exists "admins update site-assets" on storage.objects;
drop policy if exists "admins delete site-assets" on storage.objects;
drop policy if exists "public read site-assets" on storage.objects;

create policy "admins upload site-assets"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'site-assets'
  and app_private.is_admin()
);

create policy "admins update site-assets"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'site-assets'
  and app_private.is_admin()
)
with check (
  bucket_id = 'site-assets'
  and app_private.is_admin()
);

create policy "admins delete site-assets"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'site-assets'
  and app_private.is_admin()
);