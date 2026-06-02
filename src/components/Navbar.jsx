import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Pricing", path: "/pricing" },
  { label: "Partners", path: "/partners" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => setMenuOpen(false), [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled ? "glass-panel" : "bg-transparent"
        }`}
      >
        <div className="container-custom flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="/new-logo.png"
              alt="VEXARO Courier"
              className="h-10 md:h-12 w-auto object-contain"
              style={{ maxWidth: "220px" }}
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/80 shadow-[0_4px_16px_rgba(26,58,143,0.04)]">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-[15px] font-semibold font-heading rounded-full transition-all duration-300 relative ${
                  location.pathname === link.path
                    ? "text-navy"
                    : "text-charcoal hover:text-navy"
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-bar"
                    className="absolute inset-0 bg-white shadow-sm rounded-full -z-10"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            <Link
              to="/contact"
              className="text-[15px] font-bold text-charcoal hover:text-orange transition-colors font-heading"
            >
              Try for Free
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 bg-charcoal text-white text-[15px] font-bold rounded-full shadow-lg hover:shadow-xl hover:bg-navy transition-all duration-300 font-heading"
            >
              Get a Quote
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-charcoal hover:text-orange transition-colors bg-white/60 backdrop-blur-md rounded-full border border-white/80"
          >
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-white flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-soft-border/50">
              <img
                src="/new-logo.png"
                alt="VEXARO"
                className="h-9 w-auto object-contain"
                style={{ maxWidth: "160px" }}
              />
              <button
                onClick={() => setMenuOpen(false)}
                className="text-charcoal hover:text-navy p-2 bg-gray-50 rounded-full"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center px-8 gap-2 bg-cream/50">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`block py-4 text-2xl font-bold font-heading transition-colors ${
                      location.pathname === link.path
                        ? "text-navy"
                        : "text-charcoal hover:text-navy"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="px-8 pb-12 pt-6 bg-cream/50">
              <Link
                to="/contact"
                className="block text-center py-4 bg-charcoal text-white font-bold text-lg rounded-full shadow-lg font-heading hover:bg-navy transition-colors"
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
