import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText,
  FileDown,
  Presentation,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Download,
  ExternalLink,
  Search,
  Filter,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" },
  }),
};

type Tab = "text" | "pdf" | "ppt";

interface GuideArticle {
  id: number;
  title: string;
  category: string;
  color: string;
  content: string[];
  readTime: string;
}

const articles: GuideArticle[] = [
  {
    id: 1,
    title: "Introduction to Neonatal Thermoregulation",
    category: "Fundamentals",
    color: "#F9A8D4",
    readTime: "5 min read",
    content: [
      "Thermoregulation is the physiological process by which an organism maintains its core body temperature within a range compatible with life. In adults, this system is robust; in newborns — particularly preterm infants — it is critically underdeveloped.",
      "Neonates have a large surface-area-to-body-mass ratio, limited subcutaneous fat, and immature central nervous system control over heat production and conservation. They are uniquely dependent on their environment and caregivers to maintain thermal homeostasis.",
      "Heat loss in newborns occurs through four primary mechanisms: (1) Evaporation — moisture from skin and lungs evaporating; (2) Conduction — heat transfer to cooler surfaces in contact with the baby; (3) Convection — heat carried away by cool air currents; (4) Radiation — heat emitted to cooler objects nearby without direct contact.",
      "The WHO defines neonatal hypothermia as a body temperature below 36.5°C. Mild hypothermia (36–36.4°C) can progress rapidly to moderate (32–35.9°C) and severe (<32°C) stages if not corrected. The 'warm chain' — a set of ten interlinked procedures — was developed to prevent heat loss from delivery to the postpartum period.",
    ],
  },
  {
    id: 2,
    title: "The Warm Chain: 10 Steps to Prevent Neonatal Cold Stress",
    category: "Prevention",
    color: "#C4B5FD",
    readTime: "7 min read",
    content: [
      "The Warm Chain, introduced by the WHO and UNICEF, is a sequence of ten linked steps designed to minimize heat loss in the newborn from delivery through the early postnatal period.",
      "Step 1: Warm delivery room — the room temperature should be at least 25°C (77°F) and free from drafts. Step 2: Immediate drying — dry the baby thoroughly with a warm towel immediately after birth, discarding wet linen. Step 3: Skin-to-skin contact — place the naked baby on the mother's bare chest and cover both with a blanket.",
      "Step 4: Breastfeeding — early initiation within the first hour provides warmth and nutrition. Step 5: Postpone bathing — delay the first bath by at least 24 hours, or 48–72 hours for preterm or low-birthweight infants. Step 6: Appropriate clothing and bedding — use a hat, warm clothes, and blankets that suit the environment.",
      "Step 7: Mother and baby together — rooming-in promotes warmth through proximity. Step 8: Warm transportation — if transfer is needed, use a warm incubator or wrap securely. Step 9: Warm resuscitation — resuscitation area must be pre-warmed, with a radiant warmer and polyethylene bags for very preterm infants. Step 10: Training and awareness — all staff and families must understand the principles of the warm chain.",
    ],
  },
  {
    id: 3,
    title: "Kangaroo Mother Care: Evidence and Practice",
    category: "Puericulture",
    color: "#86EFAC",
    readTime: "8 min read",
    content: [
      "Kangaroo Mother Care (KMC) is a method of care for preterm and low-birthweight newborns that involves skin-to-skin contact, exclusive breastfeeding or breast-milk feeding, and early discharge with appropriate follow-up. Originally developed in Bogotá, Colombia in 1978, it has since been validated by extensive global research.",
      "Physiologically, KMC stabilizes the infant's temperature through the mother's thermoregulatory capacity, which actively adjusts to warm or cool the baby as needed. This 'biological incubator' effect is remarkably precise and has been shown in multiple studies to be equivalent to conventional incubator care for stable preterm infants.",
      "The evidence base for KMC is strong: a Cochrane review of 21 trials found KMC reduces mortality by 40% in stable low-birthweight infants, reduces the risk of hypothermia by 78%, reduces severe infections by 53%, and increases rates of exclusive breastfeeding at discharge by 50%. KMC also promotes neurodevelopment and parent-infant bonding.",
      "For implementation, KMC sessions should be initiated as soon as the infant is clinically stable. Continuous KMC (>20 hours/day) is preferred over intermittent. Fathers and other family members can also participate when the mother is resting.",
    ],
  },
  {
    id: 4,
    title: "Recognizing and Managing Neonatal Hypothermia",
    category: "Clinical",
    color: "#93C5FD",
    readTime: "6 min read",
    content: [
      "Early recognition of neonatal hypothermia requires vigilant clinical assessment. Signs include cool or cold skin to touch (especially on the trunk), poor or absent feeding, weak cry, lethargy and reduced activity, pallor or mottling, bradycardia, and in severe cases, apnea and hypoglycemia.",
      "Temperature measurement should be axillary using a low-reading thermometer. Normal axillary temperature in newborns is 36.5–37.5°C. Any reading below 36.5°C requires prompt intervention.",
      "Management of mild to moderate hypothermia: Remove wet clothing. Initiate immediate skin-to-skin contact. Cover with warm blankets and a hat. Begin or encourage breastfeeding. Measure blood glucose (hypoglycemia often co-exists). Reassess temperature every 30 minutes until normothermic.",
      "Management of severe hypothermia: Place in a pre-warmed incubator set to 35–36°C. Avoid rapid rewarming (target 0.5°C/hour increase). Monitor for hypoglycemia, metabolic acidosis, and apnea. IV glucose may be required. Obtain specialist neonatal consultation urgently. Document temperature trends and interventions.",
    ],
  },
  {
    id: 5,
    title: "Parental Education: Newborn Care at Home",
    category: "Family",
    color: "#FDBA74",
    readTime: "6 min read",
    content: [
      "The transition from hospital to home is a high-risk period for neonatal hypothermia, especially in cool climates or during winter months. Parents must be equipped with the knowledge and skills to maintain their baby's temperature safely.",
      "Key messages for parents: Keep the room temperature between 20–22°C (68–72°F). Dress your baby in one more layer than you are wearing. Always use a hat — newborns lose a significant proportion of heat through their head. Check the baby's temperature by feeling the back of the neck or chest, not the hands or feet (which are normally cooler).",
      "Warning signs requiring immediate medical attention: Temperature below 36°C or above 38°C. Baby is unusually limp, unresponsive, or very difficult to wake. Refusing to feed for two consecutive feeds. Skin appears bluish or mottled and does not improve with warming.",
      "Creating a safe sleep environment: Avoid overheating (also a risk factor for SIDS). Never put babies to sleep on a hot water bottle or electric blanket. Use a firm, flat mattress with fitted sheet. Keep face and head uncovered during sleep. Room-sharing (not bed-sharing) is recommended for the first 6 months.",
    ],
  },
];

