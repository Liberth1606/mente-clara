import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth, useIsAdmin } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import {
  useSiteSettings, useUpdateSettings, useUpsert, useDelete,
  useServices, useTestimonials, useTeam, useBanners, useFaqs, useSocial, useBlogPosts,
} from "@/hooks/use-site-data";
import { toast, Toaster } from "sonner";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({ meta: [{ title: "Painel admin" }] }),
});

const TABS = ["Configurações", "Serviços", "Depoimentos", "Equipe", "Banners", "FAQs", "Redes sociais", "Blog"] as const;
type Tab = (typeof TABS)[number];

function AdminPage() {
  const nav = useNavigate();
  const { user, loading } = useAuth();
  const isAdmin = useIsAdmin();
  const [tab, setTab] = useState<Tab>("Configurações");

  useEffect(() => { if (!loading && !user) nav({ to: "/login" }); }, [loading, user, nav]);

  if (loading || (user && isAdmin.isLoading)) return <div className="grid min-h-screen place-items-center text-sm text-muted-foreground">Carregando…</div>;
  if (!user) return null;

  if (!isAdmin.data) return <ClaimAdmin />;

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <Toaster richColors position="top-right" />
      <header className="border-b border-border bg-card px-5 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="font-serif text-lg">Painel</Link>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
          <button onClick={() => supabase.auth.signOut().then(() => nav({ to: "/login" }))} className="rounded-full border border-border px-4 py-1.5 text-xs">Sair</button>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-5 py-6">
        <div className="flex flex-wrap gap-2 border-b border-border pb-3">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`rounded-full px-4 py-1.5 text-sm ${tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>{t}</button>
          ))}
        </div>

        <div className="py-6">
          {tab === "Configurações" && <SettingsPanel />}
          {tab === "Serviços" && <ResourcePanel resource="services" hook={useServices} fields={[
            { name: "title", label: "Título" }, { name: "description", label: "Descrição", textarea: true },
            { name: "price", label: "Preço" }, { name: "cta_label", label: "Texto do botão" },
            { name: "sort_order", label: "Ordem", type: "number" }, { name: "highlight", label: "Destaque", type: "boolean" }, { name: "active", label: "Ativo", type: "boolean" },
          ]} />}
          {tab === "Depoimentos" && <ResourcePanel resource="testimonials" hook={useTestimonials} fields={[
            { name: "name", label: "Nome" }, { name: "quote", label: "Depoimento", textarea: true },
            { name: "photo_url", label: "Foto (URL)" }, { name: "sort_order", label: "Ordem", type: "number" }, { name: "active", label: "Ativo", type: "boolean" },
          ]} />}
          {tab === "Equipe" && <ResourcePanel resource="team_members" hook={useTeam} fields={[
            { name: "name", label: "Nome" }, { name: "credential", label: "Registro" },
            { name: "specialty", label: "Especialidade" }, { name: "approach", label: "Abordagem" },
            { name: "photo_url", label: "Foto (URL)" }, { name: "sort_order", label: "Ordem", type: "number" }, { name: "active", label: "Ativo", type: "boolean" },
          ]} />}
          {tab === "Banners" && <ResourcePanel resource="banners" hook={useBanners} fields={[
            { name: "title", label: "Título" }, { name: "subtitle", label: "Subtítulo" },
            { name: "image_url", label: "Imagem (URL)" }, { name: "link_url", label: "Link" },
            { name: "sort_order", label: "Ordem", type: "number" }, { name: "active", label: "Ativo", type: "boolean" },
          ]} />}
          {tab === "FAQs" && <ResourcePanel resource="faqs" hook={useFaqs} fields={[
            { name: "question", label: "Pergunta" }, { name: "answer", label: "Resposta", textarea: true },
            { name: "sort_order", label: "Ordem", type: "number" }, { name: "active", label: "Ativo", type: "boolean" },
          ]} />}
          {tab === "Redes sociais" && <ResourcePanel resource="social_links" hook={useSocial} fields={[
            { name: "platform", label: "Plataforma" }, { name: "url", label: "URL" },
            { name: "sort_order", label: "Ordem", type: "number" }, { name: "active", label: "Ativo", type: "boolean" },
          ]} />}
          {tab === "Blog" && <ResourcePanel resource="blog_posts" hook={useBlogPosts} fields={[
            { name: "slug", label: "Slug" }, { name: "title", label: "Título" },
            { name: "excerpt", label: "Resumo", textarea: true }, { name: "cover_url", label: "Capa (URL)" },
            { name: "content", label: "Conteúdo", textarea: true }, { name: "published", label: "Publicado", type: "boolean" },
          ]} />}
        </div>
      </div>
    </div>
  );
}

function ClaimAdmin() {
  const [busy, setBusy] = useState(false);
  const isAdmin = useIsAdmin();
  async function claim() {
    setBusy(true);
    const { error } = await supabase.rpc("claim_first_admin");
    setBusy(false);
    if (error) toast.error(error.message);
    else { toast.success("Você agora é admin"); isAdmin.refetch(); }
  }
  return (
    <div className="grid min-h-screen place-items-center px-5">
      <div className="max-w-md rounded-2xl border border-border bg-card p-8 text-center">
        <h1 className="font-serif text-2xl">Acesso restrito</h1>
        <p className="mt-2 text-sm text-muted-foreground">Sua conta ainda não tem permissão de administrador.</p>
        <p className="mt-4 text-xs text-muted-foreground">Se este é o primeiro acesso ao sistema, você pode reivindicar o papel de admin agora:</p>
        <button onClick={claim} disabled={busy} className="mt-4 rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground disabled:opacity-50">
          {busy ? "..." : "Reivindicar admin"}
        </button>
      </div>
    </div>
  );
}

function SettingsPanel() {
  const { data } = useSiteSettings();
  const update = useUpdateSettings();
  const [form, setForm] = useState(data);
  useEffect(() => setForm(data), [data]);
  if (!form) return <p className="text-sm text-muted-foreground">Carregando…</p>;

  const upd = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm({ ...form, [k]: v });
  const save = async () => {
    await update.mutateAsync(form);
    toast.success("Configurações salvas");
  };

  const fields: { k: keyof typeof form; label: string; type?: string }[] = [
    { k: "company_name", label: "Nome da empresa" },
    { k: "tagline", label: "Subtítulo / Slogan" },
    { k: "logo_url", label: "Logo (URL)" },
    { k: "favicon_url", label: "Favicon (URL)" },
    { k: "phone", label: "Telefone" },
    { k: "whatsapp", label: "WhatsApp (somente números, com DDI)" },
    { k: "whatsapp_message", label: "Mensagem padrão do WhatsApp" },
    { k: "email", label: "E-mail" },
    { k: "address", label: "Endereço / Localização" },
    { k: "business_hours", label: "Horário de funcionamento" },
    { k: "cta_label", label: "Texto do botão principal" },
    { k: "seo_title", label: "Título da aba (SEO)" },
    { k: "seo_description", label: "Descrição SEO" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {fields.map(({ k, label }) => (
          <label key={k} className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</span>
            <input value={(form[k] as string) ?? ""} onChange={(e) => upd(k, e.target.value as never)} className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
          </label>
        ))}
      </div>

      <div>
        <h3 className="font-serif text-lg">Cores do tema</h3>
        <div className="mt-3 grid gap-4 sm:grid-cols-4">
          {(["primary_color", "accent_color", "background_color", "foreground_color"] as const).map((k) => (
            <label key={k} className="block">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.replace("_color", "")}</span>
              <div className="flex items-center gap-2">
                <input type="color" value={form[k] ?? "#000000"} onChange={(e) => upd(k, e.target.value)} className="h-10 w-12 rounded border border-input" />
                <input value={form[k] ?? ""} onChange={(e) => upd(k, e.target.value)} className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" />
              </div>
            </label>
          ))}
        </div>
      </div>

      <button onClick={save} disabled={update.isPending} className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60">
        {update.isPending ? "Salvando…" : "Salvar"}
      </button>
    </div>
  );
}

type Field = { name: string; label: string; textarea?: boolean; type?: "number" | "boolean" | "text" };

function ResourcePanel<T extends { id: string }>({ resource, hook, fields }: {
  resource: string; hook: () => { data?: T[]; refetch: () => void }; fields: Field[];
}) {
  const { data: rows = [] } = hook();
  const upsert = useUpsert(resource);
  const del = useDelete(resource);
  const [editing, setEditing] = useState<Partial<T> | null>(null);

  const empty = Object.fromEntries(fields.map((f) => [f.name, f.type === "boolean" ? true : f.type === "number" ? 0 : ""])) as Partial<T>;

  async function save() {
    if (!editing) return;
    try {
      await upsert.mutateAsync(editing as Record<string, unknown>);
      toast.success("Salvo");
      setEditing(null);
    } catch (e) { toast.error(e instanceof Error ? e.message : "Erro"); }
  }
  async function remove(id: string) {
    if (!confirm("Excluir?")) return;
    try { await del.mutateAsync(id); toast.success("Excluído"); } catch (e) { toast.error(e instanceof Error ? e.message : "Erro"); }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-serif text-xl capitalize">{resource.replace("_", " ")}</h2>
        <button onClick={() => setEditing(empty)} className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground">+ Novo</button>
      </div>

      <div className="space-y-2">
        {rows.map((row) => {
          const r = row as Record<string, unknown>;
          const label = (r.title ?? r.name ?? r.question ?? r.platform ?? r.slug ?? r.id) as string;
          return (
            <div key={row.id} className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
              <span className="truncate text-sm">{label}</span>
              <div className="flex gap-2">
                <button onClick={() => setEditing(row)} className="text-xs text-primary">Editar</button>
                <button onClick={() => remove(row.id)} className="text-xs text-destructive">Excluir</button>
              </div>
            </div>
          );
        })}
        {rows.length === 0 && <p className="text-sm text-muted-foreground">Nenhum item ainda.</p>}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-5" onClick={() => setEditing(null)}>
          <div onClick={(e) => e.stopPropagation()} className="max-h-[90vh] w-full max-w-lg overflow-auto rounded-2xl bg-card p-6 shadow-xl">
            <h3 className="font-serif text-lg">{(editing as { id?: string }).id ? "Editar" : "Novo"}</h3>
            <div className="mt-4 space-y-3">
              {fields.map((f) => {
                const v = (editing as Record<string, unknown>)[f.name];
                const set = (val: unknown) => setEditing({ ...editing, [f.name]: val } as Partial<T>);
                if (f.type === "boolean") return (
                  <label key={f.name} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={!!v} onChange={(e) => set(e.target.checked)} />{f.label}
                  </label>
                );
                if (f.textarea) return (
                  <label key={f.name} className="block">
                    <span className="mb-1 block text-xs uppercase text-muted-foreground">{f.label}</span>
                    <textarea rows={4} value={(v as string) ?? ""} onChange={(e) => set(e.target.value)} className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" />
                  </label>
                );
                return (
                  <label key={f.name} className="block">
                    <span className="mb-1 block text-xs uppercase text-muted-foreground">{f.label}</span>
                    <input type={f.type === "number" ? "number" : "text"} value={(v as string | number) ?? ""}
                      onChange={(e) => set(f.type === "number" ? Number(e.target.value) : e.target.value)}
                      className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" />
                  </label>
                );
              })}
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="rounded-full border border-border px-4 py-2 text-sm">Cancelar</button>
              <button onClick={save} disabled={upsert.isPending} className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground">Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
