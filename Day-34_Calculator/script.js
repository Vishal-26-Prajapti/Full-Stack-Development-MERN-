const calculator = document.getElementById("calculator");
const buttons = document.querySelectorAll(".buttons button");
const screen = document.getElementById("screen");
const clear = document.getElementById("clear");

let expression = "";

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.innerText;

    if (value === "=") {
      calculate();
    } else {
      expression += value;
      screen.innerText = expression;
    }

    animateButton(btn);
  });
});

clear.addEventListener("click", () => {
  expression = "";
  screen.innerText = "";
});

function calculate() {
  try {
    expression = eval(expression).toString();
    screen.innerText = expression;
  } catch {
    screen.innerText = "Error";
    expression = "";
  }
}

function animateButton(btn) {
  gsap.fromTo(
    btn,
    { scale: 1 },
    { scale: 0.85, duration: 0.1, yoyo: true, repeat: 1 },
  );
}

document.addEventListener("mousemove", (e) => {
  const x = (window.innerWidth / 2 - e.clientX) / 25;
  const y = (window.innerHeight / 2 - e.clientY) / 25;

  calculator.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
});

document.addEventListener("keydown", (e) => {
  const key = e.key;

  if ("0123456789+-*/.".includes(key)) {
    expression += key;
    screen.innerText = expression;
  }

  if (key === "Enter") calculate();

  if (key === "Backspace") {
    expression = expression.slice(0, -1);
    screen.innerText = expression;
  }
});