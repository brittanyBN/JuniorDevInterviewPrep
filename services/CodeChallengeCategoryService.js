class CodeChallengeCategoryService {
    constructor(db) {
        this.client = db.sequelize;
        this.CodeChallengeCategory = db.CodeChallengeCategory;
    }

    async getAll() {
        return this.CodeChallengeCategory.findAll();
    }

    async getOne(id) {
        return this.CodeChallengeCategory.findOne({
            where: {id: id}
        })
    }

    async create(name, userId) {
        return this.CodeChallengeCategory.create({
            name: name,
            UserId: userId
        })
    }

    async update(id, name, userId) {
        const codeChallengeCategory = await this.getOne(id);
        codeChallengeCategory.name = name;
        codeChallengeCategory.UserId = userId;
        await codeChallengeCategory.save();
        return codeChallengeCategory;
    }

    async delete(id) {
        const codeChallengeCategory = await this.CodeChallengeCategory.findOne({ where: { id: id } });
        if (!codeChallengeCategory) {
            return null;
        }
        await this.CodeChallengeCategory.destroy({ where: { id: id } });
        return codeChallengeCategory;
    }
}

module.exports = CodeChallengeCategoryService;