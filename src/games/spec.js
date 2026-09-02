// ============================================================
// What's the Spec? — specification recall.
// Water resistance, power reserve, case size, movement type.
// Distractor options are REAL values from other watches in the
// database, so this is recall + comparison, not trivia.
// ============================================================

import { WATCHES, watchLabel } from "../data/watches.js";
import { renderWatch } from "../render/watch.js";
import { pickMixing, shuffle } from "../core/select.js";
import { getStat, recordGame, levelFromXp } from "../core/state.js";
import { clear, el, header, intro, resultsPanel } from "../core/ui.js";
import { GAME_BY_ID } from "./common.js";

const META = GAME_BY_ID.spec;

const KIND_LABEL = {
  auto: "Automatic (self-winding)",
  manual: "Hand-wound (manual)",
  quartz: "Quartz (battery)",
  springdrive: "Spring Drive (mechanical + quartz regulator)",
};

const CATS = ["wr", "pr", "size", "type"];

function valueOf(w, cat) {
  switch (cat) {
    case "wr": return { raw: w.case.wr, label: `${w.case.wr} m` };
    case "pr": return { raw: w.movement.pr, label: w.movement.pr == null ? null : `${w.movement.pr} h` };
    case "size": return { raw: w.case.size, label: `${w.case.size} mm` };
    case "type": return { raw: w.movement.kind, label: KIND_LABEL[w.movement.kind] };
  }
}

const CAT_MOD = { type: 0, size: 0.5, pr: 1, wr: 1 };
const CAT_ASK = {
  wr: "water resistance",
  pr: "power reserve",
  size: "case size",
  type: "movement type",
};
const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));

function makeRound(level) {
  const pool = WATCHES.map((w) => ({ id: w.id, w, difficulty: w.tier }));
  const [sel] = pickMixing(pool, level, 1);
  const w = sel.w;
  let cat;
  if (level <= 2 && Math.random() < 0.55) cat = "type";
  else cat = CATS[Math.floor(Math.random() * CATS.length)];
  const ans = valueOf(w, cat);
  if (ans.raw == null) cat = "type"; // skip missing specs (e.g., quartz power reserve)
  const correctVal = valueOf(w, cat);
  const rest = WATCHES.filter((x) => x.id !== w.id);
  const poolVals = shuffle(rest.map((x) => valueOf(x, cat)).filter((v) => v && v.raw != null));
  const opts = new Map();
  opts.set(correctVal.raw, correctVal.label);
  for (const v of poolVals) {
    if (opts.size >= 4) break;
    if (!opts.has(v.raw)) opts.set(v.raw, v.label);
  }
  if (opts.size < 4) {
    // synthetic near-misses so there are always four options
    for (let i = 1; opts.size < 4 && i < 10; i++) {
      const cand = synthetic(cat, correctVal.raw, i);
      if (!opts.has(cand.raw)) opts.set(cand.raw, cand.label);
    }
  }
  const entries = shuffle([...opts.entries()]);
  const diff = clamp(Math.round(w.tier + (CAT_MOD[cat] || 0)), 1, 5);
  return {
    w,
    cat,
    diff,
    correctRaw: correctVal.raw,
    entries, // [[raw, label], ...] shuffled
  };
}

function synthetic(cat, raw, i) {
  if (cat === "type") {
    const kinds = ["auto", "manual", "quartz", "springdrive"];
    const k = kinds[(i - 1 + kinds.length) % kinds.length];
    return { raw: k, label: KIND_LABEL[k] };
  }
  const bumps = [0.6, 0.75, 0.85, 1.15, 1.25, 1.4, 0.5, 1.6];
  const v = raw * bumps[(i * 3) % bumps.length];
  const nice = cat === "size" ? Math.round(v * 10) / 10 : Math.round(v / 10) * 10;
  const unit = cat === "size" ? " mm" : " m";
  return { raw: nice, label: `${nice}${unit}` };
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
      <span class="pill">Question <b>${idx + 1}/${rounds.length}</b></span>
      <span class="pill">Level <b>${level}</b></span>
    `;
  }

  function ask() {
    const r = rounds[idx];
    pills();
    const t0 = performance.now();
    card.innerHTML = `
      <p class="q-prompt">What's the <b>${CAT_ASK[r.cat]}</b> of this watch?</p>
      <div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap;margin-bottom:10px">
        <div style="width:150px;flex-shrink:0"><div class="visual-stage" style="min-height:150px;padding:8px" data-stage></div></div>
        <div style="flex:1;min-width:220px">
          <p class="q-context" style="margin:0 0 4px"><b>${watchLabel(r.w)}</b></p>
          <p class="q-context" style="margin:0 0 6px">Tier ${"●".repeat(r.diff)}${"○".repeat(5 - r.diff)} · distractors are real specs from other watches</p>
        </div>
      </div>
      <div class="spec-tiles" data-tiles></div>
      <div class="feedback" data-feedback></div>
      <div class="btn-row" style="display:none" data-next-row>
        <button class="btn btn-primary" data-next>Next question →</button>
      </div>
    `;
    card.querySelector("[data-stage]").innerHTML = renderWatch(r.w, { mode: "full" });
    const tiles = card.querySelector("[data-tiles]");
    r.entries.forEach(([raw, label], i) => {
      const t = el("div", "spec-tile", `<div class="st-val">${label}</div><div class="st-lbl">${catHint(r.cat)}</div>`);
      t.dataset.raw = raw;
      t.addEventListener("click", () => {
        if (r.answered) return;
        r.answered = true;
        const elapsed = (performance.now() - t0) / 1000;
        const right = raw === r.correctRaw;
        if (right) correct++;
        tiles.querySelectorAll(".spec-tile").forEach((tt) => {
          tt.style.pointerEvents = "none";
          if (String(tt.dataset.raw) === String(r.correctRaw)) tt.classList.add("correct");
          if (tt === t && !right) tt.classList.add("wrong");
        });
        let pts = 0;
        let bonus = "";
        if (right) {
          pts = 100 * r.diff;
          if (elapsed < 10) {
            const b = Math.round(35 * (1 - elapsed / 10));
            pts += b;
            bonus = ` <span style="color:var(--text-faint)">(fast +${b})</span>`;
          }
        }
        score += pts;
        const actual = valueOf(r.w, r.cat).label;
        card.querySelector("[data-feedback]").innerHTML =
          `<span class="${right ? "good" : "bad"}">${right ? "Correct." : `It's ${actual}.`}</span> +${pts}${bonus}`;
        const row = card.querySelector("[data-next-row]");
        row.style.display = "";
        row.querySelector("[data-next]").textContent = idx === rounds.length - 1 ? "See results →" : "Next question →";
        row.querySelector("[data-next]").addEventListener("click", next);
      });
      tiles.append(t);
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

function catHint(cat) {
  return { wr: "water resistance", pr: "power reserve", size: "case diameter", type: "movement" }[cat];
}