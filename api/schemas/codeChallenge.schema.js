const Joi = require('joi');

const codeChallengeSchema = Joi.object({
    question: Joi.string().required(),
    solution: Joi.string().required(),
    hints: Joi.string().required(),
    progress: Joi.number().required(),
    UserId: Joi.string().required(),
    codeChallengeCategoryId: Joi.string()
});

module.exports = codeChallengeSchema;