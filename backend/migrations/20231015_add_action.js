const mongoose = require('mongoose');
const Action = require('../models/Action');
require('dotenv').config();

const addCollaborator = async () => {
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

  try {
    await Action.insertMany(actions);
    console.log('Actions added successfully:', actions);
  } catch (error) {
    console.error('Error adding actions:', error);
  } finally {
    await mongoose.disconnect();
  }
};

addCollaborator();
