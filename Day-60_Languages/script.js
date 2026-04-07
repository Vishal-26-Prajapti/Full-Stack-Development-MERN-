const languages = [
  {
    id: "kotlin",
    icon: "☕",
    color: "var(--kotlin)",
    title: "What is Kotlin?",
    tags: ["JVM", "Android", "Server-side"],
    text: "Kotlin is a modern, statically-typed language developed by JetBrains that runs on the JVM. It's fully interoperable with Java while offering null safety, extension functions, and coroutines. Kotlin is Google's preferred language for Android development and is growing fast in server-side and multiplatform contexts.",
    badges: ["Null-safe", "Coroutines", "Android", "JVM", "Multiplatform"],
  },
  {
    id: "dart",
    icon: "🎯",
    color: "var(--dart)",
    title: "What is Dart?",
    tags: ["Flutter", "Web", "Mobile"],
    text: "Dart is a client-optimized language created by Google, designed for high-performance apps across all platforms. It's the backbone of Flutter, Google's UI toolkit for building natively compiled apps for mobile, web, and desktop from a single codebase. Dart supports both AOT and JIT compilation.",
    badges: ["Flutter", "AOT", "JIT", "Cross-platform", "Google"],
  },
  {
    id: "java",
    icon: "☕",
    color: "var(--java)",
    title: "What is Java?",
    tags: ["JVM", "Enterprise", "Android"],
    text: "Java is a class-based, object-oriented language built on the principle of Write Once, Run Anywhere (WORA) via the Java Virtual Machine. It's used extensively in enterprise software, backend systems, Android development, and big data pipelines. The Spring ecosystem makes it a go-to for robust backends.",
    badges: ["OOP", "JVM", "WORA", "Spring", "Enterprise"],
  },
  {
    id: "python",
    icon: "🐍",
    color: "var(--python)",
    title: "Is Python easy to learn?",
    tags: ["AI", "Data Science", "Scripting"],
    text: "Python is widely regarded as the most beginner-friendly language thanks to its clean, English-like syntax and enforced readability. Beyond ease of use, it dominates AI, machine learning, and data science with libraries like NumPy, Pandas, and TensorFlow. Python's versatility makes it a top language for scripting, automation, and research.",
    badges: [
      "Beginner-friendly",
      "ML/AI",
      "NumPy",
      "Data Science",
      "Scripting",
    ],
  },
  {
    id: "php",
    icon: "🐘",
    color: "var(--php)",
    title: "Is PHP good for web development?",
    tags: ["Web", "Server-side", "Backend"],
    text: "PHP powers a huge portion of the web — including WordPress, Wikipedia, and many large-scale platforms. Modern PHP 8.x introduces named arguments, union types, fibers, and a JIT compiler, making it far more capable than its reputation suggests. The Laravel framework has elevated PHP development with elegant syntax and a rich ecosystem.",
    badges: ["Server-side", "Laravel", "WordPress", "PHP 8", "REST APIs"],
  },
];

let openSet = new Set();
let activeFilter = "all";
let searchQuery = "";

const list = document.getElementById("accordion-list");
const searchEl = document.getElementById("search");
const countEl = document.getElementById("count");
const noResults = document.getElementById("no-results");
const collapseBtn = document.getElementById("collapseAll");
const pills = document.querySelectorAll(".pill");

function escapeReg(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlight(text, query) {
  if (!query) return text;
  const re = new RegExp(`(${escapeReg(query)})`, "gi");
  return text.replace(re, "<mark>$1</mark>");
}

function cssVar(v) {
  return v;
}

function filtered() {
  const q = searchQuery.toLowerCase();
  return languages.filter((lang) => {
    const matchFilter =
      activeFilter === "all" ||
      lang.tags.some((t) => t.toLowerCase() === activeFilter.toLowerCase());
    const matchSearch =
      !q ||
      lang.title.toLowerCase().includes(q) ||
      lang.text.toLowerCase().includes(q) ||
      lang.tags.some((t) => t.toLowerCase().includes(q)) ||
      lang.badges.some((b) => b.toLowerCase().includes(q));
    return matchFilter && matchSearch;
  });
}

function render() {
  const data = filtered();
  countEl.textContent = data.length;
  noResults.classList.toggle("hidden", data.length > 0);
  list.innerHTML = "";

  data.forEach((lang, i) => {
    const isOpen = openSet.has(lang.id);
    const q = searchQuery;

    const el = document.createElement("div");
    el.className = "accordion" + (isOpen ? " active" : "");
    el.dataset.id = lang.id;
    el.style.animationDelay = `${i * 45}ms`;

    const tagHTML = lang.tags
      .map(
        (t) =>
          `<span class="acc-tag" style="color:${lang.color};border-color:${lang.color}26;background:${lang.color}12">${highlight(t, q)}</span>`,
      )
      .join("");

    const badgeHTML = lang.badges
      .map(
        (b) =>
          `<span class="badge" style="color:${lang.color};border-color:${lang.color}30;background:${lang.color}10">${highlight(b, q)}</span>`,
      )
      .join("");

    el.innerHTML = `
      <div class="acc-head">
        <div class="lang-icon">${lang.icon}</div>
        <div class="acc-title-group">
          <div class="acc-title">${highlight(lang.title, q)}</div>
          <div class="acc-tags">${tagHTML}</div>
        </div>
        <div class="acc-chevron">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2.5 5l4.5 4.5L11.5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <div class="acc-body">
        <div class="acc-divider"></div>
        <div class="acc-content">
          <p>${highlight(lang.text, q)}</p>
          <div class="badge-row">${badgeHTML}</div>
        </div>
      </div>
    `;

    el.querySelector(".acc-head").addEventListener("click", () => {
      if (openSet.has(lang.id)) {
        openSet.delete(lang.id);
        el.classList.remove("active");
      } else {
        openSet.add(lang.id);
        el.classList.add("active");
      }
    });

    list.appendChild(el);
  });
}

searchEl.addEventListener("input", (e) => {
  searchQuery = e.target.value.trim();
  render();
});

collapseBtn.addEventListener("click", () => {
  openSet.clear();
  document
    .querySelectorAll(".accordion.active")
    .forEach((el) => el.classList.remove("active"));
});

pills.forEach((pill) => {
  pill.addEventListener("click", () => {
    pills.forEach((p) => p.classList.remove("active"));
    pill.classList.add("active");
    activeFilter = pill.dataset.filter;
    render();
  });
});

render();
