
-- =====================
-- ROLES
-- =====================
create type public.app_role as enum ('admin', 'editor');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select public.has_role(auth.uid(), 'admin') $$;

-- Anyone authenticated may read their own roles; only admins can manage
create policy "users can read own roles" on public.user_roles
  for select to authenticated using (user_id = auth.uid());
create policy "admins read all roles" on public.user_roles
  for select to authenticated using (public.is_admin());
create policy "admins manage roles" on public.user_roles
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Bootstrap: allow the very first signup to claim admin via RPC below
create or replace function public.claim_first_admin()
returns void language plpgsql security definer set search_path = public
as $$
begin
  if (select count(*) from public.user_roles where role = 'admin') > 0 then
    raise exception 'Admin already exists';
  end if;
  if auth.uid() is null then
    raise exception 'Must be authenticated';
  end if;
  insert into public.user_roles (user_id, role) values (auth.uid(), 'admin');
end;
$$;

-- =====================
-- updated_at trigger
-- =====================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

-- =====================
-- SITE SETTINGS (singleton)
-- =====================
create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  singleton boolean not null default true unique,
  company_name text not null default 'Mente Clara',
  tagline text,
  logo_url text,
  favicon_url text,
  primary_color text not null default '#6b8e6b',
  accent_color text not null default '#c85a3a',
  background_color text not null default '#faf8f5',
  foreground_color text not null default '#2d2d2d',
  phone text,
  whatsapp text,
  whatsapp_message text default 'Olá, gostaria de saber mais.',
  email text,
  address text,
  business_hours text,
  cta_label text default 'Agendar sessão',
  seo_title text,
  seo_description text,
  updated_at timestamptz not null default now()
);
alter table public.site_settings enable row level security;
create trigger trg_site_settings_updated before update on public.site_settings
  for each row execute function public.set_updated_at();

create policy "public read site_settings" on public.site_settings for select using (true);
create policy "admins write site_settings" on public.site_settings
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- =====================
-- Generic content tables
-- =====================
create table public.social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  url text not null,
  icon text,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.social_links enable row level security;
create policy "public read social" on public.social_links for select using (true);
create policy "admins write social" on public.social_links for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create table public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  price text,
  highlight boolean not null default false,
  cta_label text,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.services enable row level security;
create trigger trg_services_updated before update on public.services for each row execute function public.set_updated_at();
create policy "public read services" on public.services for select using (active = true);
create policy "admins read all services" on public.services for select to authenticated using (public.is_admin());
create policy "admins write services" on public.services for all to authenticated using (public.is_admin()) with check (public.is_admin());

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  quote text not null,
  photo_url text,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.testimonials enable row level security;
create policy "public read testimonials" on public.testimonials for select using (active = true);
create policy "admins all testimonials" on public.testimonials for all to authenticated using (public.is_admin()) with check (public.is_admin());

create table public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  credential text,
  specialty text,
  approach text,
  bio text,
  photo_url text,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.team_members enable row level security;
create policy "public read team" on public.team_members for select using (active = true);
create policy "admins all team" on public.team_members for all to authenticated using (public.is_admin()) with check (public.is_admin());

