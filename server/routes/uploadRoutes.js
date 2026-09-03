import { Router } from "express";
import { streamFile, uploadFile } from "../controllers/uploadController.js";
import { requireAdmin } from "../middleware/auth.js";
import upload from "../middleware/upload.js";
const router = Router();
router.get("/:fileId", streamFile);
router.post("/", requireAdmin, upload.single("file"), uploadFile);
export default router;
