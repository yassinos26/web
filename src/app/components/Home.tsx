import { motion } from "motion/react";
import { Heart, Thermometer, Baby, BookOpen, ShieldCheck, AlertTriangle, ArrowRight, Stethoscope } from "lucide-react";

const heroImage = "public/assets/images/affiche1.jpg";
const warmthImage = "public/assets/images/affiche2.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" },
  }),
};

const stats = [
  { value: "25%", label: "Of neonatal deaths linked to hypothermia", icon: Thermometer },
  { value: "36.5°", label: "Minimum safe body temperature (°C)", icon: ShieldCheck },
  { value: "2h", label: "Critical window after birth", icon: AlertTriangle },
  { value: "90%", label: "Cases preventable with proper care", icon: Heart },
];

const puericultureTopics = [
  {
    icon: Thermometer,
    title: "Temperature Regulation",
    color: "#F9A8D4",
    description:
      "Newborns cannot regulate their own body temperature. Learn the physiological basis of thermoregulation in neonates and how to maintain a thermoneutral environment.",
  },
  {
    icon: ShieldCheck,
    title: "Prevention Strategies",
    color: "#C084FC",
    description:
      "From kangaroo care to incubator management, discover evidence-based interventions that protect newborns from dangerous heat loss in the first hours of life.",
  },
  {
    icon: Baby,
    title: "Puericulture Essentials",
    color: "#86EFAC",
    description:
      "Comprehensive guidance on newborn care: feeding, bathing, swaddling, and monitoring vital signs — everything families and healthcare workers need to know.",
  },
  {
    icon: Stethoscope,
    title: "Clinical Recognition",
    color: "#93C5FD",
    description:
      "Identify the early warning signs of neonatal hypothermia — cold skin, poor feeding, lethargy, and bradycardia — and understand the appropriate clinical response.",
  },
  {
    icon: BookOpen,
    title: "Family Education",
    color: "#FCA5A5",
    description:
      "Empower parents and caregivers with practical knowledge about keeping newborns warm at home, recognizing danger signs, and seeking timely medical attention.",
  },
  {
    icon: Heart,
    title: "Community Outreach",
    color: "#FDBA74",
    description:
      "How community health programs can reduce neonatal mortality through targeted education campaigns, home visits, and culturally sensitive healthcare communication.",
  },
];

export function Home() {
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
              Neonatal Education Initiative
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fadeUp}
              className="mb-4"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 800, lineHeight: 1.15 }}
            >
              <span style={{ color: "#1e1b4b" }}>Protecting</span>{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #EC4899, #A855F7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Every Newborn
              </span>
              <br />
              <span style={{ color: "#1e1b4b" }}>from Hypothermia</span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              custom={2}
              variants={fadeUp}
              className="text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0"
              style={{ fontSize: "1.1rem", lineHeight: 1.75 }}
            >
              Neonatal hypothermia is a leading — and largely preventable — cause of newborn
              deaths worldwide. Our mission is to educate families, nurses, and healthcare
              professionals about puericulture and neonatal thermoregulation.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              custom={3}
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="/guide"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-white font-medium transition-all hover:opacity-90 hover:shadow-xl hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #EC4899, #A855F7)" }}
              >
                Explore Resources <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/videos"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-medium border-2 border-pink-200 text-pink-600 hover:border-pink-400 hover:bg-pink-50 transition-all"
              >
                Watch Videos
              </a>
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
                <p className="text-xs text-gray-400">Preventable Deaths</p>
                <p className="text-sm font-bold text-gray-700">90% with proper care</p>
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
                <p className="text-xs text-gray-400">Safe Temperature</p>
                <p className="text-sm font-bold text-gray-700">36.5–37.5 °C</p>
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
              Understanding the Risk
            </span>
            <h2
              className="mb-5"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, color: "#1e1b4b", lineHeight: 1.25 }}
            >
              What is Neonatal Hypothermia?
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Neonatal hypothermia is defined as a core body temperature below{" "}
              <strong>36.5°C (97.7°F)</strong> in a newborn. It is classified into mild
              (36–36.4°C), moderate (32–35.9°C), and severe (&lt;32°C) categories.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Newborns — especially premature or low-birthweight infants — are highly vulnerable
              because their thermoregulatory systems are immature. They lose heat rapidly through
              evaporation, conduction, convection, and radiation.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              The World Health Organization estimates that hypothermia contributes to{" "}
              <strong>25–30% of neonatal deaths</strong> globally, particularly in low-resource
              settings where thermal care practices are limited.
            </p>

            <div className="flex flex-col gap-3">
              {["Skin-to-skin (kangaroo) care immediately after birth", "Delayed bathing for at least 24 hours", "Warm delivery rooms and incubator management", "Exclusive breastfeeding for thermal regulation"].map(
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
              Educational Content
            </span>
            <h2
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, color: "#1e1b4b" }}
            >
              Puericulture & Neonatal Care
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              Comprehensive educational topics covering all aspects of newborn care, from clinical
              practice to family education.
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
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden p-12 text-center text-white"
            style={{ background: "linear-gradient(135deg, #EC4899, #A855F7, #6366F1)" }}
          >
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: "radial-gradient(circle at 20% 80%, white 0%, transparent 50%), radial-gradient(circle at 80% 20%, white 0%, transparent 50%)"
            }} />
            <Baby className="w-14 h-14 mx-auto mb-4 opacity-90" />
            <h2 className="mb-3" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800 }}>
              Join Our Mission to Protect Every Newborn
            </h2>
            <p className="opacity-90 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
              Access our educational guides, video resources, and connect with our team of neonatal
              healthcare specialists committed to reducing preventable infant deaths.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/guide"
                className="px-6 py-3 bg-white rounded-full font-semibold transition-all hover:shadow-xl hover:-translate-y-0.5"
                style={{ color: "#A855F7" }}
              >
                Access Free Guides
              </a>
              <a
                href="/contact"
                className="px-6 py-3 rounded-full font-semibold border-2 border-white/60 text-white hover:bg-white/10 transition-all"
              >
                Contact Our Team
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
