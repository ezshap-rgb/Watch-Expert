// ============================================================
// Question selection with difficulty mixing.
//
// Philosophy (per design doc §5–7): players should meet material
// they know alongside material that stretches them — never a rigid
// linear curriculum. Each question has an intrinsic difficulty
// (1–5). Selection biases toward the player's measured level,
// with a ~25% harder "stretch" share and an easy-anchor share.
// ============================================================

export function tierForLevel(level) {
  return Math.max(1, Math.min(5, Math.ceil((level || 1) * 0.5)));
}

// pick n items from pool (each with .difficulty 1..5), mixing tiers:
//   ~45% at the player's tier, ~25% one tier above (stretch),
//   ~15% one tier below (anchor), remainder from anywhere.
export function pickMixing(pool, level, n, { seen = [], maxDifficulty } = {}) {
  const t = tierForLevel(level);
  const low = Math.max(1, t - 1);
  const buckets = { [t]: [], [t + 1]: [], [low]: [], other: [] };
  for (const item of pool) {
    if (maxDifficulty != null && item.difficulty > maxDifficulty) continue;
    const key = item.difficulty === t ? t : item.difficulty === t + 1 ? t + 1 : item.difficulty === low ? low : "other";
    buckets[key].push(item);
  }
  const want = { [t]: Math.round(n * 0.45), [t + 1]: Math.round(n * 0.25), [low]: Math.round(n * 0.15), other: n };
  const order = [t, t + 1, low, "other"];
  const drawn = [];
  const seenSet = new Set(seen);

  const takeFrom = (key, max) => {
    const arr = buckets[key] || [];
    if (!arr.length) return 0;
    let taken = 0;
    while (taken < max && drawn.length < n) {
      const fresh = arr.filter((it) => !seenSet.has(it.id));
      const src = fresh.length ? fresh : arr;
      if (!src.length) break;
      const item = src[Math.floor(Math.random() * src.length)];
      drawn.push(item);
      seenSet.add(item.id);
      arr.splice(arr.indexOf(item), 1);
      taken++;
    }
    return taken;
  };

  for (const key of order) {
    takeFrom(key, want[key]);
    if (drawn.length >= n) break;
  }
  // top up if a tier had nothing
  if (drawn.length < n) {
    for (const key of order) {
      takeFrom(key, n);
      if (drawn.length >= n) break;
    }
  }
  return drawn;
}

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function sample(arr, n = 1) {
  return shuffle(arr).slice(0, n);
}