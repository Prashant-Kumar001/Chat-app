import jwt, { decode } from "jsonwebtoken";
import ResponseHandler from "../utils/responseHandler.js";
import statusCodes from "../utils/statusCodes.js";
import User from "../models/user.Model.js";
/**
 * Middleware to check authentication (Token Required)
 */
export const protect = async (req, res, next) => {
  let token = null;

  
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token && req.cookies?.auth_token) {
    token = req.cookies.auth_token;
  }

  if (!token) {
    return ResponseHandler.error(res, statusCodes.UNAUTHORIZED, "Not authorized, token missing, login required for this route"); 
  }


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password"); 

    if (!req.user) {
      return ResponseHandler.error(res, statusCodes.UNAUTHORIZED, "User not found");
    }

    next(); 
  } catch (error) {
    console.error("Error verifying token:", error);
    return ResponseHandler.error(res, statusCodes.UNAUTHORIZED, "Invalid token");
  }
};

/**
 * Middleware to check Admin role
 */
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); 
  } else {
    return ResponseHandler.error(res, statusCodes.FORBIDDEN, "Access denied, admin only");
  }
};
