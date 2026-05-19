import GlowBackground from "./components/ui/GlowBackground";

import HumanVerification from "./components/verification/HumanVerification";

export default function App() {
  return (
    <main className="relative h-screen overflow-hidden bg-[#020617] flex items-center justify-center px-4">
      <GlowBackground />

      <div className="relative z-10 w-full max-w-sm">
        <div className="text-center mb-4">
          <h1 className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-500 to-cyan-300">
            Link Generator
          </h1>
        </div>

        <HumanVerification />

      </div>
    </main>
  );
}
