import { useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import { Variants } from "framer-motion";
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

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
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

  // const handleDownload = (url: string, filename: string) => {
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.download = filename;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

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

  const handleDownloadFile = async (url: string, filename: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Download error:", error);
  }
};

  const articles: GuideArticle[] = [
    {
      id: 0,
      title: "Protocole OMS",
      category: t("fundamentals"),
      color: "#F9A8D4",
      readTime: `10 ${t("minRead")}`,
      image: "/assets/images/affiche-protcole.jpg",
      content: [
        "1- Salle d'accouchement chaude", 
        "2- Séchage immédiat",
        "3- Contact peau à peau",
        "4- Allaitement maternel",
        "5- Retarder le bain",
        "6- Vêtements et literie appropriés",
        "7- Mère et bébé ensemble",
        "8- Transport chaud",
        "9- Réanimation chaude",
        "10- Éducation et sensibilisation",
      ],
    },
    {
      id: 1,
      title: "Introduction à la thermorégulation néonatale",
      category: t("fundamentals"),
      color: "#F9A8D4",
      readTime: `5 ${t("minRead")}`,
      image: "/assets/images/affiche-introduction.jpg",
      content: [
        "La thermorégulation est le processus physiologique par lequel un organisme maintient sa température corporelle centrale dans une plage compatible avec la vie. Chez l'adulte, ce système est robuste ; chez le nouveau-né — particulièrement les nourrissons prématurés — il est gravement sous-développé.",
        "Les nouveau-nés ont un rapport surface corporelle/masse corporelle élevé, une graisse sous-cutanée limitée et un contrôle du système nerveux central immature sur la production et la conservation de chaleur. Ils sont particulièrement dépendants de leur environnement et des soignants pour maintenir l'homéostasie thermique.",
        "La perte de chaleur chez les nouveau-nés se produit par quatre mécanismes principaux : (1) Évaporation — l'humidité de la peau et des poumons s'évapore ; (2) Conduction — le transfert de chaleur aux surfaces froides en contact avec le bébé ; (3) Convection — la chaleur emportée par les courants d'air froid ; (4) Rayonnement — la chaleur émise vers des objets plus froids à proximité sans contact direct.",
        "L'OMS définit l'hypothermie néonatale comme une température corporelle inférieure à 36,5°C. L'hypothermie légère (36–36,4°C) peut progresser rapidement vers des stades modérés (32–35,9°C) et sévères (<32°C) si elle n'est pas corrigée. La 'chaîne chaude' — un ensemble de dix procédures interconnectées — a été développée pour prévenir la perte de chaleur de l'accouchement à la période postnatale.",
      ],
    },
    {
      id: 2,
      title: "La Chaîne Chaude : 10 étapes pour prévenir le stress thermique néonatal",
      category: t("prevention"),
      color: "#C4B5FD",
      readTime: `7 ${t("minRead")}`,
      image: "/assets/images/affiche-warmchaine.jpg",
      content: [
        "La Chaîne Chaude, introduite par l'OMS et l'UNICEF, est une séquence de dix étapes liées conçues pour minimiser la perte de chaleur chez le nouveau-né de l'accouchement à la période postnatale précoce.",
        "Étape 1 : Salle d'accouchement chaude — la température de la pièce doit être d'au moins 25°C (77°F) et exempte de courants d'air. Étape 2 : Séchage immédiat — sécher le bébé complètement avec une serviette chaude immédiatement après la naissance, en éliminant le linge mouillé. Étape 3 : Contact peau à peau — placer le bébé nu sur la poitrine nue de la mère et couvrir les deux d'une couverture.",
        "Étape 4 : Allaitement maternel — initiation précoce dans la première heure fournit de la chaleur et de la nutrition. Étape 5 : Retarder le bain — retarder le premier bain d'au moins 24 heures, ou 48–72 heures pour les nourrissons prématurés ou de faible poids à la naissance. Étape 6 : Vêtements et literie appropriés — utiliser un bonnet, des vêtements chauds et des couvertures adaptés à l'environnement.",
        "Étape 7 : Mère et bébé ensemble — le cohabitation favorise la chaleur par la proximité. Étape 8 : Transport chaud — si un transfert est nécessaire, utiliser un incubateur chaud ou envelopper solidement. Étape 9 : Réanimation chaude — la zone de réanimation doit être préchauffée, avec un radiant chaud et des sacs en polyéthylène pour les prématurés très prématurés. Étape 10 : Formation et sensibilisation — tout le personnel et les familles doivent comprendre les principes de la chaîne chaude.",
      ],
    },
    {
      id: 3,
      title: "Soins Mère Kangourou : Preuves et Pratique",
      category: t("puericulture"),
      color: "#86EFAC",
      readTime: `8 ${t("minRead")}`,
      image: "/assets/images/affiche-Kangaroo-mother.jpg",
      content: [
        "Les Soins Mère Kangourou (SMC) sont une méthode de soins pour les nourrissons prématurés et de faible poids à la naissance qui implique un contact peau à peau, l'allaitement maternel exclusif ou l'alimentation au lait maternel, et une sortie précoce avec un suivi approprié. Développée à l'origine à Bogotá, Colombie en 1978, elle a depuis été validée par des recherches mondiales approfondies.",
        "Physiologiquement, les SMC stabilisent la température de l'enfant grâce à la capacité thermorégulatrice de la mère, qui s'ajuste activement pour réchauffer ou refroidir le bébé selon les besoins. Cet 'incubateur biologique' est remarquablement précis et a été démontré dans de multiples études comme équivalent aux soins en incubateur conventionnel pour les prématurés stables.",
        "La base de preuves pour les SMC est solide : une revue Cochrane de 21 essais a trouvé que les SMC réduisent la mortalité de 40% chez les nourrissons de faible poids à la naissance stables, réduisent le risque d'hypothermie de 78%, réduisent les infections sévères de 53%, et augmentent les taux d'allaitement maternel exclusif à la sortie de 50%. Les SMC favorisent également le développement neuro et le lien parent-enfant.",
        "Pour la mise en œuvre, les sessions de SMC doivent être initiées dès que l'enfant est cliniquement stable. Les SMC continues (>20 heures/jour) sont préférées aux intermittentes. Les pères et d'autres membres de la famille peuvent participer lorsque la mère se repose.",
      ],
    },
    {
      id: 4,
      title: "Reconnaître et gérer l'hypothermie néonatale",
      category: t("guideClinical"),
      color: "#93C5FD",
      readTime: `6 ${t("minRead")}`,
      image: "/assets/images/affiche-recognizing-managing.jpg",
      content: [
        "La reconnaissance précoce de l'hypothermie néonatale nécessite une évaluation clinique vigilante. Les signes incluent une peau froide au toucher (surtout sur le tronc), une faible ou absente alimentation, un cri faible, une léthargie et une activité réduite, une pâleur ou une marbrure, une bradycardie, et dans les cas sévères, une apnée et une hypoglycémie.",
        "La mesure de la température doit être axillaire en utilisant un thermomètre à faible lecture. La température axillaire normale chez les nouveau-nés est de 36,5–37,5°C. Toute lecture inférieure à 36,5°C nécessite une intervention immédiate.",
        "Gestion de l'hypothermie légère à modérée : Retirer les vêtements mouillés. Initier un contact peau à peau immédiat. Couvrir de couvertures chaudes et d'un bonnet. Commencer ou encourager l'allaitement maternel. Mesurer la glycémie sanguine (l'hypoglycémie coexiste souvent). Réévaluer la température toutes les 30 minutes jusqu'à ce qu'elle soit normotherme.",
        "Gestion de l'hypothermie sévère : Placer dans un incubateur préchauffé à 35–36°C. Éviter le réchauffement rapide (cible d'augmentation de 0,5°C/heure). Surveiller l'hypoglycémie, l'acidose métabolique et l'apnée. Le glucose IV peut être nécessaire. Obtenir une consultation spécialisée néonatale d'urgence. Documenter les tendances de température et les interventions.",
      ],
    },
    {
      id: 5,
      title: "Éducation parentale : Soins du nouveau-né à domicile",
      category: t("family"),
      color: "#FDBA74",
      readTime: `6 ${t("minRead")}`,
      image: "/assets/images/affiche-education-parental.jpg",
      content: [
        "La transition de l'hôpital au domicile est une période à haut risque pour l'hypothermie néonatale, surtout dans les climats froids ou pendant les mois d'hiver. Les parents doivent être équipés des connaissances et des compétences pour maintenir la température de leur bébé en toute sécurité.",
        "Messages clés pour les parents : Maintenir la température de la pièce entre 20–22°C (68–72°F). Habiller votre bébé d'une couche de plus que vous portez. Toujours utiliser un bonnet — les nouveau-nés perdent une proportion importante de chaleur par la tête. Vérifier la température du bébé en touchant le dos du cou ou la poitrine, pas les mains ou les pieds (qui sont normalement plus froids).",
        "Signes d'avertissement nécessitant une attention médicale immédiate : Température inférieure à 36°C ou supérieure à 38°C. Bébé inhabituellement mou, non réactif ou très difficile à réveiller. Refus d'allaiter pendant deux tétées consécutives. Peau apparaissant bleue ou marbrée et ne s'améliorant pas avec le réchauffement.",
        "Créer un environnement de sommeil sécurisé : Éviter la surchauffe (aussi un facteur de risque pour la MSN). Ne jamais mettre les bébés à dormir sur une bouillotte chaude ou un coussin chauffant électrique. Utiliser un matelas ferme et plat avec un drap housse. Garder le visage et la tête découverts pendant le sommeil. Le partage de chambre (pas de lit) est recommandé pour les 6 premiers mois.",
      ],
    },
  ];

  const pdfResources = [
    {
      id: 1,
      title: "Paniers des soins essentiels en santé maternelle et néonatale",
      description: "Ligne directrice complète de l'OMS sur les soins thermiques néonatals, couvrant la chaîne chaude, les SMC et la gestion des incubateurs.",
      pages: 114,
      size: "1.526 MB",
      category: t("whoGuidelines"),
      color: "#F9A8D4",
      year: 2018,
      url: "/assets/pdf/guide1.pdf",
    },
    {
      id: 2,
      title: "Determinants of neonatal mortality in a tunisian population",
      description: "Protocoles cliniques étape par étape pour les soins thermiques en salle d'accouchement, la gestion de la température en USIN et la planification de sortie.",
      pages: 41,
      size: "0.228 MB",
      category: t("clinicalProtocol"),
      color: "#A5B4FC",
      year: 2010,
      url: "/assets/pdf/guide2.pdf",
    },
    {
      id: 3,
      title: "La Protection thermique du nouveau-né: Guide pratique",
      description: "Manuel pratique pour les établissements de santé mettant en œuvre ou étendant les programmes SMC, avec des études de cas et des outils de formation.",
      pages: 74,
      size: "4.672 MB",
      category: t("implementation"),
      color: "#86EFAC",
      year: 2000,
      url: "/assets/pdf/guide3.pdf",
    },
    {
      id: 4,
      title: "Newborn resuscitation and postnatal care guidelines",
      description: "Guide adapté aux parents en langage simple couvrant les soins à domicile, les signes d'avertissement et quand demander une aide médicale pour les nouveau-nés.",
      pages: 64,
      size: "2.584 MB",
      category: t("guideFamilyEducation"),
      color: "#FDBA74",
      year: 2014,
      url: "/assets/pdf/guide4.pdf",
    },
    {
      id: 5,
      title: "ALLAITEMENT MATERNEL",
      description: "Guide adapté aux parents en langage simple couvrant les soins à domicile, les signes d'avertissement et quand demander une aide médicale pour les nouveau-nés.",
      pages: 46,
      size: "1.870 MB",
      category: t("guideFamilyEducation"),
      color: "#FDBA74",
      year: 2014,
      url: "/assets/pdf/guide5.pdf",
    },
    {
      id: 6,
      title: "Le travail en équipe",
      description: "Guide adapté aux parents en langage simple couvrant les soins à domicile, les signes d'avertissement et quand demander une aide médicale pour les nouveau-nés.",
      pages: 57,
      size: "1.872 MB",
      category: t("guideFamilyEducation"),
      color: "#FDBA74",
      year: 2014,
      url: "/assets/pdf/guide6.pdf",
    },
  ];

  const pptResources = [
    {
      id: 1,
      title: "Accueil des parents en néonatologie",
      description: "Présentation complète de 45 diapositives pour les grand rounds médicaux couvrant l'épidémiologie, la physiopathologie, la prévention et la gestion.",
      slides: 20,
      size: "8.7 MB",
      category: t("grandRounds"),
      color: "#F9A8D4",
      year: 2022,
      url: "/assets/presentations/ppt1.pptx",
    },
    {
      id: 2,
      title: "Adaptation à la vie extra-utérine",
      description: "Présentation conviviale et illustrée conçue pour les sessions d'éducation parentale dans les maternités et les centres de santé communautaires.",
      slides: 34,
      size: "7.367 MB",
      category: t("guideFamilyEducation"),
      color: "#FDBA74",
      year: 2023,
      url: "/assets/presentations/ppt2.pptx",
    },
    {
      id: 3,
      title: "Surveillance du nouveau né en maternité",
      description: "Présentation complète de formation du personnel sur les protocoles Chaîne Chaude de l'OMS avec diapositives de quiz et vérifications de compétences.",
      slides: 55,
      size: "10.1 MB",
      category: t("staffTraining"),
      color: "#86EFAC",
      year: 2024,
      url: "/assets/presentations/ppt3.pptx",
    },
    {
      id: 4,
      title: "SURVEILLANCE DU NOUVEAU-NÉ EN SOINS INTENSIFS",
      description: "Présentation interactive d'atelier avec exercices, discussions de cas et instructions de démonstration pour le personnel infirmier.",
      slides: 32,
      size: "6.2 MB",
      category: t("workshop"),
      color: "#C4B5FD",
      year: 2025,
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
                          <button
                            onClick={() => handleDownloadFile(resource.url, resource.title + ".pdf")}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-white font-medium"
                            style={{ background: "linear-gradient(135deg, #EC4899, #A855F7)" }}
                          >
                            <Download className="w-3 h-3" /> {t("download")}
                          </button>
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
                              onClick={() => handleDownloadFile(resource.url, resource.title + ".pptx")}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-white font-medium"
                              style={{ background: "linear-gradient(135deg, #EC4899, #A855F7)" }}
                            >
                              <Download className="w-3 h-3" /> {t("download")}
                            </button>
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
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold transition-all hover:opacity-90 hover:shadow-xl"
            style={{ background: "linear-gradient(135deg, #EC4899, #A855F7)" }}
          >
            {t("contact")}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
