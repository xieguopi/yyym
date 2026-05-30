import { useState, useEffect } from "react";
import { Ico } from "./Icons.jsx";
import { Stepper } from "./Offer.jsx";
import { useCountdown } from "../lib/hooks.js";
import { api } from "../lib/api.js";

function Label({ children, inline }) {
  return (
    <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)", marginBottom: inline ? 0 : 11, letterSpacing: ".04em" }}>
      {children}
    </div>
  );
}

function AddressModal({ open, onClose, name, setName, phone, setPhone, address, setAddress }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.5)" }} />
      <div style={{ position: "relative", width: "90%", maxWidth: 360, background: "var(--paper)",
        borderRadius: 20, padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
        <h3 style={{ margin: 0, fontFamily: "var(--serif)", fontSize: 18 }}>收货信息</h3>
        {[
          { label: "姓名", value: name, onChange: setName, placeholder: "请输入收货人姓名" },
          { label: "手机号", value: phone, onChange: setPhone, placeholder: "请输入手机号码", type: "tel" },
          { label: "地址", value: address, onChange: setAddress, placeholder: "省 / 市 / 区 / 详细地址" },
        ].map(f => (
          <div key={f.label}>
            <div style={{ fontSize: 12, color: "var(--ink-soft)", marginBottom: 6 }}>{f.label}</div>
            <input type={f.type || "text"} value={f.value} onChange={e => f.onChange(e.target.value)}
              placeholder={f.placeholder}
              style={{ width: "100%", padding: "10px 12px", borderRadius: 10, fontSize: 14,
                border: "1px solid var(--line)", background: "var(--paper-2)", color: "var(--ink)",
                outline: "none", fontFamily: "var(--sans)" }} />
          </div>
        ))}
        <button onClick={onClose} style={{ height: 46, borderRadius: 12, border: "none", cursor: "pointer",
          background: "linear-gradient(135deg, var(--berry), var(--berry-deep))", color: "#fff",
          fontSize: 15, fontWeight: 600, fontFamily: "var(--serif)" }}>
          确认
        </button>
      </div>
    </div>
  );
}

