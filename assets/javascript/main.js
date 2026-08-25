const loader = document.querySelector('.loader');
const header = document.querySelector('.header');
const menuToggle = document.querySelector('#menuToggle');
const navMenu = document.querySelector('#navMenu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 600);
});

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');

  const icon = menuToggle.querySelector('i');
  icon.className = navMenu.classList.contains('open')
    ? 'ri-close-line'
    : 'ri-menu-3-line';
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    menuToggle.querySelector('i').className = 'ri-menu-3-line';
  });
});

/* Hero slider */
const slides = document.querySelectorAll('.hero-slide');
const dotsContainer = document.querySelector('#sliderDots');
const previousButton = document.querySelector('#previousSlide');
const nextButton = document.querySelector('#nextSlide');

let currentSlide = 0;
let autoSlide;

slides.forEach((_, index) => {
  const dot = document.createElement('span');
  dot.className = `dot ${index === 0 ? 'active' : ''}`;

  dot.addEventListener('click', () => {
    showSlide(index);
    restartAutoSlide();
  });

  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function showSlide(index) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');

  currentSlide = (index + slides.length) % slides.length;

  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function startAutoSlide() {
  autoSlide = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 6000);
}

function restartAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

previousButton.addEventListener('click', () => {
  showSlide(currentSlide - 1);
  restartAutoSlide();
});

nextButton.addEventListener('click', () => {
  showSlide(currentSlide + 1);
  restartAutoSlide();
});

startAutoSlide();

/* Scroll reveal animation */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach(element => revealObserver.observe(element));

/* Automatically highlight current section */
const sections = document.querySelectorAll('main section[id]');

window.addEventListener('scroll', () => {
  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;

    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');

    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
});

/* Footer year */
document.querySelector('#year').textContent = new Date().getFullYear();