create table public.banners (
  id uuid primary key default gen_random_uuid(),
  title text,
  subtitle text,
  image_url text,
  link_url text,
  link_label text,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.banners enable row level security;
create policy "public read banners" on public.banners for select using (active = true);
create policy "admins all banners" on public.banners for all to authenticated using (public.is_admin()) with check (public.is_admin());

create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.faqs enable row level security;
create policy "public read faqs" on public.faqs for select using (active = true);
create policy "admins all faqs" on public.faqs for all to authenticated using (public.is_admin()) with check (public.is_admin());

create table public.sections (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  eyebrow text,
  title text,
  subtitle text,
  body text,
  image_url text,
  cta_label text,
  cta_url text,
  updated_at timestamptz not null default now()
);
alter table public.sections enable row level security;
create trigger trg_sections_updated before update on public.sections for each row execute function public.set_updated_at();
create policy "public read sections" on public.sections for select using (true);
create policy "admins all sections" on public.sections for all to authenticated using (public.is_admin()) with check (public.is_admin());

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  cover_url text,
  content text,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.blog_posts enable row level security;
create trigger trg_blog_updated before update on public.blog_posts for each row execute function public.set_updated_at();
create policy "public read published posts" on public.blog_posts for select using (published = true);
create policy "admins all posts" on public.blog_posts for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- =====================
-- STORAGE BUCKET
-- =====================
insert into storage.buckets (id, name, public) values ('site-assets','site-assets', true)
on conflict (id) do nothing;

create policy "public read site-assets" on storage.objects for select using (bucket_id = 'site-assets');
create policy "admins upload site-assets" on storage.objects for insert to authenticated
  with check (bucket_id = 'site-assets' and public.is_admin());
create policy "admins update site-assets" on storage.objects for update to authenticated
  using (bucket_id = 'site-assets' and public.is_admin());
create policy "admins delete site-assets" on storage.objects for delete to authenticated
  using (bucket_id = 'site-assets' and public.is_admin());

-- =====================
-- SEED
-- =====================
insert into public.site_settings (company_name, tagline, phone, whatsapp, whatsapp_message, email, address, business_hours, cta_label, seo_title, seo_description)
values (
  'Mente Clara',
  'Psicologia online acolhedora e sigilosa',
  '(11) 4002-8922',
  '5511400289220',
  'Olá, gostaria de saber mais sobre a Mente Clara',
  'contato@menteclara.com.br',
  'Atendimento 100% online',
  'Seg a Sex 8h-21h · Sáb 9h-14h',
  'Agendar sessão',
  'Mente Clara — Psicologia online acolhedora e sigilosa',
  'Cuidar da sua mente não é fraqueza. É coragem. Atendimento psicológico online com profissionais especializados.'
);

insert into public.sections (key, eyebrow, title, subtitle, body) values
  ('hero','Atendimento 100% online','Cuidar da sua mente não é fraqueza. É coragem.','Atendimento psicológico online com profissionais especializados. Totalmente sigiloso, de qualquer lugar.', null),
  ('about','Quem somos','Mente Clara','Uma clínica online comprometida com ética, sigilo e vínculo terapêutico.','Acreditamos que cuidar da saúde mental deve ser acessível, acolhedor e livre de julgamento.');

insert into public.services (title, description, price, highlight, cta_label, sort_order) values
  ('Sessão avulsa','Pagamento por sessão, sem compromisso.','R$ 120', false, 'Marcar uma sessão', 1),
  ('Pacote 4 sessões','Economize R$ 80 — ideal para um primeiro mês.','R$ 400', true, 'Começar pacote', 2),
  ('Pacote 8 sessões','Economize R$ 200 — para um cuidado consistente.','R$ 760', false, 'Começar pacote', 3),
  ('Primeira sessão','Experimente antes de decidir qualquer coisa.','R$ 90', false, 'Quero começar', 0);

insert into public.testimonials (name, quote, sort_order) values
  ('Carla, 34','Demorei dois anos pra dar o primeiro passo. Hoje queria ter feito antes.', 1),
  ('Felipe, 41','Achava que terapia era pra quem estava muito mal. Descobri que é justamente pra não chegar nesse ponto.', 2),
  ('Ana, 27','O sigilo me deu coragem pra falar coisas que nunca tinha dito em voz alta.', 3);

insert into public.team_members (name, credential, specialty, approach, sort_order) values
  ('Dra. Mariana Alves','CRP 06/123456','Ansiedade e Burnout','Terapia Cognitivo-Comportamental', 1),
  ('Dr. Rafael Soares','CRP 06/789012','Depressão e Luto','Psicanálise contemporânea', 2),
  ('Dra. Juliana Pires','CRP 06/345678','Autoestima e Relacionamentos','Terapia Humanista', 3);

insert into public.faqs (question, answer, sort_order) values
  ('E se eu não souber o que falar?','Esse é o pensamento mais comum nas primeiras sessões. Seu psicólogo vai conduzir a conversa com perguntas suaves.', 1),
  ('É realmente sigiloso?','Sim. Todos os profissionais seguem o Código de Ética do CRP.', 2),
  ('Funciona mesmo online?','Estudos mostram eficácia equivalente ao presencial para a maioria dos casos.', 3),
  ('Quanto tempo dura o tratamento?','Depende de você. Alguns processos levam semanas, outros meses.', 4),
  ('E se não gostar do profissional?','Sem problema. Você pode trocar quantas vezes precisar.', 5);

insert into public.banners (title, subtitle, sort_order) values
  ('Sinais de que você precisa de ajuda','Nem todo sofrimento grita. Às vezes ele aparece de mansinho.', 1);

insert into public.social_links (platform, url, sort_order) values
  ('instagram','https://instagram.com/menteclara', 1),
  ('facebook','https://facebook.com/menteclara', 2);

insert into public.blog_posts (slug, title, excerpt, content, published, published_at) values
  ('burnout-sinais','Burnout: 7 sinais que você não pode ignorar','Reconhecer cedo faz toda a diferença.','Conteúdo do post...', true, now()),
  ('ansiedade-respiracao','Ansiedade: técnicas de respiração que funcionam','Métodos validados clinicamente.','Conteúdo do post...', true, now()),
  ('primeira-terapia','Primeira terapia: o que esperar?','Tirando o medo do desconhecido.','Conteúdo do post...', true, now());
