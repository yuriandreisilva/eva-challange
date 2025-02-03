const mongoose = require("mongoose");
const journeyCategorySchemaValidation = require("../validations/journeyCategoryValidation");

const journeyCategorySchema = new mongoose.Schema({
  name: String,
  description: String,
}, { timestamps: true });

const JourneyCategory = mongoose.model("JourneyCategory", journeyCategorySchema);

JourneyCategory.validateData = (data) => {
  return journeyCategorySchemaValidation.validate(data);
};

module.exports = JourneyCategory;
