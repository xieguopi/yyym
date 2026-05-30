import { Ico, Eyebrow } from "./Icons.jsx";

export default function Story() {
  const terroir = [
    { ic: "leaf", k: "红黄壤", v: "富含矿物 微酸沃土" },
    { ic: "drop", k: "充沛雨露", v: "年均 1500mm 滋养" },
    { ic: "sun", k: "昼夜温差", v: "糖分悄然积淀" },
  ];
  return (
    <section style={{ padding: "34px 24px 30px", background: "var(--paper)" }}>
      <Eyebrow>产地 · 四明山麓</Eyebrow>
      <h2 style={{ margin: "0 0 14px", fontFamily: "var(--serif)", fontWeight: 600, fontSize: 25, lineHeight: 1.3, color: "var(--ink)" }}>
        云雾仙境里<br />养出的紫红如玉
      </h2>
      <p style={{ margin: "0 0 22px", fontSize: 13, lineHeight: 1.85, color: "var(--ink-soft)" }}>
        这里独特的红黄壤、充沛雨露与昼夜温差，孕育出颗颗饱满的杨梅。甜酸比完美平衡，尾调带着山野清香——是江南夏天最先到来的味道。
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        {terroir.map((x, i) => (
          <div key={i} style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: 14,
            padding: "14px 10px", textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 8, color: "var(--berry)" }}>
              {Ico[x.ic]({ s: 21, c: "var(--berry)" })}
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", marginBottom: 3 }}>{x.k}</div>
            <div style={{ fontSize: 10, lineHeight: 1.4, color: "var(--ink-faint)" }}>{x.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
