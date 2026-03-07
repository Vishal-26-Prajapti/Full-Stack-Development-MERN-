const card = document.getElementById("card");
const pupils = document.querySelectorAll(".pupil");
const eyes = document.querySelectorAll(".eye");

function handleMove(x, y) {

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const rotateX = (centerY - y) / 25;
    const rotateY = (centerX - x) / 25;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    pupils.forEach(pupil => {
        const rect = pupil.parentElement.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;

        const angle = Math.atan2(y - eyeY, x - eyeX);
        const moveX = Math.cos(angle) * 10;
        const moveY = Math.sin(angle) * 10;

        pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
}

let ticking = false;

document.addEventListener("mousemove", (e) => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleMove(e.clientX, e.clientY);
            ticking = false;
        });
        ticking = true;
    }
});

document.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
});

function blink() {
    eyes.forEach(eye => eye.style.height = "5px");

    blinkSound.currentTime = 0;
    blinkSound.play();

    setTimeout(() => {
        eyes.forEach(eye => eye.style.height = "40px");
    }, 200);
}

function autoBlink() {
    blink();
    setTimeout(autoBlink, Math.random() * 4000);
}

autoBlink();

const moods = ["happy", "angry", "sleepy"];

function changeMood() {
    card.classList.remove("happy", "angry", "sleepy");

    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    card.classList.add(randomMood);
}

setInterval(changeMood, 3000);
changeMood();

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let letters = "01";
letters = letters.split("");

let fontSize = 14;
let columns = canvas.width / fontSize;

let drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(0,255,0,0.8)";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        let text = letters[Math.floor(Math.random() * letters.length)];

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }

    requestAnimationFrame(draw);
}

draw();