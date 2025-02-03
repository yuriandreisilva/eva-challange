const Joi = require("joi");

const journeyCategorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow("").optional(),
});

module.exports = journeyCategorySchema;
