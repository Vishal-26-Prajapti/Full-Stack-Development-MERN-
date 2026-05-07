import { useEffect, useState } from "react";
import API from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { motion } from "framer-motion";

export default function Admin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const res = await API.get("/attendance/all");
      setData(res.data);
    } catch (err) {
      console.log(err);
      alert("Not authorized");
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const filteredData = data.filter((item) => {
    const matchName = item.User?.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchDate = date ? item.date === date : true;

    return matchName && matchDate;
  });

  const totalHours = filteredData.reduce(
    (sum, item) => sum + (item.totalHours || 0),
    0,
  );

  const uniqueUsers = new Set(filteredData.map((d) => d.User?.name)).size;

  const todayRecords = filteredData.filter((d) => d.date === today);
  const presentToday = todayRecords.length;
  const activeUsers = todayRecords.filter((d) => !d.checkOut).length;

  const avgHours =
    filteredData.length > 0 ? (totalHours / filteredData.length).toFixed(2) : 0;

  const userChart = Object.values(
    filteredData.reduce((acc, item) => {
      const name = item.User?.name || "Unknown";
      if (!acc[name]) acc[name] = { name, hours: 0 };
      acc[name].hours += item.totalHours || 0;
      return acc;
    }, {}),
  );

  const dailyChart = Object.values(
    filteredData.reduce((acc, item) => {
      if (!acc[item.date]) acc[item.date] = { date: item.date, count: 0 };
      acc[item.date].count += 1;
      return acc;
    }, {}),
  );

  const getStatus = (item) => {
    if (!item.checkIn) return "Absent";
    if (item.checkIn && !item.checkOut) return "Working";
    return "Present";
  };

  return (
    <motion.div
      className="min-h-screen text-white p-4 md:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-4xl font-bold">Admin Dashboard</h1>

        <a
          href="http://localhost:5000/api/attendance/export"
          target="_blank"
          rel="noreferrer"
          className="bg-green-600 px-4 py-2 rounded-lg hover:scale-105 transition w-fit"
        >
          Export CSV
        </a>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-auto px-4 py-2 bg-black/40 border border-gray-700 rounded focus:scale-105 transition"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full md:w-auto px-4 py-2 bg-black/40 border border-gray-700 rounded focus:scale-105 transition"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4 mb-8">
        <Stat title="Records" value={filteredData.length} />
        <Stat title="Users" value={uniqueUsers} />
        <Stat title="Total Hours" value={`${totalHours.toFixed(1)}h`} />
        <Stat title="Avg Hours" value={`${avgHours}h`} />
        <Stat title="Present Today" value={presentToday} />
        <Stat title="Active Now" value={activeUsers} />
      </div>

      <motion.div
        className="bg-white/10 p-4 md:p-5 rounded-xl overflow-x-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3 className="mb-4 text-lg">Attendance Records</h3>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-175 w-full text-sm md:text-base">
              <thead>
                <tr className="border-b border-gray-700">
                  <th>User</th>
                  <th>Date</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                  <th>Hours</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((item) => (
                  <motion.tr
                    key={item.id}
                    className="border-b border-gray-800 text-center hover:bg-gray-600/50 transition"
                    whileHover={{ scale: 1.01 }}
                  >
                    <td>{item.User?.name}</td>
                    <td>{item.date}</td>
                    <td>{item.checkIn || "-"}</td>
                    <td>{item.checkOut || "-"}</td>
                    <td>{item.totalHours || 0}</td>
                    <td>
                      <span
                        className={
                          getStatus(item) === "Present"
                            ? "text-green-400"
                            : getStatus(item) === "Working"
                              ? "text-blue-400"
                              : "text-red-400"
                        }
                      >
                        {getStatus(item)}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <motion.div
          className="bg-white/10 p-4 md:p-5 rounded-xl"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h3 className="mb-4">Hours per User</h3>

          <div className="w-full overflow-x-auto">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userChart}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="hours" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          className="bg-white/10 p-4 md:p-5 rounded-xl"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h3 className="mb-4">Daily Trend</h3>

          <div className="w-full overflow-x-auto">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyChart}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line dataKey="count" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Stat({ title, value }) {
  return (
    <motion.div
      className="
        bg-white/10 
        p-3 md:p-4 
        rounded-xl 
        shadow-lg 
        backdrop-blur-md 
        border border-white/10
        text-center
        md:text-left
      "
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <p className="text-gray-400 text-xs md:text-sm tracking-wide">{title}</p>

      <h2 className="text-lg md:text-2xl font-bold mt-1">{value}</h2>
    </motion.div>
  );
}
