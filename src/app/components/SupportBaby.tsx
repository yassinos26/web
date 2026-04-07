import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { Heart, Baby, HandHeart, CreditCard, CheckCircle } from "lucide-react";

export function SupportBaby() {
  const { t } = useTranslation();
  const [donationForm, setDonationForm] = useState({
    fullName: "",
    ribNumber: "",
    amount: ""
  });
  const [donationSubmitted, setDonationSubmitted] = useState(false);
  const [donationLoading, setDonationLoading] = useState(false);
  const [donationError, setDonationError] = useState("");

  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDonationError("");

    // Validation
    if (parseFloat(donationForm.amount) < 1) {
      setDonationError(t("minimumAmount"));
      return;
    }

    if (donationForm.ribNumber.length < 20) {
      setDonationError(t("invalidRib"));
      return;
    }

    setDonationLoading(true);

    try {
      // Ici vous pouvez ajouter l'appel API pour traiter le don
      // Pour l'instant, on simule un succès
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setDonationSubmitted(true);
      setDonationForm({ fullName: "", ribNumber: "", amount: "" });
    } catch (err) {
      console.error(err);
      setDonationError(t("donationError"));
    } finally {
      setDonationLoading(false);
    }
  };
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
          {t("support")}
        </motion.div>

        <h1 className="text-4xl font-black mb-4" style={{ color: "#1e1b4b" }}>
          {t("helpPrevent")}
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          {t("supportDescription")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl p-5 border border-pink-100 shadow-sm bg-white">
            <div className="text-3xl">💖</div>
            <h2 className="mt-3 font-semibold">{t("donate")}</h2>
            <p className="text-sm text-gray-500">{t("donate")}</p>
          </div>
          <div className="rounded-2xl p-5 border border-pink-100 shadow-sm bg-white">
            <div className="text-3xl">📘</div>
            <h2 className="mt-3 font-semibold">{t("share")}</h2>
            <p className="text-sm text-gray-500">{t("share")}</p>
          </div>
          <div className="rounded-2xl p-5 border border-pink-100 shadow-sm bg-white">
            <div className="text-3xl">🤝</div>
            <h2 className="mt-3 font-semibold">{t("collaborate")}</h2>
            <p className="text-sm text-gray-500">{t("collaborate")}</p>
          </div>
        </div>

        {/* Donation Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 bg-white rounded-3xl p-8 shadow-sm border border-white max-w-2xl mx-auto"
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
                 style={{ background: "linear-gradient(135deg, #EC4899, #A855F7)" }}>
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: "#1e1b4b" }}>
              {t("donationFormTitle")}
            </h2>
            <p className="text-gray-600 text-sm">
              {t("donationDescription")}
            </p>
          </div>

          {donationSubmitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-8 text-center"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "linear-gradient(135deg, #86EFAC, #34D399)" }}
              >
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-gray-700 mb-2 font-semibold">
                {t("donationSuccess")}
              </h3>
              <p className="text-gray-500 text-sm">
                {t("donationSuccessText")}
              </p>
              <button
                onClick={() => setDonationSubmitted(false)}
                className="mt-4 px-5 py-2.5 rounded-full text-sm text-white font-medium"
                style={{ background: "linear-gradient(135deg, #EC4899, #A855F7)" }}
              >
                {t("donateAnother")}
              </button>
            </motion.div>
          ) : (
            <>
              {donationError && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
                  <p className="text-red-600 text-sm">{donationError}</p>
                </div>
              )}
              
              <form onSubmit={handleDonationSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("fullNameDonation")}
                  </label>
                  <input
                    type="text"
                    required
                    value={donationForm.fullName}
                    onChange={(e) => setDonationForm({ ...donationForm, fullName: e.target.value })}
                    placeholder={t("fullNamePlaceholder")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("ribNumber")}
                  </label>
                  <input
                    type="text"
                    required
                    value={donationForm.ribNumber}
                    onChange={(e) => setDonationForm({ ...donationForm, ribNumber: e.target.value.replace(/\D/g, '') })}
                    placeholder={t("ribPlaceholder")}
                    maxLength={24}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 focus:bg-white transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {t("ribHint")}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("donationAmount")}
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    step="0.01"
                    value={donationForm.amount}
                    onChange={(e) => setDonationForm({ ...donationForm, amount: e.target.value })}
                    placeholder={t("amountPlaceholder")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 focus:bg-white transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {t("amountHint")}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={donationLoading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 hover:shadow-xl disabled:opacity-70"
                  style={{ background: "linear-gradient(135deg, #EC4899, #A855F7)" }}
                >
                  {donationLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      {t("processingDonation")}
                    </>
                  ) : (
                    <>
                      <Heart className="w-4 h-4" />
                      {t("submitDonation")}
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </motion.div>

        <div className="mt-10 inline-flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium"
            style={{ background: "linear-gradient(135deg, #EC4899, #A855F7)" }}
          >
            <Heart className="w-4 h-4" /> {t("contactUs")}
          </a>
          <a
            href="/guide"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-pink-200 text-pink-600"
          >
            <HandHeart className="w-4 h-4" /> {t("exploreResources")}
          </a>
        </div>
      </div>
    </div>
  );
}
