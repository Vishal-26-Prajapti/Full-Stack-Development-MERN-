const container = document.getElementById("container");
const indicator = document.getElementById("scrollIndicator");
const percentText = document.getElementById("percent");
const circle = document.getElementById("circle");

const radius = 30;
const circumference = 2 * Math.PI * radius;

circle.style.strokeDasharray = circumference;

const data = [
  {
    title: "HTML",
    desc: "Structure of web pages",
    img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "CSS",
    desc: "Design and layout styling",
    img: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19",
  },
  {
    title: "JavaScript",
    desc: "Logic and interactivity",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
  },
  {
    title: "React",
    desc: "Frontend UI library",
    img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
  },
  {
    title: "Node.js",
    desc: "Backend runtime",
    img: "https://images.unsplash.com/photo-1605379399642-870262d3d051",
  },
  {
    title: "MongoDB",
    desc: "NoSQL database",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
  },
];

data.forEach((item, index) => {
  const section = document.createElement("section");
  section.classList.add("card");

  if (index === 0) section.classList.add("active");

  section.innerHTML = `
    <img src="${item.img}" alt="${item.title}">
    <h1>${item.title}</h1>
    <p>${item.desc}</p>
  `;

  container.appendChild(section);
});

const cards = document.querySelectorAll(".card");

container.addEventListener("scroll", () => {
  const scrollTop = container.scrollTop;
  const totalHeight = container.scrollHeight - container.clientHeight;

  const percent = (scrollTop / totalHeight) * 100;

  indicator.style.width = percent + "%";

  percentText.innerText = Math.round(percent) + "%";

  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;

  let index = Math.round(scrollTop / window.innerHeight);

  cards.forEach((card, i) => {
    card.classList.remove("active");
    if (i === index) {
      card.classList.add("active");
    }
  });
});
