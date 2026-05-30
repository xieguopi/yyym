import { View } from "@tarojs/components";
import { Ico, Eyebrow } from "./Icons";

export default function Freshness() {
  const steps = [
    { ic: "clock", k: "黄金 20 天", d: "每年仅 6 月限时采摘" },
    { ic: "leaf",  k: "古法种植",   d: "拒绝催熟，自然成熟" },
    { ic: "hand",  k: "清晨手挑",   d: "果农露水未干时手工挑选" },
    { ic: "truck", k: "冷链直达",   d: "锁鲜空运，尝枝头新鲜" },
  ];
  return (
    <View style={{ padding: "36px 24px 32px", background: "#f4efe4" }}>
      <Eyebrow>溯源 · 产地直采</Eyebrow>
      <View style={{ marginBottom: 24, fontSize: 25, fontWeight: 600, lineHeight: "1.3", color: "#2c2a24" }}>
        <View>从枝头到舌尖</View>
        <View>只走最短的路</View>
      </View>
      <View style={{ position: "relative" }}>
        <View style={{ position: "absolute", left: 19, top: 14, bottom: 14,
          width: 2, background: "#ddd2bd" }} />
        {steps.map((s, i) => (
          <View key={i} style={{ display: "flex", flexDirection: "row", gap: 16, alignItems: "flex-start",
            marginBottom: i < 3 ? 22 : 0, position: "relative" }}>
            <View style={{ width: 40, height: 40, borderRadius: 20, flexShrink: 0, background: "#ece4d3",
              border: "1px solid #ddd2bd", display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", zIndex: 1 }}>
              {Ico[s.ic]({ s: 19, c: "#a72f35" })}
            </View>
            <View style={{ paddingTop: 3 }}>
              <View style={{ fontSize: 14.5, fontWeight: 600, color: "#2c2a24", marginBottom: 3 }}>{s.k}</View>
              <View style={{ fontSize: 12, lineHeight: "1.55", color: "#6f685a" }}>{s.d}</View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
