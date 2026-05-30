import { View } from "@tarojs/components";

// SVG icon as CSS background-image (works in WeChat Mini Program)
function svgIcon(pathData, options = {}) {
  return function Ico({ s = 20, c = "#2c2a24", f = "none" }) {
    const filled = options.filled ? c : f;
    const stroked = options.noStroke ? "none" : c;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${s}" height="${s}" fill="${filled}" stroke="${stroked}" stroke-width="${options.sw || 1.6}" stroke-linecap="round" stroke-linejoin="round">${pathData}</svg>`;
    const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    return (
      <View
        style={{
          width: s,
          height: s,
          backgroundImage: `url("${url}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
          flexShrink: 0,
          display: "flex",
        }}
      />
    );
  };
}

export const Ico = {
  leaf:   svgIcon('<path d="M4 20c0-8 6-15 16-16C19 12 13 19 4 20Z"/><path d="M4 20C8 14 12 11 17 9"/>'),
  drop:   svgIcon('<path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11Z"/>'),
  sun:    svgIcon('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"/>'),
  truck:  svgIcon('<path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/>'),
  shield: svgIcon('<path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6Z"/><path d="M9 12l2 2 4-4"/>'),
  snow:   svgIcon('<path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19"/>'),
  hand:   svgIcon('<path d="M9 11V4.5a1.5 1.5 0 0 1 3 0V10M12 10V3.5a1.5 1.5 0 0 1 3 0V11M15 11V5.5a1.5 1.5 0 0 1 3 0V14c0 4-2.5 6.5-6 6.5S6 18 6 15l-1.5-3a1.4 1.4 0 0 1 2.3-1.6L9 13"/>'),
  clock:  svgIcon('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  pin:    svgIcon('<path d="M12 21c5-5 7-8 7-11a7 7 0 1 0-14 0c0 3 2 6 7 11Z"/><circle cx="12" cy="10" r="2.4"/>'),
  heart:  svgIcon('<path d="M12 20s-7-4.5-9.2-9C1.3 8 2.6 4.8 5.8 4.4 8 4.1 9.6 5.4 12 8c2.4-2.6 4-3.9 6.2-3.6 3.2.4 4.5 3.6 3 6.6C19 15.5 12 20 12 20Z"/>'),
  check:  svgIcon('<path d="M4 12l5 5L20 6"/>', { sw: 2 }),
  star:   svgIcon('<path d="M12 2l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 18.6 6.1 20.8l1.2-6.6L2.5 9l6.6-.9Z"/>', { filled: true, noStroke: true }),
};

export function Eyebrow({ children, accent = "#a72f35" }) {
  return (
    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 14 }}>
      <View style={{ width: 18, height: 1, background: accent, opacity: 0.6 }} />
      <View style={{ fontSize: 11.5, letterSpacing: "0.28em", color: accent, fontWeight: 500 }}>{children}</View>
    </View>
  );
}
