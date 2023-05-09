class FlashcardService {
    constructor(db) {
        this.client = db.sequelize;
        this.Flashcard = db.Flashcard;
    }

    async create(question, answer, userId, flashcardSetId) {
        return this.Flashcard.create({
            question: question,
            answer: answer,
            UserId: userId,
            FlashcardSetId: flashcardSetId
        })
    }

    async getOne(id) {
        return this.Flashcard.findOne({
            where: {id: id}
        })
    }

    async getAll() {
        return this.Flashcard.findAll();
    }

    async update(id, question, answer, userId) {
        const flashcard = await this.getOne(id);
        flashcard.question = question;
        flashcard.answer = answer;
        flashcard.UserId = userId;
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