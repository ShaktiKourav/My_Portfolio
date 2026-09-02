import User from "../models/User.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { createToken } from "../utils/token.js";

export const login = asyncHandler(async (request, response) => {
  const { email, password } = request.body;
  if (typeof email !== "string" || typeof password !== "string") return response.status(400).json({ message: "Email and password are required." });
  const user = await User.findOne({ email: email.trim().toLowerCase() }).select("+passwordHash");
  if (!user || !(await user.matchesPassword(password))) return response.status(401).json({ message: "Invalid email or password." });
  response.json({ token: createToken(user), user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

export const me = (request, response) => response.json({ user: request.user });
