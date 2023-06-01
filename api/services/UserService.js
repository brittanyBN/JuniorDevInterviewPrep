const crypto = require("crypto");
class UserService {
  constructor(db) {
    this.client = db.sequelize;
    this.User = db.User;
  }

  async getAll() {
    return this.User.findAll({
      attributes: ["id", "name", "email", "role"],
    });
  }

  async getOne(email) {
    return this.User.findOne({
      where: {email: email},
    });
  }

  async get(id) {
    return this.User.findByPk(id);
  }

  async create(name, email, encryptedPassword, salt, role) {
    return this.User.create({
      name: name,
      email: email,
      encryptedPassword: encryptedPassword,
      salt: salt,
      role: role,
    });
  }

  async update(email, encryptedPassword, salt) {
    const user = await this.get(email);
    user.email = email;
    user.encryptedPassword = encryptedPassword;
    user.salt = salt;
    await user.save();
    return user;
  }

}

module.exports = UserService;
