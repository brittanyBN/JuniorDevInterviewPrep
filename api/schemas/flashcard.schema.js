const Joi = require("joi");

const flashcardSchema = Joi.object({
  question: Joi.string().required(),
  answer: Joi.string().required(),
  UserId: Joi.string().required(),
  FlashcardSetId: Joi.string(),
  AdminFlashcardSetId: Joi.string(),

});

module.exports = flashcardSchema;
