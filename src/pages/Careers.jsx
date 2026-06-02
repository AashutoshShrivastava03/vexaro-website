import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaClock,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import PageHero from "../components/PageHero";
import { fadeUp, staggerContainer, staggerItem } from "../animations/variants";
import { useScrollReveal } from "../hooks/useScrollReveal";

const openings = [
  {
    title: "Senior Backend Engineer",
    dept: "Technology",
    location: "Mumbai (Hybrid)",
    type: "Full-time",
    desc: "Build and scale our courier platform APIs, real-time tracking systems, and microservices infrastructure.",
  },
  {
    title: "Operations Executive",
    dept: "Operations",
    location: "Multiple Cities",
    type: "Full-time",
    desc: "Coordinate daily pickup/delivery schedules, partner agent management, and shipment exception handling.",
  },
  {
    title: "Business Development Manager",
    dept: "Sales",
    location: "Bangalore / Delhi",
    type: "Full-time",
    desc: "Identify and onboard enterprise and e-commerce clients, manage key account relationships.",
  },
  {
    title: "Product Manager — Tracking",
    dept: "Product",
    location: "Mumbai (Hybrid)",
    type: "Full-time",
    desc: "Own the shipment tracking product end-to-end — from customer experience to carrier integrations.",
  },
  {
    title: "Customer Success Associate",
    dept: "Support",
    location: "Remote (India)",
    type: "Full-time",
    desc: "Ensure business clients have an outstanding experience — from onboarding to daily operational support.",
  },
  {
    title: "Fleet Coordinator",
    dept: "Fleet",
    location: "Pune / Hyderabad",
    type: "Full-time",
    desc: "Manage last-mile delivery fleet, route optimisation, driver coordination, and performance tracking.",
  },
];

const perks = [
  "Competitive salaries benchmarked to market",
  "Flexible work arrangements (hybrid options)",
  "Health insurance for employee and family",
  "Fast-track career growth in a scaling startup",
  "ESOPs for senior hires",
  "Learning & development budget",
];

export default function Careers() {
  const s1 = useScrollReveal();
  const s2 = useScrollReveal(0.05);
  const [selected, setSelected] = useState(null);

  return (
    <>
      <PageHero
        title="Join VEXARO"
        subtitle="Build the future of Indian courier services. We're looking for driven individuals who want to make a real impact."
        breadcrumb="Careers"
      />

      <section className="section-padding bg-white flex-1" ref={s1.ref}>
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={s1.isInView ? "visible" : "hidden"}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-light-blue rounded-full mb-4 border border-soft-border">
                <span className="text-navy text-xs font-medium font-heading uppercase tracking-wider">
                  Life at VEXARO
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-charcoal mb-5">
                More than a job.
                <br />
                <span className="gradient-text">A mission.</span>
              </h2>
              <p className="text-graphite font-body leading-relaxed mb-5">
                At VEXARO, you're not just processing shipments — you're
                building the backbone of Indian commerce. Every engineer,
                operations manager, and customer success executive plays a
                direct role in shaping how goods move across the country.
              </p>
              <p className="text-graphite font-body leading-relaxed mb-6">
                We're a fast-moving team that values ownership, transparency,
                and impact. If you want to work somewhere your decisions matter
                from day one, VEXARO is the place.
              </p>
              <ul className="space-y-3">
                {perks.map((p, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-charcoal text-sm font-body"
                  >
                    <FaCheckCircle className="text-navy shrink-0" size={14} />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={s1.isInView ? "visible" : "hidden"}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { v: "50+", l: "Team Members" },
                { v: "3", l: "Office Locations" },
                { v: "4.7★", l: "Glassdoor Rating" },
                { v: "85%", l: "Employee Retention" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="bg-light-blue border border-soft-border rounded-card p-6 text-center card-hover"
                >
                  <div className="text-3xl font-bold font-heading gradient-text mb-1">
                    {s.v}
                  </div>
                  <div className="text-graphite text-sm font-body">{s.l}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section
        className="section-padding bg-cream border-y border-soft-border"
        ref={s2.ref}
      >
        <div className="container-custom">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={s2.isInView ? "visible" : "hidden"}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold font-heading text-charcoal mb-2">
              Open Positions
            </h2>
            <p className="text-graphite font-body">
              We're hiring across multiple functions. Find your fit.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={s2.isInView ? "visible" : "hidden"}
            className="space-y-4"
          >
            {openings.map((job, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className={`bg-white rounded-card p-6 border cursor-pointer transition-all duration-300 card-hover ${
                  selected === i
                    ? "border-navy shadow-orange-sm"
                    : "border-soft-border hover:border-navy/40"
                }`}
                onClick={() => setSelected(selected === i ? null : i)}
              >
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="font-bold font-heading text-charcoal text-lg">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                      {[
                        { icon: <FaBriefcase size={10} />, text: job.dept },
                        {
                          icon: <FaMapMarkerAlt size={10} />,
                          text: job.location,
                        },
                        { icon: <FaClock size={10} />, text: job.type },
                      ].map((tag, j) => (
                        <span
                          key={j}
                          className="flex items-center gap-1.5 text-graphite text-xs font-body"
                        >
                          <span className="text-navy">{tag.icon}</span>
                          {tag.text}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-5 py-2.5 gradient-orange text-white font-semibold font-heading text-sm rounded-btn shadow-orange-sm hover:shadow-orange transition-all duration-200">
                    Apply <FaArrowRight size={11} />
                  </button>
                </div>
                {selected === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 pt-4 border-t border-soft-border text-graphite text-sm font-body leading-relaxed bg-light-blue/40 px-4 py-3 rounded-lg"
                  >
                    {job.desc}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={s2.isInView ? "visible" : "hidden"}
            className="mt-8 text-center"
          >
            <p className="text-graphite font-body text-sm">
              Don't see the right role?{" "}
              <a
                href="mailto:careers@vexaro.in"
                className="text-navy font-semibold font-heading hover:underline"
              >
                Send your CV to careers@vexaro.in
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
