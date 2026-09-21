import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  people,
  tzsFor,
  usdFor,
  fmtTZS,
  CHANNEL_URL,
  REGISTER_URL,
} from "@/lib/people";
import SignupPopup from "@/components/SignupPopup";
import WithdrawalPopup from "@/components/WithdrawalPopup";
import CustomerService from "@/components/CustomerService";

const LOGO_URL = "/dreamchat-logo.png";
const PER_PAGE = 9;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DreamChat: Chat na Wageni na Pata Pesa Online Tanzania" },
      { name: "description", content: "DreamChat inakuunganisha na wageni duniani — chat, jifunze lugha na utamaduni, na pata fursa za kuingiza kipato mtandaoni Tanzania." },
      { property: "og:title", content: "DreamChat: Chat na Pata Pesa Online" },
      { property: "og:description", content: "Chagua mtu wa kuzungumza naye, badilishana lugha na utamaduni, kisha fuata maelekezo ya DreamChat kuanza." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://dreamchats.lovable.app/" },
      { property: "og:image", content: LOGO_URL },
      { name: "twitter:image", content: LOGO_URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://dreamchats.lovable.app/" }],
  }),
  component: Index,
});

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function Index() {
  const [page, setPage] = useState(0);
  const [showSignup, setShowSignup] = useState(false);
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const [displayPeople, setDisplayPeople] = useState(() => shuffle(people));

  useEffect(() => {
    const rotate = window.setInterval(() => {
      setDisplayPeople(shuffle(people));
      setPage(0);
    }, 8000);
    return () => window.clearInterval(rotate);
  }, []);

  const pages = Math.ceil(displayPeople.length / PER_PAGE);
  const slice = useMemo(
    () => displayPeople.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE),
    [displayPeople, page],
  );

  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="sticky top-0 z-30 border-b-4 border-gold bg-header text-header-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <img src={LOGO_URL} alt="Nembo ya DreamChat" className="h-10 w-10 rounded-full object-contain" />
            <div>
              <div className="font-display text-xl font-extrabold leading-none"><span className="text-brand">Dream</span><span className="text-foreground">Chat</span></div>
              <p className="mt-1 text-[11px] text-muted-foreground">Connect, Learn, Earn</p>
            </div>
          </div>
          <span className="hidden rounded-full bg-muted px-3 py-1 text-xs font-semibold text-success sm:inline-block">● 2,535 live</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowSignup(true)} className="rounded-lg border border-success/40 px-3 py-2 text-xs font-bold text-foreground">JISAJILI</button>
            <button onClick={() => setShowWithdrawal(true)} className="rounded-lg bg-success px-3 py-2 text-xs font-bold text-success-foreground shadow-sm">💰 Withdraw</button>
            <div className="hidden rounded-lg bg-foreground px-3 py-1.5 text-background sm:block">
              <div className="text-[9px] uppercase tracking-wide opacity-70">Current balance</div>
              <div className="text-sm font-bold">TZS 0.00</div>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-accent/70 px-4 py-10 text-center">
        <img src={LOGO_URL} alt="Nembo ya DreamChat — Chat na Wageni, Pata Pesa Online" width={320} height={320} className="mx-auto mb-5 h-28 w-auto object-contain sm:h-36" />
        <h1 className="mx-auto max-w-3xl font-display text-2xl font-extrabold leading-tight sm:text-4xl">🌍 DreamChat: Chat na Wageni na Pata Pesa Online Tanzania</h1>
        <p className="mt-3 font-semibold text-gold">Connect, learn and discover online earning opportunities</p>
        <button
          onClick={() => setShowSignup(true)}
          className="signup-pulse mt-5 rounded-full bg-brand px-9 py-3.5 text-sm font-extrabold text-primary-foreground shadow-lg"
        >
          JISAJILI SASA
        </button>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">Chagua mtu wa kuzungumza naye, badilishana lugha na utamaduni, kisha fuata maelekezo ya DreamChat kuanza.</p>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-5 text-center">
          <h2 className="font-display text-2xl font-extrabold">Chagua mtu wa kuchat nae</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {slice.map((p) => (
            <article key={p.name} className="relative rounded-2xl bg-card p-4 shadow-lg shadow-foreground/5">
              <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-xs text-background">✓</span>
              <div className="flex items-center gap-3">
                <img src={`https://i.pravatar.cc/150?img=${p.img}`} alt={`Picha ya ${p.name}`} loading="lazy" className="h-14 w-14 rounded-full border-2 border-gold object-cover" />
                <div>
                  <h2 className="font-display text-base font-bold">{p.name} {p.emoji}</h2>
                  <p className="text-xs font-medium text-success">● online</p>
                  <p className="text-xs text-muted-foreground">★ {p.rating.toFixed(1)}</p>
                </div>
              </div>
              <p className="mt-4 text-sm"><span className="font-bold">CHAT TIME :</span> {p.minutes} minutes</p>
              <p className="text-sm"><span className="font-bold">WANTS :</span> {p.wants}</p>
              <div className="mt-4 flex items-end justify-between gap-3">
                <Link to="/chat/$name" params={{ name: p.name }} className="rounded-full bg-success px-4 py-2 text-xs font-bold text-success-foreground">💬 START CHAT</Link>
                <div className="text-right">
                  <span className="inline-block rounded-full bg-price px-3 py-1 text-xs font-bold text-price-foreground">TZS {fmtTZS(tzsFor(p.minutes))}</span>
                  <p className="mt-1 text-[11px] text-muted-foreground">Earn USD {usdFor(p.minutes).toFixed(2)}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button onClick={() => setPage((v) => Math.max(0, v - 1))} disabled={page === 0} className="rounded-lg bg-card px-4 py-2 text-sm font-semibold shadow disabled:opacity-50">← Prev</button>
          <span className="rounded-lg bg-card px-4 py-2 text-sm font-bold shadow">{page + 1} / {pages}</span>
          <button onClick={() => setPage((v) => Math.min(pages - 1, v + 1))} disabled={page === pages - 1} className="rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background disabled:opacity-50">Next →</button>
        </div>
      </main>

      <footer className="mt-10 border-t-4 border-gold bg-foreground px-4 py-10 text-center text-background">
        <p className="font-display text-lg font-bold">DreamChat</p>
        <p className="mt-2 text-sm opacity-80">Jiunge na channel yetu upate maelekezo na fursa mpya kila siku.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="rounded-full bg-success px-5 py-2.5 text-sm font-bold text-success-foreground">📢 Jiunge na Channel</a>
          <span className="rounded-full border border-background/20 px-5 py-2.5 text-sm font-semibold opacity-90">WhatsApp: 0743871339</span>
          <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="rounded-full border border-background/30 px-5 py-2.5 text-sm font-bold">📝 Jisajili</a>
        </div>
        <p className="mt-6 text-xs opacity-60">© {new Date().getFullYear()} DreamChat. Haki zote zimehifadhiwa.</p>
      </footer>

      <CustomerService />
      <SignupPopup open={showSignup} onClose={() => setShowSignup(false)} />
      <WithdrawalPopup open={showWithdrawal} onClose={() => setShowWithdrawal(false)} />
    </div>
  );
}
