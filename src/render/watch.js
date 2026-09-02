// ============================================================
// Procedural SVG watch renderer — drawing engine.
// Faces (per-preset parameters) live in ./faces.js.
//
// Coordinate space: 240 × 300. Case centre at (120, 112),
// case outer radius 106, dial radius 80.
//
// renderWatch(watch, opts) → <svg> string
//   opts.mode: "full" | "dial" | "silhouette" | "macro"
//   opts.macro: "center" | "date" | "logo" | "bezel"
//   opts.blur: px blur filter applied to the drawing
// ============================================================

import { FACES } from "./faces.js";

const CX = 120;
const CY = 112;
const RC = 106; // outer case radius
const RD = 80; // dial radius

// ---------- tiny helpers ----------

const esc = (s) => (s == null ? "" : String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;"));

const polar = (r, deg, cx = CX, cy = CY) => [
  +(cx + r * Math.sin((deg * Math.PI) / 180)).toFixed(2),
  +(cy - r * Math.cos((deg * Math.PI) / 180)).toFixed(2),
];

const ring = (cx, cy, rOut, rIn, fill) =>
  `<circle cx="${cx}" cy="${cy}" r="${(rOut + rIn) / 2}" fill="none" stroke="${fill}" stroke-width="${rOut - rIn}"/>`;

function text(x, y, str, size, color, { weight = "normal", ls = 1, anchor = "middle", family = "Georgia, serif", italic = false } = {}) {
  return `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" fill="${color}" ` +
    `text-anchor="${anchor}" font-weight="${weight}" letter-spacing="${ls}" font-style="${italic ? "italic" : "normal"}">${esc(str)}</text>`;
}

// ---------- gradients & defs ----------

const STEEL = `url(#gradSteel)`;
const GOLD = `url(#gradGold)`;

function defs() {
  const steelDef = `<radialGradient id="gradSteel" cx="35%" cy="30%" r="80%">
    <stop offset="0%" stop-color="#eef2f6"/><stop offset="45%" stop-color="#c3ccd6"/>
    <stop offset="78%" stop-color="#84909e"/><stop offset="100%" stop-color="#5f6a77"/>
  </radialGradient>`;
  const goldDef = `<radialGradient id="gradGold" cx="35%" cy="30%" r="80%">
    <stop offset="0%" stop-color="#f3dcab"/><stop offset="50%" stop-color="#d9b46a"/>
    <stop offset="100%" stop-color="#96702f"/>
  </radialGradient>`;
  const tiDef = `<radialGradient id="gradTi" cx="35%" cy="30%" r="80%">
    <stop offset="0%" stop-color="#dfe3e8"/><stop offset="60%" stop-color="#a9b1ba"/><stop offset="100%" stop-color="#7c858f"/>
  </radialGradient>`;
  const blackDef = `<radialGradient id="gradBlack" cx="35%" cy="30%" r="80%">
    <stop offset="0%" stop-color="#3a414b"/><stop offset="55%" stop-color="#171b21"/><stop offset="100%" stop-color="#080a0e"/>
  </radialGradient>`;
  const dialDef = `<radialGradient id="gradDial" cx="40%" cy="35%" r="85%">
    <stop offset="0%" stop-color="#ffffff99"/><stop offset="100%" stop-color="#00000000"/>
  </radialGradient>`;
  const sbDef = `<radialGradient id="gradSun" cx="45%" cy="38%" r="90%">
    <stop offset="0%" stop-color="#ffffff55"/><stop offset="60%" stop-color="#ffffff14"/><stop offset="100%" stop-color="#00000033"/>
  </radialGradient>`;
  const patternDef = `<pattern id="patTap" width="9" height="9" patternUnits="userSpaceOnUse">
      <rect width="9" height="9" fill="none"/><rect x="0.5" y="0.5" width="5" height="5" fill="#00000014"/>
    </pattern>
    <pattern id="patHoriz" width="10" height="10" patternUnits="userSpaceOnUse">
      <rect width="10" height="10" fill="none"/><rect y="0" width="10" height="1.4" fill="#00000026"/>
    </pattern>
    <pattern id="patSnow" width="14" height="14" patternUnits="userSpaceOnUse">
      <circle cx="3" cy="3" r="0.9" fill="#a89d7f22"/><circle cx="10" cy="9" r="0.7" fill="#a89d7f22"/><circle cx="8" cy="2" r="0.6" fill="#a89d7f22"/>
    </pattern>`;
  return `<defs>${steelDef}${goldDef}${tiDef}${blackDef}${dialDef}${sbDef}${patternDef}</defs>`;
}

// ---------- straps ----------

function strap(F) {
  const metal = F.caseColor === "gold" ? GOLD : STEEL;
  const out = [];
  // lugs
  out.push(`<path d="M ${CX - 62} 178 L ${CX - 44} 218 L ${CX - 46} 222 L ${CX - 66} 222 Z" fill="${metal}"/>`);
  out.push(`<path d="M ${CX + 62} 178 L ${CX + 44} 218 L ${CX + 46} 222 L ${CX + 66} 222 Z" fill="${metal}"/>`);
  const t = F.strap || { type: "oyster" };
  const top = 220;
  const bot = 296;
  switch (t.type) {
    case "oyster": {
      const col = F.caseColor === "gold" ? "#cfab64" : "#a9b4c0";
      out.push(`<path d="M ${CX - 52} ${top} L ${CX + 52} ${top} L ${CX + 40} ${bot} L ${CX - 40} ${bot} Z" fill="#2c3642"/>`);
      out.push(`<rect x="${CX - 40}" y="${top - 6}" width="16" height="${bot - top + 12}" rx="7" fill="${col}"/>`);
      out.push(`<rect x="${CX - 8}" y="${top - 6}" width="16" height="${bot - top + 12}" rx="7" fill="${col}"/>`);
      out.push(`<rect x="${CX + 24}" y="${top - 6}" width="16" height="${bot - top + 12}" rx="7" fill="${col}"/>`);
      break;
    }
    case "jubilee": {
      const col = F.caseColor === "gold" ? "#cfab64" : "#a9b4c0";
      out.push(`<path d="M ${CX - 52} ${top} L ${CX + 52} ${top} L ${CX + 40} ${bot} L ${CX - 40} ${bot} Z" fill="#26303c"/>`);
      for (let i = -3; i <= 3; i++) {
        const w = i % 2 === 0 ? 16 : 6;
        out.push(`<rect x="${CX + i * 17 - w / 2}" y="${top - 6}" width="${w}" height="${bot - top + 12}" rx="3" fill="${col}"/>`);
      }
      break;
    }
    case "integrated": {
      const col = F.caseColor === "gold" ? "#cfab64" : "#98a4b2";
      out.push(`<path d="M ${CX - 50} ${top} L ${CX + 50} ${top} L ${CX + 36} ${bot} L ${CX - 36} ${bot} Z" fill="#1c242e"/>`);
      for (let i = -2; i <= 2; i++) {
        const w = i === 0 ? 22 : 12;
        out.push(`<rect x="${CX + i * 22 - w / 2}" y="${top - 4}" width="${w}" height="${bot - top + 8}" rx="5" fill="${col}"/>`);
      }
      break;
    }
    case "leather": {
      const cols = t.colors || ["#5d4a33", "#7a5f40"];
      out.push(`<path d="M ${CX - 46} ${top} L ${CX + 46} ${top} L ${CX + 34} ${bot} L ${CX - 34} ${bot} Z" fill="${cols[0]}"/>`);
      out.push(`<path d="M ${CX - 20} ${top} L ${CX + 20} ${top} L ${CX + 15} ${bot} L ${CX - 15} ${bot} Z" fill="${cols[1]}"/>`);
      // stitching
      const stitch = [];
      for (let y = top + 8; y < bot; y += 12) {
        for (const dx of [-26, 26]) stitch.push(`<circle cx="${CX + dx}" cy="${y}" r="1" fill="#00000066"/>`);
      }
      out.push(stitch.join(""));
      break;
    }
    case "nato": {
      const cols = t.colors || ["#12151a", "#2b3442", "#12151a"];
      out.push(`<path d="M ${CX - 54} ${top - 10} L ${CX + 54} ${top - 10} L ${CX + 44} ${bot} L ${CX - 44} ${bot} Z" fill="${cols[0]}"/>`);
      const band = (bot - top + 10) / cols.length;
      for (let i = 1; i < cols.length; i++) {
        out.push(`<path d="M ${CX - 54} ${top - 10 + i * band} L ${CX + 54} ${top - 10 + i * band} L ${CX + 44} ${bot} L ${CX - 44} ${bot} Z" clip-path="none" fill="${cols[i]}" opacity="0.85"/>`);
      }
      out.push(`<path d="M ${CX - 54} ${top - 10} L ${CX - 40} ${top + 12} L ${CX - 42} ${top + 16} L ${CX - 58} ${top - 6} Z" fill="#3a4452"/>`);
      out.push(`<path d="M ${CX + 54} ${top - 10} L ${CX + 40} ${top + 12} L ${CX + 42} ${top + 16} L ${CX + 58} ${top - 6} Z" fill="#3a4452"/>`);
      break;
    }
    case "rubber": {
      out.push(`<path d="M ${CX - 46} ${top} L ${CX + 46} ${top} L ${CX + 34} ${bot} L ${CX - 34} ${bot} Z" fill="#26303c"/>`);
      for (let y = top + 10; y < bot; y += 10) {
        out.push(`<path d="M ${CX - 30} ${y} L ${CX + 26} ${y}" stroke="#12181f" stroke-width="4"/>`);
      }
      break;
    }
    case "resin": {
      out.push(`<path d="M ${CX - 44} ${top} L ${CX + 44} ${top} L ${CX + 32} ${bot - 4} L ${CX - 32} ${bot - 4} Z" fill="#1a1f26"/>`);
      break;
    }
    case "titanium": {
      out.push(`<path d="M ${CX - 50} ${top} L ${CX + 50} ${top} L ${CX + 40} ${bot} L ${CX - 40} ${bot} Z" fill="#202830"/>`);
      for (const dx of [-24, 0, 24]) out.push(`<rect x="${CX + dx - 7}" y="${top - 6}" width="14" height="${bot - top + 12}" rx="6" fill="#7d8792"/>`);
      break;
    }
  }
  return out.join("");
}

// ---------- case ----------

function caseShape(F) {
  const fill = F.caseColor === "gold" ? GOLD : F.caseColor === "titanium" ? "url(#gradTi)" : F.caseColor === "resin" || F.caseColor === "black" ? "url(#gradBlack)" : STEEL;
  const corners = F.corners || 0;
  switch (F.caseShape) {
    case "square": {
      const s = 2 * RC - 26;
      return `<rect x="${CX - s / 2}" y="${CY - s / 2}" width="${s}" height="${s}" rx="${corners || 26}" fill="${fill}"/>`;
    }
    case "rect": {
      return `<rect x="${CX - 62}" y="${CY - 2 * RC + 8}" width="124" height="${2 * RC - 16}" rx="${corners || 20}" fill="${fill}"/>`;
    }
    case "octagon": {
      const pts = [];
      for (let i = 0; i < 8; i++) pts.push(polar(RC + 10, i * 45).join(","));
      return `<polygon points="${pts.join(" ")}" fill="${fill}"/>`;
    }
    case "cushion": {
      return `<rect x="${CX - (RC + 8)}" y="${CY - (RC + 8)}" width="${2 * (RC + 8)}" height="${2 * (RC + 8)}" rx="${corners || 58}" fill="${fill}"/>`;
    }
    default: {
      return `<circle cx="${CX}" cy="${CY}" r="${RC}" fill="${fill}"/>`;
    }
  }
}

function bezelBand(F) {
  const metal = F.caseColor === "gold" ? GOLD : STEEL;
  const b = F.bezel || { type: "smooth" };
  const rOut = RC - 0;
  if (b.type === "nobezel" || !b.type) return "";
  const out = [];
  switch (b.type) {
    case "dive": {
      const col = b.color1 || "#0d1014";
      out.push(ring(CX, CY, rOut, RD + 4, col));
      // minute ticks
      for (let m = 0; m < 60; m++) {
        const major = m % 5 === 0;
        const [x1, y1] = polar(major ? RD + 13 : RD + 9, m * 6);
        const [x2, y2] = polar(RD + 22, m * 6);
        out.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#dfe6ec" stroke-width="${major ? 2 : 0.9}" opacity="${major ? 0.95 : 0.6}"/>`);
      }
      // lume pips at 5-min
      for (let m = 0; m < 60; m += 5) {
        const [x, y] = polar(RD + 15, m * 6);
        out.push(`<circle cx="${x}" cy="${y}" r="2.1" fill="#d9e2ea"/>`);
      }
      // numbers 10 20 30 40 50
      for (const deg of [120, 90, 40, 300, 270]) {
        const [x, y] = polar(RD + 18, deg);
        const n = { 120: 10, 90: 20, 40: 30, 300: 40, 270: 50 }[deg];
        out.push(text(x, y + 2.5, String(n), 5.6, "#dfe6ec", { weight: "bold", ls: 0 }));
      }
      // triangle at 12
      const [tx, ty] = polar(RD + 16, 0);
      out.push(`<path d="M ${tx} ${ty + 6} L ${tx - 4.4} ${ty - 3.4} L ${tx + 4.4} ${ty - 3.4} Z" fill="#e6eef4" stroke="#9aa6b2" stroke-width="0.6"/>`);
      break;
    }
    case "gmt": {
      const c1 = b.color1 || "#101317";
      const c2 = b.color2 || "#1d3a5f";
      out.push(`<circle cx="${CX}" cy="${CY}" r="${(rOut + RD + 4) / 2}" fill="none" stroke="${c1}" stroke-width="${rOut - RD - 4}"/>`);
      // two-tone halves
      out.push(`<path d="M ${CX} ${CY - rOut} A ${rOut} ${rOut} 0 0 1 ${CX} ${CY + rOut} L ${CX} ${CY + RD + 4} A ${RD + 4} ${RD + 4} 0 0 0 ${CX} ${CY - RD - 4} Z" fill="${c2}"/>`);
      for (let h = 0; h < 24; h++) {
        const [x1, y1] = polar(RD + 8, h * 15 + 7.5);
        const [x2, y2] = polar(RD + 20, h * 15 + 7.5);
        out.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#dfe6ec" stroke-width="1" opacity="0.85"/>`);
      }
      for (const [deg, n] of [[0, 24], [45, 6], [90, 12], [180, 18], [270, 6], [315, 12]]) {
        const [x, y] = polar(RD + 15, deg);
        out.push(text(x, y + 2, String(n), 4.6, "#e8edf2", { weight: "bold", ls: 0 }));
      }
      const [tx, ty] = polar(RD + 15, 0);
      out.push(`<path d="M ${tx} ${ty + 6} L ${tx - 4} ${ty - 3} L ${tx + 4} ${ty - 3} Z" fill="#e6eef4"/>`);
      break;
    }
    case "tach": {
      out.push(ring(CX, CY, rOut, RD + 4, b.color1 || "#0c0e12"));
      for (let u = 0; u < 40; u++) {
        const [x1, y1] = polar(RD + 10, u * 9);
        const [x2, y2] = polar(RD + 20, u * 9);
        out.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#dfe6ec" stroke-width="1" opacity="0.8"/>`);
      }
      const nums = { 60: "60", 20: "70", 90: "80", 300: "400", 250: "300", 210: "200" };
      for (const deg of [60, 20, 90, 320, 280, 240, 200]) {
        const [x, y] = polar(RD + 17, deg);
        out.push(text(x, y + 2.2, nums[deg] || "", 5.2, "#e8edf2", { weight: "bold", ls: 0 }));
      }
      const [tx, ty] = polar(RD + 15, 0);
      out.push(`<path d="M ${tx} ${ty + 7} L ${tx - 4.6} ${ty - 2.6} L ${tx + 4.6} ${ty - 2.6} Z" fill="#e6eef4"/>`);
      break;
    }
    case "slide": {
      out.push(ring(CX, CY, rOut, RD + 4, b.color1 || "#101318"));
      for (let u = 0; u < 60; u++) {
        const [x1, y1] = polar(RD + 8, u * 6);
        const [x2, y2] = polar(RD + 18, u * 6);
        out.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#dfe6ec" stroke-width="${u % 5 === 0 ? 1.4 : 0.6}" opacity="0.85"/>`);
      }
      for (const deg of [60, 20, 330, 300, 270, 240, 210, 180, 150, 120, 90]) {
        const [x, y] = polar(RD + 26, deg);
        out.push(text(x, y + 1.6, "•", 4, "#dfe6ec"));
      }
      for (const [deg, n] of [[60, "70"], [20, "80"], [330, "90"], [270, "12"], [120, "60"], [45, "75"]]) {
        const [x, y] = polar(RD + 15, deg);
        out.push(text(x, y + 2, n, 4.4, "#e8edf2", { weight: "bold", ls: 0 }));
      }
      const [tx, ty] = polar(RD + 15, 0);
      out.push(`<path d="M ${tx} ${ty + 6} L ${tx - 4} ${ty - 3} L ${tx + 4} ${ty - 3} Z" fill="#e6eef4"/>`);
      break;
    }
    case "fluted": {
      out.push(ring(CX, CY, rOut, RD + 4, GOLD));
      for (let u = 0; u < 72; u++) {
        const [x1, y1] = polar(RD + 7, u * 5);
        const [x2, y2] = polar(RD + 22, u * 5);
        out.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#7a5a22" stroke-width="1.6" opacity="0.85"/>`);
      }
      break;
    }
    default: {
      // smooth polished bezel
      out.push(ring(CX, CY, rOut, RD + 5, b.gold ? GOLD : "url(#gradSteel)"));
    }
  }
  return out.join("");
}

// ---------- dial ----------

function dialDisk(F) {
  const out = [];
  out.push(`<circle cx="${CX}" cy="${CY}" r="${RD}" fill="${F.dialColor}"/>`);
  out.push(`<circle cx="${CX}" cy="${CY}" r="${RD}" fill="url(#gradDial)"/>`);
  const tex = F.dialTexture || "plain";
  if (tex === "sunburst") out.push(`<circle cx="${CX}" cy="${CY}" r="${RD}" fill="url(#gradSun)"/>`);
  else if (tex === "tapisserie") out.push(`<circle cx="${CX}" cy="${CY}" r="${RD}" fill="url(#patTap)"/>`);
  else if (tex === "horizontal") out.push(`<circle cx="${CX}" cy="${CY}" r="${RD}" fill="url(#patHoriz)"/>`);
  else if (tex === "snow") out.push(`<circle cx="${CX}" cy="${CY}" r="${RD}" fill="url(#patSnow)"/>`);
  else if (tex === "wave") {
    const wave = [];
    for (let y = 0; y < 150; y += 11) {
      wave.push(`<path d="M 42 ${CY - 74 + y} Q 70 ${CY - 68 + y} 98 ${CY - 74 + y} T 156 ${CY - 74 + y} T 210 ${CY - 74 + y}" stroke="#0d1f30" stroke-width="1.6" fill="none" opacity="0.55"/>`);
    }
    out.push(`<clipPath id="clipDial"><circle cx="${CX}" cy="${CY}" r="${RD}"/></clipPath><g clip-path="url(#clipDial)">${wave.join("")}</g>`);
  }
  return out.join("");
}

function markers(F) {
  const m = F.markers || { type: "stick" };
  const lume = F.lume || "#e9ddb4";
  const out = [];
  const mk = m.type || "stick";
  const color = m.color || "#dfe4ea";
  const numColor = F.numeralColor || color;

  // minute track (railroad style for dress)
  for (let mm = 0; mm < 60; mm++) {
    const major = mm % 5 === 0;
    const [x1, y1] = polar(RD - 3, mm * 6);
    const [x2, y2] = polar(RD - 7, mm * 6);
    out.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${major ? color : "#00000044"}" stroke-width="${major ? 1.6 : 0.8}" opacity="0.8"/>`);
  }

  const numAt = (deg, str, size = 9, weight = "normal", offset = 0) => {
    const [x, y] = polar(RD - 20 + offset, deg);
    out.push(text(x, y + size * 0.35, str, size, numColor, { weight, ls: 0.5 }));
  };

  if (mk === "pips") {
    for (let h = 0; h < 12; h++) {
      const [x, y] = polar(RD - 20, h * 30);
      const r = h % 3 === 0 ? 3.4 : 2.7;
      out.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="${lume}" stroke="#8a93a0" stroke-width="0.8"/>`);
    }
  } else if (mk === "stick" || mk === "batons") {
    for (let h = 0; h < 12; h++) {
      const len = h % 3 === 0 ? 16 : (mk === "batons" ? 13 : 11);
      const [x1, y1] = polar(RD - 17, h * 30);
      const [x2, y2] = polar(RD - 17 - len, h * 30);
      const w = mk === "batons" ? 2.2 : 1.6;
      out.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}"/>`);
    }
  } else if (mk === "arabic") {
    if (m.set === "military") {
      for (let h = 1; h <= 12; h++) {
        const [x, y] = polar(RD - 24, h * 30);
        out.push(text(x, y + 3.4, String(h), 7.6, numColor, { weight: "bold", ls: 0 }));
      }
      for (let h = 13; h <= 24; h++) {
        const [x1, y1] = polar(RD - 9, (h - 12) * 30);
        out.push(text(x1, y1 + 2.2, String(h - 12), 3.8, m.innerColor || "#00000055", { ls: 0 }));
      }
    } else if (m.set === "huge") {
      for (const [h, n] of [[12, "12"], [3, "3"], [6, "6"], [9, "9"]]) {
        numAt(h * 30, n, 15, "bold", -9);
      }
      if (m.extra === "stick") {
        for (let h = 1; h < 12; h++) {
          if (h % 3 === 0) continue;
          const [x1, y1] = polar(RD - 19, h * 30);
          const [x2, y2] = polar(RD - 31, h * 30);
          out.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${numColor}" stroke-width="1.4"/>`);
        }
      }
    } else {
      for (const [h, n] of [[12, "12"], [3, "3"], [6, "6"], [9, "9"]]) {
        numAt(h * 30, n, 11, "bold", -6);
      }
    }
  } else if (mk === "roman") {
    const map = { 12: "XII", 3: "III", 6: "VI", 9: "IX" };
    for (const [h] of [[12], [3], [6], [9]]) {
      numAt(h * 30, map[h], 10, "normal", -8);
    }
  }

  // special 12 markers
  if (m.twelve === "triangle") {
    const [tx, ty] = polar(RD - 24, 0);
    out.push(`<path d="M ${tx} ${ty + 7} L ${tx - 4.4} ${ty - 4} L ${tx + 4.4} ${ty - 4} Z" fill="${lume}" stroke="#8a93a0" stroke-width="0.7"/>`);
  } else if (m.twelve === "arrow") {
    const [tx, ty] = polar(RD - 26, 0);
    out.push(`<path d="M ${tx} ${ty + 6} L ${tx - 5} ${ty - 2} L ${tx} ${ty - 5} L ${tx + 5} ${ty - 2} Z" fill="${lume}"/>`);
  } else if (m.twelve === "double") {
    const [x1, y1] = polar(RD - 15, 0);
    const [x2, y2] = polar(RD - 29, 0);
    out.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${lume}" stroke-width="3.4" stroke-linecap="round"/>`);
  }
  return out.join("");
}

