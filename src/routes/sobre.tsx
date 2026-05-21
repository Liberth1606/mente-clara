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
  { icon: Heart, titulo: "Escuta cuidadosa", texto: "Atendemos cada pessoa em seu próprio ritmo, sem julgamentos ou roteiros prontos." },
  { icon: Lock, titulo: "Sigilo profissional", texto: "Todas as informações compartilhadas são protegidas pelo código de ética da psicologia." },
  { icon: Award, titulo: "Profissionais registrados", texto: "Equipe formada por psicólogos com inscrição ativa no Conselho Regional de Psicologia." },
  { icon: ShieldCheck, titulo: "Conduta ética", texto: "Trabalhamos dentro dos parâmetros técnicos e éticos da profissão, sem promessas de resultado." },
];

function SobrePage() {
  const { data: s } = useSiteSettings();
  return (
    <Layout>
      <section className="mx-auto max-w-4xl px-5 py-20">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Sobre a clínica</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">
          Um espaço dedicado à saúde mental, com seriedade e discrição.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          A {s?.company_name} oferece atendimento psicológico para adultos, com foco em quadros como ansiedade, estresse,
          dificuldades de relacionamento e momentos de transição. O acompanhamento é conduzido por profissionais com
          formação clínica e supervisão regular.
        </p>
      </section>

      <section className="border-y border-border/60 bg-muted/40 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="max-w-xl font-serif text-3xl md:text-4xl">Princípios de trabalho</h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
            {valores.map((v) => (
              <div key={v.titulo} className="bg-card p-7">
                <v.icon className="h-5 w-5 text-accent" />
                <h3 className="mt-5 font-serif text-lg">{v.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="font-serif text-3xl md:text-4xl">Ética e responsabilidade</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
          Seguimos as diretrizes do Conselho Federal de Psicologia e a Lei Geral de Proteção de Dados. As informações
          compartilhadas em consulta permanecem restritas à relação terapêutica.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          {["Inscrição CRP ativa", "Sigilo profissional", "LGPD", "Supervisão clínica"].map((t) => (
            <span key={t} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {t}
            </span>
          ))}
        </div>
      </section>
    </Layout>
  );
}
