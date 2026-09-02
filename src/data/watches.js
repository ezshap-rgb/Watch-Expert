// ============================================================
// Watch Knowledge Game — core data
//
// Facts are hand-curated and approximate on purpose:
//   - prices are approximate USD retail/street figures (~2024)
//     and are used only as game data ("retail price, approx").
//   - tier = intrinsic knowledge difficulty (1 easy → 5 obscure)
//
// `face` names refer to presets implemented by src/render/watch.js
// ============================================================

export const WATCHES = [
  // ---------- ROLEX ----------
  {
    id: "rolex-sub-124060",
    brand: "Rolex", model: "Submariner", ref: "124060",
    nickname: "No-Date Sub", family: "Submariner",
    year: 2020,
    movement: { name: "Calibre 3230", kind: "auto", inHouse: true, pr: 70 },
    case: { size: 41, wr: 300, material: "Oystersteel" },
    price: 9800, priceType: "retail",
    tier: 2, face: "rolex-sub", tags: ["dive", "icon", "black-dial"],
    fact: "The Submariner debuted in 1953 with 100 m of water resistance; the ceramic bezel only arrived in 2008.",
  },
  {
    id: "rolex-subdate-126610ln",
    brand: "Rolex", model: "Submariner Date", ref: "126610LN",
    nickname: "", family: "Submariner",
    year: 2020,
    movement: { name: "Calibre 3235", kind: "auto", inHouse: true, pr: 70 },
    case: { size: 41, wr: 300, material: "Oystersteel" },
    price: 11300, priceType: "retail",
    tier: 3, face: "rolex-sub", tags: ["dive", "icon", "black-dial", "cyclops"],
    facePatch: { date: { on: true, cyclops: true } },
    fact: "The Submariner Date is the version Agent 007 wore — from Dr. No in 1962 onward.",
  },
  {
    id: "rolex-gmt-126710blnr",
    brand: "Rolex", model: "GMT-Master II", ref: "126710BLNR",
    nickname: "Batman", family: "GMT-Master",
    year: 2021,
    movement: { name: "Calibre 3285", kind: "auto", inHouse: true, pr: 70 },
    case: { size: 40, wr: 100, material: "Oystersteel" },
    price: 11500, priceType: "retail",
    tier: 3, face: "rolex-gmt", tags: ["gmt", "icon", "black-dial"],
    fact: "The two-tone black-and-blue bezel earned the 126710BLNR the nickname 'Batman'.",
  },
  {
    id: "rolex-gmt-16710-pepsi",
    brand: "Rolex", model: "GMT-Master", ref: "16710",
    nickname: "Pepsi", family: "GMT-Master",
    year: 1989,
    movement: { name: "Calibre 3185", kind: "auto", inHouse: true, pr: 50 },
    case: { size: 40, wr: 100, material: "Oystersteel" },
    price: 14500, priceType: "street",
    tier: 4, face: "rolex-gmt", tags: ["gmt", "vintage"],
    facePatch: { bezel: { type: "gmt", color1: "#7a1210", color2: "#163a6b" }, line2: { text: "GMT-MASTER" } },
    fact: "The 16710's red-and-blue 'Pepsi' aluminium bezel insert was a 1989–2007 mainstay.",
  },
  {
    id: "rolex-daytona-116500ln",
    brand: "Rolex", model: "Cosmograph Daytona", ref: "116500LN",
    nickname: "Panda Daytona", family: "Daytona",
    year: 2016,
    movement: { name: "Calibre 4130", kind: "auto", inHouse: true, pr: 72 },
    case: { size: 40, wr: 100, material: "Oystersteel" },
    price: 16900, priceType: "retail",
    tier: 3, face: "rolex-daytona", tags: ["chrono", "icon", "white-dial"],
    fact: "The white-dial/black-subdial 'Panda' Daytona is one of the most awaited steel sports watches on waiting lists.",
  },
  {
    id: "rolex-explorer-124270",
    brand: "Rolex", model: "Explorer", ref: "124270",
    nickname: "", family: "Explorer",
    year: 2021,
    movement: { name: "Calibre 3230", kind: "auto", inHouse: true, pr: 70 },
    case: { size: 36, wr: 100, material: "Oystersteel" },
    price: 7600, priceType: "retail",
    tier: 2, face: "rolex-explorer", tags: ["field", "icon"],
    fact: "The Explorer's 3-6-9 dial traces back to 1953, when Everest summiteers wore Rolex Oysters.",
  },
  {
    id: "rolex-datejust-126334",
    brand: "Rolex", model: "Datejust 41", ref: "126334",
    nickname: "Wimbledon", family: "Datejust",
    year: 2016,
    movement: { name: "Calibre 3235", kind: "auto", inHouse: true, pr: 70 },
    case: { size: 41, wr: 100, material: "Oystersteel / white gold" },
    price: 11500, priceType: "retail",
    tier: 3, face: "rolex-datejust", tags: ["dress", "cyclops", "icon"],
    fact: "The first Datejust (1945) was the first automatic wristwatch with a date window.",
  },
  {
    id: "rolex-daydate-228238",
    brand: "Rolex", model: "Day-Date 40", ref: "228238",
    nickname: "President", family: "Day-Date",
    year: 2015,
    movement: { name: "Calibre 3255", kind: "auto", inHouse: true, pr: 70 },
    case: { size: 40, wr: 100, material: "18k yellow gold" },
    price: 44000, priceType: "retail",
    tier: 4, face: "rolex-daydate", tags: ["dress", "gold"],
    fact: "Presidents from LBJ onward wore the Day-Date, and it is still only ever made in precious metal.",
  },

  // ---------- OMEGA ----------
  {
    id: "omega-speedmaster-310",
    brand: "Omega", model: "Speedmaster Professional", ref: "310.30.42.50.01.001",
    nickname: "Moonwatch", family: "Speedmaster",
    year: 2021,
    movement: { name: "Calibre 3861", kind: "manual", inHouse: true, pr: 50 },
    case: { size: 42, wr: 50, material: "Steel" },
    price: 7700, priceType: "retail",
    tier: 2, face: "omega-speedmaster", tags: ["chrono", "icon", "black-dial"],
    fact: "A Speedmaster was worn on the Moon on 20 July 1969 — the only watch flight-qualified by NASA for EVA.",
  },
  {
    id: "omega-seamaster-300m",
    brand: "Omega", model: "Seamaster Diver 300 M", ref: "210.30.42.20.01.001",
    nickname: "", family: "Seamaster",
    year: 2018,
    movement: { name: "Calibre 8800", kind: "auto", inHouse: true, pr: 55 },
    case: { size: 42, wr: 300, material: "Steel" },
    price: 6100, priceType: "retail",
    tier: 3, face: "omega-seamaster", tags: ["dive", "icon", "blue-dial"],
    fact: "The wave-pattern dial and scalloped bezel are the watch James Bond has worn since 1995.",
  },
  {
    id: "omega-at-41",
    brand: "Omega", model: "Aqua Terra 41", ref: "220.10.41.21.03.001",
    nickname: "", family: "Aqua Terra",
    year: 2022,
    movement: { name: "Calibre 8900", kind: "auto", inHouse: true, pr: 60 },
    case: { size: 41, wr: 150, material: "Steel" },
    price: 6600, priceType: "retail",
    tier: 4, face: "omega-at", tags: ["gada"],
    fact: "The vertical 'teak' stripes echo the wooden decks of yachts — the Aqua Terra's nautical roots.",
  },

  // ---------- TUDOR ----------
  {
    id: "tudor-bb58",
    brand: "Tudor", model: "Black Bay 58", ref: "M79030B",
    nickname: "BB58", family: "Black Bay",
    year: 2018,
    movement: { name: "Calibre MT5402", kind: "auto", inHouse: true, pr: 70 },
    case: { size: 39, wr: 200, material: "Steel" },
    price: 4700, priceType: "retail",
    tier: 3, face: "tudor-bb58", tags: ["dive", "icon", "black-dial"],
    fact: "The 39 mm Black Bay 58 takes its size and gilt dial from Tudor's 1958 'Big Crown' dive watch.",
  },
  {
    id: "tudor-bbchrono",
    brand: "Tudor", model: "Black Bay Chrono", ref: "M79360N-0002",
    nickname: "Panda", family: "Black Bay",
    year: 2021,
    movement: { name: "Calibre MT5813", kind: "auto", inHouse: true, pr: 70 },
    case: { size: 41, wr: 200, material: "Steel" },
    price: 6300, priceType: "retail",
    tier: 4, face: "tudor-bbchrono", tags: ["chrono", "dive", "white-dial"],
    fact: "The MT5813 is co-developed with Breitling, based on Breitling's manufacture chronograph B01.",
  },

  // ---------- SEIKO ----------
  {
    id: "seiko-skx007",
    brand: "Seiko", model: "SKX007", ref: "SKX007K",
    nickname: "The Diver's Watch", family: "SKX",
    year: 1996,
    movement: { name: "7S26", kind: "auto", inHouse: true, pr: 41 },
    case: { size: 42.5, wr: 200, material: "Steel" },
    price: 350, priceType: "street",
    tier: 2, face: "seiko-skx", tags: ["dive", "icon", "black-dial"],
    fact: "Discontinued in 2019 after 23 years, the SKX007 is the quintessential affordable automatic diver.",
  },
  {
    id: "seiko-sarb033",
    brand: "Seiko", model: "SARB033", ref: "SARB033",
    nickname: "Baby Grand Seiko", family: "SARB",
    year: 2006,
    movement: { name: "6R15", kind: "auto", inHouse: true, pr: 50 },
    case: { size: 38, wr: 100, material: "Steel" },
    price: 600, priceType: "street",
    tier: 4, face: "seiko-sarb", tags: ["dress"],
    fact: "A JDM legend whose crisp 38 mm case earned it the 'Baby Grand Seiko' nickname.",
  },
  {
    id: "seiko-willard-spb151",
    brand: "Seiko", model: "Prospex 'Willard'", ref: "SPB151",
    nickname: "Willard", family: "Prospex",
    year: 2020,
    movement: { name: "6R35", kind: "auto", inHouse: true, pr: 70 },
    case: { size: 40, wr: 200, material: "Steel" },
    price: 1450, priceType: "retail",
    tier: 4, face: "seiko-willard", tags: ["dive", "vintage", "black-dial"],
    fact: "Nicknamed after Captain Willard in Apocalypse Now, who wore its 1970s ancestor, the 6105.",
  },

  // ---------- GRAND SEIKO ----------
  {
    id: "gs-snowflake",
    brand: "Grand Seiko", model: "Snowflake", ref: "SBGA211",
    nickname: "Snowflake", family: "Grand Seiko",
    year: 2011,
    movement: { name: "9R65 Spring Drive", kind: "springdrive", inHouse: true, pr: 72 },
    case: { size: 41, wr: 100, material: "Titanium" },
    price: 6000, priceType: "retail",
    tier: 3, face: "gs-snowflake", tags: ["springdrive", "icon", "white-dial"],
    fact: "The dial is inspired by snow on Mt. Iwate; the sweeping seconds hand is powered by Spring Drive's glide wheel.",
  },

  // ---------- CASIO ----------
  {
    id: "casio-f91w",
    brand: "Casio", model: "F-91W", ref: "F-91W-1",
    nickname: "The Legend", family: "Classic",
    year: 1989,
    movement: { name: "Module 3229", kind: "quartz", inHouse: true, pr: null },
    case: { size: 36, wr: 30, material: "Resin" },
    price: 20, priceType: "retail",
    tier: 2, face: "casio-f91w", tags: ["digital", "icon"],
    fact: "A $20 legend in continuous production since 1989 — it even has its own Wikipedia section on cultural impact.",
  },
  {
    id: "casio-gshock-dw5600",
    brand: "Casio", model: "G-Shock DW-5600", ref: "DW-5600E-1V",
    nickname: "The Square", family: "G-Shock",
    year: 1996,
    movement: { name: "Module 3229", kind: "quartz", inHouse: true, pr: null },
    case: { size: 48.5, wr: 200, material: "Resin" },
    price: 55, priceType: "retail",
    tier: 2, face: "casio-gshock", tags: ["digital", "icon"],
    fact: "G-Shock was born in 1983 after engineer Kikuo Ibe dropped his grandfather's pocket watch and vowed to build an unbreakable one.",
  },
  {
    id: "casio-ga2100",
    brand: "Casio", model: "GA-2100", ref: "GA-2100-1A1",
    nickname: "CasiOak", family: "G-Shock",
    year: 2019,
    movement: { name: "Module 5611", kind: "quartz", inHouse: true, pr: null },
    case: { size: 48.5, wr: 200, material: "Carbon-reinforced resin" },
    price: 110, priceType: "retail",
    tier: 3, face: "casio-ga2100", tags: ["octagon", "digital"],
    fact: "Its octagonal carbon case earned it the pun nickname 'CasiOak' — the budget rival to the Royal Oak.",
  },

  // ---------- PATEK ----------
  {
    id: "patek-nautilus-5711",
    brand: "Patek Philippe", model: "Nautilus", ref: "5711/1A-010",
    nickname: "", family: "Nautilus",
    year: 2006,
    movement: { name: "Calibre 324 SC", kind: "auto", inHouse: true, pr: 45 },
    case: { size: 40, wr: 120, material: "Steel" },
    price: 34900, priceType: "retail",
    tier: 3, face: "patek-nautilus", tags: ["integrated", "icon", "blue-dial"],
    fact: "This was listed at ~$35k at retail; discontinued in 2021, the market price quickly exceeded $100k.",
  },
  {
    id: "patek-calatrava-6119",
    brand: "Patek Philippe", model: "Calatrava", ref: "6119R-001",
    nickname: "", family: "Calatrava",
    year: 2021,
    movement: { name: "Calibre 30-255 PS", kind: "manual", inHouse: true, pr: 65 },
    case: { size: 39, wr: 30, material: "18k rose gold" },
    price: 34000, priceType: "retail",
    tier: 4, face: "patek-calatrava", tags: ["dress", "gold"],
    fact: "The Calatrava, introduced in 1932, is the very definition of a 'less is more' dress watch.",
  },

  // ---------- AP ----------
  {
    id: "ap-royaloak-16202",
    brand: "Audemars Piguet", model: "Royal Oak 'Jumbo'", ref: "16202ST",
    nickname: "Jumbo", family: "Royal Oak",
    year: 2022,
    movement: { name: "Calibre 7121", kind: "auto", inHouse: true, pr: 55 },
    case: { size: 39, wr: 50, material: "Steel" },
    price: 36000, priceType: "retail",
    tier: 3, face: "ap-royaloak", tags: ["integrated", "icon", "blue-dial"],
    fact: "Designed by Gérald Genta in a single night in 1972, the Royal Oak was the first luxury steel sports watch.",
  },

  // ---------- JLC ----------
  {
    id: "jlc-reverso",
    brand: "Jaeger-LeCoultre", model: "Reverso Classic", ref: "413853J",
    nickname: "", family: "Reverso",
    year: 1931,
    movement: { name: "Calibre 822", kind: "manual", inHouse: true, pr: 42 },
    case: { size: 40, wr: 30, material: "Steel" },
    price: 9200, priceType: "retail",
    tier: 4, face: "jlc-reverso", tags: ["square", "dress", "icon"],
    fact: "Invented in 1931 for polo players in India, the case flips over to protect the crystal. The Reverso is still made today.",
  },

  // ---------- IWC ----------
  {
    id: "iwc-markxx",
    brand: "IWC", model: "Pilot's Watch Mark XX", ref: "IW328201",
    nickname: "Mark XX", family: "Mark",
    year: 2022,
    movement: { name: "Calibre 32111", kind: "auto", inHouse: true, pr: 120 },
    case: { size: 40, wr: 100, material: "Steel" },
    price: 5700, priceType: "retail",
    tier: 4, face: "iwc-pilot", tags: ["pilot", "field"],
    fact: "The 120-hour power reserve is a huge draw — wind it Monday, wear it Thursday.",
  },
  {
    id: "iwc-bigpilot-43",
    brand: "IWC", model: "Big Pilot 43", ref: "IW329304",
    nickname: "", family: "Big Pilot",
    year: 2021,
    movement: { name: "Calibre 82100", kind: "auto", inHouse: true, pr: 60 },
    case: { size: 43, wr: 100, material: "Steel" },
    price: 11400, priceType: "retail",
    tier: 4, face: "iwc-pilot", tags: ["pilot"],
    fact: "The original Big Pilot of 1940 was a 55 mm bomber's instrument; icons in the family still pass 43 mm.",
  },

  // ---------- BREITLING ----------
  {
    id: "breitling-navitimer",
    brand: "Breitling", model: "Navitimer B01", ref: "AB0138211B1A1",
    nickname: "", family: "Navitimer",
    year: 2018,
    movement: { name: "Calibre B01", kind: "auto", inHouse: true, pr: 70 },
    case: { size: 43, wr: 30, material: "Steel" },
    price: 9700, priceType: "retail",
    tier: 4, face: "breitling-navitimer", tags: ["chrono", "pilot"],
    fact: "A favourite of pilots since 1952, its slide-rule bezel does everything except tell you it's out of fuel.",
  },

  // ---------- TAG HEUER ----------
  {
    id: "tag-monaco",
    brand: "TAG Heuer", model: "Monaco", ref: "CBL2111.FC6231",
    nickname: "Steve McQueen", family: "Monaco",
    year: 2019,
    movement: { name: "Calibre Heuer 02", kind: "auto", inHouse: true, pr: 80 },
    case: { size: 39, wr: 100, material: "Steel" },
    price: 7000, priceType: "retail",
    tier: 4, face: "tag-monaco", tags: ["square", "chrono", "blue-dial"],
    fact: "In 1969 the Monaco became the first automatic square chronograph; Steve McQueen wore one in Le Mans (1971).",
  },

  // ---------- CARTIER ----------
  {
    id: "cartier-santos",
    brand: "Cartier", model: "Santos de Cartier", ref: "WSSA0018",
    nickname: "", family: "Santos",
    year: 1978,
    movement: { name: "Calibre 1847 MC", kind: "auto", inHouse: true, pr: 42 },
    case: { size: 39.8, wr: 100, material: "Steel" },
    price: 7900, priceType: "retail",
    tier: 4, face: "cartier-santos", tags: ["square"],
    fact: "Louis Cartier made the first Santos in 1904 for aviator Alberto Santos-Dumont — the first wristwatch designed for a man.",
  },
  {
    id: "cartier-tank",
    brand: "Cartier", model: "Tank Must XL", ref: "WSTA0029",
    nickname: "", family: "Tank",
    year: 2021,
    movement: { name: "Calibre 1917 MC", kind: "auto", inHouse: true, pr: 38 },
    case: { size: 41, wr: 30, material: "Steel" },
    price: 5000, priceType: "retail",
    tier: 3, face: "cartier-tank", tags: ["square", "dress", "icon"],
    fact: "Designed in 1917 and inspired by WWI Renault tanks, the Tank is among the most copied watches ever made.",
  },

  // ---------- PANERAI ----------
  {
    id: "panerai-luminor",
    brand: "Panerai", model: "Luminor Marina", ref: "PAM01312",
    nickname: "", family: "Luminor",
    year: 2019,
    movement: { name: "Calibre P.9010", kind: "auto", inHouse: true, pr: 72 },
    case: { size: 44, wr: 300, material: "Steel" },
    price: 7600, priceType: "retail",
    tier: 4, face: "panerai-luminor", tags: ["tool", "cushion"],
    fact: "The crown guard was patented in 1956 and is the single most distinctive element of any Panerai.",
  },

  // ---------- NOMOS ----------
  {
    id: "nomos-tangente",
    brand: "Nomos Glashütte", model: "Tangente 38", ref: "177",
    nickname: "", family: "Tangente",
    year: 1992,
    movement: { name: "Alpha", kind: "manual", inHouse: true, pr: 43 },
    case: { size: 37.5, wr: 50, material: "Steel" },
    price: 1800, priceType: "retail",
    tier: 4, face: "nomos-tangente", tags: ["bauhaus", "dress"],
    fact: "The Tangente's dial is pure Bauhaus theory: neutrality of design, small seconds at 6.",
  },

  // ---------- ZENITH ----------
  {
    id: "zenith-elprimero",
    brand: "Zenith", model: "Chronomaster Original", ref: "03.3200.3600/69.C902",
    nickname: "", family: "El Primero",
    year: 2021,
    movement: { name: "El Primero 3600", kind: "auto", inHouse: true, pr: 60, beats: 5 },
    case: { size: 38, wr: 50, material: "Steel" },
    price: 9200, priceType: "retail",
    tier: 4, face: "zenith-elprimero", tags: ["chrono", "hi-beat"],
    fact: "The El Primero of 1969 was the first integrated automatic chronograph — and still beats at 36,000 vph today.",
  },

  // ---------- HAMILTON ----------
  {
    id: "hamilton-khaki",
    brand: "Hamilton", model: "Khaki Field Mechanical", ref: "H69439931",
    nickname: "", family: "Khaki",
    year: 2005,
    movement: { name: "H-50", kind: "manual", inHouse: true, pr: 80 },
    case: { size: 38, wr: 50, material: "Steel" },
    price: 575, priceType: "retail",
    tier: 3, face: "hamilton-khaki", tags: ["field", "military"],
    fact: "Hamilton supplied 1 million+ watches to the US military in WWII; the Khaki lineage starts in 1942.",
  },

  // ---------- CHRISTOPHER WARD ----------
  {
    id: "cw-c60-trident",
    brand: "Christopher Ward", model: "C60 Trident Pro 300", ref: "C60-42ADA3-S001",
    nickname: "", family: "C60",
    year: 2021,
    movement: { name: "SW200-1", kind: "auto", inHouse: false, pr: 38 },
    case: { size: 42, wr: 300, material: "Steel" },
    price: 1200, priceType: "retail",
    tier: 5, face: "cw-c60", tags: ["dive", "microbrand"],
    fact: "A microbrand favourite: Swiss SW200 inside, 300 m of water resistance, and a price that embarrasses bigger names.",
  },

  // ---------- A. LANGE & SÖHNE ----------
  {
    id: "lange-lange1",
    brand: "A. Lange & Söhne", model: "Lange 1", ref: "191.032",
    nickname: "", family: "Lange 1",
    year: 2015,
    movement: { name: "Calibre L121.1", kind: "manual", inHouse: true, pr: 72 },
    case: { size: 38.5, wr: 30, material: "18k gold" },
    price: 43000, priceType: "retail",
    tier: 5, face: "lange-lange1", tags: ["dress", "german"],
    fact: "The asymetric dial, big date, and visible 3/4 plate with hand-engraved balance cock are Glashütte signatures.",
  },

  // ---------- TISSOT ----------
  {
    id: "tissot-prx",
    brand: "Tissot", model: "PRX Powermatic 80", ref: "T137.407.11.041.00",
    nickname: "", family: "PRX",
    year: 2021,
    movement: { name: "Powermatic 80.111", kind: "auto", inHouse: true, pr: 80 },
    case: { size: 40, wr: 100, material: "Steel" },
    price: 700, priceType: "retail",
    tier: 3, face: "tissot-prx", tags: ["integrated"],
    fact: "The 1978 PRX was reborn in 2021 with the 80-hour Powermatic 80 — the affordable integrated-bracelet icon.",
  },

  // ---------- ORIS ----------
  {
    id: "oris-d65",
    brand: "Oris", model: "Divers Sixty-Five", ref: "733 7730 4035-07",
    nickname: "", family: "Divers Sixty-Five",
    year: 2015,
    movement: { name: "Calibre 733 (Sellita SW200-1 base)", kind: "auto", inHouse: false, pr: 41 },
    case: { size: 40, wr: 100, material: "Steel" },
    price: 2500, priceType: "retail",
    tier: 4, face: "oris-d65", tags: ["dive", "vintage"],
    fact: "The Sixty-Five is a loving homage to Oris' own 1965 diver, with a domed crystal and aged-lume warmth.",
  },
];