// ---------- complications ----------

function dateWindow(F) {
  const d = F.date;
  if (!d || !d.on) return "";
  const out = [];
  const metal = F.caseColor === "gold" ? "#e6c887" : "#f4f6f8";
  const at = d.at || 3;
  const deg = at === 6 ? 90 : 0;
  const [x, y] = polar(52, deg);
  if (d.day) {
    out.push(`<rect x="${x - 23}" y="${y - 11}" width="46" height="22" rx="3" fill="${metal}" stroke="#7b8596" stroke-width="0.6"/>`);
  } else {
    out.push(`<rect x="${x - 9}" y="${y - 11}" width="18" height="22" rx="3" fill="${metal}" stroke="#7b8596" stroke-width="0.6"/>`);
  }
  out.push(text(x, y + 3, "25", 8, "#15181c", { weight: "bold", ls: 0 }));
  if (d.cyclops) {
    out.push(`<ellipse cx="${x}" cy="${y - 12}" rx="9" ry="6.5" fill="#ffffff30" stroke="#ffffff66" stroke-width="1"/>`);
  }
  return out.join("");
}

function bigDate(F) {
  if (!F.bigDate) return "";
  const out = [];
  const [x1, y1] = polar(RD - 26, 28);
  out.push(`<rect x="${x1 - 15}" y="${y1 - 13}" width="15" height="26" fill="#f7f4ea" stroke="#8a8577" stroke-width="0.7"/>`);
  out.push(`<rect x="${x1}" y="${y1 - 13}" width="15" height="26" fill="#f7f4ea" stroke="#8a8577" stroke-width="0.7"/>`);
  out.push(text(x1 - 7, y1 + 4, "2", 13, "#1a1c20", { weight: "bold", ls: 0 }));
  out.push(text(x1 + 7.5, y1 + 4, "5", 13, "#1a1c20", { weight: "bold", ls: 0 }));
  return out.join("");
}

