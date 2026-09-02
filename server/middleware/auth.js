/* global process */
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { asyncHandler } from "./asyncHandler.js";

export const requireAdmin = asyncHandler(async (request, response, next) => {
  const token = request.headers.authorization?.startsWith("Bearer ") ? request.headers.authorization.slice(7) : null;
  if (!token) return response.status(401).json({ message: "Authentication is required." });
  if (!process.env.JWT_SECRET) return response.status(500).json({ message: "Server authentication is not configured." });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub).select("name email role");
    if (!user || user.role !== "admin") return response.status(403).json({ message: "Admin access is required." });
    request.user = user;
    next();
  } catch {
    return response.status(401).json({ message: "Your session is invalid or has expired." });
  }
});
