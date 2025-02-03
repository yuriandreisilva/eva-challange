const JourneyHasAction = require("../models/JourneyHasAction");

class JourneyHasActionService {
  static async create(data) {
    const { error } = JourneyHasAction.validateData(data);
    if (error) throw new Error(error.details[0].message);

    return await JourneyHasAction.create(data);
  }

  static async getAll() {
    return await JourneyHasAction.find().populate("journey_id").populate("action_id");
  }

  static async getAllByJourneyId(journeyId) {
    try {
      const journeyHasAction = await JourneyHasAction.find({ journey_id: journeyId });

      console.log(journeyId)

      if (!journeyHasAction || journeyHasAction.length === 0) {
        throw new Error('Nenhuma ação encontrada para essa jornada');
      }

      return journeyHasAction;
    } catch (error) {
      throw new Error(`Erro ao buscar ações para jornada: ${error.message}`);
    }
  }

  static async getAllByJourneyIdAndCollaboratorId(journeyId, collaboratorId) {
    try {
      const actions = await JourneyHasAction.find({ 
        journey_id: journeyId, 
        collaborator_id: collaboratorId 
      });

      if (!actions || actions.length === 0) {
        throw new Error('Nenhuma ação encontrada para essa jornada');
      }

      return actions;
    } catch (error) {
      throw new Error(`Erro ao buscar ações para jornada: ${error.message}`);
    }
  }

  static async getById(id) {
    return await JourneyHasAction.findById(id).populate("journey_id").populate("action_id");
  }

  static async update(id, data) {
    const { error } = JourneyHasAction.validateData(data);
    if (error) throw new Error(error.details[0].message);

    return await JourneyHasAction.findByIdAndUpdate(id, data, { new: true });
  }

  static async delete(id) {
    return await JourneyHasAction.findByIdAndDelete(id);
  }
}

module.exports = JourneyHasActionService;
