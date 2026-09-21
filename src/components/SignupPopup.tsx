import { REGISTER_URL } from "@/lib/people";

type SignupPopupProps = {
  open: boolean;
  onClose: () => void;
};

export default function SignupPopup({ open, onClose }: SignupPopupProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-foreground/70 px-5 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl border-2 border-gold bg-card p-6 text-center shadow-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-3xl">🎉</div>
        <h2 className="mt-4 font-display text-xl font-extrabold">HONGERA KWA KUCHAGUA FURSA HII</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Jisajili Sasa na Activate Account Yako kwa Mtaji wa <strong className="text-foreground">16,000 Tzs Tu</strong>. Ili kuweza Kuendelea Kuchat na Kulipwa
        </p>
        <div className="mt-6 grid gap-3">
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="rounded-full bg-success px-5 py-3 text-sm font-extrabold text-success-foreground shadow-lg"
          >
            JISAJILI
          </a>
          <button
            onClick={onClose}
            className="rounded-full border border-border px-5 py-3 text-sm font-bold"
          >
            Rudi nyuma
          </button>
        </div>
      </div>
    </div>
  );
}
