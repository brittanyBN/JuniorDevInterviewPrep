module.exports = (sequelize, Sequelize) => {
  const CodeChallengeCategory = sequelize.define("CodeChallengeCategory", {
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
  CodeChallengeCategory.associate = function (models) {
    CodeChallengeCategory.hasMany(models.CodeChallenge, {
      foreignKey: { allowNull: false },
      onDelete: "CASCADE",
    });
    CodeChallengeCategory.belongsTo(models.User, {
      foreignKey: { allowNull: false },
      onDelete: "CASCADE",
    });
    CodeChallengeCategory.belongsTo(models.ProgramLanguage, {
      foreignKey: { allowNull: false },
      onDelete: "CASCADE"
    });
  };
  return CodeChallengeCategory;
};
