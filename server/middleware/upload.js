import multer from "multer";
const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024 }, fileFilter: (_request, file, callback) => { if (!allowedTypes.includes(file.mimetype)) return callback(new Error("Unsupported file. Use JPG, PNG, WEBP, or PDF.")); return callback(null, true); } });
export default upload;
