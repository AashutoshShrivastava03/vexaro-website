/**
 * ScrollCarousel — Scroll-Driven Sticky Feature Showcase
 *
 * Speed: 250vh total track (62.5vh per slide) — snappy, not sluggish
 * Colors: 4 distinct warm-gold palette bands matching VEXARO brand
 * Architecture: sticky viewport + scroll-progress JS mapping
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBolt, FaShieldAlt, FaMapMarkedAlt, FaMobileAlt,
  FaCheckCircle, FaTruck, FaBoxOpen, FaClock,
} from "react-icons/fa";
import { MdTrackChanges } from "react-icons/md";

/* ─────────────────────────────────────────────────────────────────────────────
   SLIDE DATA — 4 slides, each with its own distinct gold-family palette
   ───────────────────────────────────────────────────────────────────────────── */
const SLIDES = [
  {
    index: 0,
    tag: "01 / 04",
    title: "Lightning-Fast Delivery",
    headline: "50,000+ shipments.\nEvery single day.",
    body: "VEXARO's express network covers 500+ cities with optimised last-mile routing. Next-day delivery to 200+ metros, same-day in 50+ cities — backed by a 98.5% on-time success rate.",
    bullets: [
      "Next-day delivery to 200+ cities",
      "Same-day service — book by 10 AM",
      "98.5% on-time delivery guarantee",
      "Priority handling throughout",
    ],
    /* Slide 1: Warm cream → pale gold */
    bgGradient: "linear-gradient(135deg, #FAFBFF 0%, #EEF2FF 50%, #F0F4FF 100%)",
    accentColor: "#1A3A8F",
    tagBg: "bg-navy-50 border-navy/20",
    tagText: "text-navy",
    dotColor: "#1A3A8F",
    visual: "speed",
  },
  {
    index: 1,
    tag: "02 / 04",
    title: "Real-Time Tracking",
    headline: "Full visibility from\npickup to doorstep.",
    body: "Every shipment comes with live GPS tracking, automated SMS and email alerts at each stage, and a dedicated tracking dashboard. Your customers always know exactly where their parcel is.",
    bullets: [
      "Live GPS tracking from pickup",
      "Automated SMS & email alerts",
      "AWB-based tracking portal",
      "Digital proof of delivery",
    ],
    /* Slide 2: Deep gold → amber */
    bgGradient: "linear-gradient(135deg, #EEF2FF 0%, #E8EEFF 40%, #FFF4ED 100%)",
    accentColor: "#E06000",
    tagBg: "bg-orange-50 border-orange/20",
    tagText: "text-orange",
    dotColor: "#E06000",
    visual: "tracking",
  },
  {
    index: 2,
    tag: "03 / 04",
    title: "Pan-India Network",
    headline: "500+ cities.\n800+ pin codes. One partner.",
    body: "VEXARO's infrastructure spans Tier 1 metros to Tier 3 towns. With 20+ strategic fulfilment hubs and 5,000+ last-mile agents, we ensure your shipment reaches even the most remote destinations.",
    bullets: [
      "500+ cities nationwide",
      "800+ serviceable pin codes",
      "20+ strategic fulfilment hubs",
      "5,000+ last-mile agents",
    ],
    /* Slide 3: Rich honey-gold → warm ochre */
    bgGradient: "linear-gradient(135deg, #F5EDD0 0%, #EDD89A 35%, #E8C84A 70%, #1A3A8F 100%)",
    accentColor: "#B84D00",
    tagBg: "bg-navy-50 border-navy/20",
    tagText: "text-navy",
    dotColor: "#B84D00",
    visual: "network",
  },
  {
    index: 3,
    tag: "04 / 04",
    title: "Technology-First Platform",
    headline: "Plug in. Automate.\nScale effortlessly.",
    body: "Our API-ready courier platform integrates seamlessly with Shopify, WooCommerce, Magento, and custom systems. Auto-manifest generation, smart dashboards, COD management, and returns — all in one place.",
    bullets: [
      "API integrations for all platforms",
      "Auto-manifest generation",
      "COD collection & remittance",
      "Real-time analytics dashboard",
    ],
    /* Slide 4: Antique gold → soft cream — full circle */
    bgGradient: "linear-gradient(135deg, #F0F4FF 0%, #EEF2FF 40%, #FAFBFF 100%)",
    accentColor: "#1A3A8F",
    tagBg: "bg-navy-50 border-navy/20",
    tagText: "text-navy",
    dotColor: "#1A3A8F",
    visual: "tech",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   VISUAL CARDS — one per slide, animated UI mockups
   ───────────────────────────────────────────────────────────────────────────── */
function SlideVisual({ visual }) {
  if (visual === "speed") return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-72 md:w-80 bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-orange flex items-center justify-center shadow-navy-sm">
              <FaTruck size={13} className="text-white" />
            </div>
            <span className="font-bold font-heading text-charcoal text-sm">Live Dispatch</span>
          </div>
          <span className="text-xs font-body bg-green-50 text-green-600 px-2 py-1 rounded-full border border-green-200 font-medium">● Active</span>
        </div>
        {[
          { route: "Mumbai → Delhi", status: "Out for Delivery", pct: 82 },
          { route: "Bangalore → Chennai", status: "In Transit", pct: 55 },
          { route: "Hyderabad → Pune", status: "Picked Up", pct: 28 },
        ].map((r, i) => (
          <div key={i} className="mb-4 last:mb-0">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-heading text-charcoal font-medium">{r.route}</span>
              <span className="text-[11px] font-body text-graphite">{r.status}</span>
            </div>
            <div className="h-2 bg-blue-50 rounded-full overflow-hidden border border-blue-100">
              <motion.div
                className="h-full rounded-full gradient-orange"
                initial={{ width: 0 }}
                animate={{ width: `${r.pct}%` }}
                transition={{ duration: 1, delay: i * 0.18, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
        <div className="mt-5 pt-4 border-t border-blue-100 flex gap-3">
          {[["50K+", "Today"], ["98.5%", "On-Time"], ["500+", "Cities"]].map(([v, l]) => (
            <div key={l} className="flex-1 bg-blue-50 border border-blue-100 rounded-lg py-2 text-center">
              <div className="text-navy font-bold font-heading text-sm">{v}</div>
              <div className="text-graphite text-[10px] font-body">{l}</div>
            </div>
          ))}
        </div>
      </div>
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-4 right-4 bg-white rounded-xl shadow-md border border-blue-100 px-3 py-2 flex items-center gap-2"
      >
        <FaBolt size={13} className="text-navy" />
        <span className="text-charcoal text-xs font-heading font-semibold">Express</span>
      </motion.div>
    </div>
  );

  if (visual === "tracking") return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-72 md:w-80 bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
        <div className="flex items-center gap-2 mb-5">
          <MdTrackChanges size={17} className="text-navy" />
          <span className="font-bold font-heading text-charcoal text-sm">AWB: VX2024001</span>
        </div>
        {[
          { label: "Picked Up", time: "10:30 AM", loc: "Mumbai, MH", done: true },
          { label: "In Transit", time: "2:15 AM", loc: "Nagpur Hub", done: true },
          { label: "Out for Delivery", time: "8:00 AM", loc: "Delhi, DL", done: true },
          { label: "Delivered", time: "", loc: "", done: false },
        ].map((step, i) => (
          <div key={i} className="flex gap-3 relative">
            {i < 3 && (
              <div className={`absolute left-3 top-6 w-0.5 h-7 ${step.done ? "bg-navy/50" : "bg-blue-100"}`} />
            )}
            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${step.done ? "gradient-orange shadow-navy-sm" : "bg-blue-50 border border-blue-200"}`}>
              {step.done
                ? <FaCheckCircle size={10} className="text-white" />
                : <div className="w-2 h-2 rounded-full bg-blue-200" />
              }
            </div>
            <div className="pb-5 flex-1">
              <div className={`text-sm font-heading font-semibold leading-tight ${step.done ? "text-charcoal" : "text-graphite/40"}`}>
                {step.label}
              </div>
              {step.done && (
                <div className="text-[11px] text-graphite font-body">{step.time} · {step.loc}</div>
              )}
            </div>
          </div>
        ))}
      </div>
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-6 left-4 bg-white rounded-xl shadow-md border border-blue-100 px-3 py-2"
      >
        <div className="text-[10px] text-graphite font-body">ETA</div>
        <div className="text-navy font-bold font-heading text-sm">Today, 5 PM</div>
      </motion.div>
    </div>
  );

  if (visual === "network") return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-72 md:w-80 bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <FaMapMarkedAlt size={16} className="text-navy" />
          <span className="font-bold font-heading text-charcoal text-sm">Network Coverage</span>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {["Mumbai","Delhi","Bengaluru","Chennai","Hyderabad","Pune","Kolkata","Ahmedabad","Jaipur","Lucknow","Surat","Indore"].map((city, i) => (
            <motion.div
              key={city}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.25 }}
              className="bg-blue-50 border border-blue-100 rounded-lg p-1.5 text-center"
            >
              <div className="w-2 h-2 rounded-full bg-orange mx-auto mb-1 shadow-navy-sm" />
              <div className="text-[8px] font-body text-graphite truncate leading-tight">{city}</div>
            </motion.div>
          ))}
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-yellow-50 border border-blue-200 rounded-xl p-3 text-center">
          <span className="text-2xl font-bold font-heading gradient-text">500+</span>
          <span className="text-graphite text-xs font-body ml-2">cities connected</span>
        </div>
      </div>
    </div>
  );

  if (visual === "tech") return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-72 md:w-80 bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="font-bold font-heading text-charcoal text-sm">Integration Hub</span>
          <span className="text-[11px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">Connected</span>
        </div>
        {[
          { name: "Shopify", dot: "bg-green-500", status: "Live", bar: 95 },
          { name: "WooCommerce", dot: "bg-blue-500", status: "Live", bar: 88 },
          { name: "Magento", dot: "bg-orange-400", status: "Live", bar: 76 },
          { name: "Custom API", dot: "bg-orange", status: "Active", bar: 100 },
        ].map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="mb-3 last:mb-0"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${p.dot}`} />
                <span className="text-sm font-body text-charcoal">{p.name}</span>
              </div>
              <span className="text-[11px] font-body text-graphite">{p.status}</span>
            </div>
            <div className="h-1.5 bg-blue-50 rounded-full overflow-hidden border border-blue-100">
              <motion.div
                className="h-full gradient-orange rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${p.bar}%` }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
        <div className="mt-4 pt-3 border-t border-blue-100 flex gap-2">
          {[["99.9%", "Uptime"], ["<200ms", "Latency"], ["REST", "API"]].map(([v, l]) => (
            <div key={l} className="flex-1 bg-blue-50 border border-blue-100 rounded-lg py-2 text-center">
              <div className="text-navy font-bold font-heading text-xs">{v}</div>
              <div className="text-graphite text-[10px] font-body">{l}</div>
            </div>
          ))}
        </div>
      </div>
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-4 right-2 bg-white rounded-xl shadow-md border border-blue-100 px-3 py-2"
      >
        <div className="text-[10px] text-graphite font-body">Orders today</div>
        <div className="text-navy font-bold font-heading text-sm">+1,284</div>
      </motion.div>
    </div>
  );

  return null;
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   Speed fix: 250vh track (was 400vh) → each slide occupies only ~62.5vh
   so users reach the next slide after just ~half a screen of scrolling.
   ───────────────────────────────────────────────────────────────────────────── */
export default function ScrollCarousel() {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const trackScrollable = trackRef.current.offsetHeight - window.innerHeight;
    if (trackScrollable <= 0) return;

    const raw = Math.max(0, Math.min(1, -rect.top / trackScrollable));
    setProgress(raw);
    setActiveIndex(Math.min(SLIDES.length - 1, Math.floor(raw * SLIDES.length)));
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(handleScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  const slide = SLIDES[activeIndex];

  return (
    <section className="bg-white">

      {/* Section intro — above the sticky track */}
      <div className="container-custom pt-20 pb-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-light-blue rounded-full mb-4 border border-soft-border">
          <span className="text-navy text-xs font-medium font-heading uppercase tracking-wider">
            Why Choose VEXARO
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-charcoal mb-3">
          Built for Modern Commerce
        </h2>
          <p className="text-graphite font-body max-w-xl mx-auto text-base">
          Scroll to explore what makes VEXARO the courier partner of choice
          for 10,000+ Indian businesses.
        </p>
      </div>

      {/* ── SCROLL TRACK: 250vh total (was 400vh) — 4 slides × ~62.5vh each ──
          Users now feel snappy transitions rather than slow scrolling fatigue   */}
      <div ref={trackRef} style={{ height: "250vh" }} className="relative">

        {/* ── STICKY VIEWPORT ── */}
        <div className="sticky top-0 h-screen overflow-hidden">

          {/* Background crossfade layers — GPU compositor only, no layout thrash */}
          {SLIDES.map((s, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 pointer-events-none"
              animate={{ opacity: i === activeIndex ? 1 : 0 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              style={{ background: s.bgGradient }}
            />
          ))}

          {/* Dot pattern overlay — adapts to each slide's palette */}
          <div
            className="absolute inset-0 opacity-[0.045] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, #E06000 1px, transparent 0)",
              backgroundSize: "30px 30px",
            }}
          />

          {/* ── CONTENT: Left text / Right visual ── */}
          <div className="relative z-10 h-full container-custom flex flex-col md:flex-row items-center gap-10 md:gap-14 py-20">

            {/* LEFT: text */}
            <div className="flex-1 flex flex-col justify-center max-w-lg">

              {/* Step tag */}
              <motion.div
                key={`tag-${activeIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-heading font-semibold tracking-wider uppercase mb-4 self-start ${slide.tagBg} ${slide.tagText}`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: slide.dotColor }}
                />
                {slide.tag}
              </motion.div>

              {/* Title + headline + body + bullets */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${activeIndex}`}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.42, ease: "easeOut" }}
                >
                  <p
                    className="text-sm font-semibold font-heading uppercase tracking-widest mb-2"
                    style={{ color: slide.accentColor }}
                  >
                    {slide.title}
                  </p>
                  <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold font-heading text-charcoal leading-tight mb-4 whitespace-pre-line">
                    {slide.headline}
                  </h2>
                  <p className="text-graphite font-body leading-relaxed mb-7 text-[15px]">
                    {slide.body}
                  </p>
                  <ul className="space-y-3">
                    {slide.bullets.map((b, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 + i * 0.07 }}
                        className="flex items-center gap-3 text-charcoal text-sm font-body"
                      >
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 shadow-navy-sm"
                          style={{ background: `linear-gradient(135deg, ${slide.accentColor}, #E8C84A)` }}
                        >
                          <FaCheckCircle size={9} className="text-white" />
                        </div>
                        {b}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT: animated visual card */}
            <div className="flex-1 flex items-center justify-center h-full max-h-[440px] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`visual-${activeIndex}`}
                  className="w-full h-full"
                  initial={{ opacity: 0, scale: 0.93, y: 22 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -14 }}
                  transition={{ duration: 0.42, ease: "easeOut" }}
                >
                  <SlideVisual visual={slide.visual} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Bottom: progress dots + bar ── */}
          <div className="absolute bottom-7 left-0 right-0 z-20">
            <div className="container-custom flex flex-col items-center gap-3">
              {/* Pill dots */}
              <div className="flex items-center gap-2.5">
                {SLIDES.map((s, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      width: i === activeIndex ? 32 : 10,
                      opacity: i === activeIndex ? 1 : i < activeIndex ? 0.55 : 0.25,
                    }}
                    transition={{ duration: 0.35 }}
                    className="h-2.5 rounded-full"
                    style={{ backgroundColor: s.dotColor }}
                  />
                ))}
              </div>

              {/* Thin progress track */}
              <div className="w-40 h-0.5 bg-black/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress * 100}%`,
                    background: slide.bgGradient,
                    backgroundColor: slide.accentColor,
                  }}
                />
              </div>

              <p className="text-charcoal/40 text-[11px] font-body tracking-widest uppercase">
                {activeIndex < SLIDES.length - 1 ? "↓  Scroll to continue" : "✓  You've seen it all"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
