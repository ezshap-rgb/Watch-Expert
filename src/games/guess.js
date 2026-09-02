// ============================================================
// Guess the Watch — visual recognition.
// Modes per round: full / dial / silhouette / macro / reveal.
// Two independent difficulties (design doc §6): the watch's
// intrinsic obscurity (tier) and the challenge of the view.
// ============================================================

import { WATCHES, byId, watchLabel } from "../data/watches.js";
import { renderWatch } from "../render/watch.js";
import { pickMixing, shuffle } from "../core/select.js";
import { getStat, recordGame, levelFromXp } from "../core/state.js";
import { clear, el, header, metaRow, intro, resultsPanel } from "../core/ui.js";
import { GAME_BY_ID } from "./common.js";

const META = GAME_BY_ID.guess;

const MODE_WEIGHTS = {
  early: [["full", 40], ["silhouette", 15], ["dial", 25], ["macro", 15], ["reveal", 5]],
  mid: [["full", 25], ["silhouette", 18], ["dial", 22], ["macro", 20], ["reveal", 15]],
  late: [["full", 15], ["silhouette", 20], ["dial", 15], ["macro", 25], ["reveal", 25]],
};

const MODE_MOD = { full: 0, dial: 0.5, silhouette: 1, macro: 1.5, reveal: 0 };
const MODE_LABEL = {
  full: "full view",
  dial: "dial only — bezel removed",
  silhouette: "silhouette only",
  macro: "macro crop",
  reveal: "blurry reveal (it sharpens…)",
};

const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));

function weightedPick(weights) {
  const total = weights.reduce((a, [, w]) => a + w, 0);
  let r = Math.random() * total;
  for (const [mode, w] of weights) {
    r -= w;
    if (r <= 0) return mode;
  }
  return weights[0][0];
}

function macroFor(watch, face) {
  const cands = ["center"];
  if (face.date && face.date.on) cands.push("date");
  if (face.bezel && ["dive", "gmt", "tach", "slide", "fluted"].includes(face.bezel.type)) cands.push("bezel");
  cands.push("logo");
  return cands[Math.floor(Math.random() * cands.length)];
}

function distractors(w, qDiff, level) {
  const rest = WATCHES.filter((x) => x.id !== w.id);
  const similar = rest.filter((x) => x.tags.some((t) => w.tags.includes(t)));
  const others = rest.filter((x) => !similar.includes(x));
  const need = 3;
  const takeSimilar = qDiff >= 3 || level >= 3 ? 3 : 2;
  if (similar.length < takeSimilar) {
    return shuffle([...similar, ...others]).slice(0, need);
  }
  return shuffle([...shuffle(similar).slice(0, takeSimilar), ...shuffle(others).slice(0, need - takeSimilar)]);
}

function makeRound(level) {
  const pool = WATCHES.map((w) => ({ id: w.id, w, difficulty: w.tier }));
  const [sel] = pickMixing(pool, level, 1);
  const w = sel.w;
  const weights = level <= 2 ? MODE_WEIGHTS.early : level <= 4 ? MODE_WEIGHTS.mid : MODE_WEIGHTS.late;
  const mode = weightedPick(weights);
  return buildRound(w, mode, level);
}

function buildRound(w, mode, level) {
  const macro = mode === "macro" ? macroFor(w, w.face) : null;
  const modeMod = MODE_MOD[mode];
  const qDiff = clamp(Math.round(w.tier + modeMod), 1, 5);
  const opts = distractors(w, qDiff, level);
  return {
    w,
    mode,
    macro,
    diff: qDiff,
    options: shuffle([w, ...opts]).map((x) => x.id),
    startedAt: performance.now(),
    revealBlur: mode === "reveal" ? 7 : 0,
  };
}

