const light = document.querySelector(".light");

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  currentX += (mouseX - currentX) * 0.08;
  currentY += (mouseY - currentY) * 0.08;
  light.style.setProperty("--x", currentX + "px");
  light.style.setProperty("--y", currentY + "px");
  requestAnimationFrame(animate);
}

animate();
