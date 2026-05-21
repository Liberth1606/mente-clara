import { useEffect } from "react";
import { useSiteSettings } from "@/hooks/use-site-data";

/** Converts #RRGGBB → "oklch(L C H)" string usable in CSS variables. */
function hexToOklch(hex: string): string {
  const h = hex.replace("#", "");
  if (h.length !== 6) return hex;
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const lin = (c: number) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const R = lin(r), G = lin(g), B = lin(b);
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

function setFavicon(url: string) {
  if (typeof document === "undefined") return;
  const links = document.querySelectorAll("link[rel~='icon']");
  links.forEach((l) => l.parentNode?.removeChild(l));
  const link = document.createElement("link");
  link.rel = "icon";
  link.href = url;
  document.head.appendChild(link);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { data } = useSiteSettings();

  useEffect(() => {
    if (!data || typeof document === "undefined") return;
    const root = document.documentElement;
    root.style.setProperty("--primary", hexToOklch(data.primary_color));
    root.style.setProperty("--ring", hexToOklch(data.primary_color));
    root.style.setProperty("--sage", hexToOklch(data.primary_color));
    root.style.setProperty("--accent", hexToOklch(data.accent_color));
    root.style.setProperty("--ember", hexToOklch(data.accent_color));
    root.style.setProperty("--background", hexToOklch(data.background_color));
    root.style.setProperty("--foreground", hexToOklch(data.foreground_color));

    // Dynamic document.title
    const title = data.seo_title || data.company_name;
    if (title) document.title = title;

    // Dynamic favicon
    if (data.favicon_url) setFavicon(data.favicon_url);
    else if (data.logo_url) setFavicon(data.logo_url);

    // Dynamic meta description
    if (data.seo_description) {
      let meta = document.querySelector("meta[name='description']");
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", data.seo_description);
    }
  }, [data]);

  return <>{children}</>;
}
