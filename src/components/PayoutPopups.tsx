import { useEffect, useState } from "react";

type Payout = {
  name: string;
  city: string;
  amount: number;
  text: string;
  seed: string;
};

const NAMES = [
  ["Neema Mwaikambo", "Dar es Salaam"],
  ["Baraka Msigwa", "Mbeya"],
  ["Zawadi Kimaro", "Moshi"],
  ["Juma Ally", "Zanzibar"],
  ["Rehema Mnyika", "Arusha"],
  ["Frank Mushi", "Dodoma"],
  ["Asha Mbwana", "Tanga"],
  ["Emmanuel Ngowi", "Morogoro"],
  ["Happiness Lyimo", "Mwanza"],
  ["Salum Rashidi", "Kigoma"],
  ["Doreen Kavishe", "Iringa"],
  ["Kelvin Mwakalinga", "Songea"],
  ["Grace Nyerere", "Musoma"],
  ["Hassan Juma", "Mtwara"],
  ["Upendo Sanga", "Njombe"],
  ["Deogratius Massawe", "Bukoba"],
];

const TEXTS = [
  "Nimelipwa leo baada ya kuchat na mzungu kwa dakika 45 🙏",
  "Malipo yangu yameingia M-Pesa ndani ya dakika 10 ✅",
  "Nilianza na chat 3 tu, leo nimetoa hela yangu 💸",
  "Kila siku napata kipato kwa kuchat na wageni 🌍",
  "Nimelipwa mara ya tatu wiki hii, DreamChat ni halali 💯",
  "Nashukuru DreamChat, nimelipia ada ya chuo 🎓",
  "Withdraw imefanikiwa, Tigo Pesa imepokea 👌",
  "Kuchat kwa Kiingereza rahisi kunanilipa vizuri 😍",
];

const AMOUNTS = [
  18500, 24000, 31500, 42000, 55000, 68500, 74000, 89000, 96500, 120000,
];

const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)]!;

const makePayout = (): Payout => {
  const [name, city] = pick(NAMES);
  return {
    name: name!,
    city: city!,
    amount: pick(AMOUNTS),
    text: pick(TEXTS),
    seed: `${name}-${Math.floor(Math.random() * 1000)}`,
  };
};

const playToastSound = () => {
  try {
    const audio = new Audio("/notification.wav");
    audio.volume = 1;
    audio.currentTime = 0;
    void audio.play();
    if (navigator.vibrate) navigator.vibrate([60, 40, 90]);
  } catch {
    // Mobile browsers may require a prior user gesture before audio playback.
  }
};

const unlockNotificationSound = () => {
  try {
    const audio = new Audio("/notification.wav");
    audio.volume = 0;
    const promise = audio.play();
    if (promise) {
      promise.then(() => {
        audio.pause();
        audio.currentTime = 0;
      }).catch(() => {});
    }
  } catch {
    // Ignore browsers that block autoplay.
  }
};

export default function PayoutPopups() {
  const [item, setItem] = useState<Payout | null>(null);


  useEffect(() => {
    window.addEventListener("pointerdown", unlockNotificationSound, { once: true });
    window.addEventListener("touchstart", unlockNotificationSound, { once: true, passive: true });

    let hideTimer: ReturnType<typeof setTimeout>;
    let nextTimer: ReturnType<typeof setTimeout>;

    const cycle = () => {
      setItem(makePayout());
      playToastSound();
      hideTimer = setTimeout(() => {
        setItem(null);
        nextTimer = setTimeout(cycle, 4000 + Math.random() * 5000);
      }, 6000);
    };

    const start = setTimeout(cycle, 2500);
    return () => {
      window.removeEventListener("pointerdown", unlockNotificationSound);
      window.removeEventListener("touchstart", unlockNotificationSound);
      clearTimeout(start);
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, []);

  if (!item) return null;

  return (
    <div className="pointer-events-none fixed left-1/2 top-20 z-[60] w-[92%] max-w-sm -translate-x-1/2">
      <div className="pointer-events-auto flex items-start gap-3 rounded-2xl border-2 border-gold bg-card p-3 shadow-2xl shadow-foreground/20">
        <img
          src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(
            item.seed,
          )}&skinColor=614335,ae5d29&backgroundColor=ffdfbf,d1d4f9,c0aede`}
          alt={`Picha ya ${item.name}`}
          loading="lazy"
          className="h-11 w-11 shrink-0 rounded-full border-2 border-success bg-accent object-cover"
        />
        <div className="min-w-0">
          <p className="font-display text-sm font-extrabold leading-tight">
            {item.name}{" "}
            <span className="text-[11px] font-medium text-muted-foreground">
              • {item.city}
            </span>
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">{item.text}</p>
          <p className="mt-1 text-sm font-extrabold text-success">
            💰 Amelipwa TZS {item.amount.toLocaleString("en-US")}
          </p>
        </div>
        <button
          onClick={() => setItem(null)}
          aria-label="Funga taarifa ya malipo"
          className="ml-auto shrink-0 rounded-full px-2 text-sm text-muted-foreground"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
