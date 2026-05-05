import { Parser } from "json2csv";
import User from "../models/User.js";
import Attendance from "../models/Attendance.js";

export const markAttendance = async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();

    const today = now.toISOString().split("T")[0];
    const currentTime = now.toTimeString().split(" ")[0];

    let existing = await Attendance.findOne({
      where: { userId, date: today },
    });

    if (!existing) {
      const attendance = await Attendance.create({
        userId,
        date: today,
        checkIn: currentTime,
      });

      return res.json({
        message: "Check-in successful ✅",
        attendance,
      });
    }

    if (existing.checkOut) {
      return res.json({
        message: "You already checked out today ❌",
      });
    }

    existing.checkOut = currentTime;

    const checkInTime = new Date(`1970-01-01T${existing.checkIn}`);
    const checkOutTime = new Date(`1970-01-01T${currentTime}`);

    const diffMs = checkOutTime - checkInTime;
    const hours = diffMs / (1000 * 60 * 60);

    existing.totalHours = parseFloat(hours.toFixed(2));

    await existing.save();

    return res.json({
      message: "Check-out successful 🎉",
      totalHours: existing.totalHours,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyAttendance = async (req, res) => {
  try {
    const records = await Attendance.findAll({
      where: { userId: req.user.id },
      order: [["date", "DESC"]],
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.findAll({
      include: ["User"],
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const exportCSV = async (req, res) => {
  try {
    const data = await Attendance.findAll({
      include: ["User"],
    });

    const formatted = data.map((item) => ({
      name: item.User?.name,
      date: item.date,
      checkIn: item.checkIn,
      checkOut: item.checkOut,
      totalHours: item.totalHours,
    }));

    const parser = new Parser();
    const csv = parser.parse(formatted);

    res.header("Content-Type", "text/csv");
    res.header("Content-Disposition", "attachment; filename=attendance.csv");

    return res.send(csv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};