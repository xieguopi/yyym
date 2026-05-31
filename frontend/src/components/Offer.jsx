import { Ico, Eyebrow } from "./Icons.jsx";

function Stepper({ qty, setQty }) {
  const btn = {
    width: 30, height: 30, borderRadius: 9, border: "none",
    background: "var(--paper)", color: "var(--ink)", fontSize: 18,
    display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
  };
  return (
    <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--line)", borderRadius: 10, overflow: "hidden" }}>
      <button style={{ ...btn, borderRight: "1px solid var(--line)", borderRadius: 0, opacity: qty <= 1 ? 0.4 : 1 }}
        onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
      <span style={{ width: 38, textAlign: "center", fontSize: 14, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{qty}</span>
      <button style={{ ...btn, borderLeft: "1px solid var(--line)", borderRadius: 0, color: "var(--berry)" }}
        onClick={() => setQty(Math.min(20, qty + 1))}>+</button>
    </div>
  );
}

export default function Offer({ specs, specId, setSpecId, qty, setQty, stats }) {
  const benefits = [
    { ic: "truck", k: "顺丰空运 次日达" },
    { ic: "shield", k: "坏果包赔 全程保鲜" },
    { ic: "snow", k: "冷链锁鲜 现摘现发" },
  ];
  const reviews = [
    { n: "宁波·周女士", txt: "比小时候外婆家树上的还甜，汁水多到要低头吃！", c: "#b07d4a" },
    { n: "上海·阿K", txt: "冰袋很贴心，到货还是冰的，一口一个停不下来。", c: "#6f8a52" },
  ];

  const remaining = stats?.remaining ?? 38;

  return (
    <section style={{ padding: "36px 18px 26px", background: "var(--paper-2)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 6px", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <h2 style={{ margin: 0, fontFamily: "var(--serif)", fontWeight: 700, fontSize: 23, color: "var(--berry-deep)", whiteSpace: "nowrap" }}>今日特惠</h2>
          <span style={{ fontSize: 11, color: "var(--ink-faint)", whiteSpace: "nowrap" }}>限量预定</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(167,47,53,.08)",
          border: "1px solid rgba(167,47,53,.2)", borderRadius: 20, padding: "5px 11px" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--berry-bright)",
            animation: "pulse 1.6s infinite", display: "inline-block" }} />
          <span style={{ fontSize: 11, color: "var(--berry)", fontWeight: 600, whiteSpace: "nowrap" }}>
            今日剩 {remaining} 份
          </span>
        </div>
      </div>

      <div style={{ background: "var(--paper)", borderRadius: 20, border: "1px solid var(--line)", overflow: "hidden",
        boxShadow: "0 18px 40px -28px rgba(60,40,20,.5)" }}>
        <div style={{ position: "relative", height: 200 }}>
          <img src={`${import.meta.env.BASE_URL}assets/img-cluster.jpg`} alt="精品杨梅礼盒"
            loading="lazy" decoding="async"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 7 }}>
            <span style={{ background: "var(--berry)", color: "#fff", fontSize: 10.5, fontWeight: 600,
              padding: "4px 9px", borderRadius: 8, letterSpacing: ".04em", whiteSpace: "nowrap" }}>赠 定制冰袋</span>
            <span style={{ background: "rgba(255,255,255,.9)", color: "var(--berry-deep)", fontSize: 10.5,
              fontWeight: 600, padding: "4px 9px", borderRadius: 8, whiteSpace: "nowrap" }}>地理标志</span>
          </div>
        </div>

        <div style={{ padding: "18px 16px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <div style={{ display: "flex", gap: 1 }}>
              {[0,1,2,3,4].map(i => <Ico.star key={i} s={13} f="var(--gold)" />)}
            </div>
            <span style={{ fontSize: 11, color: "var(--ink-faint)" }}>
              4.9 · {stats?.total_orders ? (stats.total_orders + 23000).toLocaleString() : "2.3 万"} 人已预定
            </span>
          </div>
          <h3 style={{ margin: "0 0 14px", fontFamily: "var(--serif)", fontSize: 19, fontWeight: 600, color: "var(--ink)" }}>
            四明山·精品杨梅礼盒
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 16 }}>
            {specs.map(s => {
              const on = s.id === specId;
              return (
                <button key={s.id} onClick={() => setSpecId(s.id)} style={{ textAlign: "left", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
                  padding: "11px 13px", borderRadius: 13,
                  border: `1.5px solid ${on ? "var(--berry)" : "var(--line)"}`,
                  background: on ? "rgba(167,47,53,.05)" : "var(--paper)", transition: "all .18s" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 2 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{s.name}</span>
                      <span style={{ fontSize: 10, color: on ? "#fff" : "var(--ink-soft)",
                        background: on ? "var(--berry)" : "var(--paper-3)", padding: "1px 7px", borderRadius: 6 }}>
                        {s.weight}
                      </span>
                    </div>
                    <div style={{ fontSize: 10.5, color: "var(--ink-faint)", whiteSpace: "nowrap" }}>{s.note}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <span style={{ fontFamily: "var(--serif)", fontSize: 18, fontWeight: 700, color: on ? "var(--berry)" : "var(--ink)" }}>
                      <span style={{ fontSize: 11 }}>¥</span>{s.price}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <span style={{ fontSize: 13, color: "var(--ink-soft)" }}>数量</span>
            <Stepper qty={qty} setQty={setQty} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 11, paddingTop: 16, borderTop: "1px dashed var(--line)" }}>
            {benefits.map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <span style={{ color: "var(--berry)" }}>{Ico[b.ic]({ s: 18, c: "var(--berry)" })}</span>
                <span style={{ fontSize: 12.5, color: "var(--ink)", whiteSpace: "nowrap" }}>{b.k}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
        {reviews.map((r, i) => (
          <div key={i} style={{ display: "flex", gap: 11, background: "var(--paper)", border: "1px solid var(--line)",
            borderRadius: 14, padding: "13px 14px" }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, background: r.c, color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontFamily: "var(--serif)" }}>
              {r.n.split("·")[1][0]}
            </div>
            <div>
              <div style={{ fontSize: 11, color: "var(--ink-faint)", marginBottom: 3 }}>{r.n}</div>
              <div style={{ fontSize: 12, lineHeight: 1.55, color: "var(--ink)" }}>{r.txt}</div>
            </div>
          </div>
        ))}
      </div>

      <p style={{ textAlign: "center", fontSize: 10.5, color: "var(--ink-faint)", marginTop: 22, lineHeight: 1.7 }}>
        余姚杨梅 · 中国地理标志产品<br />古法种植 · 冷链直达 · 坏果包赔
      </p>
    </section>
  );
}

export { Stepper };
