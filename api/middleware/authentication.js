const jwt = require("jsonwebtoken");
require('dotenv').config();

const authentication = (req, res, next) =>{
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token)
    {
        return res.status(401).json({
            message: "Error! Token was not provided."
        });
    }
    try{
        let data = jwt.verify(token, process.env.TOKEN_SECRET );
        req.userId = data.id;
        return next();
    }
    catch(err){
        return res.status(400).json({
            data: err
        })
    }
}

module.exports = authentication;