import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
export const protectedRoute = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      req.header("Authorization")?.replace("Bearer ", "").trim();
    if (!token) {
      return res.status(401).json({ message: "Authentication token missing." });
    }
    //verify
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(400).json({ message: "Decoded Token wrong." });
    }
    console.log("Decoded Token : ", decodedToken);
    const user = await User.findById(decodedToken._id)
      .select("_id role")
      .select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: `Token not found. ${error.message || "Error message"}`,
    });
  }
};
export const adminOnlyAccess = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  }
  return res.status(403).json({ message: "Access Denied.Admin Only access." });
};
