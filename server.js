import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(express.json());

// Remplace ces valeurs par tes infos / credentials
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ton.email@gmail.com", // ton email provider
    pass: "ton-app-password-ou-oauth-token", // mot de passe application
  },
});

app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "Veuillez remplir tous les champs" });
  }

  try {
    await transporter.sendMail({
      from: `${name} <${email}>`,
      to: "yassine.250mellouli@gmail.com",
      subject: `[Site] ${subject}`,
      text: `Nom: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return res.json({ ok: true, message: "Email envoyé" });
  } catch (err) {
    console.error("Erreur envoi email", err);
    return res.status(500).json({ error: "Impossible d'envoyer l'email" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Contact server running on http://localhost:${PORT}`);
});