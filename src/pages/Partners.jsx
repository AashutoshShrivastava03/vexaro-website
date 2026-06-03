import { motion } from "framer-motion";
import {
  FaHandshake,
  FaArrowRight,
  FaCheckCircle,
  FaGlobe,
  FaTruck,
  FaShoppingCart,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import {
  staggerContainer,
  staggerItem,
  fadeUp,
  slideLeft,
  slideRight,
} from "../animations/variants";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useSEO } from "../hooks/useSEO";

const partners = [
  {
    name: "DHL",
    cat: "Courier Tech",
    desc: "Global logistics tech provider offering premium international express shipping integrated with VEXARO's network.",
    logo: "dhl.png",
  },
  {
    name: "Amazon Shipping",
    cat: "Courier Tech",
    desc: "Advanced tech-driven e-commerce fulfillment network providing reliable merchant delivery integrated with VEXARO's network.",
    logo: "amazon-shipping.png",
  },
  {
    name: "Aramex",
    cat: "Courier Tech",
    desc: "Global express distribution network offering cross-border e-commerce solutions integrated with VEXARO's network.",
    logo: "aramex.png",
  },
  {
    name: "Ekart",
    cat: "Courier Tech",
    desc: "India's largest automated supply chain and 4PL e-commerce fulfillment solution integrated with VEXARO's network.",
    logo: "ekart.png",
  },
  {
    name: "Xpressbees",
    cat: "Courier Tech",
    desc: "Logistics TechIndia's leading eCommerce shipping solution integrated with VEXARO's network.",
    logo: "xpressbees.png",
  },
  {
    name: "SkyNet",
    cat: "E-commerce",
    desc: "Seamless order sync between Shopify stores and VEXARO's fulfilment platform.",
    logo: "skynet.png",
  },
  {
    name: "FedEx",
    cat: "E-commerce",
    desc: "Plugin-ready integration for WooCommerce merchants across India.",
    logo: "fedex.png",
  },
  {
    name: "Ecom Express",
    cat: "Courier Partner",
    desc: "Indian domestic courier and express delivery company.",
    logo: "ecom-express.png",
  },
  {
    name: "LogoXpress",
    cat: "E-commerce",
    desc: "Trusted courier partner for last-mile delivery across seller network.",
    logo: "logoxpress.png",
  },
  {
    name: "Gati",
    cat: "E-Commerce",
    desc: "Powering deliveries for sellers across Tier 2 and Tier 3 cities.",
    logo: "gati.png",
  },
  {
    name: "Shree Maruti",
    cat: "Courier Service",
    desc: "Easily track your shipment with online courier tracking tool.",
    logo: "shree-maruti.png",
  },
];

const partnerTypes = [
  {
    icon: <FaTruck size={22} className="text-navy" />,
    title: "Courier Partners",
    text: "Last-mile delivery agents, fleet operators, and hub partners across 500+ cities.",
    color: "navy",
  },
  {
    icon: <FaShoppingCart size={22} className="text-orange" />,
    title: "E-commerce Platforms",
    text: "Shopify, WooCommerce, Magento and custom platform integrations via our open API.",
    color: "orange",
  },
  {
    icon: <FaGlobe size={22} className="text-navy" />,
    title: "Business Associates",
    text: "B2B clients, resellers, and franchise operators expanding our reach across India.",
    color: "navy",
  },
  {
    icon: <FaHandshake size={22} className="text-orange" />,
    title: "Technology Partners",
    text: "SaaS platforms, ERP systems, and WMS providers integrated into our ecosystem.",
    color: "orange",
  },
];

