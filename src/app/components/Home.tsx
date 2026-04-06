import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { NavLink } from "react-router";
import { Variants } from "framer-motion";
import { Heart, Thermometer, Baby, BookOpen, ShieldCheck, AlertTriangle, ArrowRight, Stethoscope } from "lucide-react";

const heroImage = "/assets/images/affiche1.jpg";
const warmthImage = "/assets/images/affiche2.jpg";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export function Home() {
  const { t } = useTranslation();

  const stats = [
    { value: "25%", label: t("statHypothermiaDeaths"), icon: Thermometer },
    { value: "36.5°", label: t("statMinSafeTemp"), icon: ShieldCheck },
    { value: "2h", label: t("statCriticalWindow"), icon: AlertTriangle },
    { value: "90%", label: t("statPreventableCases"), icon: Heart },
  ];

  const hypothermiaPreventionList = [
    t("skinToSkinCare"),
    t("delayedBathing"),
    t("warmDeliveryRooms"),
    t("exclusiveBreastfeeding"),
  ];

  const puericultureTopics = [
    {
      icon: Thermometer,
      title: t("temperatureRegulation"),
      color: "#F9A8D4",
      description: t("temperatureRegulationDesc"),
    },
    {
      icon: ShieldCheck,
      title: t("preventionStrategies"),
      color: "#C084FC",
      description: t("preventionStrategiesDesc"),
    },
    {
      icon: Baby,
      title: t("puericultureEssentials"),
      color: "#86EFAC",
      description: t("puericultureEssentialsDesc"),
    },
    {
      icon: Stethoscope,
      title: t("clinicalRecognition"),
      color: "#93C5FD",
      description: t("clinicalRecognitionDesc"),
    },
    {
      icon: BookOpen,
      title: t("familyEducation"),
      color: "#FCA5A5",
      description: t("familyEducationDesc"),
    },
    {
      icon: Heart,
      title: t("communityOutreach"),
      color: "#FDBA74",
      description: t("communityOutreachDesc"),
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        {/* Background blobs */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle, #F9A8D4, transparent)" }}
          />
          <div
            className="absolute top-1/2 -right-40 w-80 h-80 rounded-full opacity-25 blur-3xl"
            style={{ background: "radial-gradient(circle, #C084FC, transparent)" }}
          />
          <div
            className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, #93C5FD, transparent)" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="text-center lg:text-left">
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0}
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6"
              style={{ background: "rgba(249,168,212,0.2)", color: "#BE185D" }}
            >
              <Baby className="w-4 h-4" />
              {t("neonatalEducationInitiative")}
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fadeUp}
              className="mb-4"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 800, lineHeight: 1.15 }}
            >
              <span style={{ color: "#1e1b4b" }}>{t("heroTitle1")}</span>{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #EC4899, #A855F7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t("heroTitle2")}
            </span>
            <br />
            <span style={{ color: "#1e1b4b" }}>{t("heroSubline")}</span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              custom={2}
              variants={fadeUp}
              className="text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0"
              style={{ fontSize: "1.1rem", lineHeight: 1.75 }}
            >
              {t("heroText")}
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              custom={3}
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <NavLink
                to="/guide"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-white font-medium transition-all hover:opacity-90 hover:shadow-xl hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #EC4899, #A855F7)" }}
              >
                {t("exploreResources")} <ArrowRight className="w-4 h-4" />
              </NavLink>
              <NavLink
                to="/videos"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-medium border-2 border-pink-200 text-pink-600 hover:border-pink-400 hover:bg-pink-50 transition-all"
              >
                {t("watchVideos")}
              </NavLink>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative"
          >
            <div
              className="absolute inset-0 rounded-3xl blur-2xl opacity-40 scale-105"
              style={{ background: "linear-gradient(135deg, #F9A8D4, #C084FC)" }}
            />
            <img
              src={heroImage}
              alt="Neonatal care"
              className="relative w-full rounded-3xl object-cover shadow-2xl"
              style={{ aspectRatio: "4/3", maxHeight: "500px" }}
            />
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #FDE68A, #F9A8D4)" }}
              >
                <Heart className="w-5 h-5 text-pink-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400">{t("preventableDeaths")}</p>
                <p className="text-sm font-bold text-gray-700">{t("ninetyPercentWithCare")}</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #BAE6FD, #C084FC)" }}
              >
                <Thermometer className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400">{t("safeTemperature")}</p>
                <p className="text-sm font-bold text-gray-700">{t("safeTempRange")}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-pink-50 hover:shadow-md transition-shadow"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: "linear-gradient(135deg, #FDF2F8, #F3E8FF)" }}
                >
                  <stat.icon className="w-6 h-6" style={{ color: "#A855F7" }} />
                </div>
                <p className="text-2xl font-bold" style={{ color: "#EC4899" }}>
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 mt-1 leading-tight">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Hypothermia */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="relative"
          >
            <img
              src={warmthImage}
              alt="Baby warmth"
              className="w-full rounded-3xl object-cover shadow-xl"
              style={{ aspectRatio: "4/3" }}
            />
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: "linear-gradient(135deg, rgba(249,168,212,0.15), rgba(192,132,252,0.15))",
              }}
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ background: "rgba(249,168,212,0.2)", color: "#BE185D" }}
            >
              {t("understandingTheRisk")}
            </span>
            <h2
              className="mb-5"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, color: "#1e1b4b", lineHeight: 1.25 }}
            >
              {t("whatIsNeonatalHypothermia")}
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              {t("hypothermiaDefinition")}
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              {t("newbornsVulnerable")}
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t("whoEstimates")}
            </p>

            <div className="flex flex-col gap-3">
              {hypothermiaPreventionList.map(
                (item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div
                      className="mt-0.5 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #F9A8D4, #C084FC)" }}
                    >
                      <Heart className="w-2.5 h-2.5 text-white" />
                    </div>
                    <p className="text-sm text-gray-600">{item}</p>
                  </div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Puericulture Topics */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ background: "rgba(192,132,252,0.15)", color: "#7C3AED" }}
            >
              {t("educationalContent")}
            </span>
            <h2
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, color: "#1e1b4b" }}
            >
              {t("puericultureNeonatalCare")}
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              {t("educationalTopicsDescription")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {puericultureTopics.map((topic, i) => (
              <motion.div
                key={topic.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.5}
                variants={fadeUp}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-white/80 hover:shadow-lg transition-all cursor-pointer"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: `${topic.color}33` }}
                >
                  <topic.icon className="w-6 h-6" style={{ color: topic.color.replace("33", "") }} />
                </div>
                <h3 className="mb-2 text-gray-800" style={{ fontWeight: 700 }}>
                  {topic.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{topic.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl overflow-hidden p-12 text-center text-white"
        style={{ background: "linear-gradient(135deg, #EC4899, #A855F7, #6366F1)" }}
      >
        <Baby className="w-14 h-14 mx-auto mb-4 opacity-90" />
        <h2 className="mb-3" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800 }}>
          {t("joinOurMission")}
        </h2>
        <p className="opacity-90 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
          {t("ctaDescription")}
        </p>
        <a
          href="/guide"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold transition-all hover:opacity-90 hover:shadow-xl"
          style={{ background: "linear-gradient(135deg, #EC4899, #A855F7)" }}
        >
          {t("accessFreeGuides")}
        </a>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold transition-all hover:opacity-90 hover:shadow-xl"
          style={{ background: "linear-gradient(135deg, #EC4899, #A855F7)" }}
        >
          {t("contactOurTeam")}
        </a>
      </motion.div>
    </div>
  );
}
