import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import heroImg from "@/assets/hero.jpg";
import { ArrowRight, ShieldCheck, MapPin, Clock, Mail, Phone, MessageCircle } from "lucide-react";
import { useState } from "react";
import {
  useSiteSettings,
  useServices,
  useFaqs,
  useBanners,
} from "@/hooks/use-site-data";

export const Route = createFileRoute("/")({
  component: Index,
});

function whatsappHref(number?: string | null, message?: string | null) {
  if (!number) return null;
  const msg = encodeURIComponent(message || "Olá, gostaria de mais informações.");
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${msg}`;
}

function Index() {
  const { data: settings } = useSiteSettings();
  const { data: services = [] } = useServices();
  const { data: faqs = [] } = useFaqs();
  const { data: banners = [] } = useBanners();

  const hero = banners[0];
  const heroImage = hero?.image_url || heroImg;
  const wppHref = whatsappHref(settings?.whatsapp, settings?.whatsapp_message);
  const ctaLabel = settings?.cta_label ?? "Falar no WhatsApp";

  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-10 md:gap-14 md:pb-24 md:pt-20 lg:grid-cols-2 lg:items-center">
          <div className="fade-up">
            {settings?.address && (
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" /> {settings.address}
              </span>
            )}
            <h1 className="mt-5 font-serif text-[2.25rem] leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {hero?.title || settings?.company_name}
            </h1>
            {(hero?.subtitle || settings?.tagline) && (
              <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
                {hero?.subtitle || settings?.tagline}
              </p>
            )}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {wppHref && (
                <a
                  href={wppHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground shadow-sm transition-all hover:shadow-md"
                >
                  <MessageCircle className="h-4 w-4" />
                  {ctaLabel}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              )}
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Outras formas de contato
              </Link>
            </div>
          </div>
          <div className="fade-up-2 relative">
            <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-muted">
              <img
                src={heroImage}
                alt=""
                className="h-full w-full object-cover"
                width={1280}
                height={1600}
              />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-border bg-card p-4 shadow-sm sm:block">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Atendimento</p>
                  <p className="text-sm font-medium">Ética e sigilo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      {services.length > 0 && (
        <section className="bg-muted/40 py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-5">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Serviços
              </p>
              <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
                Como podemos te ajudar
              </h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <article
                  key={s.id}
                  className={`flex flex-col rounded-2xl border bg-card p-7 transition-all ${
                    s.highlight ? "border-accent shadow-md" : "border-border hover:-translate-y-1 hover:shadow-md"
                  }`}
                >
                  {s.highlight && (
                    <span className="mb-3 inline-block w-fit rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">
                      Mais procurado
                    </span>
                  )}
                  <h3 className="font-serif text-xl">{s.title}</h3>
                  {s.price && (
                    <p className="mt-3 font-serif text-3xl text-primary">{s.price}</p>
                  )}
                  {s.description && (
                    <p className="mt-3 text-sm text-muted-foreground">{s.description}</p>
                  )}
                  {wppHref && (
                    <a
                      href={wppHref}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground"
                    >
                      {s.cta_label ?? ctaLabel}
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-20 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1fr_2fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Dúvidas frequentes
              </p>
              <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
                Perguntas comuns
              </h2>
            </div>
            <FAQ items={faqs.map((f) => ({ q: f.question, a: f.answer }))} />
          </div>
        </section>
      )}

      {/* CONTATO / CTA */}
      <section className="bg-muted/40 py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Fale conosco
                </p>
                <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
                  Atendimento direto pelo WhatsApp
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Tire dúvidas, agende um horário e receba todas as informações com rapidez e privacidade.
                </p>
                {wppHref && (
                  <a
                    href={wppHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground shadow-sm"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {ctaLabel}
                  </a>
                )}
              </div>
              <ul className="space-y-3 text-sm">
                {settings?.phone && (
                  <li className="flex items-center gap-3 rounded-xl border border-border bg-background p-4">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-foreground">{settings.phone}</span>
                  </li>
                )}
                {settings?.email && (
                  <li className="flex items-center gap-3 rounded-xl border border-border bg-background p-4">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-foreground">{settings.email}</span>
                  </li>
                )}
                {settings?.address && (
                  <li className="flex items-center gap-3 rounded-xl border border-border bg-background p-4">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-foreground">{settings.address}</span>
                  </li>
                )}
                {settings?.business_hours && (
                  <li className="flex items-center gap-3 rounded-xl border border-border bg-background p-4">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-foreground">{settings.business_hours}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <div key={it.q} className="overflow-hidden rounded-2xl border border-border bg-card">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
          >
            <span className="font-serif text-base sm:text-lg">{it.q}</span>
            <span className={`text-2xl text-accent transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
          </button>
          {open === i && <div className="px-5 pb-5 text-sm text-muted-foreground">{it.a}</div>}
        </div>
      ))}
    </div>
  );
}
