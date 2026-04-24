const canvas = document.getElementById("scratch-canvas");
const ctx = canvas.getContext("2d");
const progressBar = document.getElementById("progress-bar");
const hint = document.getElementById("hint");

const scratchSound = document.getElementById("scratch-sound");
const winSound = document.getElementById("win-sound");

canvas.width = 320;
canvas.height = 320;

const rewards = [
  { emoji: "💰", title: "₹50 Cashback", sub: "Code: WIN50", prob: 40 },
  { emoji: "🔥", title: "20% OFF", sub: "Code: SAVE20", prob: 30 },
  { emoji: "🎁", title: "Free Gift", sub: "Show at store", prob: 20 },
  { emoji: "💎", title: "JACKPOT ₹500", sub: "Lucky you!", prob: 5 },
  { emoji: "😢", title: "Try Again", sub: "Better luck next time", prob: 5 },
];

function getReward() {
  let total = rewards.reduce((sum, r) => sum + r.prob, 0);
  let rand = Math.random() * total;

  for (let r of rewards) {
    if (rand < r.prob) return r;
    rand -= r.prob;
  }
}

function drawLayer() {
  ctx.fillStyle = "#999";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
drawLayer();

ctx.globalCompositeOperation = "destination-out";

let isDrawing = false;
let revealed = false;

function scratch(e) {
  if (!isDrawing) return;

  scratchSound.play();

  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX || e.touches[0].clientX) - rect.left;
  const y = (e.clientY || e.touches[0].clientY) - rect.top;

  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.fill();

  checkProgress();
}

function checkProgress() {
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  let cleared = 0;

  for (let i = 3; i < data.length; i += 20) {
    if (data[i] === 0) cleared++;
  }

  const pct = Math.round((cleared / ((320 * 320) / 20)) * 100);
  progressBar.style.width = pct + "%";

  if (pct > 85 && !revealed) {
    revealed = true;

    const reward = getReward();

    document.getElementById("reward-emoji").textContent = reward.emoji;
    document.getElementById("reward-title").textContent = reward.title;
    document.getElementById("reward-sub").textContent = reward.sub;

    document.getElementById("copy-btn").style.display = "block";

    winSound.play();
    navigator.vibrate?.(200);

    localStorage.setItem("lastReward", JSON.stringify(reward));

    triggerConfetti();
    hint.textContent = "🎉 Reward Unlocked!";
  }
}

const confettiCanvas = document.getElementById("confetti-canvas");
const cctx = confettiCanvas.getContext("2d");

confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

function triggerConfetti() {
  for (let i = 0; i < 200; i++) {
    setTimeout(() => {
      cctx.fillStyle = `hsl(${Math.random() * 360},100%,50%)`;
      cctx.fillRect(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight,
        5,
        5,
      );
    }, i * 5);
  }
}

document.getElementById("copy-btn").onclick = () => {
  const text = document.getElementById("reward-sub").textContent;
  navigator.clipboard.writeText(text);
  alert("Copied!");
};

canvas.addEventListener("mousedown", () => (isDrawing = true));
canvas.addEventListener("mousemove", scratch);
canvas.addEventListener("mouseup", () => (isDrawing = false));

canvas.addEventListener("touchstart", () => (isDrawing = true));
canvas.addEventListener("touchmove", scratch);
canvas.addEventListener("touchend", () => (isDrawing = false));

document.getElementById("reset-btn").onclick = () => {
  ctx.globalCompositeOperation = "source-over";
  drawLayer();
  ctx.globalCompositeOperation = "destination-out";

  progressBar.style.width = "0%";
  revealed = false;

  document.getElementById("reward-emoji").textContent = "🎁";
  document.getElementById("reward-title").textContent = "Try Your Luck";
  document.getElementById("reward-sub").textContent = "Scratch to reveal";

  document.getElementById("copy-btn").style.display = "none";

  cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
};
