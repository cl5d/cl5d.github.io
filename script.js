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
  "assets/gifs/iconsOrLogos/gif_twitterIcon.gif",
  "assets/gifs/iconsOrLogos/gif_twitter2Icon.gif"
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

// Random sounds for the button
const sounds = [
  "assets/sfx/sfx_tacoBellBong.mp3",
  "assets/sfx/sfx_winXPError.mp3",
  "assets/sfx/sfx_explosionDeltarune.mp3",
];

function playRandomSound() {
  const index = Math.floor(Math.random() * sounds.length);
  const sound = new Audio(sounds[index]);
  sound.play().catch(err => {
    console.warn("Error al reproducir sonido aleatorio:", err);
  });
}

// Translations
const translations = {
  eng: {
    intro: {
      line1: "hellow.",
      line2: "i am a mini developer",
      line3: "using the GameMaker Engine."
    },
    tabs: {
      games: "Games",
      drawings: "Drawings",
      about: "About Me"
    },
    drawings: {
      text: "✨ Here are some drawings I made"
    },
    about: {
      text: "Hellow👋.<br> (as I already mentioned) my name is cl5d<br> and I make games for fun.<br> using the GameMaker program<br> and my dream is to release a complete game."
    },
    games: {
      project1: {
        caption: `soon....<br><span class="year">I don't know what to put<br> but oh well.<br> I just have to wait.</span>`
      },
      project2: {
        caption: `cooking...<br><span class="year">????</span>`
      },
      project3: {
        caption: `cooking...<br><span class="year">????</span>`
      }
    },
    click_me: "click me :3",
    overlay: {
      continue: "Continue anyway"
    }
  },
  esp: {
    intro: {
      line1: "holas.",
      line2: "soy un mini desarrollador",
      line3: "usando el motor GameMaker."
    },
    tabs: {
      games: "Juegos",
      drawings: "Dibujos",
      about: "Sobre mí"
    },
    drawings: {
      text: "✨ Aquí algunos dibujos que hice"
    },
    about: {
      text: "Holasss👋.<br> (como ya mencioné) me llamo cl5d<br> y hago juegos por diversión.<br> usando el programa GameMaker<br> y mi sueño es sacar un juego completo."
    },
    games: {
      project1: {
        caption: `próximamente....<br><span class="year">No sé qué poner<br> pero bueno.<br> Hay que esperar.</span>`
      },
      project2: {
        caption: `cocinando...<br><span class="year">????</span>`
      },
      project3: {
        caption: `cocinando...<br><span class="year">????</span>`
      }
    },
    click_me: "clickeame we :3",
    overlay: {
      continue: "Continuar de todas formas"
    }
  }
};

// Function to change language
function changeLanguage(lang) {
  // Save to localStorage
  localStorage.setItem('lang', lang);

  // Change text of all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const keys = el.getAttribute('data-i18n').split('.');
    let text = translations[lang];
    for (const key of keys) {
      if (text) text = text[key];
    }
    if (text) {
      if (el.tagName.toLowerCase() === 'p' || el.tagName.toLowerCase() === 'span') {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    }
  });

  // Change text of the "click me" button separately because it is an <a>
  const clickMeBtn = document.getElementById('click-me-btn');
  if(clickMeBtn) {
    clickMeBtn.textContent = translations[lang].click_me;
  }

  // Change text of the overlay button
  if(closeOverlayBtn) {
    closeOverlayBtn.textContent = translations[lang].overlay.continue;
  }

  // Change button text to display the other language
  const toggleBtn = document.getElementById('language-toggle');
  toggleBtn.textContent = (lang === 'eng') ? 'English' : 'Español';
}

// Button to change language
const toggleBtn = document.getElementById('language-toggle');
toggleBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const currentLang = localStorage.getItem('lang') || 'eng';
  const newLang = (currentLang === 'eng') ? 'esp' : 'eng';
  changeLanguage(newLang);
});

// Load language at startup (default English)
window.addEventListener("DOMContentLoaded", () => {
  if (isMobile()) {
    showOverlay(true);
  }
  const savedLang = localStorage.getItem('lang') || 'eng';
  changeLanguage(savedLang);
});

// Close overlay button
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

// Solid blue background for overlay
overlay.style.setProperty('--overlay-bg-color', '#0068e8');

//for testing only
//function isMobile() {
//  return true;
//}