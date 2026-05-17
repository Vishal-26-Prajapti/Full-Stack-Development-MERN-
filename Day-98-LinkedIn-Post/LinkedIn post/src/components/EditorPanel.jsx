import ThemeSelector from "./ThemeSelector";

export default function EditorPanel({
  userName,
  setUserName,
  headline,
  setHeadline,
  postText,
  setPostText,
  theme,
  setTheme,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-6 text-white">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-wide">Post Creator</h2>
        <p className="text-sm text-white/60 mt-1">
          Create and customize your LinkedIn post in real-time
        </p>
      </div>

      <div className="space-y-4">
        <Input
          label="Your Name"
          value={userName}
          setValue={setUserName}
          placeholder="Enter your name"
        />

        <Input
          label="Headline"
          value={headline}
          setValue={setHeadline}
          placeholder="e.g. Full Stack Developer"
        />

        <div>
          <label className="text-sm font-medium text-white/80">
            Post Content
          </label>

          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            rows={6}
            placeholder="Write your LinkedIn post..."
            className="w-full mt-2 p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 
                       focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 
                       transition-all resize-none"
          />
        </div>

        <div className="pt-2">
          <ThemeSelector theme={theme} setTheme={setTheme} />
        </div>

        <button
          className="w-full mt-4 py-3 rounded-xl font-semibold 
                           bg-linear-to-r from-blue-500 to-indigo-600 
                           hover:from-blue-600 hover:to-indigo-700 
                           transition-all duration-300 shadow-lg shadow-blue-500/20"
        >
          Update Preview
        </button>
      </div>
    </div>
  );
}

function Input({ label, value, setValue, placeholder }) {
  return (
    <div>
      <label className="text-sm font-medium text-white/80">{label}</label>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full mt-2 p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 
                   focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 
                   transition-all"
      />
    </div>
  );
}
