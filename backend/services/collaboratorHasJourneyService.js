const { emailQueue } = require('../queue');
const emailJob = require('../jobs/emailJob');

const CollaboratorHasJourney = require("../models/CollaboratorHasJourney");
const Collaborator = require("../models/Collaborator");
const JourneyHasActionService = require("../services/journeyHasActionService");
const ActionService = require('./actionService');

module.exports = {
  PENDING: 0, // Status inicial: pendente
  IN_PROGRESS: 1, // Envio de e-mail em andamento
  COMPLETED: 2, // E-mail enviado com sucesso
};  

class CollaboratorHasJourneyService {
  static async create(data) {
    console.log(`Criando jornada para collaboratorId: ${data.collaborator_id}, journeyId: ${data.journey_id}`);
    const { error } = CollaboratorHasJourney.validateData(data);
    if (error) throw new Error(error.details[0].message);

    const existingRecord = await CollaboratorHasJourney.findOne({
      collaborator_id: data.collaborator_id,
      journey_id: data.journey_id
    });

    if (existingRecord) {
      const err = new Error("Este colaborador já está associado a esta jornada.");
      err.status = 409;
      throw err;
    }

    const collaboratorHasJourney = await CollaboratorHasJourney.create(data);

    const collaborator = await Collaborator.findById(collaboratorHasJourney.collaborator_id);

    const actions = await this.getActionsByJourneyId(data.journey_id);
    
    actions.forEach(async (action) => {
      const content = this.getContentEmail(collaborator, action);

      await emailJob.scheduleEmailJob(
        data.collaborator_id,
        data.journey_id,
        action._id, 
        content, 
        data.date_begin
      );
    });

    return collaboratorHasJourney;
  }

  static async getActionsByJourneyId(id) {
    const journeysHasActions = await JourneyHasActionService.getAllByJourneyId(id);

    if (journeysHasActions && journeysHasActions.length > 0) {
      const actions = await Promise.all(
        journeysHasActions.map(async (journeyHasAction) => {
          return await ActionService.getById(journeyHasAction.action_id);
        })
      );

      return actions;
    }
  }

  static async getContentEmail(collaborator, action) {
    const { email, name } = collaborator;

    const subject = `Nova ação para sua jornada`;
    const text = `Olá ${name},\n\nHoje é dia de executar a ação: "${action.name}"`;
    const html =  `<p>${action.description}</p>`;

    return {
      from: process.env.EMAIL_USER,
      to: 'yuriandreiod@gmail.com',
      subject,
      text,
      html
    }
  }
  
  static async getJourneysHasActionsByJourneyId(id) {
    return await JourneyHasActionService.getAllByJourneyId(id);
  }

  static async getByJourneyIdAndCollaboratorId(journey_id, collaborator_id) {
    return await CollaboratorHasJourney.find({
      journey_id,
      collaborator_id
    });
  }

  static async getAll() {
    return await CollaboratorHasJourney.find().populate("journey_id").populate("collaborator_id");
  }

  static async getById(id) {
    return await CollaboratorHasJourney.findById(id).populate("journey_id").populate("collaborator_id");
  }

  static async update(id, data) {
    const { error } = CollaboratorHasJourney.validateData(data);
    if (error) throw new Error(error.details[0].message);

    return await CollaboratorHasJourney.findByIdAndUpdate(id, data, { new: true });
  }

  static async delete(id) {
    return await CollaboratorHasJourney.findByIdAndDelete(id);
  }
}

module.exports = CollaboratorHasJourneyService;
