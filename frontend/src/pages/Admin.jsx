import { useState, useEffect } from "react";

const API = import.meta.env.VITE_API_BASE || "/api";

function request(path, token) {
  return fetch(`${API}${path}?token=${encodeURIComponent(token)}`)
    .then(r => r.ok ? r.json() : r.json().then(e => Promise.reject(e.detail)));
}

/* ── 登录框 ──────────────────────────────────────────────── */
function Login({ onLogin }) {
  const [val, setVal] = useState("");
  const [err, setErr] = useState("");
  const submit = async () => {
    try {
      await request("/admin/stats", val);
      onLogin(val);
    } catch {
      setErr("密码错误");
    }
  };
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: "#f4efe4" }}>
      <div style={{ background: "#fff", borderRadius: 20, padding: "40px 36px",
        boxShadow: "0 20px 60px rgba(0,0,0,.1)", width: 320 }}>
        <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 22,
          fontWeight: 700, color: "#7e242c", marginBottom: 8 }}>余姚杨梅</div>
        <div style={{ fontSize: 13, color: "#a59c89", marginBottom: 28 }}>预定管理后台</div>
        <input
          type="password" placeholder="请输入管理密码" value={val}
          onChange={e => { setVal(e.target.value); setErr(""); }}
          onKeyDown={e => e.key === "Enter" && submit()}
          style={{ width: "100%", padding: "12px 14px", borderRadius: 10, fontSize: 14,
            border: "1.5px solid #ddd2bd", outline: "none", boxSizing: "border-box",
            fontFamily: "inherit", marginBottom: 12 }}
        />
        {err && <div style={{ color: "#a72f35", fontSize: 13, marginBottom: 10 }}>{err}</div>}
        <button onClick={submit}
          style={{ width: "100%", height: 44, borderRadius: 10, border: "none",
            background: "linear-gradient(135deg,#a72f35,#7e242c)", color: "#fff",
            fontSize: 15, fontWeight: 600, cursor: "pointer", letterSpacing: ".06em" }}>
          登录
        </button>
        <div style={{ marginTop: 16, fontSize: 11, color: "#c8bfaf", textAlign: "center" }}>
          默认密码：yyym2026
        </div>
      </div>
    </div>
  );
}

