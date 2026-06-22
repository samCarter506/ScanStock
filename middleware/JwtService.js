const jwt = require("jsonwebtoken");
const config = require("../config/config.json");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is required"
      });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.substring(7)
      : authHeader;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is required"
      });
    }

    const decoded = jwt.verify(
      token,
      config.JwtSecret
    );

    req.user = decoded;

    next();
  } catch (err) {
    console.log("JWT Error:", err.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};