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

  async getAll() {
    return this.FlashcardSet.findAll();
  }

  async getAllAdmin() {
    return this.FlashcardSet.findAll({
      where: {
        UserId: "50f048e8-b9d9-4625-890d-d551b0df9dd0"
      }
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

  //
  // async addUsersToFlashcardSet(flashcardSetId, userId){
  //   const t = await this.sequelize.transaction();
  //   try {
  //     const flashcardSet = await this.FlashcardSet.findOne({ where: { id: flashcardSetId } });
  //       if (!flashcardSet) {
  //         return null;
  //       }
  //       const user = await this.User.findOne({ where: { id: userId } });
  //       if (!user) {
  //           return null;
  //       }
  //       await this.UserFlashcardSet.create({ userId: userId, flashcardSetId: flashcardSetId }, { transaction: t });
  //   } catch (error) {
  //       await t.rollback();
  //       throw error;
  //   }
  // }

}

module.exports = FlashcardSetService;
