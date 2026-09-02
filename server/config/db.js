/* global process */
import mongoose from "mongoose";

export async function connectDatabase() {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is required. Copy .env.example to .env and add your MongoDB Atlas connection string.");
  await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10_000 });
  console.log("MongoDB connected");
}
