const card = document.querySelector(".card");
const pupils = document.querySelectorAll(".pupil");

document.addEventListener("mousemove", (e) => {

    const x = (window.innerWidth / 2 - e.pageX) / 20;
    const y = (window.innerHeight / 2 - e.pageY) / 20;

    card.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;

    pupils.forEach(pupil => {
        const rect = pupil.parentElement.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;

        const angle = Math.atan2(e.pageY - eyeY, e.pageX - eyeX);
        const moveX = Math.cos(angle) * 8;
        const moveY = Math.sin(angle) * 8;

        pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

});