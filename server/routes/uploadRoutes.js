import { Router } from "express";
import { uploadFile } from "../controllers/uploadController.js";
import { requireAdmin } from "../middleware/auth.js";
import upload from "../middleware/upload.js";
const router = Router();
router.post("/", requireAdmin, upload.single("file"), uploadFile);
export default router;
