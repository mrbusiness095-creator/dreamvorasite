import { useState } from "react";
import { CHANNEL_URL } from "@/lib/people";

const AGENT_IMAGE = "https://randomuser.me/api/portraits/women/44.jpg";
const SMS_URL = "sms:0743871339?body=Nielekeze%20kuhusu%20DreamChat";

export default function CustomerService() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Customer service"
        className="fixed bottom-24 right-5 z-40 flex items-center gap-2 rounded-full border-2 border-gold bg-card px-3 py-2 shadow-xl transition-transform hover:scale-105"
      >
        <img src={AGENT_IMAGE} alt="Customer service" className="h-10 w-10 rounded-full border-2 border-success object-cover" />
        <span className="text-left text-xs font-extrabold">Customer service</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[75] flex items-end justify-center bg-foreground/60 px-4 pb-5 sm:items-center">
          <div className="w-full max-w-sm rounded-3xl bg-card p-5 shadow-2xl">
            <div className="flex items-center gap-3">
              <img src={AGENT_IMAGE} alt="Customer service" className="h-14 w-14 rounded-full border-2 border-gold object-cover" />
              <div>
                <p className="text-xs font-bold text-success">Customer service</p>
                <h2 className="font-display text-lg font-extrabold">Tunakusaidia 😊</h2>
              </div>
              <button onClick={() => setOpen(false)} className="ml-auto rounded-full px-2 text-muted-foreground" aria-label="Funga">✕</button>
            </div>

            <div className="mt-5 grid gap-3">
              <a
                href={SMS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-border p-4 text-left transition-colors hover:bg-accent"
              >
                <p className="font-extrabold">1. Normal SMS</p>
                <p className="mt-1 text-sm text-muted-foreground">0743871339</p>
                <p className="mt-1 text-xs text-success">Pre text: “Nielekeze kuhusu DreamChat”</p>
              </a>
              <a
                href={CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-success p-4 text-left font-extrabold text-success-foreground"
              >
                2. Join Channel
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
