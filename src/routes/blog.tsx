import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
  head: () => ({
    meta: [
      { title: "Blog — Mente Clara" },
      { name: "description", content: "Conteúdos cuidadosos sobre saúde mental, ansiedade, burnout e bem-estar emocional." },
    ],
  }),
});

const posts = [
  {
    img: blog1, tag: "Burnout",
    titulo: "5 sinais que seu burnout está avançado",
    resumo: "Cansaço que o fim de semana não cura, irritabilidade nas pequenas coisas, desconexão do trabalho. Reconhecer cedo é metade do tratamento.",
    leitura: "6 min",
  },
  {
    img: blog2, tag: "Ansiedade",
    titulo: "Ansiedade: quando a preocupação vira doença",
    resumo: "Existe um ponto em que a antecipação deixa de proteger e começa a paralisar. Entenda os sinais que separam o normal do clínico.",
    leitura: "5 min",
  },
  {
    img: blog3, tag: "Vínculos",
    titulo: "Como convencer alguém a fazer terapia",
    resumo: "O caminho passa menos por argumento e mais por presença. Algumas frases ajudam — outras afastam. Veja como começar a conversa.",
    leitura: "4 min",
  },
];

function BlogPage() {
  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="text-sm font-medium uppercase tracking-widest text-accent">Blog Mente Clara</p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl md:text-5xl">Conteúdo que cuida antes da consulta começar.</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Textos escritos pela nossa equipe clínica, em linguagem simples e sem julgamento. Pra você se entender melhor — no seu tempo.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <article key={p.titulo} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="aspect-[16/11] overflow-hidden bg-muted">
                <img src={p.img} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="rounded-full bg-sage-soft px-3 py-1 text-primary">{p.tag}</span>
                  <span>{p.leitura} de leitura</span>
                </div>
                <h2 className="mt-4 font-serif text-2xl leading-tight">{p.titulo}</h2>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.resumo}</p>
                <Link to="/contato" className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  Ler artigo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
