const Joi = require("joi");

const collaboratorHasJourneySchema = Joi.object({
  journey_id: Joi.string().hex().length(24).required(),
  collaborator_id: Joi.string().hex().length(24).required(),
  status_id: Joi.number().optional(),
  date_begin: Joi.date().iso().required(),
  // date_end: Joi.date().iso().greater(Joi.ref("date_begin")).optional(),
  // created_at: Joi.date().iso().default(() => new Date()),
  // updated_at: Joi.date().iso().default(() => new Date()),
});

module.exports = collaboratorHasJourneySchema;
