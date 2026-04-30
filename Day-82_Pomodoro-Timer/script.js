let focusTime = 25 * 60;
let breakTime = 5 * 60;

let timeLeft = focusTime;
let isRunning = false;
let isFocus = true;
let timer = null;

const timeDisplay = document.getElementById("time");
const modeDisplay = document.getElementById("mode");
const progressBar = document.getElementById("progressBar");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

function updateDisplay() {
  let min = Math.floor(timeLeft / 60);
  let sec = timeLeft % 60;

  timeDisplay.textContent = `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;

  updateProgress();
}

function updateProgress() {
  let total = isFocus ? focusTime : breakTime;
  let percent = ((total - timeLeft) / total) * 100;
  progressBar.style.width = percent + "%";
}

function switchMode() {
  isFocus = !isFocus;

  if (isFocus) {
    timeLeft = focusTime;
    modeDisplay.textContent = "Focus Session";
  } else {
    timeLeft = breakTime;
    modeDisplay.textContent = "Break Time";
  }
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;

  timer = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timer);
      isRunning = false;
      switchMode();
      startTimer();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  isFocus = true;
  timeLeft = focusTime;
  modeDisplay.textContent = "Focus Session";
  updateDisplay();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();
