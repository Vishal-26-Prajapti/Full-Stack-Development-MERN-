/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          blue: "#00D9FF",
          purple: "#B024FF",
          pink: "#FF1493",
          cyan: "#00FFFF",
          green: "#39FF14",
        },
      },
      keyframes: {
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(0, 217, 255, 0.5)" },
          "50%": { boxShadow: "0 0 20px rgba(0, 217, 255, 0.8)" },
        },
      },
      animation: {
        glow: "glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
