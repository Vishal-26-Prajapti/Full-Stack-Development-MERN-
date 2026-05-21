const phraseBank = [
  "the quick brown fox jumps over the lazy dog coding everyday builds muscle memory for developers",
  "javascript is an asynchronous event driven language designed to create interactive user interfaces",
  "clean code always looks like it was written by someone who cares about their craftsmanship",
  "music can improve concentration creativity and emotional well being during focused work sessions",
  "coffee has become an essential productivity ritual for countless developers and designers globally",
  "learning new skills regularly keeps the brain adaptable sharp and intellectually curious",
  "the internet connects billions of people through information communication and shared experiences",
  "future innovations will continue reshaping education healthcare transportation and entertainment industries",
];

let testDuration = 30;
let timeLeft = testDuration;

let timer = null;
let isTesting = false;

let totalKeystrokes = 0;
let correctKeystrokes = 0;

let mistakes = 0;
let currentIndex = 0;

const textDisplay = document.getElementById("text-display");
const keyboardInput = document.getElementById("keyboard-input");

const wpmDisplay = document.getElementById("wpm-display");
const accuracyDisplay = document.getElementById("accuracy-display");
const timerDisplay = document.getElementById("timer-display");

const restartBtn = document.getElementById("restart-btn");

function getRandomPhrase() {
  return phraseBank[Math.floor(Math.random() * phraseBank.length)];
}

function initializeTest() {
  clearInterval(timer);

  isTesting = false;

  timeLeft = testDuration;

  totalKeystrokes = 0;
  correctKeystrokes = 0;
  mistakes = 0;
  currentIndex = 0;

  keyboardInput.disabled = false;
  keyboardInput.value = "";

  wpmDisplay.textContent = "0";
  accuracyDisplay.textContent = "100%";
  timerDisplay.textContent = `${timeLeft}s`;

  const randomPhrase = getRandomPhrase();

  textDisplay.innerHTML = randomPhrase
    .split("")
    .map((char, index) => {
      return `
        <span class="char ${index === 0 ? "current" : ""}">${char}</span>
      `;
    })
    .join("");

  keyboardInput.focus();

  animateCard();
}

function updateMetrics() {
  const accuracy =
    totalKeystrokes === 0
      ? 100
      : Math.round((correctKeystrokes / totalKeystrokes) * 100);

  accuracyDisplay.textContent = `${accuracy}%`;

  const timeElapsed = testDuration - timeLeft;

  if (timeElapsed > 0) {
    const wpm = Math.round(correctKeystrokes / 5 / (timeElapsed / 60));

    wpmDisplay.textContent = Math.max(0, wpm);
  }
}

function startTimer() {
  isTesting = true;

  timer = setInterval(() => {
    timeLeft--;

    timerDisplay.textContent = `${timeLeft}s`;

    updateMetrics();

    if (timeLeft <= 0) {
      finishTest();
    }
  }, 1000);
}

function finishTest() {
  clearInterval(timer);

  keyboardInput.disabled = true;

  isTesting = false;

  const finalWPM = wpmDisplay.textContent;
  const finalAccuracy = accuracyDisplay.textContent;

  const modal = document.getElementById("result-modal");

  const finalWpmEl = document.getElementById("final-wpm");

  const finalAccuracyEl = document.getElementById("final-accuracy");

  const finalMistakesEl = document.getElementById("final-mistakes");

  finalWpmEl.textContent = finalWPM;
  finalAccuracyEl.textContent = finalAccuracy;
  finalMistakesEl.textContent = mistakes;

  modal.classList.remove("hidden");
}

keyboardInput.addEventListener("input", () => {
  const characters = textDisplay.querySelectorAll(".char");

  const typedText = keyboardInput.value;

  if (!isTesting && typedText.length === 1 && timeLeft === testDuration) {
    startTimer();
  }

  currentIndex = typedText.length;

  totalKeystrokes = typedText.length;

  correctKeystrokes = 0;
  mistakes = 0;

  characters.forEach((charSpan, index) => {
    const typedChar = typedText[index];

    charSpan.classList.remove("correct", "incorrect", "current");

    if (typedChar == null) {
    } else if (typedChar === charSpan.textContent) {
      charSpan.classList.add("correct");
      correctKeystrokes++;
    } else {
      charSpan.classList.add("incorrect");
      mistakes++;
    }

    if (index === currentIndex) {
      charSpan.classList.add("current");
    }
  });

  updateMetrics();

  updateDynamicEffects();

  if (typedText.length === characters.length) {
    finishTest();
  }
});

function updateDynamicEffects() {
  const accuracy =
    totalKeystrokes === 0 ? 100 : (correctKeystrokes / totalKeystrokes) * 100;

  const typingCard = document.querySelector(".typing-card");

  if (accuracy >= 95) {
    typingCard.style.boxShadow = "0 0 50px rgba(34,197,94,0.35)";
  } else if (accuracy >= 80) {
    typingCard.style.boxShadow = "0 0 50px rgba(59,130,246,0.35)";
  } else {
    typingCard.style.boxShadow = "0 0 50px rgba(239,68,68,0.35)";
  }
}

function animateCard() {
  const container = document.querySelector(".container");

  document.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 40;

    const y = (window.innerHeight / 2 - e.pageY) / 40;

    container.style.transform = `
      rotateY(${x}deg)
      rotateX(${-y}deg)
    `;
  });
}

const closeModalBtn = document.getElementById("close-modal-btn");

const resultModal = document.getElementById("result-modal");

closeModalBtn.addEventListener("click", () => {
  resultModal.classList.add("hidden");

  initializeTest();
});

textDisplay.addEventListener("click", () => {
  keyboardInput.focus();
});

restartBtn.addEventListener("click", () => {
  initializeTest();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    e.preventDefault();
    initializeTest();
  }
});

window.addEventListener("DOMContentLoaded", initializeTest);