/* ── 统计卡片 ─────────────────────────────────────────────── */
function StatCard({ label, value, sub, color = "#a72f35" }) {
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: "14px 16px",
      border: "1px solid #ece4d3", flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 11, color: "#a59c89", marginBottom: 4,
        lineHeight: 1.3 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 700, color, fontFamily: "'Noto Serif SC',serif",
        lineHeight: 1.2 }}>{value}</div>
      {sub && <div style={{ fontSize: 10.5, color: "#c8bfaf", marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

/* ── 主面板 ───────────────────────────────────────────────── */
function Dashboard({ token }) {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const load = () => {
    setLoading(true);
    Promise.all([
      request("/admin/stats", token),
      request("/admin/orders", token),
    ]).then(([s, o]) => { setStats(s); setOrders(o); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const filtered = orders.filter(o =>
    !search || o.order_no.includes(search) ||
    o.recipient_name.includes(search) ||
    o.recipient_phone.includes(search) ||
    o.address.includes(search)
  );

  const fmtMoney = n => "¥" + Number(n).toLocaleString("zh-CN");
  const fmtTime = iso => new Date(iso).toLocaleString("zh-CN", {
    month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit",
  });

  const specColor = { s1: "#a72f35", s2: "#b5402f", s3: "#7e242c" };

  return (
    <div style={{ minHeight: "100vh", background: "#f4efe4", padding: "0 0 60px" }}>
      {/* 顶栏 */}
      <div style={{ background: "#fff", borderBottom: "1px solid #ece4d3",
        padding: "16px 24px", display: "flex", alignItems: "center",
        justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div>
          <span style={{ fontFamily: "'Noto Serif SC',serif", fontWeight: 700,
            fontSize: 17, color: "#7e242c" }}>余姚杨梅</span>
          <span style={{ marginLeft: 10, fontSize: 13, color: "#a59c89" }}>预定管理</span>
        </div>
        <button onClick={load} style={{ border: "1px solid #ddd2bd", background: "#fff",
          borderRadius: 8, padding: "6px 14px", fontSize: 13, cursor: "pointer", color: "#6f685a" }}>
          {loading ? "刷新中…" : "🔄 刷新"}
        </button>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 16px" }}>
        {/* 统计卡片 */}
        {stats && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
            <StatCard label="总预定单数" value={stats.total_orders} sub="累计" />
            <StatCard label="总预定金额" value={fmtMoney(stats.total_revenue)} sub="含运费" color="#516b3c" />
            {stats.specs.map(s => (
              <StatCard key={s.name} label={s.name}
                value={`剩 ${s.stock}`} sub={`¥${s.price} / ${s.weight}`} color="#6f685a" />
            ))}
          </div>
        )}

        {/* 搜索框 */}
        <div style={{ marginBottom: 16, display: "flex", gap: 10, alignItems: "center" }}>
          <input placeholder="搜索单号 / 姓名 / 手机 / 地址…" value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, padding: "10px 14px", borderRadius: 10, fontSize: 14,
              border: "1.5px solid #ddd2bd", outline: "none", background: "#fff",
              fontFamily: "inherit" }} />
          <span style={{ fontSize: 13, color: "#a59c89", whiteSpace: "nowrap" }}>
            共 {filtered.length} 条
          </span>
        </div>

        {/* 订单表格（手机端卡片式） */}
        {loading ? (
          <div style={{ textAlign: "center", padding: 60, color: "#a59c89" }}>加载中…</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: 60, color: "#a59c89" }}>暂无预定记录</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtered.map(o => (
              <div key={o.id} style={{ background: "#fff", borderRadius: 14,
                border: "1px solid #ece4d3", padding: "16px 18px",
                boxShadow: "0 2px 8px rgba(0,0,0,.04)" }}>
                {/* 顶部行 */}
                <div style={{ display: "flex", justifyContent: "space-between",
                  alignItems: "center", marginBottom: 10, flexWrap: "wrap", gap: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontFamily: "monospace", fontSize: 12.5,
                      color: "#6f685a", background: "#f4efe4", padding: "2px 8px",
                      borderRadius: 6 }}>{o.order_no}</span>
                    <span style={{ fontSize: 11, background: specColor[o.spec_id] || "#a72f35",
                      color: "#fff", padding: "2px 8px", borderRadius: 6 }}>
                      {o.spec?.name}
                    </span>
                    <span style={{ fontSize: 13, color: "#6f685a" }}>×{o.qty}</span>
                  </div>
                  <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 20,
                    fontWeight: 700, color: "#a72f35" }}>{fmtMoney(o.total)}</div>
                </div>

                {/* 收货信息 */}
                <div style={{ display: "grid", gridTemplateColumns: "auto 1fr",
                  gap: "5px 12px", fontSize: 13 }}>
                  <span style={{ color: "#a59c89" }}>收货人</span>
                  <span style={{ color: "#2c2a24", fontWeight: 500 }}>
                    {o.recipient_name} &nbsp; {o.recipient_phone}
                  </span>
                  <span style={{ color: "#a59c89" }}>地址</span>
                  <span style={{ color: "#2c2a24" }}>{o.address}</span>
                  <span style={{ color: "#a59c89" }}>配送</span>
                  <span style={{ color: "#516b3c", fontWeight: 500 }}>
                    {o.delivery_date?.day} {o.delivery_date?.label}
                  </span>
                  <span style={{ color: "#a59c89" }}>下单时间</span>
                  <span style={{ color: "#6f685a" }}>{fmtTime(o.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── 入口 ──────────────────────────────────────────────────── */
export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem("admin_token") || "");
  const [authed, setAuthed] = useState(false);

  const handleLogin = t => { sessionStorage.setItem("admin_token", t); setToken(t); setAuthed(true); };

  useEffect(() => {
    if (token) {
      request("/admin/stats", token)
        .then(() => setAuthed(true))
        .catch(() => { sessionStorage.removeItem("admin_token"); setAuthed(false); });
    }
  }, []);

  return authed ? <Dashboard token={token} /> : <Login onLogin={handleLogin} />;
}
