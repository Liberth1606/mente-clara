import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ArrowRight } from "lucide-react";
import { useBlogPosts } from "@/hooks/use-site-data";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
  head: () => ({ meta: [{ title: "Blog" }] }),
});

function BlogPage() {
  const { data: posts = [] } = useBlogPosts();
  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="text-sm font-medium uppercase tracking-widest text-accent">Blog</p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl md:text-5xl">Conteúdo que cuida antes da consulta começar.</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">Textos em linguagem simples e sem julgamento — pra você se entender melhor, no seu tempo.</p>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.filter((p) => p.published).map((p) => (
            <article key={p.id} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-md">
              {p.cover_url && (
                <div className="aspect-[16/11] overflow-hidden bg-muted">
                  <img src={p.cover_url} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-serif text-2xl leading-tight">{p.title}</h2>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
                <Link to="/contato" className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  Ler artigo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
          {posts.length === 0 && <p className="text-sm text-muted-foreground">Nenhum post publicado ainda.</p>}
        </div>
      </section>
    </Layout>
  );
}
