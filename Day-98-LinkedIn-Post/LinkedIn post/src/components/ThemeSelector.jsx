export default function ThemeSelector({ theme, setTheme }) {
  const themes = [
    {
      id: "clean",
      label: "Clean",
      desc: "Light & minimal",
      preview: "from-sky-200 to-sky-400",
    },
    {
      id: "tech",
      label: "Tech",
      desc: "Dark developer vibe",
      preview: "from-gray-900 to-indigo-900",
    },
    {
      id: "corp",
      label: "Corporate",
      desc: "Professional & bold",
      preview: "from-blue-800 to-teal-600",
    },
  ];

  return (
    <div>
      <p className="text-sm font-semibold text-white/80 mb-3">Choose Theme</p>

      <div className="grid grid-cols-3 gap-3">
        {themes.map((t) => {
          const isActive = theme === t.id;

          return (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`relative p-3 rounded-xl border text-left transition-all duration-300 overflow-hidden
                ${
                  isActive
                    ? "border-blue-500 bg-white/10 shadow-lg shadow-blue-500/20"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
            >
              <div
                className={`h-2 w-full rounded-full mb-3 bg-linear-to-r ${t.preview}`}
              />

              <p className="text-sm font-semibold text-white">{t.label}</p>

              <p className="text-xs text-white/50 mt-1">{t.desc}</p>

              {isActive && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500 shadow-md shadow-blue-500/50" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
