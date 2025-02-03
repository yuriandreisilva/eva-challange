require('dotenv').config(); 
const Bull = require('bull');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const { PENDING, COMPLETED } = require('../services/collaboratorHasJourneyService');
const CollaboratorHasJourney = require('../models/CollaboratorHasJourney');
const JourneyHasAction = require('../models/JourneyHasAction'); 

const emailQueue = new Bull('emailQueue', {
  redis: { host: 'localhost', port: 6380 },
});

emailQueue.on('active', (job) => {
  console.log(`Job ${job.id} está ativo`);
});

async function sendEmail(emailContent) {
  console.log('here', emailContent, process.env.SENDGRID_API_KEY)
  const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    auth: {
      user: "apikey",
      pass: process.env.SENDGRID_API_KEY
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

async function connectToMongoDB() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://admin:admin@localhost:27019';
  const options = { serverSelectionTimeoutMS: 10000 };

  try {
    await mongoose.connect(mongoUri, options);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}

async function processJob(job) {
  try {
    console.log('Entrando no processJob');
    const { collaboratorId, journeyId, emailContent } = job.data;
    
    // Ensure MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      await connectToMongoDB();
    }

    console.log('1 - Enviando e-mail');
    console.log('emailContent no Worker', emailContent);
    await sendEmail(emailContent); // Ensure emailContent is correctly structured
    
    console.log('2 - Atualizando status para COMPLETED');
    // Atualiza o status da jornada para "COMPLETED"
    await CollaboratorHasJourney.findOneAndUpdate(
      { journey_id: journeyId, collaborator_id: collaboratorId },
      { $set: { status: COMPLETED } }
    );
    
    console.log('3 - Job processado com sucesso');
  } catch (error) {
    console.error("Erro no job:", error);
  }
}

// Configuração do Worker para processar os jobs da fila
emailQueue.process(async (job) => {
  console.log('Processando job:', job.id);
  await processJob(job);
});

// Worker em execução
emailQueue.on('completed', (job) => {
  console.log(`Job ${job.id} completado com sucesso`);
});

emailQueue.on('failed', (job, err) => {
  console.log(`Job ${job.id} falhou: ${err.message}`);
});

module.exports = {
  processJob
};
