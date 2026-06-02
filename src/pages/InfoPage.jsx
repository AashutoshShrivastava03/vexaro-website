import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCheckCircle,
  FaShieldAlt,
  FaTruck,
} from "react-icons/fa";
import PageHero from "../components/PageHero";
import { fadeUp, staggerContainer, staggerItem } from "../animations/variants";
import { useSEO } from "../hooks/useSEO";

const pageContent = {
  terms: {
    title: "Terms & Conditions",
    breadcrumb: "Terms & Conditions",
    subtitle:
      "Clear service terms for using VEXARO courier and business shipping solutions.",
    seoTitle: "Terms & Conditions",
    items: [
      "Shipments must comply with applicable laws, courier restrictions, and declared package details.",
      "Delivery timelines depend on service type, destination coverage, weather, public restrictions, and operational conditions.",
      "Claims, refunds, insurance, and liability are handled according to declared value, service level, and written confirmation.",
      "Customers are responsible for accurate sender, receiver, invoice, and shipment information at booking.",
    ],
  },
  privacy: {
    title: "Privacy Policy",
    breadcrumb: "Privacy Policy",
    subtitle:
      "How VEXARO handles customer, shipment, and business enquiry information responsibly.",
    seoTitle: "Privacy Policy",
    items: [
      "We collect contact, shipment, and enquiry details only to provide courier services and support.",
      "Information may be shared with delivery partners only when required to complete pickup, transit, or delivery.",
      "We use reasonable technical and operational safeguards to protect submitted business and customer data.",
      "Customers can request corrections or support by contacting vexarocouriersolution@gmail.com.",
    ],
  },
  resources: {
    title: "Resources",
    breadcrumb: "Resources",
    subtitle:
      "Useful service guidance for businesses planning shipping, fulfilment, and delivery operations.",
    seoTitle: "Resources",
    items: [
      "Choose Express Delivery for time-sensitive metro and business corridor shipments.",
      "Use B2B Services for scheduled bulk movement, SLA-based operations, and account-managed dispatches.",
      "Use Warehousing Solutions when inventory storage, packing, and fulfilment need to move together.",
      "Use Returns Management to simplify returns, pickup coordination, and seller-side visibility.",
    ],
  },
};

export default function InfoPage({ type }) {
  const content = pageContent[type] || pageContent.resources;
  useSEO({
    title: content.seoTitle,
    description: content.subtitle,
  });

  return (
    <>
      <PageHero
        title={content.title}
        subtitle={content.subtitle}
        breadcrumb={content.breadcrumb}
      />
      <section className="section-padding bg-white flex-1">
        <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-[1fr_340px] gap-8 items-start"
          >
            <motion.div
              variants={staggerItem}
              className="rounded-card border border-soft-border bg-light-blue p-6 md:p-8"
            >
              <div className="grid gap-4">
                {content.items.map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-card border border-white/80 bg-white p-4 shadow-card"
                  >
                    <FaCheckCircle
                      className={
                        index % 2 === 0
                          ? "text-navy mt-0.5"
                          : "text-orange mt-0.5"
                      }
                      size={15}
                    />
                    <p className="text-sm leading-relaxed text-graphite font-body">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.aside
              variants={fadeUp}
              className="rounded-card border border-soft-border bg-white p-6 shadow-card"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl gradient-navy text-white">
                {type === "privacy" ? <FaShieldAlt /> : <FaTruck />}
              </div>
              <h2 className="font-heading text-xl font-bold text-charcoal mb-2">
                Need help?
              </h2>
              <p className="text-sm leading-relaxed text-graphite font-body mb-5">
                Our team can help you choose the right VEXARO service, quote, or
                shipping workflow.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-navy font-semibold font-heading hover:gap-3 transition-all duration-200 text-sm"
              >
                Reach Us <FaArrowRight size={12} />
              </Link>
            </motion.aside>
          </motion.div>
        </div>
      </section>
    </>
  );
}
