import ChatMessage from "./ChatMessage";

function ChatBox() {
  const messages = [
    {
      sender: "assistant",
      message: "Hello! How can I help you?",
    },
    {
      sender: "user",
      message: "What is the weather today?",
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {messages.map((msg, index) => (
        <ChatMessage key={index} sender={msg.sender} message={msg.message} />
      ))}
    </div>
  );
}

export default ChatBox;
