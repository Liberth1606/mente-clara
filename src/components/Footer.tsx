import { Link } from "@tanstack/react-router";
import { useSiteSettings, useSocial } from "@/hooks/use-site-data";

export function Footer() {
  const { data: s } = useSiteSettings();
  const { data: social = [] } = useSocial();
  return (
    <footer className="mt-24 border-t border-border bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            {s?.logo_url ? (
              <img src={s.logo_url} alt="" className="h-9 w-9 rounded-full object-cover" />
            ) : (
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground font-serif text-lg">
                {s?.company_name?.charAt(0).toLowerCase() ?? "·"}
              </span>
            )}
            <span className="font-serif text-xl">{s?.company_name}</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">{s?.tagline}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold tracking-wide text-foreground">Navegação</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Início</Link></li>
            <li><Link to="/contato" className="hover:text-foreground">Contato</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold tracking-wide text-foreground">Atendimento</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {s?.business_hours && <li>{s.business_hours}</li>}
            {s?.phone && <li>{s.phone}</li>}
            {s?.email && <li>{s.email}</li>}
            {s?.address && <li>{s.address}</li>}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold tracking-wide text-foreground">Compromisso</h4>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary" /> Ética e sigilo
          </div>
          {social.length > 0 && (
            <ul className="mt-4 flex gap-3 text-sm text-muted-foreground">
              {social.map((l) => (
                <li key={l.id}>
                  <a href={l.url} target="_blank" rel="noreferrer" className="capitalize hover:text-foreground">{l.platform}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {s?.company_name} · Todos os direitos reservados ·{" "}
        <Link to="/login" className="hover:text-foreground">Admin</Link>
      </div>
    </footer>
  );
}
