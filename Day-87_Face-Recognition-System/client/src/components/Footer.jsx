import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const links = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Face Scan", path: "/face-attendance" },
  ];

  return (
    <footer className="relative bg-black/60 backdrop-blur-md text-gray-400 overflow-hidden">
      <div className="absolute w-72 h-72 bg-blue-500 opacity-10 blur-[120px] -top-10 left-0"></div>
      <div className="absolute w-72 h-72 bg-purple-500 opacity-10 blur-[120px] bottom-0 right-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          relative z-10
          w-full
          px-6 md:px-10
          py-10
          flex flex-col md:flex-row
          items-center md:items-start
          justify-between
          gap-10
          text-center md:text-left
        "
      >
        <div>
          <h3 className="text-white font-semibold text-lg tracking-wide">
            AI Attendance System
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Smart attendance using Face Recognition
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm">
          {links.map((item, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(item.path)}
              className="relative group hover:text-white transition"
            >
              {item.name}

              <span className="absolute left-0 -bottom-1 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
            </motion.button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 text-sm">
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="https://github.com/Vishal-26-Prajapti"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            GitHub
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.1 }}
            href="https://www.linkedin.com/in/vishalprajapati9518/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            LinkedIn
          </motion.a>
        </div>

        <div className="text-xs text-gray-500 text-center md:text-right">
          © {new Date().getFullYear()} All rights reserved
          <br />
          Built with ❤️ by Vishal
        </div>
      </motion.div>
    </footer>
  );
}
