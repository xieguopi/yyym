import { View } from "@tarojs/components";
import { Ico, Eyebrow } from "./Icons";

export default function Story() {
  const terroir = [
    { ic: "leaf", k: "红黄壤", v: "富含矿物 微酸沃土" },
    { ic: "drop", k: "充沛雨露", v: "年均 1500mm 滋养" },
    { ic: "sun", k: "昼夜温差", v: "糖分悄然积淀" },
  ];
  return (
    <View style={{ padding: "34px 24px 30px", background: "#f4efe4" }}>
      <Eyebrow>产地 · 四明山麓</Eyebrow>
      <View style={{ marginBottom: 14, fontSize: 25, fontWeight: 600, lineHeight: "1.3", color: "#2c2a24" }}>
        <View>云雾仙境里</View>
        <View>养出的紫红如玉</View>
      </View>
      <View style={{ marginBottom: 22, fontSize: 13, lineHeight: "1.85", color: "#6f685a" }}>
        这里独特的红黄壤、充沛雨露与昼夜温差，孕育出颗颗饱满的杨梅。甜酸比完美平衡，尾调带着山野清香——是江南夏天最先到来的味道。
      </View>
      <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        {terroir.map((x, i) => (
          <View key={i} style={{ flex: 1, background: "#ece4d3", border: "1px solid #ddd2bd",
            borderRadius: 14, padding: "14px 10px", alignItems: "center" }}>
            <View style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
              {Ico[x.ic]({ s: 21, c: "#a72f35" })}
            </View>
            <View style={{ fontSize: 13, fontWeight: 600, color: "#2c2a24", marginBottom: 3, textAlign: "center" }}>{x.k}</View>
            <View style={{ fontSize: 10, lineHeight: "1.4", color: "#a59c89", textAlign: "center" }}>{x.v}</View>
          </View>
        ))}
      </View>
    </View>
  );
}
