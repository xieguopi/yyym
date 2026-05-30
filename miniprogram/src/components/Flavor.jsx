import { View, Image } from "@tarojs/components";
import { Eyebrow } from "./Icons";
import { STATIC_BASE } from "../lib/config";

export default function Flavor() {
  const feats = [
    { t: "紫红如玉", d: "果色浓艳通透，颗颗如缀枝玛瑙" },
    { t: "厚实如凝脂", d: "果肉饱满柔糯，汁囊一咬即破" },
    { t: "甜酸平衡", d: "蜜甜里带俏皮酸，甜而不腻" },
    { t: "山野清香", d: "尾调悠长，是雨后山林的气息" },
  ];
  return (
    <View style={{ background: "#ece4d3" }}>
      <View style={{ padding: "34px 24px 22px" }}>
        <Eyebrow>风味 · 入口的瞬间</Eyebrow>
        <View style={{ fontSize: 25, fontWeight: 600, lineHeight: "1.3", color: "#2c2a24" }}>
          <View>轻咬即迸发的</View>
          <View>蜜糖般汁水</View>
        </View>
      </View>
      <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap",
        borderTop: "1px solid #ddd2bd", borderBottom: "1px solid #ddd2bd" }}>
        {feats.map((f, i) => (
          <View key={i} style={{ width: "50%", background: "#f4efe4", padding: "20px 18px",
            borderRight: i % 2 === 0 ? "1px solid #ddd2bd" : "none",
            borderBottom: i < 2 ? "1px solid #ddd2bd" : "none" }}>
            <View style={{ fontSize: 18, fontWeight: 600, color: "#a72f35", marginBottom: 6,
              display: "flex", flexDirection: "row", alignItems: "baseline", gap: 7 }}>
              <View style={{ fontSize: 11, color: "#a59c89" }}>0{i + 1}</View>
              <View>{f.t}</View>
            </View>
            <View style={{ fontSize: 11.5, lineHeight: "1.65", color: "#6f685a" }}>{f.d}</View>
          </View>
        ))}
      </View>
      <View style={{ position: "relative", height: 188, overflow: "hidden" }}>
        <Image src={`${STATIC_BASE}/img-butterfly.jpg`} mode="aspectFill"
          style={{ width: "100%", height: 188 }} />
        <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "linear-gradient(90deg,rgba(244,239,228,0.92) 0%,rgba(244,239,228,0.5) 42%,transparent 70%)" }} />
        <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 24px" }}>
          <View style={{ fontSize: 26, fontWeight: 700, lineHeight: "1.3", color: "#2c2a24" }}>
            <View>酸得俏皮</View>
            <View>甜而不腻</View>
          </View>
          <View style={{ marginTop: 8, fontSize: 11, color: "#6f685a", letterSpacing: "0.1em" }}>
            —— 这一口，是上头的"梅"味
          </View>
        </View>
      </View>
    </View>
  );
}
