// === CURSOR ===
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursor-ring");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
});
function animCursor() {
  cursor.style.left = mx + "px";
  cursor.style.top = my + "px";
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(animCursor);
}
animCursor();
document.querySelectorAll("a, button, input").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.width = "20px";
    cursor.style.height = "20px";
    ring.style.width = "50px";
    ring.style.height = "50px";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.width = "12px";
    cursor.style.height = "12px";
    ring.style.width = "36px";
    ring.style.height = "36px";
  });
});

// === ANIMATED CANVAS BACKGROUND ===
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");
let W,
  H,
  particles = [],
  lines = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.r = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.color =
      Math.random() > 0.7
        ? "#00e5ff"
        : Math.random() > 0.5
          ? "#7b2fff"
          : "#ffffff";
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

for (let i = 0; i < 120; i++) particles.push(new Particle());

// Shooting stars
class ShootingStar {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H * 0.5;
    this.len = Math.random() * 80 + 40;
    this.speed = Math.random() * 4 + 3;
    this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3;
    this.alpha = 1;
    this.active = Math.random() > 0.97;
    this.timer = Math.random() * 200;
  }
  update() {
    this.timer--;
    if (this.timer <= 0 && !this.active) {
      this.active = true;
      this.timer = 60;
    }
    if (this.active) {
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
      this.alpha -= 0.02;
      if (this.alpha <= 0) {
        this.reset();
        this.timer = Math.random() * 300 + 100;
      }
    }
  }
  draw() {
    if (!this.active || this.alpha <= 0) return;
    ctx.save();
    ctx.globalAlpha = this.alpha * 0.7;
    const grad = ctx.createLinearGradient(
      this.x,
      this.y,
      this.x - Math.cos(this.angle) * this.len,
      this.y - Math.sin(this.angle) * this.len,
    );
    grad.addColorStop(0, "#00e5ff");
    grad.addColorStop(1, "transparent");
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(
      this.x - Math.cos(this.angle) * this.len,
      this.y - Math.sin(this.angle) * this.len,
    );
    ctx.stroke();
    ctx.restore();
  }
}
const stars = Array.from({ length: 5 }, () => new ShootingStar());

// Glow orbs
let time = 0;
function drawOrbs() {
  const orbs = [
    { x: W * 0.15, y: H * 0.3, r: 300, c: "rgba(123,47,255," },
    { x: W * 0.85, y: H * 0.7, r: 250, c: "rgba(0,229,255," },
    { x: W * 0.5, y: H * 0.15, r: 200, c: "rgba(255,45,122," },
  ];
  orbs.forEach((o, i) => {
    const pulse = Math.sin(time * 0.008 + i * 2) * 0.5 + 0.5;
    const grad = ctx.createRadialGradient(
      o.x,
      o.y,
      0,
      o.x,
      o.y,
      o.r + pulse * 50,
    );
    grad.addColorStop(0, o.c + (0.08 + pulse * 0.04) + ")");
    grad.addColorStop(1, o.c + "0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(o.x, o.y, o.r + pulse * 50, 0, Math.PI * 2);
    ctx.fill();
  });
}

function animCanvas() {
  ctx.clearRect(0, 0, W, H);
  time++;
  drawOrbs();
  // Draw particle connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.save();
        ctx.globalAlpha = (1 - dist / 100) * 0.1;
        ctx.strokeStyle = "#00e5ff";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
        ctx.restore();
      }
    }
    particles[i].update();
    particles[i].draw();
  }
  stars.forEach((s) => {
    s.update();
    s.draw();
  });
  requestAnimationFrame(animCanvas);
}
animCanvas();

// === INTERSECTION OBSERVER ===
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.15 },
);

document
  .querySelectorAll(
    ".section-tag, .section-title, .section-sub, .feat-card, .stat, .timeline-item, .terminal, .price-card, .test-card, .cta-section h2, .cta-section p, .cta-input-row",
  )
  .forEach((el) => observer.observe(el));

// Staggered feat-card delay
document
  .querySelectorAll(".feat-card")
  .forEach((c, i) => (c.style.transitionDelay = i * 0.08 + "s"));
document
  .querySelectorAll(".timeline-item")
  .forEach((c, i) => (c.style.transitionDelay = i * 0.12 + "s"));
document
  .querySelectorAll(".stat")
  .forEach((c, i) => (c.style.transitionDelay = i * 0.1 + "s"));
document
  .querySelectorAll(".test-card")
  .forEach((c, i) => (c.style.transitionDelay = i * 0.1 + "s"));
document
  .querySelectorAll(".price-card")
  .forEach((c, i) => (c.style.transitionDelay = i * 0.12 + "s"));

// === COUNTER ANIMATION ===
function animCount(el, target, suffix = "") {
  const isFloat = target % 1 !== 0;
  let start = 0;
  const dur = 1800;
  const t0 = performance.now();
  function step(t) {
    const p = Math.min((t - t0) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    const val = start + (target - start) * ease;
    el.textContent =
      (isFloat ? val.toFixed(1) : Math.round(val).toLocaleString()) + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const statObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const num = e.target.querySelector(".stat-num");
        if (num && !num.dataset.animated) {
          num.dataset.animated = true;
          animCount(
            num,
            parseFloat(num.dataset.target),
            num.dataset.suffix || "",
          );
        }
      }
    });
  },
  { threshold: 0.5 },
);
document.querySelectorAll(".stat").forEach((s) => statObs.observe(s));

// === PARALLAX HERO ===
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  document.querySelector(".hero h1").style.transform =
    `translateY(${y * 0.2}px)`;
  document.querySelector(".hero p").style.transform =
    `translateY(${y * 0.12}px)`;
});
