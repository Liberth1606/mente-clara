import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ShieldCheck, Heart, Lock, Award } from "lucide-react";
import { useSiteSettings } from "@/hooks/use-site-data";

export const Route = createFileRoute("/sobre")({
  component: SobrePage,
  head: () => ({
    meta: [
      { title: "Sobre nós" },
      { name: "description", content: "Nossa história, missão e compromisso." },
    ],
  }),
});

const valores = [
  { icon: Heart, titulo: "Acolhimento sem julgamento", texto: "Você chega como está. Aqui ninguém precisa parecer “bem” pra ser ouvido." },
  { icon: Lock, titulo: "Sigilo absoluto", texto: "Tudo é protegido por código de ética e plataforma criptografada." },
  { icon: Award, titulo: "Excelência clínica", texto: "Profissionais com formação contínua e supervisão clínica regular." },
  { icon: ShieldCheck, titulo: "Ética antes de tudo", texto: "Cuidado se mede em vínculo, não em pacotes." },
];

function SobrePage() {
  const { data: s } = useSiteSettings();
  return (
    <Layout>
      <section className="mx-auto max-w-4xl px-5 py-20">
        <p className="text-sm font-medium uppercase tracking-widest text-accent">Sobre {s?.company_name}</p>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl">A clínica que queríamos ter encontrado.</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          {s?.company_name} nasceu da inquietação de quem enxergava pessoas adiando ajuda por medo, vergonha ou falta de acesso.
          Criamos um espaço onde o primeiro contato pesa menos, o profissional certo está a poucos cliques e o sigilo é regra.
        </p>
      </section>

      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="max-w-xl font-serif text-3xl md:text-4xl">Missão e valores</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {valores.map((v) => (
              <div key={v.titulo} className="rounded-2xl border border-border bg-card p-6">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-serif text-xl">{v.titulo}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="font-serif text-3xl md:text-4xl">Compromisso com a ética</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Auditamos processos, exigimos supervisão e garantimos que nenhuma informação saia da relação terapêutica.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          {["Ética e Sigilo", "LGPD compliant", "Plataforma criptografada", "Supervisão clínica"].map((t) => (
            <span key={t} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-primary" /> {t}
            </span>
          ))}
        </div>
      </section>
    </Layout>
  );
}
