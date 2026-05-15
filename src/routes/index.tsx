import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import heroImg from "@/assets/hero.jpg";
import psi1 from "@/assets/psi-1.jpg";
import psi2 from "@/assets/psi-2.jpg";
import psi3 from "@/assets/psi-3.jpg";
import depo1 from "@/assets/depo-1.jpg";
import depo2 from "@/assets/depo-2.jpg";
import depo3 from "@/assets/depo-3.jpg";
import { ArrowRight, ShieldCheck, Calendar, Video, Users } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Mente Clara — Psicologia online acolhedora e sigilosa" },
      { name: "description", content: "Cuidar da sua mente não é fraqueza. É coragem. Atendimento psicológico online com profissionais especializados. Primeira sessão por R$ 90." },
    ],
  }),
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

const profissionais = [
  { nome: "Dra. Mariana Alves", crp: "CRP 06/123456", especialidade: "Ansiedade e Burnout", abordagem: "Terapia Cognitivo-Comportamental", img: psi1 },
  { nome: "Dr. Rafael Soares", crp: "CRP 06/789012", especialidade: "Depressão e Luto", abordagem: "Psicanálise contemporânea", img: psi2 },
  { nome: "Dra. Juliana Pires", crp: "CRP 06/345678", especialidade: "Autoestima e Relacionamentos", abordagem: "Terapia Humanista", img: psi3 },
];

const faqs = [
  { q: "E se eu não souber o que falar?", a: "Esse é o pensamento mais comum nas primeiras sessões. Seu psicólogo vai conduzir a conversa com perguntas suaves — você não precisa chegar preparado." },
  { q: "É realmente sigiloso?", a: "Sim. Todos os profissionais seguem o Código de Ética do CRP. Nada do que você diz é compartilhado, e nossas sessões usam plataforma criptografada." },
  { q: "Funciona mesmo online?", a: "Estudos mostram eficácia equivalente ao presencial para a maioria dos casos. E você ganha tempo, conforto e privacidade." },
  { q: "Quanto tempo dura o tratamento?", a: "Depende de você e do seu objetivo. Alguns processos levam semanas, outros meses. Quem decide o ritmo é você, junto com o profissional." },
  { q: "E se não gostar do profissional?", a: "Sem problema. Você pode trocar quantas vezes precisar — o vínculo terapêutico é parte essencial do processo." },
];

const depoimentos = [
  { nome: "Carla, 34", texto: "Demorei dois anos pra dar o primeiro passo. Hoje queria ter feito antes. A diferença é absurda.", img: depo1 },
  { nome: "Felipe, 41", texto: "Achava que terapia era pra quem estava muito mal. Descobri que é justamente pra não chegar nesse ponto.", img: depo2 },
  { nome: "Ana, 27", texto: "O sigilo me deu coragem pra falar coisas que nunca tinha dito em voz alta. Foi libertador.", img: depo3 },
];

function Index() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-12 md:grid-cols-2 md:items-center md:pt-20">
          <div className="fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Atendimento 100% online
            </span>
            <h1 className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl">
              Cuidar da sua mente <br />
              <span className="italic text-primary">não é fraqueza.</span><br />
              É coragem.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Atendimento psicológico online com profissionais especializados.
              Totalmente sigiloso, de qualquer lugar.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/contato"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground shadow-sm transition-all hover:shadow-md"
              >
                Fazer primeira sessão — R$ 90
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a href="#como-funciona" className="text-sm font-medium text-foreground underline-offset-4 hover:underline">
                Como funciona
              </a>
            </div>
            <div className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[depo1, depo2, depo3].map((s) => (
                  <img key={s} src={s} alt="" className="h-10 w-10 rounded-full border-2 border-background object-cover" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">+2.000 pessoas atendidas com discrição e cuidado</p>
            </div>
          </div>
          <div className="fade-up-2 relative">
            <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-sage-soft">
              <img src={heroImg} alt="Pessoa em momento de cuidado pessoal" className="h-full w-full object-cover" width={1280} height={1280} />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-card p-4 shadow-sm md:block">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary"><ShieldCheck className="h-5 w-5" /></div>
                <div>
                  <p className="text-xs text-muted-foreground">Selo</p>
                  <p className="text-sm font-medium">CRP · Ética e Sigilo</p>
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
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">Sinais de que você precisa de ajuda</h2>
            <p className="mt-3 text-muted-foreground">
              Nem todo sofrimento grita. Às vezes ele aparece de mansinho, no dia a dia. Ler isto não é diagnóstico — é convite a se ouvir.
            </p>
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
      <section className="bg-sand/40 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-accent">Quem cuida de você</p>
              <h2 className="mt-3 font-serif text-3xl md:text-4xl">Nossos profissionais</h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">Todos com registro ativo no CRP, supervisão clínica contínua e foco em vínculo terapêutico.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {profissionais.map((p) => (
              <article key={p.nome} className="overflow-hidden rounded-2xl border border-border bg-card">
                <div className="aspect-[4/5] overflow-hidden bg-muted">
                  <img src={p.img} alt={`Foto de ${p.nome}`} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" width={768} height={896} />
                </div>
                <div className="p-6">
                  <p className="text-xs text-muted-foreground">{p.crp}</p>
                  <h3 className="mt-1 font-serif text-xl">{p.nome}</h3>
                  <p className="mt-2 text-sm font-medium text-primary">{p.especialidade}</p>
                  <p className="text-sm text-muted-foreground">{p.abordagem}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="max-w-2xl font-serif text-3xl md:text-4xl">Quem começou, conta como foi</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {depoimentos.map((d) => (
              <figure key={d.nome} className="rounded-2xl border border-border bg-card p-6">
                <blockquote className="font-serif text-lg leading-relaxed text-foreground">“{d.texto}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <img src={d.img} alt="" className="h-10 w-10 rounded-full object-cover" loading="lazy" />
                  <span className="text-sm text-muted-foreground">{d.nome}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/40 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-accent">Dúvidas comuns</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">Perguntas frequentes</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Talvez você esteja se perguntando algo bem parecido com o que outras pessoas perguntaram antes.
            </p>
          </div>
          <FAQ items={faqs} />
        </div>
      </section>

      {/* PREÇOS */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">Sem letras miúdas</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">Preços transparentes</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Você só paga por quem te atende. Sem mensalidade, sem fidelidade.</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <PriceCard nome="Sessão avulsa" preco="R$ 120" descricao="Pagamento por sessão, sem compromisso." cta="Marcar uma sessão" />
            <PriceCard nome="Pacote 4 sessões" preco="R$ 400" descricao="Economize R$ 80 — ideal pra um primeiro mês de processo." cta="Começar pacote" highlight />
            <PriceCard nome="Pacote 8 sessões" preco="R$ 760" descricao="Economize R$ 200 — pra construir um cuidado consistente." cta="Começar pacote" />
          </div>

          <div className="mt-10 rounded-2xl border border-accent/30 bg-ember-soft/60 p-6 text-center md:p-8">
            <p className="font-serif text-2xl text-foreground">Primeira sessão por <span className="text-accent">R$ 90</span></p>
            <p className="mt-2 text-sm text-muted-foreground">Pra você experimentar antes de decidir qualquer coisa.</p>
            <Link to="/contato" className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground">
              Quero começar <ArrowRight className="h-4 w-4" />
            </Link>
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
            className="flex w-full items-center justify-between px-5 py-5 text-left"
          >
            <span className="font-serif text-lg">{it.q}</span>
            <span className={`text-2xl text-accent transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
          </button>
          {open === i && (
            <div className="px-5 pb-5 text-sm text-muted-foreground">{it.a}</div>
          )}
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
