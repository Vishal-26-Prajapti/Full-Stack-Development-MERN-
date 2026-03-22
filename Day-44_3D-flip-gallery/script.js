document.querySelectorAll(".card-wrap").forEach((card) => {
  card.addEventListener("click", () => card.classList.toggle("flipped"));
});

document.querySelectorAll(".save-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const liked = btn.textContent === "♥";
    btn.textContent = liked ? "♡" : "♥";
    btn.style.color = liked ? "" : "#ff6b6b";
  });
});
