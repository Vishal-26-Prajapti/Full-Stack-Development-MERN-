const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "01";
const fontSize = 14;
const columns = canvas.width / fontSize;

const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff9f";
  ctx.font = fontSize + "px monospace";

  drops.forEach((y, i) => {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, y * fontSize);

    if (y * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  });
}

setInterval(drawMatrix, 50);

const counter = document.getElementById("counter");
const status = document.getElementById("status");
const terminal = document.getElementById("terminalText");

let count = 0;

const messages = [
  ">>> Initializing system...",
  ">>> Connecting to dark server...",
  ">>> Bypassing firewall...",
  ">>> Decrypting files...",
  ">>> Injecting payload...",
  ">>> Access granted...",
];

let i = 0;

function typeLine(text) {
  let index = 0;
  function type() {
    if (index < text.length) {
      terminal.innerHTML += text[index];
      index++;
      setTimeout(type, 20);
    } else {
      terminal.innerHTML += "<br>";
    }
  }
  type();
}

function update() {
  if (count < 100) {
    count += Math.random() > 0.8 ? 2 : 1;
    count = Math.min(count, 100);

    counter.innerText = count + "%";

    if (count % 20 === 0 && i < messages.length) {
      typeLine(messages[i]);
      i++;
    }

    if (count === 30) status.innerText = "BREACHING...";
    if (count === 70) status.innerText = "DECRYPTING...";
    if (count === 90) status.innerText = "FINALIZING...";
  } else {
    status.innerText = "ACCESS GRANTED";
    typeLine(">>> ROOT ACCESS ENABLED");
    return;
  }

  setTimeout(update, 80);
}

setTimeout(update, 500);
