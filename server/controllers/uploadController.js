/* global process */
import { Readable } from "node:stream";
import cloudinary from "../config/cloudinary.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

export const uploadFile = asyncHandler(async (request, response) => {
  if (!request.file) return response.status(400).json({ message: "Upload a JPG, PNG, WEBP, or PDF file up to 8 MB." });
  if (![process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_API_SECRET].every(Boolean)) return response.status(503).json({ message: "Cloudinary is not configured yet." });
  const resourceType = request.file.mimetype === "application/pdf" ? "raw" : "image";
  const result = await new Promise((resolve, reject) => { const stream = cloudinary.uploader.upload_stream({ folder: "satyam-portfolio", resource_type: resourceType }, (error, uploadResult) => error ? reject(error) : resolve(uploadResult)); Readable.from(request.file.buffer).pipe(stream); });
  response.status(201).json({ url: result.secure_url, publicId: result.public_id, resourceType });
});
