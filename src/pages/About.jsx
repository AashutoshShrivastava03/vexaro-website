import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaArrowRight, FaBullseye, FaEye, FaHeart, FaTrophy } from "react-icons/fa";
import PageHero from "../components/PageHero";
import { staggerContainer, staggerItem, fadeUp, slideLeft, slideRight } from "../animations/variants";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useSEO } from "../hooks/useSEO";

export default function About() {
  useSEO({ title:"About Us", description:"Learn about VEXARO Courier Solution, headquartered in Indore, MP. India's modern courier partner." });
  const s1=useScrollReveal(), s2=useScrollReveal(), s3=useScrollReveal(), s4=useScrollReveal(), s5=useScrollReveal();

  return (
    <>
      <PageHero title="About VEXARO" subtitle="The story behind India's modern courier company — built on trust, powered by technology." breadcrumb="About Us"/>

      {/* Story */}
      <section className="section-padding bg-white flex-1" ref={s1.ref}>
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={slideLeft} initial="hidden" animate={s1.isInView?"visible":"hidden"}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-navy-50 border border-navy/20 rounded-full mb-4">
                <span className="text-navy text-xs font-medium font-heading uppercase tracking-wider">Our Story</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-charcoal mb-5 leading-tight">
                Born in Indore.<br/><span className="gradient-text-navy">Built for India.</span>
              </h2>
              <p className="text-graphite font-body leading-relaxed mb-4">
                VEXARO Courier Solution was founded in Vijay Nagar, Indore, Madhya Pradesh — with a singular vision: to create a courier company that combines reliability with the speed of modern technology.
              </p>
              <p className="text-graphite font-body leading-relaxed mb-6">
                Founded by <strong>Sonu Tiwari</strong> and <strong>Nikhil Pratap Singh</strong>, VEXARO was built from the ground up with a technology-first approach, targeting underserved regions and rapidly expanding nationwide.
              </p>
              <ul className="space-y-3">
                {["Headquartered in Vijay Nagar, Indore, MP","500+ Cities across India","50,000+ daily shipments","10,000+ trusted clients"].map((item,i)=>(
                  <li key={i} className="flex items-center gap-3 text-charcoal text-sm font-body">
                    <FaCheckCircle className={i%2===0?"text-navy":"text-orange"} size={14}/>{item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={slideRight} initial="hidden" animate={s1.isInView?"visible":"hidden"}>
              <div className="relative">
                <div className="bg-light-blue border border-soft-border rounded-card p-8 relative z-10">
                  <div className="text-6xl font-bold font-heading gradient-text-navy mb-2">2026</div>
                  <div className="text-graphite text-sm font-body mb-1">Year Founded</div>
                  <div className="text-graphite/60 text-xs font-body mb-6">Vijay Nagar, Indore, Madhya Pradesh</div>
                  <div className="grid grid-cols-2 gap-4">
                    {[{v:"50K+",l:"Daily Shipments"},{v:"500+",l:"Cities Served"},{v:"10K+",l:"Business Clients"},{v:"98.5%",l:"Success Rate"}].map((s,i)=>(
                      <div key={i} className={`rounded-xl p-4 text-center text-white ${i%2===0?"gradient-navy":"gradient-orange"}`}>
                        <div className="text-2xl font-bold font-heading">{s.v}</div>
                        <div className="text-white/70 text-xs font-body">{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-navy/15 rounded-card"/>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="section-padding bg-cream border-y border-soft-border" ref={s2.ref}>
        <div className="container-custom">
          <motion.div variants={fadeUp} initial="hidden" animate={s2.isInView?"visible":"hidden"} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-charcoal mb-3">Our Foundation</h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" animate={s2.isInView?"visible":"hidden"}
            className="grid md:grid-cols-3 gap-6">
            {[
              {icon:<FaBullseye size={22} className="text-orange"/>, title:"Our Mission", text:"To make courier services effortless for every Indian business — from first-time entrepreneurs to established enterprises — through technology, reliability, and genuine care.", bg:"bg-orange-50 border-orange/20"},
              {icon:<FaEye size={22} className="text-navy"/>,       title:"Our Vision",  text:"To become India's most trusted courier technology company — powering commerce across every city, town, and village with speed and transparency.",              bg:"bg-navy-50 border-navy/20"},
              {icon:<FaHeart size={22} className="text-orange"/>,   title:"Our Values",  text:"Trust over transactions. Speed with safety. Technology with humanity. Every shipment tells a story — and we treat each one with the respect it deserves.",     bg:"bg-orange-50 border-orange/20"},
            ].map((card,i)=>(
              <motion.div key={i} variants={staggerItem}
                className={`p-8 rounded-card border card-hover ${card.bg}`}>
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-5 shadow-card">{card.icon}</div>
                <h3 className="font-bold font-heading text-charcoal text-xl mb-3">{card.title}</h3>
                <p className="text-graphite font-body text-sm leading-relaxed">{card.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Strengths */}
      <section className="section-padding bg-white" ref={s3.ref}>
        <div className="container-custom">
          <motion.div variants={fadeUp} initial="hidden" animate={s3.isInView?"visible":"hidden"} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 border border-orange/20 rounded-full mb-4">
              <span className="text-orange text-xs font-medium font-heading uppercase tracking-wider">Our Strengths</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-charcoal mb-3">What Makes Us Strong</h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" animate={s3.isInView?"visible":"hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {icon:"🚀",title:"Technology-Driven",text:"API-ready infrastructure, real-time dashboards, and smart routing algorithms power our entire network."},
              {icon:"🗺️",title:"Deep Regional Reach",text:"Unlike metro-only couriers, VEXARO is built for mid-India — Indore, Bhopal, Raipur, Nagpur and beyond."},
              {icon:"⚡",title:"Speed at Scale",text:"50,000+ daily shipments processed with 98.5% on-time delivery through optimised last-mile networks."},
              {icon:"🔒",title:"End-to-End Security",text:"Every shipment is tracked, handled with care, and available for insurance — zero compromise on safety."},
              {icon:"🤝",title:"Client-First Culture",text:"Every client gets a dedicated account manager. We measure success by your satisfaction, not just deliveries."},
              {icon:"📊",title:"Data & Analytics",text:"Live shipment analytics, demand forecasting, and performance reports empower better business decisions."},
            ].map((s,i)=>(
              <motion.div key={i} variants={staggerItem}
                className="bg-white border border-soft-border rounded-card p-6 card-hover group hover:border-navy/30">
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="font-bold font-heading text-charcoal mb-2">{s.title}</h3>
                <p className="text-graphite text-sm font-body leading-relaxed">{s.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Leadership Quote */}
      <section className="section-padding bg-light-blue" ref={s4.ref}>
        <div className="container-custom max-w-3xl text-center">
          <motion.div variants={fadeUp} initial="hidden" animate={s4.isInView?"visible":"hidden"}>
            <div className="w-16 h-16 rounded-full gradient-duo flex items-center justify-center mx-auto mb-6 shadow-navy">
              <span className="text-white font-bold text-xl font-heading">V</span>
            </div>
            <blockquote className="text-2xl md:text-3xl font-heading font-light text-charcoal leading-relaxed italic mb-6">
              "We built VEXARO not just to move packages — but to move businesses forward. Every delivery is a promise, and every promise is a commitment we take personally."
            </blockquote>
            <div className="w-12 h-1 gradient-orange rounded-full mx-auto mb-4"/>
            <div className="font-semibold font-heading text-charcoal">Sonu Tiwari & Nikhil Pratap Singh</div>
            <div className="text-graphite text-sm font-body">Co-Founders, VEXARO Courier Solution</div>
          </motion.div>
        </div>
      </section>

      {/* Network */}
      <section className="section-padding bg-white border-t border-soft-border" ref={s5.ref}>
        <div className="container-custom text-center">
          <motion.div variants={fadeUp} initial="hidden" animate={s5.isInView?"visible":"hidden"} className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-charcoal mb-3">Connecting Every Corner of India</h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" animate={s5.isInView?"visible":"hidden"}
            className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
            {[{v:"500+",l:"Cities",s:"Pan-India coverage"},{v:"800+",l:"Pin Codes",s:"Last-mile reach"},{v:"20+",l:"Hubs",s:"Fulfilment centres"},{v:"5000+",l:"Agents",s:"Last-mile partners"}].map((s,i)=>(
              <motion.div key={i} variants={staggerItem}
                className={`rounded-card p-6 text-center text-white ${i%2===0?"gradient-navy":"gradient-orange"}`}>
                <div className="text-3xl font-bold font-heading mb-1">{s.v}</div>
                <div className="text-white font-semibold font-heading text-sm mb-1">{s.l}</div>
                <div className="text-white/60 text-xs font-body">{s.s}</div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" animate={s5.isInView?"visible":"hidden"}>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 gradient-orange text-white font-semibold font-heading rounded-btn shadow-orange hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
              Partner With Us <FaArrowRight size={14}/>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
