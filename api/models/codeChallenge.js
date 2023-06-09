module.exports = (sequelize, Sequelize) => {
  const CodeChallenge = sequelize.define("CodeChallenge", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    question: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    solution: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    hint: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    betterSolution: {
        type: Sequelize.STRING,
        allowNull: true,
    }
  });

  CodeChallenge.associate = function (models) {
    CodeChallenge.belongsTo(models.CodeChallengeCategory, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "CASCADE",
    });

    CodeChallenge.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
  };

  return CodeChallenge;
};
