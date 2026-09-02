import multer from "multer";
const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024 }, fileFilter: (_request, file, callback) => callback(null, allowedTypes.includes(file.mimetype)) });
export default upload;
