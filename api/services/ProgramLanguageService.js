class ProgramLanguageService {
    constructor(db) {
        this.client = db.sequelize;
        this.ProgramLanguage = db.ProgramLanguage;
    }

    async create(language) {
        return this.ProgramLanguage.create({
            language: language,
        });
    }

    async getAll() {
        return this.ProgramLanguage.findAll();
    }

    async getOne(id) {
        return this.ProgramLanguage.findOne({
            where: { id: id }
        });
    }

    async update(id, language) {
        const ProgramLanguage = await this.getOne(id);
        if (!ProgramLanguage) {
            return null;
        }
        ProgramLanguage.language = language;
        await ProgramLanguage.save();
        return ProgramLanguage;
    }

    async delete(id) {
        const ProgramLanguage = await this.ProgramLanguage.findOne({ where: { id: id } });
        if (!ProgramLanguage) {
            return null;
        }
        await this.ProgramLanguage.destroy({ where: { id: id } });
        return ProgramLanguage;
    }

}

module.exports = ProgramLanguageService;
