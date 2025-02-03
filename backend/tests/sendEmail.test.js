const nodemailer = require("nodemailer");
require("dotenv").config(); // Se precisar carregar variáveis do .env

describe("Teste de envio de e-mail", () => {
  console.log(process.env.EMAIL_USER)
  console.log(process.env.EMAIL_PASS)
  it("Deve enviar um e-mail de teste", async () => {
    const transporter = nodemailer.createTransport({
        service: "gmail", // Ou outro serviço SMTP que você estiver usando
        auth: {
          user: process.env.EMAIL_USER, 
          pass: process.env.EMAIL_PASS, 
        },
      });

    const mailOptions = {
      from: '"Sistema de Teste" <evateste14@gmail.com>',
      to: "evateste14@gmail.com", // Altere para seu e-mail real
      subject: "Teste de Envio de E-mail",
      text: "Este é um e-mail de teste enviado pelo Jest.",
      html: "<p>Este é um <b>e-mail de teste</b> enviado pelo Jest.</p>",
    };

    const response = await transporter.sendMail(mailOptions);

    console.log("E-mail enviado: ", response.messageId);
    
    expect(response.messageId).toBeDefined();
  });
});
