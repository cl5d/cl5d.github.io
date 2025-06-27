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

// Changes the Twitter icon with 50% probability
const twitterIcon = document.getElementById("icon-twitter");

const twitterGifs = [
  "assets/iconsOrLogos/gif_twitterIcon.gif",       // Default
  "assets/iconsOrLogos/gif_twitter2Icon.gif"     // Alternative Logo
];

if (twitterIcon) {
  const randomIndex = Math.random() < 0.5 ? 0 : 1;
  twitterIcon.src = twitterGifs[randomIndex];
}