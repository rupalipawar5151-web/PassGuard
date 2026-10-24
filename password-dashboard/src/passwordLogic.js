const COMMON = ["password", "123456", "12345678", "98765432", "abc123",
    "password1", "Exam", "admin", "welcome", "Student",
    "School", "Rupali", "111111", "123123", "Import"];

function hasPattern(p) {
  for (let i = 0; i < p.length - 2; i++) {
    const a = p.charCodeAt(i), b = p.charCodeAt(i + 1), c = p.charCodeAt(i + 2);
    if (a === b && b === c) return true;     // aaa
    if (b === a + 1 && c === b + 1) return true; // 123 or abc
  }
  return false;
}

export function evaluate(p) {
  const common = COMMON.includes(p.toLowerCase());
  const has = {
    lower: /[a-z]/.test(p),
    upper: /[A-Z]/.test(p),
    digit: /[0-9]/.test(p),
    symbol: /[^A-Za-z0-9]/.test(p),
  };
  const pattern = hasPattern(p);
  const lenPts = p.length < 8 ? 0 : p.length < 12 ? 1 : p.length < 16 ? 2 : 3;
  const types = Object.values(has).filter(Boolean).length;

  const tips = [];
  let score;
  if (common) {
    score = 0;
    tips.push("This is a very common password. Attackers try these first.");
  } else {
    score = lenPts + types;
    if (pattern) { score -= 2; tips.push("Avoid repeated or sequential characters."); }
    if (p.length < 12) tips.push("Use at least 12 characters.");
    if (!has.upper) tips.push("Add uppercase letters.");
    if (!has.digit) tips.push("Add numbers.");
    if (!has.symbol) tips.push("Add special characters.");
    score = Math.max(score, 0);
  }

  const rating = score <= 3 ? "Weak" : score <= 5 ? "Medium" : "Strong";
  const checks = [
    { label: "At least 12 characters", ok: p.length >= 12 },
    { label: "Uppercase and lowercase", ok: has.upper && has.lower },
    { label: "Numbers", ok: has.digit },
    { label: "Special characters", ok: has.symbol },
    { label: "Not a common password", ok: !common },
    { label: "No repeated patterns", ok: !pattern },
  ];
  return { score, rating, tips, checks, length: p.length };
}