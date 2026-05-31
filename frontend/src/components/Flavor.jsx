import { Eyebrow } from "./Icons.jsx";

export default function Flavor() {
  const feats = [
    { t: "紫红如玉", d: "果色浓艳通透，颗颗如缀枝玛瑙" },
    { t: "厚实如凝脂", d: "果肉饱满柔糯，汁囊一咬即破" },
    { t: "甜酸平衡", d: "蜜甜里带俏皮酸，甜而不腻" },
    { t: "山野清香", d: "尾调悠长，是雨后山林的气息" },
  ];
  return (
    <section style={{ background: "var(--paper-2)", paddingBottom: 0 }}>
      <div style={{ padding: "34px 24px 22px" }}>
        <Eyebrow>风味 · 入口的瞬间</Eyebrow>
        <h2 style={{ margin: 0, fontFamily: "var(--serif)", fontWeight: 600, fontSize: 25, lineHeight: 1.3, color: "var(--ink)" }}>
          轻咬即迸发的<br />蜜糖般汁水
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1,
        background: "var(--line)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        {feats.map((f, i) => (
          <div key={i} style={{ background: "var(--paper)", padding: "20px 18px" }}>
            <div style={{ fontFamily: "var(--serif)", fontSize: 18, fontWeight: 600, color: "var(--berry)",
              marginBottom: 6, display: "flex", alignItems: "baseline", gap: 7 }}>
              <span style={{ fontSize: 11, color: "var(--ink-faint)", fontFamily: "var(--sans)" }}>0{i + 1}</span>
              {f.t}
            </div>
            <div style={{ fontSize: 11.5, lineHeight: 1.65, color: "var(--ink-soft)" }}>{f.d}</div>
          </div>
        ))}
      </div>
      <div style={{ position: "relative", height: 188, overflow: "hidden" }}>
        <img src={`${import.meta.env.BASE_URL}assets/img-butterfly.jpg`} alt="夏日杨梅"
          loading="lazy" decoding="async"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0,
          background: "linear-gradient(90deg,rgba(244,239,228,.92) 0%,rgba(244,239,228,.5) 42%,transparent 70%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          justifyContent: "center", padding: "0 24px" }}>
          <div style={{ fontFamily: "var(--serif)", fontSize: 26, fontWeight: 700, lineHeight: 1.3, color: "var(--ink)" }}>
            酸得俏皮<br />甜而不腻
          </div>
          <div style={{ marginTop: 8, fontSize: 11, color: "var(--ink-soft)", letterSpacing: ".1em" }}>
            —— 这一口，是上头的"梅"味
          </div>
        </div>
      </div>
    </section>
  );
}
