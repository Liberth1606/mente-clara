import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { useSiteSettings } from "@/hooks/use-site-data";

const links = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contato", label: "Contato" },
] as const;

function waHref(s: { whatsapp?: string | null; whatsapp_message?: string | null } | null | undefined) {
  if (!s?.whatsapp) return null;
  const msg = encodeURIComponent(s.whatsapp_message || "Olá, gostaria de saber mais.");
  return `https://wa.me/${s.whatsapp.replace(/\D/g, "")}?text=${msg}`;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { data: s } = useSiteSettings();
  const name = s?.company_name ?? "";
  const initial = name.charAt(0).toUpperCase() || "·";
  const wa = waHref(s);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          {s?.logo_url ? (
            <img src={s.logo_url} alt={name} className="h-8 w-8 rounded-sm object-cover" />
          ) : (
            <span className="grid h-8 w-8 place-items-center rounded-sm bg-primary text-primary-foreground font-serif text-base">{initial}</span>
          )}
          <span className="font-serif text-lg tracking-tight">{name}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          {wa ? (
            <a
              href={wa}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <MessageCircle className="h-4 w-4" /> {s?.cta_label ?? "Agendar"}
            </a>
          ) : (
            <Link to="/contato" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
              {s?.cta_label ?? "Agendar"}
            </Link>
          )}
        </nav>

        <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-4">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-3 text-base text-foreground">
                {l.label}
              </Link>
            ))}
            {wa ? (
              <a href={wa} target="_blank" rel="noreferrer noopener" onClick={() => setOpen(false)} className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-center text-sm font-medium text-primary-foreground">
                <MessageCircle className="h-4 w-4" /> {s?.cta_label ?? "Falar no WhatsApp"}
              </a>
            ) : (
              <Link to="/contato" onClick={() => setOpen(false)} className="mt-3 rounded-full bg-primary px-5 py-3 text-center text-sm font-medium text-primary-foreground">
                {s?.cta_label ?? "Agendar"}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
