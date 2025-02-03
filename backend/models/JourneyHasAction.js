const mongoose = require("mongoose");
const journeyHasActionSchemaValidation = require("../validations/journeyHasActionValidation");

const journeyHasActionSchema = new mongoose.Schema({
  journey_id: { type: mongoose.Schema.Types.ObjectId, ref: "Journey" },
  action_id: { type: mongoose.Schema.Types.ObjectId, ref: "Action" },
  created_at: Date,
  updated_at: Date,
}, { timestamps: true });

const JourneyHasAction = mongoose.model("JourneyHasAction", journeyHasActionSchema);

JourneyHasAction.validateData = (data) => {
  return journeyHasActionSchemaValidation.validate(data);
};

module.exports = JourneyHasAction;
