const jwt = require("jsonwebtoken");
const guestModel = require("../model/guestModel");

const veriftJwt = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    console.log("Token:", token);
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await guestModel.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "User Not found" });
    }
    //valid user
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { veriftJwt };

// app.use('/api/protected', authMiddleware, protectedRoutes);