import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Variants } from "framer-motion";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  ThumbsUp,
  ThumbsDown,
  X,
  MessageCircle,
  Send,
  Eye,
  Clock,
  ChevronRight,
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

interface Comment {
  id: number;
  author: string;
  avatar: string;
  text: string;
  time: string;
}

interface Episode {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
}

interface Video {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: string;
  youtubeId: string;
  likes: number;
  dislikes: number;
  comments: Comment[];
  category: string;
  localVideoUrl?: string;
  episodes?: Episode[];
}

export function Videos() {
  const { t } = useTranslation();

  const categoryColors: Record<string, string> = {
    [t("clinical")]: "#F9A8D4",
    [t("videoPuericulture")]: "#86EFAC",
    [t("nicu")]: "#93C5FD",
    [t("videoFamilyEducation")]: "#FDBA74",
    [t("protocol")]: "#C4B5FD",
  };

  const initialVideos: Video[] = [
    {
      id: 1,
      title: "Comprendre l'hypothermie néonatale : causes et conséquences",
      description:
        "Un aperçu approfondi des raisons pour lesquelles les nouveau-nés sont particulièrement vulnérables à la perte de chaleur et de ce qui se passe physiologiquement lorsque la température corporelle descend en dessous des niveaux sécurisés.",
      thumbnail: "/assets/reels/video1.jpg",
      duration: "17:12",
      views: "8.1K",
      youtubeId: "008VanO0PHA",
      likes: 150,
      dislikes: 8,
      category: t("clinical"),
      comments: [
        { id: 1, author: "Infirmière Maria", avatar: "M", text: "Explication très claire ! J'utilise cette vidéo dans la formation de notre service.", time: "il y a 2 jours" },
        { id: 2, author: "Dr. Santos", avatar: "S", text: "Excellent aperçu. J'aimerais beaucoup un suivi sur la gestion de l'hypothermie sévère.", time: "il y a 5 jours" },
      ],
    },
    {
      id: 2,
      title: "Qu'est-ce que l'hypothermie néonatale ?",
      description:
        "Comprendre les différents niveaux de sévérité de l'hypothermie néonatale est essentiel pour une gestion appropriée. Nous fournirons des informations sur la façon de créer un environnement thermique sécurisé pour les nouveau-nés et les actions immédiates qui peuvent être prises pour prévenir l'hypothermie pendant et après l'accouchement.",
      thumbnail: "/assets/reels/video2.jpg",
      duration: "2:46",
      views: "0.172k",
      youtubeId: "9bI-3evlXnU",
      likes: 1,
      dislikes: 0,
      category: t("videoPuericulture"),
      comments: [
        { id: 1, author: "Ana Ferreira", avatar: "A", text: "Cela m'a beaucoup aidé à comprendre les soins kangourou !", time: "il y a 1 jour" },
        { id: 2, author: "Étudiante infirmière J.", avatar: "J", text: "J'ai partagé cela avec toute notre cohorte d'infirmières. Ressource incroyable.", time: "il y a 3 jours" },
        { id: 3, author: "Sage-femme Paula", avatar: "P", text: "Nous avons mis cela en place dans notre maternité et les résultats sont incroyables.", time: "il y a 1 semaine" },
      ],
    },
    {
      id: 3,
      title: "Surveillance de la température en USIN : meilleures pratiques",
      description:
        "Un guide pratique pour les infirmières de l'USIN sur la surveillance continue de la température, les réglages des incubateurs, les réchauffeurs radiants et la reconnaissance des premiers signes d'instabilité thermique chez les nourrissons prématurés.",
      thumbnail: "/assets/reels/video3.jpg",
      duration: "22:18",
      views: "6.1K",
      youtubeId: "KIyamhhOwUA",
      likes: 204,
      dislikes: 5,
      category: t("nicu"),
      comments: [
        { id: 1, author: "Infirmière USIN Roberto", avatar: "R", text: "Cela devrait être une formation obligatoire pour tout le personnel de l'USIN.", time: "il y a 4 jours" },
      ],
    },
    {
      id: 4,
      title: "Soins mère kangourou et allaitement : techniques salvatrices",
      description:
        "Conseils pratiques pour les nouveaux parents sur le maintien d'un environnement thermique sécurisé à la maison — température ambiante, couches de vêtements, techniques d'emmaillotage et signes d'avertissement à surveiller.",
      thumbnail: "/assets/reels/video3.jpg",
      duration: "9:47",
      views: "21.3K",
      youtubeId: "lEmaSNbSaZg",
      likes: 831,
      dislikes: 19,
      category: t("videoFamilyEducation"),
      comments: [
        { id: 1, author: "Nouvelle maman Carla", avatar: "C", text: "Cette vidéo m'a donné tellement de paix d'esprit ! Merci !", time: "il y a 6 heures" },
        { id: 2, author: "Papa de jumeaux", avatar: "D", text: "Claire et rassurante. Exactement ce dont j'avais besoin en tant que nouveau parent.", time: "il y a 2 jours" },
        { id: 3, author: "Grand-mère Teresa", avatar: "T", text: "J'ai envoyé cela à ma fille quand elle est rentrée de l'hôpital !", time: "il y a 3 jours" },
      ],
    },
    {
      id: 5,
      title: "Guide de soins à domicile pour garder votre nouveau-né au chaud",
      description:
        "Guide étape par étape du protocole de stabilisation thermique pendant la réanimation néonatale, y compris les enveloppes en polyéthylène, les salles d'accouchement chaudes et l'importance de l'heure d'or.",
      thumbnail: "/assets/reels/video5.jpg",
      duration: "28:45",
      views: "4.8K",
      youtubeId: "kn5LwJsF66I",
      likes: 178,
      dislikes: 3,
      category: t("protocol"),
      comments: [
        { id: 1, author: "Résident Dr. Lima", avatar: "L", text: "C'est de l'or. Regardé deux fois avant ma rotation en USIN.", time: "il y a 1 jour" },
        { id: 2, author: "Infirmière obstétrique", avatar: "O", text: "Notre équipe a examiné cela ensemble. Très pratique et bien organisé.", time: "il y a 5 jours" },
      ],
    },
    {
      id: 6,
      title: "Guide de soins à domicile pour garder votre nouveau-né au chaud",
      description:
        "Guide étape par étape du protocole de stabilisation thermique pendant la réanimation néonatale, y compris les enveloppes en polyéthylène, les salles d'accouchement chaudes et l'importance de l'heure d'or.",
      thumbnail: "/assets/reels/video6.jpg",
      duration: "28:45",
      views: "4.8K",
      youtubeId: "6dQ3poY6qts",
      likes: 178,
      dislikes: 3,
      category: t("protocol"),
      comments: [
        { id: 1, author: "Résident Dr. Lima", avatar: "L", text: "C'est de l'or. Regardé deux fois avant ma rotation en USIN.", time: "il y a 1 jour" },
        { id: 2, author: "Infirmière obstétrique", avatar: "O", text: "Notre équipe a examiné cela ensemble. Très pratique et bien organisé.", time: "il y a 5 jours" },
      ],
    },
    // Add shorts videos...
    {
      id: 7,
      title: "Guide de soins à domicile pour garder votre nouveau-né au chaud",
      description:
        "Guide étape par étape du protocole de stabilisation thermique pendant la réanimation néonatale, y compris les enveloppes en polyéthylène, les salles d'accouchement chaudes et l'importance de l'heure d'or.",
      thumbnail: "/assets/reels/reel1.jpg",
      duration: "28:45",
      views: "4.8K",
      likes: 178,
      dislikes: 3,
      category: t("protocol"),
      localVideoUrl: "/assets/reels/reel1.mp4",
      episodes: [
        { id: 1, title: "Introduction aux soins thermiques", thumbnail: "/assets/reels/episode1.jpg", duration: "5:30" },
        { id: 2, title: "Préparation de l'environnement", thumbnail: "/assets/reels/episode2.jpg", duration: "4:15" },
        { id: 3, title: "Techniques de réchauffement", thumbnail: "/assets/reels/episode3.jpg", duration: "6:20" },
        { id: 4, title: "Surveillance continue", thumbnail: "/assets/reels/episode4.jpg", duration: "5:45" },
        { id: 5, title: "Prévention des complications", thumbnail: "/assets/reels/episode5.jpg", duration: "6:55" },
      ],
      comments: [
        { id: 1, author: "Résident Dr. Lima", avatar: "L", text: "C'est de l'or. Regardé deux fois avant ma rotation en USIN.", time: "il y a 1 jour" },
        { id: 2, author: "Infirmière obstétrique", avatar: "O", text: "Notre équipe a examiné cela ensemble. Très pratique et bien organisé.", time: "il y a 5 jours" },
      ],
    },
    {
      id: 8,
      title: "Guide de soins à domicile pour garder votre nouveau-né au chaud",
      description:
        "Guide étape par étape du protocole de stabilisation thermique pendant la réanimation néonatale, y compris les enveloppes en polyéthylène, les salles d'accouchement chaudes et l'importance de l'heure d'or.",
      thumbnail: "/assets/reels/reel2.jpg",
      duration: "28:45",
      views: "4.8K",
      localVideoUrl: "/assets/reels/reel2.mp4",
      likes: 178,
      dislikes: 3,
      category: t("protocol"),
      comments: [
        { id: 1, author: "Résident Dr. Lima", avatar: "L", text: "C'est de l'or. Regardé deux fois avant ma rotation en USIN.", time: "il y a 1 jour" },
        { id: 2, author: "Infirmière obstétrique", avatar: "O", text: "Notre équipe a examiné cela ensemble. Très pratique et bien organisé.", time: "il y a 5 jours" },
      ],
    },
    {
      id: 9,
      title: "Guide de soins à domicile pour garder votre nouveau-né au chaud",
      description:
        "Guide étape par étape du protocole de stabilisation thermique pendant la réanimation néonatale, y compris les enveloppes en polyéthylène, les salles d'accouchement chaudes et l'importance de l'heure d'or.",
      thumbnail: "/assets/reels/reel3.jpg",
      duration: "28:45",
      views: "4.8K",
      localVideoUrl: "/assets/reels/reel3.mp4",
      likes: 178,
      dislikes: 3,
      category: t("protocol"),
      comments: [
        { id: 1, author: "Résident Dr. Lima", avatar: "L", text: "C'est de l'or. Regardé deux fois avant ma rotation en USIN.", time: "il y a 1 jour" },
        { id: 2, author: "Infirmière obstétrique", avatar: "O", text: "Notre équipe a examiné cela ensemble. Très pratique et bien organisé.", time: "il y a 5 jours" },
      ],
    },
    {
      id: 9,
      title: "Guide de soins à domicile pour garder votre nouveau-né au chaud",
      description:
        "Guide étape par étape du protocole de stabilisation thermique pendant la réanimation néonatale, y compris les enveloppes en polyéthylène, les salles d'accouchement chaudes et l'importance de l'heure d'or.",
      thumbnail: "/assets/reels/playlist.jpg",
      duration: "28:45",
      views: "4.8K",
      localVideoUrl: "/assets/reels/playlist.mp4",
      likes: 178,
      dislikes: 3,
      category: t("protocol"),
      comments: [
        { id: 1, author: "Résident Dr. Lima", avatar: "L", text: "C'est de l'or. Regardé deux fois avant ma rotation en USIN.", time: "il y a 1 jour" },
        { id: 2, author: "Infirmière obstétrique", avatar: "O", text: "Notre équipe a examiné cela ensemble. Très pratique et bien organisé.", time: "il y a 5 jours" },
      ],
    },
  ];

  const [videos, setVideos] = useState<Video[]>(initialVideos);
  const [section, setSection] = useState<"all" | "reels" | "playlist">("all");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [userVotes, setUserVotes] = useState<Record<number, "like" | "dislike" | null>>({});
  const [newComment, setNewComment] = useState("");

  const sectionVideos =
    section === "all"
      ? videos
      : section === "reels"
      ? videos.filter((v) => [7, 8 , 9].includes(v.id))
      : videos.filter((v) => [7].includes(v.id));

  const handleVote = (videoId: number, type: "like" | "dislike") => {
    const current = userVotes[videoId];
    setVideos((prev) =>
      prev.map((v) => {
        if (v.id !== videoId) return v;
        let likes = v.likes;
        let dislikes = v.dislikes;
        if (current === type) {
          // undo
          if (type === "like") likes--;
          else dislikes--;
          setUserVotes((uv) => ({ ...uv, [videoId]: null }));
        } else {
          if (current === "like") likes--;
          if (current === "dislike") dislikes--;
          if (type === "like") likes++;
          else dislikes++;
          setUserVotes((uv) => ({ ...uv, [videoId]: type }));
        }
        // also update selected
        if (selectedVideo?.id === videoId) {
          setSelectedVideo({ ...v, likes, dislikes });
        }
        return { ...v, likes, dislikes };
      })
    );
  };

  const handleAddComment = (videoId: number) => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: Date.now(),
      author: "You",
      avatar: "Y",
      text: newComment.trim(),
      time: "Just now",
    };
    setVideos((prev) =>
      prev.map((v) => {
        if (v.id !== videoId) return v;
        const updated = { ...v, comments: [comment, ...v.comments] };
        if (selectedVideo?.id === videoId) setSelectedVideo(updated);
        return updated;
      })
    );
    setNewComment("");
  };

  const openVideo = (video: Video) => {
    // Get latest state
    const latest = videos.find((v) => v.id === video.id) || video;
    setSelectedVideo(latest);
    document.body.style.overflow = "hidden";
  };

  const closeVideo = () => {
    setSelectedVideo(null);
    document.body.style.overflow = "";
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
            style={{ background: "rgba(192,132,252,0.15)", color: "#7C3AED" }}
          >
            {t("videoLibrary")}
          </span>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, color: "#1e1b4b" }}>
            {t("educational")}
            <span
              style={{
                background: "linear-gradient(135deg, #EC4899, #A855F7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t("videoPlaylist")}
            </span>
          </h1>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm">
            {t("videoDescription")}
          </p>
        </motion.div>

        {/* Section Tabs */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {[
            { key: "all", label: t("allVideos") },
            { key: "reels", label: t("reels") },
            { key: "playlist", label: t("playlist") },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setSection(item.key as "all" | "reels" | "playlist")}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                section === item.key
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Video Grid or Playlist Layout */}
        {section === "playlist" ? (
          <div className="max-w-6xl mx-auto">
            {sectionVideos.map((video) => (
              <div key={video.id} className="bg-white rounded-2xl shadow-sm border border-white overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  {/* Main Video */}
                  <div className="flex-1 p-6">
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={fadeUp}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="bg-white rounded-2xl shadow-sm border border-white overflow-hidden cursor-pointer group hover:shadow-xl transition-all"
                      onClick={() => openVideo(video)}
                    >
                      {/* Thumbnail */}
                      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                        {/* Play button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div
                            className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform"
                            style={{ background: "rgba(255,255,255,0.9)" }}
                          >
                            <Play className="w-6 h-6 ml-1" style={{ color: "#EC4899" }} />
                          </div>
                        </div>
                        {/* Duration */}
                        <div
                          className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-xs text-white font-medium"
                          style={{ background: "rgba(0,0,0,0.7)" }}
                        >
                          {video.duration}
                        </div>
                        {/* Category */}
                        <div
                          className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            background: `${categoryColors[video.category]}ee`,
                            color: "#1e1b4b",
                          }}
                        >
                          {video.category}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-3">{video.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {video.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" />
                            {video.likes}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Episodes */}
                  <div className="lg:w-80 p-6 border-t lg:border-t-0 lg:border-l border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-4">Épisodes</h3>
                    <div className="space-y-3">
                      {video.episodes?.map((episode, index) => (
                        <motion.div
                          key={episode.id}
                          initial="hidden"
                          animate="visible"
                          custom={index}
                          variants={fadeUp}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <div className="relative w-16 h-10 rounded overflow-hidden flex-shrink-0">
                            <img
                              src={episode.thumbnail}
                              alt={episode.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                              <Play className="w-3 h-3 text-white" />
                            </div>
                            <div className="absolute bottom-1 right-1 px-1 py-0.5 rounded text-xs text-white font-medium bg-black/70">
                              {episode.duration}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{episode.title}</h4>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : sectionVideos.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-20">
            {t("noVideos")}
          </div>
          ) : (
            sectionVideos.map((video, i) => (
              <motion.div
              key={video.id}
              initial="hidden"
              animate="visible"
              custom={i}
              variants={fadeUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl shadow-sm border border-white overflow-hidden cursor-pointer group hover:shadow-xl transition-all"
              onClick={() => openVideo(video)}
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform"
                    style={{ background: "rgba(255,255,255,0.9)" }}
                  >
                    <Play className="w-6 h-6 ml-1" style={{ color: "#EC4899" }} />
                  </div>
                </div>
                {/* Duration */}
                <div
                  className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-xs text-white font-medium"
                  style={{ background: "rgba(0,0,0,0.7)" }}
                >
                  {video.duration}
                </div>
                {/* Category */}
                <div
                  className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    background: `${categoryColors[video.category]}ee`,
                    color: "#1e1b4b",
                  }}
                >
                  {video.category}
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-gray-800 mb-1 line-clamp-2 text-sm leading-snug" style={{ fontWeight: 700 }}>
                  {video.title}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-2 mb-3 leading-relaxed">
                  {video.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> {video.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-3.5 h-3.5" /> {video.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5" /> {video.comments.length}
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {video.duration}
                  </span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(15,10,40,0.8)", backdropFilter: "blur(8px)" }}
            onClick={(e) => e.target === e.currentTarget && closeVideo()}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-3xl shadow-2xl w-full overflow-hidden flex flex-col lg:flex-row"
              style={{ maxWidth: "1100px", maxHeight: "90vh" }}
            >
              {/* Left: Video + Info */}
              <div className="flex flex-col flex-1 min-w-0">
                {/* Video player (embed or local) */}
                <div
                  className="relative bg-black"
                  style={{ aspectRatio: "16/9" }}
                >
                  {selectedVideo.localVideoUrl ? (
                    <video
                      key={selectedVideo.id}
                      className="w-full h-full"
                      controls
                      autoPlay
                      src={selectedVideo.localVideoUrl}
                      title={selectedVideo.title}
                    >
                      Votre navigateur ne supporte pas la lecture de vidéos.
                    </video>
                  ) : (
                    <iframe
                      key={selectedVideo.id}
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                      title={selectedVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </div>

                {/* Video info */}
                <div className="p-5 overflow-y-auto flex-1">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span
                        className="inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2"
                        style={{
                          background: `${categoryColors[selectedVideo.category]}33`,
                          color: "#1e1b4b",
                        }}
                      >
                        {selectedVideo.category}
                      </span>
                      <h2 className="text-gray-800" style={{ fontWeight: 700, fontSize: "1rem" }}>
                        {selectedVideo.title}
                      </h2>
                    </div>
                    <button
                      onClick={closeVideo}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
                    >
                      <X className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed mb-4">
                    {selectedVideo.description}
                  </p>

                  {/* Stats + Vote */}
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Eye className="w-3.5 h-3.5" /> {selectedVideo.views} {t("views")}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3.5 h-3.5" /> {selectedVideo.duration}
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      <button
                        onClick={() => handleVote(selectedVideo.id, "like")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          userVotes[selectedVideo.id] === "like"
                            ? "text-white shadow-md"
                            : "bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-500"
                        }`}
                        style={
                          userVotes[selectedVideo.id] === "like"
                            ? { background: "linear-gradient(135deg, #EC4899, #A855F7)" }
                            : {}
                        }
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        {videos.find((v) => v.id === selectedVideo.id)?.likes}
                      </button>
                      <button
                        onClick={() => handleVote(selectedVideo.id, "dislike")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          userVotes[selectedVideo.id] === "dislike"
                            ? "bg-red-100 text-red-500"
                            : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-400"
                        }`}
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                        {videos.find((v) => v.id === selectedVideo.id)?.dislikes}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Comments */}
              <div
                className="w-full lg:w-80 flex flex-col border-t lg:border-t-0 lg:border-l border-gray-100"
                style={{ maxHeight: "90vh" }}
              >
                <div className="p-4 border-b border-gray-100">
                  <h4 className="text-gray-700 flex items-center gap-2" style={{ fontWeight: 700 }}>
                    <MessageCircle className="w-4 h-4" style={{ color: "#A855F7" }} />
                    {t("comments")} ({videos.find((v) => v.id === selectedVideo.id)?.comments.length})
                  </h4>
                </div>

                {/* Comment list */}
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                  {videos
                    .find((v) => v.id === selectedVideo.id)
                    ?.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                          style={{ background: "linear-gradient(135deg, #F9A8D4, #C084FC)" }}
                        >
                          {comment.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs font-semibold text-gray-700">
                              {comment.author}
                            </span>
                            <span className="text-xs text-gray-400">{comment.time}</span>
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Add comment */}
                <div className="p-4 border-t border-gray-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                    placeholder={t("addComment")}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddComment(selectedVideo.id)}
                      className="flex-1 text-xs px-3 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-pink-300 bg-gray-50"
                    />
                    <button
                      onClick={() => handleAddComment(selectedVideo.id)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0 transition-all hover:opacity-90"
                      style={{ background: "linear-gradient(135deg, #EC4899, #A855F7)" }}
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next videos suggestion */}
      <div className="max-w-7xl mx-auto mt-8 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 text-sm text-gray-500 mb-4"
        >
          <ChevronRight className="w-4 h-4" style={{ color: "#A855F7" }} />
          {t("clickCard")}
        </motion.div>
      </div>
    </div>
  );
}
