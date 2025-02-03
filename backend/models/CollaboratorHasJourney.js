const mongoose = require("mongoose");
const collaboratorHasJourneySchemaValidation = require("../validations/collaboratorHasJourneyValidation");

const CollaboratorHasJourneySchema = new mongoose.Schema({
  collaborator_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Collaborator', required: true },
  journey_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Journey', required: true },
  status: { type: Number, required: true, default: 0 },
  date_begin: Date,
  // date_end: Date,
  created_at: Date,
  updated_at: Date,
}, { timestamps: true });

CollaboratorHasJourneySchema.statics.validateData = function(data) {
  console.log('here')
  return collaboratorHasJourneySchemaValidation.validate(data);
};

const CollaboratorHasJourney = mongoose.model("CollaboratorHasJourney", CollaboratorHasJourneySchema);

module.exports = CollaboratorHasJourney;