// ============================================================
// Timeline events — chronological knowledge
// ============================================================

export const TIMELINE_EVENTS = [
  { name: "Perrelet builds the first self-winding movement", year: 1770, tier: 5, detail: "Abraham-Louis Perrelet, a Swiss watchmaker, fits a self-winding mechanism to a pocket watch." },
  { name: "Breguet patents the tourbillon", year: 1795, tier: 4, detail: "Abraham-Louis Breguet files the patent for a rotating cage that counters gravity." },
  { name: "Patek Philippe makes one of the first wristwatches", year: 1868, tier: 4, detail: "A bracelet watch for the Countess Koscowicz — the wristwatch is born (for women)." },
  { name: "Cartier makes the Santos-Dumont for the aviator", year: 1904, tier: 3, detail: "Louis Cartier makes a functional wristwatch for Alberto Santos-Dumont to use while flying." },
  { name: "The Rolex Oyster becomes the first waterproof watch", year: 1926, tier: 3, detail: "Mercedes Gleitze swims the Channel wearing an Oyster to prove it." },
  { name: "Rolex launches the Perpetual self-winding movement", year: 1931, tier: 3, detail: "The rotor-based auto-winding system that becomes the standard." },
  { name: "The Reverso is invented for polo players", year: 1931, tier: 5, detail: "Jaeger-LeCoultre's reversible case protects a watch during a match." },
  { name: "The Fifty Fathoms and Submariner launch dive watches", year: 1953, tier: 3, detail: "Blancpain's Fifty Fathoms and Rolex's Submariner define the modern diver within months of each other." },
  { name: "The Rolex GMT-Master is born for pilots", year: 1954, tier: 3, detail: "Built with Pan Am so crews could read two time zones at once." },
  { name: "The Omega Speedmaster is introduced", year: 1957, tier: 3, detail: "A racing-oriented chronograph — destined for the Moon." },
  { name: "Hamilton's Ventura becomes the first electric watch", year: 1957, tier: 4, detail: "Battery-powered but not yet quartz; Elvis makes it famous." },
  { name: "Bulova's Accutron hums instead of ticks", year: 1960, tier: 4, detail: "A tuning fork resonator replaces the balance wheel — accurate to seconds a day." },
  { name: "The 62MAS — Japan's first dive watch — appears", year: 1965, tier: 4, detail: "Seiko's first professional diver, ancestor of today's Prospex line." },
  { name: "Zenith unveils the El Primero", year: 1969, tier: 4, detail: "The first integrated automatic chronograph, beating at 36,000 vph." },
  { name: "A Speedmaster lands on the Moon", year: 1969, tier: 3, detail: "Buzz Aldrin wears one during the Apollo 11 EVA." },
  { name: "Seiko's Astron becomes the world's first quartz watch", year: 1969, tier: 3, detail: "On sale 25 December 1969 — the quartz crisis is born." },
  { name: "Gérald Genta designs the Royal Oak", year: 1972, tier: 3, detail: "The first luxury steel sports watch, drawn in one night." },
  { name: "The Nautilus follows the Royal Oak", year: 1976, tier: 4, detail: "Genta again — Patek's sporty take on the integrated bracelet." },
  { name: "The G-Shock DW-5000C is released", year: 1983, tier: 3, detail: "Casio's 'Triple 10' promise: survive a 10 m drop, 10 bar, 10 year battery." },
  { name: "Swatch launches the plastic watch", year: 1983, tier: 4, detail: "The quartz crisis saviour that made Swiss watches affordable and fun." },
  { name: "A. Lange & Söhne is reborn in Glashütte", year: 1990, tier: 4, detail: "Walter Lange re-establishes the house after reunification; the Lange 1 follows in 1994." },
  { name: "Seiko commercialises Spring Drive", year: 2005, tier: 4, detail: "A mechanical mainspring regulated by a quartz circuit — the smooth glide seconds hand." },
  { name: "Rolex introduces its ceramic bezel", year: 2005, tier: 5, detail: "Cerachrom debuts on the GMT-Master II — scratch-resistant, fade-proof colour." },
  { name: "Tudor launches its in-house calibres", year: 2015, tier: 5, detail: "The MT56 family debuts in the Pelagos, ending the ETA era." },
  { name: "The Apple Watch ships", year: 2015, tier: 3, detail: "The best-selling watch in the world — and the industry's new existential question." },
].sort((a, b) => a.year - b.year);

