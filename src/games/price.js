// ============================================================
// Price Guess — market & value knowledge.
// Approximate retail/street prices (2024-era USD). Proximity
// counts: the nearest band still scores partial points.
// ============================================================

import { WATCHES, watchLabel, formatPrice, priceOptionBands } from "../data/watches.js";
import { renderWatch } from "../render/watch.js";
import { pickMixing, shuffle } from "../core/select.js";
import { getStat, recordGame, levelFromXp } from "../core/state.js";
import { clear, el, header, intro, resultsPanel } from "../core/ui.js";
import { GAME_BY_ID } from "./common.js";

const META = GAME_BY_ID.price;

function makeRound(level) {
  const pool = WATCHES.map((w) => ({ id: w.id, w, difficulty: w.tier }));
  const [sel] = pickMixing(pool, level, 1);
  const w = sel.w;
  const vals = priceOptionBands(w.price); // correct at index 2
  const answer = vals[2];
  const extras = vals.filter((v, i) => i !== 2);
  const entries = shuffle([answer, ...extras.map((v) => ({ v }))]).map((e) => e.v ?? e);
  const sorted = [...entries].sort((a, b) => b - a);
  const correctPos = sorted.indexOf(answer);
  return {
    w,
    diff: Math.max(1, Math.min(5, w.tier)),
    entries: sorted,
    answer,
    correctPos,
  };
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

  const pillRow = el("div", "pill-row");
  s.append(pillRow);
  const card = el("div", "q-card");
  s.append(card);

  function pills() {
    pillRow.innerHTML = `
      <span class="pill">Score <b>${score.toLocaleString()}</b></span>
      <span class="pill">Watch <b>${idx + 1}/${rounds.length}</b></span>
      <span class="pill">Level <b>${level}</b></span>
    `;
  }

  function ask() {
    const r = rounds[idx];
    pills();
    const t0 = performance.now();
    card.innerHTML = `
      <p class="q-prompt">How much does this watch go for?</p>
      <p class="q-context">Approximate <b>${r.w.priceType === "street" ? "street" : "retail"}</b> price, USD, 2024-era. Pick the closest band.</p>
      <div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap;margin-bottom:10px">
        <div style="width:150px;flex-shrink:0"><div class="visual-stage" style="min-height:150px;padding:8px" data-stage></div></div>
        <div style="flex:1;min-width:220px">
          <p class="q-context" style="margin:0"><b>${watchLabel(r.w)}</b></p>
        </div>
      </div>
      <div class="options" data-options></div>
      <div class="feedback" data-feedback></div>
      <div class="btn-row" style="display:none" data-next-row>
        <button class="btn btn-primary" data-next>Next watch →</button>
      </div>
    `;
    card.querySelector("[data-stage]").innerHTML = renderWatch(r.w, { mode: "full" });
    const optBox = card.querySelector("[data-options]");
    const letters = "ABCD";
    r.entries.forEach((v, i) => {
      const b = el("button", "option", `<span class="opt-key">${letters[i]}</span>≈ ${formatPrice(v)}`);
      b.dataset.v = v;
      b.addEventListener("click", () => {
        if (r.answered) return;
        r.answered = true;
        const elapsed = (performance.now() - t0) / 1000;
        const dist = Math.abs(r.entries.indexOf(v) - r.correctPos);
        const right = dist === 0;
        if (right) correct++;
        optBox.querySelectorAll(".option").forEach((bb) => {
          bb.disabled = true;
          if (Number(bb.dataset.v) === r.answer) bb.classList.add("correct");
          if (bb === b && !right) bb.classList.add("wrong");
        });
        const factors = [100, 65, 35, 10];
        let pts = factors[Math.min(dist, 3)] * r.diff;
        if (right && elapsed < 10) pts += Math.round(35 * (1 - elapsed / 10));
        score += pts;
        const marketNote = r.w.priceType === "street"
          ? ` (${r.w.nickname ? `the ${r.w.nickname}` : "it's"} discontinued, so this is a street price)`
          : "";
        card.querySelector("[data-feedback]").innerHTML =
          `<span class="${right ? "good" : "bad"}">${right ? "Spot on." : dist === 1 ? "Close." : "Not quite."}</span> ` +
          `<span style="color:var(--text-dim)">≈ ${formatPrice(r.w.price)}${marketNote}.</span> +${pts} points<br/>` +
          `<span style="color:var(--text-faint);font-size:.88rem">${r.w.fact}</span>`;
        const row = card.querySelector("[data-next-row]");
        row.style.display = "";
        row.querySelector("[data-next]").textContent = idx === rounds.length - 1 ? "See results →" : "Next watch →";
        row.querySelector("[data-next]").addEventListener("click", next);
      });
      optBox.append(b);
    });
  }

  function next() {
    idx++;
    if (idx >= rounds.length) {
      const rec = recordGame(META.id, { score, correct, answered: rounds.length, rounds: rounds.length, xp: score });
      resultsPanel(mount, META, { score, correct, answered: rounds.length, ...rec }, () => open(mount, onExit));
      return;
    }
    ask();
  }

  ask();
}