class FlashcardService {
  constructor(db) {
    this.client = db.sequelize;
    this.Flashcard = db.Flashcard;
  }

  async create(question, answer, FlashcardSetId) {
    return this.Flashcard.create({
      question: question,
      answer: answer,
      FlashcardSetId: FlashcardSetId,
    });
  }

  async getOne(id) {
    return this.Flashcard.findOne({
      where: { id: id },
    });
  }

  async getAll() {
    return this.Flashcard.findAll();
  }

  async update(id, question, answer, FlashcardSetId) {
    const flashcard = await this.getOne(id);
    flashcard.question = question;
    flashcard.answer = answer;
    flashcard.FlashcardSetId = FlashcardSetId;
    await flashcard.save();
    return flashcard;
  }

  async delete(id) {
    const flashcard = await this.Flashcard.findOne({ where: { id: id } });
    if (!flashcard) {
      return null;
    }
    await this.Flashcard.destroy({ where: { id: id } });
    return flashcard;
  }
}

module.exports = FlashcardService;
