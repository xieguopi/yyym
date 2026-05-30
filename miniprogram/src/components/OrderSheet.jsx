import { useState, useEffect } from "react";
import { View, Input } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { Ico } from "./Icons";
import { Stepper } from "./Offer";
import { useCountdown } from "../lib/hooks";
import { api } from "../lib/api";

function AddressForm({ name, setName, phone, setPhone, address, setAddress, onDone }) {
  return (
    <View style={{ padding: "0 20px 20px" }}>
      <View style={{ fontSize: 16, fontWeight: 600, color: "#2c2a24", marginBottom: 16 }}>收货信息</View>
      {[
        { label: "姓名", value: name, onChange: setName, placeholder: "请输入收货人姓名", type: "text" },
        { label: "手机号", value: phone, onChange: setPhone, placeholder: "请输入手机号码", type: "number" },
        { label: "收货地址", value: address, onChange: setAddress, placeholder: "省 / 市 / 区 / 详细地址", type: "text" },
      ].map(f => (
        <View key={f.label} style={{ marginBottom: 14 }}>
          <View style={{ fontSize: 12, color: "#6f685a", marginBottom: 6 }}>{f.label}</View>
          <Input
            type={f.type}
            value={f.value}
            onInput={e => f.onChange(e.detail.value)}
            placeholder={f.placeholder}
            placeholderStyle="color:#a59c89"
            style={{ width: "100%", padding: "10px 12px", borderRadius: 10, fontSize: 14,
              border: "1px solid #ddd2bd", background: "#ece4d3", color: "#2c2a24" }}
          />
        </View>
      ))}
      <View onClick={onDone}
        style={{ height: 46, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
          background: "linear-gradient(135deg, #a72f35, #7e242c)", marginTop: 4 }}>
        <View style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>确认</View>
      </View>
    </View>
  );
}

