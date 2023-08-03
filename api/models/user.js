const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    encryptedPassword: {
      type: Sequelize.DataTypes.BLOB,
      allowNull: false,
    },
    salt: {
      type: Sequelize.DataTypes.BLOB,
      allowNull: false,
    },
    role: {
      type: Sequelize.DataTypes.ENUM("admin", "member"),
      allowNull: false,
      defaultValue: "member",
    },
    resetToken: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
  });

  User.associate = function (models) {
    User.hasMany(models.FlashcardSet, {
      foreignKey: { allowNull: false },
      onDelete: "CASCADE",
    });
    User.hasMany(models.CodeChallengeCategory, {
      foreignKey: { allowNull: false },
      onDelete: "CASCADE",
    });
  };

  return User;
};
