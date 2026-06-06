import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
  FaCheckCircle,
  FaIdCard,
  FaPhoneAlt,
} from "react-icons/fa";
import PageHero from "../components/PageHero";
import { fadeUp, slideLeft, slideRight } from "../animations/variants";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useSEO } from "../hooks/useSEO";

export default function Contact() {
  useSEO({
    title: "Contact Us",
    description: "Contact VEXARO in Vijay Nagar, Indore, Madhya Pradesh.",
  });
  const s1 = useScrollReveal();
  const s2 = useScrollReveal();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    botField: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email is required";
    if (
      !form.phone.trim() ||
      !/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ""))
    )
      e.phone = "Valid 10-digit mobile required";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim() || form.message.length < 20)
      e.message = "Message must be at least 20 characters";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setErrors({});

    const endpoint =
      import.meta.env.VITE_CONTACT_FORM_ENDPOINT ||
      "/.netlify/functions/contact";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          subject: form.subject,
          message: form.message,
          botField: form.botField,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(
          payload?.error || `Contact API returned ${response.status}`,
        );
      }

      setSubmitted(true);
    } catch (err) {
      setErrors({
        form:
          err?.message ||
          "We could not send your message right now. Please try again in a moment or email info@vexarocouriersolutions.com directly.",
      });
    } finally {
      setLoading(false);
    }
  };

  const field = (name, label, type = "text", placeholder = "") => (
    <div>
      <label className="block text-sm font-semibold font-heading text-charcoal mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={form[name]}
        onChange={(e) => {
          setForm({ ...form, [name]: e.target.value });
          setErrors({ ...errors, [name]: "" });
        }}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border rounded-btn font-body text-sm focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/15 transition-all bg-white ${errors[name] ? "border-red-400 bg-red-50" : "border-soft-border"}`}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs font-body mt-1">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Get in touch with our team for quotes, support, or business partnerships."
        breadcrumb="Contact"
      />

      <section className="section-padding bg-white flex-1" ref={s1.ref}>
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              variants={slideLeft}
              initial="hidden"
              animate={s1.isInView ? "visible" : "hidden"}
            >
              <h2 className="text-2xl font-bold font-heading text-charcoal mb-6">
                Send us a Message
              </h2>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-card p-8 text-center"
                >
                  <FaCheckCircle
                    size={38}
                    className="text-green-500 mx-auto mb-4"
                  />
                  <h3 className="font-bold font-heading text-charcoal text-xl mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-graphite font-body text-sm">
                    Thank you for reaching out. Our team will respond within 2
                    business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        email: "",
                        phone: "",
                        company: "",
                        subject: "",
                        message: "",
                        botField: "",
                      });
                    }}
                    className="mt-5 text-navy font-semibold font-heading text-sm hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="botField"
                    value={form.botField}
                    onChange={(e) =>
                      setForm({ ...form, botField: e.target.value })
                    }
                    autoComplete="off"
                    tabIndex={-1}
                    style={{
                      position: "absolute",
                      left: "-9999px",
                      top: "-9999px",
                    }}
                  />
                  <div className="grid sm:grid-cols-2 gap-4">
                    {field("name", "Full Name", "text", "Your full name")}
                    {field(
                      "email",
                      "Email Address",
                      "email",
                      "you@company.com",
                    )}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {field(
                      "phone",
                      "Phone Number",
                      "tel",
                      "10-digit mobile number",
                    )}
                    {field("subject", "Subject", "text", "How can we help?")}
                  </div>
                  <div>
                    {field(
                      "company",
                      "Company Name",
                      "text",
                      "Company (optional)",
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold font-heading text-charcoal mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => {
                        setForm({ ...form, message: e.target.value });
                        setErrors({ ...errors, message: "" });
                      }}
                      placeholder="Tell us about your courier requirements..."
                      className={`w-full px-4 py-3 border rounded-btn font-body text-sm focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/15 transition-all resize-none bg-white ${errors.message ? "border-red-400 bg-red-50" : "border-soft-border"}`}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs font-body mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>
                  {errors.form && (
                    <div className="rounded-btn border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-body">
                      {errors.form}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 gradient-navy text-white font-semibold font-heading rounded-btn shadow-navy hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Info */}
            <motion.div
              variants={slideRight}
              initial="hidden"
              animate={s1.isInView ? "visible" : "hidden"}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold font-heading text-charcoal mb-4">
                Contact Information
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: <FaMapMarkerAlt size={16} className="text-orange" />,
                    label: "Registered Office",
                    full: true,
                    content: (
                      <span className="text-graphite text-sm font-body leading-relaxed">
                        Flat 1113, 1st Floor, Chikitsak Nagar,
                        <br />
                        Vijay Nagar, Indore, MP — 452010
                      </span>
                    ),
                  },
                  {
                    icon: null,
                    label: "",
                    full: true,
                    content: (
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-white border border-soft-border flex items-center justify-center shadow-card">
                            <FaEnvelope size={16} className="text-orange" />
                          </div>

                          <p className="text-graphite text-sm font-body">
                            <span className="font-semibold text-charcoal">
                              Email:
                            </span>{" "}
                            info@vexarocouriersolutions.com
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-white border border-soft-border flex items-center justify-center shadow-card">
                            <FaPhoneAlt size={15} className="text-orange" />
                          </div>

                          <p className="text-graphite text-sm font-body">
                            <span className="font-semibold text-charcoal">
                              Phone:
                            </span>{" "}
                            +91-9183888181
                          </p>
                        </div>
                      </div>
                    ),
                  },
                  {
                    icon: <FaIdCard size={15} className="text-orange" />,
                    label: "About",
                    full: true,
                    content: (
                      <div className="text-graphite text-sm font-body space-y-0.5 leading-relaxed">
                        <div>Operating across 500+ cities in India</div>
                        <div>Customer support available 24/7</div>
                      </div>
                    ),
                  },
                ].map((c, i) => (
                  <div
                    key={i}
                    className={`flex gap-4 p-4 bg-light-blue border border-soft-border rounded-card ${c.full ? "sm:col-span-2" : ""}`}
                  >
                    {c.icon ? (
                      <div className="w-10 h-10 rounded-lg bg-white border border-soft-border flex items-center justify-center flex-shrink-0 shadow-card">
                        {c.icon}
                      </div>
                    ) : null}
                    <div>{c.content}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
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
                    className="flex items-center gap-2 px-4 py-2 border border-soft-border rounded-btn text-sm text-graphite hover:border-navy hover:text-navy transition-all duration-200 bg-light-blue/50"
                  >
                    {s.icon} {s.label}
                  </a>
                ))}
              </div>
              <div className="rounded-card overflow-hidden border border-soft-border h-48">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.6!2d75.8850!3d22.7534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd0b60e7e67f%3A0x39c3a74a4d30c97c!2sVijay%20Nagar%2C%20Indore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000001"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="VEXARO Office"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company info strip */}
      <section
        className="py-8 bg-light-blue border-t border-soft-border"
        ref={s2.ref}
      >
        <div className="container-custom">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={s2.isInView ? "visible" : "hidden"}
            className="flex flex-wrap gap-4 justify-center"
          >
            {[
              ["500+ Cities", "Coverage"],
              ["24/7 Support", "Support"],
              ["Trusted Partners", "Partners"],
              ["Technology-First", "Edge"],
            ].map(([val, lbl], i) => (
              <div
                key={lbl}
                className={`bg-white border rounded-card px-5 py-3 min-w-[140px] text-center ${i % 2 === 0 ? "border-navy/20" : "border-orange/20"}`}
              >
                <div
                  className={`font-semibold text-sm font-heading ${i % 2 === 0 ? "text-navy" : "text-orange"}`}
                >
                  {val}
                </div>
                <div className="text-graphite/60 text-[11px] mt-0.5">{lbl}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
