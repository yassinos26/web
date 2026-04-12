import { useState } from "react";
import { useTranslation } from "react-i18next";
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
  image?: string;
}

function ArticleAccordion({ article }: { article: GuideArticle }) {
  const [open, setOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
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
              {article.image && (
                <div className="mb-4 relative">
                  <motion.img
                    src={article.image}
                    alt={article.title}
                    className="w-full max-h-64 object-contain rounded-lg shadow-sm border border-gray-100 cursor-zoom-in"
                    loading="lazy"
                    onClick={toggleZoom}
                    animate={{
                      scale: isZoomed ? 1.5 : 1,
                      zIndex: isZoomed ? 50 : 1
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                    whileHover={{ scale: isZoomed ? 1.5 : 1.05 }}
                  />

                  {/* Overlay quand zoomé */}
                  {isZoomed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4"
                      onClick={toggleZoom}
                    >
                      <motion.img
                        src={article.image}
                        alt={article.title}
                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30
                        }}
                      />
                    </motion.div>
                  )}
                </div>
              )}
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
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<Tab>("text");
  const [searchQuery, setSearchQuery] = useState("");

  const articles: GuideArticle[] = [
    {
      id: 0,
      title: t("guide.whoProtocol.title"),
      category: t("fundamentals"),
      color: "#F9A8D4",
      readTime: `10 ${t("minRead")}`,
      image: "/assets/text/affiche-protcole.jpg",
      content: [
        t("guide.whoProtocol.step1"),
        t("guide.whoProtocol.step2"),
        t("guide.whoProtocol.step3"),
        t("guide.whoProtocol.step4"),
        t("guide.whoProtocol.step5"),
        t("guide.whoProtocol.step6"),
        t("guide.whoProtocol.step7"),
        t("guide.whoProtocol.step8"),
        t("guide.whoProtocol.step9"),
        t("guide.whoProtocol.step10"),
      ],
    },
    {
      id: 1,
      title: t("guide.intro.title"),
      category: t("fundamentals"),
      color: "#F9A8D4",
      readTime: `5 ${t("minRead")}`,
      image: "/assets/text/affiche-introduction.jpg",
      content: [
        t("guide.intro.p1"),
        t("guide.intro.p2"),
        t("guide.intro.p3"),
        t("guide.intro.p4"),
      ],
    },
    {
      id: 2,
      title: t("guide.warmChain.title"),
      category: t("prevention"),
      color: "#C4B5FD",
      readTime: `7 ${t("minRead")}`,
      image: "/assets/text/affiche-warmchaine.jpg",
      content: [
        t("guide.warmChain.p1"),
        t("guide.warmChain.p2"),
        t("guide.warmChain.p3"),
        t("guide.warmChain.p4"),
      ],
    },
    {
      id: 3,
      title: t("guide.kmc.title"),
      category: t("puericulture"),
      color: "#86EFAC",
      readTime: `8 ${t("minRead")}`,
      image: "/assets/text/affiche-Kangaroo-mother.jpg",
      content: [
        t("guide.kmc.p1"),
        t("guide.kmc.p2"),
        t("guide.kmc.p3"),
        t("guide.kmc.p4"),
      ],
    },
    {
      id: 4,
      title: t("guide.management.title"),
      category: t("guideClinical"),
      color: "#93C5FD",
      readTime: `6 ${t("minRead")}`,
      image: "/assets/text/affiche-recognizing-managing.jpg",
      content: [
        t("guide.management.p1"),
        t("guide.management.p2"),
        t("guide.management.p3"),
        t("guide.management.p4"),
      ],
    },
    {
      id: 5,
      title: t("guide.education.title"),
      category: t("family"),
      color: "#FDBA74",
      readTime: `6 ${t("minRead")}`,
      image: "/assets/text/affiche-education-parental.jpg",
      content: [
        t("guide.education.p1"),
        t("guide.education.p2"),
        t("guide.education.p3"),
        t("guide.education.p4"),
      ],
    },
  ];

  const pdfResources = [
    {
      id: 1,
      title: t("guide.pdf1.title"),
      description: t("guide.pdf1.desc"),
      pages: 114,
      size: "1.526 MB",
      category: t("whoGuidelines"),
      color: "#F9A8D4",
      year: 2018,
      url: "public/assets/guides/guide1.pdf",
    },
    {
      id: 2,
      title: t("guide.pdf2.title"),
      description: t("guide.pdf2.desc"),
      pages: 41,
      size: "0.228 MB",
      category: t("clinicalProtocol"),
      color: "#A5B4FC",
      year: 2010,
      url: "public/assets/guides/guide2.pdf",
    },
    {
      id: 3,
      title: t("guide.pdf3.title"),
      description: t("guide.pdf3.desc"),
      pages: 74,
      size: "4.672 MB",
      category: t("implementation"),
      color: "#86EFAC",
      year: 2000,
      url: "public/assets/guides/guide3.pdf",
    },
    {
      id: 4,
      title: t("guide.pdf4.title"),
      description: t("guide.pdf4.desc"),
      pages: 64,
      size: "2.584 MB",
      category: t("guideFamilyEducation"),
      color: "#FDBA74",
      year: 2014,
      url: "public/assets/guides/guide4.pdf",
    },
    {
      id: 5,
      title: t("guide.pdf5.title"),
      description: t("guide.pdf5.desc"),
      pages: 46,
      size: "1.870 MB",
      category: t("guideFamilyEducation"),
      color: "#FDBA74",
      year: 2014,
      url: "public/assets/guides/guide5.pdf",
    },
    {
      id: 6,
      title: t("guide.pdf6.title"),
      description: t("guide.pdf6.desc"),
      pages: 57,
      size: "1.872 MB",
      category: t("guideFamilyEducation"),
      color: "#FDBA74",
      year: 2014,
      url: "public/assets/guides/guide6.pdf",
    },
  ];

  const pptResources = [
    {
      id: 1,
      title: t("guide.ppt1.title"),
      description: t("guide.ppt1.desc"),
      slides: 20,
      size: "8.7 MB",
      category: t("grandRounds"),
      color: "#F9A8D4",
      year: 2023,
      url: "/assets/presentations/ppt1.pptx",
    },
    {
      id: 2,
      title: t("guide.ppt2.title"),
      description: t("guide.ppt2.desc"),
      slides: 34,
      size: "7.367 MB",
      category: t("guideFamilyEducation"),
      color: "#FDBA74",
      year: 2023,
      url: "/assets/presentations/ppt2.pptx",
    },
    {
      id: 3,
      title: t("guide.ppt3.title"),
      description: t("guide.ppt3.desc"),
      slides: 55,
      size: "10.1 MB",
      category: t("staffTraining"),
      color: "#86EFAC",
      year: 2022,
      url: "/assets/presentations/ppt3.pptx",
    },
    {
      id: 4,
      title: t("guide.ppt4.title"),
      description: t("guide.ppt4.desc"),
      slides: 32,
      size: "6.2 MB",
      category: t("workshop"),
      color: "#C4B5FD",
      year: 2022,
      url: "/assets/presentations/ppt4.pptx",
    },
  ];

  const tabs: { id: Tab; label: string; icon: typeof FileText }[] = [
    { id: "text", label: t("textArticles"), icon: FileText },
    { id: "pdf", label: t("pdfResources"), icon: FileDown },
    { id: "ppt", label: t("presentations"), icon: Presentation },
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
            {t("learningResources")}
          </span>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, color: "#1e1b4b" }}>
            {t("educationalGuide")} 
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
            {t("resourcesDescription")}
          </p>
        </motion.div>

        {/* Search + Tabs */}
        <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp} className="mb-8">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
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
                            <span>{resource.pages} {t("guide.pages")}</span>
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
                            <Download className="w-3 h-3" /> {t("guide.download")}
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
                            <span>{resource.slides} {t("guide.slides")}</span>
                            <span>{resource.size}</span>
                            <span>{resource.year}</span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs border border-gray-200 text-gray-500 hover:border-pink-200 hover:text-pink-500 transition-colors"
                            >
                              <ExternalLink className="w-3 h-3" /> {t("guide.preview")}
                            </button>
                            <a
                              href={resource.url}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-white font-medium transition-all hover:opacity-90 hover:shadow-md"
                              style={{ background: "linear-gradient(135deg, #EC4899, #A855F7)" }}
                            >
                              <Download className="w-3 h-3" /> {t("guide.download")}
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
            {t("needCustom")}
          </h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto mb-4">
            {t("customResourceDescription")}
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #EC4899, #A855F7)" }}
          >
            {t("contact")}
          </a>
        </motion.div>
      </div>
    </div>
  );
}