const pdfResources = [
  {
    id: 1,
    title: "Paniers des soins essentiels en santé maternelle et néonatale",
    description: "Comprehensive WHO guideline on neonatal thermal care, covering the warm chain, KMC, and incubator management.",
    pages: 114,
    size: "1.526 MB",
    category: "WHO Guidelines",
    color: "#F9A8D4",
    year: 2018,
    url: "public/assets/guides/guide ministere de la sante tunisie.pdf",
  },
  {
    id: 2,
    title: "Neonatal Hypothermia Prevention: Clinical Protocol",
    description: "Step-by-step clinical protocols for delivery room thermal care, NICU temperature management, and discharge planning.",
    pages: 24,
    size: "1.8 MB",
    category: "Clinical Protocol",
    color: "#A5B4FC",
    year: 2022,
    url: "/assets/guides/neonatal-hypothermia-protocol.pdf",
  },
  {
    id: 3,
    title: "Kangaroo Mother Care Implementation Manual",
    description: "Practical manual for healthcare facilities implementing or scaling KMC programs, with case studies and training tools.",
    pages: 92,
    size: "5.1 MB",
    category: "Implementation",
    color: "#86EFAC",
    year: 2021,
    url: "/assets/guides/kangaroo-mother-care-manual.pdf",
  },
  {
    id: 4,
    title: "Family Guide to Newborn Warmth and Puericulture",
    description: "Parent-friendly guide in plain language covering home care, warning signs, and when to seek medical help for newborns.",
    pages: 18,
    size: "1.1 MB",
    category: "Family Education",
    color: "#FDBA74",
    year: 2023,
    url: "/assets/guides/family-guide-newborn-warmth.pdf",
  },
  {
    id: 5,
    title: "Neonatal Resuscitation & Thermal Stabilization",
    description: "Emergency reference guide for healthcare workers on neonatal resuscitation procedures with thermal stabilization protocols.",
    pages: 36,
    size: "2.4 MB",
    category: "Emergency Care",
    color: "#FCA5A5",
    year: 2022,
    url: "/assets/guides/neonatal-resuscitation-guide.pdf",
  },
];

