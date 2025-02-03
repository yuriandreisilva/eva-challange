const Joi = require("joi");

const journeyHasActionSchema = Joi.object({
  journey_id: Joi.string().hex().length(24).required(),
  action_id: Joi.string().hex().length(24).required(),
  created_at: Joi.date().iso().default(() => new Date()),
  updated_at: Joi.date().iso().default(() => new Date()),
});

module.exports = journeyHasActionSchema;
