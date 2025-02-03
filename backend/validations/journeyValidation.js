const Joi = require("joi");

const journeySchema = Joi.object({
  name: Joi.string().required(),
  // category_id: Joi.string().hex().length(24).required(),
});

module.exports = journeySchema;
