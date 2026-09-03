import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import mongoose from "mongoose";
import { getPortfolioFilesBucket } from "../config/gridfs.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

export const uploadFile = asyncHandler(async (request, response) => {
  if (!request.file) return response.status(400).json({ message: "Upload a JPG, PNG, WEBP, or PDF file up to 8 MB." });
  const resourceType = request.file.mimetype === "application/pdf" ? "raw" : "image";
  try {
    const safeName = request.file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    const bucket = getPortfolioFilesBucket();
    const uploadStream = bucket.openUploadStream(`${Date.now()}-${safeName}`, {
      contentType: request.file.mimetype,
      metadata: { originalName: request.file.originalname, uploadedBy: "admin" },
    });
    await pipeline(Readable.from([request.file.buffer]), uploadStream);
    const origin = `${request.protocol}://${request.get("host")}`;
    response.status(201).json({ url: `${origin}/api/uploads/${uploadStream.id}`, publicId: String(uploadStream.id), resourceType });
  } catch (error) {
    console.error("MongoDB file upload failed:", error.message);
    response.status(502).json({ message: `MongoDB file upload failed: ${error.message}` });
  }
});

export const streamFile = asyncHandler(async (request, response) => {
  if (!mongoose.isObjectIdOrHexString(request.params.fileId)) return response.status(400).json({ message: "Invalid file id." });
  const bucket = getPortfolioFilesBucket();
  const fileId = new mongoose.Types.ObjectId(request.params.fileId);
  const [file] = await bucket.find({ _id: fileId }).toArray();
  if (!file) return response.status(404).json({ message: "File not found." });
  response.setHeader("Content-Type", file.contentType || "application/octet-stream");
  response.setHeader("Content-Disposition", "inline");
  response.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  bucket.openDownloadStream(fileId).on("error", (error) => response.destroy(error)).pipe(response);
});
