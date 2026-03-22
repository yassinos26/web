import { useState } from "react";
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

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" },
  }),
};

interface Comment {
  id: number;
  author: string;
  avatar: string;
  text: string;
  time: string;
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
}

const initialVideos: Video[] = [
  {
    id: 1,
    title: "Understanding Neonatal Hypothermia: Causes & Consequences",
    description:
      "An in-depth overview of why newborns are uniquely vulnerable to heat loss and what happens physiologically when body temperature drops below safe levels.",
    thumbnail: "https://images.unsplash.com/photo-1560306580-9e204fe45f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=640",
    duration: "12:34",
    views: "8.4K",
    youtubeId: "WhftvVrEoOc",
    likes: 312,
    dislikes: 8,
    category: "Clinical",
    comments: [
      { id: 1, author: "Nurse Maria", avatar: "M", text: "Very clear explanation! I use this video in our ward training.", time: "2 days ago" },
      { id: 2, author: "Dr. Santos", avatar: "S", text: "Excellent overview. Would love a follow-up on severe hypothermia management.", time: "5 days ago" },
    ],
  },
  {
    id: 2,
    title: "Kangaroo Mother Care: A Life-Saving Technique",
    description:
      "Learn how skin-to-skin kangaroo care immediately after birth prevents hypothermia, supports bonding, and dramatically improves neonatal outcomes — especially for low-birthweight babies.",
    thumbnail: "https://images.unsplash.com/photo-1761891918492-371b950ee818?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=640",
    duration: "18:02",
    views: "36k",
    youtubeId: "6dQ3poY6qts",
    likes: 866,
    dislikes: 1,
    category: "Puericulture",
    comments: [
      { id: 1, author: "Ana Ferreira", avatar: "A", text: "This helped me understand kangaroo care so much better!", time: "1 day ago" },
      { id: 2, author: "Student Nurse J.", avatar: "J", text: "I shared this with our entire nursing cohort. Amazing resource.", time: "3 days ago" },
      { id: 3, author: "Midwife Paula", avatar: "P", text: "We've implemented this in our maternity ward and the results are incredible.", time: "1 week ago" },
    ],
  },
  {
    id: 3,
    title: "Temperature Monitoring in the NICU: Best Practices",
    description:
      "A practical guide for NICU nurses on continuous temperature monitoring, incubator settings, radiant warmers, and recognizing early signs of thermal instability in premature infants.",
    thumbnail: "https://images.unsplash.com/photo-1576089275954-40cd98bfcfdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=640",
    duration: "22:18",
    views: "6.1K",
    youtubeId: "klwmCoLiLZI",
    likes: 204,
    dislikes: 5,
    category: "NICU",
    comments: [
      { id: 1, author: "NICU Nurse Roberto", avatar: "R", text: "This should be mandatory training for all NICU staff.", time: "4 days ago" },
    ],
  },
  {
    id: 4,
    title: "Home Care Guide: Keeping Your Newborn Warm",
    description:
      "Practical tips for new parents on maintaining a safe thermal environment at home — room temperature, clothing layers, swaddling techniques, and warning signs to watch for.",
    thumbnail: "https://images.unsplash.com/photo-1765896387377-e293914d1e69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=640",
    duration: "9:47",
    views: "21.3K",
    youtubeId: "dQw4w9WgXcQ",
    likes: 831,
    dislikes: 19,
    category: "Family Education",
    comments: [
      { id: 1, author: "New Mom Carla", avatar: "C", text: "This video gave me so much peace of mind! Thank you!", time: "6 hours ago" },
      { id: 2, author: "Dad of Twins", avatar: "D", text: "Clear and reassuring. Exactly what I needed as a first-time parent.", time: "2 days ago" },
      { id: 3, author: "Grandma Teresa", avatar: "T", text: "I sent this to my daughter when she came home from the hospital!", time: "3 days ago" },
    ],
  },
  {
    id: 5,
    title: "Neonatal Resuscitation & Thermal Stabilization Protocol",
    description:
      "Step-by-step walkthrough of the thermal stabilization protocol during neonatal resuscitation, including polyethylene wraps, warm delivery rooms, and the importance of the golden hour.",
    thumbnail: "https://images.unsplash.com/photo-1676552055618-22ec8cde399a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=640",
    duration: "28:45",
    views: "4.8K",
    youtubeId: "dQw4w9WgXcQ",
    likes: 178,
    dislikes: 3,
    category: "Protocol",
    comments: [
      { id: 1, author: "Resident Dr. Lima", avatar: "L", text: "This is gold. Watched it twice before my NICU rotation.", time: "1 day ago" },
      { id: 2, author: "Obstetrics Nurse", avatar: "O", text: "Our team reviewed this together. Very practical and well-organized.", time: "5 days ago" },
    ],
  },
];

const categoryColors: Record<string, string> = {
  Clinical: "#F9A8D4",
  Puericulture: "#86EFAC",
  NICU: "#93C5FD",
  "Family Education": "#FDBA74",
  Protocol: "#C4B5FD",
};

export function Videos() {
  const [videos, setVideos] = useState<Video[]>(initialVideos);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [userVotes, setUserVotes] = useState<Record<number, "like" | "dislike" | null>>({});
  const [newComment, setNewComment] = useState("");

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
            Video Library
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
              Video Playlist
            </span>
          </h1>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm">
            Watch our curated videos on neonatal hypothermia prevention, puericulture techniques,
            and clinical protocols. Click any video to watch.
          </p>
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, i) => (
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
          ))}
        </div>
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
                {/* Video player (embed) */}
                <div
                  className="relative bg-black"
                  style={{ aspectRatio: "16/9" }}
                >
                  <iframe
                    key={selectedVideo.id}
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                    title={selectedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
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
                      <Eye className="w-3.5 h-3.5" /> {selectedVideo.views} views
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
                    Comments ({videos.find((v) => v.id === selectedVideo.id)?.comments.length})
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
                      placeholder="Add a comment..."
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
          Click any video card to open the full player with comments
        </motion.div>
      </div>
    </div>
  );
}