// ============================================================
// Movement Master — technical/mechanical knowledge bank
// ============================================================

export const MOVEMENT_QUESTIONS = [
  {
    q: "Which of these is a quartz movement?",
    options: ["Casio Module 3229 (F-91W)", "Seiko 7S26", "Rolex Calibre 3230", "Sellita SW200"],
    answer: 0, difficulty: 1,
    blurb: "Quartz movements use a battery and a 32,768 Hz crystal — the Casio module runs one.",
  },
  {
    q: "What does 'automatic' mean on a mechanical watch?",
    options: ["It sets the date by itself", "It winds itself via a rotor as you move", "It syncs via radio signal", "It has a battery backup"],
    answer: 1, difficulty: 1,
    blurb: "An automatic (self-winding) watch stores energy from a weighted rotor that swings as you wear it.",
  },
  {
    q: "Which movement powers the current Omega Speedmaster Moonwatch?",
    options: ["Calibre 3861", "Calibre 3235", "CTP-05", "Seiko 7S26"],
    answer: 0, difficulty: 1,
    blurb: "The 3861 is the hand-wound, METAS-certified descendant of the movement that went to the Moon.",
  },
  {
    q: "A tourbillon counteracts errors caused by…",
    options: ["Gravity", "Temperature changes", "Shock", "Magnetism"],
    answer: 0, difficulty: 1,
    blurb: "Rotating the escapement averages out positional errors caused by gravity — a Breguet patent from 1795.",
  },
  {
    q: "Which of these is a manual-wind (hand-wound) mechanical movement?",
    options: ["Calibre 3861", "Calibre 3230", "7S26", "Calibre 8800"],
    answer: 0, difficulty: 2,
    blurb: "3861 (Speedmaster) and 30-255 PS (Calatrava) are manual; the others rotor-wind.",
  },
  {
    q: "How often does a standard quartz crystal oscillate?",
    options: ["32,768 times per second", "36,000 times per hour", "4 times per second", "Once per minute"],
    answer: 0, difficulty: 2,
    blurb: "2^15 = 32,768 Hz — the circuit divides the frequency down to one pulse per second.",
  },
  {
    q: "If a movement is 'COSC-certified', what has been verified?",
    options: ["It is waterproof to 100 m", "It keeps chronometer-grade time", "It is 100% in-house", "It has a sapphire crystal"],
    answer: 1, difficulty: 2,
    blurb: "COSC tests movements (not whole watches) for chronometer accuracy over several positions and temperatures.",
  },
  {
    q: "The 9R65 — which brand would you associate it with?",
    options: ["Grand Seiko", "Rolex", "Tudor", "Lange & Söhne"],
    answer: 0, difficulty: 2,
    blurb: "9R65 is the iconic Spring Drive calibre, made by Seiko/Grand Seiko.",
  },
  {
    q: "Which of these is an in-house movement by its maker?",
    options: ["Rolex Calibre 3230", "Sellita SW200-1", "ETA 2824-2", "Seiko NH35"],
    answer: 0, difficulty: 2,
    blurb: "3230 is made by Rolex for Rolex. SW200/2824/NH35 are third-party ébauches sold to many brands.",
  },
  {
    q: "Calibre MT5402 — which watch family does it power?",
    options: ["Tudor Black Bay 58", "Rolex Submariner", "IWC Mark XX", "Omega Seamaster"],
    answer: 0, difficulty: 3,
    blurb: "The MT5402 is Tudor's in-house 39 mm workhorse with 70 h of reserve.",
  },
  {
    q: "In a chronograph, what is a column wheel?",
    options: ["A precision switching mechanism for start/stop/reset", "An extra crown on the right side", "A type of calendar gear", "A braking system for the balance"],
    answer: 0, difficulty: 3,
    blurb: "Column wheels are revered over cam switches for their crisp, stacked-lever action.",
  },
  {
    q: "Which movement beats at 5 Hz (36,000 vph)?",
    options: ["El Primero 3600", "Calibre 3230", "ETA 2824-2", "Sellita SW200-1"],
    answer: 0, difficulty: 3,
    blurb: "52 oscillations per second? No — a 5 Hz balance oscillates 5 times per second, 36,000 per hour.",
  },
  {
    q: "Which of these is a third-party ébauche sold to many brands?",
    options: ["Sellita SW200-1", "Calibre 3285", "MT5402", "9R65"],
    answer: 0, difficulty: 3,
    blurb: "SW200 (and ETA cousins) are bought by everyone from Christopher Ward to Oris; the others are manufacture calibres.",
  },
  {
    q: "Spring Drive is best described as…",
    options: ["Mechanical mainspring regulated by a quartz circuit", "A quartz watch with a solar cell", "A kinetic watch charging a battery", "A high-beat automatic chronometer"],
    answer: 0, difficulty: 4,
    blurb: "Spring Drive is a hybrid: mainspring power, quartz-regulated glide wheel, and a perfectly sweeping second hand.",
  },
  {
    q: "The Calibre 3861 descends from which legendary movement family?",
    options: ["Lemania 1873", "Valjoux 7750", "Seiko 6139", "FHF 120"],
    answer: 0, difficulty: 4,
    blurb: "Lemania's 1873 (27 CHRO C12) is the direct ancestor of the 861 → 1861 → 3861 lineage.",
  },
  {
    q: "Which movement features a coaxial escapement and silicon balance spring?",
    options: ["Omega Calibre 8800", "Rolex 3235", "ETA 2892-A2", "Zenith 3600"],
    answer: 0, difficulty: 4,
    blurb: "George Daniels invented the coaxial escapement; Omega, with silicon parts, made it mass-production viable.",
  },
  {
    q: "The Tudor Black Bay Chrono's MT5813 was co-developed with…",
    options: ["Breitling", "Panerai", "Seiko", "Helvetia"],
    answer: 0, difficulty: 4,
    blurb: "It's based on Breitling's in-house B01 chronograph, shared with Tudor in the 2017 exchange.",
  },
  {
    q: "What is the 'Lange 1' movement famous for?",
    options: ["Its off-centre dial and giant date", "Being the world's thinnest", "Its calculator bezel", "Being the first flyback tourbillon"],
    answer: 0, difficulty: 5,
    blurb: "L121.1: asymmetric dial, outsize double date, 3/4 plate, and a hand-engraved balance cock.",
  },
  {
    q: "A free-sprung balance (no regulator) is a hallmark of…",
    options: ["High-end manufacture calibres", "Entry-level ébauches", "All quartz movements", "Chinese pocket watches"],
    answer: 0, difficulty: 5,
    blurb: "Elite makers from Patek to Grand Seiko use free-sprung balances with inertia weights for superior regulation.",
  },
  {
    q: "Which of these 'is not' an escapement type?",
    options: ["Column wheel", "Lever", "Detent", "Coaxial"],
    answer: 0, difficulty: 5,
    blurb: "A column wheel is a chronograph switching device — lever, detent and coaxial are escapements.",
  },
];

