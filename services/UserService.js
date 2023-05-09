class UserService {
    constructor(db) {
        this.client = db.sequelize;
        this.User = db.User;
    }

    async getOne(email) {
        return this.User.findOne({
            where: {email: email}
        })
    }

    async create(name, email, encryptedPassword, salt) {
        return this.User.create({
            name: name,
            email: email,
            encryptedPassword: encryptedPassword,
            salt: salt
        })
    }
}

module.exports = UserService;