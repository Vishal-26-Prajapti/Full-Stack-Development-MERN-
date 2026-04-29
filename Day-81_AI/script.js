const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const chatWindow = document.getElementById("chat-window");

const responses = {
  "explain quantum computing":
    "Quantum computing uses qubits that can exist in multiple states (superposition). It uses entanglement and interference to solve complex problems much faster than classical computers.\n\nIt is useful in cryptography, simulations, and optimization problems.",

  "write a short poem":
    "In lines of code I softly stay,\nTurning thoughts into light of day,\nYou ask, I build from words unseen,\nA bridge between what might have been ✨",

  "help me plan my day":
    "Here’s a simple plan:\n\n1. Do your most important task first\n2. Then complete 2 medium tasks\n3. Take breaks (very important)\n4. Keep buffer time for unexpected work",

  "summarise a topic":
    "Tell me the topic you want to summarize, and I’ll break it down into simple points.",

  hi: "Hello 👋 How can I help you today?",
  hello: "Hey there! 😊 What would you like to learn or explore?",
  hey: "Hey! I’m here — ask me anything.",
  "good morning": "Good morning ☀️ Hope you have a great day!",
  "good afternoon": "Good afternoon 😊 How can I help you?",
  "good evening": "Good evening 🌙 What are you working on?",
  "how are you": "I’m fine ⚡ How are you?",

  "who are you":
    "I’m a simple AI chatbot built using HTML, CSS, and JavaScript 🤖",
  "what can you do":
    "I can chat, answer questions, explain topics, and help you learn programming.",
  help: "You can ask me anything like coding help, poems, explanations, or planning.",

  javascript:
    "JavaScript is a programming language used to build interactive websites.",

  html: "HTML is used to structure web pages.",

  css: "CSS is used to style web pages and make them look beautiful.",

  react: "React is a JavaScript library for building user interfaces.",

  node: "Node.js allows JavaScript to run on the server.",

  api: "An API allows communication between different software systems.",

  frontend:
    "Frontend is everything users see on a website (UI, buttons, layout).",

  backend: "Backend handles server logic, database, and APIs.",

  "study tips":
    "Use active recall, Pomodoro technique (25–5 rule), and revise regularly.",

  motivation: "Small progress every day leads to big results over time 💪",

  "time management":
    "Prioritize important tasks, avoid multitasking, and plan your day.",

  joke: "Why do programmers hate nature? Too many bugs 😄",

  "tell me a joke":
    "Debugging: Being the detective in a crime movie where you are also the murderer 😄",

  default:
    "Hmm 🤔 I’m not fully sure about that yet. Can you rephrase or give more details?",
};

const fallbackReplies = [
  "That's interesting 🤔 Can you explain a bit more?",
  "Let me think... I need more detail to help you better.",
  "Good question! There are multiple ways to look at this.",
  "I’m not fully sure, but I can try helping if you rephrase it.",
  "That’s a deep topic — can you give more context?",
];

input.addEventListener("input", () => {
  sendBtn.disabled = input.value.trim() === "";

  input.style.height = "auto";
  input.style.height = Math.min(input.scrollHeight, 140) + "px";
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    if (!sendBtn.disabled) sendMessage();
  }
});

function sendSuggestion(el) {
  input.value = el.textContent;
  sendBtn.disabled = false;
  sendMessage();
}


function addMessage(role, text) {
  const welcome = document.getElementById("welcome-screen");
  if (welcome) welcome.remove();

  const msg = document.createElement("div");
  msg.className = `message ${role}`;

  const avatar = document.createElement("div");
  avatar.className = `avatar ${role === "assistant" ? "claude-av" : "user-av"}`;
  avatar.textContent = role === "assistant" ? "C" : "You";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.innerHTML = formatText(text);

  msg.appendChild(avatar);
  msg.appendChild(bubble);

  chatWindow.appendChild(msg);
  scrollToBottom();

  return msg;
}

function formatText(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br>");
}

function scrollToBottom() {
  setTimeout(() => {
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 50);
}

function showTyping() {
  removeTyping();

  const msg = document.createElement("div");
  msg.className = "message assistant";
  msg.id = "typing";

  const avatar = document.createElement("div");
  avatar.className = "avatar claude-av";
  avatar.textContent = "C";

  const indicator = document.createElement("div");
  indicator.className = "typing-indicator";
  indicator.innerHTML = `
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  `;

  msg.appendChild(avatar);
  msg.appendChild(indicator);

  chatWindow.appendChild(msg);
  scrollToBottom();
}

function removeTyping() {
  const t = document.getElementById("typing");
  if (t) t.remove();
}

function getReply(text) {
  const lower = text.toLowerCase().trim();

  for (const key in responses) {
    if (lower.includes(key)) {
      return responses[key];
    }
  }

  return fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
}

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage("user", text);

  input.value = "";
  input.style.height = "auto";
  sendBtn.disabled = true;

  showTyping();

  const delay = 800 + Math.random() * 700;

  setTimeout(() => {
    removeTyping();
    typeMessage(getReply(text));
  }, delay);
}

function typeMessage(text) {
  const msg = document.createElement("div");
  msg.className = "message assistant";

  const avatar = document.createElement("div");
  avatar.className = "avatar claude-av";
  avatar.textContent = "C";

  const bubble = document.createElement("div");
  bubble.className = "bubble";

  msg.appendChild(avatar);
  msg.appendChild(bubble);

  chatWindow.appendChild(msg);

  let i = 0;
  const speed = 12;

  function type() {
    if (i < text.length) {
      bubble.innerHTML = formatText(text.slice(0, ++i));
      scrollToBottom();
      setTimeout(type, speed);
    }
  }

  type();
}

function newChat() {
  chatWindow.innerHTML = `
    <div class="welcome" id="welcome-screen">
      <h1>How can I help you?</h1>
      <p>Ask me anything — I'm here to think with you.</p>

      <div class="suggestions">
        <div class="suggestion-chip" onclick="sendSuggestion(this)">Hi</div>
        <div class="suggestion-chip" onclick="sendSuggestion(this)">Explain JavaScript</div>
        <div class="suggestion-chip" onclick="sendSuggestion(this)">Write a poem</div>
        <div class="suggestion-chip" onclick="sendSuggestion(this)">Help me plan my day</div>
      </div>
    </div>
  `;

  input.value = "";
  sendBtn.disabled = true;
}
