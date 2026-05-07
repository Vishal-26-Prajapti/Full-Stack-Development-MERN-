import express from "express";
import { saveFace } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { getAllUsers } from "../controllers/userController.js";

const router = express.Router();

router.get("/", protect, getAllUsers);
router.post("/save-face", protect, saveFace);

export default router;
