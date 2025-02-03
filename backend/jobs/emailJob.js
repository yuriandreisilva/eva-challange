const moment = require('moment');
const { emailQueue } = require('../queue'); 

const createJob = async (
  collaboratorId, 
  journeyId,
  actionId,
  emailContent, 
  dateBegin) => {
  try {
    console.log(`Adicionando job para collaboratorId: ${collaboratorId}, journeyId: ${journeyId}, actionId: ${actionId}`);
    const job = await emailQueue.add({
      collaboratorId,
      journeyId,
      actionId,
      emailContent, 
      dateBegin
    });
    console.log(`Job ${job.id} adicionado à fila`);
  } catch (error) {
    console.error("Erro ao adicionar job à fila:", error);
  }
};

const scheduleEmailJob = async (
  collaboratorId, 
  journeyId,
  actionId,
  emailContent, 
  dateBegin
) => {
  const now = moment();
  const startTime = moment(dateBegin);

  let delay = startTime.diff(now); 
  
  if (delay < 0) delay = 0;

  try {
    console.log(`Agendando job para collaboratorId: ${collaboratorId}, journeyId: ${journeyId}, actionId: ${actionId} com delay de ${delay} ms`);
    console.log('emailContent', await emailContent)
    const content = await emailContent;
    const job = await emailQueue.add(
      {
        collaboratorId,
        journeyId,
        actionId,
        emailContent: content,
      },
      {
        delay, 
      }
    );
    console.log(`Job ${job.id} agendado para ${dateBegin} (em ${delay} ms)`);
  } catch (error) {
    console.error("Erro ao agendar job:", error);
  }
};

module.exports = {
  scheduleEmailJob,
  createJob
};

