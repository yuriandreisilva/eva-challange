const { emailQueue } = require("./queue");
const { processJob } = require("./workers/emailWorker");

emailQueue.process(async (job) => {
  console.log('Iniciando processamento do job:', job.id);
  await processJob(job);
  console.log('Job processado:', job.id);
});

emailQueue.on('error', (error) => {
  console.error("Erro na fila:", error);
});

emailQueue.on('waiting', (jobId) => {
  console.log(`Job ${jobId} está aguardando para ser processado`);
});

emailQueue.on('active', (job) => {
  console.log(`Job ${job.id} está ativo`);
});

emailQueue.on('completed', (job) => {
  console.log(`Job ${job.id} foi concluído`);
});

emailQueue.on('failed', (job, err) => {
  console.log(`Job ${job.id} falhou com o erro: ${err.message}`);
});

console.log("📌 Processador de jobs iniciado!");
