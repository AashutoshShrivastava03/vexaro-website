import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
  FaPhoneAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { staggerContainer, staggerItem } from "../animations/variants";

export default function Footer() {
  const { ref, isInView } = useScrollReveal(0.05);
  return (
    <footer className="bg-charcoal text-white" style={{ marginTop: "auto" }}>
      {/* Orange-Navy dual gradient bar */}
      <div className="w-full h-[3px] gradient-duo" />
      {/* Breathing room after bar */}
      <div className="w-full bg-charcoal" style={{ height: "36px" }} />

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container-custom pb-14"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div variants={staggerItem}>
            <div className="mb-5">
              <img
                src="/new-logo.png"
                alt="VEXARO"
                className="h-12 w-auto object-contain"
                style={{ maxWidth: "200px" }}
              />
            </div>

            <div className="flex gap-3">
              {[
                {
                  icon: <FaInstagram size={15} />,
                  href: "https://www.instagram.com/vexaro_courier1?igsh=c2ZtNmFqZTFqODNi&utm_source=qr",
                  label: "Instagram",
                },
                {
                  icon: <FaWhatsapp size={15} />,
                  href: "https://wa.me/919183888181",
                  label: "WhatsApp",
                },
                {
                  icon: <FaLinkedin size={15} />,
                  href: "https://linkedin.com",
                  label: "LinkedIn",
                },
                {
                  icon: <FaEnvelope size={14} />,
                  href: "mailto:info@vexarocouriersolutions.com",
                  label: "Email",
                },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/45 hover:text-orange hover:border-orange transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <p className="text-white/50 text-sm font-body leading-relaxed mb-2">
              <br />
              CIN: U53200MP2026PTC084168
              <br />
              <br />
              Registration Number: 084168
              <br />
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={staggerItem}>
            <h4 className="font-semibold font-heading text-[11px] uppercase tracking-[0.15em] text-orange mb-6 pl-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", path: "/" },
                { label: "About Us", path: "/about" },
                { label: "Services", path: "/services" },
                { label: "Pricing", path: "/pricing" },
                { label: "Partners", path: "/partners" },
                { label: "Track Shipment", path: "/track" },
                { label: "Contact Us", path: "/contact" },
              ].map((l) => (
                <li key={l.path}>
                  <Link
                    to={l.path}
                    className="text-white/50 hover:text-orange text-sm font-body transition-colors duration-200 relative pl-4 group flex items-center"
                  >
                    <FaArrowRight
                      size={9}
                      className="absolute left-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-orange"
                    />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={staggerItem}>
            <h4 className="font-semibold font-heading text-[11px] uppercase tracking-[0.15em] text-orange mb-6 pl-4">
              Services
            </h4>
            <ul className="space-y-3">
              {[
                ["Domestic Courier", "/services"],
                ["Express Delivery", "/services"],
                ["Same-Day Delivery", "/services"],
                ["B2B Services", "/services"],
                ["E-commerce Shipping", "/services"],
                ["Returns Management", "/services"],
                ["Warehousing", "/services"],
                ["Bulk Freight", "/services"],
              ].map(([s, path]) => (
                <li key={s}>
                  <Link
                    to={path}
                    className="text-white/50 hover:text-orange text-sm font-body transition-colors duration-200 relative pl-4 group flex items-center"
                  >
                    <FaArrowRight
                      size={9}
                      className="absolute left-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-orange"
                    />
                    {s}
                  </Link>
                </li>
              ))}
              <li className="h-3" aria-hidden />
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={staggerItem}>
            <h4 className="font-semibold font-heading text-[11px] uppercase tracking-[0.15em] text-orange mb-6 pl-4">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm font-body text-white/50">
                <FaMapMarkerAlt
                  className="text-orange mt-0.5 flex-shrink-0"
                  size={13}
                />
                <span className="leading-relaxed">
                  <span className="whitespace-nowrap">
                    Flat 1113, 1st Floor, Chikitsak Nagar,
                  </span>
                  <br />
                  Vijay Nagar, Indore, MP — 452010
                </span>
              </li>
              <li>
                <div className="space-y-2 text-sm font-body text-white/50">
                  <a
                    href="mailto:info@vexarocouriersolutions.com"
                    className="flex items-center gap-2 hover:text-orange transition-colors"
                  >
                    <FaEnvelope
                      className="text-orange flex-shrink-0"
                      size={12}
                    />
                    <span>Email:</span>
                    <span className="text-white/70">
                      info@vexarocouriersolutions.com
                    </span>
                  </a>
                  <a
                    href="tel:+919183888181"
                    className="flex items-center gap-2 hover:text-orange transition-colors"
                  >
                    <FaPhoneAlt
                      className="text-orange flex-shrink-0"
                      size={12}
                    />
                    <span>Phone:</span>
                    <span className="text-white/70">+91 - 9183888181</span>
                  </a>
                </div>
              </li>
              {[
                ["Terms & Conditions", "/terms"],
                ["Privacy Policy", "/privacy"],
                ["Resources", "/resources"],
              ].map(([label, path]) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="flex items-start relative pl-4 gap-3 text-sm font-body text-white/50 hover:text-orange transition-colors"
                  >
                    <FaArrowRight
                      className="absolute left-0 text-orange mt-1"
                      size={9}
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>

      <div className="border-t border-white/10">
        <div className="container-custom py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs font-body">
            © {new Date().getFullYear()} 2026 VEXARO Courier Solution Private
            Limited. All Rights Reserved.
          </p>
          <p className="text-white/40 text-xs font-body">
            Powered by Codentrixx Innovation Solutions Pvt. Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
}
