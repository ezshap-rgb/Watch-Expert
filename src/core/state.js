// ============================================================
// Per-game stats — each mini-game keeps its own score history.
// No global mastery system yet (that's a later phase by design).
// ============================================================

const KEY = "wkg:v1";

// cumulative XP thresholds for levels 1..10
const LEVEL_XP = [0, 1000, 2400, 4200, 6400, 9000, 12200, 16000, 20400, 25500];

function empty() {
  return { games: 0, bestScore: 0, lastScore: 0, bestStreak: 0, curStreak: 0, correct: 0, answered: 0, xp: 0 };
}

let store = null;

function load() {
  if (store) return store;
  try {
    store = JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    store = {};
  }
  return store;
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(store));
  } catch {
    /* storage unavailable — play session only */
  }
}

export function getStat(gameId) {
  const s = load();
  if (!s[gameId]) s[gameId] = empty();
  return { ...s[gameId] };
}

export function levelFromXp(xp) {
  let lvl = 1;
  for (let i = 0; i < LEVEL_XP.length; i++) if (xp >= LEVEL_XP[i]) lvl = i + 1;
  return lvl;
}

export function xpIntoLevel(xp) {
  const lvl = levelFromXp(xp);
  const base = LEVEL_XP[lvl - 1];
  const next = LEVEL_XP[lvl] || base + 3000;
  return { lvl, frac: (xp - base) / (next - base), next };
}

export function recordGame(gameId, { score, correct, answered, rounds, xp }) {
  const s = load();
  if (!s[gameId]) s[gameId] = empty();
  const g = s[gameId];
  const before = levelFromXp(g.xp);
  g.games += 1;
  g.lastScore = score;
  if (score > g.bestScore) g.bestScore = score;
  g.correct += correct;
  g.answered += answered;
  g.xp += xp;
  const accuracy = answered > 0 ? correct / answered : 0;
  g.curStreak = accuracy >= 0.4 ? g.curStreak + 1 : 0;
  if (g.curStreak > g.bestStreak) g.bestStreak = g.curStreak;
  const after = levelFromXp(g.xp);
  persist();
  return {
    before,
    after,
    leveledUp: after > before,
    leveledUpTo: after,
  };
}

export function allStats() {
  const s = load();
  const out = {};
  for (const k of Object.keys(s)) out[k] = { ...s[k] };
  return out;
}