function OptStep({ specs, specId, setSpecId, qty, setQty, dates, dateId, setDateId,
  name, setName, phone, setPhone, address, setAddress, onConfirm, onClose, loading, error }) {
  const [addrOpen, setAddrOpen] = useState(false);
  const spec = specs.find(s => s.id === specId);
  const total = spec ? spec.price * qty : 0;

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 20px 14px" }}>
        <h3 style={{ margin: 0, fontFamily: "var(--serif)", fontSize: 20, fontWeight: 600, color: "var(--ink)" }}>确认预定</h3>
        <button onClick={onClose} style={{ border: "none", background: "none", fontSize: 22, color: "var(--ink-faint)", cursor: "pointer", lineHeight: 1 }}>×</button>
      </div>
      <div className="scroll" style={{ overflowY: "auto", padding: "0 20px", flex: 1 }}>
        <Label>选择规格</Label>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          {specs.map(s => {
            const on = s.id === specId;
            return (
              <button key={s.id} onClick={() => setSpecId(s.id)} style={{ textAlign: "left", cursor: "pointer",
                display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px",
                borderRadius: 13, border: `1.5px solid ${on ? "var(--berry)" : "var(--line)"}`,
                background: on ? "rgba(167,47,53,.05)" : "var(--paper)" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{s.name} · {s.weight}</div>
                  <div style={{ fontSize: 10.5, color: "var(--ink-faint)", marginTop: 2 }}>{s.note}</div>
                </div>
                <span style={{ fontFamily: "var(--serif)", fontSize: 17, fontWeight: 700, color: on ? "var(--berry)" : "var(--ink)" }}>¥{s.price}</span>
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <Label inline>数量</Label>
          <Stepper qty={qty} setQty={setQty} />
        </div>

        <Label>送达批次</Label>
        <div style={{ display: "flex", gap: 9, marginBottom: 20 }}>
          {dates.map(d => {
            const on = d.id === dateId;
            return (
              <button key={d.id} onClick={() => setDateId(d.id)} style={{ flex: 1, cursor: "pointer", padding: "11px 6px",
                borderRadius: 12, textAlign: "center", border: `1.5px solid ${on ? "var(--berry)" : "var(--line)"}`,
                background: on ? "rgba(167,47,53,.05)" : "var(--paper)" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: on ? "var(--berry)" : "var(--ink)" }}>{d.day}</div>
                <div style={{ fontSize: 10, color: "var(--ink-soft)", margin: "2px 0" }}>{d.label}</div>
                <div style={{ fontSize: 9, color: "var(--ink-faint)" }}>{d.sub}</div>
              </button>
            );
          })}
        </div>

        <Label>收货信息</Label>
        <button onClick={() => setAddrOpen(true)} style={{ width: "100%", textAlign: "left", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", borderRadius: 13,
          border: "1px solid var(--line)", background: "var(--paper-2)", marginBottom: 18 }}>
          <Ico.pin s={20} c="var(--berry)" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>
              {name || "点击填写收货人"}{phone ? "　" + phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2") : ""}
            </div>
            <div style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 2 }}>
              {address || "请填写收货地址"}
            </div>
          </div>
          <span style={{ fontSize: 18, color: "var(--ink-faint)" }}>›</span>
        </button>

        {error && (
          <div style={{ background: "rgba(167,47,53,.08)", border: "1px solid rgba(167,47,53,.2)",
            borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 12.5, color: "var(--berry-deep)" }}>
            {error}
          </div>
        )}
      </div>

      <div style={{ padding: "14px 20px 26px", borderTop: "1px solid var(--line)", background: "var(--paper)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ fontSize: 11.5, color: "var(--ink-soft)", whiteSpace: "nowrap" }}>含赠品 · 顺丰次日达</span>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: 11, color: "var(--ink-soft)" }}>合计 </span>
            <span style={{ fontFamily: "var(--serif)", fontSize: 24, fontWeight: 700, color: "var(--berry)" }}>
              <span style={{ fontSize: 13 }}>¥</span>{total}
            </span>
          </div>
        </div>
        <button onClick={onConfirm} disabled={loading} style={{ width: "100%", height: 50, borderRadius: 15,
          border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1,
          background: "linear-gradient(135deg, var(--berry), var(--berry-deep))", color: "#fff",
          fontSize: 16, fontWeight: 600, fontFamily: "var(--serif)", letterSpacing: ".1em",
          boxShadow: "0 12px 26px -10px var(--berry)" }}>
          {loading ? "提交中…" : "提交预定"}
        </button>
      </div>

      <AddressModal open={addrOpen} onClose={() => setAddrOpen(false)}
        name={name} setName={setName} phone={phone} setPhone={setPhone} address={address} setAddress={setAddress} />
    </>
  );
}

function DoneStep({ order, onClose }) {
  const cd = useCountdown();
  const spec = order?.spec;
  const date = order?.delivery_date;
  return (
    <div style={{ padding: "14px 24px 28px", textAlign: "center" }}>
      <div style={{ width: 66, height: 66, borderRadius: "50%", margin: "8px auto 16px",
        background: "rgba(111,138,82,.14)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Ico.check s={32} c="var(--leaf-deep)" />
      </div>
      <h3 style={{ margin: "0 0 6px", fontFamily: "var(--serif)", fontSize: 23, fontWeight: 700, color: "var(--ink)" }}>预定成功</h3>
      <p style={{ margin: "0 0 4px", fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.6 }}>
        已为你锁定头茬鲜果，{date?.day}「{date?.label}」清晨现摘现发
      </p>
      <div style={{ fontSize: 10.5, color: "var(--ink-faint)", marginBottom: 20 }}>预定单号 {order?.order_no}</div>

      <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: 16,
        padding: "16px 16px", textAlign: "left", marginBottom: 18 }}>
        {[
          ["商品", `${spec?.name} · ${spec?.weight}`],
          ["数量", `×${order?.qty}`],
          ["送达", `${date?.day} ${date?.label}`],
          ["赠品", "定制冰袋"],
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0",
            borderBottom: i < 3 ? "1px dashed var(--line)" : "none" }}>
            <span style={{ fontSize: 12, color: "var(--ink-soft)" }}>{r[0]}</span>
            <span style={{ fontSize: 12.5, color: "var(--ink)", fontWeight: 500, whiteSpace: "nowrap" }}>{r[1]}</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingTop: 12, marginTop: 6, borderTop: "1px solid var(--line)" }}>
          <span style={{ fontSize: 12.5, color: "var(--ink)" }}>实付</span>
          <span style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 700, color: "var(--berry)" }}>¥{order?.total}</span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 22,
        background: "rgba(167,47,53,.06)", border: "1px solid rgba(167,47,53,.16)", borderRadius: 12, padding: 11 }}>
        <Ico.clock s={16} c="var(--berry)" />
        <span style={{ fontSize: 12, color: "var(--berry-deep)" }}>
          距头茬开摘还有 <b style={{ fontVariantNumeric: "tabular-nums" }}>{cd.days} 天 {cd.h}:{cd.m}:{cd.s}</b>
        </span>
      </div>

      <button onClick={onClose} style={{ width: "100%", height: 48, borderRadius: 14, cursor: "pointer",
        border: "1px solid var(--line)", background: "var(--paper)", color: "var(--ink)", fontSize: 14, fontWeight: 600 }}>
        完成
      </button>
      <p style={{ fontSize: 10.5, color: "var(--ink-faint)", marginTop: 14, lineHeight: 1.6 }}>
        坏果包赔 · 顺丰空运次日达 · 全程冷链锁鲜
      </p>
    </div>
  );
}

