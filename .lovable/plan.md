# Template White-Label com Painel Admin

Vou transformar o site atual em um template reutilizável onde **todo o conteúdo** vem do banco de dados (Lovable Cloud / Supabase), e um painel admin permite editar tudo sem tocar no código.

## 1. Ativar Lovable Cloud

Habilito o backend integrado (Postgres + Auth + Storage). Sem ele não há onde guardar os dados nem autenticação do admin.

## 2. Modelo de dados (tabelas)

- **site_settings** (singleton, 1 linha) — nome da empresa, logo (url), cores primárias (3-4 tokens em HEX/OKLCH), telefone, whatsapp, mensagem padrão do WhatsApp, e-mail, endereço, horários, CTA principal
- **social_links** — plataforma, url, ordem
- **sections** — chave (`hero`, `sinais`, `como_funciona`, `precos`, `faq_intro` etc.), título, subtítulo, corpo, imagem
- **services** — título, descrição, preço, destaque, ordem
- **testimonials** — nome, texto, foto, ordem
- **team_members** — nome, registro/credencial, especialidade, abordagem, foto, ordem
- **banners** — título, subtítulo, imagem, link, ativo, ordem
- **faqs** — pergunta, resposta, ordem
- **blog_posts** — slug, título, resumo, capa, conteúdo, publicado_em
- **user_roles** + enum `app_role` (`admin`, `editor`) — controle de acesso correto, separado de profiles
- **Storage bucket** `site-assets` — upload público de imagens (logo, fotos, banners)

**RLS:**
- Leitura pública (anon) em todas as tabelas de conteúdo
- Escrita só para quem tem role `admin` (via função `has_role` security definer)
- `user_roles` protegida — usuário só lê suas próprias roles, escrita só admin

## 3. Estrutura de pastas (reorganização)

```
src/
  components/
    ui/                     (shadcn — mantém)
    layout/                 Header, Footer, WhatsAppFloat (lendo do hook)
    sections/               HeroSection, ServicesSection, TestimonialsSection… (recebem dados via props)
    admin/                  AdminLayout, AdminSidebar, editores
  hooks/
    use-site-settings.ts    React Query do singleton
    use-services.ts, use-testimonials.ts, use-team.ts, use-faqs.ts, use-banners.ts
    use-auth.ts             sessão Supabase
    use-is-admin.ts         checa role
  lib/
    supabase queries
  integrations/supabase/    (gerado — não editar)
  routes/
    index.tsx, sobre.tsx, blog.tsx, contato.tsx   (consomem hooks)
    login.tsx                                      auth
    _admin.tsx                                     layout protegido (beforeLoad: admin?)
    _admin/index.tsx                               dashboard
    _admin/settings.tsx                            dados da empresa + cores
    _admin/services.tsx, testimonials.tsx, team.tsx, faqs.tsx, banners.tsx, blog.tsx, social.tsx
  styles.css                tokens lidos de CSS variables dinâmicas
```

## 4. Tema dinâmico

Um componente `<ThemeProvider>` no `__root.tsx` lê `site_settings.colors` e injeta `--primary`, `--accent`, `--background`, etc. como CSS variables no `<html>` em tempo real. Tudo em **OKLCH** continua válido — só aceitamos HEX no input do admin e convertemos.

## 5. Painel admin (`/admin/*`)

- Login em `/login` (email + senha)
- Rota `_admin` protegida com `beforeLoad` que checa sessão **e** role `admin`
- Layout próprio com sidebar responsiva
- Cada seção é um CRUD simples usando shadcn (Form, Input, Textarea, Table, Dialog)
- Upload de imagens direto pro bucket `site-assets`
- Color picker para as cores primárias
- Mudanças refletem no site público imediatamente (invalidação React Query)

## 6. WhatsApp dinâmico

`WhatsAppFloat` lê número + mensagem padrão de `site_settings`. Mesmo para todos os CTAs "Agendar sessão" do site público.

## 7. SEO, acessibilidade, performance

- `head()` por rota usando dados do `site_settings` (título da empresa, descrição)
- `alt` em todas as imagens dinâmicas
- Lazy loading mantido
- React Query com `staleTime` agressivo (dados mudam pouco)

## 8. Seed inicial

Faço seed com os dados atuais da "Mente Clara" (textos, profissionais fictícios, depoimentos) — assim o site continua igual ao atual no primeiro carregamento, mas tudo editável.

## 9. Primeiro admin

Após ativar Cloud, te explico como criar a primeira conta admin (signup pelo `/login` + um insert manual em `user_roles` que eu deixo documentado, ou um botão "promover a admin" só funcional enquanto não houver nenhum admin no sistema).

## Detalhes técnicos

- **TanStack Start** com `createServerFn` só onde precisar de service role (ex: promover primeiro admin). Leituras públicas vão direto via cliente browser do Supabase com RLS.
- **React Query** para cache e invalidação.
- **Migrações SQL** versionadas para criar enum, tabelas, RLS, função `has_role`, trigger de updated_at, bucket de storage.
- **Sem dados hardcoded** restantes nos componentes públicos após a refatoração.

Posso prosseguir? Vou começar ativando o Cloud e criando o schema; o trabalho é extenso (várias migrações + ~20 arquivos novos) mas entrego em uma passada estruturada.
