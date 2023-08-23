module.exports = (sequelize, Sequelize) => {
  const CodeChallenge = sequelize.define("CodeChallenge", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    question: {
      type: Sequelize.STRING(750),
      allowNull: false,
    },
    solution: {
      type: Sequelize.STRING(3000),
      allowNull: false,
    },
    hint: {
      type: Sequelize.STRING(500),
      allowNull: false,
    },
    betterSolution: {
      type: Sequelize.STRING(3000),
      allowNull: true,
    },
  });

  CodeChallenge.associate = function (models) {
    CodeChallenge.belongsTo(models.CodeChallengeCategory, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
  };

  return CodeChallenge;
};
