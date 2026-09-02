// ============================================================
// Face presets: parameter objects consumed by render/watch.js.
// Watches reference these by name; per-watch patches may be
// applied via watch.facePatch (see data/watches.js).
// ============================================================

const LUME_WHITE = "#e8e4d8";
const LUME_GOLD = "#d9b46a";
const LUME_PALE = "#f2ead6";

export const FACES = {

  // ---------- ROLEX ----------

  "rolex-sub": {
    caseColor: "steel", caseShape: "round",
    bezel: { type: "dive", color1: "#0c0f13" },
    dialColor: "#0a0d11", markers: { type: "pips" }, lume: LUME_WHITE,
    hands: { hour: "mercedes", minute: "mercedes", second: "plain" },
    crown: { guards: true, side: 3 },
    date: { on: false },
    logo: { text: "ROLEX", size: 8.5, bold: true, ls: 2.2 },
    line2: { text: "SUBMARINER", size: 4.4, ls: 2.2 },
    swiss: "SWISS MADE",
    strap: { type: "oyster" },
  },

  "rolex-gmt": {
    caseColor: "steel", caseShape: "round",
    bezel: { type: "gmt", color1: "#0c0f13", color2: "#1d3a5f" },
    dialColor: "#0a0d11", markers: { type: "pips" }, lume: LUME_WHITE,
    hands: { hour: "mercedes", minute: "mercedes", second: "plain" },
    gmt: { color: "#d8723c", deg: 200 },
    crown: { guards: true, side: 3 },
    date: { on: true, cyclops: true },
    logo: { text: "ROLEX", size: 8, bold: true, ls: 2.2 },
    line2: { text: "GMT-MASTER II", size: 4, ls: 1.6 },
    swiss: "SWISS MADE",
    strap: { type: "oyster" },
  },

  "rolex-daytona": {
    caseColor: "steel", caseShape: "round",
    bezel: { type: "tach", color1: "#0c0f13" },
    dialColor: "#f2efe6", dialTexture: "plain",
    markers: { type: "stick", color: "#14171c" }, lume: LUME_WHITE,
    hands: { hour: "baton", minute: "baton", second: "red" },
    subdials: 3, subColor: "#14171c", subRing: "#cfd4da", chronoHands: true,
    crown: { guards: true, side: 3 },
    logo: { text: "ROLEX", size: 7.5, bold: true, ls: 2.2, color: "#8a6d2f" },
    line2: { text: "COSMOGRAPH", size: 4, ls: 1.8 },
    swiss: "SWISS MADE",
    strap: { type: "oyster" },
  },

  "rolex-explorer": {
    caseColor: "steel", caseShape: "round",
    bezel: { type: "smooth" },
    dialColor: "#0a0d11", markers: { type: "arabic", set: "2369", color: LUME_WHITE }, lume: LUME_WHITE,
    hands: { hour: "mercedes", minute: "mercedes", second: "plain" },
    crown: { guards: true, side: 3 },
    logo: { text: "ROLEX", size: 8, bold: true, ls: 2.2 },
    line2: { text: "EXPLORER", size: 4.4, ls: 2.2 },
    swiss: "SWISS MADE",
    strap: { type: "oyster" },
  },

  "rolex-datejust": {
    caseColor: "steel", caseShape: "round",
    bezel: { type: "fluted" },
    dialColor: "#e7e1d3", markers: { type: "batons", color: "#1c2026" }, lume: LUME_WHITE,
    hands: { hour: "baton", minute: "baton", second: "plain" },
    crown: { guards: true, side: 3 },
    date: { on: true, cyclops: true },
    logo: { text: "ROLEX", size: 8, bold: true, ls: 2.2 },
    line2: { text: "DATEJUST", size: 4.2, ls: 2.2 },
    swiss: "SWISS MADE",
    strap: { type: "jubilee" },
  },

  "rolex-daydate": {
    caseColor: "gold", caseShape: "round",
    bezel: { type: "fluted" },
    dialColor: "#e6dfca", markers: { type: "batons", color: "#3a2f17" }, lume: LUME_WHITE,
    hands: { hour: "baton", minute: "baton", second: "plain" },
    crown: { guards: true, side: 3 },
    date: { on: true, day: true, cyclops: false },
    logo: { text: "ROLEX", size: 8.5, bold: true, ls: 2.2, color: "#7a5c20" },
    line2: { text: "DAY-DATE", size: 4.2, ls: 2.2 },
    swiss: "SWISS MADE",
    strap: { type: "oyster" },
  },

  // ---------- OMEGA ----------

  "omega-speedmaster": {
    caseColor: "steel", caseShape: "round",
    bezel: { type: "tach", color1: "#0c0e12" },
    dialColor: "#0a0c10", markers: { type: "stick", color: "#dfe4ea", twelve: "double" }, lume: LUME_PALE,
    hands: { hour: "baton", minute: "baton", second: "plain" },
    subdials: 3, subColor: "#101318", subRing: "#d8dee5", chronoHands: true,
    crown: { side: 3, guards: false },
    logo: { text: "OMEGA", symbol: "Ω", size: 8.5, bold: true, ls: 1.4 },
    line2: { text: "SPEEDMASTER", size: 4.6, ls: 1.8 },
    swiss: "SWISS MADE",
    strap: { type: "oyster" },
  },

  "omega-seamaster": {
    caseColor: "steel", caseShape: "round",
    bezel: { type: "dive", color1: "#14232f", color2: "#1e3a4d" },
    dialColor: "#1c3c55", dialTexture: "wave", markers: { type: "pips", color: "#dfe6ec" }, lume: LUME_WHITE,
    hands: { hour: "sword", minute: "sword", second: "redtip" },
    crown: { side: 3, guards: false },
    date: { on: true, at: 6 },
    logo: { text: "OMEGA", symbol: "Ω", size: 9.5, bold: true, ls: 1.2 },
    line2: { text: "SEAMASTER", size: 4.4, ls: 1.8 },
    swiss: "SWISS MADE",
    strap: { type: "oyster" },
  },

  "omega-at": {
    caseColor: "steel", caseShape: "round",
    bezel: { type: "smooth" },
    dialColor: "#e8e6de", dialTexture: "horizontal",
    markers: { type: "stick", color: "#55605c" }, lume: LUME_WHITE,
    hands: { hour: "baton", minute: "baton", second: "blued" },
    date: { on: true, at: 6 },
    logo: { text: "OMEGA", symbol: "Ω", size: 9, bold: true, ls: 1.4 },
    line2: { text: "AQUA TERRA", size: 4.2, ls: 2 },
    swiss: "SWISS MADE",
    strap: { type: "oyster" },
  },

  // ---------- TUDOR ----------

  "tudor-bb58": {
    caseColor: "steel", caseShape: "round",
    bezel: { type: "dive", color1: "#101316" },
    dialColor: "#0c0f13", markers: { type: "pips" }, lume: LUME_GOLD,
    hands: { hour: "snowflake", minute: "snowflake", second: "plain" },
    crown: { guards: true, side: 3 },
    logo: { text: "TUDOR", size: 8, bold: true, ls: 2.4, color: LUME_GOLD },
    line2: { text: "AUTOMATIC  200m:660ft", size: 3.6, ls: 0.8, color: "#9a8a66" },
    swiss: "SWISS MADE",
    strap: { type: "oyster" },
  },

  "tudor-bbchrono": {
    caseColor: "steel", caseShape: "round",
    bezel: { type: "tach", color1: "#101316" },
    dialColor: "#efece2", markers: { type: "stick", color: "#20242a", twelve: "double" }, lume: LUME_WHITE,
    hands: { hour: "snowflake", minute: "snowflake", second: "red" },
    subdials: 2, subColor: "#101318", subRing: "#cdd2d8", chronoHands: true,
    crown: { guards: true, side: 3 },
    date: { on: true, at: 6 },
    logo: { text: "TUDOR", size: 8.5, bold: true, ls: 2.4 },
    line2: { text: "CHRONOGRAPH", size: 4.2, ls: 1.8 },
    strap: { type: "oyster" },
  },

  // ---------- SEIKO ----------

  "seiko-skx": {
    caseColor: "steel", caseShape: "round",
    bezel: { type: "dive", color1: "#0c0f13" },
    dialColor: "#0a0d11", markers: { type: "pips" }, lume: "#c8d9a8",
    hands: { hour: "sword", minute: "sword", second: "plain" },
    crown: { guards: true, side: 4 },
    date: { on: true, day: true },
    logo: { text: "SEIKO", size: 8.5, bold: true, ls: 2.2 },
    line2: { text: "AUTOMATIC 200m", size: 4.4, ls: 1.4 },
    strap: { type: "oyster" },
  },

  "seiko-sarb": {
    caseColor: "steel", caseShape: "round",
    bezel: { type: "smooth" },
    dialColor: "#101216", dialTexture: "sunburst",
    markers: { type: "stick", color: "#d8dee5" }, lume: LUME_WHITE,
    hands: { hour: "dauphine", minute: "dauphine", second: "plain" },
    date: { on: true },
    logo: { text: "SEIKO", size: 8, bold: true, ls: 2 },
    line2: { text: "AUTOMATIC", size: 4.2, ls: 1.8 },
    swiss: "MADE IN JAPAN",
    strap: { type: "oyster" },
  },

  "seiko-willard": {
    caseColor: "steel", caseShape: "round",
    bezel: { type: "dive", color1: "#101318" },
    dialColor: "#0d1014", markers: { type: "pips" }, lume: LUME_GOLD,
    hands: { hour: "sword", minute: "sword", second: "lollipop" },
    crown: { guards: true, side: 4 },
    logo: { text: "SEIKO", size: 7.5, bold: true, ls: 2 },
    line2: { text: "DIVERS 200 m", size: 3.8, ls: 1.2, color: "#c9a55c" },
    strap: { type: "oyster" },
  },

  // ---------- GRAND SEIKO ----------

  "gs-snowflake": {
    caseColor: "titanium", caseShape: "round",
    bezel: { type: "smooth" },
    dialColor: "#eae5da", dialTexture: "snow",
    markers: { type: "stick", color: "#9aa0a8", twelve: "double" }, lume: LUME_WHITE,
    hands: { hour: "dauphine", minute: "dauphine", second: "blued" },
    date: { on: true },
    prArc: { deg: 240 },
    logo: { text: "Grand Seiko", size: 7.5, bold: true, ls: 1.4, color: "#262b31" },
    line2: { text: "SPRING DRIVE", size: 3.6, ls: 1.6, color: "#5a6068" },
    swiss: "GRAND SEIKO",
    strap: { type: "titanium" },
  },

  // ---------- CASIO ----------

  "casio-f91w": {
    caseColor: "resin", caseShape: "square", corners: 18,
    bezel: { type: "nobezel" },
    dialColor: "#2b323c", markers: { type: "plain" },
    hands: { second: "none" },
    crown: { side: 3 },
    strap: { type: "resin" },
    digital: { show: true, small: true },
    logo: { text: "CASIO", size: 5.5, bold: true, ls: 1.2, color: "#9aa4b0", y: 74 },
    line2: { text: "F-91W", size: 4, ls: 1.2, color: "#6b7480" },
  },

  "casio-gshock": {
    caseColor: "resin", caseShape: "square", corners: 12,
    bezel: { type: "nobezel" },
    dialColor: "#15181d", markers: { type: "plain" },
    hands: { second: "none" },
    crown: { side: 3 },
    strap: { type: "resin" },
    digital: { show: true, small: false },
    logo: { text: "G-SHOCK", size: 6.5, bold: true, ls: 1.4, color: "#e8e4d8", y: 66 },
    line2: { text: "PROTECTION", size: 4, ls: 2, color: "#8a93a0" },
  },

  "casio-ga2100": {
    caseColor: "black", caseShape: "octagon",
    bezel: { type: "nobezel" },
    dialColor: "#15181d", markers: { type: "stick", color: "#c9cfd6" },
    hands: { hour: "baton", minute: "baton", second: "plain", secondColor: "#c9a55c" },
    screws: true,
    crown: { side: 3 },
    strap: { type: "resin" },
    logo: { text: "CASIO", size: 5, bold: true, ls: 1.6, color: "#9aa4b0", y: 70 },
    line2: { text: "G-SHOCK", size: 4.6, ls: 1.6, color: "#dfe4ea" },
  },

  // ---------- PATEK ----------

  "patek-nautilus": {
    caseColor: "steel", caseShape: "octagon", corners: 8,
    bezel: { type: "smooth" },
    dialColor: "#23405e", dialTexture: "horizontal",
    markers: { type: "batons", color: "#d8dee5" }, lume: LUME_WHITE,
    hands: { hour: "baton", minute: "baton", second: "plain" },
    date: { on: true },
    logo: { text: "PATEK PHILIPPE", size: 5, bold: true, ls: 0.6, color: "#dfe4ea", y: 66 },
    line2: { text: "NAUTILUS", size: 4, ls: 1.4, color: "#9aa4b0" },
    strap: { type: "integrated" },
  },

  "patek-calatrava": {
    caseColor: "gold", caseShape: "round",
    bezel: { type: "smooth", gold: true },
    dialColor: "#efeae0", markers: { type: "batons", color: "#4a443a" }, lume: LUME_PALE,
    hands: { hour: "dauphine", minute: "dauphine", second: "blued" },
    smallSeconds: { deg: 90 },
    logo: { text: "PATEK PHILIPPE", size: 5.4, bold: true, ls: 0.4, color: "#3c382f", y: 62 },
    line2: { text: "GENÈVE", size: 4.4, ls: 1.6, color: "#6b6457" },
    strap: { type: "leather", colors: ["#1c1a17", "#2a2620"] },
  },

  // ---------- AP ----------

  "ap-royaloak": {
    caseColor: "steel", caseShape: "octagon", corners: 6,
    bezel: { type: "smooth" },
    dialColor: "#1d3a5c", dialTexture: "tapisserie",
    markers: { type: "batons", color: "#dfe4ea" }, lume: LUME_WHITE,
    hands: { hour: "baton", minute: "baton", second: "plain" },
    date: { on: true },
    screws: true,
    logo: { text: "AUDEMARS PIGUET", size: 4.2, bold: true, ls: 0.4, color: "#dfe4ea", y: 62 },
    line2: { text: "AUTOMATIC", size: 3.8, ls: 1.8, color: "#9aa4b0" },
    strap: { type: "integrated" },
  },

  // ---------- JLC ----------

  "jlc-reverso": {
    caseColor: "steel", caseShape: "rect", corners: 16,
    bezel: { type: "nobezel" },
    dialColor: "#ece7dc", markers: { type: "batons", color: "#3a454f" }, lume: LUME_PALE,
    hands: { hour: "dauphine", minute: "dauphine", second: "blued" },
    smallSeconds: { deg: 90 },
    crown: { side: 3 },
    logo: { text: "JAEGER-LECOULTRE", size: 5, bold: true, ls: 0.4, color: "#3a454f", y: 56 },
    line2: { text: "REVERSO", size: 4.6, ls: 2, color: "#6a7480" },
    strap: { type: "leather", colors: ["#2a221a", "#3a2f22"] },
  },

  // ---------- IWC ----------

  "iwc-pilot": {
    caseColor: "steel", caseShape: "round",
    bezel: { type: "smooth" },
    dialColor: "#0a0d11", markers: { type: "arabic", set: "military", color: "#e8edf2", innerColor: "#8a93a080", twelve: "triangle" }, lume: LUME_WHITE,
    hands: { hour: "syringe", minute: "syringe", second: "red" },
    crown: { side: 3, onion: true },
    logo: { text: "IWC", size: 8, bold: true, ls: 3, color: "#e8edf2" },
    line2: { text: "SCHAFFHAUSEN", size: 3.8, ls: 1.6, color: "#8a93a0" },
    strap: { type: "leather", colors: ["#12161b", "#1f2731"] },
  },

  // ---------- BREITLING ----------

  "breitling-navitimer": {
    caseColor: "steel", caseShape: "round",
    bezel: { type: "slide", color1: "#101318" },
    dialColor: "#0f1216", markers: { type: "stick", color: "#dfe4ea", twelve: "double" }, lume: LUME_WHITE,
    hands: { hour: "baton", minute: "baton", second: "red" },
    subdials: 3, subColor: "#14171c", subRing: "#d8dee5", chronoHands: true,
    logo: { text: "BREITLING", size: 6.5, bold: true, ls: 1.2 },
    line2: { text: "NAVITIMER B01", size: 4.2, ls: 1.6 },
    swiss: "SWISS MADE",
    strap: { type: "leather", colors: ["#241f18", "#33291d"] },
  },

  // ---------- TAG HEUER ----------

  "tag-monaco": {
    caseColor: "steel", caseShape: "square", corners: 14,
    bezel: { type: "nobezel" },
    dialColor: "#1d3c63", dialTexture: "horizontal",
    markers: { type: "stick", color: "#e8edf2" }, lume: LUME_WHITE,
    hands: { hour: "sword", minute: "sword", second: "red", secondColor: "#cf3a3a" },
    subdials: 2, subColor: "#e8edf2", subRing: "#e8edf2", chronoHands: true,
    crown: { side: 9 },
    logo: { text: "MONACO", size: 8, bold: true, ls: 1.6, color: "#e8edf2" },
    line2: { text: "TAG HEUER", size: 4.6, ls: 1.4, color: "#8fa3b8" },
    swiss: "SWISS MADE",
    strap: { type: "leather", colors: ["#181515", "#241f1f"] },
  },

  // ---------- CARTIER ----------

  "cartier-santos": {
    caseColor: "steel", caseShape: "square", corners: 26,
    bezel: { type: "smooth" },
    dialColor: "#ede9e0", markers: { type: "roman" }, lume: LUME_PALE,
    hands: { hour: "sword", minute: "sword", second: "blued" },
    screws: true,
    crown: { side: 3 },
    logo: { text: "CARTIER", size: 6.5, bold: true, ls: 1.6, color: "#333a42", y: 58 },
    line2: { text: "SWISS MADE", size: 3.2, ls: 1.4, color: "#6b7480" },
    strap: { type: "leather", colors: ["#31312e", "#41413c"] },
  },

  "cartier-tank": {
    caseColor: "gold", caseShape: "rect", corners: 18,
    bezel: { type: "nobezel" },
    dialColor: "#f1ece0", markers: { type: "roman" }, lume: LUME_PALE,
    hands: { hour: "sword", minute: "sword", second: "blued" },
    cabochon: true,
    crown: { side: 3 },
    logo: { text: "CARTIER", size: 6, bold: true, ls: 1.6, color: "#333a42", y: 48 },
    line2: { text: "SWISS MADE", size: 3.2, ls: 1.4, color: "#6b7480", y: 150 },
    strap: { type: "leather", colors: ["#2a241b", "#3a3224"] },
  },

  // ---------- PANERAI ----------

  "panerai-luminor": {
    caseColor: "steel", caseShape: "cushion", corners: 52,
    bezel: { type: "smooth" },
    dialColor: "#0c0f13", markers: { type: "arabic", set: "huge", extra: "stick", color: LUME_GOLD }, lume: LUME_GOLD,
    hands: { hour: "sword", minute: "sword", second: "plain" },
    crown: { guards: true, side: 3 },
    logo: { text: "PANERAI", size: 7, bold: true, ls: 1.6, color: LUME_GOLD, y: 56 },
    line2: { text: "LUMINOR MARINA", size: 4.2, ls: 1.4, color: LUME_GOLD },
    strap: { type: "leather", colors: ["#26221c", "#332d24"] },
  },

  // ---------- NOMOS ----------

  "nomos-tangente": {
    caseColor: "steel", caseShape: "round",
    bezel: { type: "nobezel" },
    dialColor: "#f4f1e8", markers: { type: "batons", color: "#20242a" }, lume: LUME_WHITE,
    hands: { hour: "baton", minute: "baton", second: "blued" },
    smallSeconds: { deg: 90 },
    crown: { side: 3 },
    logo: { text: "Glashütte", size: 5, weight: "normal", italic: true, ls: 1, color: "#3a434d", y: 60 },
    line2: { text: "NOMOS", size: 5.2, ls: 2, color: "#20242a" },
    strap: { type: "leather", colors: ["#1c1a18", "#26221e"] },
  },

  // ---------- ZENITH ----------

  "zenith-elprimero": {
    caseColor: "steel", caseShape: "round",
    bezel: { type: "smooth" },
    dialColor: "#e8e4da", markers: { type: "stick", color: "#14171c", twelve: "double" }, lume: LUME_PALE,
    hands: { hour: "baton", minute: "baton", second: "red", secondColor: "#cf3a3a" },
    subdials: 3, subColor: "#1a1d22", subRing: "#c9ced4", chronoHands: true,
    logo: { text: "ZENITH", size: 7, bold: true, ls: 2 },
    line2: { text: "CHRONOMASTER", size: 4.2, ls: 1.6 },
    swiss: "SWISS MADE",
    strap: { type: "oyster" },
  },

  // ---------- HAMILTON ----------

  "hamilton-khaki": {
    caseColor: "steel", caseShape: "round",
    bezel: { type: "smooth" },
    dialColor: "#0a0d11", markers: { type: "arabic", set: "military", color: "#e8edf2", innerColor: "#e8edf280", twelve: "triangle" }, lume: LUME_WHITE,
    hands: { hour: "syringe", minute: "syringe", second: "red" },
    crown: { side: 3 },
    logo: { text: "HAMILTON", size: 6, bold: true, ls: 1.2 },
    line2: { text: "KHAKI", size: 4.4, ls: 2 },
    swiss: "SWISS MADE",
    strap: { type: "leather", colors: ["#26231d", "#332e26"] },
  },

  // ---------- CHRISTOPHER WARD ----------

  "cw-c60": {
    caseColor: "steel", caseShape: "round",
    bezel: { type: "dive", color1: "#101318" },
    dialColor: "#1a2c3a", dialTexture: "wave",
    markers: { type: "pips" }, lume: LUME_WHITE,
    hands: { hour: "sword", minute: "sword", second: "redtip" },
    date: { on: true, at: 6 },
    crown: { guards: true, side: 3 },
    logo: { text: "CHRISTOPHER WARD", size: 4.4, bold: true, ls: 0.6, y: 56 },
    line2: { text: "300m / 1000ft", size: 3.8, ls: 1, color: "#c9d2da" },
    strap: { type: "oyster" },
  },

  // ---------- A. LANGE & SÖHNE ----------

  "lange-lange1": {
    caseColor: "gold", caseShape: "round",
    bezel: { type: "smooth", gold: true },
    dialColor: "#efe9dc", markers: { type: "plain" },
    hands: { hour: "baton", minute: "baton", second: "plain" },
    offcenter: true,
    bigDate: true,
    prArc: { deg: 220 },
    crown: { side: 3 },
    logo: { text: "A. LANGE & SÖHNE", size: 4.6, bold: true, ls: 0.8, color: "#3c382f", y: 52 },
    line2: { text: "Lange 1", size: 4.4, ls: 1.6, color: "#6b6457" },
    strap: { type: "leather", colors: ["#2a221a", "#3a2f22"] },
  },

  // ---------- TISSOT ----------

  "tissot-prx": {
    caseColor: "steel", caseShape: "square", corners: 22,
    bezel: { type: "smooth" },
    dialColor: "#24406b", dialTexture: "tapisserie",
    markers: { type: "batons", color: "#dfe4ea" }, lume: LUME_WHITE,
    hands: { hour: "baton", minute: "baton", second: "plain" },
    date: { on: true },
    logo: { text: "TISSOT", size: 6.5, bold: true, ls: 1.6, color: "#e8edf2", y: 60 },
    line2: { text: "PRX", size: 5, ls: 1.6, color: "#c9d2da" },
    strap: { type: "integrated" },
  },

  // ---------- ORIS ----------

  "oris-d65": {
    caseColor: "steel", caseShape: "round",
    bezel: { type: "dive", color1: "#101318" },
    dialColor: "#0f1419", markers: { type: "pips", twelve: "arrow", color: LUME_GOLD }, lume: LUME_GOLD,
    hands: { hour: "sword", minute: "sword", second: "lollipop" },
    date: { on: true, at: 6 },
    crown: { guards: true, side: 3 },
    logo: { text: "ORIS", size: 7.5, bold: true, ls: 2.4, color: LUME_GOLD },
    line2: { text: "DIVERS SIXTY-FIVE", size: 4, ls: 1.6, color: "#c9a55c" },
    strap: { type: "leather", colors: ["#2a241b", "#3a3224"] },
  },

  // ---------- fallback ----------

  "generic-diver": {
      caseColor: "steel", caseShape: "round",
      bezel: { type: "dive", color1: "#101318" },
      dialColor: "#0c0f13", markers: { type: "pips" }, lume: LUME_WHITE,
      hands: { hour: "sword", minute: "sword", second: "plain" },
      logo: { text: "WATCH CO", size: 7, bold: true, ls: 2 },
      strap: { type: "oyster" },
    },
  };