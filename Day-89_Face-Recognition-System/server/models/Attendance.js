import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

const Attendance = sequelize.define("Attendance", {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  checkIn: {
    type: DataTypes.TIME,
  },
  checkOut: {
    type: DataTypes.TIME,
  },
  totalHours: {
    type: DataTypes.FLOAT,
  },
});

User.hasMany(Attendance, { foreignKey: "userId" });
Attendance.belongsTo(User, { foreignKey: "userId" });

export default Attendance;