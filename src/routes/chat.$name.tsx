import { useEffect, useMemo, useRef, useState } from "react";
import { scriptFor } from "@/lib/chat-scripts";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import CustomerService from "@/components/CustomerService";
import {
  findPerson,
  type Person,
  tzsFor,
  fmtTZS,
  REGISTER_URL,
  CHANNEL_URL,
} from "@/lib/people";

const LOGO_URL = "https://dreamchats.lovable.app/og-image.png";

export const Route = createFileRoute("/chat/$name")({
  head: ({ params }) => ({
    meta: [
      { title: `Chat na ${params.name} — DreamChat` },
      {
        name: "description",
        content: `Anza mazungumzo na ${params.name} kwenye DreamChat na upate malipo kwa muda uliopangwa.`,
      },
      { property: "og:title", content: `Chat na ${params.name} — DreamChat` },
      {
        property: "og:description",
        content: `Jisajili DreamChat ili kuendelea na mazungumzo na ${params.name}.`,
      },
      { property: "og:type", content: "profile" },
      {
        property: "og:url",
        content: `https://dreamvorasite.lovable.app/chat/${encodeURIComponent(params.name)}`,
      },
      { property: "og:image", content: LOGO_URL },
      { name: "twitter:image", content: LOGO_URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "canonical",
        href: `https://dreamvorasite.lovable.app/chat/${encodeURIComponent(params.name)}`,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          url: `https://dreamvorasite.lovable.app/chat/${encodeURIComponent(params.name)}`,
          inLanguage: "sw-TZ",
          mainEntity: {
            "@type": "Person",
            name: params.name,
            image: `https://i.pravatar.cc/150?img=${findPerson(params.name)?.img ?? 1}`,
          },
        }),
      },
    ],
  }),

  loader: ({ params }) => {
    const person = findPerson(params.name);
    if (!person) throw notFound();
    return person;
  },
  component: ChatPage,
});

type Msg = { from: "them" | "me"; text: string };

function ChatPage() {
  const p = Route.useLoaderData() as unknown as Person;
  const SCRIPT = useMemo(() => scriptFor(p.name), [p.name]);
  const [messages, setMessages] = useState<Msg[]>([
    { from: "them", text: SCRIPT[0]!.ask },
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || step >= SCRIPT.length || typing) return;
    const current = step;
    setInput("");
    setMessages((m) => [...m, { from: "me", text }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "them", text: SCRIPT[current]!.reply }]);
      const next = current + 1;
      setStep(next);
      if (next < SCRIPT.length) {
        setTimeout(() => {
          setMessages((m) => [...m, { from: "them", text: SCRIPT[next]!.ask }]);
        }, 900);
      } else {
        setTimeout(() => setShowPopup(true), 1200);
      }
    }, 1200);
  };

  const done = step >= SCRIPT.length;

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <header className="border-b-4 border-gold bg-header px-4 py-3">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <img
            src={`https://i.pravatar.cc/150?img=${p.img}`}
            alt={`Picha ya ${p.name}`}
            className="h-10 w-10 rounded-full border-2 border-gold object-cover"
          />
          <div>
            <h1 className="font-display text-base font-extrabold text-foreground">
              {p.name} {p.emoji}
            </h1>
            <p className="text-xs text-success">● Online sasa</p>
          </div>
          <div className="ml-auto text-right">
            <p className="font-display text-sm font-extrabold text-price">
              TZS {fmtTZS(tzsFor(p.minutes))}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {p.minutes} dakika
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col px-3 py-4">
        <div className="flex-1 space-y-3">
          <p className="mx-auto w-fit rounded-full bg-accent/60 px-3 py-1 text-center text-[11px] text-muted-foreground">
            {p.name} anataka: {p.wants}
          </p>

          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                  m.from === "me"
                    ? "rounded-br-sm bg-success text-success-foreground"
                    : "rounded-bl-sm bg-card text-foreground"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-sm bg-card px-4 py-2 text-sm text-muted-foreground">
                {p.name} anaandika…
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {!done && (
          <p className="mt-3 text-center text-xs text-muted-foreground">
            💡 Jibu: <strong>{SCRIPT[step]!.hint}</strong>
          </p>
        )}

        <div className="mt-3 flex justify-end">
          <CustomerService placement="inline" />
        </div>

        <form onSubmit={send} className="sticky bottom-3 mt-2 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={done}
            placeholder={done ? "Jisajili ili kuendelea…" : "Andika jibu lako…"}
            className="flex-1 rounded-full border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={done || typing}
            className="rounded-full bg-brand px-5 py-3 text-sm font-bold text-primary-foreground disabled:opacity-50"
          >
            Tuma
          </button>
        </form>

        <Link
          to="/"
          className="mt-3 rounded-full border border-border px-5 py-2 text-center text-sm font-bold"
        >
          🔙 Rudi Nyumbani
        </Link>
      </main>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 px-5">
          <div className="w-full max-w-sm rounded-3xl bg-card p-6 text-center shadow-2xl">
            <img
              src={`https://i.pravatar.cc/150?img=${p.img}`}
              alt={`Picha ya ${p.name}`}
              className="mx-auto h-20 w-20 rounded-full border-4 border-gold object-cover"
            />
            <h2 className="mt-4 font-display text-xl font-extrabold">
              JISAJILI KUENDELEA KUCHAT NA KULIPWA
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Umemaliza chat 3 za bure na {p.name}. Jisajili sasa ili kuendelea
              na kulipwa <strong>TZS {fmtTZS(tzsFor(p.minutes))}</strong>.
            </p>
            <div className="mt-5 grid gap-3">
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-success px-5 py-3 text-sm font-bold text-success-foreground"
              >
                📝 Jisajili Ili Kuendelea
              </a>
              <a
                href={CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gold px-5 py-3 text-sm font-bold text-gold-foreground"
              >
                📢 Jiunge na Channel
              </a>
              <button
                onClick={() => setShowPopup(false)}
                className="rounded-full border border-border px-5 py-2 text-sm font-bold"
              >
                Funga
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

