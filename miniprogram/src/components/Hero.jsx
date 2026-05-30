import { View, Image } from "@tarojs/components";
import { Ico, Eyebrow } from "./Icons";
import { useCountdown } from "../lib/hooks";
import { STATIC_BASE } from "../lib/config";

export default function Hero() {
  const cd = useCountdown();
  return (
    <View style={{ position: "relative", background: "#f4efe4" }}>
      {/* 品牌栏 */}
      <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between",
        padding: "56px 22px 0", position: "relative", zIndex: 3 }}>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "baseline", gap: 7 }}>
          <View style={{ fontWeight: 700, fontSize: 16, letterSpacing: "0.04em", color: "#7e242c" }}>余姚杨梅</View>
          <View style={{ fontSize: 10, color: "#a59c89", letterSpacing: "0.2em" }}>YUYAO BAYBERRY</View>
        </View>
      </View>

      {/* 标题区 */}
      <View style={{ padding: "26px 24px 22px", position: "relative", zIndex: 3 }}>
        <Eyebrow>中国地理标志产品</Eyebrow>
        <View style={{ fontSize: 46, fontWeight: 700, lineHeight: "1.04", color: "#2c2a24",
          letterSpacing: "0.02em", marginBottom: 0 }}>
          <View>一口爆汁</View>
          <View>甜透盛夏</View>
        </View>
        <View style={{ marginTop: 16, fontSize: 13.5, lineHeight: "1.7", color: "#6f685a" }}>
          生长于四明山麓的云雾仙境，颗颗紫红如玉，果肉厚实如凝脂，轻咬即迸发蜜糖般的汁水。
        </View>
      </View>

      {/* 主图 */}
      <View style={{ position: "relative", height: 236, overflow: "hidden" }}>
        <Image
          src={`${STATIC_BASE}/img-branch.jpg`}
          mode="aspectFill"
          style={{ width: "100%", height: 236, display: "block" }}
        />
        <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "linear-gradient(180deg,#f4efe4 0%,transparent 16%,transparent 72%,rgba(20,24,20,0.42) 100%)" }} />
        {/* 倒计时条 */}
        <View style={{ position: "absolute", left: 14, right: 14, bottom: 14,
          display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between",
          gap: 10, padding: "11px 14px", borderRadius: 16,
          background: "rgba(28,26,22,0.34)", border: "1px solid rgba(255,255,255,0.18)" }}>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 9 }}>
            <Ico.clock s={18} c="#fff" />
            <View style={{ lineHeight: "1.15" }}>
              <View style={{ fontSize: 12.5, fontWeight: 600, color: "#fff" }}>2026 头茬 · 6月鲜采</View>
              <View style={{ fontSize: 10.5, color: "rgba(255,255,255,0.8)" }}>每年仅采摘黄金 20 天</View>
            </View>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <View style={{ fontSize: 20, fontWeight: 600, color: "#fff", lineHeight: "1" }}>
              {cd.days}<View style={{ fontSize: 11, fontWeight: 400, color: "rgba(255,255,255,0.8)", display: "inline" }}> 天 </View>
              {cd.h}:{cd.m}:{cd.s}
            </View>
            <View style={{ fontSize: 10, color: "rgba(255,255,255,0.8)", letterSpacing: "0.1em" }}>距头茬开摘</View>
          </View>
        </View>
      </View>
    </View>
  );
}
