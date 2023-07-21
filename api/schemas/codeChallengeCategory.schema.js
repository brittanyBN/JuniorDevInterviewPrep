const Joi = require("joi");

const codeChallengeCategorySchema = Joi.object({
  name: Joi.string().required(),
  UserId: Joi.string().required(),
  ProgramLanguageId: Joi.string().required()
});

module.exports = codeChallengeCategorySchema;
