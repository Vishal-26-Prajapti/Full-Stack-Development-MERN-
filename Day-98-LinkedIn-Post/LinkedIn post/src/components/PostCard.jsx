import {
  FaThumbsUp,
  FaHeart,
  FaLightbulb,
  FaGlobeAmericas,
  FaEllipsisH,
} from "react-icons/fa";
import { FiThumbsUp } from "react-icons/fi";

export default function PostCard({
  userName,
  headline,
  postText,
  theme,
  liked,
  setLiked,
}) {
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const likeCount = liked ? 43 : 42;

  const themeClass = {
    clean: "bg-gradient-to-br from-sky-100 to-sky-400 text-sky-900",
    tech: "bg-gradient-to-br from-gray-950 via-indigo-950 to-black text-cyan-300",
    corp: "bg-gradient-to-br from-blue-900 to-teal-600 text-white",
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-blue-500/10">
      <div className="flex items-start gap-3 p-4 relative">
        <div className="w-11 h-11 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
          {initials || "??"}
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-sm text-white">
            {userName || "Your Name"}
          </h3>

          <p className="text-xs text-white/60">{headline || "Your headline"}</p>

          <p className="text-xs text-white/40 flex items-center gap-1 mt-1">
            Just now <FaGlobeAmericas />
          </p>
        </div>

        <FaEllipsisH className="text-white/40 hover:text-white cursor-pointer mt-1" />
      </div>

      <div className="px-4 pb-3 text-sm text-white/90 whitespace-pre-line leading-relaxed">
        {postText || "Write something amazing..."}
      </div>

      <div
        className={`h-52 flex items-center justify-center text-center ${themeClass[theme]} transition-all`}
      >
        <div>
          <h2 className="text-xl font-bold">Interactive Post</h2>
          <p className="text-sm opacity-80">React + Tailwind CSS</p>
        </div>
      </div>

      <div className="flex justify-between px-4 py-2 text-xs text-white/50 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1">
            <FaThumbsUp className="text-blue-400" />
            <FaHeart className="text-red-400" />
            <FaLightbulb className="text-yellow-400" />
          </div>
          <span>{likeCount} reactions</span>
        </div>

        <span>12 comments</span>
      </div>

      <div className="flex text-sm">
        <button
          onClick={() => setLiked(!liked)}
          className={`flex-1 py-3 flex items-center justify-center gap-2 transition-all duration-200 hover:bg-white/5 ${
            liked ? "text-blue-400" : "text-white/60"
          }`}
        >
          {liked ? <FaThumbsUp /> : <FiThumbsUp />}
          Like
        </button>

        <button className="flex-1 py-3 flex items-center justify-center gap-2 text-white/60 hover:bg-white/5 transition-all">
          Comment
        </button>

        <button className="flex-1 py-3 flex items-center justify-center gap-2 text-white/60 hover:bg-white/5 transition-all">
          Repost
        </button>

        <button className="flex-1 py-3 flex items-center justify-center gap-2 text-white/60 hover:bg-white/5 transition-all">
          Send
        </button>
      </div>
    </div>
  );
}
