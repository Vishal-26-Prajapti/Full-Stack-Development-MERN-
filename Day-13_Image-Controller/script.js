const inputs = document.querySelectorAll(".css-controller input");
const valueDisplays = document.querySelectorAll(".value");

function handleUpdate() {
    const suffix = this.dataset.sizing || "";
    const value = this.value;

    document.documentElement.style.setProperty(
        `--${this.name}`,
        value + suffix
    );

    valueDisplays.forEach(display => {
        if (display.dataset.for === this.name) {
            display.textContent = value + suffix;
        }
    });
}

inputs.forEach(input => {
    input.addEventListener("input", handleUpdate);
    input.dispatchEvent(new Event("input"));
});