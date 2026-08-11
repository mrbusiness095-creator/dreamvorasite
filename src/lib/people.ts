export type Person = {
  name: string;
  emoji: string;
  img: number;
  rating: number;
  minutes: number;
  wants: string;
};

const raw: Array<[string, string, number, number, number, string]> = [
  ["Harper", "🎧", 20, 4.6, 34, "Casual Audio & Chat Practice"],
  ["William", "⚽", 3, 4.8, 55, "Sports & Football Chat"],
  ["Emily", "🏖️", 24, 4.8, 37, "Vacation & Beach Chat"],
  ["Ava", "☕", 12, 4.7, 33, "Friendly Daily Chat"],
  ["Scarlett", "🎬", 38, 5.0, 55, "Movies & Entertainment"],
  ["Olivia", "✈️", 4, 4.9, 38, "Learn Culture & Travel Tips"],
  ["Christopher", "🛠️", 15, 4.8, 56, "Engineering & Construction"],
  ["Elizabeth", "📜", 26, 4.9, 46, "Swahili History & Stories"],
  ["Joshua", "📖", 25, 4.7, 30, "Reading & Books in Swahili"],
  ["Sophia", "🎵", 45, 4.9, 41, "Music & Bongo Flava"],
  ["Daniel", "💼", 11, 4.6, 52, "Business & Online Hustle"],
  ["Chloe", "🍲", 47, 4.8, 36, "Cooking & Local Food"],
  ["Michael", "🚗", 13, 4.7, 48, "Cars & Road Trips"],
  ["Grace", "🧘", 32, 4.9, 31, "Wellness & Daily Motivation"],
  ["Ethan", "🎮", 8, 4.5, 44, "Gaming & Tech Talk"],
  ["Isabella", "📸", 49, 5.0, 50, "Photography & Lifestyle"],
  ["Noah", "🐘", 7, 4.7, 39, "Safari & Wildlife Stories"],
  ["Mia", "💃", 41, 4.8, 35, "Dance & Culture Exchange"],
  ["James", "🏀", 33, 4.6, 43, "Basketball & Fitness"],
  ["Amelia", "🌸", 27, 4.9, 47, "Gardening & Slow Living"],
  ["Benjamin", "📈", 51, 4.7, 54, "Investing & Savings Tips"],
  ["Lily", "🎨", 44, 4.8, 32, "Art & Creative Chat"],
  ["Henry", "🎣", 52, 4.6, 45, "Fishing & Coastal Life"],
  ["Zoe", "🛍️", 29, 4.9, 40, "Shopping & Fashion"],
  ["Samuel", "🎤", 54, 4.7, 53, "Podcast & Public Speaking"],
  ["Nora", "🐶", 30, 4.8, 33, "Pets & Family Life"],
  ["Lucas", "🌍", 59, 4.9, 49, "Travel & Languages"],
  ["Ruby", "☀️", 21, 4.6, 37, "Morning Talk & Positivity"],
  ["Oliver", "🏗️", 60, 4.8, 57, "Projects & Construction"],
  ["Hannah", "📚", 9, 4.9, 42, "Study Tips & English"],
  ["Jack", "🍕", 65, 4.7, 34, "Food & Restaurants"],
  ["Stella", "🌙", 43, 5.0, 51, "Late Night Deep Talk"],
  ["Leo", "🚴", 68, 4.6, 38, "Cycling & Outdoors"],
  ["Ella", "💬", 5, 4.8, 46, "Language Exchange"],
  ["Adam", "🧑‍💻", 56, 4.7, 55, "Freelancing Online"],
  ["Maya", "🌺", 16, 4.9, 36, "Culture & Kiswahili"],
];

export const people: Person[] = raw.map(([name, emoji, img, rating, minutes, wants]) => ({
  name,
  emoji,
  img,
  rating,
  minutes,
  wants,
}));

export const tzsFor = (minutes: number) => minutes * 1000 - 1500;
export const usdFor = (minutes: number) => tzsFor(minutes) / 2500;

export const findPerson = (name: string) =>
  people.find((p) => p.name.toLowerCase() === name.toLowerCase());

export const REGISTER_URL = "https://kozenasite.site/register?ref=Salma255";
export const WHATSAPP_NUMBER = "0612820109";
export const WHATSAPP_URL = "https://wa.me/255612820109";
export const CHANNEL_URL =
  "https://chat.whatsapp.com/HJR16xnRf53J54yvIrIJwA?s=cl&p=a&ilr=4";

export const fmtTZS = (n: number) => n.toLocaleString("en-US");
