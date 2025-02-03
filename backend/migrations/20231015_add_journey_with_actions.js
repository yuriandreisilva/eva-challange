const mongoose = require('mongoose');
const Action = require('../models/Action');
const Journey = require('../models/Journey');
const JourneyHasAction = require('../models/JourneyHasAction');
const JourneyCategory = require('../models/JourneyCategory');
const Collaborator = require('../models/Collaborator');
require('dotenv').config();

const addJourneyWithActions = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://admin:admin@localhost:27019';

  await mongoose.connect(mongoUri);

  const actions = [{
    name: "E-mail dia 1",
    description: "E-mail com instrucoes dia 1... xpto1",
    type: "1"
  },
  {
    name: "E-mail dia 2",
    description: "E-mail com instrucoes dia 2... xpto2",
    type: "1"
  },
  {
    name: "E-mail dia 3",
    description: "E-mail com instrucoes dia 3... xpto3",
    type: "1"
  }];

  const newCategory = {
    name: "Onboarding",
    description: "Onboarding de novos colaboradores"
  };

  const newJourney = {
    name: "Primeiros dias de colaborador",
  };

  const newCollaborator = {
    name: "Lucas Franca",
    cpf: "12345678901",
    email: process.env.EMAIL_TO_RECEIVE || "lucas@evacopilot.com.br"
  };

  try {
    const category = new JourneyCategory(newCategory);
    await category.save();
    console.log('Category added successfully:', category);

    const insertedActions = await Action.insertMany(actions);
    console.log('Actions added successfully:', insertedActions);
    console.log(category._id)

    newJourney.category_id = category._id;
    const journey = new Journey(newJourney);
    await journey.save();
    console.log('Journey added successfully:', journey);

    const journeyHasActions = insertedActions.map(action => ({
      journey_id: journey._id,
      action_id: action._id
    }));

    await JourneyHasAction.insertMany(journeyHasActions);
    console.log('JourneyHasActions added successfully:', journeyHasActions);

    const collaborator = new Collaborator(newCollaborator);
    await collaborator.save();
    console.log('Collaborator added successfully:', collaborator);
  } catch (error) {
    console.error('Error adding journey with actions:', error);
  } finally {
    await mongoose.disconnect();
  }
};

addJourneyWithActions();
