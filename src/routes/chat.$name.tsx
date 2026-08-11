import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  findPerson,
  tzsFor,
  fmtTZS,
  REGISTER_URL,
  WHATSAPP_URL,
  CHANNEL_URL,
} from "@/lib/people";

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
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ params }) => {
    const person = findPerson(params.name);
    if (!person) throw notFound();
    return person;
  },
  component: ChatPage,
});

function ChatPage() {
  const p = Route.useLoaderData()!;

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <header className="border-b-4 border-gold bg-header px-4 py-3">
        <div className="mx-auto max-w-3xl font-display text-xl font-extrabold">
          <span className="text-brand">Dream</span>
          <span className="text-foreground">Chat</span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-10">
        <div className="rounded-3xl bg-card p-6 text-center shadow-xl shadow-foreground/10">
          <img
            src={`https://i.pravatar.cc/150?img=${p.img}`}
            alt={`Picha ya ${p.name}`}
            className="mx-auto h-24 w-24 rounded-full border-4 border-gold object-cover"
          />
          <h1 className="mt-4 font-display text-2xl font-extrabold">
            {p.name} {p.emoji}
          </h1>

          <div className="mt-6 rounded-2xl bg-accent/60 p-4 text-left">
            <p className="text-sm font-bold">📍 Malipo</p>
            <p className="text-sm text-muted-foreground">
              📍 Unapata kwa kuchat na {p.name}
            </p>
            <p className="mt-2 font-display text-3xl font-extrabold text-price">
              TZS {fmtTZS(tzsFor(p.minutes))}
            </p>
            <p className="mt-1 text-sm">Muda: {p.minutes} dakika</p>
            <p className="mt-3 text-sm">
              {p.name} anataka: <strong>{p.wants}</strong>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Ukichat naye kwa muda uliopangwa, utalipwa kiasi hicho.
            </p>
          </div>

          <div className="mt-6 grid gap-3">
            <a
              href={REGISTER_URL}
              className="rounded-full bg-success px-5 py-3 text-sm font-bold text-success-foreground"
            >
              📝 Jisajili Ili Kuendelea
            </a>
            <a
              href={CHANNEL_URL}
              className="rounded-full bg-gold px-5 py-3 text-sm font-bold text-gold-foreground"
            >
              📢 Jiunge na Channel
            </a>
            <Link
              to="/"
              className="rounded-full border border-border px-5 py-3 text-sm font-bold"
            >
              🔙 Rudi Nyumbani
            </Link>
          </div>

          <p className="mt-5 text-xs text-muted-foreground">
            * Unahitaji kujisajili ili kuendelea na mazungumzo
          </p>
        </div>
      </main>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Wasiliana nasi WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-success text-2xl text-success-foreground shadow-xl blink-ring transition-transform duration-200 hover:scale-110"
      >
        💬
      </a>
    </div>
  );
}
