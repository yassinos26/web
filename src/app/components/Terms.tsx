import { motion } from "motion/react";
import { FileText, ArrowLeft } from "lucide-react";
import { NavLink } from "react-router";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #F9A8D4, #C084FC)" }}
            >
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Terms of Use</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using our website and services.
          </p>
          <NavLink
            to="/"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 text-sm text-gray-500 hover:text-pink-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </NavLink>
        </motion.div>

        {/* Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
          className="bg-white rounded-2xl shadow-sm border border-pink-50 p-8"
        >
          <div className="prose prose-pink max-w-none">
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you accept and agree to be bound by the terms
              and provision of this agreement.
            </p>

            <h2>Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials on our website
              for personal, non-commercial transitory viewing only. This is the grant of a license,
              not a transfer of title.
            </p>

            <h2>Disclaimer</h2>
            <p>
              The materials on our website are provided on an 'as is' basis. We make no warranties,
              expressed or implied, and hereby disclaim and negate all other warranties including
              without limitation, implied warranties or conditions of merchantability, fitness for
              a particular purpose, or non-infringement of intellectual property or other violation
              of rights.
            </p>

            <h2>Limitations</h2>
            <p>
              In no event shall we or our suppliers be liable for any damages (including, without
              limitation, damages for loss of data or profit, or due to business interruption)
              arising out of the use or inability to use the materials on our website.
            </p>

            <h2>Accuracy of Materials</h2>
            <p>
              The materials appearing on our website could include technical, typographical, or
              photographic errors. We do not warrant that any of the materials on its website are
              accurate, complete, or current.
            </p>

            <h2>Links</h2>
            <p>
              We have not reviewed all of the sites linked to its website and are not responsible
              for the contents of any such linked site.
            </p>

            <h2>Modifications</h2>
            <p>
              We may revise these terms of service for its website at any time without notice.
              By using this website you are agreeing to be bound by the then current version of
              these terms of service.
            </p>

            <h2>Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the
              laws of Tunisia and you irrevocably submit to the exclusive jurisdiction of the
              courts in that state or location.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}