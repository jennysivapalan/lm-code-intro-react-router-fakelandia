export const MISDEMEANOURS = [
  "rudeness",
  "vegetables",
  "lift",
  "united",
] as const;
export type MisdemeanourKind = (typeof MISDEMEANOURS)[number];

export const JUST_TALK = "just-talk";
export type JustTalk = typeof JUST_TALK;

export type Misdemeanour = {
  citizenId: number;
  misdemeanour: MisdemeanourKind;
  date: string; // we'll stringify this for easy sending via HTTP rather than storing the full Date object
};

type MisdemeanourEmojis = {
  misdemeanour: MisdemeanourKind;
  emoji: string;
};
export const EMOJIS: MisdemeanourEmojis[] = [
  { misdemeanour: "rudeness", emoji: "🤪" },
  { misdemeanour: "vegetables", emoji: "🥗" },
  { misdemeanour: "lift", emoji: "🗣" },
  { misdemeanour: "united", emoji: "😈" },
];
