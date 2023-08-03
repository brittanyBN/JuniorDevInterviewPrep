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
      where: { email: email },
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
    const user = await this.getOne(email);
    user.encryptedPassword = encryptedPassword;
    user.salt = salt;
    await user.save();
    return user;
  }

  async resetToken(email, resetToken) {
    const user = await this.getOne(email);
    user.resetToken = resetToken;
    await user.save();
    return user;
  }

  async getOneByResetToken(resetToken) {
    return this.User.findOne({
      where: { resetToken: resetToken },
    });
  }

  async delete(id) {
    const user = await this.User.findOne({ where: { id: id } });
    if (!user) {
      return null;
    }
    await user.destroy();
    return user;
  }
}

module.exports = UserService;
