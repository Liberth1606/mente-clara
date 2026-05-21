import { useEffect } from "react";
import { useSiteSettings } from "@/hooks/use-site-data";

/** Converts #RRGGBB → "oklch(L C H)" string usable in CSS variables. */
function hexToOklch(hex: string): string {
  const h = hex.replace("#", "");
  if (h.length !== 6) return hex;
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  // sRGB -> linear
  const lin = (c: number) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const R = lin(r), G = lin(g), B = lin(b);
  // linear sRGB -> OKLab (Björn Ottosson)
  const l_ = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m_ = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s_ = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
  const C = Math.sqrt(a * a + bb * bb);
  let H = (Math.atan2(bb, a) * 180) / Math.PI;
  if (H < 0) H += 360;
  return `oklch(${L.toFixed(3)} ${C.toFixed(3)} ${H.toFixed(1)})`;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { data } = useSiteSettings();

  useEffect(() => {
    if (!data || typeof document === "undefined") return;
    const root = document.documentElement;
    const primary = hexToOklch(data.primary_color);
    const accent = hexToOklch(data.accent_color);
    const bg = hexToOklch(data.background_color);
    const fg = hexToOklch(data.foreground_color);
    root.style.setProperty("--primary", primary);
    root.style.setProperty("--ring", primary);
    root.style.setProperty("--sage", primary);
    root.style.setProperty("--accent", accent);
    root.style.setProperty("--ember", accent);
    root.style.setProperty("--background", bg);
    root.style.setProperty("--foreground", fg);
  }, [data]);

  return <>{children}</>;
}
