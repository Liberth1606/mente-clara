import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSiteSettings } from "@/hooks/use-site-data";

const links = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre" },
  { to: "/blog", label: "Blog" },
  { to: "/contato", label: "Contato" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { data: s } = useSiteSettings();
  const name = s?.company_name ?? "";
  const initial = name.charAt(0).toLowerCase() || "·";
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2">
          {s?.logo_url ? (
            <img src={s.logo_url} alt={name} className="h-9 w-9 rounded-full object-cover" />
          ) : (
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground font-serif text-lg">{initial}</span>
          )}
          <span className="font-serif text-xl tracking-tight">{name}</span>
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
          <Link
            to="/contato"
            className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-accent-foreground transition-all hover:opacity-90"
          >
            {s?.cta_label ?? "Agendar"}
          </Link>
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
            <Link to="/contato" onClick={() => setOpen(false)} className="mt-3 rounded-full bg-accent px-5 py-3 text-center text-sm font-medium text-accent-foreground">
              {s?.cta_label ?? "Agendar"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
