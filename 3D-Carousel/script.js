const carousel = document.querySelector('.carousel');
const cards = document.querySelectorAll('.card');
const bgLayers = [document.getElementById('bg1'), document.getElementById('bg2')];
const total = cards.length;
const radius = 380;
const angleStep = 360 / total;

let currentAngle = 0;
let targetAngle = 0;
let isDragging = false;
let startX = 0;
let startAngle = 0;
let lastActiveIndex = -1;
let selectedIndex = null;
let velocity = 0;

cards.forEach((card, i) => {
    const theta = angleStep * i;
    card.style.setProperty('--rotate-y', `${theta}deg`);
    card.style.transform = `rotateY(${theta}deg) translateZ(${radius}px)`;
    if (bgLayers[0]) bgLayers[0].style.backgroundImage = `url(${cards[0].querySelector('img').src})`;
});

function lerp(start, end, factor) { return start + (end - start) * factor; }

function animate() {
    if (!isDragging) {
        currentAngle += velocity;
        velocity *= 0.95;
        currentAngle = lerp(currentAngle, targetAngle, 0.1);
    } else {
        currentAngle = targetAngle;
    }

    carousel.style.transform = `rotateY(${currentAngle}deg)`;
    updateActiveCard();
    requestAnimationFrame(animate);
}
animate();

function updateActiveCard() {
    const normalized = ((currentAngle % 360) + 360) % 360;
    const activeIndex = Math.round(normalized / angleStep) % total;

    const displayIndex = selectedIndex !== null ? selectedIndex : activeIndex;

    if (displayIndex !== lastActiveIndex) {
        lastActiveIndex = displayIndex;
        changeBackground(displayIndex);
    }

    cards.forEach((card, index) => {
        const isActive = index === displayIndex;
        card.classList.toggle('active', isActive);
        card.style.opacity = isActive ? '1' : '0.5';
        card.style.transform = `rotateY(${angleStep * index}deg) translateZ(${radius}px) ${isActive ? 'scale(1.05)' : 'scale(0.95)'}`;
    });
}

function changeBackground(index) {
    const nextIndex = (bgLayers.indexOf(document.querySelector('.bg-layer.visible')) + 1) % bgLayers.length;
    const nextLayer = bgLayers[nextIndex];
    const currentLayer = bgLayers[1 - nextIndex];

    nextLayer.style.backgroundImage = `url(${cards[index].querySelector('img').src})`;
    nextLayer.classList.add('visible');
    currentLayer.classList.remove('visible');
}

document.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.clientX;
    startAngle = targetAngle;
    document.body.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    targetAngle = startAngle + delta * 0.3;
    velocity = delta * 0.002;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.cursor = 'default';
});

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (selectedIndex !== null) return;
        const index = parseInt(card.dataset.index);
        let baseTarget = index * angleStep;
        const rounds = Math.round((targetAngle - baseTarget) / 360);
        baseTarget += rounds * 360;
        targetAngle = baseTarget;
    });

    card.addEventListener('click', () => {
        selectedIndex = parseInt(card.dataset.index);
        changeBackground(selectedIndex);
    });
});