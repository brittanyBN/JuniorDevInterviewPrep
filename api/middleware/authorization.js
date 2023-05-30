const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.TOKEN_SECRET;

const authorization = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. Token not provided." });
  }

  jwt.verify(token, secret, (error, user) => {
    if (error) {
      return res.status(403).json({ message: "Invalid token." });
    }
    req.user = user;
    const { role } = user;

    if (role === "member") {
      return res
        .status(403)
        .json({
          message:
            "Access denied. You are not authorized to access this resource.",
        });
    }
    next();
  });
};

module.exports = authorization;
