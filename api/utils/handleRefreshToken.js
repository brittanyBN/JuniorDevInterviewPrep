const jwt = require("jsonwebtoken");
const db = require("../models");
const UserService = require("../services/UserService");
const userService = new UserService(db);
require("dotenv").config();

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  const refreshToken = cookies.refreshToken;
  if (refreshToken === null) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = userService.findRefreshToken(refreshToken);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const accessToken = jwt.sign(
      { id: decoded.id, email: decoded.email, role: decoded.role },
      process.env.TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
