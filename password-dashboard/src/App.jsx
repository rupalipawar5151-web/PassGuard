import { useState } from "react";
import { evaluate } from "./passwordLogic";
import Meter from "./Meter";

export default function App() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [log, setLog] = useState([]);

  const result = password ? evaluate(password) : null;
  const count = (r) => log.filter((l) => l.rating === r).length;

  function saveCheck() {
    if (!result) return;
    const entry = { length: result.length, score: result.score, rating: result.rating };
    setLog([entry, ...log].slice(0, 8));
    setPassword("");
  }

  return (
    <div className="app">
      <header className="head">
        <svg className="logo" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Zm-1 14-3.5-3.5 1.4-1.4L11 13.2l4.6-4.6 1.4 1.4L11 16Z" />
        </svg>
        <div>
          <h1>Password strength dashboard</h1>
          <p>Your password stays in this browser. It is never sent or stored.</p>
        </div>
      </header>

      <div className="layout">
        {/* Left: dark panel with the gauge */}
        <section className="panel">
          <label htmlFor="pw">Test a password</label>
          <div className="field">
            <input
              id="pw"
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Start typing..."
              autoComplete="off"
            />
            <button className="ghost" onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </button>
          </div>

          <Meter score={result ? result.score : 0} rating={result ? result.rating : ""} />

          <p className="rating" data-rating={result ? result.rating : ""}>
            {result ? result.rating : "Waiting for a password"}
          </p>

          <button className="save" onClick={saveCheck} disabled={!result}>
            Save to session log
          </button>
        </section>

        {/* Right: light cards */}
        <div className="stack">
          <section className="card">
            <h2>Checks</h2>
            {result ? (
              <ul className="checks">
                {result.checks.map((c) => (
                  <li key={c.label} className={c.ok ? "ok" : "bad"}>
                    <span className="mark">{c.ok ? "✓" : "✕"}</span>
                    {c.label}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty">Type a password to see which checks it passes.</p>
            )}
          </section>

          <section className="card">
            <h2>How to improve it</h2>
            {result ? (
              <ul className="tips">
                {result.tips.length === 0 ? (
                  <li className="good">Great password. No improvements needed.</li>
                ) : (
                  result.tips.map((t) => <li key={t}>{t}</li>)
                )}
              </ul>
            ) : (
              <p className="empty">Tips appear here as you type.</p>
            )}
          </section>

          <section className="card">
            <h2>Session summary</h2>
            <div className="stats">
              <div><b>{log.length}</b><span>Checked</span></div>
              <div className="s-weak"><b>{count("Weak")}</b><span>Weak</span></div>
              <div className="s-med"><b>{count("Medium")}</b><span>Medium</span></div>
              <div className="s-strong"><b>{count("Strong")}</b><span>Strong</span></div>
            </div>
            {log.length === 0 ? (
              <p className="empty">Saved checks appear here. Only the length and rating are kept.</p>
            ) : (
              <ul className="log">
                {log.map((l, i) => (
                  <li key={i}>
                    <span>{l.length} characters, score {l.score}/7</span>
                    <span className="pill" data-rating={l.rating}>{l.rating}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}