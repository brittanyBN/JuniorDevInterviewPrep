const express = require("express");
const router = express.Router();
const db = require("../models");
const crypto = require("crypto");
const UserService = require("../services/UserService");
const userService = new UserService(db);

const resetPassword = async (req, res, next) => {
    const resetToken = req.params.resetToken;
    const user = await userService.getOneByResetToken(resetToken);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const { newPassword } = req.body;
    const { confirmPassword } = req.body;
    if(newPassword !== confirmPassword) {
        return res.status(400).json({ message: "Passwords must match"})
    }
    const salt = crypto.randomBytes(16);
    const encryptedPassword = await new Promise((resolve, reject) => {
        crypto.pbkdf2(
            newPassword,
            salt,
            310000,
            32,
            "sha256",
            (err, encrypted) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(encrypted);
                }
            }
        );
    });

    const updatedUser = await userService.update(
        user.email,
        encryptedPassword,
        salt
    );
    if (!updatedUser) {
        return res.status(500).json({ message: "Failed to update password" });
    }

    return res.status(200).json({ message: "Password reset" });
};

module.exports = resetPassword;
