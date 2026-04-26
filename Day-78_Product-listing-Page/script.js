const API_URL = "https://fakestoreapi.com/products";
let allProducts = [];
let cartCount = 0;
let currentCategory = "all";
let searchQuery = "";
let sortMode = "default";

const grid = document.getElementById("product-grid");
const filtersEl = document.getElementById("category-filters");
const resultInfo = document.getElementById("results-info");
const cartCountEl = document.getElementById("cart-count");

function showSkeletons(n = 8) {
  grid.innerHTML = Array.from(
    { length: n },
    () => `
      <div class="skeleton">
        <div class="skel-img"></div>
        <div class="skel-body">
          <div class="skel-line sm"></div>
          <div class="skel-line lg"></div>
          <div class="skel-line"></div>
          <div class="skel-line" style="width:65%"></div>
        </div>
      </div>`,
  ).join("");
}

function showError(msg) {
  grid.innerHTML = `
      <div class="error-box" style="grid-column:1/-1">
        <div class="emoji">⚠️</div>
        <p>${msg}</p>
        <button class="retry-btn" onclick="fetchProducts()">Try Again</button>
      </div>`;
}

async function fetchProducts() {
  showSkeletons();
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    allProducts = await res.json();
    buildCategoryFilters();
    renderProducts();
  } catch (e) {
    showError("Failed to load products. Check your connection.");
  }
}

function buildCategoryFilters() {
  const cats = ["all", ...new Set(allProducts.map((p) => p.category))];
  filtersEl.innerHTML = cats
    .map(
      (c) => `
      <button class="cat-btn ${c === "all" ? "active" : ""}" data-cat="${c}">${c}</button>`,
    )
    .join("");
  filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".cat-btn");
    if (!btn) return;
    currentCategory = btn.dataset.cat;
    filtersEl
      .querySelectorAll(".cat-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts();
  });
}

function getFiltered() {
  let list = [...allProducts];
  if (currentCategory !== "all")
    list = list.filter((p) => p.category === currentCategory);
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }
  switch (sortMode) {
    case "price-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      list.sort((a, b) => b.rating.rate - a.rating.rate);
      break;
    case "name":
      list.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }
  return list;
}

function renderProducts() {
  const list = getFiltered();
  resultInfo.textContent = `${list.length} product${list.length !== 1 ? "s" : ""} found`;

  if (!list.length) {
    grid.innerHTML = `
        <div class="empty-box">
          <div class="emoji">🔍</div>
          <p>No products match your search.</p>
        </div>`;
    return;
  }

  grid.innerHTML = list
    .map(
      (p, i) => `
      <div class="card" style="animation-delay:${Math.min(i * 0.04, 0.4)}s">
        <div class="card-img-wrap">
          <img src="${p.image}" alt="${escHtml(p.title)}" loading="lazy" onerror="this.src='https://placehold.co/200x200?text=No+Image'"/>
          <span class="badge">${p.category}</span>
          <span class="rating-badge"><span class="star">★</span> ${p.rating.rate}</span>
        </div>
        <div class="card-body">
          <p class="card-category">${p.category} · ${p.rating.count} reviews</p>
          <h2 class="card-title">${escHtml(p.title)}</h2>
          <p class="card-desc">${escHtml(p.description)}</p>
          <div class="card-footer">
            <span class="price">$${p.price.toFixed(2)}</span>
            <button class="add-btn" data-id="${p.id}" onclick="addToCart(this)">Add to Cart</button>
          </div>
        </div>
      </div>`,
    )
    .join("");
}

function addToCart(btn) {
  if (btn.classList.contains("added")) return;
  btn.classList.add("added");
  btn.textContent = "✓ Added";
  cartCount++;
  cartCountEl.textContent = `${cartCount} item${cartCount !== 1 ? "s" : ""}`;
  setTimeout(() => {
    btn.classList.remove("added");
    btn.textContent = "Add to Cart";
  }, 2000);
}

function escHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

document.getElementById("search-input").addEventListener("input", (e) => {
  searchQuery = e.target.value.trim();
  renderProducts();
});

document.getElementById("sort-select").addEventListener("change", (e) => {
  sortMode = e.target.value;
  renderProducts();
});

fetchProducts();
