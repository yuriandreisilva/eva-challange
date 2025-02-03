require("dotenv").config();
const nodemailer = require("nodemailer");

async function sendEmail(emailContent) {
  console.log('here', emailContent)
  const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    auth: {
      user: "apikey",
      pass: process.env.SENDGRID_API_KEY,
    },
  });

  try {
    const result = await transporter.sendMail(emailContent);
    console.log("E-mail enviado:", result);
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    throw new Error("Falha ao enviar e-mail");
  }
}

module.exports = sendEmail;

sendEmail({
  from: process.env.EMAIL_USER,
  to: "evateste14@gmail.com",
  subject: "Assunto do E-mail",
  text: "Texto simples",
  html: "<p>Conteúdo em HTML</p>",
});
