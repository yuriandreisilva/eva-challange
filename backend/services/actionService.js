const Action = require("../models/Action");
const JourneyHasActionService = require("../services/journeyHasActionService");
const JourneyHasAction = require("../models/JourneyHasAction");
const Journey = require("../models/Journey");
const JourneyCategory = require("../models/JourneyCategory");

module.exports = {
  ACTION_TYPE: 1, // E-mail
};

class ActionService {
  static async create(data) {
    const { error } = Action.validateData(data);
    if (error) throw new Error(error.details[0].message);

    return await Action.create(data);
  }

  static async getAll() {
    return await Action.find();
  }

  static async getById(id) {
    return await Action.findById(id);
  }

  static async getAllByJourneyId(id) {
    return await JourneyHasActionService.getAllByJourneyId(id);
  }

  static async update(id, data) {
    const { error } = Action.validateData(data);
    if (error) throw new Error(error.details[0].message);

    return await Action.findByIdAndUpdate(id, data, { new: true });
  }

  static async delete(id) {
    return await Action.findByIdAndDelete(id);
  }

  static async getActionsByJourney(journey_id) {
    try {
      const journeyActions = await JourneyHasAction.find({ journey_id });
      const journey = await Journey.findById(journey_id).populate('category_id');

      console.log(journey)
      const journeyCategory = await JourneyCategory.findById(journey.category_id);
      
      const actions = await Promise.all(
        journeyActions.map(async (journeyAction) => {
          const action = await Action.findById(journeyAction.action_id);
          return action;
        })
      );
      return {
        description: journeyCategory.description,
        actions: actions
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = ActionService;
