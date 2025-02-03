const Queue = require("bull");
const emailQueue = new Queue("emailQueue", {
  redis: { host: "redis", port: 6380 },
});
const EmailService = require("../services/EmailService");

describe("Testando envio real de e-mail com fila", () => {
  beforeAll(() => {
    emailQueue.process(async (job, done) => {
      await EmailService.sendEmail(job.data);
      done();
    });
  });

  afterAll(async () => {
    await emailQueue.close();
  });

  it("Deve enviar um e-mail real", async () => {
    const emailData = {
      to: "evateste14@gmail.com.com",  // Coloque um e-mail real para testar
      subject: "Teste de envio de e-mail",
      text: "Este é um teste real de envio de e-mail via BullJS",
      html: "<p>Este é um teste real de envio de e-mail via <strong>BullJS</strong></p>",
    };

    const job = await emailQueue.add(emailData);

    // Aguarda o job ser processado
    await new Promise((resolve) => setTimeout(resolve, 55000));

    expect(job.id).toBeDefined();
  });
});
