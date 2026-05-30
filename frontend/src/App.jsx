import { useState, useEffect } from "react";
import Hero from "./components/Hero.jsx";
import Story from "./components/Story.jsx";
import Flavor from "./components/Flavor.jsx";
import Freshness from "./components/Freshness.jsx";
import Offer from "./components/Offer.jsx";
import OrderSheet from "./components/OrderSheet.jsx";
import { Ico } from "./components/Icons.jsx";
import Admin from "./pages/Admin.jsx";

// 简单 hash 路由：/#/admin → 管理后台
function useRoute() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const handler = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  return hash;
}
import { api } from "./lib/api.js";

function BottomBar({ total, fav, setFav, onOrder }) {
  return (
    <div style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 40,
      padding: "12px 16px max(16px, env(safe-area-inset-bottom, 16px))",
      background: "linear-gradient(180deg,rgba(244,239,228,0) 0%,var(--paper) 26%)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={() => setFav(!fav)} aria-label="收藏" style={{ width: 50, height: 50, borderRadius: 15,
          flexShrink: 0, border: "1px solid var(--line)", background: "var(--paper)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 1, cursor: "pointer", color: fav ? "var(--berry)" : "var(--ink-soft)" }}>
          <Ico.heart s={20} c={fav ? "var(--berry)" : "var(--ink-soft)"} f={fav ? "var(--berry)" : "none"} />
          <span style={{ fontSize: 8.5 }}>收藏</span>
        </button>
        <div style={{ flex: "0 0 auto", paddingRight: 4 }}>
          <div style={{ fontFamily: "var(--serif)", fontSize: 24, fontWeight: 700, color: "var(--berry)", lineHeight: 1 }}>
            <span style={{ fontSize: 13 }}>¥</span>{total}
          </div>
          <div style={{ fontSize: 9.5, color: "var(--ink-faint)" }}>含运费 · 赠定制冰袋</div>
        </div>
        <button onClick={onOrder} style={{ flex: 1, height: 50, borderRadius: 15, border: "none", cursor: "pointer",
          background: "linear-gradient(135deg, var(--berry), var(--berry-deep))", color: "#fff",
          fontSize: 16, fontWeight: 600, fontFamily: "var(--serif)", letterSpacing: ".08em",
          boxShadow: "0 12px 26px -10px var(--berry)" }}>
          立即预定
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const route = useRoute();
  if (route === "#/admin") return <Admin />;

  const [specs, setSpecs] = useState([]);
  const [dates, setDates] = useState([]);
  const [stats, setStats] = useState(null);
  const [specId, setSpecId] = useState("s1");
  const [qty, setQty] = useState(1);
  const [fav, setFav] = useState(false);
  const [sheet, setSheet] = useState(false);

  useEffect(() => {
    api.getSpecs().then(setSpecs).catch(() => {
      setSpecs([
        { id: "s1", name: "精品礼盒装", weight: "500g", price: 69, note: "1盒 · 约25颗 · 赠定制冰袋", tag: "人气", stock: 200 },
        { id: "s2", name: "双盒尝鲜装", weight: "1kg", price: 128, note: "2盒 · 约50颗 · 赠定制冰袋×2", tag: "划算", stock: 150 },
        { id: "s3", name: "家庭分享装", weight: "2kg", price: 238, note: "4盒 · 约100颗 · 赠保鲜泡沫箱", tag: "送礼", stock: 80 },
      ]);
    });
    api.getDates().then(setDates).catch(() => {
      setDates([
        { id: "d1", day: "6月8日", label: "头茬开摘", sub: "最早一批" },
        { id: "d2", day: "6月15日", label: "盛果期", sub: "甜度最高" },
        { id: "d3", day: "6月22日", label: "末茬", sub: "量少需抢" },
      ]);
    });
    api.getStats().then(setStats).catch(() => {});
  }, []);

  const spec = specs.find(s => s.id === specId);
  const total = spec ? spec.price * qty : 0;

  return (
    <div style={{ backgroundImage: "var(--linen)", minHeight: "100vh", background: "var(--paper)" }}>
      <Hero />
      <Story />
      <Flavor />
      <Freshness />
      <Offer specs={specs} specId={specId} setSpecId={setSpecId} qty={qty} setQty={setQty} stats={stats} />
      <div style={{ height: 96, background: "var(--paper-2)" }} />
      <BottomBar total={total} fav={fav} setFav={setFav} onOrder={() => setSheet(true)} />
      <OrderSheet open={sheet} onClose={() => setSheet(false)}
        specs={specs} specId={specId} setSpecId={setSpecId}
        qty={qty} setQty={setQty} dates={dates} />
    </div>
  );
}
