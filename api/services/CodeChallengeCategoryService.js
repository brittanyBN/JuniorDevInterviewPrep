const { Op } = require("sequelize");

class CodeChallengeCategoryService {
  constructor(db) {
    this.client = db.sequelize;
    this.CodeChallengeCategory = db.CodeChallengeCategory;
  }

  async getAll(pagination) {
    return this.CodeChallengeCategory.findAll({
      limit: pagination.limit,
      offset: pagination.offset,
    });
  }

  async getByLanguage(pagination, programLanguageId) {
    return this.CodeChallengeCategory.findAll({
      where: {
        [Op.and]: [programLanguageId ? { programLanguageId } : {}],
      },
      limit: pagination.limit,
      offset: pagination.offset,
    });
  }

  async countAll() {
    return this.CodeChallengeCategory.count();
  }

  async getOne(id) {
    return this.CodeChallengeCategory.findOne({
      where: { id: id },
      include: [
        {
          model: this.client.models.CodeChallenge,
          attributes: ["id", "question", "solution", "hint", "betterSolution"],
        },
      ],
    });
  }

  async create(name, userId, programLanguageId) {
    return this.CodeChallengeCategory.create({
      name: name,
      UserId: userId,
      ProgramLanguageId: programLanguageId,
    });
  }

  async update(id, name, userId, programLanguageId) {
    const codeChallengeCategory = await this.getOne(id);
    if (!codeChallengeCategory) {
      return null;
    }
    codeChallengeCategory.name = name;
    codeChallengeCategory.UserId = userId;
    codeChallengeCategory.ProgramLanguageId = programLanguageId;
    await codeChallengeCategory.save();
    return codeChallengeCategory;
  }

  async delete(id) {
    const codeChallengeCategory = await this.CodeChallengeCategory.findOne({
      where: { id: id },
    });
    if (!codeChallengeCategory) {
      return null;
    }
    await this.CodeChallengeCategory.destroy({ where: { id: id } });
    return codeChallengeCategory;
  }
}

module.exports = CodeChallengeCategoryService;
