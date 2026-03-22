import { motion } from "motion/react";
import { Linkedin, Mail, Award,  GraduationCap, Instagram, Facebook } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" },
  }),
};

const members = [
  {
    name: "Dr. Sirine Louhichi",
    role: "Pediatric & Neonatology nurse",
    specialty: "Puericulture",
    bio: "Over 2 years of experience in neonatal medicine, specializing in premature infant thermoregulation and evidence-based thermal care protocols.",
    image: "dist/assets/sirine-bio.jpg",
    tags: ["NICU", "Thermoregulation", "pretherm infants"],
  },
  {
    name: "Dr. Oussema Mghribi",
    role: "Neonatologist",
    specialty: "Neonatalogy",
    bio: "Qualified Professor & neonatologist doctor , Over 7 years of experience in neonatal services.",
    image: "",
    color: "#A5B4FC",
    tags: ["Central catheter", "FMSO", "ESSTSSo", "Ecography"],
  },
  {
    name: "Dr. Sirine Soui",
    role: "Paramedical Professor & Previous Pediatric Nurse ",
    specialty: "Pediatric Nurse",
    bio: "Over 18 years of experience in neonatal medicine, specializing in Central catheter & premature infant care.",
    image: "",
    color: "#86EFAC",
    tags: ["NICU", "Intership-Supervisor", "Parental Education" , "Phototherapy"],
  },
  {
    name: "Dr. Amal Fteiti",
    role: "Pediatric & Neonatology nurse",
    specialty: "Puericulture",
    bio: "Over 2 years of experience in neonatal medicine, specializing in premature infant thermoregulation and evidence-based thermal care protocols.",
    image: "",
    tags: ["NICU", "Thermoregulation", "pretherm infants"],
  },
];

export function Members() {
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
            Our Team
          </span>
          <h1
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, color: "#1e1b4b" }}
          >
            Meet the{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #EC4899, #A855F7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Specialists
            </span>
          </h1>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
            Our multidisciplinary team of neonatologists, nurses, educators, and researchers are
            dedicated to reducing neonatal hypothermia through education and evidence-based practice.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, i) => (
            <motion.div
              key={member.name}
              initial="hidden"
              animate="visible"
              custom={i}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="bg-white rounded-3xl shadow-sm border border-white overflow-hidden group hover:shadow-xl transition-all"
            >
              {/* Image area */}
              <div className="relative overflow-hidden" style={{ height: 260 }}>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)`,
                  }}
                />
                {/* Tags */}
                <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                  {member.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-white text-xs font-medium"
                      style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-gray-800" style={{ fontWeight: 700 }}>
                      {member.name}
                    </h3>
                    <p
                      className="text-sm font-semibold"
                      style={{
                        background: "linear-gradient(135deg, #EC4899, #A855F7)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {member.role}
                    </p>
                  </div>
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: `${member.color}33` }}
                  >
                    <GraduationCap className="w-4 h-4" style={{ color: member.color }} />
                  </div>
                </div>

                <div className="flex items-center gap-1.5 mb-3">
                  <Award className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-400">{member.specialty}</span>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed mb-4">{member.bio}</p>

                {/* Social links */}
                <div className="flex gap-2">
                  {[
                    { icon: Linkedin, color: "#0A66C2" },
                    { icon: Instagram, color: "#d808ce" },
                    { icon: Mail, color: "#fc2020" },
                    { icon: Facebook, color: "#0905fc" },
                    
                  ].map(({ icon: Icon, color }, idx) => (
                    <button
                      key={idx}
                      className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-100 hover:border-pink-200 hover:bg-pink-50 transition-colors"
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color }} />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center rounded-3xl p-12"
          style={{ background: "linear-gradient(135deg, rgba(249,168,212,0.15), rgba(192,132,252,0.15))" }}
        >
          <h2 className="mb-3" style={{ fontWeight: 800, color: "#1e1b4b", fontSize: "1.5rem" }}>
            Want to Join Our Team?
          </h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto mb-6">
            We welcome healthcare professionals, researchers, and educators who are passionate about
            neonatal health and puericulture education.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold transition-all hover:opacity-90 hover:shadow-xl"
            style={{ background: "linear-gradient(135deg, #EC4899, #A855F7)" }}
          >
            <Mail className="w-4 h-4" /> Get in Touch
          </a>
        </motion.div>
      </div>
    </div>
  );
}
