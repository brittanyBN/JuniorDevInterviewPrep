const jwt = require("jsonwebtoken");
require('dotenv').config();
const extractUserId = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userId = decodedToken.id;
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = extractUserId;