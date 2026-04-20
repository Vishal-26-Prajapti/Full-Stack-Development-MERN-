const input = document.getElementById("nameInput");
const lettersContainer = document.getElementById("letters");
const waveBtn = document.getElementById("waveBtn");

let waveActive = false;

input.addEventListener("input", () => {
  const value = input.value.toUpperCase();
  lettersContainer.innerHTML = "";

  value.split("").forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char;

    span.addEventListener("click", () => {
      span.classList.remove("active");
      void span.offsetWidth;
      span.classList.add("active");

      span.style.color = `hsl(${Math.random() * 360},100%,60%)`;
    });

    lettersContainer.appendChild(span);
  });
});

waveBtn.addEventListener("click", () => {
  const letters = document.querySelectorAll(".letters span");

  waveActive = !waveActive;

  if (waveActive) {
    letters.forEach((letter, i) => {
      setTimeout(() => {
        letter.classList.add("wave");
      }, i * 100);
    });
  } else {
    letters.forEach((letter) => {
      letter.classList.remove("wave");
    });
  }
});
