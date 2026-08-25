document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  /* =========================
     PAGE LOADER
  ========================== */

  function hidePageLoader() {
    const loader = document.getElementById("pageLoader");

    if (!loader) return;

    loader.classList.add("hidden");

    setTimeout(function () {
      loader.style.display = "none";
    }, 700);
  }

  window.addEventListener("load", hidePageLoader);

  // Safety fallback in case another script or image delays loading
  setTimeout(hidePageLoader, 4000);


  /* =========================
     MOBILE HAMBURGER MENU
  ========================== */

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    const menuIcon = menuToggle.querySelector("i");

    menuToggle.addEventListener("click", function () {
      const menuIsOpen = navMenu.classList.toggle("show");

      menuToggle.classList.toggle("active", menuIsOpen);
      menuToggle.setAttribute(
        "aria-label",
        menuIsOpen ? "Close menu" : "Open menu"
      );

      if (menuIcon) {
        menuIcon.className = menuIsOpen
          ? "ri-close-line"
          : "ri-menu-3-line";
      }
    });

    // Close the menu when a navigation link is clicked
    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("show");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-label", "Open menu");

        if (menuIcon) {
          menuIcon.className = "ri-menu-3-line";
        }
      });
    });

    // Close menu when clicking outside it
    document.addEventListener("click", function (event) {
      const clickedInsideMenu =
        navMenu.contains(event.target) ||
        menuToggle.contains(event.target);

      if (!clickedInsideMenu) {
        navMenu.classList.remove("show");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-label", "Open menu");

        if (menuIcon) {
          menuIcon.className = "ri-menu-3-line";
        }
      }
    });
  }


  /* =========================
     HERO SLIDER
  ========================== */

  const slides = document.querySelectorAll(".hero-slide");
  const previousSlide = document.getElementById("previousSlide");
  const nextSlide = document.getElementById("nextSlide");
  const sliderDots = document.getElementById("sliderDots");

  let currentSlide = 0;
  let slideTimer;

  function showSlide(index) {
    if (!slides.length) return;

    if (index >= slides.length) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide = index;
    }

    slides.forEach(function (slide, slideIndex) {
      slide.classList.toggle("active", slideIndex === currentSlide);
    });

    const dots = document.querySelectorAll(".slider-dot");

    dots.forEach(function (dot, dotIndex) {
      dot.classList.toggle("active", dotIndex === currentSlide);
    });
  }

  function startSlider() {
    if (slides.length > 1) {
      slideTimer = setInterval(function () {
        showSlide(currentSlide + 1);
      }, 6000);
    }
  }

  function resetSliderTimer() {
    clearInterval(slideTimer);
    startSlider();
  }

  if (slides.length && sliderDots) {
    slides.forEach(function (_, index) {
      const dot = document.createElement("button");

      dot.className = "slider-dot";
      dot.type = "button";
      dot.setAttribute("aria-label", "Show slide " + (index + 1));

      dot.addEventListener("click", function () {
        showSlide(index);
        resetSliderTimer();
      });

      sliderDots.appendChild(dot);
    });

    showSlide(0);
    startSlider();
  }

  if (nextSlide) {
    nextSlide.addEventListener("click", function () {
      showSlide(currentSlide + 1);
      resetSliderTimer();
    });
  }

  if (previousSlide) {
    previousSlide.addEventListener("click", function () {
      showSlide(currentSlide - 1);
      resetSliderTimer();
    });
  }


  /* =========================
     SCROLL REVEAL ANIMATION
  ========================== */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach(function (element) {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add("visible");
    });
  }


  /* =========================
     ACTIVE NAVIGATION LINK
  ========================== */

  const sections = document.querySelectorAll("main section[id]");
  const navigationLinks = document.querySelectorAll(".nav-link");

  function updateActiveLink() {
    let currentSection = "";

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 180;

      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    navigationLinks.forEach(function (link) {
      link.classList.remove("active");

      if (link.getAttribute("href") === "#" + currentSection) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink();


  /* =========================
     CURRENT YEAR
  ========================== */

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /* =========================
     BROKEN IMAGE HANDLING
  ========================== */

  const images = document.querySelectorAll("img");

  images.forEach(function (image) {
    image.addEventListener("error", function () {
      image.classList.add("image-error");
      image.alt = "Image currently unavailable";
    });
  });


  /* =========================
     CONTACT FORM MESSAGE
  ========================== */

  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function () {
      const submitButton = contactForm.querySelector(
        'button[type="submit"]'
      );

      if (submitButton) {
        submitButton.innerHTML =
          'Opening email application <i class="ri-loader-4-line"></i>';
        submitButton.disabled = true;
      }
    });
  }
});
