const parent = document.querySelector(".parent");

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function createToaster(config) {
  let currentTheme = config.theme === "auto" ? getSystemTheme() : config.theme;

  if (config.theme === "auto") {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        currentTheme = e.matches ? "dark" : "light";
      });
  }

  parent.className = `parent fixed p-5 flex flex-col gap-2
    ${config.positionX === "right" ? "right-5" : "left-5"}
    ${config.positionY === "bottom" ? "bottom-5" : "top-5"}
  `;

  return function (notifMsg) {
    let div = document.createElement("div");

    const icon = currentTheme === "dark" ? "🔔" : "ℹ️";

    div.innerHTML = `${icon} ${notifMsg}`;

    div.className = `
      inline-block 
      ${
        currentTheme === "dark"
          ? "bg-blue-500 text-white"
          : "bg-gray-200 text-black"
      } 
      px-6 py-3 rounded-lg shadow-lg
      transform transition-all duration-300 ease-out
      opacity-0 translate-y-5
    `;

    parent.appendChild(div);

    setTimeout(() => {
      div.classList.remove("opacity-0", "translate-y-5");
    }, 10);

    setTimeout(() => {
      div.classList.add("opacity-0", "translate-y-5");
      setTimeout(() => div.remove(), 300);
    }, config.duration * 1000);
  };
}

let toaster = createToaster({
  positionX: "right",
  positionY: "bottom",
  theme: "auto",
  duration: 3,
});

toaster("Today I learned how to build a toaster notification.");

setTimeout(() => {
  toaster("Project completed successfully.");
}, 2000);
