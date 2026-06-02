import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  FaTruck,
  FaBolt,
  FaClock,
  FaIndustry,
  FaWarehouse,
  FaShoppingCart,
  FaBoxes,
  FaUndo,
  FaStar,
  FaCheckCircle,
  FaArrowRight,
  FaShieldAlt,
  FaMapMarkedAlt,
  FaMobileAlt,
  FaHeadset,
  FaSearch,
  FaGlobe,
  FaHandshake,
  FaBoxOpen,
  FaLocationArrow,
  FaQuoteLeft,
  FaRoute,
  FaPaperPlane,
} from "react-icons/fa";
import { MdTrackChanges } from "react-icons/md";
import {
  staggerContainer,
  staggerItem,
  fadeUp,
  slideLeft,
  slideRight,
} from "../animations/variants";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useCounter } from "../hooks/useCounter";
import { testimonials, services } from "../data/index";
import { useSEO } from "../hooks/useSEO";

const iconMap = {
  FaTruck,
  FaBolt,
  FaClock,
  FaIndustry,
  FaWarehouse,
  FaShoppingCart,
  FaBoxes,
  FaUndo,
};

function StatCard({ value, suffix, label, decimal, icon: Icon, color }) {
  const { count, ref } = useCounter(value, 2000, decimal);
  return (
    <div ref={ref} className="group">
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-card p-6 shadow-card border border-soft-border text-center relative overflow-hidden"
      >
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background:
              color === "orange"
                ? "linear-gradient(90deg,#E06000,#FF8C2A)"
                : "linear-gradient(90deg,#1A3A8F,#2855C8)",
          }}
        />
        <div
          className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center ${color === "orange" ? "gradient-orange shadow-orange-sm" : "gradient-navy shadow-navy-sm"}`}
        >
          <Icon size={22} className="text-white" />
        </div>
        <div
          className={`text-4xl font-bold font-heading mb-1 ${color === "orange" ? "gradient-text-orange" : "gradient-text-navy"}`}
        >
          {decimal ? count.toFixed(1) : count.toLocaleString()}
          {suffix}
        </div>
        <div className="text-graphite text-sm font-body">{label}</div>
      </motion.div>
    </div>
  );
}

/* Floating particles for hero */
function Particle({ x, y, size, delay, color }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        backgroundColor: color,
        opacity: 0.15,
      }}
      animate={{
        y: [0, -20, 0],
        opacity: [0.1, 0.25, 0.1],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 4 + delay,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

const journeySteps = [
  {
    step: "01",
    icon: FaSearch,
    title: "Book",
    text: "Book online or call. We schedule pickup at your convenience.",
    color: "navy",
    point: "10%",
  },
  {
    step: "02",
    icon: FaTruck,
    title: "Pickup",
    text: "Agent arrives, verifies, and securely handles your shipment.",
    color: "orange",
    point: "36%",
  },
  {
    step: "03",
    icon: FaRoute,
    title: "Transit",
    text: "Real-time updates as it moves through our network.",
    color: "navy",
    point: "64%",
  },
  {
    step: "04",
    icon: FaCheckCircle,
    title: "Delivered",
    text: "Safe, on-time delivery with digital proof of delivery.",
    color: "orange",
    point: "90%",
  },
];

function JourneyFlow({ isInView }) {
  return (
    <div className="relative rounded-card border border-soft-border bg-light-blue overflow-hidden p-5 md:p-8 shadow-card">
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#1A3A8F_1px,transparent_1px),linear-gradient(to_bottom,#1A3A8F_1px,transparent_1px)] bg-[size:34px_34px]" />
      <motion.div
        aria-hidden="true"
        animate={{ x: ["-12%", "112%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 top-6 h-px w-40 bg-gradient-to-r from-transparent via-orange/60 to-transparent"
      />
      <div className="relative hidden md:block h-56 mb-2">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 250"
          fill="none"
        >
          <path
            d="M70 150 C210 42 320 224 460 120 C590 24 710 206 900 74"
            stroke="#DDE3F0"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <motion.path
            d="M70 150 C210 42 320 224 460 120 C590 24 710 206 900 74"
            stroke="url(#routeGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          />
          <defs>
            <linearGradient
              id="routeGradient"
              x1="70"
              x2="900"
              y1="150"
              y2="74"
            >
              <stop stopColor="#1A3A8F" />
              <stop offset="0.55" stopColor="#E06000" />
              <stop offset="1" stopColor="#2855C8" />
            </linearGradient>
          </defs>
        </svg>
        <motion.div
          className="absolute left-[7%] top-[45%] flex h-12 w-12 items-center justify-center rounded-full gradient-orange shadow-orange"
          animate={{
            left: ["7%", "22%", "37%", "53%", "69%", "86%"],
            top: ["45%", "22%", "55%", "36%", "60%", "22%"],
            scale: [1, 1.08, 1, 1.08, 1, 1.04],
          }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaBoxOpen className="text-white" size={17} />
          <span className="absolute inset-0 rounded-full border border-orange/50 animate-ping" />
        </motion.div>
        {journeySteps.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 18, scale: 0.95 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 18, scale: 0.95 }
              }
              transition={{ delay: 0.25 + index * 0.12, duration: 0.45 }}
              className="absolute -translate-x-1/2"
              style={{ left: item.point, top: index % 2 === 0 ? "58%" : "8%" }}
            >
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white border border-soft-border shadow-card">
                <div
                  className={`absolute inset-2 rounded-full ${item.color === "orange" ? "gradient-orange" : "gradient-navy"}`}
                />
                <Icon className="relative text-white" size={18} />
                <span className="absolute -right-2 -top-2 rounded-full bg-charcoal px-2 py-1 text-[10px] font-bold text-white">
                  {item.step}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative grid gap-4 md:grid-cols-4"
      >
        {journeySteps.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className="group rounded-card border border-white/80 bg-white/90 p-5 shadow-card backdrop-blur-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border ${item.color === "orange" ? "bg-orange-50 border-orange/20 text-orange" : "bg-navy-50 border-navy/20 text-navy"} group-hover:scale-110 transition-transform`}
                >
                  <Icon size={16} />
                </div>
                <span
                  className={`font-heading text-xs font-bold ${item.color === "orange" ? "text-orange" : "text-navy"}`}
                >
                  {item.step}
                </span>
              </div>
              <h4 className="font-heading text-base font-bold text-charcoal mb-2">
                {item.title}
              </h4>
              <p className="text-sm leading-relaxed text-graphite font-body">
                {item.text}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

