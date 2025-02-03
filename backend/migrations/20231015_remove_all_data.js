const mongoose = require('mongoose');
const Action = require('../models/Action');
const Journey = require('../models/Journey');
const JourneyHasAction = require('../models/JourneyHasAction');
const JourneyCategory = require('../models/JourneyCategory');
const Collaborator = require('../models/Collaborator');
require('dotenv').config();

const removeAllData = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://admin:admin@localhost:27019';

  await mongoose.connect(mongoUri);

  try {
    await Action.deleteMany({});
    console.log('All actions removed successfully');

    await Journey.deleteMany({});
    console.log('All journeys removed successfully');

    await JourneyHasAction.deleteMany({});
    console.log('All journeyHasActions removed successfully');

    await JourneyCategory.deleteMany({});
    console.log('All journey categories removed successfully');

    await Collaborator.deleteMany({});
    console.log('All collaborators removed successfully');
  } catch (error) {
    console.error('Error removing data:', error);
  } finally {
    await mongoose.disconnect();
  }
};

removeAllData();
