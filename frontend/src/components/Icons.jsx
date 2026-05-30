export const Ico = {
  leaf: (p) => <svg viewBox="0 0 24 24" width={p.s||20} height={p.s||20} fill="none" stroke={p.c||"currentColor"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20c0-8 6-15 16-16C19 12 13 19 4 20Z"/><path d="M4 20C8 14 12 11 17 9"/></svg>,
  drop: (p) => <svg viewBox="0 0 24 24" width={p.s||20} height={p.s||20} fill="none" stroke={p.c||"currentColor"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11Z"/></svg>,
  sun: (p) => <svg viewBox="0 0 24 24" width={p.s||20} height={p.s||20} fill="none" stroke={p.c||"currentColor"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"/></svg>,
  truck: (p) => <svg viewBox="0 0 24 24" width={p.s||20} height={p.s||20} fill="none" stroke={p.c||"currentColor"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/></svg>,
  shield: (p) => <svg viewBox="0 0 24 24" width={p.s||20} height={p.s||20} fill="none" stroke={p.c||"currentColor"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6Z"/><path d="M9 12l2 2 4-4"/></svg>,
  snow: (p) => <svg viewBox="0 0 24 24" width={p.s||20} height={p.s||20} fill="none" stroke={p.c||"currentColor"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19"/></svg>,
  hand: (p) => <svg viewBox="0 0 24 24" width={p.s||20} height={p.s||20} fill="none" stroke={p.c||"currentColor"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11V4.5a1.5 1.5 0 0 1 3 0V10M12 10V3.5a1.5 1.5 0 0 1 3 0V11M15 11V5.5a1.5 1.5 0 0 1 3 0V14c0 4-2.5 6.5-6 6.5S6 18 6 15l-1.5-3a1.4 1.4 0 0 1 2.3-1.6L9 13"/></svg>,
  clock: (p) => <svg viewBox="0 0 24 24" width={p.s||20} height={p.s||20} fill="none" stroke={p.c||"currentColor"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
  pin: (p) => <svg viewBox="0 0 24 24" width={p.s||20} height={p.s||20} fill="none" stroke={p.c||"currentColor"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21c5-5 7-8 7-11a7 7 0 1 0-14 0c0 3 2 6 7 11Z"/><circle cx="12" cy="10" r="2.4"/></svg>,
  heart: (p) => <svg viewBox="0 0 24 24" width={p.s||22} height={p.s||22} fill={p.f||"none"} stroke={p.c||"currentColor"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20s-7-4.5-9.2-9C1.3 8 2.6 4.8 5.8 4.4 8 4.1 9.6 5.4 12 8c2.4-2.6 4-3.9 6.2-3.6 3.2.4 4.5 3.6 3 6.6C19 15.5 12 20 12 20Z"/></svg>,
  check: (p) => <svg viewBox="0 0 24 24" width={p.s||20} height={p.s||20} fill="none" stroke={p.c||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5 5L20 6"/></svg>,
  star: (p) => <svg viewBox="0 0 24 24" width={p.s||16} height={p.s||16} fill={p.f||"currentColor"} stroke="none"><path d="M12 2l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 18.6 6.1 20.8l1.2-6.6L2.5 9l6.6-.9Z"/></svg>,
};

export function Eyebrow({ children, accent = "var(--berry)" }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
      <span style={{ width: 18, height: 1, background: accent, opacity: 0.6 }} />
      <span style={{ fontSize: 11.5, letterSpacing: ".28em", color: accent, fontWeight: 500, whiteSpace: "nowrap" }}>
        {children}
      </span>
    </div>
  );
}
