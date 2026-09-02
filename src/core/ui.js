// ============================================================
// Small shared UI kit used by every game screen.
// ============================================================

import { getStat, levelFromXp } from "./state.js";
import { SKILL_EXPLAIN, verdictFor } from "../games/common.js";

export function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  return e;
}

export function clear(root) {
  root.innerHTML = "";
}

export function header(meta, { right = "", onBack } = {}) {
  const h = el("div", "g-header");
  const back = el("button", "back", "← Hub");
  back.addEventListener("click", onBack || (() => location.hash = ""));
  h.append(back);
  h.append(el("h2", "g-title", `${meta.icon} ${meta.name}`));
  if (right) {
    const r = el("div", "g-meta", right);
    h.append(r);
  }
  return h;
}

export function metaRow(parts) {
  return el("div", "pill-row", parts.map((p) => `<span class="pill">${p}</span>`).join(""));
}

export function intro(mount, meta, onStart) {
  clear(mount);
  mount.append(el("div", "screen"));
  const s = mount.lastElementChild;
  s.append(header(meta));
  const card = el("div", "q-card");
  card.innerHTML = `
    <p class="q-prompt">${meta.icon} What's the skill?</p>
    <p class="q-context" style="margin-bottom:18px"><b>${meta.skill}</b> — ${SKILL_EXPLAIN[meta.id]}</p>
    <div class="btn-row">
      <button class="btn btn-primary" data-start>Play ${meta.rounds} rounds</button>
      <button class="btn btn-ghost" data-hub>Back to hub</button>
    </div>
  `;
  s.append(card);
  card.querySelector("[data-start]").addEventListener("click", onStart);
  card.querySelector("[data-hub]").addEventListener("click", () => (location.hash = ""));
}


export function resultsPanel(mount, meta, res, onReplay) {
  clear(mount);
  const s = el("div", "screen");
  mount.append(s);
  const stat = getStat(meta.id);
  const pct = res.answered > 0 ? Math.round((res.correct / res.answered) * 100) : 0;
  const lvl = levelFromXp(stat.xp);
  s.append(header(meta));
  const card = el("div", "q-card results");
  card.innerHTML = `
    <div class="results">
      ${res.leveledUp ? `<span class="level-up">▲ Level up — now level ${res.leveledUpTo}</span>` : ""}
      <div style="color:var(--text-dim);font-size:.9rem">Round over — this game only</div>
      <div class="score-big">${res.score}</div>
      <p class="verdict">${verdictFor(meta, pct / 100)}</p>
      <p class="verdict-tier">${pct}% accuracy · level ${lvl}</p>
      <div class="res-stats">
        <div class="res-stat"><div class="v">${res.correct}/${res.answered}</div><div class="l">Correct</div></div>
        <div class="res-stat"><div class="v">${stat.bestScore}</div><div class="l">Best score</div></div>
        <div class="res-stat"><div class="v">${stat.bestStreak}</div><div class="l">Best streak</div></div>
        <div class="res-stat"><div class="v">${stat.games}</div><div class="l">Games played</div></div>
      </div>
      <div class="btn-row" style="justify-content:center">
        <button class="btn btn-primary" data-replay>Play again</button>
        <button class="btn btn-ghost" data-hub>Back to hub</button>
      </div>
    </div>
  `;
  s.append(card);
  card.querySelector("[data-replay]").addEventListener("click", onReplay);
  card.querySelector("[data-hub]").addEventListener("click", () => (location.hash = ""));
  return card;
}

