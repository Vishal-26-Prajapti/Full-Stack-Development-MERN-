function ChatMessage({ message, sender }) {
  return (
    <div
      className={`max-w-[70%] p-4 rounded-2xl mb-4 ${
        sender === "user" ? "bg-cyan-500 ml-auto" : "bg-slate-700"
      }`}
    >
      {message}
    </div>
  );
}

export default ChatMessage;
