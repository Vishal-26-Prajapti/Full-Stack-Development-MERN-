const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const crosshair = document.getElementById("crosshair");
const gameBody = document.getElementById("game-body");
const scoreBoard = document.getElementById("score-board");
const timerBoard = document.getElementById("timer-board");
const gameOverScreen = document.getElementById("game-over-screen");
const finalScoreText = document.getElementById("final-score");

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

let score = 0;
let timeLeft = 30;
let gameActive = false;
let gameInterval, timerInterval;
let particles = [];

window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

window.addEventListener("mousemove", (e) => {
  crosshair.style.left = e.clientX + "px";
  crosshair.style.top = e.clientY + "px";
});

window.addEventListener("mousedown", () => {
  if (!gameActive) return;
  gameBody.classList.remove("flash");
  void gameBody.offsetWidth; // Force Reflow
  gameBody.classList.add("flash");
});

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 2;
    this.speedX = (Math.random() - 0.5) * 8;
    this.speedY = (Math.random() - 0.5) * 8;
    this.color = color;
    this.alpha = 1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 0.02;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function spawnTarget() {
  if (!gameActive) return;

  const oldTarget = document.querySelector(".target");
  if (oldTarget) oldTarget.remove();

  const target = document.createElement("div");
  target.classList.add("target");

  const x = Math.random() * (width - 150) + 75;
  const y = Math.random() * (height - 200) + 100;

  target.style.left = `${x}px`;
  target.style.top = `${y}px`;

  target.addEventListener("mousedown", (e) => {
    e.stopPropagation(); // Avoid double flashing screen
    score += 10;
    scoreBoard.textContent = `SCORE: ${score}`;

    for (let i = 0; i < 20; i++) {
      particles.push(new Particle(x, y, "#00ffcc"));
    }

    target.remove();
    spawnTarget(); 
  });

  document.body.appendChild(target);
}

function Engine() {
  ctx.fillStyle = "rgba(5, 5, 10, 0.3)"; 
  ctx.fillRect(0, 0, width, height);

  if (Math.random() < 0.1) {
    ctx.fillStyle = "rgba(0, 255, 204, 0.2)";
    ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2);
  }

  particles.forEach((p, index) => {
    p.update();
    p.draw();
    if (p.alpha <= 0) particles.splice(index, 1);
  });

  requestAnimationFrame(Engine);
}

function startGame() {
  score = 0;
  timeLeft = 30;
  gameActive = true;
  particles = [];

  scoreBoard.textContent = `SCORE: ${score}`;
  timerBoard.textContent = `TIME: ${timeLeft}`;
  gameOverScreen.classList.remove("visible");

  spawnTarget();

  clearInterval(gameInterval);
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    timeLeft--;
    timerBoard.textContent = `TIME: ${timeLeft}`;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);

  gameInterval = setInterval(spawnTarget, 2000);
}

function endGame() {
  gameActive = false;
  clearInterval(gameInterval);
  clearInterval(timerInterval);

  const remainingTarget = document.querySelector(".target");
  if (remainingTarget) remainingTarget.remove();

  finalScoreText.textContent = `FINAL SCORE: ${score}`;
  gameOverScreen.classList.add("visible");
}

Engine();
startGame();