function OptStep({ specs, specId, setSpecId, qty, setQty, dates, dateId, setDateId,
  name, phone, address, onEditAddress, onConfirm, onClose, loading, error }) {
  const spec = specs.find(s => s.id === specId);
  const total = spec ? spec.price * qty : 0;

  return (
    <>
      <View style={{ display: "flex", flexDirection: "row", alignItems: "center",
        justifyContent: "space-between", padding: "4px 20px 14px" }}>
        <View style={{ fontSize: 20, fontWeight: 600, color: "#2c2a24" }}>确认预定</View>
        <View onClick={onClose} style={{ fontSize: 22, color: "#a59c89", padding: "4px 8px" }}>×</View>
      </View>

      <View style={{ flex: 1, overflowY: "scroll", padding: "0 20px" }}>
        {/* 规格 */}
        <View style={{ fontSize: 12, fontWeight: 600, color: "#2c2a24", marginBottom: 11, letterSpacing: "0.04em" }}>选择规格</View>
        <View style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          {specs.map(s => {
            const on = s.id === specId;
            return (
              <View key={s.id} onClick={() => setSpecId(s.id)}
                style={{ display: "flex", flexDirection: "row", justifyContent: "space-between",
                  alignItems: "center", padding: "12px 14px", borderRadius: 13,
                  border: `1.5px solid ${on ? "#a72f35" : "#ddd2bd"}`,
                  background: on ? "rgba(167,47,53,0.05)" : "#f4efe4" }}>
                <View>
                  <View style={{ fontSize: 14, fontWeight: 600, color: "#2c2a24" }}>{s.name} · {s.weight}</View>
                  <View style={{ fontSize: 10.5, color: "#a59c89", marginTop: 2 }}>{s.note}</View>
                </View>
                <View style={{ fontSize: 17, fontWeight: 700, color: on ? "#a72f35" : "#2c2a24" }}>¥{s.price}</View>
              </View>
            );
          })}
        </View>

        {/* 数量 */}
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center",
          justifyContent: "space-between", marginBottom: 20 }}>
          <View style={{ fontSize: 12, fontWeight: 600, color: "#2c2a24", letterSpacing: "0.04em" }}>数量</View>
          <Stepper qty={qty} setQty={setQty} />
        </View>

        {/* 批次 */}
        <View style={{ fontSize: 12, fontWeight: 600, color: "#2c2a24", marginBottom: 11, letterSpacing: "0.04em" }}>送达批次</View>
        <View style={{ display: "flex", flexDirection: "row", gap: 9, marginBottom: 20 }}>
          {dates.map(d => {
            const on = d.id === dateId;
            return (
              <View key={d.id} onClick={() => setDateId(d.id)}
                style={{ flex: 1, padding: "11px 6px", borderRadius: 12, alignItems: "center",
                  border: `1.5px solid ${on ? "#a72f35" : "#ddd2bd"}`,
                  background: on ? "rgba(167,47,53,0.05)" : "#f4efe4" }}>
                <View style={{ fontSize: 13, fontWeight: 600, color: on ? "#a72f35" : "#2c2a24",
                  textAlign: "center" }}>{d.day}</View>
                <View style={{ fontSize: 10, color: "#6f685a", margin: "2px 0", textAlign: "center" }}>{d.label}</View>
                <View style={{ fontSize: 9, color: "#a59c89", textAlign: "center" }}>{d.sub}</View>
              </View>
            );
          })}
        </View>

        {/* 收货信息 */}
        <View style={{ fontSize: 12, fontWeight: 600, color: "#2c2a24", marginBottom: 11, letterSpacing: "0.04em" }}>收货信息</View>
        <View onClick={onEditAddress}
          style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 12,
            padding: "13px 14px", borderRadius: 13, border: "1px solid #ddd2bd",
            background: "#ece4d3", marginBottom: 18 }}>
          <Ico.pin s={20} c="#a72f35" />
          <View style={{ flex: 1 }}>
            <View style={{ fontSize: 13, fontWeight: 600, color: "#2c2a24" }}>
              {name || "点击填写收货人"}{phone ? "  " + phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2") : ""}
            </View>
            <View style={{ fontSize: 11, color: "#6f685a", marginTop: 2 }}>{address || "请填写收货地址"}</View>
          </View>
          <View style={{ fontSize: 18, color: "#a59c89" }}>›</View>
        </View>

        {error ? (
          <View style={{ background: "rgba(167,47,53,0.08)", border: "1px solid rgba(167,47,53,0.2)",
            borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 12.5, color: "#7e242c" }}>
            {error}
          </View>
        ) : null}
      </View>

      {/* 底部按钮 */}
      <View style={{ padding: "14px 20px 26px", borderTop: "1px solid #ddd2bd", background: "#f4efe4" }}>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center",
          justifyContent: "space-between", marginBottom: 12 }}>
          <View style={{ fontSize: 11.5, color: "#6f685a" }}>含赠品 · 顺丰次日达</View>
          <View style={{ alignItems: "flex-end" }}>
            <View style={{ fontSize: 11, color: "#6f685a", display: "inline" }}>合计 </View>
            <View style={{ fontSize: 24, fontWeight: 700, color: "#a72f35", display: "inline" }}>
              <View style={{ fontSize: 13, display: "inline" }}>¥</View>{total}
            </View>
          </View>
        </View>
        <View onClick={!loading ? onConfirm : undefined}
          style={{ height: 50, borderRadius: 15, display: "flex", alignItems: "center", justifyContent: "center",
            background: "linear-gradient(135deg, #a72f35, #7e242c)", opacity: loading ? 0.7 : 1,
            boxShadow: "0 12px 26px -10px rgba(167,47,53,0.6)" }}>
          <View style={{ fontSize: 16, fontWeight: 600, color: "#fff", letterSpacing: "0.1em" }}>
            {loading ? "提交中…" : "提交预定"}
          </View>
        </View>
      </View>
    </>
  );
}

