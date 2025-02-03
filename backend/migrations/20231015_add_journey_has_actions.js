const mongoose = require('mongoose');
const Collaborator = require('../models/Collaborator');
require('dotenv').config();

const addCollaborator = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://admin:admin@localhost:27019';

  await mongoose.connect(mongoUri);

  const newCollaborator = {
    name: "Lucas Franca",
    cpf: "12345678901",
    email: "lucas@evacopilot.com.br"
  };

  try {
    const collaborator = new Collaborator(newCollaborator);
    await collaborator.save();
    console.log('Collaborator added successfully:', collaborator);
  } catch (error) {
    console.error('Error adding collaborator:', error);
  } finally {
    await mongoose.disconnect();
  }
};

addCollaborator();
