const nodemailer = require("nodemailer");
require("dotenv").config();

describe("Teste de envio de e-mail", () => {
  it("Deve enviar um e-mail de teste usando SendGrid", async () => {
    const transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY,
      },
    });

    const mailOptions = {
      from: '"Sistema de Teste" <evateste14@gmail.com>',
      to: process.env.EMAIL_TO_RECEIVE || "lucas@evacopilot.com.br",
      subject: "Teste de Envio de E-mail",
      text: "Este é um e-mail de teste enviado pelo Jest.",
      html: "<p>Este é um <b>e-mail de teste</b> enviado pelo Jest.</p>",
    };

    const response = await transporter.sendMail(mailOptions);

    console.log("E-mail enviado: ", response.messageId);
    
    expect(response.messageId).toBeDefined();
  }, 10000);
});
