const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function isAuthenticated(req, res, next) {
  try {

    const authHeader = req.headers.authorization;


    if (!authHeader) {
      return res.status(401).json(
        {
          message:"no token",
        }
      );
    }

    const token = authHeader.split(" ")[1];

    console.log("TOKEN RECEIVED:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

    req.user = user;
    req.id = decoded.id;
    req.role = decoded.role;
    

    next();

  } catch (error) {
    console.log(error);

    return res.status(401).json({
      message: "Authentication failed",
      success: false
    });
  }
}

module.exports = { isAuthenticated };