function subdials(F) {
  const n = F.subdials || 0;
  if (!n) return "";
  const out = [];
  const ringCol = F.subRing || "#d8dee5";
  const positions = n === 2 ? [180, 0] : F.subPos === "tri" ? [180, 0, 90] : [90, 170, 250];
  const r = n === 2 ? 15 : 17;
  positions.forEach((deg, i) => {
    const [x, y] = polar(44, deg);
    out.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="${F.subColor || "#101318"}" stroke="${ringCol}" stroke-width="1"/>`);
    for (let t = 0; t < 60; t += 5) {
      const [x1, y1] = polar(r - 2.5, t * 6, x, y);
      const [x2, y2] = polar(r - (t % 15 === 0 ? 5 : 3.6), t * 6, x, y);
      out.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${ringCol}" stroke-width="0.9" opacity="0.85"/>`);
    }
    out.push(`<line x1="${x}" y1="${y}" x2="${x}" y2="${y}" stroke="${ringCol}" stroke-width="1.6" opacity="0"/>`);
    const [en, ex] = [polar(r - 7, [192, 40, 90][i], x, y), polar(r - 12, [192, 40, 90][i], x, y)];
    out.push(`<line x1="${ex[0]}" y1="${ex[1]}" x2="${en[0]}" y2="${en[1]}" stroke="${i === 1 ? "#c9a55c" : "#d8dee5"}" stroke-width="1.4"/>`);
  });
  return out.join("");
}

