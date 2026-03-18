const counters = document.querySelectorAll(".counter");

const animationSpeed = 200;

const updateCounter = (counter) => {
  const target = +counter.getAttribute("data-target");
  const current = +counter.innerText;

  const increment = target / animationSpeed;

  if (current < target) {
    counter.innerText = Math.ceil(current + increment);

    setTimeout(() => {
      updateCounter(counter);
    }, 1);
  } else {
    counter.innerText = target;
  }
};

counters.forEach((counter) => {
  updateCounter(counter);
});
