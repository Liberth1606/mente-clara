import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "Acessar painel" }] }),
});

function LoginPage() {
  const nav = useNavigate();
  const { user } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (user) nav({ to: "/admin" }); }, [user, nav]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null); setLoading(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
      }
      nav({ to: "/admin" });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erro");
    } finally { setLoading(false); }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-background px-5">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-3xl border border-border bg-card p-8">
        <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">← voltar ao site</Link>
        <h1 className="mt-3 font-serif text-2xl">{mode === "login" ? "Entrar no painel" : "Criar conta admin"}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Acesso restrito à equipe.</p>

        <div className="mt-6 space-y-3">
          <input type="email" required placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
          <input type="password" required minLength={6} placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button disabled={loading} className="w-full rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground disabled:opacity-60">
            {loading ? "..." : mode === "login" ? "Entrar" : "Criar conta"}
          </button>
          <button type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")} className="w-full text-xs text-muted-foreground hover:text-foreground">
            {mode === "login" ? "Não tem conta? Criar conta" : "Já tem conta? Entrar"}
          </button>
        </div>
      </form>
    </div>
  );
}
