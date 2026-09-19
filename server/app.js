/* global process */
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import publicRoutes from "./routes/publicRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
const app = express();
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);
app.use(express.json({ limit: "25kb" })); app.use(morgan("dev"));
app.use("/api/contact", rateLimit({ windowMs: 60_000, limit: 3, standardHeaders: true, legacyHeaders: false }));
app.get("/api/health", (_request, response) => response.json({ status: "ok" })); app.use("/api", publicRoutes);
app.use("/api/auth", rateLimit({ windowMs: 15 * 60_000, limit: 10, standardHeaders: true, legacyHeaders: false }));
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/uploads", uploadRoutes);
app.use((_request, response) => response.status(404).json({ message: "Route not found." }));
app.use((error, _request, response, _next) => {
  void _next;
  console.error(error);
  if (error.code === "LIMIT_FILE_SIZE") return response.status(413).json({ message: "File is too large. Maximum upload size is 4 MB." });
  if (error.message?.includes("Unsupported file")) return response.status(415).json({ message: error.message });
  return response.status(500).json({ message: error.message || "Something went wrong. Please try again." });
});
export default app;
