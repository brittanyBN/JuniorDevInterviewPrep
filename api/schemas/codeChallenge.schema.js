const Joi = require("joi");

const codeChallengeSchema = Joi.object({
  question: Joi.string().required(),
  solution: Joi.string().required(),
  hint: Joi.string().required(),
  betterSolution: Joi.string(),
  CodeChallengeCategoryId: Joi.string(),
});

module.exports = codeChallengeSchema;
