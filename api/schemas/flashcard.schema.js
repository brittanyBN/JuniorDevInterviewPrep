const Joi = require("joi");

const flashcardSchema = Joi.object({
  question: Joi.string().required(),
  answer: Joi.string().required(),
  FlashcardSetId: Joi.string(),
});

module.exports = flashcardSchema;
