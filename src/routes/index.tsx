import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import heroImg from "@/assets/hero.jpg";
import { ArrowRight, ShieldCheck, Calendar, Video, Users } from "lucide-react";
import { useState } from "react";
import { useSiteSettings, useServices, useTestimonials, useTeam, useFaqs, useBanners } from "@/hooks/use-site-data";

export const Route = createFileRoute("/")({
  component: Index,
});

const sinais = [
  { titulo: "Você acorda já cansado?", texto: "Aquela exaustão que o sono não resolve costuma ter outro nome." },
  { titulo: "Pensamentos não param à noite?", texto: "A mente acelerada na hora de dormir não é normal — e tem solução." },
  { titulo: "Perdeu prazer em coisas que amava?", texto: "Quando o que era bom vira “tanto faz”, é hora de olhar pra dentro." },
  { titulo: "Sente que vai explodir por qualquer coisa?", texto: "A irritabilidade constante é um sinal — não um defeito seu." },
];

const passos = [
  { icon: Users, titulo: "Escolha o profissional", texto: "Veja perfis, abordagem e especialidade no nosso site." },
  { icon: Calendar, titulo: "Agende online", texto: "Em menos de 5 minutos você marca o melhor horário." },
  { icon: Video, titulo: "Sessão por vídeo", texto: "50 minutos no conforto e privacidade do seu espaço." },
  { icon: ShieldCheck, titulo: "Sigilo absoluto", texto: "Tudo o que você compartilha é protegido pelo CRP." },
];

