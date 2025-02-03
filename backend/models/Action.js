const mongoose = require("mongoose");
const actionSchemaValidation = require("../validations/actionValidation");

const actionSchema = new mongoose.Schema({
  name: String,
  description: String,
  type: Number,
}, { timestamps: true });

const Action = mongoose.model("Action", actionSchema);

Action.validateData = (data) => {
  return actionSchemaValidation.validate(data);
};

module.exports = Action;
