const buttons = document.querySelectorAll("button");
const screen = document.getElementById("screen");
const clear = document.getElementById("clear");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.innerText;

    if (value === "=") {
      try {
        screen.innerText = eval(screen.innerText);
      } catch {
        screen.innerText = "Error";
      }
    } else if (value === "CLEAR") {
      screen.innerText = "";
    } else {
      screen.innerText += value;
    }
  });
});
