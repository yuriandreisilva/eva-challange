const Queue = require("bull");

const emailQueue = new Queue("emailQueue", {
  redis: { 
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6380,
    maxRetriesPerRequest: 50
  },
});

console.log("Queue configuration:", emailQueue);

emailQueue.on('error', (error) => {
  console.error("Erro na fila:", error);
});

emailQueue.on('waiting', (jobId) => {
  console.log(`Job ${jobId} está aguardando para ser processado`);
});

emailQueue.on('active', (job) => {
  console.log(`Job ${job.id} está ativo`);
});

module.exports = { emailQueue };
