const mongoose = require('mongoose');
const JourneyCategory = require('../models/JourneyCategory');
require('dotenv').config();

const addCollaborator = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://admin:admin@localhost:27019';

  await mongoose.connect(mongoUri);

  const newJourneyCategory = {
    name: "Onboarding",
    description: "Jornada do tipo de onboarding de Colaborador"
  }

  try {
    const collaborator = new JourneyCategory(newJourneyCategory);
    await collaborator.save();
    console.log('Collaborator added successfully:', collaborator);
  } catch (error) {
    console.error('Error adding collaborator:', error);
  } finally {
    await mongoose.disconnect();
  }
};

addCollaborator();
