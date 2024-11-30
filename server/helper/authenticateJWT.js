const { errorResponse } = require("./responseHandler");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

const authenticateJWT = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return errorResponse(res, { statusCode: 401, message: "Invalid token" });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    //console.log(req.user);
    if (!req.user || !roles.includes(req.user.role)) {
      return errorResponse(res, {
        statusCode: 403,
        message: "You are not authorized to access this resource",
      });
    }
    next();
  };
};

module.exports = { authenticateJWT, authorizeRoles };
