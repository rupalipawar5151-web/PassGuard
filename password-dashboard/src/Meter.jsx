export default function Meter({ score = 0, rating = "" }) {
  const R = 70;
  const C = 2 * Math.PI * R; // length of the circle's edge
  const color =
    rating === "Weak" ? "#fb7185"
    : rating === "Medium" ? "#fbbf24"
    : rating === "Strong" ? "#34d399"
    : "#334155";

  return (
    <div className="gauge">
      <svg viewBox="0 0 180 180" role="img" aria-label={`Score ${score} out of 7`}>
        <circle cx="90" cy="90" r={R} className="track" />
        <circle
          cx="90" cy="90" r={R}
          className="arc"
          transform="rotate(-90 90 90)"
          style={{
            stroke: color,
            strokeDasharray: C,
            strokeDashoffset: C * (1 - score / 7), // more score = more ring drawn
          }}
        />
      </svg>
      <div className="gauge-text">
        <b>{score}</b>
        <span>out of 7</span>
      </div>
    </div>
  );
}