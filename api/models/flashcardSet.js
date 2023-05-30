module.exports = (sequelize, Sequelize) => {
  const FlashcardSet = sequelize.define("FlashcardSet", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  FlashcardSet.associate = function (models) {
    FlashcardSet.hasMany(models.Flashcard, {
      foreignKey: { allowNull: false },
      onDelete: "CASCADE",
    });
    FlashcardSet.belongsTo(models.User, {
      foreignKey: { allowNull: false },
      onDelete: "CASCADE",
    });

  };
  return FlashcardSet;
};
