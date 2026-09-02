// ============================================================
// Mini-game registry — one entry per genuinely different skill.
// This is the hub's source of truth for names, skill labels and
// per-game flavour verdicts.
// ============================================================

export const GAMES = [
  {
    id: "guess",
    name: "Guess the Watch",
    icon: "⌚",
    skill: "Visual recognition",
    desc: "Identify watches from full views, silhouettes, dials, macro crops and blurry progressive reveals.",
    rounds: 8,
    maxDifficulty: 5,
    verdicts: {
      0.9: "Photographic Memory",
      0.75: "Master Identifier",
      0.6: "Sharp-Eyed Collector",
      0.4: "Working Observer",
    },
  },
  {
    id: "timeline",
    name: "Watch Timeline",
    icon: "📜",
    skill: "History & chronology",
    desc: "Put iconic moments of horological history in order — from the first self-winding watch to the quartz crisis.",
    rounds: 5,
    maxDifficulty: 5,
    verdicts: {
      0.9: "Horological Historian",
      0.75: "Time Traveler",
      0.6: "Chronology Keeper",
      0.4: "Casual Student",
    },
  },
  {
    id: "movement",
    name: "Movement Master",
    icon: "⚙️",
    skill: "Movements & mechanics",
    desc: "Quartz vs mechanical, column wheels vs cams, ébauches vs manufacture calibres, calibres and their makers.",
    rounds: 8,
    maxDifficulty: 5,
    verdicts: {
      0.9: "Calibre Doctor",
      0.75: "Master Watchmaker",
      0.6: "Movement Fanatic",
      0.4: "Tinkering Enthusiast",
    },
  },
  {
    id: "spec",
    name: "What's the Spec?",
    icon: "📏",
    skill: "Specification recall",
    desc: "Recall water resistance, power reserve, case size and movement type for real watches — against real numbers.",
    rounds: 8,
    maxDifficulty: 5,
    verdicts: {
      0.9: "Spec Librarian",
      0.75: "Reference Book",
      0.6: "Numbers Keeper",
      0.4: "Approximate Expert",
    },
  },
  {
    id: "price",
    name: "Price Guess",
    icon: "💵",
    skill: "Market & value",
    desc: "Guess approximate retail or street prices. Proximity counts: the closer you land, the more you score.",
    rounds: 6,
    maxDifficulty: 5,
    verdicts: {
      0.9: "Market Oracle",
      0.75: "Auctioneer",
      0.6: "Sober Negotiator",
      0.4: "Window Shopper",
    },
  },
  {
    id: "imposter",
    name: "Spot the Imposter",
    icon: "🎯",
    skill: "Discrimination",
    desc: "Four watches, one breaks the rule. Find the imposter — sometimes by look, sometimes by spec.",
    rounds: 8,
    maxDifficulty: 5,
    verdicts: {
      0.9: "Grand Detective",
      0.75: "Inspector",
      0.6: "Skeptic",
      0.4: "Trusting Soul",
    },
  },
];

export const GAME_BY_ID = Object.fromEntries(GAMES.map((g) => [g.id, g]));

export function verdictFor(meta, pct) {
  const keys = Object.keys(meta.verdicts).map(Number).sort((a, b) => b - a);
  for (const k of keys) if (pct >= k) return meta.verdicts[k];
  return "Novice";
}

export const SKILL_EXPLAIN = {
  guess:
    "Each round shows one watch — full photo, silhouette, dial-only, a macro crop, or a blurry reveal that sharpens over time. Pick which watch it is. Obscure references and look-alike distractors raise the difficulty.",
  timeline:
    "Each round gives you four events in watch history. Tap them in chronological order — earliest first. The further apart the years, the easier it is.",
  movement:
    "Mechanics, movements and calibres. Questions range from 'is it quartz or mechanical?' to exotic manufacture calibres and their heritage.",
  spec:
    "Given a watch, recall a real specification: water resistance, power reserve, case size or movement type. The distractor options are real values from other watches — so guessing beats remembering nothing.",
  price:
    "Approximate retail/street prices (2024-era, USD). You pick the closest band; scoring falls off with distance, and you get the full story after each answer.",
  imposter:
    "Four items share a rule — three obey it, one doesn't. Verbal rounds are about consistency of specs; visual rounds are about what your eye catches.",
};