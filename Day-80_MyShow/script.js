let allMovies = [];
let filteredMovies = [];
let selectedMovie = null;
let selectedSeats = [];

const PRICE_PER_SEAT = 150;
const TOTAL_SEATS = 30;
const SEATS_PER_ROW = 6;

let debounceTimer;

document.addEventListener("DOMContentLoaded", async () => {
  showLoadingSpinner();
  await fetchMovies();
  setupEventListeners();
});

async function fetchMovies() {
  try {
    const res = await fetch("https://api.tvmaze.com/search/shows?q=all");

    if (!res.ok) throw new Error("Fetch failed");

    const data = await res.json();

    allMovies = data.map((item) => item.show).filter((show) => show.image);

    filteredMovies = [...allMovies];

    displayMovies(filteredMovies);
  } catch (err) {
    showErrorMessage("Failed to load movies");
  } finally {
    hideLoadingSpinner();
  }
}

async function fetchShowDetails(id) {
  try {
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return null;
  }
}

function displayMovies(movies) {
  const container = document.getElementById("moviesContainer");
  const noResults = document.getElementById("noResults");

  if (!movies.length) {
    container.classList.add("hidden");
    noResults.classList.remove("hidden");
    return;
  }

  container.classList.remove("hidden");
  noResults.classList.add("hidden");
  container.innerHTML = "";

  const fragment = document.createDocumentFragment();

  movies.forEach((movie) => {
    const card = createMovieCard(movie);
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

function createMovieCard(movie) {
  const card = document.createElement("div");
  card.className = "group cursor-pointer";

  const rating = movie.rating?.average
    ? movie.rating.average.toFixed(1)
    : "N/A";

  const image =
    movie.image?.medium || "https://via.placeholder.com/210x295?text=No+Image";

  card.innerHTML = `
    <div class="relative overflow-hidden rounded-xl h-80">
      <img src="${image}" loading="lazy"
        class="w-full h-full object-cover group-hover:scale-105 transition" />

      <div class="cursor-pointer absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
        <button class="view-btn w-full bg-red-600 py-2 rounded-lg text-white">
          View Details
        </button>
      </div>

      <div class="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-sm">
        ⭐ ${rating}
      </div>
    </div>

    <h3 class="mt-2 text-gray-100 font-semibold">${movie.name}</h3>
  `;

  card.querySelector(".view-btn").addEventListener("click", () => {
    openMovieModal(movie.id);
  });

  return card;
}

async function openMovieModal(id) {
  const modal = document.getElementById("movieModal");
  modal.classList.remove("hidden");

  document.getElementById("movieDetailsContent").innerHTML =
    "<p class='text-center text-gray-400'>Loading...</p>";

  const data = await fetchShowDetails(id);

  if (!data) return;

  selectedMovie = data;
  displayMovieDetails(data);
}

function closeMovieModal() {
  document.getElementById("movieModal").classList.add("hidden");
}

function displayMovieDetails(movie) {
  const content = document.getElementById("movieDetailsContent");

  const genres = movie.genres?.join(", ") || "N/A";
  const rating = movie.rating?.average?.toFixed(1) || "N/A";
  const summary = movie.summary
    ? movie.summary.replace(/<[^>]*>/g, "")
    : "No summary";

  const image =
    movie.image?.original ||
    "https://via.placeholder.com/500x700?text=No+Image";

  content.innerHTML = `
    <img src="${image}" class="w-full rounded mb-4"/>
    <h2 class="text-2xl font-bold mb-2">${movie.name}</h2>
    <p class="text-gray-400 mb-2">⭐ ${rating}</p>
    <p class="text-gray-400 mb-4">${genres}</p>
    <p class="text-gray-300 text-sm">${summary}</p>
  `;
}

function openBookingModal() {
  if (!selectedMovie) return;

  document.getElementById("bookingMovieTitle").textContent = selectedMovie.name;

  generateSeatGrid();

  document.getElementById("bookingModal").classList.remove("hidden");
  closeMovieModal();
}

function closeBookingModal() {
  document.getElementById("bookingModal").classList.add("hidden");
}

function generateSeatGrid() {
  const grid = document.getElementById("seatGrid");
  grid.innerHTML = "";

  if (!window.bookedSeats) {
    window.bookedSeats = new Set();
    while (window.bookedSeats.size < 8) {
      window.bookedSeats.add(Math.floor(Math.random() * TOTAL_SEATS));
    }
  }

  for (let i = 0; i < TOTAL_SEATS; i++) {
    const seat = document.createElement("div");

    const row = Math.floor(i / SEATS_PER_ROW);
    const col = (i % SEATS_PER_ROW) + 1;
    const label = `${String.fromCharCode(65 + row)}${col}`;

    const booked = window.bookedSeats.has(i);

    seat.className = `
      w-10 h-10 flex items-center justify-center text-xs rounded
      ${booked ? "bg-gray-500" : "bg-gray-700 hover:bg-gray-600 cursor-pointer"}
    `;

    seat.textContent = label;

    if (!booked) {
      seat.addEventListener("click", () => toggleSeatSelection(i, label, seat));
    }

    grid.appendChild(seat);
  }

  selectedSeats = [];
  updateBookingSummary();
}

function toggleSeatSelection(num, label, el) {
  const index = selectedSeats.findIndex((s) => s.number === num);

  if (index !== -1) {
    selectedSeats.splice(index, 1);
    el.classList.remove("bg-red-500");
    el.classList.add("bg-gray-700");
  } else {
    selectedSeats.push({ number: num, label });
    el.classList.add("bg-red-500");
  }

  updateBookingSummary();
}

function updateBookingSummary() {
  const labels = selectedSeats
    .map((s) => s.label)
    .sort()
    .join(", ");

  document.getElementById("selectedSeatsDisplay").textContent =
    labels || "None";

  document.getElementById("totalPrice").textContent =
    `₹${selectedSeats.length * PRICE_PER_SEAT}`;
}

function confirmBooking() {
  if (!selectedSeats.length) return;

  const data = {
    movie: selectedMovie.name,
    seats: selectedSeats.map((s) => s.label),
    total: selectedSeats.length * PRICE_PER_SEAT,
  };

  showTicketModal(data);

  selectedSeats.forEach((s) => window.bookedSeats.add(s.number));

  selectedSeats = [];
  closeBookingModal();
}

function showTicketModal(data) {
  const modal = document.getElementById("ticketModal");
  const content = document.getElementById("ticketContent");

  content.innerHTML = `
    <p>🎬 ${data.movie}</p>
    <p>🎟️ ${data.seats.join(", ")}</p>
    <p>💰 ₹${data.total}</p>
  `;

  modal.classList.remove("hidden");
}

function closeTicketModal() {
  document.getElementById("ticketModal").classList.add("hidden");
}

function filterMovies(term) {
  term = term.toLowerCase().trim();

  filteredMovies = term
    ? allMovies.filter(
        (m) =>
          m.name.toLowerCase().includes(term) ||
          (m.genres || []).join(" ").toLowerCase().includes(term),
      )
    : [...allMovies];

  displayMovies(filteredMovies);
}

function setupEventListeners() {
  const input = document.getElementById("searchInput");

  input.addEventListener("input", (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      filterMovies(e.target.value);
    }, 300);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMovieModal();
      closeBookingModal();
      closeTicketModal();
    }
  });
}

function showLoadingSpinner() {
  document.getElementById("loadingSpinner").classList.remove("hidden");
}

function hideLoadingSpinner() {
  document.getElementById("loadingSpinner").classList.add("hidden");
}

function showErrorMessage(msg) {
  const noResults = document.getElementById("noResults");
  noResults.classList.remove("hidden");
  noResults.innerHTML = `<p class="text-red-500">${msg}</p>`;
}
