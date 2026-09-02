import { Router } from "express";
import { login, me } from "../controllers/authController.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();
router.post("/login", login);
router.get("/me", requireAdmin, me);
export default router;