// ============================================================
// Spot the Imposter — sets of watches where one breaks the rule
// `prop` is a human-readable rule; `sets` reference watch ids.
// `ruleOf` returns true for watches that "belong".
// ============================================================

const W = Object.fromEntries(WATCHES.map((w) => [w.id, w]));

export const IMPOSTER_SETS = [
  {
    trouble: "Which one is NOT a dive watch?",
    ids: ["rolex-subdate-126610ln", "omega-seamaster-300m", "tudor-bb58", "rolex-datejust-126334"],
    imposter: "rolex-datejust-126334",
    prop: "dive watch",
    visual: true, difficulty: 2,
    explain: (imp) => `${imp.brand} ${imp.model} is a dress watch with 100 m — the other three are dedicated divers with rotating bezels.`,
  },
  {
    trouble: "Which one is NOT a chronograph?",
    ids: ["rolex-daytona-116500ln", "omega-speedmaster-310", "breitling-navitimer", "rolex-explorer-124270"],
    imposter: "rolex-explorer-124270",
    prop: "chronograph",
    visual: true, difficulty: 2,
    explain: (imp) => `${imp.brand} ${imp.model} has a simple time-only dial — no stopwatch subdials.`,
  },
  {
    trouble: "Which one is NOT made by Rolex?",
    ids: ["rolex-sub-124060", "rolex-gmt-126710blnr", "rolex-explorer-124270", "tudor-bb58"],
    imposter: "tudor-bb58",
    prop: "Rolex product",
    visual: true, difficulty: 3,
    explain: (imp) => `Tudor is Rolex's sibling brand — the black dial and snowflake hands give it away.`,
  },
  {
    trouble: "Which one is NOT running a quartz movement?",
    ids: ["casio-f91w", "casio-gshock-dw5600", "casio-ga2100", "seiko-skx007"],
    imposter: "seiko-skx007",
    prop: "quartz watch",
    visual: true, difficulty: 2,
    explain: (imp) => `${imp.brand} ${imp.model} is an automatic dive watch with a 41-hour reserve — the Casios all run on battery.`,
  },
  {
    trouble: "Which one does NOT have a power reserve of 65 hours or more?",
    ids: ["rolex-sub-124060", "rolex-gmt-126710blnr", "tudor-bb58", "omega-speedmaster-310"],
    imposter: "omega-speedmaster-310",
    prop: "65+ hour power reserve",
    visual: true, difficulty: 3,
    explain: (imp) => `${imp.brand} ${imp.model}'s hand-wound 3861 holds about 50 hours — the other three all boast 70.`,
  },
  {
    trip: null,
    trouble: "Which one is NOT a Japanese watch?",
    ids: ["seiko-skx007", "gs-snowflake", "casio-gshock-dw5600", "hamilton-khaki"],
    imposter: "hamilton-khaki",
    prop: "Japanese brand",
    visual: true, difficulty: 2,
    explain: (imp) => `${imp.brand} is American-born (now Swiss-made) — the Seikos and Casio are Japanese.`,
  },
  {
    trouble: "Which one is NOT water resistant to 300 m or more?",
    ids: ["rolex-sub-124060", "omega-seamaster-300m", "panerai-luminor", "hamilton-khaki"],
    imposter: "hamilton-khaki",
    prop: "300 m+ water resistance",
    visual: true, difficulty: 3,
    explain: (imp) => `${imp.brand} ${imp.model} is rated to just 50 m — an honest soldier, not a diver.`,
  },
  {
    trouble: "Which one is NOT an octagonal or integrated-bracelet icon?",
    ids: ["ap-royaloak-16202", "patek-nautilus-5711", "tissot-prx", "cartier-tank"],
    imposter: "cartier-tank",
    prop: "octagonal / integrated",
    visual: true, difficulty: 4,
    explain: (imp) => `The Tank is a rectangle on a strap — Royal Oak, Nautilus and PRX all wear octagonal integrated cases.`,
  },
  {
    trouble: "Which one is sold for more than $10,000 at retail?",
    ids: ["rolex-daytona-116500ln", "patek-nautilus-5711", "rolex-gmt-126710blnr", "rolex-explorer-124270"],
    imposter: "rolex-explorer-124270",
    prop: "above $10k retail",
    visual: true, difficulty: 3,
    explain: (imp) => `The Explorer retails around $7,600 — Daytona, GMT and Nautilus all clear $10k (before market bubbles).`,
  },
  {
    trouble: "Which one does NOT have an in-house (manufacture) movement?",
    ids: ["rolex-sub-124060", "gs-snowflake", "tudor-bb58", "cw-c60-trident"],
    imposter: "cw-c60-trident",
    prop: "in-house movement",
    visual: false, difficulty: 3,
    explain: (imp) => `${imp.brand} ${imp.model} uses a third-party Sellita SW200 — the others build their own calibres.`,
  },
  {
    trouble: "Which one is NOT hand-wound (manual)?",
    ids: ["omega-speedmaster-310", "jlc-reverso", "hamilton-khaki", "rolex-sub-124060"],
    imposter: "rolex-sub-124060",
    prop: "manual-wind movement",
    visual: false, difficulty: 3,
    explain: (imp) => `The Submariner is automatic — Speedmaster, Reverso and Khaki Field all want a daily wind.`,
  },
  {
    trouble: "Which one is NOT a chronograph?",
    ids: ["zenith-elprimero", "rolex-daytona-116500ln", "tag-monaco", "gs-snowflake"],
    imposter: "gs-snowflake",
    prop: "chronograph",
    visual: true, difficulty: 3,
    explain: (imp) => `${imp.brand} ${imp.model} is a time-and-date Spring Drive — Zenith, Daytona and Monaco count seconds for a living.`,
  },
  {
    trouble: "Which one is NOT made of precious metal or titanium?",
    ids: ["patek-calatrava-6119", "rolex-daydate-228238", "lange-lange1", "iwc-markxx"],
    imposter: "iwc-markxx",
    prop: "precious metal / titanium",
    visual: false, difficulty: 4,
    explain: (imp) => `Calatrava and Day-Date are gold; the Lange 1 on the list is rose gold — the Mark XX is plain steel.`,
  },
  {
    trouble: "Which one breaks the trend — the other three are famous NO-DATE watches?",
    ids: ["rolex-sub-124060", "rolex-explorer-124270", "rolex-daytona-116500ln", "rolex-datejust-126334"],
    imposter: "rolex-datejust-126334",
    prop: "no-date dial",
    visual: false, difficulty: 3,
    explain: (imp) => `${imp.brand} ${imp.model} is the odd one out: it carries a date window (and cyclops), while the Submariner, Explorer and Daytona are all clean no-date classics.`,
  },
];

// sanity: filter out sets referencing ids that do not exist in the DB
export const IMPOSTER_SETS_VALID = IMPOSTER_SETS.filter((set) =>
  set.ids.every((id) => W[id])
);

// ============================================================
// helpers
// ============================================================

export const byId = (id) => W[id];

export function watchLabel(w) {
  return w.nickname ? `${w.brand} ${w.model} (“${w.nickname}”)` : `${w.brand} ${w.model}`;
}

export function formatPrice(n) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

export function priceOptionBands(price) {
  // four plausible rounded bands around the true price
  const bands = [];
  const offsets = [0.5, 0.8, 1, 1.3];
  const order = [2, 1, 3, 0]; // correct sits at index 2 in final array
  const vals = offsets.map((o) => niceRound(price * o));
  if (new Set(vals).size < 4) vals[0] = niceRound(price * 0.35);
  return order.map((i) => vals[i]);
}

export function niceRound(n) {
  if (n < 100) return Math.max(5, Math.round(n / 5) * 5);
  if (n < 1000) return Math.round(n / 10) * 10;
  if (n < 10000) return Math.round(n / 50) * 50;
  return Math.round(n / 100) * 100;
}