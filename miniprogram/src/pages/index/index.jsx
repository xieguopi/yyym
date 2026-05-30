import { useState, useEffect } from "react";
import { View, ScrollView } from "@tarojs/components";
import Hero from "../../components/Hero";
import Story from "../../components/Story";
import Flavor from "../../components/Flavor";
import Freshness from "../../components/Freshness";
import Offer from "../../components/Offer";
import OrderSheet from "../../components/OrderSheet";
import { Ico } from "../../components/Icons";
import { api } from "../../lib/api";

const FALLBACK_SPECS = [
  { id: "s1", name: "精品礼盒装", weight: "500g", price: 69,  note: "1盒 · 约25颗 · 赠定制冰袋",    tag: "人气", stock: 200 },
  { id: "s2", name: "双盒尝鲜装", weight: "1kg",  price: 128, note: "2盒 · 约50颗 · 赠定制冰袋×2",  tag: "划算", stock: 150 },
  { id: "s3", name: "家庭分享装", weight: "2kg",  price: 238, note: "4盒 · 约100颗 · 赠保鲜泡沫箱", tag: "送礼", stock: 80  },
];
const FALLBACK_DATES = [
  { id: "d1", day: "6月8日",  label: "头茬开摘", sub: "最早一批" },
  { id: "d2", day: "6月15日", label: "盛果期",   sub: "甜度最高" },
  { id: "d3", day: "6月22日", label: "末茬",     sub: "量少需抢" },
];

export default function Index() {
  const [specs, setSpecs]   = useState(FALLBACK_SPECS);
  const [dates, setDates]   = useState(FALLBACK_DATES);
  const [stats, setStats]   = useState(null);
  const [specId, setSpecId] = useState("s1");
  const [qty, setQty]       = useState(1);
  const [fav, setFav]       = useState(false);
  const [sheet, setSheet]   = useState(false);

  useEffect(() => {
    api.getSpecs().then(setSpecs).catch(() => {});
    api.getDates().then(setDates).catch(() => {});
    api.getStats().then(setStats).catch(() => {});
  }, []);

  const spec  = specs.find(s => s.id === specId);
  const total = spec ? spec.price * qty : 0;

  return (
    <View style={{ background: "#f4efe4", minHeight: "100vh" }}>
      <ScrollView scrollY style={{ height: "100vh" }} enhanced showScrollbar={false}>
        <Hero />
        <Story />
        <Flavor />
        <Freshness />
        <Offer specs={specs} specId={specId} setSpecId={setSpecId}
          qty={qty} setQty={setQty} stats={stats} />
        <View style={{ height: 96, background: "#ece4d3" }} />
      </ScrollView>

      {/* 底部操作栏 */}
      <View style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 40,
        padding: "12px 16px 30px",
        background: "linear-gradient(180deg,rgba(244,239,228,0) 0%,#f4efe4 26%)" }}>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View onClick={() => setFav(!fav)}
            style={{ width: 50, height: 50, borderRadius: 15, flexShrink: 0,
              border: "1px solid #ddd2bd", background: "#f4efe4",
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", gap: 1 }}>
            <Ico.heart s={20} c={fav ? "#a72f35" : "#6f685a"} f={fav ? "#a72f35" : "none"} />
            <View style={{ fontSize: 8.5, color: fav ? "#a72f35" : "#6f685a" }}>收藏</View>
          </View>
          <View style={{ flex: "0 0 auto", paddingRight: 4 }}>
            <View style={{ fontSize: 24, fontWeight: 700, color: "#a72f35", lineHeight: "1" }}>
              <View style={{ fontSize: 13, display: "inline" }}>¥</View>{total}
            </View>
            <View style={{ fontSize: 9.5, color: "#a59c89" }}>含运费 · 赠定制冰袋</View>
          </View>
          <View onClick={() => setSheet(true)}
            style={{ flex: 1, height: 50, borderRadius: 15,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "linear-gradient(135deg, #a72f35, #7e242c)",
              boxShadow: "0 12px 26px -10px rgba(167,47,53,0.6)" }}>
            <View style={{ fontSize: 16, fontWeight: 600, color: "#fff", letterSpacing: "0.08em" }}>
              立即预定
            </View>
          </View>
        </View>
      </View>

      <OrderSheet open={sheet} onClose={() => setSheet(false)}
        specs={specs} specId={specId} setSpecId={setSpecId}
        qty={qty} setQty={setQty} dates={dates} />
    </View>
  );
}
