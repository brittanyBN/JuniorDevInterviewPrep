const express = require("express");
const router = express.Router();
const db = require("../models");
const crypto = require("crypto");
const UserService = require("../services/UserService");
const userService = new UserService(db);
const sendEmail = require(".//sendEmail");
require("dotenv").config();

const forgotPassword = async (req, res) => {
  const user = await userService.getOne(req.body.email);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const resetToken = crypto.randomBytes(20).toString("hex");
  await userService.resetToken(req.body.email, resetToken);

  const resetUrl = `process.env.CLIENT/resetPassword/${resetToken}`;
  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please create a new password ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      message,
    });
    res.status(200).json({
      success: true,
      data: "Email sent",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Email could not be sent" });
  }
};

module.exports = forgotPassword;