export default function OrderSheet({ open, onClose, specs, specId, setSpecId, qty, setQty, dates }) {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState("opt");
  const [dateId, setDateId] = useState("d1");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setStep("opt");
      setError("");
      const id = setTimeout(() => setShow(true), 20);
      return () => clearTimeout(id);
    } else {
      setShow(false);
    }
  }, [open]);

  if (!open) return null;

  const handleConfirm = async () => {
    if (!name.trim()) return setError("请填写收货人姓名");
    if (!phone.trim()) return setError("请填写手机号码");
    if (!address.trim()) return setError("请填写收货地址");
    setError("");
    setLoading(true);
    try {
      const result = await api.createOrder({ spec_id: specId, qty, date_id: dateId,
        recipient_name: name, recipient_phone: phone, address });
      setOrder(result);
      setStep("done");
    } catch (e) {
      setError(e.message || "提交失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  const close = () => { setShow(false); setTimeout(onClose, 260); };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 60, display: "flex", alignItems: "flex-end" }}>
      <div onClick={close} style={{ position: "absolute", inset: 0,
        background: `rgba(20,18,14,${show ? 0.5 : 0})`, transition: "background .26s" }} />
      <div style={{ position: "relative", width: "100%", maxHeight: "90%", background: "var(--paper)",
        borderRadius: "26px 26px 0 0",
        transform: `translateY(${show ? "0" : "100%"})`, transition: "transform .3s cubic-bezier(.3,.8,.3,1)",
        display: "flex", flexDirection: "column", overflow: "hidden",
        boxShadow: "0 -20px 50px rgba(0,0,0,.3)" }}>
        <div style={{ padding: "10px 0 6px", display: "flex", justifyContent: "center" }}>
          <div style={{ width: 40, height: 4, borderRadius: 4, background: "var(--line)" }} />
        </div>
        {step === "opt" && (
          <OptStep specs={specs} specId={specId} setSpecId={setSpecId} qty={qty} setQty={setQty}
            dates={dates} dateId={dateId} setDateId={setDateId}
            name={name} setName={setName} phone={phone} setPhone={setPhone} address={address} setAddress={setAddress}
            onConfirm={handleConfirm} onClose={close} loading={loading} error={error} />
        )}
        {step === "done" && <DoneStep order={order} onClose={close} />}
      </div>
    </div>
  );
}
