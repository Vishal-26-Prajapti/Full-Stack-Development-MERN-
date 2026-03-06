document.addEventListener("DOMContentLoaded", () => {

    const hue = document.getElementById("hue");
    const saturation = document.getElementById("saturation");
    const lightness = document.getElementById("lightness");

    const hueValue = document.getElementById("hueValue");
    const saturationValue = document.getElementById("saturationValue");
    const lightnessValue = document.getElementById("lightnessValue");

    const colorDisplay = document.getElementById("colorDisplay");

    const hslOutput = document.getElementById("hslOutput");
    const rgbOutput = document.getElementById("rgbOutput");
    const hexOutput = document.getElementById("hexOutput");

    const randomBtn = document.getElementById("randomBtn");
    const copyBtn = document.getElementById("copyBtn");

    function hslToRgb(h, s, l) {
        s /= 100;
        l /= 100;

        const k = n => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);

        const f = n =>
            l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

        return [
            Math.round(255 * f(0)),
            Math.round(255 * f(8)),
            Math.round(255 * f(4))
        ];
    }

    function rgbToHex(r, g, b) {
        return "#" + [r, g, b]
            .map(x => x.toString(16).padStart(2, "0"))
            .join("")
            .toUpperCase();
    }

    function updateColor() {
        const h = hue.value;
        const s = saturation.value;
        const l = lightness.value;

        hueValue.textContent = h;
        saturationValue.textContent = s + "%";
        lightnessValue.textContent = l + "%";

        const hslColor = `hsl(${h}, ${s}%, ${l}%)`;
        colorDisplay.style.background = hslColor;

        const [r, g, b] = hslToRgb(h, s, l);
        const hex = rgbToHex(r, g, b);

        hslOutput.textContent = `HSL: ${hslColor}`;
        rgbOutput.textContent = `RGB: rgb(${r}, ${g}, ${b})`;
        hexOutput.textContent = `HEX: ${hex}`;

        document.body.style.background = hslColor;
    }

    hue.addEventListener("input", updateColor);
    saturation.addEventListener("input", updateColor);
    lightness.addEventListener("input", updateColor);

    randomBtn.addEventListener("click", () => {
        hue.value = Math.floor(Math.random() * 361);
        saturation.value = Math.floor(Math.random() * 101);
        lightness.value = Math.floor(Math.random() * 101);
        updateColor();
    });

    copyBtn.addEventListener("click", () => {
        const text = hexOutput.textContent.replace("HEX: ", "");
        navigator.clipboard.writeText(text);
        copyBtn.textContent = "Copied ✅";
        setTimeout(() => copyBtn.textContent = "Copy HEX", 1500);
    });

    updateColor();
});