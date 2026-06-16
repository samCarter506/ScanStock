const jwt = require("jsonwebtoken");
const jwtKey = require("../config/config.json").JwtSecret;

module.exports =(req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("+>",authHeader)
    if(!authHeader)
    {
        return res.status(401).json({
            success: false,
            message: "Access denied"
        });
    }

    const token =authHeader.replace("Bearer ", "");
    
    try{

        const decoded = jwt.verify(token,jwtKey);

    req.user = decoded;

    next();
    }catch(err)
    {
        res.status(401).json({
            message: "Invalid token",
            success : false
        })
    }
}