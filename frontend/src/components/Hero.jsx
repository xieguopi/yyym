import { Ico, Eyebrow } from "./Icons.jsx";
import { useCountdown } from "../lib/hooks.js";

export default function Hero() {
  const cd = useCountdown();
  return (
    <header style={{ position: "relative", background: "var(--paper)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "env(safe-area-inset-top, 20px) 22px 0", paddingTop: "max(20px, env(safe-area-inset-top, 20px))",
        position: "relative", zIndex: 3 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 7, whiteSpace: "nowrap" }}>
          <span style={{ fontFamily: "var(--serif)", fontWeight: 700, fontSize: 16, letterSpacing: ".04em", color: "var(--berry-deep)" }}>余姚杨梅</span>
          <span style={{ fontSize: 10, color: "var(--ink-faint)", letterSpacing: ".2em" }}>YUYAO BAYBERRY</span>
        </div>
      </div>

      <div style={{ padding: "26px 24px 22px", position: "relative", zIndex: 3 }}>
        <Eyebrow>中国地理标志产品</Eyebrow>
        <h1 style={{ margin: 0, fontFamily: "var(--serif)", fontWeight: 700, fontSize: 46, lineHeight: 1.04,
          color: "var(--ink)", letterSpacing: ".02em" }}>
          一口爆汁<br />甜透盛夏
        </h1>
        <p style={{ margin: "16px 0 0", fontSize: 13.5, lineHeight: 1.7, color: "var(--ink-soft)", maxWidth: 300 }}>
          生长于四明山麓的云雾仙境，颗颗紫红如玉，<br />果肉厚实如凝脂，轻咬即迸发蜜糖般的汁水。
        </p>
      </div>

      <div style={{ position: "relative", height: 236, overflow: "hidden" }}>
        <img src={`${import.meta.env.BASE_URL}assets/img-branch.jpg`} alt="枝头杨梅"
          fetchPriority="high" loading="eager" decoding="sync"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0,
          background: "linear-gradient(180deg,var(--paper) 0%,transparent 16%,transparent 72%,rgba(20,24,20,.42) 100%)" }} />
        <div style={{ position: "absolute", left: 14, right: 14, bottom: 14, display: "flex",
          alignItems: "center", justifyContent: "space-between", gap: 10, padding: "11px 14px",
          borderRadius: 16, background: "rgba(28,26,22,.34)", backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,.18)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, color: "#fff" }}>
            <Ico.clock s={18} c="#fff" />
            <div style={{ lineHeight: 1.15 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600 }}>2026 头茬 · 6月鲜采</div>
              <div style={{ fontSize: 10.5, opacity: 0.8 }}>每年仅采摘黄金 20 天</div>
            </div>
          </div>
          <div style={{ textAlign: "right", color: "#fff" }}>
            <div style={{ fontFamily: "var(--serif)", fontSize: 20, fontWeight: 600, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
              {cd.days}<span style={{ fontSize: 11, fontWeight: 400, opacity: 0.8 }}> 天 </span>
              {cd.h}:{cd.m}:{cd.s}
            </div>
            <div style={{ fontSize: 10, opacity: 0.8, letterSpacing: ".1em" }}>距头茬开摘</div>
          </div>
        </div>
      </div>
    </header>
  );
}
