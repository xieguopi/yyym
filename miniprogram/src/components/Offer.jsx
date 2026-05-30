import { View, Image } from "@tarojs/components";
import { Ico } from "./Icons";
import { STATIC_BASE } from "../lib/config";

export function Stepper({ qty, setQty }) {
  return (
    <View style={{ display: "flex", flexDirection: "row", alignItems: "center",
      border: "1px solid #ddd2bd", borderRadius: 10, overflow: "hidden" }}>
      <View onClick={() => setQty(Math.max(1, qty - 1))}
        style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center",
          borderRight: "1px solid #ddd2bd", opacity: qty <= 1 ? 0.4 : 1, cursor: "pointer" }}>
        <View style={{ fontSize: 18, color: "#2c2a24", lineHeight: "1" }}>−</View>
      </View>
      <View style={{ width: 38, textAlign: "center", fontSize: 14, fontWeight: 600 }}>{qty}</View>
      <View onClick={() => setQty(Math.min(20, qty + 1))}
        style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center",
          borderLeft: "1px solid #ddd2bd", cursor: "pointer" }}>
        <View style={{ fontSize: 18, color: "#a72f35", lineHeight: "1" }}>+</View>
      </View>
    </View>
  );
}

export default function Offer({ specs, specId, setSpecId, qty, setQty, stats }) {
  const benefits = [
    { ic: "truck",  k: "顺丰空运 次日达" },
    { ic: "shield", k: "坏果包赔 全程保鲜" },
    { ic: "snow",   k: "冷链锁鲜 现摘现发" },
  ];
  const reviews = [
    { n: "宁波·周女士", txt: "比小时候外婆家树上的还甜，汁水多到要低头吃！", c: "#b07d4a" },
    { n: "上海·阿K",   txt: "冰袋很贴心，到货还是冰的，一口一个停不下来。", c: "#6f8a52" },
  ];
  const remaining = stats?.remaining ?? 38;

  return (
    <View style={{ padding: "36px 18px 26px", background: "#ece4d3" }}>
      {/* 标题行 */}
      <View style={{ display: "flex", flexDirection: "row", alignItems: "center",
        justifyContent: "space-between", paddingLeft: 6, paddingRight: 6, marginBottom: 16 }}>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "baseline", gap: 10 }}>
          <View style={{ fontSize: 23, fontWeight: 700, color: "#7e242c" }}>今日特惠</View>
          <View style={{ fontSize: 11, color: "#a59c89" }}>限量预定</View>
        </View>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 6,
          background: "rgba(167,47,53,0.08)", border: "1px solid rgba(167,47,53,0.2)",
          borderRadius: 20, padding: "5px 11px" }}>
          <View style={{ width: 7, height: 7, borderRadius: 4, background: "#c2434a",
            animation: "pulse 1.6s infinite" }} />
          <View style={{ fontSize: 11, color: "#a72f35", fontWeight: 600 }}>今日剩 {remaining} 份</View>
        </View>
      </View>

      {/* 商品卡片 */}
      <View style={{ background: "#f4efe4", borderRadius: 20, border: "1px solid #ddd2bd", overflow: "hidden" }}>
        <View style={{ position: "relative", height: 200 }}>
          <Image src={`${STATIC_BASE}/img-cluster.jpg`} mode="aspectFill"
            style={{ width: "100%", height: 200 }} />
          <View style={{ position: "absolute", top: 12, left: 12,
            display: "flex", flexDirection: "row", gap: 7 }}>
            <View style={{ background: "#a72f35", padding: "4px 9px", borderRadius: 8 }}>
              <View style={{ fontSize: 10.5, fontWeight: 600, color: "#fff", letterSpacing: "0.04em" }}>赠 定制冰袋</View>
            </View>
            <View style={{ background: "rgba(255,255,255,0.9)", padding: "4px 9px", borderRadius: 8 }}>
              <View style={{ fontSize: 10.5, fontWeight: 600, color: "#7e242c" }}>地理标志</View>
            </View>
          </View>
        </View>

        <View style={{ padding: "18px 16px" }}>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <View style={{ display: "flex", flexDirection: "row", gap: 1 }}>
              {[0,1,2,3,4].map(i => <Ico.star key={i} s={13} f="#cf9f43" c="#cf9f43" />)}
            </View>
            <View style={{ fontSize: 11, color: "#a59c89" }}>4.9 · 2.3 万人已预定</View>
          </View>
          <View style={{ marginBottom: 14, fontSize: 19, fontWeight: 600, color: "#2c2a24" }}>
            四明山·精品杨梅礼盒
          </View>

          {/* 规格选项 */}
          <View style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 16 }}>
            {specs.map(s => {
              const on = s.id === specId;
              return (
                <View key={s.id} onClick={() => setSpecId(s.id)}
                  style={{ display: "flex", flexDirection: "row", alignItems: "center",
                    justifyContent: "space-between", gap: 10, padding: "11px 13px", borderRadius: 13,
                    border: `1.5px solid ${on ? "#a72f35" : "#ddd2bd"}`,
                    background: on ? "rgba(167,47,53,0.05)" : "#f4efe4" }}>
                  <View>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 7, marginBottom: 2 }}>
                      <View style={{ fontSize: 14, fontWeight: 600, color: "#2c2a24" }}>{s.name}</View>
                      <View style={{ fontSize: 10, padding: "1px 7px", borderRadius: 6,
                        color: on ? "#fff" : "#6f685a", background: on ? "#a72f35" : "#e3d9c4" }}>
                        {s.weight}
                      </View>
                    </View>
                    <View style={{ fontSize: 10.5, color: "#a59c89" }}>{s.note}</View>
                  </View>
                  <View style={{ textAlign: "right", flexShrink: 0 }}>
                    <View style={{ fontSize: 18, fontWeight: 700, color: on ? "#a72f35" : "#2c2a24" }}>
                      <View style={{ fontSize: 11, display: "inline" }}>¥</View>{s.price}
                    </View>
                  </View>
                </View>
              );
            })}
          </View>

          {/* 数量 */}
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center",
            justifyContent: "space-between", marginBottom: 18 }}>
            <View style={{ fontSize: 13, color: "#6f685a" }}>数量</View>
            <Stepper qty={qty} setQty={setQty} />
          </View>

          {/* 保障 */}
          <View style={{ display: "flex", flexDirection: "column", gap: 11,
            paddingTop: 16, borderTop: "1px dashed #ddd2bd" }}>
            {benefits.map((b, i) => (
              <View key={i} style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 11 }}>
                {Ico[b.ic]({ s: 18, c: "#a72f35" })}
                <View style={{ fontSize: 12.5, color: "#2c2a24" }}>{b.k}</View>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* 评价 */}
      <View style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
        {reviews.map((r, i) => (
          <View key={i} style={{ display: "flex", flexDirection: "row", gap: 11, background: "#f4efe4",
            border: "1px solid #ddd2bd", borderRadius: 14, padding: "13px 14px" }}>
            <View style={{ width: 30, height: 30, borderRadius: 15, flexShrink: 0, background: r.c,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, color: "#fff", fontWeight: 600 }}>
              {r.n.split("·")[1][0]}
            </View>
            <View>
              <View style={{ fontSize: 11, color: "#a59c89", marginBottom: 3 }}>{r.n}</View>
              <View style={{ fontSize: 12, lineHeight: "1.55", color: "#2c2a24" }}>{r.txt}</View>
            </View>
          </View>
        ))}
      </View>

      <View style={{ textAlign: "center", fontSize: 10.5, color: "#a59c89", marginTop: 22, lineHeight: "1.7" }}>
        余姚杨梅 · 中国地理标志产品{"\n"}古法种植 · 冷链直达 · 坏果包赔
      </View>
    </View>
  );
}
