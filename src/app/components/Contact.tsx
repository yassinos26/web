import emailjs from "@emailjs/browser";
import React, { useRef, useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { Variants } from "framer-motion";
import { Phone, Mail, MapPin, Send,Clock, Globe, CheckCircle , Facebook, Instagram, Youtube, Linkedin, } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const contactItems = [
    {
      icon: Phone,
      label: t("phone"),
      value: "+216 28184654",
      sub: t("phoneSub"),
      color: "#F9A8D4",
      href: "tel:+21628184654",
    },
    {
      icon: Mail,
      label: t("email"),
      value: "louhichisirine50@gmail.com",
      sub: t("emailSub"),
      color: "#C4B5FD",
      href: "mailto:louhichisirine50@gmail.com",
    },
    {
      icon: MapPin,
      label: t("address"),
      value: "4031 Av. IBN EL Jazzar, Sousse",
      sub: t("addressSub"),
      color: "#86EFAC",
      href: "#",
    },
    {
      icon: Clock,
      label: t("hours"),
      value: t("hoursSub"),
      sub: "7:00 AM – 14:00 PM )",
      color: "#FDBA74",
      href: "#",
    },
    {
      icon: Globe,
      label: t("website"),
      value: "https://baby-hypothermia.onrender.com/",
      sub: t("websiteSub"),
      color: "#93C5FD",
      href: "https://baby-hypothermia.onrender.com/",
    },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formRef.current) return;

    try {
      await emailjs.sendForm(
        "service_71cefbz",   // 🔥 à remplacer
        "template_uo4okck",  // 🔥 à remplacer
        formRef.current,
        "gtqOb2kSMJyLpThIg"    // 🔥 à remplacer
      );

      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });

    } catch (err) {
      console.error(err);
      setError("Erreur lors de l'envoi du message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center mb-14"
        >
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{ background: "rgba(249,168,212,0.2)", color: "#BE185D" }}
          >
            {t("getInTouch")}
          </span>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, color: "#1e1b4b" }}>
            {t("contact")} {" "}
            <span
              style={{
                background: "linear-gradient(135deg, #EC4899, #A855F7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t("ourTeam")}
            </span>
          </h1>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm">
            {t("contactDescription")}
          </p>
        </motion.div>

        {/* Contact cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-14"
        >
          {contactItems.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-4 text-center shadow-sm border border-white hover:shadow-lg transition-all block"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ background: `${item.color}33` }}
              >
                <item.icon className="w-5 h-5" style={{ color: item.color }} />
              </div>
              <p className="text-xs font-semibold text-gray-500 mb-1">{item.label}</p>
              <p className="text-xs font-bold text-gray-800 leading-tight mb-1">{item.value}</p>
              <p className="text-xs text-gray-400">{item.sub}</p>
            </motion.a>
          ))}
        </motion.div>

        {/* Main grid: Form + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-white"
          >
            <h2 className="mb-6 text-gray-800" style={{ fontWeight: 800, fontSize: "1.25rem" }}>
              {t("sendMessage")}
            </h2>

            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-12 text-center"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "linear-gradient(135deg, #86EFAC, #34D399)" }}
                >
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-gray-700 mb-2" style={{ fontWeight: 700 }}>
                  {t("messageSent")}
                </h3>
                <p className="text-gray-500 text-sm">
                  {t("thankYou")}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="mt-6 px-5 py-2.5 rounded-full text-sm text-white font-medium"
                  style={{ background: "linear-gradient(135deg, #EC4899, #A855F7)" }}
                >
                  {t("sendAnother")}
                </button>
              </motion.div>
            ) : (
              <>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      {t("fullName")}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t("yourName")}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      {t("emailAddress")}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={t("yourEmail")}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 focus:bg-white transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    {t("subject")}
                  </label>
                  <select
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 focus:bg-white transition-all"
                  >
                    <option value="">{t("selectTopic")}</option>
                    <option>{t("generalInquiry")}</option>
                    <option>{t("educationalResources")}</option>
                    <option>{t("collaborationPartnership")}</option>
                    <option>{t("clinicalQuestion")}</option>
                    <option>{t("mediaPress")}</option>
                    <option>{t("joinTeam")}</option>
                    <option>{t("other")}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    {t("message")}
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder={t("tellUsHowWeCanHelp")}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 focus:bg-white transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 hover:shadow-xl disabled:opacity-70"
                  style={{ background: "linear-gradient(135deg, #EC4899, #A855F7)" }}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                      />
                      {t("sending")}
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> {t("send")}
                    </>
                  )}
                </button>
                </form>
              </>
            )}
          </motion.div>

          {/* Map + Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col gap-5"
          >
            {/* Google Maps Embed */}
            <div className="bg-white rounded-3xl shadow-sm border border-white overflow-hidden flex-1" style={{ minHeight: 300 }}>
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #F9A8D4, #C084FC)" }}
                  >
                    <MapPin className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-700">{t("ourLocation")}</p>
                    <p className="text-xs text-gray-400">4031 Av. IBN EL Jazzar, Sousse, Tunisia</p>
                  </div>
                </div>
              </div>
              <iframe
                title="Baby Hypothermia Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2556.665230256448!2d10.625151274644809!3d35.82957252181281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130275797d157f91%3A0x968b6d8b9b1b76cc!2sHospital%20F.%20Hached!5e1!3m2!1sen!2sus!4v1774028727472!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>

            {/* Social & Extra info */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-white">
              <h3 className="text-gray-700 mb-4 text-sm" style={{ fontWeight: 700 }}>
                {t("connectWithUs")}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "LinkedIn", href: "https://www.linkedin.com/in/sirine-louhichi-372270384/", color: "#0A66C2", bg: "#EBF5FB" },
                  { name: "Instagram", href: "https://www.instagram.com/sirine_louhichii/", color: "#ee6f8f", bg: "#FEF2F2" },
                  { name: "Facebook", href: "https://www.facebook.com/sirine.202512", color: "#0011f8e1", bg: "#EBF5FB" },
                  { name: "YouTube", href: "https://www.youtube.com/@SirineLouhichi-2026", color: "#FF0000", bg: "#FEF2F2" },
                ].map((social) => (
                  <button
                    key={social.name}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold border border-gray-100 hover:border-pink-200 hover:shadow-sm transition-all"
                    style={{ color: social.color, background: social.bg }}
                  >
                    {social.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Emergency info */}
            <div
              className="rounded-3xl p-5 border border-pink-100"
              style={{ background: "linear-gradient(135deg, rgba(249,168,212,0.1), rgba(192,132,252,0.1))" }}
            >
              <p className="text-xs font-bold text-pink-600 mb-1">⚠️ {t("medicalEmergency")}</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                {t("emergencyAdvice")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
