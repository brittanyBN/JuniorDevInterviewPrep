const Joi = require("joi");

const flashcardSetSchema = Joi.object({
  name: Joi.string().required(),
  UserId: Joi.string().required(),
  ProgramLanguageId: Joi.string().required()
});

module.exports = flashcardSetSchema;
