import EditorPanel from "./components/EditorPanel";
import PreviewPanel from "./components/PreviewPanel";
import usePost from "./hooks/usePost";

export default function App() {
  const post = usePost();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <header className="w-full px-6 py-5 border-b border-white/10 backdrop-blur-md bg-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-wide">
            LinkedIn Post Creator
          </h1>

          <div className="text-sm text-white/60">Build • Preview • Publish</div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl p-5 hover:shadow-blue-500/10 transition-all duration-300">
            <EditorPanel {...post} />
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl p-5 hover:shadow-purple-500/10 transition-all duration-300">
            <PreviewPanel {...post} />
          </div>
        </div>
      </main>
    </div>
  );
}
