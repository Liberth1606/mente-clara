import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import heroImg from "@/assets/hero.jpg";
import { ArrowRight, ShieldCheck, MessageCircle, Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { useSiteSettings, useServices, useFaqs } from "@/hooks/use-site-data";

export const Route = createFileRoute("/")({
  component: Index,
});

function waLink(s?: { whatsapp?: string | null; whatsapp_message?: string | null }) {
  if (!s?.whatsapp) return null;
  const msg = encodeURIComponent(s.whatsapp_message || "Olá, gostaria de saber mais.");
  return `https://wa.me/${s.whatsapp.replace(/\D/g, "")}?text=${msg}`;
}

function Index() {
  const { data: settings } = useSiteSettings();
  const { data: services = [] } = useServices();
  const { data: faqs = [] } = useFaqs();

  const wa = waLink(settings);
  const heroImage = settings?.hero_image_url || heroImg;
  const heroTitle = settings?.hero_title || "Cuidado profissional, com acolhimento e discrição.";
  const heroDescription = settings?.hero_description || settings?.tagline || "Atendimento especializado para você dar o próximo passo com segurança.";

  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 pt-10 md:grid-cols-2 md:items-center md:gap-14 md:pt-20">
          <div className="fade-up order-2 md:order-1">
            {settings?.address && (
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {settings.address}
              </span>
            )}
            <h1 className="mt-5 font-serif text-4xl leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
              {heroTitle}
            </h1>
            <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
              {heroDescription}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {wa ? (
                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:shadow-md"
                >
                  <MessageCircle className="h-4 w-4" />
                  {settings?.cta_label || "Falar no WhatsApp"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              ) : (
                <Link to="/contato" className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:shadow-md">
                  {settings?.cta_label || "Entrar em contato"} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
              <a href="#servicos" className="text-sm font-medium text-foreground underline-offset-4 hover:underline">
                Ver serviços
              </a>
            </div>

            {(settings?.business_hours || settings?.phone) && (
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                {settings?.business_hours && (
                  <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" /> {settings.business_hours}</span>
                )}
                {settings?.phone && (
                  <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4" /> {settings.phone}</span>
                )}
              </div>
            )}
          </div>

          <div className="fade-up-2 relative order-1 md:order-2">
            <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-muted">
              <img src={heroImage} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-border bg-card p-4 shadow-sm md:block">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary"><ShieldCheck className="h-5 w-5" /></div>
                <div>
                  <p className="text-xs text-muted-foreground">Compromisso</p>
                  <p className="text-sm font-medium">Ética e sigilo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      {services.length > 0 && (
        <section id="servicos" className="bg-muted/40 py-20">
          <div className="mx-auto max-w-6xl px-5">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-widest text-accent">O que oferecemos</p>
              <h2 className="mt-3 font-serif text-3xl md:text-4xl">Serviços</h2>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <ServiceCard
                  key={s.id}
                  title={s.title}
                  description={s.description ?? ""}
                  price={s.price ?? ""}
                  cta={s.cta_label || "Saber mais"}
                  highlight={s.highlight}
                  wa={wa}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1fr_2fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-accent">Tire suas dúvidas</p>
              <h2 className="mt-3 font-serif text-3xl md:text-4xl">Perguntas frequentes</h2>
            </div>
            <FAQ items={faqs.map((f) => ({ q: f.question, a: f.answer }))} />
          </div>
        </section>
      )}

      {/* CONTATO / CTA */}
      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">Vamos conversar</p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl">Pronto para dar o próximo passo?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Fale com a gente pelo canal que preferir. Atendemos com discrição e sem compromisso na primeira conversa.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {wa && (
              <a href={wa} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground">
                <MessageCircle className="h-4 w-4" /> {settings?.cta_label || "Falar no WhatsApp"}
              </a>
            )}
            <Link to="/contato" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-medium text-foreground hover:bg-card">
              Ver todos os contatos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mx-auto mt-10 grid max-w-2xl gap-3 text-sm text-muted-foreground sm:grid-cols-3">
            {settings?.phone && (
              <div className="inline-flex items-center justify-center gap-2"><Phone className="h-4 w-4 text-primary" /> {settings.phone}</div>
            )}
            {settings?.email && (
              <div className="inline-flex items-center justify-center gap-2"><Mail className="h-4 w-4 text-primary" /> {settings.email}</div>
            )}
            {settings?.address && (
              <div className="inline-flex items-center justify-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {settings.address}</div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function ServiceCard({ title, description, price, cta, highlight, wa }: { title: string; description: string; price: string; cta: string; highlight?: boolean; wa: string | null }) {
  const Btn = wa ? (
    <a href={wa} target="_blank" rel="noreferrer noopener" className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all ${highlight ? "bg-primary text-primary-foreground" : "border border-border bg-background text-foreground hover:bg-muted"}`}>
      <MessageCircle className="h-4 w-4" /> {cta}
    </a>
  ) : (
    <Link to="/contato" className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all ${highlight ? "bg-primary text-primary-foreground" : "border border-border bg-background text-foreground hover:bg-muted"}`}>
      {cta}
    </Link>
  );
  return (
    <div className={`flex flex-col rounded-2xl border bg-card p-7 transition-all hover:-translate-y-0.5 hover:shadow-md ${highlight ? "border-primary/40 shadow-sm" : "border-border"}`}>
      {highlight && <span className="mb-3 inline-block self-start rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Mais procurado</span>}
      <h3 className="font-serif text-xl">{title}</h3>
      {price && <p className="mt-3 font-serif text-3xl text-primary">{price}</p>}
      {description && <p className="mt-3 flex-1 text-sm text-muted-foreground">{description}</p>}
      {Btn}
    </div>
  );
}

function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <div key={it.q} className="overflow-hidden rounded-2xl border border-border bg-card">
          <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left">
            <span className="font-serif text-base sm:text-lg">{it.q}</span>
            <span className={`text-2xl text-accent transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
          </button>
          {open === i && <div className="px-5 pb-5 text-sm text-muted-foreground">{it.a}</div>}
        </div>
      ))}
    </div>
  );
}
