// ============================================================
// Movement Master — technical/mechanical knowledge.
// Quartz vs mechanical, calibres, ébauches vs manufacture,
// escapements, and the machinery inside the case.
// ============================================================

import { MOVEMENT_QUESTIONS } from "../data/watches.js";
import { pickMixing } from "../core/select.js";
import { getStat, recordGame, levelFromXp } from "../core/state.js";
import { clear, el, header, intro, resultsPanel } from "../core/ui.js";
import { GAME_BY_ID } from "./common.js";

const META = GAME_BY_ID.movement;

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
  const pool = MOVEMENT_QUESTIONS.map((q, i) => ({ id: String(i), q, difficulty: q.difficulty }));
  const rounds = pickMixing(pool, level, META.rounds).map((r) => r.q);

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
    const q = rounds[idx];
    pills();
    const t0 = performance.now();
    card.innerHTML = `
      <p class="q-prompt">${q.q}</p>
      <p class="q-context">Knowledge tier: ${"●".repeat(q.difficulty)}${"○".repeat(5 - q.difficulty)} · ${q.difficulty === 1 ? "foundation" : q.difficulty >= 4 ? "deep water" : "core mechanics"}</p>
      <div class="options" data-options></div>
      <div class="feedback" data-feedback></div>
      <div class="btn-row" style="display:none" data-next-row>
        <button class="btn btn-primary" data-next>Next question →</button>
      </div>
    `;
    const optBox = card.querySelector("[data-options]");
    const letters = "ABCD";
    q.options.forEach((opt, i) => {
      const b = el("button", "option", `<span class="opt-key">${letters[i]}</span>${opt}`);
      b.addEventListener("click", () => {
        if (q.answered) return;
        q.answered = true;
        const elapsed = (performance.now() - t0) / 1000;
        const right = i === q.answer;
        if (right) correct++;
        optBox.querySelectorAll(".option").forEach((bb, j) => {
          bb.disabled = true;
          if (j === q.answer) bb.classList.add("correct");
          if (j === i && !right) bb.classList.add("wrong");
        });
        let pts = 0;
        let bonus = "";
        if (right) {
          pts = 100 * q.difficulty;
          if (elapsed < 10) {
            const b = Math.round(35 * (1 - elapsed / 10));
            pts += b;
            bonus = ` <span style="color:var(--text-faint)">(fast +${b})</span>`;
          }
        }
        score += pts;
        card.querySelector("[data-feedback]").innerHTML =
          `<span class="${right ? "good" : "bad"}">${right ? "Correct." : "Not quite."}</span> +${pts}${bonus} — ${q.blurb}`;
        const row = card.querySelector("[data-next-row]");
        row.style.display = "";
        row.querySelector("[data-next]").textContent = idx === rounds.length - 1 ? "See results →" : "Next question →";
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