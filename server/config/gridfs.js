import mongoose from "mongoose";

export function getPortfolioFilesBucket() {
  if (!mongoose.connection.db) throw new Error("MongoDB is not connected.");
  return new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: "portfolioFiles" });
}
