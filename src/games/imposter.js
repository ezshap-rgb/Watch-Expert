// ============================================================
// Spot the Imposter — discrimination & consistency.
// Four items share a rule; three obey, one breaks it.
// Visual rounds hide the names and rely on the rendering engine;
// textual rounds state brand + model and test spec consistency.
// ============================================================

import { IMPOSTER_SETS_VALID, byId, watchLabel } from "../data/watches.js";
import { renderWatch } from "../render/watch.js";
import { pickMixing, shuffle } from "../core/select.js";
import { getStat, recordGame, levelFromXp } from "../core/state.js";
import { clear, el, header, intro, resultsPanel } from "../core/ui.js";
import { GAME_BY_ID } from "./common.js";

const META = GAME_BY_ID.imposter;

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
  const pool = IMPOSTER_SETS_VALID.map((st, i) => ({ id: String(i), st, difficulty: st.difficulty }));
  const rounds = pickMixing(pool, level, META.rounds).map((r) => r.st);

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
      <span class="pill">Round <b>${idx + 1}/${rounds.length}</b></span>
      <span class="pill">Level <b>${level}</b></span>
    `;
  }

  function ask() {
    const st = rounds[idx];
    pills();
    const t0 = performance.now();
    const order = shuffle(st.ids);
    const impIndex = order.indexOf(st.imposter);
    card.innerHTML = `
      <p class="q-prompt">${st.trouble}</p>
      <p class="q-context">Three of these are <b>${st.prop}</b>s — one is the imposter. Tier ${"●".repeat(st.difficulty)}${"○".repeat(5 - st.difficulty)}</p>
      <div class="watch-lineup" data-lineup></div>
      <div class="feedback" data-feedback></div>
      <div class="btn-row" style="display:none" data-next-row>
        <button class="btn btn-primary" data-next>Next round →</button>
      </div>
    `;
    const lineup = card.querySelector("[data-lineup]");
    const grid = el("div", "options");
    order.forEach((id, i) => {
      const w = byId(id);
      let inner = "";
      if (st.visual) {
        inner = `
          <div class="visual-stage" style="min-height:150px;padding:6px;margin-bottom:8px;background:radial-gradient(circle at 50% 30%, #141c28, #0a0e14 80%)">${renderWatch(w, { mode: "full" })}</div>
          <div class="wl-name" data-label>Watch ${String.fromCharCode(65 + i)}</div>
          <div class="wl-sub" data-sub></div>
        `;
      } else {
        inner = `<div class="wl-name">${watchLabel(w)}</div><div class="wl-sub">${w.ref}</div>`;
      }
      const line = el("div", "line", inner);
      line.style.cssText = "border:1px solid var(--line);background:var(--bg-2);border-radius:10px;padding:12px;cursor:pointer;transition:border-color .12s";
      line.dataset.id = id;
      line.addEventListener("click", () => {
        if (st.answered) return;
        st.answered = true;
        const elapsed = (performance.now() - t0) / 1000;
        const right = id === st.imposter;
        if (right) correct++;
        lineup.querySelectorAll("[data-id]").forEach((ln) => {
          ln.style.cursor = "default";
          const w2 = byId(ln.dataset.id);
          if (st.visual) {
            const label = ln.querySelector("[data-label]");
            label.textContent = `${watchLabel(w2)}`;
            const sub = ln.querySelector("[data-sub]");
            sub.textContent = w2.ref;
            if (ln.dataset.id === st.imposter) {
              ln.style.borderColor = "var(--green)";
              ln.style.background = "rgba(76,175,125,.16)";
              const lbl = ln.querySelector("[data-label]");
              lbl.textContent = "🎯 " + lbl.textContent;
            } else {
              ln.style.borderColor = "var(--red)";
              ln.style.background = "rgba(212,89,89,.12)";
            }
          } else {
            ln.style.borderColor = ln.dataset.id === st.imposter ? "var(--green)" : "var(--red)";
          }
        });
        let pts = right ? 100 * st.difficulty : 0;
        if (right && elapsed < 10) pts += Math.round(35 * (1 - elapsed / 10));
        score += pts;
        const imp = byId(st.imposter);
        card.querySelector("[data-feedback]").innerHTML =
          `<span class="${right ? "good" : "bad"}">${right ? "That's the imposter." : `The imposter was ${watchLabel(imp)}.`}</span> +${pts} points<br/>` +
          `<span style="color:var(--text-faint);font-size:.88rem">${st.explain(imp)}</span>`;
        const row = card.querySelector("[data-next-row]");
        row.style.display = "";
        row.querySelector("[data-next]").textContent = idx === rounds.length - 1 ? "See results →" : "Next round →";
        row.querySelector("[data-next]").addEventListener("click", next);
      });
      grid.append(line);
    });
    lineup.append(grid);
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