class CodeChallengeService {
    constructor(db) {
        this.client = db.sequelize;
        this.CodeChallenge = db.CodeChallenge;
    }

    async create(question, solution, hints, progress, userId, codeChallengeCategoryId) {
        return this.CodeChallenge.create({
            question: question,
            solution: solution,
            hints: hints,
            progress: progress,
            UserId: userId,
            CodeChallengeCategoryId: codeChallengeCategoryId
        })
    }

    async getOne(id) {
        const codeChallenge = await this.CodeChallenge.findOne({
            where: { id },
        });
        if (!codeChallenge) {
            return ("Code Challenge not found")
        }
        return codeChallenge;
    }

    async getAll() {
        return this.CodeChallenge.findAll()
    }

    async update(id, question, solution, hints, progress, userId, codeChallengeCategoryId) {
        const codeChallenge = await this.getOne(id);
        console.log(codeChallenge)
        codeChallenge.question = question;
        codeChallenge.solution = solution;
        codeChallenge.hints = hints;
        codeChallenge.progress = progress;
        codeChallenge.UserId = userId;
        codeChallenge.CodeChallengeCategoryId = codeChallengeCategoryId;
        await codeChallenge.save();
        return codeChallenge;
    }

    async delete(id) {
        const codeChallenge = await this.CodeChallenge.findOne({ where: { id: id } });
        if (!codeChallenge) {
            return null;
        }
        await this.CodeChallenge.destroy({ where: { id: id } });
        return codeChallenge;
    }
}

module.exports = CodeChallengeService;