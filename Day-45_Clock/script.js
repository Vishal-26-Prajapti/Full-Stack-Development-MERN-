const particleContainer = document.getElementById("particles");
for (let i = 0; i < 28; i++) {
  const p = document.createElement("div");
  p.className = "particle";
  p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${1.5 + Math.random() * 2.5}px;
      height: ${1.5 + Math.random() * 2.5}px;
      animation-duration: ${6 + Math.random() * 10}s;
      animation-delay: ${-Math.random() * 14}s;
      opacity: ${0.2 + Math.random() * 0.5};
    `;
  particleContainer.appendChild(p);
}

const face = document.getElementById("clockFace");
const cx = 100,
  cy = 100,
  r = 88;
const numR = 74;
const hours = ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

for (let i = 0; i < 60; i++) {
  const angle = (i / 60) * 360;
  const isMajor = i % 5 === 0;
  const len = isMajor ? 12 : 6;
  const tick = document.createElement("div");
  tick.className = "tick" + (isMajor ? " major" : "");
  const rad = ((angle - 90) * Math.PI) / 180;
  const x = cx + r * Math.cos(rad);
  const y = cy + r * Math.sin(rad);
  tick.style.cssText = `
      left: ${x}px; top: ${y}px;
      height: ${len}px;
      transform: translate(-50%, 0) rotate(${angle}deg);
    `;
  face.appendChild(tick);
}

hours.forEach((h, i) => {
  const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
  const x = cx + numR * Math.cos(angle);
  const y = cy + numR * Math.sin(angle);
  const el = document.createElement("div");
  el.className = "hour-num";
  el.textContent = h;
  el.style.cssText = `left:${x}px; top:${y}px;`;
  face.appendChild(el);
});

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const GREETINGS = [
  [0, "Good Night 🌙"],
  [5, "Good Morning ☀️"],
  [12, "Good Afternoon 🌤️"],
  [17, "Good Evening 🌇"],
  [21, "Good Night 🌙"],
];

function updateClock() {
  const now = new Date();
  const h = now.getHours(),
    m = now.getMinutes(),
    s = now.getSeconds();
  const ms = now.getMilliseconds();

  const secDeg = (s + ms / 1000) * 6;
  const minDeg = (m + s / 60) * 6;
  const hourDeg = ((h % 12) + m / 60) * 30;

  document.getElementById("secondHand").style.transform =
    `rotate(${secDeg}deg)`;
  document.getElementById("minuteHand").style.transform =
    `rotate(${minDeg}deg)`;
  document.getElementById("hourHand").style.transform = `rotate(${hourDeg}deg)`;

  const h12 = h % 12 || 12;
  const mm = String(m).padStart(2, "0");
  document.getElementById("digitalTime").childNodes[0].textContent =
    `${h12}:${mm}`;
  document.getElementById("ampm").textContent = h < 12 ? "AM" : "PM";

  document.getElementById("dayName").textContent = DAYS[now.getDay()];
  document.getElementById("dateStr").textContent =
    `${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

  const g = GREETINGS.filter(([hr]) => h >= hr).pop()[1];
  document.getElementById("greeting").textContent = g;

  document.getElementById("progressFill").style.width =
    ((s + ms / 1000) / 60) * 100 + "%";
}

updateClock();
setInterval(updateClock, 50);
