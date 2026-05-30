import { Ico, Eyebrow } from "./Icons.jsx";

export default function Freshness() {
  const steps = [
    { ic: "clock", k: "黄金 20 天", d: "每年仅 6 月限时采摘" },
    { ic: "leaf", k: "古法种植", d: "拒绝催熟，自然成熟" },
    { ic: "hand", k: "清晨手挑", d: "果农露水未干时手工挑选" },
    { ic: "truck", k: "冷链直达", d: "锁鲜空运，尝枝头新鲜" },
  ];
  return (
    <section style={{ padding: "36px 24px 32px", background: "var(--paper)" }}>
      <Eyebrow>溯源 · 产地直采</Eyebrow>
      <h2 style={{ margin: "0 0 24px", fontFamily: "var(--serif)", fontWeight: 600, fontSize: 25, lineHeight: 1.3, color: "var(--ink)" }}>
        从枝头到舌尖<br />只走最短的路
      </h2>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 19, top: 14, bottom: 14, width: 2, background: "var(--line)" }} />
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start",
            marginBottom: i < 3 ? 22 : 0, position: "relative" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
              background: "var(--paper-2)", border: "1px solid var(--line)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--berry)", position: "relative", zIndex: 1 }}>
              {Ico[s.ic]({ s: 19, c: "var(--berry)" })}
            </div>
            <div style={{ paddingTop: 3 }}>
              <div style={{ fontSize: 14.5, fontWeight: 600, color: "var(--ink)", marginBottom: 3 }}>{s.k}</div>
              <div style={{ fontSize: 12, lineHeight: 1.55, color: "var(--ink-soft)" }}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
