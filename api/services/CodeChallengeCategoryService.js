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

  async getOne(id) {
    return this.CodeChallengeCategory.findOne({
      where: { id: id },
      include: [
        {
          model: this.client.models.CodeChallenge,
          attributes: ["id", "question", "solution", "hint", "progress"],
        },
      ],
    });
  }

  async create(name, userId) {
    return this.CodeChallengeCategory.create({
      name: name,
      UserId: userId,
    });
  }

  async update(id, name, userId) {
    const codeChallengeCategory = await this.getOne(id);
    if (!codeChallengeCategory) {
      return null;
    }
    codeChallengeCategory.name = name;
    codeChallengeCategory.UserId = userId;
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
