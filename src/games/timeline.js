// ============================================================
// Watch Timeline — historical knowledge.
// Order four events chronologically by tapping earliest → latest.
// Year clustering (e.g., the 1969 triple-tie) adds the challenge.
// ============================================================

import { TIMELINE_EVENTS } from "../data/watches.js";
import { shuffle } from "../core/select.js";
import { getStat, recordGame, levelFromXp } from "../core/state.js";
import { clear, el, header, metaRow, intro, resultsPanel } from "../core/ui.js";
import { GAME_BY_ID } from "./common.js";

const META = GAME_BY_ID.timeline;

function minGap(evs) {
  const yrs = evs.map((e) => e.year).sort((a, b) => a - b);
  let gap = Infinity;
  for (let i = 1; i < yrs.length; i++) gap = Math.min(gap, yrs[i] - yrs[i - 1]);
  return gap;
}

function makeRound(level) {
  const pool = TIMELINE_EVENTS.map((e, i) => ({ id: String(i), e, difficulty: e.tier }));
  // try a few times to land a round with some year-clustering tension
  let evs = null;
  for (let attempt = 0; attempt < 6; attempt++) {
    const picked = [];
    const seen = new Set();
    while (picked.length < 4) {
      const idx = Math.floor(Math.random() * pool.length);
      if (seen.has(idx)) continue;
      seen.add(idx);
      picked.push(pool[idx].e);
    }
    if (attempt < 5 && minGap(picked) > 14) continue;
    evs = picked;
    break;
  }
  evs = evs || shuffle(TIMELINE_EVENTS).slice(0, 4);
  const sorted = [...evs].sort((a, b) => a.year - b.year);
  const gap = minGap(evs);
  const tierAvg = Math.round(evs.reduce((a, e) => a + e.tier, 0) / 4);
  const diff = Math.max(1, Math.min(5, tierAvg + (gap <= 5 ? 1 : 0)));
  return { events: shuffle(evs), sorted, diff, gap };
}

export function open(mount, onExit) {
  const stat = getStat(META.id);
  const level = Math.max(1, levelFromXp(stat.xp));
  intro(mount, META, () => play(mount, onExit, level));
}

function play(mount, onExit, level) {
  clear(mount);
  const s = el("div", "screen");
  mount.append(s);
  s.append(header(META, { right: `Skill · ${META.skill}` }));
  const rounds = [];
  for (let i = 0; i < META.rounds; i++) rounds.push(makeRound(level));

  let idx = 0;
  let score = 0;
  let correct = 0;
  const startAll = performance.now();

  const pillRow = el("div", "pill-row");
  s.append(pillRow);
  const card = el("div", "q-card");
  s.append(card);

  function pills() {
    pillRow.innerHTML = `
      <span class="pill">Score <b>${score.toLocaleString()}</b></span>
      <span class="pill">Round <b>${idx + 1}/${rounds.length}</b></span>
      <span class="pill">Level <b>${level}</b></span>
    `;
  }

  function roundStart() {
    const r = rounds[idx];
    pills();
    r.t0 = performance.now();
    r.taps = [];
    card.innerHTML = `
      <p class="q-prompt">Put these in chronological order — earliest first.</p>
      <p class="q-context">Tap the events in order: 1 → 2 → 3 → 4. Tapping assigns the next number.</p>
      <div class="chrono-list" data-list></div>
      <div class="feedback" data-feedback></div>
      <div class="btn-row" style="display:none" data-next-row>
        <button class="btn btn-primary" data-next>Next round →</button>
      </div>
    `;
    const list = card.querySelector("[data-list]");
    r.events.forEach((ev, i) => {
      const item = el("div", "chrono-item", `
        <span class="num">·</span>
        <span class="ev-name">${ev.name}</span>
      `);
      item.dataset.i = i;
      item.addEventListener("click", () => tap(r, item, i));
      list.append(item);
    });
  }

  function tap(r, item, i) {
    if (r.done || r.taps.includes(i)) return;
    r.taps.push(i);
    item.classList.add("chosen");
    item.querySelector(".num").textContent = r.taps.length;
    const feed = card.querySelector("[data-feedback]");
    if (r.taps.length < 4) {
      feed.innerHTML = `Pick the <b>${ordinal(r.taps.length + 1)}</b> event…`;
    } else {
      reveal(r);
    }
  }

  function reveal(r) {
    r.done = true;
    const elapsed = (performance.now() - r.t0) / 1000;
    const list = card.querySelector("[data-list]");
    // lock all items
    list.querySelectorAll(".chrono-item").forEach((it) => (it.style.cursor = "default"));
    // reveal years on all items
    r.sorted.forEach((ev, pos) => {
      const item = list.querySelector(`[data-i="${r.events.indexOf(ev)}"]`);
      if (!item) return;
      const year = item.querySelector(".ev-year") || el("span", "ev-year");
      year.textContent = ev.year;
      item.append(year);
    });
    // score
    let posRight = 0;
    r.taps.forEach((tapIdx, pos) => {
      const ev = r.events[tapIdx];
      if (ev === r.sorted[pos]) posRight++;
    });
    const ok = posRight === 4;
    if (ok) correct++;
    let pts = ok ? 70 * 4 : posRight * 55;
    if (ok && elapsed < 20) pts += 30;
    score += pts;
    const feed = card.querySelector("[data-feedback]");
    feed.innerHTML = ok
      ? `<span class="good">Chronology perfect.</span> +${pts} points. ${r.gap <= 5 ? "Those were hair-raisingly close in time!" : ""}`
      : `<span class="bad">${posRight}/4 in the right position.</span> +${pts} points. Correct order: <b>${r.sorted.map((e) => e.year).join(" → ")}</b>.`;
    const row = card.querySelector("[data-next-row]");
    row.style.display = "";
    row.querySelector("[data-next]").addEventListener("click", next);
    if (idx === rounds.length - 1) row.querySelector("[data-next]").textContent = "See results →";
  }

  function next() {
    idx++;
    if (idx >= rounds.length) {
      const totalTime = (performance.now() - startAll) / 1000;
      const speedStr = ` in ${Math.round(totalTime)}s`;
      const rec = recordGame(META.id, { score, correct, answered: rounds.length, rounds: rounds.length, xp: score });
      resultsPanel(mount, META, { score, correct, answered: rounds.length, ...rec, speedNote: speedStr }, () => open(mount, onExit));
      return;
    }
    roundStart();
  }

  roundStart();
}

function ordinal(n) {
  return ["1st", "2nd", "3rd", "4th"][n - 1] || n;
}