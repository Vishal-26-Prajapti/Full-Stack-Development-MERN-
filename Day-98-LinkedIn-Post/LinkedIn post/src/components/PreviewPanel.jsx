import PostCard from "./PostCard";

export default function PreviewPanel({
  userName,
  headline,
  postText,
  theme,
  liked,
  setLiked,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-6 text-white h-fit">
      <div className="mb-5">
        <h2 className="text-2xl font-bold tracking-wide">Live Preview</h2>
        <p className="text-sm text-white/60 mt-1">
          This is how your LinkedIn post will appear
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-xl space-y-4">
          <PostCard
            userName={userName}
            headline={headline}
            postText={postText}
            theme={theme}
            liked={liked}
            setLiked={setLiked}
          />
        </div>
      </div>
    </div>
  );
}
