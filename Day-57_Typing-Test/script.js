const textDisplay = document.getElementById("textDisplay");
const inputField = document.getElementById("inputField");
const timerEl = document.getElementById("timer");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const resultEl = document.getElementById("result");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const difficultySelect = document.getElementById("difficulty");

let timer = 60;
let interval = null;
let startTime = null;
let currentText = "";

const texts = {
  easy: ["cat dog sun book pen", "apple ball car tree sky"],
  medium: [
    "The quick brown fox jumps over the lazy dog",
    "Typing fast requires practice and consistency"
  ],
  hard: [
    "JavaScript enables dynamic web applications with real time interactions",
    "Consistency and discipline are key factors for mastering programming skills"
  ]
};

function getRandomText(level) {
  const arr = texts[level];
  return arr[Math.floor(Math.random() * arr.length)];
}

function renderText(text) {
  textDisplay.innerHTML = "";
  text.split("").forEach(char => {
    const span = document.createElement("span");
    span.innerText = char;
    textDisplay.appendChild(span);
  });
}

startBtn.addEventListener("click", () => {
  currentText = getRandomText(difficultySelect.value);
  renderText(currentText);

  inputField.value = "";
  inputField.disabled = false;
  inputField.focus();

  timer = 60;
  timerEl.innerText = timer;
  resultEl.innerText = "";
  startTime = new Date();

  interval = setInterval(() => {
    timer--;
    timerEl.innerText = timer;

    if (timer === 0) {
      endTest();
    }
  }, 1000);
});

inputField.addEventListener("input", () => {
  const input = inputField.value.split("");
  const spans = textDisplay.querySelectorAll("span");

  let correct = 0;

  spans.forEach((charSpan, index) => {
    const char = input[index];

    if (char == null) {
      charSpan.classList.remove("text-green-500", "text-red-500");
    } else if (char === charSpan.innerText) {
      charSpan.classList.add("text-green-500");
      charSpan.classList.remove("text-red-500");
      correct++;
    } else {
      charSpan.classList.add("text-red-500");
      charSpan.classList.remove("text-green-500");
    }
  });

  const accuracy = input.length > 0 ? (correct / input.length) * 100 : 100;
  accuracyEl.innerText = accuracy.toFixed(0);

  const timePassed = (new Date() - startTime) / 1000 / 60;
  const words = input.length / 5;
  const wpm = Math.round(words / timePassed || 0);
  wpmEl.innerText = wpm;
});

function endTest() {
  clearInterval(interval);
  inputField.disabled = true;

  resultEl.innerText = `Final WPM: ${wpmEl.innerText} | Accuracy: ${accuracyEl.innerText}%`;
}

restartBtn.addEventListener("click", () => {
  clearInterval(interval);
  inputField.value = "";
  textDisplay.innerHTML = "";
  timerEl.innerText = "60";
  wpmEl.innerText = "0";
  accuracyEl.innerText = "100";
  resultEl.innerText = "";
  inputField.disabled = true;
});