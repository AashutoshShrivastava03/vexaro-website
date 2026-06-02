import { useEffect } from "react";

const DEFAULT = {
  siteName: "VEXARO Courier Solutions",
  description: "India's modern courier partner — 50,000+ daily shipments across 500+ cities. Express, Same-Day, B2B, E-commerce courier services.",
  image: "https://vexaro.in/og-image.jpg",
};

export function useSEO({ title, description, keywords, canonical }) {
  useEffect(() => {
    // Title
    const fullTitle = title ? `${title} | VEXARO Courier Solutions` : DEFAULT.siteName;
    document.title = fullTitle;

    const setMeta = (name, content, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };

    const desc = description || DEFAULT.description;
    setMeta("description", desc);
    if (keywords) setMeta("keywords", keywords);

    // Open Graph
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", desc, true);
    setMeta("og:type", "website", true);
    setMeta("og:image", DEFAULT.image, true);
    setMeta("og:site_name", DEFAULT.siteName, true);

    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", desc);

    // Canonical
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
      link.href = canonical;
    }

    return () => {
      document.title = DEFAULT.siteName;
    };
  }, [title, description, keywords, canonical]);
}
