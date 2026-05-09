import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import MicButton from "../components/MicButton";
import VoiceWave from "../components/VoiceWave";
import LanguageSelector from "../components/LanguageSelector";

function Home() {
  return (
    <div className="h-screen flex flex-col bg-slate-950 text-white">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <ChatBox />

          <div className="border-t border-slate-700 p-6 flex flex-col items-center gap-4">
            <VoiceWave />

            <MicButton />

            <LanguageSelector />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
