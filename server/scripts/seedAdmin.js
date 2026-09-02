/* global process */
import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDatabase } from "../config/db.js";
import User from "../models/User.js";

async function seedAdmin() {
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required in .env.");
  await connectDatabase();
  const email = process.env.ADMIN_EMAIL.trim().toLowerCase();
  const existing = await User.findOne({ email });
  if (existing) { console.log("Admin already exists; no changes made."); return; }
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
  await User.create({ name: "Satyam Kushwaha", email, passwordHash, role: "admin" });
  console.log("Admin created successfully.");
}

seedAdmin().then(() => process.exit(0)).catch((error) => { console.error(`Admin seed failed: ${error.message}`); process.exit(1); });
