import ResponseHandler from "../utils/responseHandler.js";
import {
  registerUser,
  loginUser,
  isLogin,

  
} from "../services/auth.Service.js";
import statusCodes from "../utils/statusCodes.js";
import { generateToken } from "../utils/helper.js";
export const register = async (req, res) => {
  try {

    const { username, email, password, bio } = req.body;
    const { file } = req;
    

    // Register user
    const userData = await registerUser(username, email, password, file);

    // Metadata
    const metadata = {
      timestamp: new Date().toISOString(),
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    };

    return ResponseHandler.success(
      res,
      statusCodes.CREATED,
      "User registered successfully",
      userData,
      metadata
    );
  } catch (error) {
    return ResponseHandler.error(
      res,
      error.statusCode,
      error.message
    );
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;


    // Authenticate user
    const userData = await loginUser(email, password);

    // Generate token (assuming JWT)
    const token = generateToken(userData?.user?._id);

    // Set cookie
    res.cookie("auth_token", token, {
      httpOnly: true, // Secure, prevents XSS attacks
      secure: process.env.NODE_ENV === "production", // Only HTTPS in production
      sameSite: "Strict", // Prevents CSRF attacks
      maxAge: 24 * 60 * 60 * 1000, // 1-day expiration
    });

    // Metadata
    const metadata = {
      timestamp: new Date().toISOString(),
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    };

    return ResponseHandler.success(
      res,
      statusCodes.OK,
      "Login successful",
      { userData, token },
      metadata
    );
  } catch (error) {
    if (error.message === "Invalid credentials") {
      return ResponseHandler.error(
        res,
        statusCodes.NOT_FOUND,
        "Invalid email or password."
      );
    }

    return ResponseHandler.error(
      res,
      statusCodes.INTERNAL_SERVER_ERROR,
      "Login failed",
      error.message
    );
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("auth_token");
    return ResponseHandler.success(res, statusCodes.OK, "Logout successful");
  } catch (error) {
    return ResponseHandler.error(
      res,
      statusCodes.INTERNAL_SERVER_ERROR,
      "Logout failed",
      error.message
    );
  }
};

export const isLoginTrue = async (req, res) => {
  try {
    const isLoggedIn = await isLogin(req.user);

    // Metadata
    const metadata = {
      timestamp: new Date().toISOString(),
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    };

    return ResponseHandler.success(
      res,
      statusCodes.OK,
      "Login status checked",
      { login: isLoggedIn },
      metadata
    );
  } catch (error) {
    console.error("IsLogin Error:", error);
    return ResponseHandler.error(
      res,
      statusCodes.INTERNAL_SERVER_ERROR,
      "Failed to check login status",
      error.message
    );
  }
};

