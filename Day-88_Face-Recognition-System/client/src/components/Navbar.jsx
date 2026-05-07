import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");

  let user = null;
  if (token) {
    try {
      user = JSON.parse(atob(token.split(".")[1]));
    } catch (err) {
      console.log("Invalid token", err);
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const navLink = (to, label) => (
    <Link to={to} onClick={() => setMenuOpen(false)} className="relative group">
      <span
        className={`transition ${
          location.pathname === to ? "text-blue-400" : "text-white"
        }`}
      >
        {label}
      </span>

      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
    </Link>
  );

  return (
    <motion.nav
      className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/10 px-6 py-4 flex justify-between items-center shadow-lg"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <motion.div whileHover={{ scale: 1.05 }}>
        <Link
          to="/"
          className="text-md xl:text-2xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        >
          AI Attendance
        </Link>
      </motion.div>

      <div className="hidden md:flex items-center gap-6 text-sm xl:text-md">
        {navLink("/", "Home")}

        {!token && (
          <>
            {navLink("/login", "Login")}
            {navLink("/register", "Register")}
          </>
        )}

        {token && (
          <>
            {navLink("/dashboard", "Dashboard")}

            {user?.role === "admin" && navLink("/admin", "Admin")}

            <span className="px-3 py-1 rounded-full bg-white/10 text-xs border border-white/10">
              {user?.role}
            </span>

            <motion.button
              onClick={logout}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 shadow-md"
            >
              Logout
            </motion.button>
          </>
        )}
      </div>

      <button
        className="md:hidden text-white text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-lg flex flex-col items-center gap-6 py-6 border-t border-white/10 md:hidden"
          >
            {navLink("/", "Home")}

            {!token && (
              <>
                {navLink("/login", "Login")}
                {navLink("/register", "Register")}
              </>
            )}

            {token && (
              <>
                {navLink("/dashboard", "Dashboard")}

                {user?.role === "admin" && navLink("/admin", "Admin")}

                <span className="text-xs text-gray-400">
                  Role: {user?.role}
                </span>

                <button
                  onClick={logout}
                  className="bg-red-500 px-4 py-2 rounded-lg"
                >
                  Logout
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
