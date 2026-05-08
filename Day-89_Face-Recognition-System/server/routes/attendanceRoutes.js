import express from "express";
import {
  markAttendance,
  getMyAttendance,
  getAllAttendance,
  exportCSV,
} from "../controllers/attendanceController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/mark", protect, markAttendance);
router.get("/my", protect, getMyAttendance);
router.get("/all", protect, isAdmin, getAllAttendance);
router.get("/export", protect, isAdmin, exportCSV);

export default router;
