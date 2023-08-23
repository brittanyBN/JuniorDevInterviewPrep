const Joi = require("joi");

const codeChallengeSchema = Joi.object({
  question: Joi.string().max(750).required(),
  solution: Joi.string().max(3000).required(),
  hint: Joi.string().max(500).required(),
  betterSolution: Joi.string().max(3000),
  CodeChallengeCategoryId: Joi.string(),
});

module.exports = codeChallengeSchema;
