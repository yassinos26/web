import { motion } from "motion/react";
import { Heart, Baby, HandHeart } from "lucide-react";

export function SupportBaby() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6"
          style={{ background: "rgba(249,168,212,0.2)", color: "#BE185D" }}
        >
          <Baby className="w-4 h-4" />
          Support Baby
        </motion.div>

        <h1 className="text-4xl font-black mb-4" style={{ color: "#1e1b4b" }}>
          Aidez à prévenir l’hypothermie néonatale
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          Votre soutien rend l’éducation et la sensibilisation possibles. Rejoignez notre mission
          pour offrir des ressources de qualité aux familles et aux professionnels de santé.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl p-5 border border-pink-100 shadow-sm bg-white">
            <div className="text-3xl">💖</div>
            <h2 className="mt-3 font-semibold">Don</h2>
            <p className="text-sm text-gray-500">Contribuez pour financer du matériel et des formations.</p>
          </div>
          <div className="rounded-2xl p-5 border border-pink-100 shadow-sm bg-white">
            <div className="text-3xl">📘</div>
            <h2 className="mt-3 font-semibold">Partager</h2>
            <p className="text-sm text-gray-500">Diffusez nos guides et vidéos afin d’atteindre plus de familles.</p>
          </div>
          <div className="rounded-2xl p-5 border border-pink-100 shadow-sm bg-white">
            <div className="text-3xl">🤝</div>
            <h2 className="mt-3 font-semibold">Collaborer</h2>
            <p className="text-sm text-gray-500">Travaillez avec nos équipes pour améliorer les ressources disponibles.</p>
          </div>
        </div>

        <div className="mt-10 inline-flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium"
            style={{ background: "linear-gradient(135deg, #EC4899, #A855F7)" }}
          >
            <Heart className="w-4 h-4" /> Contactez-nous
          </a>
          <a
            href="/guide"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-pink-200 text-pink-600"
          >
            <HandHeart className="w-4 h-4" /> En savoir plus
          </a>
        </div>
      </div>
    </div>
  );
}
