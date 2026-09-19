// import { Readable } from "node:stream";
// import { pipeline } from "node:stream/promises";
// import mongoose from "mongoose";
// import { getPortfolioFilesBucket } from "../config/gridfs.js";
// import { asyncHandler } from "../middleware/asyncHandler.js";

// export const uploadFile = asyncHandler(async (request, response) => {
//   if (!request.file) return response.status(400).json({ message: "Upload a JPG, PNG, WEBP, or PDF file up to 4 MB." });
//   const resourceType = request.file.mimetype === "application/pdf" ? "raw" : "image";
//   try {
//     const safeName = request.file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
//     const bucket = getPortfolioFilesBucket();
//     const uploadStream = bucket.openUploadStream(`${Date.now()}-${safeName}`, {
//       contentType: request.file.mimetype,
//       metadata: { originalName: request.file.originalname, uploadedBy: "admin" },
//     });
//     await pipeline(Readable.from([request.file.buffer]), uploadStream);
//     response.status(201).json({ url: `/api/uploads/${uploadStream.id}`, publicId: String(uploadStream.id), resourceType });
//   } catch (error) {
//     console.error("MongoDB file upload failed:", error.message);
//     response.status(502).json({ message: `MongoDB file upload failed: ${error.message}` });
//   }
// });

// export const streamFile = asyncHandler(async (request, response) => {
//   if (!mongoose.isObjectIdOrHexString(request.params.fileId)) return response.status(400).json({ message: "Invalid file id." });
//   const bucket = getPortfolioFilesBucket();
//   const fileId = new mongoose.Types.ObjectId(request.params.fileId);
//   const [file] = await bucket.find({ _id: fileId }).toArray();
//   if (!file) return response.status(404).json({ message: "File not found." });
//   response.setHeader("Content-Type", file.contentType || "application/octet-stream");
//   response.setHeader("Content-Disposition", "inline");
//   response.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
//   bucket.openDownloadStream(fileId).on("error", (error) => response.destroy(error)).pipe(response);
// });




import imagekit from "../config/imagekit.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

export const uploadFile = asyncHandler(async (request, response) => {
  if (!request.file) {
    return response.status(400).json({
      message: "Upload a JPG, PNG, WEBP, or PDF file up to 4 MB.",
    });
  }

  try {
    const safeName = request.file.originalname.replace(
      /[^a-zA-Z0-9._-]/g,
      "_"
    );

    // Folder sent by frontend.
    // Example:
    // profile, projects, certificates, skills, resume
    const requestedFolder = request.body.folder || "other";

    const allowedFolders = [
      "profile",
      "projects",
      "certificates",
      "skills",
      "resume",
      "other",
    ];

    const folderName = allowedFolders.includes(requestedFolder)
      ? requestedFolder
      : "other";

    const result = await imagekit.upload({
      file: request.file.buffer,
      fileName: `${Date.now()}-${safeName}`,
      folder: `/portfolio/${folderName}`,
      useUniqueFileName: true,
    });

    const resourceType =
      request.file.mimetype === "application/pdf" ? "raw" : "image";

    return response.status(201).json({
      url: result.url,
      publicId: result.fileId,
      resourceType,
      fileName: result.name,
      folder: `/portfolio/${folderName}`,
    });
  } catch (error) {
    console.error("ImageKit upload failed:", error.message);

    return response.status(502).json({
      message: `ImageKit upload failed: ${error.message}`,
    });
  }
});

