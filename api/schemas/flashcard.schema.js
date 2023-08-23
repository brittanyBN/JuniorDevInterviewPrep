const Joi = require("joi");

const flashcardSchema = Joi.object({
  question: Joi.string().max(750).required(),
  answer: Joi.string().max(750).required(),
  FlashcardSetId: Joi.string(),
});

module.exports = flashcardSchema;
