const Joi = require('joi');

const flashcardSchema = Joi.object({
    question: Joi.string().required(),
    answer: Joi.string().required(),
    UserId: Joi.string().required(),
    flashcardSetId: Joi.string(),
});

module.exports = flashcardSchema;