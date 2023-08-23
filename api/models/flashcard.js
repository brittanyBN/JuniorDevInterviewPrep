module.exports = (sequelize, Sequelize) => {
  const Flashcard = sequelize.define("Flashcard", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    question: {
      type: Sequelize.STRING(750),
      allowNull: false,
    },
    answer: {
      type: Sequelize.STRING(750),
      allowNull: false,
    },
  });
  Flashcard.associate = function (models) {
    Flashcard.belongsTo(models.FlashcardSet, {
      foreignKey: { allowNull: false },
      onDelete: "CASCADE",
    });
  };
  return Flashcard;
};
