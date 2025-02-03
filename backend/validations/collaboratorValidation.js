const Joi = require("joi");

const collaboratorSchema = Joi.object({
  name: Joi.string().required(),
  cpf: Joi.string().length(11).pattern(/^\d+$/).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })  
    .required()
    .lowercase()
    .trim(),
});

module.exports = collaboratorSchema;
