import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import http from "http"; // Import HTTP module
import { Server } from "socket.io";
import { randomUUID } from "crypto";

import connectDB from "./src/config/db.js";
import authRoutes from "./src/routers/auth.routes.js";
import userRoutes from "./src/routers/user.routes.js";
import chatRoutes from "./src/routers/chat.routes.js";
import adminRoutes from "./src/routers/admin.routes.js";

import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./src/constants/events.js";

import logger from "./src/Utils/logger.js";
import { getSocketId } from "./src/lib/helper.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server, {});

// Middleware
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      process.env.CLIENT_URL,
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("src/public/uploads"));

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

// Rate limiting (apply before routes)
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 50,
  message: "Too many requests, please try again later.",
  headers: true,
});
app.use(limiter);

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/admin", adminRoutes);

const ids = new Map();

// WebSocket setup
io.on("connection", (socket) => {
  const user = {
    _id: randomUUID().toString(),
    name: "Admin",
  };
  ids.set(user._id.toString(), socket.id);

  console.log("New WebSocket connection", socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on(NEW_MESSAGE, async ({ chatID, members, messages }) => {
    const messageForRealTime = {
      content: messages,
      id: randomUUID().toString(),
      sender: {
        _id: randomUUID().toString(),
        name: "Admin",
        avatar: "https://example.com/admin.jpg",
      },
      chat: chatID,
      createdAt: new Date().toISOString(),
    };
    console.log(messageForRealTime);
    const membersSocket = getSocketId(members);
    io.to(membersSocket).emit(NEW_MESSAGE, {
      chatID,
      message: messageForRealTime,
    });
    io.emit(NEW_MESSAGE_ALERT, { chatID });
  });
});

// Error handling
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "development"
        ? err.message || "Internal Server Error"
        : "Something went wrong",
  });
});

// Graceful shutdown
process.on("SIGINT", async () => {
  logger.info("Shutting down server...");
  process.exit(0);
});

// Export both the app and server for testing & deployment
export { app, server, ids };
