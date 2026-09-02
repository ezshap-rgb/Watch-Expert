// ============================================================
// Watch Knowledge Game — entry point & hub.
// ============================================================

import { GAMES } from "./games/common.js";
import { clear, el } from "./core/ui.js";
import { allStats, levelFromXp } from "./core/state.js";

const root = document.getElementById("app");

function statPills(id) {
  const s = allStats()[id];
  if (!s || !s.games) return `<span class="gc-stats"><span>Not played yet</span></span>`;
  return `<span class="gc-stats">
    <span>Best <b>${s.bestScore.toLocaleString()}</b></span>
    <span>Streak <b>${s.bestStreak}</b></span>
    <span>Level <b>${levelFromXp(s.xp)}</b></span>
  </span>`;
}

export function hub() {
  clear(root);
  const s = el("div", "screen");
  s.innerHTML = `
    <h1 class="page-title">Watch Knowledge Game</h1>
    <p class="page-sub">
      A collection of independent mini-games — each one tests a genuinely different watch skill.
      There is no single exam: play what you like, and each game tracks its own progress,
      personal best, streak and level.
    </p>
    <h2 class="section-title">Choose a mini-game</h2>
    <div class="hub-grid">${GAMES.map(
      (g) => `
      <button class="game-card" data-id="${g.id}">
        <span class="gc-icon">${g.icon}</span>
        <p class="gc-name">${g.name}</p>
        <p class="gc-skill">${g.skill}</p>
        <p class="gc-desc">${g.desc}</p>
        ${statPills(g.id)}
      </button>`
    ).join("")}
    </div>
    <h2 class="section-title">Where it's heading</h2>
    <p class="page-sub">
      Later, when the mini-games reveal what genuinely different skills they measure,
      a higher-level <b>Master Watch Challenge</b> will unlock for players who show
      strength across several games: visual recognition, mechanics, history, specs and
      market knowledge — well-rounded mastery, not accumulated points.
    </p>
    <p class="footer-note">Prices are approximate retail/street USD figures (2024-era) and exist purely as game data.</p>
  `;
  root.append(s);

  for (const card of s.querySelectorAll("[data-id]")) {
    card.addEventListener("click", () => startGame(card.dataset.id));
  }
}

export function startGame(id) {
  clear(root);
  const mount = el("div");
  root.append(mount);
  import(`./games/${id}.js`)
    .then((m) => m.open(mount, hub))
    .catch((err) => {
      console.error("Failed to load game", id, err);
      mount.append(el("div", "screen", `<p class="page-sub">Could not load “${id}”. <button class="btn" data-hub>Back</button></p>`));
      mount.querySelector("[data-hub]").addEventListener("click", hub);
    });
}

window.addEventListener("hashchange", () => {
  if (!location.hash) hub();
});

hub();