function powerReserve(F) {
  if (!F.prArc) return "";
  const out = [];
  const deg = F.prArc.deg || 240;
  const r = 58;
  const [cx, cy] = polar(r * 0.55, deg, CX, CY);
  // arc segment
  const a0 = ((deg - 40) * Math.PI) / 180;
  const a1 = ((deg + 40) * Math.PI) / 180;
  const arc = `<path d="M ${cx + (r - 10) * Math.sin(a0)} ${cy - (r - 10) * Math.cos(a0)} A ${r - 10} ${r - 10} 0 0 1 ${cx + (r - 10) * Math.sin(a1)} ${cy - (r - 10) * Math.cos(a1)}" fill="none" stroke="#565f6b" stroke-width="5"/>`;
  out.push(arc);
  const [px, py] = [cx + (r - 10) * Math.sin(a0 + (a1 - a0) * 0.62), cy - (r - 10) * Math.cos(a0 + (a1 - a0) * 0.62)];
  out.push(`<line x1="${cx}" y1="${cy}" x2="${px}" y2="${py}" stroke="#c9a55c" stroke-width="2"/>`);
  out.push(`<circle cx="${cx}" cy="${cy}" r="1.8" fill="#c9a55c"/>`);
  return out.join("");
}

function gmtHand(g) {
  const col = g.color || "#d86a3c";
  const deg = g.deg || 200;
  return `<g transform="rotate(${deg - 90} ${CX} ${CY})">
    <path d="M ${CX - 2} ${CY - 40} L ${CX + 2} ${CY - 40} L ${CX + 1.2} ${CY - 3} L ${CX - 1.2} ${CY - 3} Z" fill="${col}"/>
    <path d="M ${CX - 3.2} ${CY - 44} L ${CX + 3.2} ${CY - 44} L ${CX} ${CY - 36} Z" fill="${col}"/>
  </g>`;
}

