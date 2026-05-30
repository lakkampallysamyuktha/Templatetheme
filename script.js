/* ==========================================
   STACKLY FOUNDATION — script.js
========================================== */

/* ---------- LOADER ---------- */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => { loader.style.display = "none"; }, 600);
  }, 1000);
});

/* ---------- PARTICLES ---------- */
(function createParticles() {
  const container = document.getElementById("particles");
  if (!container) return;
  const count = window.innerWidth < 768 ? 15 : 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 3 + 1.5;
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${Math.random() * 18 + 14}s;
      animation-delay: ${Math.random() * 16}s;
    `;
    container.appendChild(p);
  }
})();

/* ---------- NAVBAR ---------- */
const header  = document.getElementById("header");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 80);
});

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuBtn.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  });
}

// Close nav on link click
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.classList.remove("open");
    document.body.style.overflow = "";
  });
});

/* ---------- ACTIVE NAV ON SCROLL ---------- */
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    if (pageYOffset >= sec.offsetTop - 160) current = sec.getAttribute("id");
  });
  navAnchors.forEach(a => {
    a.classList.remove("active");
    if (a.getAttribute("href") === `#${current}`) a.classList.add("active");
  });
});

/* ---------- HERO SLIDER ---------- */
const slides = document.querySelectorAll(".hero-slide");
const dotsContainer = document.getElementById("sliderDots");
let currentSlide = 0;

// Create dots
slides.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.className = "slider-dot" + (i === 0 ? " active" : "");
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

function goToSlide(idx) {
  slides[currentSlide].classList.remove("active");
  document.querySelectorAll(".slider-dot")[currentSlide].classList.remove("active");
  currentSlide = idx;
  slides[currentSlide].classList.add("active");
  document.querySelectorAll(".slider-dot")[currentSlide].classList.add("active");
}

const sliderInterval = setInterval(() => {
  goToSlide((currentSlide + 1) % slides.length);
}, 4500);

/* ---------- SCROLL REVEAL ---------- */
function revealOnScroll() {
  const items = document.querySelectorAll(".reveal");
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        obs.unobserve(entry.target);
        // trigger counters
        if (entry.target.classList.contains("impact") && !counterDone) {
          counterDone = true;
          setTimeout(runCounters, 400);
        }
        // trigger donation bar
        if (entry.target.classList.contains("donation")) {
          setTimeout(() => {
            const fill = document.getElementById("progressFill");
            if (fill) fill.style.width = "75%";
          }, 400);
        }
      }
    });
  }, { threshold: 0.07, rootMargin: "0px 0px -50px 0px" });
  items.forEach(el => obs.observe(el));
}
document.addEventListener("DOMContentLoaded", revealOnScroll);
revealOnScroll();

/* ---------- COUNTER ---------- */
let counterDone = false;

function runCounters() {
  document.querySelectorAll(".counter").forEach(counter => {
    const target = +counter.dataset.target;
    const duration = 1800;
    const step = Math.ceil(duration / 60);
    let start = null;

    const tick = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const value = Math.floor(eased * target);
      counter.textContent = value.toLocaleString("en-IN") + (progress === 1 ? "+" : "");
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

/* ---------- FAQ ACCORDION ---------- */
document.querySelectorAll(".faq-item").forEach(item => {
  item.querySelector(".faq-question").addEventListener("click", () => {
    const isActive = item.classList.contains("active");
    document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("active"));
    if (!isActive) item.classList.add("active");
  });
});

/* ---------- DONATION AMOUNT BUTTONS ---------- */
document.querySelectorAll(".da-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".da-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const customInput = document.getElementById("customAmt");
    if (customInput) customInput.value = "";
  });
});

document.getElementById("customAmt")?.addEventListener("input", () => {
  document.querySelectorAll(".da-btn").forEach(b => b.classList.remove("active"));
});

/* ---------- NEWSLETTER FORM ---------- */
const nlForm = document.getElementById("newsletterForm");
if (nlForm) {
  nlForm.addEventListener("submit", e => {
    e.preventDefault();
    const btn = nlForm.querySelector("button");
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
    btn.style.background = "#22c55e";
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.background = "";
      nlForm.reset();
    }, 2500);
  });
}

/* ---------- CONTACT FORM ---------- */
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    const name  = contactForm.querySelector('input[type="text"]').value.trim();
    const email = contactForm.querySelector('input[type="email"]').value.trim();
    const msg   = document.getElementById("contactMsg");
    if (!name || !email) {
      msg.style.color = "#f87171";
      msg.textContent = "Please fill in all required fields.";
      return;
    }
    const btn = contactForm.querySelector(".btn-primary");
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.disabled = true;
    msg.style.color = "#a3e635";
    msg.textContent = "Thank you! We'll get back to you within 24 hours.";
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.disabled = false;
      msg.textContent = "";
      contactForm.reset();
    }, 3500);
  });
}

/* ---------- BACK TO TOP ---------- */
const topBtn = document.getElementById("topBtn");
window.addEventListener("scroll", () => {
  if (!topBtn) return;
  topBtn.style.display = window.scrollY > 500 ? "flex" : "none";
  topBtn.style.alignItems = "center";
  topBtn.style.justifyContent = "center";
});
topBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ---------- AUTO YEAR ---------- */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- SMOOTH ANCHOR SCROLL ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    window.scrollTo({ top: target.offsetTop - offset, behavior: "smooth" });
  });
});
