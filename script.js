/* ==========================================
   LOADER
========================================== */

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.style.opacity = "0";

    setTimeout(() => {
      loader.style.display = "none";
    }, 500);

  }, 800);
});

/* ==========================================
   MOBILE MENU
========================================== */

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn) {

  menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
      menuBtn.innerHTML =
        '<i class="fas fa-times"></i>';
    } else {
      menuBtn.innerHTML =
        '<i class="fas fa-bars"></i>';
    }

  });

}

/* ==========================================
   CLOSE MENU ON LINK CLICK
========================================== */

document.querySelectorAll(".nav-links a")
.forEach(link => {

  link.addEventListener("click", () => {

    navLinks.classList.remove("active");

    if (menuBtn) {
     menuBtn.innerHTML = '✕';
    }

  });

});

/* ==========================================
   DARK MODE
========================================== */



/* ==========================================
   COUNTER ANIMATION
========================================== */

const counters =
document.querySelectorAll(".counter");

let counterStarted = false;

function runCounters() {

  counters.forEach(counter => {

    const target =
    +counter.getAttribute("data-target");

    const updateCounter = () => {

      const count =
      +counter.innerText;

      const increment =
      target / 150;

      if (count < target) {

        counter.innerText =
        Math.ceil(
          count + increment
        );

        setTimeout(
          updateCounter,
          15
        );

      } else {

        counter.innerText =
        target.toLocaleString() + "+";

      }

    };

    updateCounter();

  });

}

window.addEventListener("scroll", () => {

  const impact =
  document.querySelector(".impact");

  if (!impact) return;

  const triggerPoint =
  impact.offsetTop - 500;

  if (
    window.scrollY >
    triggerPoint &&
    !counterStarted
  ) {

    runCounters();
    counterStarted = true;

  }

});

/* ==========================================
   REVEAL ANIMATION
========================================== */

function revealSections() {

  const reveals =
  document.querySelectorAll(".reveal");

  reveals.forEach(section => {

    const windowHeight =
    window.innerHeight;

    const revealTop =
    section.getBoundingClientRect().top;

    const revealPoint = 120;

    if (
      revealTop <
      windowHeight - revealPoint
    ) {

      section.classList
      .add("active");

    }

  });

}

window.addEventListener(
  "scroll",
  revealSections
);

revealSections();

/* ==========================================
   TESTIMONIAL SLIDER
========================================== */

const testimonials =
document.querySelectorAll(
  ".testimonial"
);

let testimonialIndex = 0;

function testimonialSlider() {

  if (
    testimonials.length === 0
  ) return;

  testimonials.forEach(item => {
    item.classList.remove("active");
  });

  testimonialIndex++;

  if (
    testimonialIndex >
    testimonials.length
  ) {

    testimonialIndex = 1;

  }

  testimonials[
    testimonialIndex - 1
  ].classList.add("active");

}

setInterval(
  testimonialSlider,
  5000
);

/* ==========================================
   FAQ ACCORDION
========================================== */

const faqItems =
document.querySelectorAll(
  ".faq-item"
);

faqItems.forEach(item => {

  const question =
  item.querySelector(
    ".faq-question"
  );

  question.addEventListener(
    "click",
    () => {

      item.classList
      .toggle("active");

    }
  );

});

/* ==========================================
   DONATION PROGRESS
========================================== */

const progressFill =
document.getElementById(
  "progressFill"
);

if (progressFill) {

  progressFill.style.width =
  "0%";

  setTimeout(() => {

    progressFill.style.transition =
    "2s ease";

    progressFill.style.width =
    "75%";

  }, 1000);

}

/* ==========================================
   BACK TO TOP BUTTON
========================================== */

const topBtn =
document.getElementById(
  "topBtn"
);

window.addEventListener(
  "scroll",
  () => {

    if (!topBtn) return;

    if (
      window.scrollY > 400
    ) {

      topBtn.style.display =
      "block";

    } else {

      topBtn.style.display =
      "none";

    }

  }
);

if (topBtn) {

  topBtn.addEventListener(
    "click",
    () => {

      window.scrollTo({

        top: 0,

        behavior: "smooth"

      });

    }
  );

}

/* ==========================================
   ACTIVE NAVIGATION
========================================== */

const sections =
document.querySelectorAll(
  "section[id]"
);

const navItems =
document.querySelectorAll(
  ".nav-links a"
);

window.addEventListener(
  "scroll",
  () => {

    let current = "";

    sections.forEach(section => {

      const sectionTop =
      section.offsetTop - 150;

      const sectionHeight =
      section.clientHeight;

      if (
        pageYOffset >=
        sectionTop
      ) {

        current =
        section.getAttribute(
          "id"
        );

      }

    });

    navItems.forEach(link => {

      link.classList.remove(
        "current"
      );

      if (
        link.getAttribute(
          "href"
        ) === `#${current}`
      ) {

        link.classList.add(
          "current"
        );

      }

    });

  }
);

/* ==========================================
   NEWSLETTER FORM
========================================== */

const newsletterForm =
document.querySelector(".newsletter form");

if (newsletterForm) {

  newsletterForm.addEventListener("submit", e => {

    e.preventDefault();

    const newsletterMessage =
    document.getElementById("newsletterMessage");

    const emailInput =
    newsletterForm.querySelector('input[type="email"]');

    if(emailInput.value.trim() === ""){

      newsletterMessage.style.color = "#ff6b6b";
      newsletterMessage.textContent =
      "Please enter your email address.";

      return;
    }

   newsletterForm.reset();

window.location.href = "index.html";

  });

}

/* ==========================================
   CONTACT FORM
========================================== */

const contactForm =
document.querySelector(
  ".contact-form"
);

if (contactForm) {

  contactForm.addEventListener(
    "submit",
    e => {

      e.preventDefault();

      const name =
      contactForm.querySelector(
        'input[type="text"]'
      ).value;

      const email =
      contactForm.querySelector(
        'input[type="email"]'
      ).value;

      if (
        name.trim() === "" ||
        email.trim() === ""
      ) {

       const contactMessage =
document.getElementById("contactMessage");

contactMessage.style.color = "#ff6b6b";
contactMessage.textContent =
"Please fill all fields.";

return;
      }


     newsletterForm.reset();

window.location.href = "404.html";

    }
  );

}

/* ==========================================
   SMOOTH CARD HOVER EFFECT
========================================== */

const cards =
document.querySelectorAll(
  ".program-card, .team-card, .impact-card"
);

cards.forEach(card => {

  card.addEventListener(
    "mouseenter",
    () => {

      card.style.transition =
      ".4s ease";

    }
  );

});

/* ==========================================
   AUTO YEAR
========================================== */

const copyright =
document.querySelector(
  ".copyright"
);

if (
  copyright &&
  copyright.innerHTML.includes("2026")
) {

  copyright.innerHTML =
  `© ${new Date().getFullYear()} Stackly Foundation. All Rights Reserved.`;

}

/* ==========================================
   HERO SLIDER
========================================== */

const slides = document.querySelectorAll(".hero-slide");

let current = 0;

setInterval(() => {

slides[current].classList.remove("active");

current++;

if(current >= slides.length){
current = 0;
}

slides[current].classList.add("active");

}, 3000);

/* ==========================================
    NAVBAR SCROLL EFFECT
========================================== */
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

  if(window.scrollY > 100){
    navbar.classList.add("scrolled");
  }else{
    navbar.classList.remove("scrolled");
  }

});