// ---------- hands ----------

function handShape(kind, len, lume, metalColor, w = 1.6) {
  const cx = CX;
  const cy = CY;
  const l = len;
  switch (kind) {
    case "mercedes": {
      const br = len * 0.42;
      return `<path d="M ${cx - w} ${cy - l + 2} L ${cx + w} ${cy - l + 2} L ${cx + w * 1.7} ${cy - br - 4} L ${cx + w * 2.2} ${cy - br - 8} L ${cx - w * 2.2} ${cy - br - 8} L ${cx - w * 1.7} ${cy - br - 4} Z" fill="${lume}"/>
        <circle cx="${cx}" cy="${cy - br}" r="${w * 2.6}" fill="none" stroke="${lume}" stroke-width="${w}"/>`;
    }
    case "snowflake": {
      const bw = Math.max(6, len * 0.22);
      return `<path d="M ${cx - bw} ${cy - l} L ${cx + bw} ${cy - l} L ${cx + bw * 0.7} ${cy - br()} L ${cx - bw * 0.7} ${cy - br()} Z" fill="${lume}" stroke="${metalColor}" stroke-width="0.5"/>`;
    }
    case "sword": {
      return `<path d="M ${cx - w * 1.4} ${cy - l} L ${cx + w * 1.4} ${cy - l} L ${cx + w} ${cy - 2} L ${cx - w} ${cy - 2} Z" fill="${lume}" stroke="${metalColor}" stroke-width="0.5"/>`;
    }
    case "dauphine": {
      return `<path d="M ${cx - w * 1.6} ${cy - 4} L ${cx} ${cy - l} L ${cx + w * 1.6} ${cy - 4} L ${cx} ${cy - 1} Z" fill="${lume}" stroke="${metalColor}" stroke-width="0.4"/>`;
    }
    case "syringe": {
      return `<path d="M ${cx - w * 0.8} ${cy - l} L ${cx + w * 0.8} ${cy - l} L ${cx + w * 0.9} ${cy - l * 0.28} L ${cx + w * 2} ${cy - l * 0.28} L ${cx} ${cy} L ${cx - w * 2} ${cy - l * 0.28} L ${cx - w * 0.9} ${cy - l * 0.28} Z" fill="${lume}" stroke="${metalColor}" stroke-width="0.5"/>`;
    }
    case "arrow": {
      return `<path d="M ${cx - w * 2.4} ${cy - l + 2} L ${cx} ${cy - l - 2.6} L ${cx + w * 2.4} ${cy - l + 2} L ${cx + w * 1.8} ${cy - l * 0.25} L ${cx - w * 1.8} ${cy - l * 0.25} Z" fill="${metalColor}"/>
        <rect x="${cx - w * 0.9}" y="${cy - l * 0.8}" width="${w * 1.8}" height="${l * 0.5}" rx="${w * 0.5}" fill="${lume}" opacity="0.9"/>`;
    }
    default: {
      // baton
      return `<rect x="${cx - w}" y="${cy - l}" width="${w * 2}" height="${l}" rx="${w}" fill="${lume}"/>`;
    }
  }
  function br() {
    return len * 0.28;
  }
}

