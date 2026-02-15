const slidesContainer = document.querySelector(".slides-container");
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector("#nextBtn");
const prevBtn = document.querySelector("#prevBtn");
const items = document.querySelectorAll(".item");

let index = 0;
let isTransitioning = false;

slidesContainer.insertAdjacentHTML("afterbegin", slides[slides.length - 1].outerHTML);
slidesContainer.insertAdjacentHTML("beforeend", slides[0].outerHTML);

function getSlideWidth() {
    return slidesContainer.querySelector(".slide").clientWidth;
}

slidesContainer.style.transform = `translateX(${-getSlideWidth()}px)`;

function updateSlides() {
    slidesContainer.style.transition = "transform 0.3s ease-in-out";
    slidesContainer.style.transform = `translateX(${-getSlideWidth() * (index + 1)}px)`;
    isTransitioning = true;
}

slidesContainer.addEventListener("transitionend", () => {
    const totalSlides = slides.length;
    if (index >= totalSlides) {
        slidesContainer.style.transition = "none";
        index = 0;
        slidesContainer.style.transform = `translateX(${-getSlideWidth() * (index + 1)}px)`;
    } else if (index < 0) {
        slidesContainer.style.transition = "none";
        index = totalSlides - 1;
        slidesContainer.style.transform = `translateX(${-getSlideWidth() * (index + 1)}px)`;
    }
    isTransitioning = false;
});

function setActiveItem() {
    items.forEach(item => item.classList.remove("active"));
    items[index].classList.add("active");
}

function moveToNextSlide() {
    if (isTransitioning) return;
    index++;
    updateSlides();
    setActiveItem();
}

function moveToPrevSlide() {
    if (isTransitioning) return;
    index--;
    updateSlides();
    setActiveItem();
}

function handleItemClick(i) {
    if (isTransitioning) return;
    index = i;
    updateSlides();
    setActiveItem();
}

items.forEach((item, i) => item.addEventListener("click", () => handleItemClick(i)));
nextBtn.addEventListener("click", moveToNextSlide);
prevBtn.addEventListener("click", moveToPrevSlide);

document.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") moveToNextSlide();
    if (e.key === "ArrowLeft") moveToPrevSlide();
});

let autoPlay = setInterval(moveToNextSlide, 4000);
const carousel = document.querySelector(".carousel");
carousel.addEventListener("mouseenter", () => clearInterval(autoPlay));
carousel.addEventListener("mouseleave", () => autoPlay = setInterval(moveToNextSlide, 4000));

setActiveItem();