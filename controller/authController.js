const jwt = require("jsonwebtoken");
const guestModel = require("../model/guestModel");
const userModel = require("../model/UserModel");
const astrologerModel = require("../model/astrologerModel");

const verifyJwt = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    console.log("Token:", token);
    if (!token) {
      return res.status(404).json({ message: "Token not found", status: 404 });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Find user in different collections
    let user = await guestModel.findById(decoded._id);
    if (!user) {
      user = await userModel.findById(decoded._id);
    }
    if (!user) {
      user = await astrologerModel.findById(decoded._id);
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Valid user
    req.user = user;
    res
      .status(200)
      .json({ message: "user fetch successfully", data: user, status: 200 });
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired", status: 401 });
    }
    return res.status(401).json({ message: "Invalid token", status: 401 });
  }
};

const logout = async (req, res) => {
  res.clearCookie("accessToken");
  res.json({ message: "Logged out successfully", status: 200 });
};

module.exports = { verifyJwt, logout };
