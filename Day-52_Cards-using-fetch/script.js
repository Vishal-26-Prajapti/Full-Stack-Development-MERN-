const cardsContainer = document.getElementById("cards");
const refreshBtn = document.querySelector("#refreshBtn");

function createUserCard(user) {
  const card = document.createElement("div");
  card.className =
    "bg-gray-800 text-white rounded-2xl shadow-lg p-6 w-80 text-center hover:scale-105 transition transform";

  // Image
  const img = document.createElement("img");
  img.src = user.picture.large;
  img.alt = "User";
  img.className =
    "w-24 h-24 mx-auto rounded-full border-4 border-gray-700 mb-4";
  card.appendChild(img);

  // Name
  const name = document.createElement("h2");
  name.className = "text-xl font-semibold";
  name.textContent = `${user.name.title} ${user.name.first} ${user.name.last}`;
  card.appendChild(name);

  // Email
  const email = document.createElement("p");
  email.className = "text-gray-400 text-sm mb-1 break-all";
  email.textContent = user.email;
  card.appendChild(email);

  // Location
  const location = document.createElement("p");
  location.className = "text-gray-400 text-sm mb-1";
  location.textContent = `${user.location.city}, ${user.location.state}, ${user.location.country}`;
  card.appendChild(location);

  // Age
  const age = document.createElement("p");
  age.className = "text-gray-400 text-sm mb-1";
  age.textContent = `Age: ${user.dob.age}`;
  card.appendChild(age);

  // Phone
  const phone = document.createElement("p");
  phone.className = "text-gray-400 text-sm mb-3";
  phone.textContent = `Phone: ${user.phone}`;
  card.appendChild(phone);

  // Username
  const desc = document.createElement("p");
  desc.className = "text-gray-300 text-sm mb-4";
  desc.textContent = `Username: ${user.login.username}`;
  card.appendChild(desc);

  // Buttons
  const btnContainer = document.createElement("div");
  btnContainer.className = "flex justify-center gap-3";

  const followBtn = document.createElement("button");
  followBtn.className =
    "bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm transition";
  followBtn.textContent = "Follow";

  const msgBtn = document.createElement("button");
  msgBtn.className =
    "bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm transition";
  msgBtn.textContent = "Message";

  btnContainer.append(followBtn, msgBtn);
  card.appendChild(btnContainer);

  cardsContainer.appendChild(card);
}

function fetchUsers() {
  cardsContainer.innerHTML = "";

  fetch("https://randomuser.me/api/?results=30")
    .then((res) => res.json())
    .then((data) => {
      data.results.forEach((user) => createUserCard(user));
    })
    .catch((err) => console.error(err));
}

fetchUsers();

refreshBtn.addEventListener("click", fetchUsers);
