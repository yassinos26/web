import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Translation resources
const resources = {
  en: {
    translation: {
      home: "Home",
      members: "Members",
      videos: "Videos",
      guide: "Guide",
      support: "Support Baby",
      contact: "Contact",
      // Home
      heroTitle1: "Protecting",
      heroTitle2: "Every Newborn",
      heroSubline: "from Hypothermia",
      heroText: "Neonatal hypothermia is a leading — and largely preventable — cause of newborn deaths worldwide.",
      exploreResources: "Explore Resources",
      watchVideos: "Watch Videos",
      // Members
      ourTeam: "Our Team",
      meetSpecialists: "Meet the Specialists",
      memberDescription: "Our multidisciplinary team dedicated to reducing neonatal hypothermia.",
      wantJoin: "Want to Join Our Team?",
      joinDescription: "We welcome healthcare professionals and educators who are passionate about neonatal health.",
      getInTouch: "Get in Touch",
      // Contact
      sendMessage: "Send us a Message",
      fullName: "Full Name *",
      emailAddress: "Email Address *",
      subject: "Subject *",
      message: "Message *",
      send: "Send Message",
      messageSent: "Message Sent!",
      thankYou: "Thank you for reaching out. Our team will get back to you within 24 hours.",
      sendAnother: "Send Another Message",
      // Support baby
      helpPrevent: "Help prevent neonatal hypothermia",
      supportDescription: "Your support makes education and awareness possible.",
      donate: "Donate",
      share: "Share",
      collaborate: "Collaborate",
      contactUs: "Contact Us",
      // Videos
      videoLibrary: "Video Library",
      educational: "Educational",
      videoDescription: "Watch our curated videos on neonatal hypothermia prevention, puericulture techniques, and clinical protocols. Click any video to watch.",
      allVideos: "All",
      reels: "Reels",
      playlist: "Playlist",
      noVideos: "No videos in this section.",
      clickCard: "Click any video card to open the full player with comments",
      // Guide
      needCustom: "Need a Custom Resource?",
      customResourceDescription: "Our team can develop tailored educational materials for your institution, community program, or healthcare training needs.",
      // Contact
      contactDescription: "Have questions about neonatal hypothermia, our educational resources, or want to collaborate? We'd love to hear from you.",
      sending: "Sending...",
      ourLocation: "Our Location",
      connectWithUs: "Connect With Us",
      medicalEmergency: "Medical Emergency?",
      emergencyAdvice: "If you suspect your newborn has hypothermia, call emergency services immediately or go to the nearest hospital. This website is for educational purposes only and does not replace professional medical advice.",
    },
  },
  fr: {
    translation: {
      home: "Accueil",
      members: "Membres",
      videos: "Vidéos",
      guide: "Guide",
      support: "Support Bébé",
      contact: "Contact",
      // Home
      heroTitle1: "Protéger",
      heroTitle2: "Chaque nouveau-né",
      heroSubline: "de l'hypothermie",
      heroText: "L'hypothermie néonatale est une cause majeure et largement évitable de décès néonatals dans le monde.",
      exploreResources: "Explorer les ressources",
      watchVideos: "Regarder les vidéos",
      // Members
      ourTeam: "Notre équipe",
      meetSpecialists: "Rencontrez les spécialistes",
      memberDescription: "Notre équipe multidisciplinaire dédiée à la réduction de l'hypothermie néonatale.",
      wantJoin: "Vous souhaitez rejoindre notre équipe ?",
      joinDescription: "Nous accueillons les professionnels de santé et les éducateurs passionnés par la santé néonatale.",
      getInTouch: "Contactez-nous",
      // Guide
      learningResources: "Ressources d'apprentissage",
      educationalGuide: "Guide éducatif",
      resourcesDescription: "Accédez à notre bibliothèque de ressources sur l'hypothermie néonatale.",
      textArticles: "Articles texte",
      pdfResources: "Ressources PDF",
      presentations: "Présentations",
      searchPlaceholder: "Rechercher des ressources...",
      // Contact
      sendMessage: "Envoyez-nous un message",
      fullName: "Nom complet *",
      emailAddress: "Adresse e-mail *",
      subject: "Sujet *",
      message: "Message *",
      send: "Envoyer le message",
      messageSent: "Message envoyé !",
      thankYou: "Merci de nous contacter. Notre équipe vous répondra sous 24 heures.",
      sendAnother: "Envoyer un autre message",
      // Support baby
      helpPrevent: "Aidez à prévenir l'hypothermie néonatale",
      supportDescription: "Votre soutien rend l'éducation et la sensibilisation possibles.",
      donate: "Donner",
      share: "Partager",
      collaborate: "Collaborer",
      contactUs: "Contactez-nous",
      // Videos
      videoLibrary: "Bibliothèque vidéo",
      educational: "Éducatif",
      videoDescription: "Regardez nos vidéos sélectionnées sur la prévention de l'hypothermie néonatale, les techniques de puériculture et les protocoles cliniques. Cliquez sur une vidéo pour la regarder.",
      allVideos: "Tous",
      reels: "Reels",
      playlist: "Playlist",
      noVideos: "Aucune vidéo dans cette section.",
      clickCard: "Cliquez sur une vignette pour ouvrir le lecteur complet avec commentaires",
      // Guide
      needCustom: "Besoin d'une ressource personnalisée ?",
      customResourceDescription: "Notre équipe peut développer des supports éducatifs adaptés à votre institution, programme communautaire ou besoins de formation en santé.",
      // Contact
      contactDescription: "Vous avez des questions sur l'hypothermie néonatale, nos ressources éducatives, ou souhaitez collaborer ? Nous serions ravis de vous aider.",
      sending: "En cours d'envoi...",
      ourLocation: "Notre emplacement",
      connectWithUs: "Connectez-vous avec nous",
      medicalEmergency: "Urgence médicale ?",
      emergencyAdvice: "Si vous suspectez que votre nouveau-né a une hypothermie, appelez immédiatement les services d'urgence ou rendez-vous à l'hôpital le plus proche. Ce site est uniquement à des fins éducatives et ne remplace pas un avis médical professionnel.",
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "fr", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;