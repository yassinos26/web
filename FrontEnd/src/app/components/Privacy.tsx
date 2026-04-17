import { motion } from "motion/react";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { NavLink } from "react-router";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function Privacy() {
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
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Privacy Policy</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
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
            <h2>Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account,
              contact us, or use our services. This may include:
            </p>
            <ul>
              <li>Name and contact information</li>
              <li>Usage data and analytics</li>
              <li>Device and browser information</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul>
              <li>Provide and improve our services</li>
              <li>Communicate with you</li>
              <li>Ensure security and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties
              without your consent, except as described in this policy or required by law.
            </p>

            <h2>Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against
              unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2>Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal information.
              Contact us if you wish to exercise these rights.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes
              by posting the new policy on this page.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this privacy policy, please contact us at:
              louhichisirine50@gmail.com
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}