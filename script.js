const body = document.body;
const backgrounds = [
  "url('assets/images/backgrounds/bg_test.png')",
  "url('assets/images/backgrounds/bg_test2.png')",
  "url('assets/images/backgrounds/bg_test3.png')"
];

let currentIndex = 0;
let canChange = false;

function changeBackground() {
  body.classList.add('change-bg');
  setTimeout(() => {
    currentIndex = (currentIndex + 1) % backgrounds.length;
    body.style.backgroundImage = backgrounds[currentIndex];
    body.classList.remove('change-bg');
  }, 400);
}

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY || window.pageYOffset;

  if (scrollY > 10000 && !canChange) {
    canChange = true;
    changeBackground();
  } else if (scrollY <= 10000 && canChange) {
    canChange = false;
    body.classList.add('change-bg');
    setTimeout(() => {
      currentIndex = 0;
      body.style.backgroundImage = backgrounds[currentIndex];
      body.classList.remove('change-bg');
    }, 400);
  }
});

// Remove focus from boxes
document.querySelectorAll('.image-list a').forEach(link => {
  link.addEventListener('click', () => {
    link.blur();
  });
});

// Tab system
const tabButtons = document.querySelectorAll(".tab-btn");
const sections = document.querySelectorAll(".section-content");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    const target = button.dataset.target;

    tabButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    sections.forEach(section => {
      section.classList.add("hidden");
    });

    document.getElementById(target).classList.remove("hidden");
  });
});

// Twitter random icon
const twitterIcon = document.getElementById("icon-twitter");
const twitterGifs = [
  "assets/iconsOrLogos/gif_twitterIcon.gif",
  "assets/iconsOrLogos/gif_twitter2Icon.gif"
];

if (twitterIcon) {
  const randomIndex = Math.random() < 0.5 ? 0 : 1;
  twitterIcon.src = twitterGifs[randomIndex];
}

// Overlay (only for mobile when loading)
const overlay = document.getElementById("gif-overlay");
const closeOverlayBtn = document.getElementById("close-overlay");

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function showOverlay(immediate = false) {
  overlay.classList.remove("hidden");
  if (immediate) {
    overlay.style.animation = "none";
    overlay.style.opacity = "1";
  } else {
    overlay.style.animation = "";
    overlay.style.opacity = "1";
  }
}

// Sonidos aleatorios para el botón
const sounds = [
  "assets/sfx/sfx_tacoBellBong.mp3",
  "assets/sfx/sfx_winXPError.mp3",
  "assets/sfx/sfx_explosionDeltarune.mp3",
  // Puedes añadir más sonidos aquí
];

function playRandomSound() {
  const index = Math.floor(Math.random() * sounds.length);
  const sound = new Audio(sounds[index]);
  sound.play().catch(err => {
    console.warn("Error al reproducir sonido aleatorio:", err);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  if (isMobile()) {
    showOverlay(true);
  }
});

closeOverlayBtn.addEventListener("click", () => {
  playRandomSound();

  overlay.style.transition = "opacity 0.4s ease";
  overlay.style.opacity = "0";
  setTimeout(() => {
    overlay.classList.add("hidden");
    overlay.style.transition = "";
    overlay.style.opacity = "1";
    overlay.style.animation = "";
  }, 400);
});

// Fondo azul sólido para overlay
overlay.style.setProperty('--overlay-bg-color', '#0068e8');


//for testing only
//function isMobile() {
//  return true;
//}
