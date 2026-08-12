export type ScriptTurn = { ask: string; hint: string; reply: string };

const SCRIPTS: ScriptTurn[][] = [
  [
    {
      ask: "Hi! I'm learning Swahili 😊 How can you say THANK YOU?",
      hint: "ASANTE",
      reply: "Oh, ASANTE! That's nice 😍 I'll use it today.",
    },
    {
      ask: "Nice! And how do I say GOOD MORNING?",
      hint: "HABARI YA ASUBUHI",
      reply: "HABARI YA ASUBUHI 🌞 Wow, Swahili sounds beautiful!",
    },
    {
      ask: "Last one for now — how can I say I LOVE YOUR COUNTRY?",
      hint: "NAIPENDA NCHI YAKO",
      reply: "NAIPENDA NCHI YAKO ❤️ You're a great teacher, let's keep chatting!",
    },
  ],
  [
    {
      ask: "Hey! I'm flying to Zanzibar next month ✈️ How do I say WELCOME?",
      hint: "KARIBU",
      reply: "KARIBU! I already feel at home 😄",
    },
    {
      ask: "And how do I ask HOW MUCH IS THIS? at the market?",
      hint: "BEI GANI",
      reply: "BEI GANI 💸 Perfect, no one will overcharge me now!",
    },
    {
      ask: "One more — how do I say SEE YOU TOMORROW?",
      hint: "TUTAONANA KESHO",
      reply: "TUTAONANA KESHO 🙌 You explain so clearly!",
    },
  ],
  [
    {
      ask: "Hello from London 🇬🇧 My friend said HABARI to me. What does it mean?",
      hint: "HABARI = HELLO / HOW ARE YOU",
      reply: "Ahh so HABARI means hello 😅 I answered totally wrong yesterday!",
    },
    {
      ask: "So how should I reply when someone says HABARI?",
      hint: "NZURI",
      reply: "NZURI 👌 Short and easy, I love it.",
    },
    {
      ask: "And how do I say MY NAME IS...?",
      hint: "JINA LANGU NI",
      reply: "JINA LANGU NI 😍 I can introduce myself now, asante sana!",
    },
  ],
  [
    {
      ask: "Hi 👋 I love Bongo Flava! How do I say I LIKE THIS SONG?",
      hint: "NAIPENDA WIMBO HUU",
      reply: "NAIPENDA WIMBO HUU 🎶 I'm writing this down!",
    },
    {
      ask: "How about GOOD NIGHT?",
      hint: "USIKU MWEMA",
      reply: "USIKU MWEMA 🌙 So sweet in Swahili.",
    },
    {
      ask: "And how do I say YOU ARE MY FRIEND?",
      hint: "WEWE NI RAFIKI YANGU",
      reply: "WEWE NI RAFIKI YANGU 🤝 Honestly, you're the best teacher here!",
    },
  ],
  [
    {
      ask: "Hey there 🙂 I'm hungry — how do I say I AM HUNGRY?",
      hint: "NINA NJAA",
      reply: "NINA NJAA 😂 I said it and my friend laughed, it worked!",
    },
    {
      ask: "How do I order WATER, PLEASE?",
      hint: "MAJI TAFADHALI",
      reply: "MAJI TAFADHALI 💧 Nice, very useful.",
    },
    {
      ask: "Last one — how do I say THE FOOD IS DELICIOUS?",
      hint: "CHAKULA KITAMU",
      reply: "CHAKULA KITAMU 😋 Now I'm ready for Tanzania!",
    },
  ],
  [
    {
      ask: "Hello! 😄 I work online. How do I say I AM WORKING?",
      hint: "NINAFANYA KAZI",
      reply: "NINAFANYA KAZI 💻 Great, that's easy to remember.",
    },
    {
      ask: "How do I say PLEASE HELP ME?",
      hint: "TAFADHALI NISAIDIE",
      reply: "TAFADHALI NISAIDIE 🙏 Very polite, I like it.",
    },
    {
      ask: "And how do I say I UNDERSTAND?",
      hint: "NIMEELEWA",
      reply: "NIMEELEWA ✅ You teach better than my app!",
    },
  ],
  [
    {
      ask: "Jambo! 🐘 I'm planning a safari. How do I say LET'S GO?",
      hint: "TWENDE",
      reply: "TWENDE 🚙 That word sounds so fun!",
    },
    {
      ask: "How do I say IT IS BEAUTIFUL?",
      hint: "NI NZURI SANA",
      reply: "NI NZURI SANA 😍 Perfect for the sunset photos.",
    },
    {
      ask: "One more — how do I say I WILL COME BACK?",
      hint: "NITARUDI",
      reply: "NITARUDI ❤️ Definitely coming back, and we keep chatting!",
    },
  ],
  [
    {
      ask: "Hi 😊 How do I ask WHAT IS YOUR NAME?",
      hint: "JINA LAKO NANI",
      reply: "JINA LAKO NANI 🤗 Cool, I asked my neighbour already!",
    },
    {
      ask: "How do I say I AM HAPPY?",
      hint: "NINA FURAHA",
      reply: "NINA FURAHA 😃 Yes, I really am today!",
    },
    {
      ask: "And how do I say TALK TO YOU LATER?",
      hint: "TUTAONGEA BAADAYE",
      reply: "TUTAONGEA BAADAYE 👏 Asante, this chat was worth it!",
    },
  ],
  [
    {
      ask: "Hello 🌍 My teacher said POLE. Why?",
      hint: "POLE = SORRY / SYMPATHY",
      reply: "Ohh POLE means sorry 🥺 That's so kind of Swahili people.",
    },
    {
      ask: "How do I say NO PROBLEM?",
      hint: "HAKUNA SHIDA",
      reply: "HAKUNA SHIDA 😎 Almost like Hakuna Matata!",
    },
    {
      ask: "Last one — how do I say YOU ARE VERY KIND?",
      hint: "WEWE NI MKARIMU SANA",
      reply: "WEWE NI MKARIMU SANA 🌟 Truly, thank you for your time!",
    },
  ],
  [
    {
      ask: "Hi 👋 How do I say I AM LEARNING SWAHILI?",
      hint: "NINAJIFUNZA KISWAHILI",
      reply: "NINAJIFUNZA KISWAHILI 📚 I feel proud saying it!",
    },
    {
      ask: "How do I say SPEAK SLOWLY, PLEASE?",
      hint: "ONGEA POLEPOLE TAFADHALI",
      reply: "ONGEA POLEPOLE TAFADHALI 🐢 Ha! I'll need that a lot.",
    },
    {
      ask: "And how do I say I MISS YOU?",
      hint: "NAKUMISS / NINAKUKUMBUKA",
      reply: "NINAKUKUMBUKA 💖 Let's keep chatting every day!",
    },
  ],
  [
    {
      ask: "Hey 😄 I do business online. How do I say GOOD PRICE?",
      hint: "BEI NZURI",
      reply: "BEI NZURI 💰 Noted, that's my new favourite word.",
    },
    {
      ask: "How do I say LET US MEET?",
      hint: "TUKUTANE",
      reply: "TUKUTANE 🤝 Sounds like a deal!",
    },
    {
      ask: "Last one — how do I say I TRUST YOU?",
      hint: "NAKUAMINI",
      reply: "NAKUAMINI 🙌 Great chatting with you, keep it up!",
    },
  ],
  [
    {
      ask: "Hello 🌸 How do I say GOOD AFTERNOON?",
      hint: "HABARI YA MCHANA",
      reply: "HABARI YA MCHANA ☀️ Beautiful greeting!",
    },
    {
      ask: "How do I say I AM FROM AMERICA?",
      hint: "NINATOKA MAREKANI",
      reply: "NINATOKA MAREKANI 🇺🇸 I said it out loud, felt great!",
    },
    {
      ask: "And how do I say TEACH ME MORE?",
      hint: "NIFUNDISHE ZAIDI",
      reply: "NIFUNDISHE ZAIDI 🥰 Please don't stop teaching me!",
    },
  ],
];

const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
};

export const scriptFor = (name: string): ScriptTurn[] =>
  SCRIPTS[hash(name) % SCRIPTS.length]!;
