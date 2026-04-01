const container = document.getElementById("products");
const searchInput = document.getElementById("searchInput");
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");

let allProducts = [];

// Loader
function showLoader() {
  container.innerHTML = "";
  for (let i = 0; i < 8; i++) {
    const skeleton = document.createElement("div");
    skeleton.className = "bg-gray-800 animate-pulse h-[260px] rounded-2xl";
    container.appendChild(skeleton);
  }
}

// Fetch Data
function fetchProducts() {
  showLoader();

  fetch("https://dummyjson.com/products/category/smartphones")
    .then((res) => res.json())
    .then((data) => {
      allProducts = data.products;
      renderProducts(allProducts);
    })
    .catch((err) => console.log(err));
}

fetchProducts();

// Render Products
function renderProducts(products) {
  container.innerHTML = "";

  products.forEach((p) => {
    const card = document.createElement("div");

    card.className =
      "bg-gray-900 rounded-2xl overflow-hidden shadow hover:scale-105 transition cursor-pointer";

    card.innerHTML = `
      <div class="relative">
        <img loading="lazy" src="${p.thumbnail}" class="w-full h-[200px] object-cover"/>
        
        <div class="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition">
          <span class="text-white text-sm">View Details</span>
        </div>
      </div>

      <div class="p-4">
        <h3 class="text-sm font-semibold">${p.title}</h3>
        <p class="text-gray-400 text-xs">${p.brand}</p>

        <div class="flex justify-between items-center mt-2">
          <span class="text-green-400 font-bold">$${p.price}</span>
          <span class="text-yellow-400 text-xs">⭐ ${p.rating}</span>
        </div>
      </div>
    `;

    card.onclick = () => openModal(p);
    container.appendChild(card);
  });
}

// Search
searchInput.addEventListener("input", () => {
  filterProducts();
});

// Price Filter
priceRange.addEventListener("input", () => {
  priceValue.innerText = priceRange.value;
  filterProducts();
});

// Combined Filter
function filterProducts() {
  const search = searchInput.value.toLowerCase();
  const maxPrice = priceRange.value;

  const filtered = allProducts.filter((p) => {
    return p.title.toLowerCase().includes(search) && p.price <= maxPrice;
  });

  renderProducts(filtered);
}

// Open when clicked product
function openModal(p) {
  modal.classList.remove("hidden");
  modal.classList.add("flex");

  modalImg.src = p.images[0];
  title.innerText = p.title;
  brand.innerText = p.brand + " • " + p.category;
  desc.innerText = p.description;

  stock.innerText = "📊 In Stock (" + p.stock + ")";
  shipping.innerText = "📦 Free Shipping";
  warranty.innerText = "🛡 1 Year Warranty";

  price.innerText = "$" + p.price;
  rating.innerText = "⭐ " + p.rating;

  qr.src =
    "https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=" + p.title;

  thumbs.innerHTML = "";

  p.images.forEach((img) => {
    const t = document.createElement("img");
    t.src = img;
    t.className = "w-14 h-14 rounded cursor-pointer";
    t.onclick = () => (modalImg.src = img);
    thumbs.appendChild(t);
  });
}

// Close Modal
function closeModal() {
  modal.classList.add("hidden");
}
