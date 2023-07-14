class CodeChallengeService {
  constructor(db) {
    this.client = db.sequelize;
    this.CodeChallenge = db.CodeChallenge;
  }

  async create(
    question,
    solution,
    hint,
    betterSolution,
    CodeChallengeCategoryId
  ) {
    return this.CodeChallenge.create({
      question: question,
      solution: solution,
      hint: hint,
      betterSolution: betterSolution,
      CodeChallengeCategoryId: CodeChallengeCategoryId,
    });
  }

  async getOne(id) {
    const codeChallenge = await this.CodeChallenge.findOne({
      where: { id },
    });
    if (!codeChallenge) {
      return "Code Challenge not found";
    }
    return codeChallenge;
  }

  async getAll() {
    return this.CodeChallenge.findAll();
  }

  async update(
    id,
    question,
    solution,
    hint,
    betterSolution,
    CodeChallengeCategoryId
  ) {
    const codeChallenge = await this.getOne(id);
    codeChallenge.question = question;
    codeChallenge.solution = solution;
    codeChallenge.hint = hint;
    codeChallenge.betterSolution = betterSolution;
    codeChallenge.CodeChallengeCategoryId = CodeChallengeCategoryId;
    await codeChallenge.save();
    return codeChallenge;
  }

  async delete(id) {
    const codeChallenge = await this.CodeChallenge.findOne({
      where: { id: id },
    });
    if (!codeChallenge) {
      return null;
    }
    await this.CodeChallenge.destroy({ where: { id: id } });
    return codeChallenge;
  }
}

module.exports = CodeChallengeService;