function hands(F) {
  const h = F.hands || {};
  const lume = F.lume || "#e9ddb4";
  const metal = F.handMetal || "#aab4c0";
  const hourKind = h.hour || "baton";
  const minKind = h.minute || h.hour || "baton";
  const hourLen = F.hourLen || 40;
  const minLen = F.minLen || 54;
  const out = [];
  if (hourKind !== "none") out.push(`<g transform="rotate(-62 ${CX} ${CY})">${handShape(hourKind, hourLen, lume, metal)}</g>`);
  if (minKind !== "none") out.push(`<g transform="rotate(118 ${CX} ${CY})">${handShape(minKind, minLen, lume, metal)}</g>`);
  const secType = h.second || "thin";
  if (secType !== "none") {
    const sCol = secType === "red" ? "#cf3a3a" : secType === "blued" ? "#3b5f9e" : secType === "gold" ? "#c9a55c" : h.secondColor || "#2a3038";
    let secShape = `<line x1="${CX}" y1="${CY + 10}" x2="${CX}" y2="${CY - 62}" stroke="${sCol}" stroke-width="1.5"/>`;
    if (secType === "lollipop") {
      secShape = `<line x1="${CX}" y1="${CY + 8}" x2="${CX}" y2="${CY - 52}" stroke="${sCol}" stroke-width="1.4"/>
        <circle cx="${CX}" cy="${CY - 54}" r="4.6" fill="none" stroke="${sCol}" stroke-width="1.6"/>`;
    }
    if (secType === "redtip") {
      secShape = `<line x1="${CX}" y1="${CY + 8}" x2="${CX}" y2="${CY - 62}" stroke="${sCol}" stroke-width="1.4"/>
        <path d="M ${CX - 1.6} ${CY - 62} L ${CX + 1.6} ${CY - 62} L ${CX} ${CY - 56} Z" fill="${sCol}"/>`;
    }
    out.push(`<g transform="rotate(192 ${CX} ${CY})">${secShape}</g>`);
  }
  if (hourKind !== "none" || minKind !== "none") {
    out.push(`<circle cx="${CX}" cy="${CY}" r="3.4" fill="${metal}" stroke="#0c0f13" stroke-width="0.8"/>`);
  }
  if (F.chronoHands) {
    out.push(`<g transform="rotate(40 ${CX} ${CY})"><line x1="${CX}" y1="${CY + 12}" x2="${CX}" y2="${CY - 60}" stroke="#c9a55c" stroke-width="1.4"/></g>`);
  }
  return out.join("");
}

function logoText(F) {
  const out = [];
  const y = F.logo ? F.logo.y : CY - 58;
  if (F.logo && F.logo.text) {
    const sym = F.logo.symbol ? `${F.logo.symbol} ` : "";
    out.push(text(CX, y, sym + F.logo.text, F.logo.size || 9.5, F.logo.color || F.markerColor || "#dfe4ea", {
      weight: F.logo.bold ? "bold" : "normal",
      ls: F.logo.ls != null ? F.logo.ls : 1.4,
    }));
  }
  if (F.line2 && F.line2.text) {
    out.push(text(CX, CY + 34, F.line2.text, F.line2.size || 4.6, F.line2.color || "#8a93a0", { ls: 1.6 }));
  }
  if (F.swiss) {
    out.push(text(CX, CY + 62, F.swiss, 3.4, "#6b7480", { ls: 1 }));
  }
  return out.join("");
}

// ---------- crown ----------

