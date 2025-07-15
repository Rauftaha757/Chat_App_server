const jwt = require("jsonwebtoken");
const ApiErrors = require("../../utils/ApiErrors");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiErrors(401, "Token is invalid or not present"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    return next(new ApiErrors(401, "Invalid or expired token"));
  }
};

module.exports = verifyToken;
