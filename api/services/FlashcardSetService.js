const {Op} = require("sequelize");

class FlashcardSetService {
  constructor(db) {
    this.client = db.sequelize;
    this.FlashcardSet = db.FlashcardSet;
    this.User = db.User;
  }

  async create(name, userId, programLanguageId) {
    return this.FlashcardSet.create({
      name: name,
      UserId: userId,
      ProgramLanguageId: programLanguageId
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

  async getByLanguage(pagination, condition, programLanguageId) {
    return this.FlashcardSet.findAll({
      where: {
        [Op.and]: [
          condition,
          programLanguageId ? { programLanguageId } : {},
        ],
      },
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


  async update(id, name, userId, programLanguageId) {
    const flashcardSet = await this.getOne(id);
    if (!flashcardSet) {
      return null;
    }
    flashcardSet.name = name;
    flashcardSet.UserId = userId;
    flashcardSet.ProgramLanguageId = programLanguageId;
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

    async getByName(name) {
      return this.FlashcardSet.findOne({where: {name: name}});
    }
}

module.exports = FlashcardSetService;