function crown(F) {
  const c = F.crown || {};
  const side = c.side || 3;
  const metal = F.caseColor === "gold" ? GOLD : STEEL;
  const out = [];
  const deg = side === 9 ? 180 : side === 4 ? 125 : 0;
  const [x, y] = polar(RC + 2, deg);
  const rot = deg;
  const w = 7;
  const len = side === 9 ? 10 : 11;
  if (c.guards) {
    const g1 = [polar(RC + 13, deg - 9), polar(RC + 9, deg - 4)];
    const g2 = [polar(RC + 13, deg + 9), polar(RC + 9, deg + 4)];
    out.push(`<line x1="${g1[0][0]}" y1="${g1[0][1]}" x2="${g1[1][0]}" y2="${g1[1][1]}" stroke="${metal}" stroke-width="4.6" stroke-linecap="round"/>`);
    out.push(`<line x1="${g2[0][0]}" y1="${g2[0][1]}" x2="${g2[1][0]}" y2="${g2[1][1]}" stroke="${metal}" stroke-width="4.6" stroke-linecap="round"/>`);
  }
  out.push(`<g transform="rotate(${rot} ${x} ${y})">
    <rect x="${x}" y="${y - w / 2}" width="${len}" height="${w}" rx="2" fill="${metal}" stroke="#00000055" stroke-width="0.5"/>
    <rect x="${x + len - 2.5}" y="${y - w / 2 + 1.3}" width="1.6" height="${w - 2.6}" fill="#00000044"/>
  </g>`);
  // big onion crown for pilots
  if (c.onion) {
    out.push(`<g transform="rotate(${rot} ${x} ${y})"><ellipse cx="${x + len - 1}" cy="${y}" rx="5" ry="6.2" fill="${F.caseColor === "gold" ? GOLD : STEEL}"/></g>`);
  }
  if (F.cabochon) {
    out.push(`<g transform="rotate(${rot} ${x} ${y})"><ellipse cx="${x + len + 0.5}" cy="${y}" rx="2.8" ry="3.6" fill="#24508f" stroke="#0d2c57" stroke-width="0.7"/></g>`);
  }
  return out.join("");
}

// ---------- digital displays (Casio etc.) ----------

function digitalDisplay(F) {
  const d = F.digital;
  const out = [];
  if (d.small) {
    out.push(`<rect x="${CX - 34}" y="${CY - 22}" width="68" height="42" rx="6" fill="#05070a" stroke="#3a4452" stroke-width="1"/>`);
    out.push(text(CX, CY - 8, "8:35", 17, "#aab8a0", { weight: "bold", ls: 0, family: "Lucida Console, monospace" }));
    out.push(text(CX, CY + 9, "THU", 6, "#5a6458", { ls: 1.4, family: "Lucida Console, monospace" }));
  } else {
    out.push(`<rect x="${CX - 56}" y="${CY - 34}" width="112" height="66" rx="4" fill="#05070a" stroke="#3a4452" stroke-width="1"/>`);
    out.push(text(CX, CY - 22, "8:35", 27, "#bac8ae", { weight: "bold", ls: 0, family: "Lucida Console, monospace" }));
    out.push(text(CX, CY + 4, "THU · 12:24", 8, "#6b7566", { ls: 0.6, family: "Lucida Console, monospace" }));
    out.push(text(CX, CY + 17, "PM · BATT", 6.5, "#59634f", { ls: 0.8, family: "Lucida Console, monospace" }));
  }
  return out.join("");
}

// ---------- bezel screws (Royal Oak, Santos, G-Shock) ----------

function screws(F) {
  const out = [];
  const screw = (x, y) =>
    `<circle cx="${x}" cy="${y}" r="2.6" fill="#cfd6dd" stroke="#5f6a77" stroke-width="0.6"/><line x1="${x - 1.8}" y1="${y}" x2="${x + 1.8}" y2="${y}" stroke="#5f6a77" stroke-width="0.8"/>`;
  if (F.caseShape === "octagon") {
    for (let k = 0; k < 8; k++) {
      const [x, y] = polar(RC - 8, k * 45);
      out.push(screw(x, y));
    }
  } else {
    for (let k = 0; k < 8; k++) {
      const [x, y] = polar(RC - 10, 22.5 + k * 45);
      out.push(screw(x, y));
    }
  }
  return out.join("");
}

// ---------- Lange 1 off-centre composition ----------

function langeCompose(F, blur) {
  const parts = [];
  parts.push(crown(F));
  parts.push(strap(F));
  parts.push(caseShape(F));
  parts.push(bezelBand(F));
  // main off-centre dial
  const main =
    dialDisk({ ...F, dialColor: "#f2ece0" }) +
    `<g stroke="#8b8577" stroke-width="1">${markers({ type: "stick", color: "#8b8577" })}</g>` +
    hands({ ...F, hourLen: 34, minLen: 46, handMetal: "#c9c2b0", lume: "#2a2620" });
  parts.push(`<g transform="translate(-26 -19) scale(0.72)">${main}</g>`);
  // big date upper right
  const [bx, by] = [CX + 26, CY - 40];
  parts.push(`<rect x="${bx - 16}" y="${by - 13}" width="16" height="26" fill="#f7f4ea" stroke="#8a8577" stroke-width="0.7"/>`);
  parts.push(`<rect x="${bx}" y="${by - 13}" width="16" height="26" fill="#f7f4ea" stroke="#8a8577" stroke-width="0.7"/>`);
  parts.push(text(bx - 8, by + 4.5, "2", 13, "#1a1c20", { weight: "bold", ls: 0 }));
  parts.push(text(bx + 8, by + 4.5, "5", 13, "#1a1c20", { weight: "bold", ls: 0 }));
  // small seconds at ~5 o'clock
  const [sx, sy] = polar(58, 155);
  parts.push(`<circle cx="${sx}" cy="${sy}" r="10" stroke="#8a8577" stroke-width="1" fill="none"/>`);
  for (let t = 0; t < 60; t += 5) {
    const [a, b] = [polar(8, t * 6, sx, sy), polar(5, t * 6, sx, sy)];
    parts.push(`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#8a8577" stroke-width="0.8"/>`);
  }
  parts.push(`<line x1="${sx}" y1="${sy - 7}" x2="${sx}" y2="${sy + 7}" stroke="#2a2620" stroke-width="1.2"/>`);
  // power reserve lower left
  const [px, py] = polar(44, 225);
  parts.push(`<path d="M ${px - 22} ${py} A 22 22 0 0 1 ${px + 22} ${py}" fill="none" stroke="#565f6b" stroke-width="5"/>`);
  parts.push(`<line x1="${px}" y1="${py}" x2="${px + 12}" y2="${py - 12}" stroke="#c9a55c" stroke-width="2"/>`);
  // case text
  parts.push(text(CX, 60, "A. LANGE & SÖHNE", 4.6, "#3c382f", { weight: "bold", ls: 0.6 }));
  parts.push(text(CX, CY + 40, "Lange 1", 4.4, "#6b6457", { ls: 1.6 }));
  const blurAttr = blur > 0 ? ` filter="blur(${blur}px)"` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 300">${defs()}<g${blurAttr}>${parts.join("")}</g></svg>`;
}

