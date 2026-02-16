let seconds = 0;
let milliseconds = 0;
let interval = null;
let isRunning = false;

const secEl = document.getElementById("seconds");
const msEl = document.getElementById("milliseconds");
const startPauseBtn = document.getElementById("startPause");
const resetBtn = document.getElementById("reset");
const timeBox = document.getElementById("timeBox");

function updateDisplay() {
    secEl.textContent = seconds.toString().padStart(2, "0");
    msEl.textContent = milliseconds.toString().padStart(2, "0");
}

function startTimer() {
    interval = setInterval(() => {
        milliseconds++;
        if (milliseconds === 100) {
            seconds++;
            milliseconds = 0;
        }
        updateDisplay();
    }, 10);
}

startPauseBtn.addEventListener("click", () => {
    if (!isRunning) {
        startTimer();
        startPauseBtn.textContent = "Pause";
        timeBox.classList.add("active");
        resetBtn.disabled = false;
    } else {
        clearInterval(interval);
        startPauseBtn.textContent = "Start";
        timeBox.classList.remove("active");
    }
    isRunning = !isRunning;
});

resetBtn.addEventListener("click", () => {
    clearInterval(interval);
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
    startPauseBtn.textContent = "Start";
    resetBtn.disabled = true;
    timeBox.classList.remove("active");
    isRunning = false;
});