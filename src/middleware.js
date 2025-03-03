const jwt = require("jsonwebtoken");
const { CONSTANTS } = require("./constants");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization"); // Get token from request header

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, CONSTANTS.JWT_SECRET); // Verify token
    req.user = decoded; // Add user data to request object
    next(); // Proceed to next middleware or route
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