// ---------- composition ----------

function compose(F, blur) {
  const parts = [];
  parts.push(crown(F));
  parts.push(strap(F));
  parts.push(caseShape(F));
  parts.push(bezelBand(F));
  parts.push(dialDisk(F));
  parts.push(markers(F));
  if (F.screws) parts.push(screws(F));
  if (F.digital) parts.push(digitalDisplay(F));
  parts.push(dateWindow(F));
  parts.push(bigDate(F));
  if (F.subdials) parts.push(subdials(F));
  if (F.prArc) parts.push(powerReserve(F));
  if (F.gmt) parts.push(gmtHand(F.gmt));
  if (F.smallSeconds) {
    const [x, y] = polar(46, F.smallSeconds.deg || 90);
    parts.push(`<circle cx="${x}" cy="${y}" r="9" stroke="#8a93a0" stroke-width="1" fill="none"/>`);
    parts.push(`<line x1="${x}" y1="${y - 5.5}" x2="${x}" y2="${y + 5.5}" stroke="#20262e" stroke-width="1.2"/>`);
    parts.push(`<circle cx="${x}" cy="${y - 2}" r="0.9" fill="#20262e"/>`);
  }
  parts.push(logoText(F));
  parts.push(hands(F));

  const inner = parts.join("");
  const blurAttr = blur > 0 ? ` filter="blur(${blur}px)"` : "";
  const frame = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 300">${defs()}<g${blurAttr}>${inner}</g></svg>`;
  return frame;
}

// ---------- modes ----------

function crop(svg, vb) {
  return svg.replace(`viewBox="0 0 240 300"`, `viewBox="${vb}"`);
}

function renderWatch(watch, opts = {}) {
  const F = FACES[watch.face] || FACES["generic-diver"];
  const patch = watch.facePatch || {};
  const face = { ...F, ...patch, caseShape: patch.caseShape || F.caseShape, caseColor: patch.caseColor || F.caseColor };
  // normalize nested objects lightly
  for (const key of ["bezel", "strap", "crown", "hands", "markers", "date", "logo", "line2", "gmt", "prArc", "smallSeconds"]) {
    if (patch[key]) face[key] = { ...(F[key] || {}), ...patch[key] };
  }
  const full = face.offcenter && opts.mode !== "silhouette"
    ? langeCompose(face, opts.blur || 0)
    : compose(face, opts.blur || 0);

  switch (opts.mode) {
    case "dial":
      return crop(full, "42 34 156 156");
    case "macro": {
      const m = opts.macro || "center";
      if (m === "date") return crop(full, "142 84 58 46");
      if (m === "logo") return crop(full, "58 40 124 44");
      if (m === "bezel") return crop(full, "82 2 76 76");
      return crop(full, "82 62 76 76");
    }
    case "silhouette":
      return renderSilhouette(watch, opts.blur || 0);
    default:
      return full;
  }
}

// ---------- silhouette ----------

function renderSilhouette(watch, blur) {
  const F = FACES[watch.face] || FACES["generic-diver"];
  const patch = watch.facePatch || {};
  const shape = patch.caseShape || F.caseShape || "round";
  const dark = "#0b0e13";
  const dark2 = "#05070b";
  const out = [];

  // strap silhouette
  out.push(`<path d="M ${CX - 52} 214 L ${CX + 52} 214 L ${CX + 38} 296 L ${CX - 38} 296 Z" fill="${dark2}"/>`);

  // lugs
  out.push(`<path d="M ${CX - 64} 176 L ${CX - 44} 218 L ${CX - 46} 222 L ${CX - 70} 222 Z" fill="${dark2}"/>`);
  out.push(`<path d="M ${CX + 64} 176 L ${CX + 44} 218 L ${CX + 46} 222 L ${CX + 70} 222 Z" fill="${dark2}"/>`);

  // case
  let caseSvg = "";
  switch (shape) {
    case "square":
      caseSvg = `<rect x="${CX - 92}" y="${CY - 92}" width="184" height="184" rx="24" fill="${dark}"/>`;
      break;
    case "rect":
      caseSvg = `<rect x="${CX - 64}" y="${CY - 104}" width="128" height="208" rx="20" fill="${dark}"/>`;
      break;
    case "octagon": {
      const pts = [];
      for (let i = 0; i < 8; i++) pts.push(polar(116, i * 45).join(","));
      caseSvg = `<polygon points="${pts.join(" ")}" fill="${dark}"/>`;
      break;
    }
    case "cushion":
      caseSvg = `<rect x="${CX - 112}" y="${CY - 112}" width="224" height="224" rx="52" fill="${dark}"/>`;
      break;
    default:
      caseSvg = `<circle cx="${CX}" cy="${CY}" r="${RC}" fill="${dark}"/>`;
  }
  out.push(caseSvg);

  // crown nub
  const c = F.crown || {};
  out.push(`<rect x="${CX + 100}" y="${CY - 6}" width="14" height="12" rx="3" fill="${dark}"/>`);

  // crystal hole
  const holeR = shape === "rect" ? 68 : 74;
  if (shape === "rect") {
    out.push(`<rect x="${CX - 42}" y="${CY - 42}" width="84" height="84" rx="16" fill="${dark2}"/>`);
  } else if (shape === "square") {
    out.push(`<rect x="${CX - 58}" y="${CY - 58}" width="116" height="116" rx="20" fill="${dark2}"/>`);
  } else {
    out.push(`<circle cx="${CX}" cy="${CY}" r="${holeR}" fill="${dark2}"/>`);
  }
  const blurAttr = blur > 0 ? ` filter="blur(${blur}px)"` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 300"><g${blurAttr}>${out.join("")}</g></svg>`;
}

export { renderWatch, CX, CY, RC, RD };

export const VIEWBOX = "0 0 240 300";