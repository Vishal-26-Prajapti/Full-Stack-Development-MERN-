import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-black via-gray-900 to-gray-800 text-white relative overflow-hidden">
      <div className="absolute w-96 h-96 bg-blue-500 opacity-20 blur-[150px] top-0 -left-25"></div>
      <div className="absolute w-96 h-96 bg-purple-500 opacity-20 blur-[150px] bottom-0 -right-25"></div>

      <Navbar />

      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 w-full px-4 md:px-10 py-6 relative z-10"
      >
        {children}
      </motion.main>

      <Footer />
    </div>
  );
}
