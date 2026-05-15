import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { Phone, Mail, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contato")({
  component: ContatoPage,
  head: () => ({
    meta: [
      { title: "Contato — Mente Clara" },
      { name: "description", content: "Fale com a Mente Clara. Tire dúvidas, agende sua primeira sessão por R$ 90 ou converse pelo WhatsApp." },
    ],
  }),
});

function ContatoPage() {
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", mensagem: "", aceito: false });
  const [erro, setErro] = useState<string | null>(null);

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.aceito) {
      setErro("Por favor, leia e aceite a política de sigilo.");
      return;
    }
    if (!form.nome.trim() || !form.email.trim() || !form.mensagem.trim()) {
      setErro("Preencha nome, e-mail e mensagem.");
      return;
    }
    setErro(null);
    const texto = `Olá, sou ${form.nome}.%0A${form.mensagem}%0A%0AContato: ${form.email} / ${form.telefone}`;
    window.open(`https://wa.me/5511400289220?text=${texto}`, "_blank");
  }

  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-accent">Vamos conversar</p>
            <h1 className="mt-3 font-serif text-4xl md:text-5xl">Estamos prontos pra te ouvir.</h1>
            <p className="mt-4 text-muted-foreground">
              Pode mandar mensagem, ligar ou chamar no WhatsApp. Quem responde é gente de verdade — e nada do que você compartilhar sai daqui.
            </p>

            <div className="mt-8 space-y-4">
              <a href="tel:+551140028922" className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary"><Phone className="h-5 w-5" /></div>
                <div>
                  <p className="text-xs text-muted-foreground">Telefone</p>
                  <p className="font-medium">(11) 4002-8922</p>
                </div>
              </a>
              <a href="https://wa.me/5511400289220" target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary"><MessageCircle className="h-5 w-5" /></div>
                <div>
                  <p className="text-xs text-muted-foreground">WhatsApp</p>
                  <p className="font-medium">(11) 94002-8922</p>
                </div>
              </a>
              <a href="mailto:contato@menteclara.com.br" className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary"><Mail className="h-5 w-5" /></div>
                <div>
                  <p className="text-xs text-muted-foreground">E-mail</p>
                  <p className="font-medium">contato@menteclara.com.br</p>
                </div>
              </a>
            </div>
          </div>

          <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-card p-7">
            <h2 className="font-serif text-2xl">Envie uma mensagem</h2>
            <p className="mt-1 text-sm text-muted-foreground">Respondemos em até 1 dia útil.</p>

            <div className="mt-6 space-y-4">
              <Field label="Seu nome">
                <input value={form.nome} onChange={(e) => update("nome", e.target.value)} maxLength={100}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="E-mail">
                  <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} maxLength={150}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
                </Field>
                <Field label="Telefone">
                  <input value={form.telefone} onChange={(e) => update("telefone", e.target.value)} maxLength={20}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
                </Field>
              </div>
              <Field label="Mensagem">
                <textarea value={form.mensagem} onChange={(e) => update("mensagem", e.target.value)} maxLength={1000} rows={5}
                  className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
              </Field>

              <label className="flex items-start gap-3 text-sm text-muted-foreground">
                <input type="checkbox" checked={form.aceito} onChange={(e) => update("aceito", e.target.checked)} className="mt-1 h-4 w-4 accent-[oklch(0.55_0.06_155)]" />
                Li e aceito a política de sigilo. Minhas informações são tratadas de forma confidencial.
              </label>

              {erro && <p className="text-sm text-destructive">{erro}</p>}

              <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90">
                Enviar pelo WhatsApp
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