function ClientStoryCard({ story }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-white border border-soft-border rounded-card h-full flex flex-col card-hover group overflow-hidden"
    >
      <div className="relative aspect-[1708/920] overflow-hidden bg-light-blue">
        <img
          src={story.image}
          alt={`${story.name}, ${story.role}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 flex gap-1">
          {[...Array(story.rating)].map((_, i) => (
            <FaStar key={i} size={12} className="text-orange drop-shadow" />
          ))}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <FaQuoteLeft size={18} className="text-navy/20 mb-4" />
        <p className="text-graphite font-body text-sm leading-relaxed flex-1 mb-5">
          {story.text}
        </p>
        <div className="border-t border-soft-border pt-4 flex items-center justify-between gap-3">
          <div>
            <div className="font-semibold font-heading text-charcoal text-sm">
              {story.name}
            </div>
            <div className="text-graphite text-xs font-body">{story.role}</div>
          </div>
          <div className="text-right text-xs font-heading font-semibold text-navy">
            {story.company}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PremiumCta({ isInView, sectionRef }) {
  return (
    <section
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg,#1A3A8F 0%,#0F2566 48%,#1A3A8F 100%)",
      }}
    >
      <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:38px_38px]" />
      <motion.div
        aria-hidden="true"
        animate={{ x: ["-20%", "120%"] }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 top-10 h-px w-72 bg-gradient-to-r from-transparent via-orange to-transparent"
      />
      <motion.div
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
        className="absolute -right-28 -bottom-28 w-72 h-72 rounded-full border border-white/10"
      />
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -18, 0], opacity: [0.32, 0.65, 0.32] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[8%] top-16 h-16 w-16 rounded-full border border-orange/40 shadow-[0_0_50px_rgba(224,96,0,0.35)]"
      />
      <div className="container-custom relative text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/15 rounded-full mb-5">
            <FaLocationArrow className="text-orange" size={11} />
            <span className="text-white/75 text-xs font-medium font-heading uppercase tracking-wider">
              Courier Services That Move With You
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-4">
            Ready to Ship Smarter?
          </h2>
          <p className="text-white/72 font-body text-lg mb-8 max-w-lg mx-auto">
            Join 10,000+ businesses that trust VEXARO. Get a custom quote today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 gradient-orange text-white font-semibold font-heading rounded-btn shadow-orange hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <FaPaperPlane size={13} /> Get a Free Quote
            </Link>
            <Link
              to="/track"
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white/30 text-white font-semibold font-heading rounded-btn hover:border-orange hover:text-orange transition-all duration-200"
            >
              <MdTrackChanges size={16} /> Track a Shipment
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  useSEO({
    title: "Home",
    description:
      "VEXARO — India's modern courier partner. Express delivery, B2B courier services, e-commerce shipping across 500+ cities.",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const s2 = useScrollReveal();
  const s3 = useScrollReveal();
  const s4 = useScrollReveal();
  const s5 = useScrollReveal();
  const s6 = useScrollReveal();
  const s7 = useScrollReveal();
  const s8 = useScrollReveal();
  const s9 = useScrollReveal();

  const particles = [
    { x: 10, y: 20, size: 12, delay: 0, color: "#1A3A8F" },
    { x: 85, y: 15, size: 8, delay: 1, color: "#E06000" },
    { x: 70, y: 70, size: 16, delay: 2, color: "#1A3A8F" },
    { x: 20, y: 75, size: 10, delay: 0.5, color: "#E06000" },
    { x: 50, y: 10, size: 6, delay: 1.5, color: "#2855C8" },
    { x: 90, y: 50, size: 14, delay: 3, color: "#FF8C2A" },
    { x: 5, y: 50, size: 8, delay: 2.5, color: "#E06000" },
    { x: 60, y: 85, size: 10, delay: 0.8, color: "#1A3A8F" },
  ];

  return (
    <>
      {/* ═══════════════════════════════ HERO ══════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative flex items-center overflow-hidden bg-white"
        style={{ minHeight: "100vh" }}
      >
        {/* Background Image using object-fit */}
        <div className="absolute inset-0 pt-20 md:pt-24 z-0 pointer-events-none flex justify-end items-end">
          <img
            src="/hero_background.png"
            alt="Courier Background"
            className="w-full h-full object-contain object-bottom lg:object-right-bottom opacity-90"
          />
        </div>

        {/* Abstract Background Grid & Glows */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-orange opacity-[0.08] blur-[100px]" />
          <div className="absolute right-0 bottom-0 -z-10 m-auto h-[400px] w-[400px] rounded-full bg-navy opacity-[0.05] blur-[120px]" />
        </div>

        {/* Content */}
        <motion.div
          className="container-custom relative z-10 w-full"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          {/* Adjusted padding to fit nicely */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 min-h-screen pt-24 lg:pt-28 pb-10">
            {/* LEFT SIDE */}
            <div className="flex-1 max-w-xl lg:max-w-[50%] z-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-navy/10 bg-white/90 backdrop-blur-md shadow-soft mb-5"
              >
                <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                <span className="text-charcoal font-semibold text-[10px] sm:text-xs uppercase tracking-widest font-heading">
                  India's Premium Courier Partner
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-5xl md:text-[4rem] lg:text-[4.5rem] font-black font-heading text-charcoal leading-[1.05] tracking-tighter mb-6"
              >
                DELIVERING
                <span className="inline-block text-orange relative">
                  TRUST.
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3"
                    viewBox="0 0 200 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 10C50 2 150 2 198 10"
                      stroke="#E06000"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span className="block text-navy">CONNECTING</span>
                <span className="block text-charcoal">THE WORLD.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-graphite text-lg font-body leading-relaxed mb-8 max-w-md font-medium"
              >
                VEXARO powers 50,000+ daily shipments across 500+ cities —
                combining technology, speed, and reliability to build the future
                of India's courier services.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4 mb-8"
              >
                <Link
                  to="/track"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-navy text-white font-bold font-heading rounded-full shadow-[0_8px_30px_rgba(26,58,143,0.3)] hover:shadow-[0_8px_30px_rgba(26,58,143,0.5)] hover:-translate-y-1 transition-all duration-300 text-base"
                >
                  <MdTrackChanges size={20} /> Track Shipment
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-sm text-charcoal border-2 border-soft-border font-bold font-heading rounded-full hover:border-charcoal hover:bg-charcoal hover:text-white transition-all duration-300 text-base group"
                >
                  Get a Quote{" "}
                  <FaArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </motion.div>
            </div>

            {/* The right side cards were removed as requested to show the background image */}
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-charcoal text-[11px] font-bold tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="w-0.5 h-8 rounded-full bg-charcoal/20"
          >
            <motion.div
              className="w-full h-1/2 bg-charcoal rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════ STATS ════════════════════════════════ */}
      <section
        className="py-16 bg-white border-y border-soft-border"
        ref={s2.ref}
      >
        <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={s2.isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 md:grid-cols-4 gap-5"
          >
            {[
              {
                value: 50000,
                suffix: "+",
                label: "Daily Shipments",
                icon: FaTruck,
                color: "orange",
              },
              {
                value: 500,
                suffix: "+",
                label: "Cities Covered",
                icon: FaMapMarkedAlt,
                color: "navy",
              },
              {
                value: 98.5,
                suffix: "%",
                label: "Success Rate",
                icon: FaCheckCircle,
                color: "orange",
                decimal: true,
              },
              {
                value: 10000,
                suffix: "+",
                label: "Happy Clients",
                icon: FaHandshake,
                color: "navy",
              },
            ].map((s, i) => (
              <motion.div key={i} variants={staggerItem}>
                <StatCard {...s} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════ COMPANY INTRO ══════════════════════════════ */}
      <section className="section-padding bg-cream" ref={s3.ref}>
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={slideLeft}
              initial="hidden"
              animate={s3.isInView ? "visible" : "hidden"}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-navy-50 border border-navy/20 rounded-full mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-navy" />
                <span className="text-navy text-xs font-medium font-heading uppercase tracking-wider">
                  About VEXARO
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-charcoal mb-5 leading-tight">
                Redefining Courier Services for
                <br />
                <span className="gradient-text-navy">Modern India</span>
              </h2>
              <p className="text-graphite font-body leading-relaxed mb-5">
                VEXARO is a technology-driven courier company headquartered in
                Vijay Nagar, Indore. We deliver with precision, transparency,
                and genuine care across every pin code we serve.
              </p>
              <p className="text-graphite font-body leading-relaxed mb-8">
                From individual parcels to enterprise supply chains, our
                platform brings real-time visibility, seamless integrations, and
                a 98.5% delivery success rate that businesses across India rely
                on every day.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-navy font-semibold font-heading hover:gap-3 transition-all duration-200"
              >
                Learn our story <FaArrowRight size={13} />
              </Link>
            </motion.div>
            <motion.div
              variants={slideRight}
              initial="hidden"
              animate={s3.isInView ? "visible" : "hidden"}
              className="grid grid-cols-2 gap-4"
            >
              {[
                {
                  icon: <FaShieldAlt size={20} className="text-navy" />,
                  title: "Trusted & Secure",
                  text: "Insurance coverage and secure handling for all shipment types.",
                  image: "/trusted-secure.png",
                },
                {
                  icon: <FaBolt size={20} className="text-orange" />,
                  title: "Lightning Speed",
                  text: "Express and same-day options for time-critical deliveries.",
                  image: "/lightning-speed.png",
                },
                {
                  icon: <FaMapMarkedAlt size={20} className="text-navy" />,
                  title: "Pan-India Reach",
                  text: "500+ cities, 800+ serviceable pin codes nationwide.",
                  image: "/pan-india-reach.png",
                },
                {
                  icon: <FaHeadset size={20} className="text-orange" />,
                  title: "24/7 Support",
                  text: "Dedicated customer support available round-the-clock.",
                  image: "/24-7-support.png",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="bg-white border border-soft-border rounded-card card-hover group overflow-hidden flex flex-col"
                >
                  {item.image && (
                    <div className="w-full aspect-[1708/920] overflow-hidden relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  )}
                  <div className="p-5 flex-1 flex flex-col">
                    <div
                      className={`w-10 h-10 rounded-lg bg-navy-50 border border-navy/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${item.image ? "-mt-10 shadow-md relative z-10 bg-white" : ""}`}
                    >
                      {item.icon}
                    </div>
                    <h4 className="font-semibold font-heading text-charcoal text-sm mb-1">
                      {item.title}
                    </h4>
                    <p className="text-graphite text-xs font-body leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ SERVICES ═════════════════════════════════ */}
      <section className="section-padding bg-white" ref={s4.ref}>
        <div className="container-custom">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={s4.isInView ? "visible" : "hidden"}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 border border-orange/20 rounded-full mb-4">
              <span className="text-orange text-xs font-medium font-heading uppercase tracking-wider">
                What We Offer
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-charcoal mb-3">
              Complete Courier Solutions
            </h2>
            <p className="text-graphite font-body max-w-xl mx-auto">
              From express courier to enterprise freight — every shipping need,
              one trusted partner.
            </p>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={s4.isInView ? "visible" : "hidden"}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {services.slice(0, 8).map((s, i) => {
              const Icon = iconMap[s.icon] || FaTruck;
              const isOrange = i % 2 === 0;
              return (
                <motion.div
                  key={s.id}
                  variants={staggerItem}
                  className="bg-white border border-soft-border p-6 rounded-card card-hover cursor-pointer group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm transition-all duration-300 ${isOrange ? "bg-orange-50 border border-orange/20 group-hover:gradient-orange" : "bg-navy-50 border border-navy/20 group-hover:gradient-navy"}`}
                  >
                    <Icon
                      size={20}
                      className={`transition-colors duration-300 ${isOrange ? "text-orange group-hover:text-white" : "text-navy group-hover:text-white"}`}
                    />
                  </div>
                  <h3 className="font-semibold font-heading text-charcoal mb-2 text-sm">
                    {s.title}
                  </h3>
                  <p className="text-graphite text-xs font-body leading-relaxed line-clamp-2 mb-3">
                    {s.description}
                  </p>
                  <div
                    className={`text-xs font-medium font-heading ${isOrange ? "text-orange" : "text-navy"}`}
                  >
                    {s.timeline}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={s4.isInView ? "visible" : "hidden"}
            className="text-center mt-10"
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 gradient-navy text-white font-semibold font-heading rounded-btn shadow-navy hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              View All Services <FaArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════ WHY VEXARO ════════════════════════════════ */}
      <section className="section-padding bg-light-blue" ref={s5.ref}>
        <div className="container-custom">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={s5.isInView ? "visible" : "hidden"}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-soft-border rounded-full mb-4 shadow-card">
              <span className="text-navy text-xs font-medium font-heading uppercase tracking-wider">
                Our Edge
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-charcoal mb-3">
              Why VEXARO Stands Apart
            </h2>
            <p className="text-graphite font-body max-w-xl mx-auto">
              We don't just deliver parcels — we deliver confidence, speed, and
              innovation.
            </p>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={s5.isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {[
              {
                icon: <FaBolt size={20} />,
                title: "Speed & Precision",
                text: "Express networks for 98.5% on-time delivery. Every route optimised for speed without compromising safety.",
                color: "orange",
                image: "/speed-precision.png",
              },
              {
                icon: <MdTrackChanges size={22} />,
                title: "Real-Time Tracking",
                text: "Live shipment visibility from pickup to delivery. Proactive SMS and email alerts keep customers informed.",
                color: "navy",
                image: "/real-time-tracking.png",
              },
              {
                icon: <FaShieldAlt size={20} />,
                title: "Safe & Secure",
                text: "End-to-end security with insurance options, tamper-proof packaging, and trained handling staff.",
                color: "orange",
                image: "/safe-secure.png",
              },
              {
                icon: <FaHeadset size={20} />,
                title: "Dedicated Support",
                text: "Round-the-clock support via phone, email, and WhatsApp. Your account manager is always one call away.",
                color: "navy",
                image: "/dedicated-support.png",
              },
              {
                icon: <FaMapMarkedAlt size={20} />,
                title: "Widest Network",
                text: "500+ cities, 800+ pin codes, and fulfilment hubs ensuring last-mile reach in Tier 3 cities.",
                color: "orange",
                image: "/widest-network.png",
              },
              {
                icon: <FaMobileAlt size={20} />,
                title: "Technology-First",
                text: "API-ready platform, smart dashboard, auto-manifesting, and seamless e-commerce integrations.",
                color: "navy",
                image: "/technology-first.png",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="bg-white rounded-card border border-soft-border hover:border-navy/30 card-hover group overflow-hidden flex flex-col"
              >
                {f.image && (
                  <div className="w-full aspect-[1708/920] overflow-hidden relative">
                    <img
                      src={f.image}
                      alt={f.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${f.color === "orange" ? "bg-orange-50 border border-orange/15 group-hover:gradient-orange" : "bg-navy-50 border border-navy/15 group-hover:gradient-navy"} ${f.image ? "-mt-11 shadow-lg relative z-10" : ""}`}
                  >
                    <span
                      className={`transition-colors duration-300 ${f.color === "orange" ? "text-orange group-hover:text-white" : "text-navy group-hover:text-white"}`}
                    >
                      {f.icon}
                    </span>
                  </div>
                  <h3 className="font-semibold font-heading text-charcoal mb-2">
                    {f.title}
                  </h3>
                  <p className="text-graphite text-sm font-body leading-relaxed">
                    {f.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════ HOW IT WORKS ══════════════════════════════ */}
      <section className="section-padding bg-white" ref={s6.ref}>
        <div className="container-custom">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={s6.isInView ? "visible" : "hidden"}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-navy-50 border border-navy/20 rounded-full mb-4">
              <span className="text-navy text-xs font-medium font-heading uppercase tracking-wider">
                How It Works
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-charcoal mb-3">
              Your Shipment's Journey
            </h2>
          </motion.div>
          <JourneyFlow isInView={s6.isInView} />
        </div>
      </section>

      {/* ══════════════════════ TESTIMONIALS ══════════════════════════════════ */}
      <section className="section-padding bg-cream" ref={s7.ref}>
        <div className="container-custom">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={s7.isInView ? "visible" : "hidden"}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 border border-orange/20 rounded-full mb-4">
              <span className="text-orange text-xs font-medium font-heading uppercase tracking-wider">
                Client Stories
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-charcoal">
              Trusted by India's Best Brands
            </h2>
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={s7.isInView ? "visible" : "hidden"}
          >
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              autoplay={{ delay: 4500, pauseOnMouseEnter: true }}
              pagination={{ clickable: true }}
              className="pb-12"
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t.id}>
                  <ClientStoryCard story={t} />
                  {import.meta.env.MODE === "legacy-preview" && (
                    <div className="bg-white border border-soft-border p-6 rounded-card h-full flex flex-col card-hover">
                      <div className="flex gap-1 mb-4">
                        {[...Array(t.rating)].map((_, i) => (
                          <FaStar key={i} size={13} className="text-orange" />
                        ))}
                      </div>
                      <p className="text-graphite font-body text-sm leading-relaxed flex-1 mb-5 italic">
                        "{t.text}"
                      </p>
                      <div className="border-t border-soft-border pt-4">
                        <div className="font-semibold font-heading text-charcoal text-sm">
                          {t.name}
                        </div>
                        <div className="text-graphite text-xs font-body">
                          {t.role} — {t.company}
                        </div>
                      </div>
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════ CTA ═════════════════════════════════════ */}
      <PremiumCta isInView={s8.isInView} sectionRef={s8.ref} />

      {/* ══════════════════════ CONTACT PREVIEW ═══════════════════════════════ */}
      <section
        className="py-12 bg-white border-t border-soft-border"
        ref={s9.ref}
      >
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold font-heading text-charcoal mb-1">
                Questions? We're here.
              </h3>
              <p className="text-graphite font-body text-sm">
                Reach out anytime — our team responds within 2 hours.
              </p>
            </div>
            <Link
              to="/contact"
              className="flex items-center gap-2 text-navy font-semibold font-heading hover:gap-3 transition-all duration-200 whitespace-nowrap text-sm"
            >
              Reach Us <FaArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
