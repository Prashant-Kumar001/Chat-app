import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

import connectDB from "./src/config/db.js";
import authRoutes from "./src/routers/auth.routes.js";
import userRoutes from "./src/routers/user.routes.js";
import chatRoutes from "./src/routers/chat.routes.js";

import logger from "./src/Utils/logger.js";

dotenv.config();

connectDB();

const app = express();

app.use("/uploads", express.static("src/public/uploads"));

app.use(helmet());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(
    morgan("combined", { stream: { write: (msg) => logger.info(msg.trim()) } })
  );
}

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 50,
  message: "Too many requests, please try again later.",
  headers: true,
});
app.use(limiter);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);

app.use((err, req, res, next) => {
  console.error("Error:", err); 

  res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
  });
});


process.on("SIGINT", async () => {
  logger.info("Shutting down server...");
  process.exit(0);
});

export default app;
