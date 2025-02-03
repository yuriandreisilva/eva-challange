const Joi = require("joi");

const actionSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow("").optional(),
  type: Joi.number().allow("").optional(),
});

module.exports = actionSchema;
