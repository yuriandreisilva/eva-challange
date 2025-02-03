const mongoose = require('mongoose');
const Journey = require('../models/Journey');
require('dotenv').config();

const addCollaborator = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://admin:admin@localhost:27019';

  await mongoose.connect(mongoUri);

  const newJourney = {
    name: "Primeiros dias de colaborador",
    // category_id: "679e27a3f3276977a7eff047"
  };

  try {
    const collaborator = new Journey(newJourney);
    await collaborator.save();
    console.log('Journey added successfully:', collaborator);
  } catch (error) {
    console.error('Error adding collaborator:', error);
  } finally {
    await mongoose.disconnect();
  }
};

addCollaborator();
