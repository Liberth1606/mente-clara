import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import heroImg from "@/assets/hero.jpg";
import { ArrowRight, MessageCircle, Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { useSiteSettings, useServices, useFaqs } from "@/hooks/use-site-data";

export const Route = createFileRoute("/")({
  component: Index,
});

function waLink(s?: { whatsapp?: string | null; whatsapp_message?: string | null } | null) {
  if (!s?.whatsapp) return null;
  const msg = encodeURIComponent(s.whatsapp_message || "Olá, gostaria de mais informações sobre os atendimentos.");
  return `https://wa.me/${s.whatsapp.replace(/\D/g, "")}?text=${msg}`;
}

function Index() {
  const { data: settings } = useSiteSettings();
  const { data: services = [] } = useServices();
  const { data: faqs = [] } = useFaqs();

  const wa = waLink(settings);
  const heroImage = settings?.hero_image_url || heroImg;
  const heroTitle = settings?.hero_title || "Atendimento psicológico com seriedade e discrição.";
  const heroDescription =
    settings?.hero_description ||
    settings?.tagline ||
    "Consultas online ou presenciais conduzidas por profissionais registrados, em um ambiente reservado e profissional.";

  return (
    <Layout>
      {/* HERO */}
      <section className="border-b border-border/60">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-16 md:py-24">
          <div className="fade-up order-2 md:order-1">
            {settings?.address && (
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <span className="h-px w-6 bg-accent" /> {settings.address}
              </span>
            )}
            <h1 className="mt-5 font-serif text-4xl leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-[3.5rem]">
              {heroTitle}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {heroDescription}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              {wa ? (
                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <MessageCircle className="h-4 w-4" />
                  {settings?.cta_label || "Agendar pelo WhatsApp"}
                </a>
              ) : (
                <Link
                  to="/contato"
                  className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {settings?.cta_label || "Entrar em contato"}
                </Link>
              )}
              <Link
                to="/sobre"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
              >
                Conheça a clínica <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {(settings?.business_hours || settings?.phone) && (
              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-2 border-t border-border/60 pt-6 text-sm text-muted-foreground">
                {settings?.business_hours && (
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-4 w-4 text-accent" /> {settings.business_hours}
                  </span>
                )}
                {settings?.phone && (
                  <span className="inline-flex items-center gap-2">
                    <Phone className="h-4 w-4 text-accent" /> {settings.phone}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="fade-up-2 order-1 md:order-2">
            <div className="aspect-[4/5] overflow-hidden rounded-md bg-muted">
              <img src={heroImage} alt="" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* INTRO / ABORDAGEM */}
      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[1fr_1.6fr] md:gap-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Nossa abordagem</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">
              Um espaço para falar do que importa, no seu tempo.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              Procurar ajuda raramente é uma decisão simples. Por isso priorizamos uma escuta cuidadosa desde o primeiro
              contato, sem promessas rápidas nem fórmulas prontas.
            </p>
            <p>
              Trabalhamos dentro do código de ética profissional, com sigilo integral e profissionais devidamente
              registrados. Cada acompanhamento é construído junto com a pessoa que busca atendimento.
            </p>
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      {services.length > 0 && (
        <section id="servicos" className="border-t border-border/60 bg-muted/40 py-20">
          <div className="mx-auto max-w-6xl px-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Atendimentos</p>
                <h2 className="mt-3 font-serif text-3xl md:text-4xl">Modalidades disponíveis</h2>
              </div>
              <p className="max-w-md text-sm text-muted-foreground">
                Escolha o formato que faz mais sentido para o seu momento. Em caso de dúvida, podemos orientar pelo WhatsApp.
              </p>
            </div>
            <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
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
          <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[1fr_1.6fr] md:gap-20">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Dúvidas frequentes</p>
              <h2 className="mt-3 font-serif text-3xl md:text-4xl">Antes do primeiro contato</h2>
            </div>
            <FAQ items={faqs.map((f) => ({ q: f.question, a: f.answer }))} />
          </div>
        </section>
      )}

      {/* CONTATO / CTA */}
      <section className="border-t border-border/60 bg-muted/40 py-20">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Contato</p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl">
            Marque uma conversa inicial sem compromisso.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Respondemos em horário comercial. Sua mensagem é tratada com sigilo profissional.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                <MessageCircle className="h-4 w-4" /> {settings?.cta_label || "Falar no WhatsApp"}
              </a>
            )}
            <Link
              to="/contato"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-card"
            >
              Outras formas de contato
            </Link>
          </div>

          <div className="mx-auto mt-12 grid max-w-2xl gap-4 border-t border-border/60 pt-8 text-sm text-muted-foreground sm:grid-cols-3">
            {settings?.phone && (
              <div className="inline-flex items-center justify-center gap-2">
                <Phone className="h-4 w-4 text-accent" /> {settings.phone}
              </div>
            )}
            {settings?.email && (
              <div className="inline-flex items-center justify-center gap-2">
                <Mail className="h-4 w-4 text-accent" /> {settings.email}
              </div>
            )}
            {settings?.address && (
              <div className="inline-flex items-center justify-center gap-2">
                <MapPin className="h-4 w-4 text-accent" /> {settings.address}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function ServiceCard({
  title,
  description,
  price,
  cta,
  highlight,
  wa,
}: {
  title: string;
  description: string;
  price: string;
  cta: string;
  highlight?: boolean;
  wa: string | null;
}) {
  const Btn = wa ? (
    <a
      href={wa}
      target="_blank"
      rel="noreferrer noopener"
      className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
    >
      {cta} <ArrowRight className="h-3.5 w-3.5" />
    </a>
  ) : (
    <Link
      to="/contato"
      className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
    >
      {cta} <ArrowRight className="h-3.5 w-3.5" />
    </Link>
  );
  return (
    <div className="flex flex-col bg-card p-8 transition-colors hover:bg-background">
      {highlight && (
        <span className="mb-4 inline-flex w-fit items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
          <span className="h-px w-4 bg-accent" /> Mais procurado
        </span>
      )}
      <h3 className="font-serif text-xl text-foreground">{title}</h3>
      {price && <p className="mt-2 text-sm font-medium text-foreground">{price}</p>}
      {description && <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>}
      {Btn}
    </div>
  );
}

function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((it, i) => (
        <div key={it.q}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 py-5 text-left"
          >
            <span className="font-serif text-base text-foreground sm:text-lg">{it.q}</span>
            <span className={`text-xl text-muted-foreground transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
          </button>
          {open === i && <div className="pb-6 text-sm leading-relaxed text-muted-foreground">{it.a}</div>}
        </div>
      ))}
    </div>
  );
}
