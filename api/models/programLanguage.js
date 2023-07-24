module.exports = (sequelize, Sequelize) => {
    const ProgramLanguage = sequelize.define("ProgramLanguage", {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        language: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });

    ProgramLanguage.associate = function (models) {
        ProgramLanguage.hasMany(models.CodeChallengeCategory, {
            foreignKey: { allowNull: false },
            onDelete: "CASCADE",
        });
        ProgramLanguage.hasMany(models.FlashcardSet, {
            foreignKey: { allowNull: false },
            onDelete: "CASCADE",
        });
    };

    return ProgramLanguage;
};
