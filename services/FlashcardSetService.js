class FlashcardSetService {
    constructor(db) {
        this.client = db.sequelize;
        this.FlashcardSet = db.FlashcardSet;
    }

    async create(name, userId) {
        return this.FlashcardSet.create({
            name: name,
            UserId: userId
        })
    }

    async getOne(id) {
        return this.FlashcardSet.findOne({
            where: {id: id},
            include: [{
                model: this.client.models.Flashcard,
                attributes: ['id', 'question', 'answer'],
            }]
        })
    }

    async getAll() {
        return this.FlashcardSet.findAll()
    }

    async update(id, name, userId) {
        const flashcardSet = await this.getOne(id);
        flashcardSet.name = name;
        flashcardSet.UserId = userId;
        await flashcardSet.save();
        return flashcardSet;
    }

    async delete(id) {
        const flashcardSet = await this.FlashcardSet.findOne({ where: { id: id } });
        if (!flashcardSet) {
            return null;
        }
        await this.FlashcardSet.destroy({ where: { id: id } });
        return flashcardSet;
    }
}

module.exports = FlashcardSetService;