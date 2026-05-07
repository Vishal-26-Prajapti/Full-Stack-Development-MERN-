import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function TiltCard({ children }) {
  const [style, setStyle] = useState({});

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -(y / rect.height - 0.5) * 10;
    const rotateY = (x / rect.width - 0.5) * 10;

    setStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    });
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={() => setStyle({ transform: "rotateX(0) rotateY(0)" })}
      style={style}
      className="bg-white/10 backdrop-blur p-6 rounded-2xl border border-white/10 transition duration-300"
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [text, setText] = useState("");

  const fullText = "AI Face Attendance System";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const particles = Array.from({ length: 40 });

  return (
    <div className="min-h-screen relative overflow-hidden transition duration-500">
      <div className="absolute inset-0 z-0">
        {particles.map((_, i) => (
          <div
            key={i}
            className="absolute bg-blue-500 opacity-20 rounded-full animate-float"
            style={{
              width: Math.random() * 6 + 3 + "px",
              height: Math.random() * 6 + 3 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animationDuration: Math.random() * 10 + 5 + "s",
            }}
          />
        ))}
      </div>

      <div
        className="
      relative z-10
      flex flex-col items-center justify-center text-center
      px-4 sm:px-6 md:px-10
      py-20 sm:py-28 md:py-32
    "
      >
        <div className="absolute w-72 sm:w-96 md:w-125 h-72 sm:h-96 md:h-125 bg-blue-600 opacity-20 blur-[120px] rounded-full"></div>

        <motion.h1
          className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="bg-linear-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">
            {text}
          </span>
        </motion.h1>

        <motion.p
          className="text-gray-400 max-w-xs sm:max-w-md md:max-w-xl mb-8 sm:mb-10 text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Smart AI-powered attendance system with face recognition, automation,
          and analytics.
        </motion.p>

        <motion.div
          className="
          flex flex-col sm:flex-row
          gap-3 sm:gap-4
          w-full sm:w-auto
        "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/login"
            className="
            px-6 sm:px-8 py-3
            bg-blue-600 rounded-xl
            hover:bg-blue-700 shadow-lg
            text-center
          "
          >
            Get Started
          </Link>

          <Link
            to="/register"
            className="
            px-6 sm:px-8 py-3
            border border-gray-500 rounded-xl
            hover:bg-gray-700
            text-center
          "
          >
            Create Account
          </Link>
        </motion.div>

        <motion.div
          className="
          mt-12 sm:mt-16
          w-28 sm:w-36 md:w-40
          h-28 sm:h-36 md:h-40
          rounded-full border-4 border-blue-500
          flex items-center justify-center
        "
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 bg-blue-500 rounded-full animate-ping"></div>
        </motion.div>
      </div>

      <div
        className="
      relative z-10
      max-w-6xl mx-auto
      grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
      gap-6 md:gap-8
      px-4 sm:px-6
      py-16 sm:py-20
    "
      >
        {[
          {
            icon: "🤖",
            title: "Face Recognition",
            desc: "AI-powered detection & matching",
          },
          {
            icon: "⚡",
            title: "Auto Attendance",
            desc: "Instant check-in & check-out",
          },
          {
            icon: "📊",
            title: "Analytics",
            desc: "Track working hours & reports",
          },
        ].map((item, i) => (
          <TiltCard key={i}>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl mb-4">{item.icon}</div>
              <h3 className="text-lg sm:text-xl font-bold">{item.title}</h3>
              <p className="text-gray-400 mt-2 text-sm sm:text-base">
                {item.desc}
              </p>
            </div>
          </TiltCard>
        ))}
      </div>

      <motion.div
        className="
        text-center relative z-10
        py-16 sm:py-20 md:py-24
        px-4
      "
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
          Upgrade Your Attendance System 🚀
        </h2>

        <Link
          to="/register"
          className="
          px-8 sm:px-10 py-3
          bg-green-600 rounded-xl
          hover:bg-green-700 shadow-lg
        "
        >
          Start Now
        </Link>
      </motion.div>

      <style>
        {`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }

        .animate-float {
          animation: float linear infinite;
        }
      `}
      </style>
    </div>
  );
}
