

/* Hero Background Auto Rotator */

const heroBg = document.querySelector(".hero-bg");

const bgImages = [
  "../images/spirited_away.jpg",
  "../images/interstellar.jpg",
  "../images/your_name.jpg",
  "../images/endgame.jpg"
];

let bgIndex = 0;

function rotateHeroBg() {
  bgIndex = (bgIndex + 1) % bgImages.length;

  heroBg.style.opacity = 0; // fade out

  setTimeout(() => {
    heroBg.style.backgroundImage = `url('${bgImages[bgIndex]}')`;
    heroBg.style.opacity = 1; // fade in
  }, 800);
}

// initial load
heroBg.style.backgroundImage = `url('${bgImages[0]}')`;

// auto rotate every 5 seconds
setInterval(rotateHeroBg, 5000);