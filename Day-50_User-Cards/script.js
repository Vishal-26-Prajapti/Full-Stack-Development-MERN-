const users = [
  {
    name: "Amisha Rathore",
    pic: "https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?q=80&w=465&auto=format&fit=crop",
    bio: "silent chaos in a loud world 🌑🖤 | not for everyone",
  },
  {
    name: "Kiara Mehta",
    pic: "https://images.unsplash.com/photo-1592748168813-0d42f6c77880?q=80&w=464&auto=format&fit=crop",
    bio: "main character energy 🎬 | coffee > everything ✨",
  },
  {
    name: "Isha Oberoi",
    pic: "https://images.unsplash.com/photo-1738525052282-900818c83635?q=80&w=464&auto=format&fit=crop",
    bio: "walking through dreams in doc martens ☁️🖤 | late night thinker",
  },
  {
    name: "Ojin Oklawa",
    pic: "https://images.unsplash.com/photo-1688309786713-aac1ee2a7dca?q=80&w=465&auto=format&fit=crop",
    bio: "too glam to give a damn 💅 | filter free soul",
  },
  {
    name: "Riya Sharma",
    pic: "https://plus.unsplash.com/premium_photo-1665663927587-a5b343dff128?q=80&w=464&auto=format&fit=crop",
    bio: "sunsets & soft music 🌅 | living slow",
  },
  {
    name: "Aarav Khanna",
    pic: "https://images.unsplash.com/photo-1483726234545-481d6e880fc6?q=80&w=870&auto=format&fit=crop",
    bio: "hustle hard 💼 | dream bigger 🚀",
  },
  {
    name: "Mehak Gupta",
    pic: "https://images.unsplash.com/photo-1643315601790-0513a9f2bd3d?q=80&w=871&auto=format&fit=crop",
    bio: "makeup + mindset 💄 | confidence is key 🔑",
  },
  {
    name: "Kabir Singh",
    pic: "https://images.unsplash.com/photo-1656199817069-8c8a4eecd791?q=80&w=870&auto=format&fit=crop",
    bio: "gym | grind | repeat 🏋️‍♂️",
  },
  {
    name: "Ananya Verma",
    pic: "https://plus.unsplash.com/premium_photo-1713194203748-c6ddb1d6c3df?q=80&w=387&auto=format&fit=crop",
    bio: "books > people 📚 | introvert vibes 🌙",
  },
  {
    name: "Dev Malhotra",
    pic: "https://plus.unsplash.com/premium_photo-1713184149461-69b0abeb3daa?q=80&w=870&auto=format&fit=crop",
    bio: "code. sleep. repeat 💻 | building my world 🌍",
  },
  {
    name: "Priya Kapoor",
    pic: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=465&auto=format&fit=crop",
    bio: "Foodie 🍕 | Traveler 🌏",
  },
  {
    name: "Rohan Verma",
    pic: "https://plus.unsplash.com/premium_photo-1670282393309-70fd7f8eb1ef?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Tech Enthusiast 💻 | Music Lover 🎵",
  },
  {
    name: "Sanya Mehra",
    pic: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=465&auto=format&fit=crop",
    bio: "Fitness Freak 🏋️‍♀️ | Nature Lover 🌿",
  },
  {
    name: "Arjun Patel",
    pic: "https://plus.unsplash.com/premium_photo-1675200124904-dfadce24119f?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Dreamer 💭 | Coffee Addict ☕",
  },
  {
    name: "Ira Sharma",
    pic: "https://plus.unsplash.com/premium_photo-1664378762440-9c68f6b7f3b7?q=80&w=386&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Artist 🎨 | Late Night Thinker 🌙",
  },
  {
    name: "Kabir Malhotra",
    pic: "https://images.unsplash.com/flagged/photo-1571367034861-e6729ad9c2d5?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Startup Enthusiast 🚀 | Reader 📚",
  },
  {
    name: "Naina Joshi",
    pic: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=464&auto=format&fit=crop",
    bio: "Fashion Blogger 👗 | Coffee Lover ☕",
  },
  {
    name: "Aditya Singh",
    pic: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=464&auto=format&fit=crop",
    bio: "Traveler ✈️ | Photographer 📸",
  },
  {
    name: "Tanya Chauhan",
    pic: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=464&auto=format&fit=crop",
    bio: "Music Enthusiast 🎧 | Dreamer 🌌",
  },
  {
    name: "Vishal Prajapati",
    pic: "./Vishal.png",
    bio: "Coder 💻 | Gamer 🎮",
  },
  {
    name: "Simran Kaur",
    pic: "https://images.unsplash.com/photo-1591980896142-4e36328411ec?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Yoga Lover 🧘‍♀️ | Tea Addict 🍵",
  },
  {
    name: "Vikram Joshi",
    pic: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=464&auto=format&fit=crop",
    bio: "Fitness Junkie 🏃‍♂️ | Nature Lover 🌳",
  },
  {
    name: "Anika Desai",
    pic: "https://images.unsplash.com/photo-1762342002899-7ed1efde7dbe?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Photography 📸 | Bookworm 📚",
  },
  {
    name: "Vishal Raina",
    pic: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=464&auto=format&fit=crop",
    bio: "Music & Coding 🎶💻",
  },
  {
    name: "Aanya Malhotra",
    pic: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=464&auto=format&fit=crop",
    bio: "Art & Travel 🎨✈️",
  },
];

const cardContainer = document.querySelector(".card-container");
const inp = document.querySelector(".inp");

function showUser(arr) {
  cardContainer.innerHTML = "";
  arr.forEach((user) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = user.pic;
    img.alt = user.name;
    img.classList.add("bg-img");

    const blurred = document.createElement("div");
    blurred.classList.add("blurred-layer");
    blurred.style.backgroundImage = `url('${user.pic}')`;

    const content = document.createElement("div");
    content.classList.add("content");

    const h3 = document.createElement("h3");
    h3.textContent = user.name;

    const p = document.createElement("p");
    p.textContent = user.bio;

    content.appendChild(h3);
    content.appendChild(p);

    card.appendChild(img);
    card.appendChild(blurred);
    card.appendChild(content);
    cardContainer.appendChild(card);
  });
}

showUser(users);

inp.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm),
  );
  showUser(filteredUsers);
});
