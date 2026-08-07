"use client";

import { useState } from "react";

const menu = ["灌汤小笼包", "豆腐脑"];

export default function Home() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  function spin() {
    if (spinning) return;

    const selected = Math.floor(Math.random() * menu.length);
    const targetOffset = selected === 0 ? 90 : 270;
    const nextRotation = rotation + 1440 + ((targetOffset - (rotation % 360) + 360) % 360);

    setResult(null);
    setSpinning(true);
    setRotation(nextRotation);

    window.setTimeout(() => {
      setResult(menu[selected]);
      setSpinning(false);
    }, 3200);
  }

  return (
    <main>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <section className="menu-card" aria-labelledby="page-title">
        <header>
          <p className="eyebrow"><span />BREAKFAST ORACLE<span /></p>
          <h1 id="page-title">神的菜单</h1>
          <p className="subtitle">今天的早餐，交给命运。</p>
        </header>

        <div className="wheel-stage">
          <div className="pointer" aria-hidden="true"><i /></div>
          <div className="wheel-shadow" />
          <div
            className="wheel"
            style={{ transform: `rotate(${rotation}deg)` }}
            aria-label="早餐选择转盘"
          >
            <div className="wheel-ring" />
            <div className="divider" />
            <div className="wheel-label label-one">
              <span className="dish-icon">♨</span>
              <strong>灌汤小笼包</strong>
              <small>一笼热气 · 汤鲜皮薄</small>
            </div>
            <div className="wheel-label label-two">
              <span className="dish-icon">◒</span>
              <strong>豆腐脑</strong>
              <small>细嫩顺滑 · 暖胃刚好</small>
            </div>
          </div>

          <button className="spin-button" onClick={spin} disabled={spinning} aria-live="polite">
            <span>{spinning ? "天意中" : "开转"}</span>
            <small>{spinning ? "···" : "SPIN"}</small>
          </button>
        </div>

        <div className={`answer ${result ? "answer-visible" : ""}`} aria-live="polite">
          <span>神谕已降下</span>
          <strong>{result ?? "等待天意"}</strong>
        </div>

        <footer>
          <span>✦</span>
          <p>吃好早餐，是今天的第一件正经事</p>
          <span>✦</span>
        </footer>
      </section>
    </main>
  );
}
