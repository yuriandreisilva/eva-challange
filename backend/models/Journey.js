const mongoose = require("mongoose");
const journeySchemaValidation = require("../validations/journeyValidation");

const journeySchema = new mongoose.Schema({
  name: String,
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "JourneyCategory" },
}, { timestamps: true });

const Journey = mongoose.model("Journey", journeySchema);

Journey.validateData = (data) => {
  return journeySchemaValidation.validate(data);
};

Journey.createJourney = async (data) => {
  if (data.category_id && typeof data.category_id === 'string') {
    data.category_id = mongoose.Types.ObjectId(data.category_id);
  }
  
  const journey = new Journey(data);
  return await journey.save();
};

module.exports = Journey;