function DoneStep({ order, onClose }) {
  const cd = useCountdown();
  const spec = order?.spec;
  const date = order?.delivery_date;
  return (
    <View style={{ padding: "14px 24px 28px", alignItems: "center" }}>
      <View style={{ width: 66, height: 66, borderRadius: 33, margin: "8px auto 16px",
        background: "rgba(111,138,82,0.14)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Ico.check s={32} c="#516b3c" />
      </View>
      <View style={{ fontSize: 23, fontWeight: 700, color: "#2c2a24", textAlign: "center", marginBottom: 6 }}>预定成功</View>
      <View style={{ fontSize: 12.5, color: "#6f685a", lineHeight: "1.6", textAlign: "center", marginBottom: 4 }}>
        已为你锁定头茬鲜果，{date?.day}「{date?.label}」清晨现摘现发
      </View>
      <View style={{ fontSize: 10.5, color: "#a59c89", marginBottom: 20, textAlign: "center" }}>
        预定单号 {order?.order_no}
      </View>

      <View style={{ background: "#ece4d3", border: "1px solid #ddd2bd", borderRadius: 16,
        padding: "16px", width: "100%", marginBottom: 18 }}>
        {[
          ["商品", `${spec?.name} · ${spec?.weight}`],
          ["数量", `×${order?.qty}`],
          ["送达", `${date?.day} ${date?.label}`],
          ["赠品", "定制冰袋"],
        ].map((r, i) => (
          <View key={i} style={{ display: "flex", flexDirection: "row", justifyContent: "space-between",
            padding: "6px 0", borderBottom: i < 3 ? "1px dashed #ddd2bd" : "none" }}>
            <View style={{ fontSize: 12, color: "#6f685a" }}>{r[0]}</View>
            <View style={{ fontSize: 12.5, color: "#2c2a24", fontWeight: 500 }}>{r[1]}</View>
          </View>
        ))}
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between",
          alignItems: "center", paddingTop: 12, marginTop: 6, borderTop: "1px solid #ddd2bd" }}>
          <View style={{ fontSize: 12.5, color: "#2c2a24" }}>实付</View>
          <View style={{ fontSize: 22, fontWeight: 700, color: "#a72f35" }}>¥{order?.total}</View>
        </View>
      </View>

      <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center",
        gap: 8, marginBottom: 22, background: "rgba(167,47,53,0.06)",
        border: "1px solid rgba(167,47,53,0.16)", borderRadius: 12, padding: 11, width: "100%" }}>
        <Ico.clock s={16} c="#a72f35" />
        <View style={{ fontSize: 12, color: "#7e242c" }}>
          距头茬开摘还有 {cd.days} 天 {cd.h}:{cd.m}:{cd.s}
        </View>
      </View>

      <View onClick={onClose}
        style={{ width: "100%", height: 48, borderRadius: 14, display: "flex", alignItems: "center",
          justifyContent: "center", border: "1px solid #ddd2bd", background: "#f4efe4" }}>
        <View style={{ fontSize: 14, fontWeight: 600, color: "#2c2a24" }}>完成</View>
      </View>
      <View style={{ fontSize: 10.5, color: "#a59c89", marginTop: 14, lineHeight: "1.6", textAlign: "center" }}>
        坏果包赔 · 顺丰空运次日达 · 全程冷链锁鲜
      </View>
    </View>
  );
}

export default function OrderSheet({ open, onClose, specs, specId, setSpecId, qty, setQty, dates }) {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState("opt");
  const [dateId, setDateId] = useState("d1");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [editingAddr, setEditingAddr] = useState(false);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setStep("opt"); setError("");
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
    setError(""); setLoading(true);
    try {
      const result = await api.createOrder({
        spec_id: specId, qty, date_id: dateId,
        recipient_name: name, recipient_phone: phone, address,
      });
      setOrder(result);
      setStep("done");
      Taro.showToast({ title: "预定成功！", icon: "success" });
    } catch (e) {
      setError(e.message || "提交失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  const close = () => { setShow(false); setTimeout(onClose, 260); };

  return (
    <View style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 60,
      display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
      <View onClick={close}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: `rgba(20,18,14,${show ? 0.5 : 0})`,
          transition: "background 0.26s" }} />
      <View style={{ position: "relative", width: "100%", background: "#f4efe4",
        borderRadius: "26px 26px 0 0",
        maxHeight: "90%", display: "flex", flexDirection: "column", overflow: "hidden",
        transform: `translateY(${show ? "0" : "100%"})`,
        transition: "transform 0.3s cubic-bezier(0.3,0.8,0.3,1)",
        boxShadow: "0 -20px 50px rgba(0,0,0,0.3)" }}>
        <View style={{ padding: "10px 0 6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <View style={{ width: 40, height: 4, borderRadius: 4, background: "#ddd2bd" }} />
        </View>
        {editingAddr ? (
          <View style={{ overflowY: "scroll", flex: 1 }}>
            <AddressForm name={name} setName={setName} phone={phone} setPhone={setPhone}
              address={address} setAddress={setAddress} onDone={() => setEditingAddr(false)} />
          </View>
        ) : step === "opt" ? (
          <OptStep specs={specs} specId={specId} setSpecId={setSpecId} qty={qty} setQty={setQty}
            dates={dates} dateId={dateId} setDateId={setDateId}
            name={name} phone={phone} address={address}
            onEditAddress={() => setEditingAddr(true)}
            onConfirm={handleConfirm} onClose={close} loading={loading} error={error} />
        ) : (
          <View style={{ overflowY: "scroll", flex: 1 }}>
            <DoneStep order={order} onClose={close} />
          </View>
        )}
      </View>
    </View>
  );
}
