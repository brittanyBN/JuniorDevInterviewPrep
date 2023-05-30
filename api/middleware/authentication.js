const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const { authorization } = req.headers;

  if (
    typeof authorization !== "string" ||
    !authorization.startsWith("Bearer ")
  ) {
    const error = new Error("Invalid authorization header");
    error.statusCode = 401;
    return next(error);
  }

  const token = authorization.substring(7);

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userId = data.userId;
    return next();
  } catch (err) {
    const error = new Error("Token signature verification failed");
    error.statusCode = 401;
    return next(error);
  }
};

module.exports = authentication;
