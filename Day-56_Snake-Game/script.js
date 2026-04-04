const board = document.querySelector(".board");
const modal = document.querySelector(".modal");
const startBtn = document.querySelector(".btn-start");
const restartBtn = document.querySelector(".btn-restart");
const startGameBox = document.querySelector(".start-game");
const gameOverBox = document.querySelector(".game-over");

const highScoreElement = document.querySelector("#high-score");
const scoreElement = document.querySelector("#score");
const timeElement = document.querySelector("#time");

const size = 20;

let snake = [{ x: 10, y: 10 }];
let direction = "right";
let food;

let interval = null;
let timerInterval = null;

let score = 0;
let time = 0;
let highScore = JSON.parse(localStorage.getItem("highScore")) || 0;

highScoreElement.textContent = highScore;

const blocks = [];

/* CREATE GRID */
for (let r = 0; r < size; r++) {
  for (let c = 0; c < size; c++) {
    const div = document.createElement("div");
    div.classList.add("block");
    board.appendChild(div);
    blocks[`${r}-${c}`] = div;
  }
}

/* RANDOM FOOD */
function randomFood() {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * size),
      y: Math.floor(Math.random() * size),
    };
  } while (snake.some((s) => s.x === newFood.x && s.y === newFood.y));

  return newFood;
}

/* RENDER */
function render() {
  document
    .querySelectorAll(".fill")
    .forEach((el) => el.classList.remove("fill"));
  document
    .querySelectorAll(".food")
    .forEach((el) => el.classList.remove("food"));

  let head = { ...snake[0] };

  if (direction === "right") head.y++;
  if (direction === "left") head.y--;
  if (direction === "up") head.x--;
  if (direction === "down") head.x++;

  // WALL COLLISION
  if (head.x < 0 || head.y < 0 || head.x >= size || head.y >= size) {
    gameEnd();
    return;
  }

  // SELF COLLISION
  if (snake.some((s) => s.x === head.x && s.y === head.y)) {
    gameEnd();
    return;
  }

  let grow = false;

  if (head.x === food.x && head.y === food.y) {
    food = randomFood();
    score++;
    scoreElement.textContent = score;

    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", JSON.stringify(highScore));
      highScoreElement.textContent = highScore;
    }

    // SPEED INCREASE
    clearInterval(interval);
    interval = setInterval(render, Math.max(60, 150 - score * 2));

    grow = true;
  }

  snake.unshift(head);
  if (!grow) snake.pop();

  snake.forEach((s) => blocks[`${s.x}-${s.y}`].classList.add("fill"));
  blocks[`${food.x}-${food.y}`].classList.add("food");
}

/* TIME */
function updateTime() {
  let h = Math.floor(time / 3600);
  let m = Math.floor((time % 3600) / 60);
  let s = time % 60;

  timeElement.textContent =
    String(h).padStart(2, "0") +
    ":" +
    String(m).padStart(2, "0") +
    ":" +
    String(s).padStart(2, "0");
}

/* START */
function gameStart() {
  modal.style.display = "none";
  food = randomFood();

  interval = setInterval(render, 200);

  timerInterval = setInterval(() => {
    time++;
    updateTime();
  }, 1000);
}

/* END */
function gameEnd() {
  clearInterval(interval);
  clearInterval(timerInterval);

  modal.style.display = "flex";
  startGameBox.style.display = "none";
  gameOverBox.style.display = "block";
}

/* RESTART */
function restartGame() {
  snake = [{ x: 10, y: 10 }];
  direction = "right";
  food = randomFood();
  score = 0;
  time = 0;

  scoreElement.textContent = 0;
  updateTime();

  modal.style.display = "none";

  interval = setInterval(render, 150);

  timerInterval = setInterval(() => {
    time++;
    updateTime();
  }, 1000);
}

/* EVENTS */
startBtn.addEventListener("click", gameStart);
restartBtn.addEventListener("click", restartGame);

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && direction !== "right") direction = "left";
  if (e.key === "ArrowRight" && direction !== "left") direction = "right";
  if (e.key === "ArrowUp" && direction !== "down") direction = "up";
  if (e.key === "ArrowDown" && direction !== "up") direction = "down";
});
