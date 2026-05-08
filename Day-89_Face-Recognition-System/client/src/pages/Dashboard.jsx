import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [attendance, setAttendance] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(atob(token.split(".")[1])) : null;

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const { data } = await API.get("/attendance/my");
      setAttendance(data);
    } catch (err) {
      console.log(err);
    }
  };

  const markAttendance = async () => {
    setMessage("");

    try {
      const res = await API.post("/attendance/mark");
      setMessage(res.data.message);
      fetchAttendance();
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const todayRecord = attendance.find((a) => a.date === today);

  const getStatus = () => {
    if (!todayRecord) return "Not Marked";
    if (todayRecord.checkIn && !todayRecord.checkOut) return "Working";
    return "Completed";
  };

  const statusColor = {
    "Not Marked": "text-red-400",
    Working: "text-blue-400",
    Completed: "text-green-400",
  };

  const totalHoursMonth = attendance.reduce(
    (sum, a) => sum + (a.totalHours || 0),
    0,
  );

  return (
    <div className="min-h-screen text-white p-4 sm:p-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-5">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">
            Welcome {user?.name}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Track your attendance smartly
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={() => navigate("/face-attendance")}
            className="btn-purple w-full sm:w-auto"
          >
            Face Scan
          </button>

          <button
            onClick={() => navigate("/face-register")}
            className="btn-green w-full sm:w-auto"
          >
            Register Face
          </button>

          {user?.role === "admin" && (
            <button
              onClick={() => navigate("/admin")}
              className="btn-yellow w-full sm:w-auto"
            >
              Admin
            </button>
          )}
        </div>
      </div>

      {message && (
        <div className="text-center text-green-400 mb-4 animate-pulse text-sm sm:text-base">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <Card title="Today Status">
          <p
            className={`text-lg sm:text-xl font-bold ${statusColor[getStatus()]}`}
          >
            {getStatus()}
          </p>
        </Card>

        <Card title="Check-In">
          <p className="text-sm sm:text-base">{todayRecord?.checkIn || "-"}</p>
        </Card>

        <Card title="Check-Out">
          <p className="text-sm sm:text-base">{todayRecord?.checkOut || "-"}</p>
        </Card>

        <Card title="Today Hours">
          <p className="text-lg sm:text-xl font-bold">
            {todayRecord?.totalHours || 0} hrs
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
        <Card title="Total Records">
          <p className="text-xl sm:text-2xl font-bold">{attendance.length}</p>
        </Card>

        <Card title="Monthly Hours">
          <p className="text-xl sm:text-2xl font-bold">
            {totalHoursMonth.toFixed(2)} hrs
          </p>
        </Card>
      </div>

      <div className="bg-white/10 rounded-xl p-4 sm:p-5">
        <h3 className="mb-4 font-semibold text-sm sm:text-base">
          📅 Attendance History
        </h3>

        {attendance.length === 0 ? (
          <p className="text-gray-400 text-sm">No records yet</p>
        ) : (
          <div className="space-y-3">
            {attendance.map((a) => (
              <div
                key={a.id}
                className="
                p-3 sm:p-4
                bg-gray-800
                rounded-lg
                hover:scale-[1.02]
                transition
              "
              >
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                  <p className="text-sm sm:text-base">{a.date}</p>
                  <p className="text-xs sm:text-sm text-gray-400">
                    {a.totalHours || 0} hrs
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm mt-2 gap-1">
                  <span>In: {a.checkIn || "-"}</span>
                  <span>Out: {a.checkOut || "-"}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
      .btn-purple {
        padding: 8px 16px;
        background: #7c3aed;
        border-radius: 10px;
        transition: 0.3s;
      }
      .btn-green {
        padding: 8px 16px;
        background: #16a34a;
        border-radius: 10px;
        transition: 0.3s;
      }
      .btn-yellow {
        padding: 8px 16px;
        background: #facc15;
        color: black;
        border-radius: 10px;
        transition: 0.3s;
      }

      .btn-purple:hover,
      .btn-green:hover,
      .btn-yellow:hover {
        transform: scale(1.05);
        opacity: 0.9;
      }

      .animate-fadeIn {
        animation: fadeIn 0.6s ease-in;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `}</style>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white/10 p-5 rounded-xl hover:scale-105 transition shadow-lg">
      <p className="text-gray-400 text-sm">{title}</p>
      <div className="mt-2 text-lg">{children}</div>
    </div>
  );
}
