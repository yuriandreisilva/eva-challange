const nodemailer = require("nodemailer");
require("dotenv").config();

class EmailService {
  static async sendEmail({ to, subject, text, html }) {
    const transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: "apikey", 
        pass: process.env.SENDGRID_API_KEY, 
      },
    });

    const mailOptions = {
      from: `"Seu Nome" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    await transporter.sendMail(mailOptions);
  }
}

module.exports = EmailService;
