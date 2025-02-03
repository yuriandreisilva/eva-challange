const mongoose = require("mongoose");
const collaboratorSchemaValidation = require("../validations/collaboratorValidation");

const collaboratorSchema = new mongoose.Schema({
  name: String,
  cpf: String,
  email: String,
}, { timestamps: true });

const Collaborator = mongoose.model("Collaborator", collaboratorSchema);

Collaborator.validateData = (data) => {
  return collaboratorSchemaValidation.validate(data);
};

module.exports = Collaborator;