export default function Partners() {
  useSEO({
    title: "Partners",
    description:
      "VEXARO's partner ecosystem — courier, e-commerce, and technology partners across India.",
  });
  const s1 = useScrollReveal();
  const s2 = useScrollReveal();
  const s3 = useScrollReveal(0.05);

  return (
    <>
      <PageHero
        title="Our Partners"
        subtitle="Building India's most connected courier ecosystem — together with our trusted partners."
        breadcrumb="Partners"
      />

      {/* Partner types */}
      <section className="section-padding bg-white flex-1" ref={s1.ref}>
        <div className="container-custom">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={s1.isInView ? "visible" : "hidden"}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-charcoal mb-3">
              Partnership Categories
            </h2>
            <p className="text-graphite font-body max-w-xl mx-auto">
              VEXARO works with a diverse ecosystem of partners to deliver
              seamless courier services.
            </p>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={s1.isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16"
          >
            {partnerTypes.map((p, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="bg-white border border-soft-border rounded-card p-6 card-hover group text-center"
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm ${p.color === "orange" ? "bg-orange-50 border border-orange/15" : "bg-navy-50 border border-navy/15"}`}
                >
                  {p.icon}
                </div>
                <h3 className="font-bold font-heading text-charcoal mb-2">
                  {p.title}
                </h3>
                <p className="text-graphite text-sm font-body leading-relaxed">
                  {p.text}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Partner logos grid */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={s1.isInView ? "visible" : "hidden"}
            className="text-center mb-8"
          >
            <h3 className="text-2xl font-bold font-heading text-charcoal mb-2">
              Trusted By
            </h3>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={s1.isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 md:grid-cols-3 gap-5"
          >
            {partners.map((p, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="bg-white border border-soft-border rounded-card p-6 card-hover flex items-start gap-4"
              >
                <div
                  className={`w-13 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden`}
                >
                  <img
                    src={`/${p.logo}`}
                    alt={p.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="font-bold font-heading text-charcoal">
                    {p.name}
                  </div>
                  <div
                    className={`text-xs font-heading font-medium mb-1 ${i % 2 === 0 ? "text-navy" : "text-orange"}`}
                  >
                    {p.cat}
                  </div>
                  <p className="text-graphite text-xs font-body leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Become a partner */}
      <section
        className="section-padding bg-light-blue border-t border-soft-border"
        ref={s2.ref}
      >
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={slideLeft}
              initial="hidden"
              animate={s2.isInView ? "visible" : "hidden"}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-soft-border rounded-full mb-4 shadow-card">
                <span className="text-navy text-xs font-medium font-heading uppercase tracking-wider">
                  Join Us
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-charcoal mb-5">
                Become a<br />
                <span className="gradient-text-navy">VEXARO Partner</span>
              </h2>
              <p className="text-graphite font-body leading-relaxed mb-6">
                Whether you're a last-mile delivery agent, a fleet operator, an
                e-commerce business, or a technology company — there's a
                partnership model built for you at VEXARO.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Attractive revenue sharing model",
                  "Dedicated partner support team",
                  "Real-time dashboard and analytics",
                  "Co-branded marketing support",
                ].map((b, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-charcoal text-sm font-body"
                  >
                    <FaCheckCircle
                      className={i % 2 === 0 ? "text-navy" : "text-orange"}
                      size={14}
                    />
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 gradient-orange text-white font-semibold font-heading rounded-btn shadow-orange hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                Become a Partner <FaArrowRight size={14} />
              </Link>
            </motion.div>
            <motion.div
              variants={slideRight}
              initial="hidden"
              animate={s2.isInView ? "visible" : "hidden"}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { v: "500+", l: "Cities" },
                { v: "10K+", l: "Clients" },
                { v: "50K+", l: "Daily Shipments" },
                { v: "98.5%", l: "Success Rate" },
              ].map((s, i) => (
                <div
                  key={i}
                  className={`rounded-card p-6 text-center ${i % 2 === 0 ? "gradient-navy" : "gradient-orange"}`}
                >
                  <div className="text-3xl font-bold font-heading text-white mb-1">
                    {s.v}
                  </div>
                  <div className="text-white/70 text-sm font-body">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
