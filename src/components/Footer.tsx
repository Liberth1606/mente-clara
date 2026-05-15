import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground font-serif text-lg">m</span>
            <span className="font-serif text-xl">Mente Clara</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Cuidado psicológico online, ético e sigiloso. Você não precisa passar por isso sozinho.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold tracking-wide text-foreground">Navegação</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Início</Link></li>
            <li><Link to="/sobre" className="hover:text-foreground">Sobre nós</Link></li>
            <li><Link to="/blog" className="hover:text-foreground">Blog</Link></li>
            <li><Link to="/contato" className="hover:text-foreground">Contato</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold tracking-wide text-foreground">Atendimento</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Seg a Sex · 8h às 21h</li>
            <li>Sábado · 9h às 14h</li>
            <li>(11) 4002-8922</li>
            <li>contato@menteclara.com.br</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold tracking-wide text-foreground">Compromisso</h4>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary" /> CRP · Ética e Sigilo
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Todos os profissionais possuem registro ativo no Conselho Regional de Psicologia.
          </p>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Mente Clara · Todos os direitos reservados.
      </div>
    </footer>
  );
}
