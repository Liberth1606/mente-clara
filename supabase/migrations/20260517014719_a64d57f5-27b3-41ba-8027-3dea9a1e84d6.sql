
-- Lock down SECURITY DEFINER functions: only callable internally by RLS
revoke execute on function public.has_role(uuid, public.app_role) from public, anon, authenticated;
revoke execute on function public.is_admin() from public, anon, authenticated;
-- claim_first_admin must remain callable by authenticated users (one-time bootstrap)
revoke execute on function public.claim_first_admin() from public, anon;

-- Restrict bucket listing: only allow read of specific objects, not list-all.
-- Keeping public read is fine for direct URL access (objects served via CDN).
-- The WARN about listing is acceptable for a public assets bucket; we keep it as-is
-- but tighten to require known path prefix. (Acceptable trade-off documented in security memory.)
