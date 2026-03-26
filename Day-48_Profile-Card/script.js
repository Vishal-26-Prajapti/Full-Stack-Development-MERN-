const form = document.querySelector("form");
const cardContainer = document.querySelector(".card-container");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value;
  const bio = document.querySelector("#bio").value;
  const offers = document.querySelector("#offers").value;
  const insta = document.querySelector("#insta").value;
  const file = document.querySelector("#photo").files[0];

  const card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("div");
  img.classList.add("img");

  if (file) {
    const url = URL.createObjectURL(file);
    img.style.backgroundImage = `url(${url})`;
  }

  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  const h2 = document.createElement("h2");
  h2.textContent = name;

  const p = document.createElement("p");
  p.textContent = bio;

  const extra = document.createElement("p");
  extra.textContent = `${offers} | @${insta}`;

  const bottom = document.createElement("div");
  bottom.classList.add("bottom");

  const stats = document.createElement("div");
  stats.classList.add("stats");
  stats.innerHTML = `<span>👤 0</span><span>📷 0</span>`;

  const button = document.createElement("button");
  button.textContent = "Follow +";

  button.addEventListener("click", () => {
    if (insta) {
      window.open(`https://instagram.com/${insta}`, "_blank");
    } else {
      alert("No Instagram ID provided");
    }
  });

  bottom.appendChild(stats);
  bottom.appendChild(button);

  overlay.appendChild(h2);
  overlay.appendChild(p);
  overlay.appendChild(extra);
  overlay.appendChild(bottom);

  card.appendChild(img);
  card.appendChild(overlay);

  cardContainer.appendChild(card);
});
