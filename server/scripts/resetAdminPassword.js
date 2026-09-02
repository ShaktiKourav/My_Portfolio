/* global process */
import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDatabase } from "../config/db.js";
import User from "../models/User.js";

async function resetAdminPassword() {
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required in .env.");
  await connectDatabase();
  const email = process.env.ADMIN_EMAIL.trim().toLowerCase();
  const user = await User.findOne({ email }).select("+passwordHash");
  if (!user) throw new Error("No admin account was found. Run npm run seed:admin first.");
  user.passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
  await user.save();
  console.log("Admin password reset successfully.");
}

resetAdminPassword().then(() => process.exit(0)).catch((error) => { console.error(`Admin password reset failed: ${error.message}`); process.exit(1); });