const pptResources = [
  {
    id: 1,
    title: "Neonatal Hypothermia — Grand Rounds Presentation",
    description: "Full 45-slide presentation for medical grand rounds covering epidemiology, pathophysiology, prevention, and management.",
    slides: 45,
    size: "8.7 MB",
    category: "Grand Rounds",
    color: "#F9A8D4",
    year: 2023,
    url: "/assets/presentations/neonatal-hypothermia-grand-rounds.pptx",
  },
  {
    id: 2,
    title: "Kangaroo Care Workshop Slides",
    description: "Interactive workshop presentation with exercises, case discussions, and demonstration instructions for nursing staff.",
    slides: 32,
    size: "6.2 MB",
    category: "Workshop",
    color: "#C4B5FD",
    year: 2022,
    url: "/assets/presentations/kangaroo-care-workshop.pptx",
  },
  {
    id: 3,
    title: "Parent Education Session: Keeping Your Newborn Safe",
    description: "Friendly, illustrated presentation designed for parent education sessions in maternity wards and community health centers.",
    slides: 20,
    size: "4.3 MB",
    category: "Family Education",
    color: "#FDBA74",
    year: 2023,
    url: "/assets/presentations/parent-education-newborn-safety.pptx",
  },
  {
    id: 4,
    title: "Warm Chain Protocol — Staff Training",
    description: "Comprehensive staff training presentation on WHO Warm Chain protocols with quiz slides and competency checkoffs.",
    slides: 55,
    size: "10.1 MB",
    category: "Staff Training",
    color: "#86EFAC",
    year: 2022,
    url: "/assets/presentations/warm-chain-staff-training.pptx",
  },
];

