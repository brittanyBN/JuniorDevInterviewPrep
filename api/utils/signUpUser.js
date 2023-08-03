const UserService = require("../services/UserService");
const db = require("../models");
const userService = new UserService(db);
const crypto = require("crypto");

async function signUpUser(req, res, next, role) {
  const { name, email, password } = req.body;

  if (name === null || typeof name !== "string") {
    return res.status(400).json({ message: "Name is required." });
  }
  if (email === null || typeof email !== "string") {
    return res.status(400).json({ message: "Email is required." });
  }
  if (password === null || typeof password !== "string") {
    return res.status(400).json({ message: "Password is required." });
  }
  const user = await userService.getOne(email);
  if (user != null) {
    return res
      .status(400)
      .json({ message: "Provided email is already in use." });
  }
  const salt = crypto.randomBytes(16);
  crypto.pbkdf2(
    password,
    salt,
    310000,
    32,
    "sha256",
    function (err, encryptedPassword) {
      if (err) {
        return next(err);
      }
      userService.create(name, email, encryptedPassword, salt, role);
      res.status(201).json({ message: "Successfully created user" });
    }
  );
  console.log(req.body);
}

module.exports = signUpUser;
