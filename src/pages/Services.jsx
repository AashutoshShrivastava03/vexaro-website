import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaTruck, FaBolt, FaClock, FaIndustry, FaWarehouse, FaShoppingCart, FaBoxes, FaUndo, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import PageHero from "../components/PageHero";
import { staggerContainer, staggerItem, fadeUp } from "../animations/variants";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { services } from "../data/index";
import { useSEO } from "../hooks/useSEO";

const iconMap = { FaTruck, FaBolt, FaClock, FaIndustry, FaWarehouse, FaShoppingCart, FaBoxes, FaUndo };

export default function Services() {
  useSEO({ title:"Services", description:"VEXARO services: Domestic Courier, Express Delivery, Same-Day, B2B Services, Warehousing, E-commerce Shipping across India." });
  const s1 = useScrollReveal(0.05);
  const s2 = useScrollReveal(0.05);

  return (
    <>
      <PageHero title="Our Services" subtitle="End-to-end courier solutions for every shipping need — from individual parcels to enterprise freight." breadcrumb="Services"/>

      <section className="section-padding bg-white flex-1" ref={s1.ref}>
        <div className="container-custom">
          <motion.div variants={staggerContainer} initial="hidden" animate={s1.isInView?"visible":"hidden"}
            className="grid md:grid-cols-2 gap-7">
            {services.map((service, idx) => {
              const Icon = iconMap[service.icon] || FaTruck;
              const isOrange = idx % 2 === 0;
              return (
                <motion.div key={service.id} variants={staggerItem}
                  className="border border-soft-border rounded-card p-7 bg-white card-hover hover:border-navy/25 group">
                  <div className="flex items-start gap-5">
                    <div className={`w-14 h-14 rounded-card flex items-center justify-center shrink-0 shadow-card transition-all duration-300 ${isOrange ? "bg-orange-50 border border-orange/20" : "bg-navy-50 border border-navy/20"}`}>
                      <Icon size={22} className={isOrange ? "text-orange" : "text-navy"}/>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold font-heading text-charcoal text-xl mb-2">{service.title}</h3>
                      <p className="text-graphite font-body text-sm leading-relaxed mb-4">{service.description}</p>
                      <ul className="space-y-2 mb-5">
                        {service.benefits.map((b, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm font-body text-graphite">
                            <FaCheckCircle size={12} className={i%2===0?"text-navy mt-0.5 shrink-0":"text-orange mt-0.5 shrink-0"}/>
                            {b}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center justify-between pt-4 border-t border-soft-border">
                        <div>
                          <div className="text-xs text-graphite/60 font-body uppercase tracking-wider mb-0.5">Delivery Time</div>
                          <div className={`font-semibold font-heading text-sm ${isOrange?"text-orange":"text-navy"}`}>{service.timeline}</div>
                        </div>
                        <Link to="/contact"
                          className={`flex items-center gap-1.5 px-4 py-2.5 text-white text-sm font-semibold font-heading rounded-btn hover:-translate-y-0.5 transition-all duration-200 ${isOrange?"gradient-orange shadow-orange-sm hover:shadow-orange":"gradient-navy shadow-navy-sm hover:shadow-navy"}`}>
                          Get a Quote <FaArrowRight size={11}/>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-light-blue border-t border-soft-border" ref={s2.ref}>
        <div className="container-custom text-center">
          <motion.div variants={fadeUp} initial="hidden" animate={s2.isInView?"visible":"hidden"}>
            <h2 className="text-3xl font-bold font-heading text-charcoal mb-3">Need a Custom Courier Solution?</h2>
            <p className="text-graphite font-body mb-7 max-w-lg mx-auto">Our enterprise team specialises in tailored courier contracts for high-volume businesses.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 gradient-navy text-white font-semibold font-heading rounded-btn shadow-navy hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
              Talk to Our Team <FaArrowRight size={14}/>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
