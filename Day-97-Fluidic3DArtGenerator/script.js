const canvas = document.getElementById("artCanvas");
const ctx = canvas.getContext("2d");
const randomizeBtn = document.getElementById("randomizeBtn");

const complexitySlider = document.getElementById("complexity");
const speedSlider = document.getElementById("speed");
const hueSlider = document.getElementById("hue");

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

let config = {
  complexity: parseInt(complexitySlider.value),
  speed: parseInt(speedSlider.value) / 1000,
  baseHue: parseInt(hueSlider.value),
  currentShapes: [],
};

let mouse = { x: width / 2, y: height / 2, active: false };

window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  if (config.currentShapes.length < 50) {
    config.currentShapes.push(new Shape(mouse.x, mouse.y));
  }
});

canvas.addEventListener("mousedown", (e) => {
  config.baseHue = (config.baseHue + 60) % 360; 
  hueSlider.value = config.baseHue;
  createPulse(e.clientX, e.clientY);
});

complexitySlider.addEventListener(
  "input",
  (e) => (config.complexity = parseInt(e.target.value)),
);
speedSlider.addEventListener(
  "input",
  (e) => (config.speed = parseInt(e.target.value) / 1000),
);
hueSlider.addEventListener(
  "input",
  (e) => (config.baseHue = parseInt(e.target.value)),
);

randomizeBtn.addEventListener("click", () => {
  config.complexity = Math.floor(Math.random() * 12) + 3;
  config.speed = Math.random() * 0.1;
  config.baseHue = Math.random() * 360;

  complexitySlider.value = config.complexity;
  speedSlider.value = config.speed * 1000;
  hueSlider.value = config.baseHue;
});

const degToRad = (deg) => deg * (Math.PI / 180);

class Shape {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 40 + 20;
    this.life = 1.0; // Decay factor (1 = new, 0 = gone)
    this.decay = Math.random() * 0.01 + 0.005;

    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;

    this.rotX = Math.random() * Math.PI * 2;
    this.rotY = Math.random() * Math.PI * 2;
    this.rotZ = Math.random() * Math.PI * 2;

    this.hue = config.baseHue + (Math.random() * 40 - 20); 
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= this.decay;

    this.rotX += config.speed;
    this.rotY += config.speed * 0.5;
    this.rotZ += config.speed * 0.2;
  }

  draw() {
    if (this.life <= 0) return;

    const points = [];
    const sides = config.complexity;
    const radius = this.size * this.life; 

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.lineWidth = 1.5;

    const alpha = this.life;
    ctx.strokeStyle = `hsla(${this.hue}, 80%, 60%, ${alpha})`;
    ctx.shadowBlur = 10;
    ctx.shadowColor = `hsla(${this.hue}, 80%, 60%, ${alpha * 0.5})`;

    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * Math.PI * 2;

      let px = Math.cos(angle) * radius;
      let py = Math.sin(angle) * radius;
      let pz = i % 2 === 0 ? radius / 2 : -radius / 2; 

      let y1 = py * Math.cos(this.rotX) - pz * Math.sin(this.rotX);
      let z1 = py * Math.sin(this.rotX) + pz * Math.cos(this.rotX);
      py = y1;
      pz = z1;

      let x2 = px * Math.cos(this.rotY) + pz * Math.sin(this.rotY);
      let z2 = -px * Math.sin(this.rotY) + pz * Math.cos(this.rotY);
      px = x2;
      pz = z2;

      let x3 = px * Math.cos(this.rotZ) - py * Math.sin(this.rotZ);
      let y3 = px * Math.sin(this.rotZ) + py * Math.cos(this.rotZ);
      px = x3;
      py = y3;

      const perspective = 300;
      const scale = perspective / (perspective + pz);
      points.push({ x: px * scale, y: py * scale });
    }

    ctx.beginPath();
    if (points.length > 0) {
      ctx.moveTo(points[0].x, points[0].y);
      for (let p of points) {
        ctx.lineTo(p.x, p.y);
      }
    }
    ctx.closePath();
    ctx.stroke();

    if (config.complexity > 5) {
      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        const targetIndex = (i + Math.floor(sides / 2)) % sides;
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[targetIndex].x, points[targetIndex].y);
      }
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = `hsla(${this.hue}, 50%, 40%, ${alpha * 0.4})`;
      ctx.stroke();
    }

    ctx.restore();
  }
}

let pulses = [];
function createPulse(x, y) {
  pulses.push({ x, y, r: 0, alpha: 0.8 });
}

function drawPulses() {
  ctx.lineWidth = 2;
  for (let i = 0; i < pulses.length; i++) {
    let p = pulses[i];
    p.r += 8; 
    p.alpha -= 0.02; 

    if (p.alpha <= 0) {
      pulses.splice(i, 1);
      i--;
      continue;
    }

    ctx.strokeStyle = `hsla(${config.baseHue}, 90%, 70%, ${p.alpha})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function animate() {
  ctx.fillStyle = "rgba(5, 5, 8, 0.2)";
  ctx.fillRect(0, 0, width, height);

  drawPulses();

  for (let i = 0; i < config.currentShapes.length; i++) {
    const shape = config.currentShapes[i];
    shape.update();
    shape.draw();

    if (shape.life <= 0) {
      config.currentShapes.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(animate);
}

animate();
