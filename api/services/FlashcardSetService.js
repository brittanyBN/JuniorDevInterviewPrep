class FlashcardSetService {
  constructor(db) {
    this.client = db.sequelize;
    this.FlashcardSet = db.FlashcardSet;
    this.User = db.User;
    this.UserFlashcardSet = db.UserFlashcardSet;
    this.sequelize = db.sequelize;
  }

  async create(name, userId) {
    return this.FlashcardSet.create({
      name: name,
      UserId: userId,
    });
  }

  async getOne(id) {
    return this.FlashcardSet.findOne({
      where: { id: id },
      include: [
        {
          model: this.client.models.Flashcard,
          attributes: ["id", "question", "answer"],
        },
      ],
    });
  }

  async getAll(pagination, condition) {
    return this.FlashcardSet.findAll({
      where: condition,
      limit: pagination.limit,
      offset: pagination.offset,
      include: [
        {
          model: this.User,
          attributes: ['role'],
        },
      ],
    });
  }

async countAll(condition) {
    return this.FlashcardSet.count({
      where: condition,
        include: [
            {
            model: this.User,
            attributes: ['role'],
            },
        ],
    });
  }


  async update(id, name, userId) {
    const flashcardSet = await this.getOne(id);
    if (!flashcardSet) {
      return null;
    }
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