function Index() {
  const { data: settings } = useSiteSettings();
  const { data: services = [] } = useServices();
  const { data: testimonials = [] } = useTestimonials();
  const { data: team = [] } = useTeam();
  const { data: faqs = [] } = useFaqs();
  const { data: banners = [] } = useBanners();

  const firstSession = services.find((s) => /primeira/i.test(s.title));
  const packageServices = services.filter((s) => s.id !== firstSession?.id);
  const sinaisBanner = banners[0];

  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-12 md:grid-cols-2 md:items-center md:pt-20">
          <div className="fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {settings?.address ?? "Atendimento online"}
            </span>
            <h1 className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl">
              Cuidar da sua mente <br />
              <span className="italic text-primary">não é fraqueza.</span><br />
              É coragem.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              {settings?.tagline ?? "Atendimento psicológico online com profissionais especializados."}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/contato"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground shadow-sm transition-all hover:shadow-md"
              >
                {firstSession ? `${firstSession.cta_label ?? "Começar"} — ${firstSession.price}` : settings?.cta_label ?? "Agendar"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a href="#como-funciona" className="text-sm font-medium text-foreground underline-offset-4 hover:underline">
                Como funciona
              </a>
            </div>
          </div>
          <div className="fade-up-2 relative">
            <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-sage-soft">
              <img src={heroImg} alt="" className="h-full w-full object-cover" width={1280} height={1280} />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-card p-4 shadow-sm md:block">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary"><ShieldCheck className="h-5 w-5" /></div>
                <div>
                  <p className="text-xs text-muted-foreground">Selo</p>
                  <p className="text-sm font-medium">Ética e Sigilo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SINAIS */}
      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">Talvez seja com você</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">{sinaisBanner?.title ?? "Sinais de que você precisa de ajuda"}</h2>
            <p className="mt-3 text-muted-foreground">{sinaisBanner?.subtitle ?? "Nem todo sofrimento grita."}</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {sinais.map((s) => (
              <div key={s.titulo} className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-md">
                <h3 className="font-serif text-xl">{s.titulo}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.texto}</p>
                <Link to="/contato" className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  Entender isso <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">Simples e sem burocracia</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">Como funciona</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {passos.map((p, i) => (
              <div key={p.titulo} className="relative rounded-2xl bg-sage-soft/60 p-6">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl text-primary">0{i + 1}</span>
                  <p.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-6 font-serif text-xl">{p.titulo}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROFISSIONAIS */}
      {team.length > 0 && (
        <section className="bg-sand/40 py-20">
          <div className="mx-auto max-w-6xl px-5">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-accent">Quem cuida de você</p>
                <h2 className="mt-3 font-serif text-3xl md:text-4xl">Nossos profissionais</h2>
              </div>
              <p className="max-w-md text-sm text-muted-foreground">Profissionais com registro ativo e foco em vínculo terapêutico.</p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {team.map((p) => (
                <article key={p.id} className="overflow-hidden rounded-2xl border border-border bg-card">
                  <div className="aspect-[4/5] overflow-hidden bg-muted">
                    {p.photo_url ? (
                      <img src={p.photo_url} alt={`Foto de ${p.name}`} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
                    ) : (
                      <div className="grid h-full w-full place-items-center bg-sage-soft text-primary font-serif text-4xl">
                        {p.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-muted-foreground">{p.credential}</p>
                    <h3 className="mt-1 font-serif text-xl">{p.name}</h3>
                    <p className="mt-2 text-sm font-medium text-primary">{p.specialty}</p>
                    <p className="text-sm text-muted-foreground">{p.approach}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DEPOIMENTOS */}
      {testimonials.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="max-w-2xl font-serif text-3xl md:text-4xl">Quem começou, conta como foi</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {testimonials.map((d) => (
                <figure key={d.id} className="rounded-2xl border border-border bg-card p-6">
                  <blockquote className="font-serif text-lg leading-relaxed text-foreground">“{d.quote}”</blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    {d.photo_url && <img src={d.photo_url} alt="" className="h-10 w-10 rounded-full object-cover" loading="lazy" />}
                    <span className="text-sm text-muted-foreground">{d.name}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="bg-muted/40 py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1fr_2fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-accent">Dúvidas comuns</p>
              <h2 className="mt-3 font-serif text-3xl md:text-4xl">Perguntas frequentes</h2>
            </div>
            <FAQ items={faqs.map((f) => ({ q: f.question, a: f.answer }))} />
          </div>
        </section>
      )}

      {/* PREÇOS */}
      {packageServices.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-5">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-accent">Sem letras miúdas</p>
              <h2 className="mt-3 font-serif text-3xl md:text-4xl">Preços transparentes</h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Você só paga por quem te atende. Sem fidelidade.</p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {packageServices.map((s) => (
                <PriceCard key={s.id} nome={s.title} preco={s.price ?? ""} descricao={s.description ?? ""} cta={s.cta_label ?? "Quero esse"} highlight={s.highlight} />
              ))}
            </div>

            {firstSession && (
              <div className="mt-10 rounded-2xl border border-accent/30 bg-ember-soft/60 p-6 text-center md:p-8">
                <p className="font-serif text-2xl text-foreground">{firstSession.title} por <span className="text-accent">{firstSession.price}</span></p>
                <p className="mt-2 text-sm text-muted-foreground">{firstSession.description}</p>
                <Link to="/contato" className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground">
                  {firstSession.cta_label ?? "Quero começar"} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </section>
      )}
    </Layout>
  );
}

function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <div key={it.q} className="overflow-hidden rounded-2xl border border-border bg-card">
          <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between px-5 py-5 text-left">
            <span className="font-serif text-lg">{it.q}</span>
            <span className={`text-2xl text-accent transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
          </button>
          {open === i && <div className="px-5 pb-5 text-sm text-muted-foreground">{it.a}</div>}
        </div>
      ))}
    </div>
  );
}

function PriceCard({ nome, preco, descricao, cta, highlight }: { nome: string; preco: string; descricao: string; cta: string; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl border p-7 transition-all ${highlight ? "border-accent bg-card shadow-md" : "border-border bg-card"}`}>
      {highlight && <span className="mb-3 inline-block rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">Mais escolhido</span>}
      <h3 className="font-serif text-xl">{nome}</h3>
      <p className="mt-3 font-serif text-4xl text-primary">{preco}</p>
      <p className="mt-3 text-sm text-muted-foreground">{descricao}</p>
      <Link to="/contato" className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all ${highlight ? "bg-accent text-accent-foreground" : "border border-border bg-background text-foreground hover:bg-muted"}`}>
        {cta}
      </Link>
    </div>
  );
}