function ArticleAccordion({ article }: { article: GuideArticle }) {
  const [open, setOpen] = useState(false);

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-sm border border-white overflow-hidden"
    >
      <button
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50/50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${article.color}33` }}
          >
            <BookOpen className="w-5 h-5" style={{ color: article.color }} />
          </div>
          <div className="text-left">
            <span
              className="inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-1"
              style={{ background: `${article.color}22`, color: "#374151" }}
            >
              {article.category}
            </span>
            <h3 className="text-gray-800 text-sm" style={{ fontWeight: 700 }}>
              {article.title}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 ml-3">
          <span className="hidden sm:block text-xs text-gray-400">{article.readTime}</span>
          {open ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 border-t border-gray-100">
              <div className="flex flex-col gap-4">
                {article.content.map((paragraph, i) => (
                  <p key={i} className="text-sm text-gray-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Guide() {
  const [activeTab, setActiveTab] = useState<Tab>("text");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs: { id: Tab; label: string; icon: typeof FileText }[] = [
    { id: "text", label: "Text Articles", icon: FileText },
    { id: "pdf", label: "PDF Resources", icon: FileDown },
    { id: "ppt", label: "Presentations", icon: Presentation },
  ];

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center mb-12"
        >
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{ background: "rgba(249,168,212,0.2)", color: "#BE185D" }}
          >
            Learning Resources
          </span>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, color: "#1e1b4b" }}>
            Educational{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #EC4899, #A855F7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Guide
            </span>
          </h1>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm">
            Access our comprehensive library of educational resources on neonatal hypothermia and
            puericulture — available in text, PDF, and presentation formats.
          </p>
        </motion.div>

        {/* Search + Tabs */}
        <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp} className="mb-8">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100"
            />
          </div>

          {/* Tab Bar */}
          <div className="flex gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 w-fit mx-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id ? "text-white shadow-md" : "text-gray-500 hover:text-pink-500"
                }`}
                style={
                  activeTab === tab.id
                    ? { background: "linear-gradient(135deg, #EC4899, #A855F7)" }
                    : {}
                }
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {/* TEXT ARTICLES */}
          {activeTab === "text" && (
            <motion.div
              key="text"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4"
            >
              {articles
                .filter(
                  (a) =>
                    !searchQuery ||
                    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    a.category.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((article) => (
                  <ArticleAccordion key={article.id} article={article} />
                ))}
            </motion.div>
          )}

          {/* PDF RESOURCES */}
          {activeTab === "pdf" && (
            <motion.div
              key="pdf"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {pdfResources
                .filter(
                  (r) =>
                    !searchQuery ||
                    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    r.category.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((resource, i) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-white hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-14 rounded-xl flex flex-col items-center justify-center flex-shrink-0"
                        style={{ background: `${resource.color}33` }}
                      >
                        <FileDown className="w-6 h-6 mb-0.5" style={{ color: resource.color }} />
                        <span className="text-xs font-bold" style={{ color: resource.color }}>PDF</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span
                          className="inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-1.5"
                          style={{ background: `${resource.color}22`, color: "#374151" }}
                        >
                          {resource.category}
                        </span>
                        <h3 className="text-gray-800 text-sm mb-1.5 leading-snug" style={{ fontWeight: 700 }}>
                          {resource.title}
                        </h3>
                        <p className="text-xs text-gray-400 leading-relaxed mb-3">
                          {resource.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-3 text-xs text-gray-400">
                            <span>{resource.pages} pages</span>
                            <span>{resource.size}</span>
                            <span>{resource.year}</span>
                          </div>
                          <a
                            href={resource.url}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-white font-medium transition-all hover:opacity-90 hover:shadow-md"
                            style={{ background: "linear-gradient(135deg, #EC4899, #A855F7)" }}
                          >
                            <Download className="w-3 h-3" /> Download
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          )}

          {/* PRESENTATIONS */}
          {activeTab === "ppt" && (
            <motion.div
              key="ppt"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {pptResources
                .filter(
                  (r) =>
                    !searchQuery ||
                    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    r.category.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((resource, i) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-white hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-14 rounded-xl flex flex-col items-center justify-center flex-shrink-0"
                        style={{ background: `${resource.color}33` }}
                      >
                        <Presentation className="w-6 h-6 mb-0.5" style={{ color: resource.color }} />
                        <span className="text-xs font-bold" style={{ color: resource.color }}>PPT</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span
                          className="inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-1.5"
                          style={{ background: `${resource.color}22`, color: "#374151" }}
                        >
                          {resource.category}
                        </span>
                        <h3 className="text-gray-800 text-sm mb-1.5 leading-snug" style={{ fontWeight: 700 }}>
                          {resource.title}
                        </h3>
                        <p className="text-xs text-gray-400 leading-relaxed mb-3">
                          {resource.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-3 text-xs text-gray-400">
                            <span>{resource.slides} slides</span>
                            <span>{resource.size}</span>
                            <span>{resource.year}</span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs border border-gray-200 text-gray-500 hover:border-pink-200 hover:text-pink-500 transition-colors"
                            >
                              <ExternalLink className="w-3 h-3" /> Preview
                            </button>
                            <a
                              href={resource.url}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-white font-medium transition-all hover:opacity-90 hover:shadow-md"
                              style={{ background: "linear-gradient(135deg, #EC4899, #A855F7)" }}
                            >
                              <Download className="w-3 h-3" /> Download
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 p-8 rounded-3xl text-center"
          style={{ background: "linear-gradient(135deg, rgba(249,168,212,0.15), rgba(192,132,252,0.15))" }}
        >
          <Filter className="w-8 h-8 mx-auto mb-3" style={{ color: "#A855F7" }} />
          <h3 className="text-gray-700 mb-2" style={{ fontWeight: 700 }}>
            Need a Custom Resource?
          </h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto mb-4">
            Our team can develop tailored educational materials for your institution, community
            program, or healthcare training needs.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #EC4899, #A855F7)" }}
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </div>
  );
}