function renderRoundStage(round) {
  return renderWatch(round.w, { mode: round.mode, macro: round.macro, blur: round.revealBlur });
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
  let streak = 0;
  let timer = null;

  const pillRow = el("div", "pill-row");
  s.append(pillRow);

  const card = el("div", "q-card");
  s.append(card);

  function updatePills() {
    pillRow.innerHTML = `
      <span class="pill">Score <b>${score.toLocaleString()}</b></span>
      <span class="pill">Round <b>${idx + 1}/${rounds.length}</b></span>
      <span class="pill">Level <b>${level}</b></span>
      ${streak > 1 ? `<span class="pill" style="border-color:var(--brass)">🔥 ${streak} in a row</span>` : ""}
    `;
  }

  function ask() {
    const r = rounds[idx];
    clearTimeout(timer);
    timer = null;
    r.startedAt = performance.now();
    updatePills();

    const modeLabel = r.mode === "macro" ? `macro crop — ${r.macro}` : MODE_LABEL[r.mode];
    card.innerHTML = `
      <p class="q-prompt">Which watch is this?</p>
      <p class="q-context">View: <b>${modeLabel}</b> · ${r.diff === 1 ? "recognisable" : r.diff >= 4 ? "expert-level" : "getting tricky"} · 4 options</p>
      <div class="visual-stage" data-stage></div>
      <div class="options" data-options></div>
      <div class="feedback" data-feedback></div>
      <div class="btn-row" style="display:none" data-next-row>
        <button class="btn btn-primary" data-next>Next round →</button>
      </div>
    `;
    const stage = card.querySelector("[data-stage]");
    stage.innerHTML = renderRoundStage(r);
    const optBox = card.querySelector("[data-options]");
    const letters = "ABCD";
    r.options.forEach((id, i) => {
      const b = el("button", "option", `<span class="opt-key">${letters[i]}</span>${watchLabel(byId(id))}`);
      b.dataset.id = id;
      b.addEventListener("click", () => answer(r, id, b, letters[i]));
      optBox.append(b);
    });

    // reveal countdown
    if (r.mode === "reveal") {
      let last = r.revealBlur;
      timer = setInterval(() => {
        const remain = performance.now() - r.startedAt;
        r.revealBlur = clamp(7 - remain / 900, 0, 7);
        if (Math.floor(r.revealBlur) !== Math.floor(last) && !r.answered) {
          last = r.revealBlur;
          stage.innerHTML = renderRoundStage(r);
        }
        if (r.answered) clearInterval(timer);
      }, 200);
    }
  }

  function answer(r, pickedId, button, letter) {
    if (r.answered) return;
    r.answered = true;
    if (timer) clearInterval(timer);
    const elapsed = (performance.now() - r.startedAt) / 1000;
    const isRight = pickedId === r.w.id;
    const opts = card.querySelectorAll(".option");
    opts.forEach((b) => {
      b.disabled = true;
      if (b.dataset.id === r.w.id) b.classList.add("correct");
      if (b.dataset.id === pickedId && !isRight) b.classList.add("wrong");
    });
    let pts = 0;
    let bonusParts = [];
    if (isRight) {
      correct++;
      pts = 90 + 25 * r.diff;
      if (elapsed < 10) {
        const b = Math.round(40 * (1 - elapsed / 10));
        pts += b;
        bonusParts.push(`fast +${b}`);
      }
      if (r.mode === "reveal") {
        const left = r.revealBlur / 7;
        const b2 = Math.round(50 * left);
        pts += b2;
        if (b2 > 0) bonusParts.push(`early reveal +${b2}`);
      }
      if (streak > 0) {
        const sb = Math.min(streak, 3) * 10;
        pts += sb;
        bonusParts.push(`streak +${sb}`);
      }
      streak++;
    } else {
      streak = 0;
    }
    score += pts;
    const fact = pts > 0
      ? `<span class="good">Correct — ${watchLabel(r.w)}.</span> +${pts} points ${bonusParts.length ? `(${bonusParts.join(", ")})` : ""}`
      : `<span class="bad">It was ${watchLabel(r.w)}.</span>`;
    const feed = card.querySelector("[data-feedback]");
    feed.innerHTML = `${fact}<br/><span style="color:var(--text-faint);font-size:.88rem">${r.w.fact}</span>`;
    const row = card.querySelector("[data-next-row]");
    row.style.display = "";
    row.querySelector("[data-next]").addEventListener("click", next);
    if (idx === rounds.length - 1) row.querySelector("[data-next]").textContent = "See results →";
  }

  function next() {
    idx++;
    updatePills();
    if (idx >= rounds.length) {
      const s2 = recordGame(META.id, { score, correct, answered: rounds.length, rounds: rounds.length, xp: score });
      resultsPanel(mount, META, { score, correct, answered: rounds.length, ...s2 }, () => open(mount, onExit));
      return;
    }
    ask();
  }

  ask();
}