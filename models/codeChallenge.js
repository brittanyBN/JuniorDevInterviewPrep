module.exports = (sequelize, Sequelize) => {
    const CodeChallenge = sequelize.define('CodeChallenge', {
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
        hints: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        progress: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
    });
    CodeChallenge.associate = function (models) {
        CodeChallenge.belongsTo(models.CodeChallengeCategory, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
        CodeChallenge.belongsTo(models.User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
    }
    return CodeChallenge;
};
