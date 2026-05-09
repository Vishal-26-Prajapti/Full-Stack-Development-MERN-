function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 border-r border-slate-700 p-4">
      <h2 className="text-lg font-semibold mb-6 text-white">Features</h2>

      <ul className="space-y-4 text-slate-300">
        <li className="text-lg">🎤 Voice Commands</li>
        <li className="text-lg">🌍 Multi Language</li>
        <li className="text-lg">🤖 AI Assistant</li>
        <li className="text-lg">🌦 Weather</li>
        <li className="text-lg">▶️ YouTube Search</li>
      </ul>
    </div>
  );
}

export default Sidebar;
