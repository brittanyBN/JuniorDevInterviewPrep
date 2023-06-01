const express = require("express");
const router = express.Router();
const db = require("../models");
const crypto = require("crypto");
const UserService = require("../services/UserService");
const userService = new UserService(db);

const resetPassword = async (req, res) => {
    let resetToken = crypto.randomBytes(20).toString("hex");
    resetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    const user = await userService.getOne(req.body.email);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const { email, encryptedPassword, salt } = req.body;
    const updatedUser = await user.update(email, encryptedPassword, salt);
    return res.status(200).json({ message: "Password reset" });
}

module.exports = resetPassword;