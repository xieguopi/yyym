import { useState, useEffect } from "react";

const HARVEST = new Date("2026-06-08T06:00:00").getTime();

export function useCountdown() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  let d = Math.max(0, HARVEST - now);
  const days = Math.floor(d / 86400000); d -= days * 86400000;
  const h = Math.floor(d / 3600000); d -= h * 3600000;
  const m = Math.floor(d / 60000); d -= m * 60000;
  const s = Math.floor(d / 1000);
  const p = (n) => String(n).padStart(2, "0");
  return { days, h: p(h), m: p(m), s: p(s) };
}
