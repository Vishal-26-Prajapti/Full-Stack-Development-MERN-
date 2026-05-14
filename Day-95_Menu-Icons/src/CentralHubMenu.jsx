import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Search,
  Settings,
  User,
  Bell,
  MessageSquare,
  Menu,
} from "lucide-react";

/**
 * CentralHubMenu - Modern Interactive Central Hub Menu Component
 * Features:
 * - Radial menu expansion/collapse with spring animations
 * - Staggered animation on icons
 * - Hover effects with glow and scale
 * - Backdrop blur overlay
 * - Responsive for mobile and desktop
 * - Dark theme with neon colors
 * - Smooth rotation of center button
 */

const CentralHubMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Menu items with icons and labels
  const menuItems = [
    { id: 1, label: "Home", icon: Home, color: "neon-blue" },
    { id: 2, label: "Search", icon: Search, color: "neon-cyan" },
    { id: 3, label: "Settings", icon: Settings, color: "neon-purple" },
    { id: 4, label: "User", icon: User, color: "neon-pink" },
    { id: 5, label: "Notifications", icon: Bell, color: "neon-blue" },
    { id: 6, label: "Messages", icon: MessageSquare, color: "neon-cyan" },
  ];

  const itemCount = menuItems.length;
  const radius = 120; // Distance of icons from center
  const angleSlice = (2 * Math.PI) / itemCount;

  // Calculate position for each menu item in radial layout
  const getItemPosition = (index) => {
    const angle = angleSlice * index - Math.PI / 2;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Handle icon click
  const handleIconClick = (label) => {
    console.log(`Clicked: ${label}`);
    setIsOpen(false);
  };

  // Handle center button click
  const handleCenterClick = () => {
    setIsOpen(!isOpen);
  };

  // Center button variants for rotation
  const centerButtonVariants = {
    closed: {
      rotate: 0,
    },
    open: {
      rotate: 45,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  // Menu item container variants
  const itemVariants = {
    closed: {
      opacity: 0,
      scale: 0,
      x: 0,
      y: 0,
    },
    open: (custom) => {
      const position = getItemPosition(custom);
      return {
        opacity: 1,
        scale: 1,
        x: position.x,
        y: position.y,
        transition: {
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: custom * 0.05,
        },
      };
    },
  };

  // Backdrop variants
  const backdropVariants = {
    closed: {
      opacity: 0,
      pointerEvents: "none",
    },
    open: {
      opacity: 1,
      pointerEvents: "auto",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div
      ref={menuRef}
      className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center overflow-hidden"
    >
      {/* Backdrop overlay with blur */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 backdrop-blur-sm bg-black/20"
          />
        )}
      </AnimatePresence>

      {/* Main container for menu */}
      <div className="relative w-96 h-96 flex items-center justify-center">
        {/* Menu items (small icons) */}
        <AnimatePresence>
          {isOpen &&
            menuItems.map((item, index) => {
              const Icon = item.icon;
              const colorMap = {
                "neon-blue": {
                  text: "text-cyan-400",
                  glow: "shadow-cyan-400/50",
                  bg: "bg-cyan-400/10 hover:bg-cyan-400/20",
                },
                "neon-cyan": {
                  text: "text-cyan-300",
                  glow: "shadow-cyan-300/50",
                  bg: "bg-cyan-300/10 hover:bg-cyan-300/20",
                },
                "neon-purple": {
                  text: "text-purple-400",
                  glow: "shadow-purple-400/50",
                  bg: "bg-purple-400/10 hover:bg-purple-400/20",
                },
                "neon-pink": {
                  text: "text-pink-400",
                  glow: "shadow-pink-400/50",
                  bg: "bg-pink-400/10 hover:bg-pink-400/20",
                },
              };
              const colors = colorMap[item.color] || colorMap["neon-blue"];

              const tooltipColorMap = {
                "neon-blue": "from-cyan-400 to-blue-600 text-cyan-900",
                "neon-cyan": "from-cyan-300 to-cyan-500 text-cyan-950",
                "neon-purple": "from-purple-400 to-purple-600 text-purple-950",
                "neon-pink": "from-pink-400 to-pink-600 text-pink-950",
              };
              const tooltipGradientClasses = {
                "neon-blue":
                  "bg-gradient-to-r from-cyan-400 to-blue-600 text-cyan-900",
                "neon-cyan":
                  "bg-gradient-to-r from-cyan-300 to-cyan-500 text-cyan-950",
                "neon-purple":
                  "bg-gradient-to-r from-purple-400 to-purple-600 text-purple-950",
                "neon-pink":
                  "bg-gradient-to-r from-pink-400 to-pink-600 text-pink-950",
              };
              const tooltipGlow = {
                "neon-blue": "bg-gradient-to-r from-cyan-400 to-blue-600",
                "neon-cyan": "bg-gradient-to-r from-cyan-300 to-cyan-500",
                "neon-purple": "bg-gradient-to-r from-purple-400 to-purple-600",
                "neon-pink": "bg-gradient-to-r from-pink-400 to-pink-600",
              };
              const tooltipClasses =
                tooltipGradientClasses[item.color] ||
                tooltipGradientClasses["neon-blue"];
              const tooltipGlowClasses =
                tooltipGlow[item.color] || tooltipGlow["neon-blue"];

              return (
                <motion.div
                  key={item.id}
                  custom={index}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="absolute"
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleIconClick(item.label)}
                    className={`group relative cursor-pointer w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${colors.bg} border border-white/10 backdrop-blur-md hover:border-white/30`}
                    style={{
                      boxShadow: isOpen ? `0 0 20px ${colors.glow}` : "none",
                    }}
                  >
                    {/* Icon */}
                    <Icon
                      className={`w-7 h-7 ${colors.text} transition-all duration-300`}
                    />

                    {/* Enhanced Tooltip with Neon Color */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6, y: -10 }}
                      whileHover={{ opacity: 1, scale: 1, y: -20 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className={`absolute left-1/2 transform -translate-x-1/2 pointer-events-none z-20 text-sm font-bold px-4 py-2 rounded-lg whitespace-nowrap ${tooltipClasses} shadow-lg border border-white/30 backdrop-blur-md`}
                    >
                      {item.label}

                      {/* Tooltip Arrow */}
                      <div
                        className={`absolute w-2 h-2 ${tooltipGlowClasses} transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1`}
                      />
                    </motion.div>

                    {/* Tooltip Glow Effect on Hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-20 pointer-events-none w-24 h-10 rounded-lg blur-md ${tooltipGlowClasses}`}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
        </AnimatePresence>

        {/* Center button (Main action button) */}
        <motion.button
          variants={centerButtonVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          onClick={handleCenterClick}
          className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 group border-2 border-cyan-300/50 hover:border-cyan-300"
          style={{
            boxShadow: isOpen
              ? "0 0 30px rgba(0, 217, 255, 0.6), 0 0 60px rgba(0, 217, 255, 0.3)"
              : "0 10px 25px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 217, 255, 0.2)",
          }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Menu className="w-10 h-10 text-white" />
          </motion.div>

          {/* Animated glow effect */}
          <motion.div
            animate={{
              scale: isOpen ? [1, 1.3, 1] : 1,
              opacity: isOpen ? [0.7, 0.3] : 0.5,
            }}
            transition={{
              duration: 2,
              repeat: isOpen ? Infinity : 0,
            }}
            className="absolute inset-0 rounded-full border border-cyan-300/50"
          />
        </motion.button>
      </div>

      {/* Background gradient accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Responsive hint on mobile */}
      <div className="absolute bottom-8 left-0 right-0 text-center text-slate-400 text-sm md:hidden">
        Click the button to open menu
      </div>
    </div>
  );
};

export default CentralHubMenu;
