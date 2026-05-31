/* ==========================================
   STACKLY FOUNDATION — script.js  v3
========================================== */

/* ---------- LOADER ---------- */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (!loader) return;
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => { loader.style.display = "none"; }, 600);
  }, 1000);
});

/* ---------- PARTICLES ---------- */
(function createParticles() {
  const container = document.getElementById("particles");
  if (!container) return;
  const count = window.innerWidth < 768 ? 12 : 28;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 3 + 1.5;
    p.style.cssText = `left:${Math.random()*100}%;width:${size}px;height:${size}px;animation-duration:${Math.random()*18+14}s;animation-delay:${Math.random()*16}s;`;
    container.appendChild(p);
  }
})();

/* ---------- NAVBAR SCROLL ---------- */
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (header) header.classList.toggle("scrolled", window.scrollY > 80);
});

/* ---------- HAMBURGER + MOBILE MENU ---------- */
const menuBtn        = document.getElementById("menuBtn");
const mobileMenu     = document.getElementById("mobileMenu");
const mobileMenuClose = document.getElementById("mobileMenuClose");
const mobileLoginBtn = document.getElementById("mobileLoginBtn");

function openMobileMenu() {
  if (!mobileMenu || !menuBtn) return;
  mobileMenu.classList.add("open");
  menuBtn.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeMobileMenu() {
  if (!mobileMenu || !menuBtn) return;
  mobileMenu.classList.remove("open");
  menuBtn.classList.remove("open");
  document.body.style.overflow = "";
}

if (menuBtn) menuBtn.addEventListener("click", () => {
  mobileMenu?.classList.contains("open") ? closeMobileMenu() : openMobileMenu();
});
if (mobileMenuClose) mobileMenuClose.addEventListener("click", closeMobileMenu);

// Close on backdrop click
if (mobileMenu) {
  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) closeMobileMenu();
  });
}

// Mobile nav links close the menu then navigate
document.querySelectorAll(".mobile-nav-link").forEach(link => {
  link.addEventListener("click", closeMobileMenu);
});

// Mobile login button
if (mobileLoginBtn) {
  mobileLoginBtn.addEventListener("click", () => {
    closeMobileMenu();
    openLoginModal();
  });
}

/* ---------- ACTIVE NAV ON SCROLL ---------- */
const sections   = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links li a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    if (pageYOffset >= sec.offsetTop - 160) current = sec.getAttribute("id");
  });
  navAnchors.forEach(a => {
    a.classList.remove("active");
    if (a.getAttribute("href") === `#${current}`) a.classList.add("active");
  });
}, { passive: true });

/* ---------- HERO SLIDER ---------- */
const slides        = document.querySelectorAll(".hero-slide");
const dotsContainer = document.getElementById("sliderDots");
let   currentSlide  = 0;

if (dotsContainer && slides.length) {
  slides.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "slider-dot" + (i === 0 ? " active" : "");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
}

function goToSlide(idx) {
  slides[currentSlide].classList.remove("active");
  const dots = document.querySelectorAll(".slider-dot");
  if (dots[currentSlide]) dots[currentSlide].classList.remove("active");
  currentSlide = idx;
  slides[currentSlide].classList.add("active");
  if (dots[currentSlide]) dots[currentSlide].classList.add("active");
}

setInterval(() => {
  if (slides.length) goToSlide((currentSlide + 1) % slides.length);
}, 4500);

/* ---------- SCROLL REVEAL ---------- */
let counterDone = false;

function revealOnScroll() {
  const items = document.querySelectorAll(".reveal");
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("active");
      obs.unobserve(entry.target);
      // trigger counters when impact section visible
      if (entry.target.classList.contains("impact") && !counterDone) {
        counterDone = true;
        setTimeout(runCounters, 400);
      }
      // trigger donation progress bar
      if (entry.target.classList.contains("donation")) {
        setTimeout(() => {
          const fill = document.getElementById("progressFill");
          if (fill) fill.style.width = "75%";
        }, 400);
      }
    });
  }, { threshold: 0.07, rootMargin: "0px 0px -40px 0px" });
  items.forEach(el => obs.observe(el));
}
document.addEventListener("DOMContentLoaded", revealOnScroll);
revealOnScroll();

/* ---------- COUNTER ---------- */
function runCounters() {
  document.querySelectorAll(".counter").forEach(counter => {
    const target   = +counter.dataset.target;
    const duration = 1800;
    let   start    = null;
    const tick = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased    = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      counter.textContent = Math.floor(eased * target).toLocaleString("en-IN") + (progress === 1 ? "+" : "");
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
    const inp = document.getElementById("customAmt");
    if (inp) inp.value = btn.dataset.amt;
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
    const nameInput  = nlForm.querySelector('input[type="text"]');
    const emailInput = nlForm.querySelector('input[type="email"]');
    if (!nameInput.value.trim() || !emailInput.value.trim()) {
      nameInput.style.borderColor  = !nameInput.value.trim()  ? "#f87171" : "";
      emailInput.style.borderColor = !emailInput.value.trim() ? "#f87171" : "";
      return;
    }
    const btn  = nlForm.querySelector("button[type='submit']");
    btn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
    btn.style.background = "#22c55e";
    setTimeout(() => { window.location.href = "404.html"; }, 800);
  });
}

/* ---------- CONTACT FORM ---------- */
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    const inputs = contactForm.querySelectorAll("input[required], textarea[required]");
    let   valid  = true;
    inputs.forEach(inp => {
      if (!inp.value.trim()) {
        inp.style.borderColor = "#f87171";
        valid = false;
      } else {
        inp.style.borderColor = "";
      }
    });
    if (!valid) {
      const msg = document.getElementById("contactMsg");
      msg.style.color = "#f87171";
      msg.textContent = "Please fill in all required fields.";
      return;
    }
    const btn = contactForm.querySelector(".btn-primary");
    btn.innerHTML = '<i class="fas fa-check"></i> Sending…';
    btn.disabled  = true;
    const msg = document.getElementById("contactMsg");
    msg.style.color   = "#a3e635";
    msg.textContent   = "Thank you! Redirecting…";
    setTimeout(() => { window.location.href = "404.html"; }, 800);
  });
}

/* ---------- LOGIN MODAL ---------- */
const loginModal    = document.getElementById("loginModal");
const loginOpenBtn  = document.getElementById("loginOpenBtn");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const loginForm     = document.getElementById("loginForm");
const togglePass    = document.getElementById("togglePass");

function openLoginModal() {
  if (!loginModal) return;
  loginModal.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeLoginModal() {
  if (!loginModal) return;
  loginModal.classList.remove("open");
  document.body.style.overflow = "";
}

if (loginOpenBtn)  loginOpenBtn.addEventListener("click",  openLoginModal);
if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeLoginModal);

// Close on overlay click
if (loginModal) {
  loginModal.addEventListener("click", (e) => {
    if (e.target === loginModal) closeLoginModal();
  });
}

// Close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { closeLoginModal(); closeMobileMenu(); }
});

// Toggle password visibility
if (togglePass) {
  togglePass.addEventListener("click", () => {
    const passInput = document.getElementById("loginPassword");
    const icon = togglePass.querySelector("i");
    if (passInput.type === "password") {
      passInput.type = "text";
      icon.className = "fas fa-eye-slash";
    } else {
      passInput.type = "password";
      icon.className = "fas fa-eye";
    }
  });
}

// Login form validation + redirect
if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const name  = document.getElementById("loginName");
    const email = document.getElementById("loginEmail");
    const pass  = document.getElementById("loginPassword");
    const nameErr  = document.getElementById("nameErr");
    const emailErr = document.getElementById("emailErr");
    const passErr  = document.getElementById("passErr");

    let valid = true;

    // Name
    if (!name.value.trim()) {
      name.classList.add("input-error");
      nameErr.textContent = "Full name is required.";
      valid = false;
    } else { name.classList.remove("input-error"); nameErr.textContent = ""; }

    // Email
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      email.classList.add("input-error");
      emailErr.textContent = "Email address is required.";
      valid = false;
    } else if (!emailRe.test(email.value)) {
      email.classList.add("input-error");
      emailErr.textContent = "Enter a valid email address.";
      valid = false;
    } else { email.classList.remove("input-error"); emailErr.textContent = ""; }

    // Password
    if (!pass.value) {
      pass.classList.add("input-error");
      passErr.textContent = "Password is required.";
      valid = false;
    } else if (pass.value.length < 6) {
      pass.classList.add("input-error");
      passErr.textContent = "Password must be at least 6 characters.";
      valid = false;
    } else { pass.classList.remove("input-error"); passErr.textContent = ""; }

    if (!valid) return;

    const btn = loginForm.querySelector(".modal-submit");
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in…';
    btn.disabled  = true;
    setTimeout(() => { window.location.href = "404.html"; }, 900);
  });
}

/* ---------- BACK TO TOP ---------- */
const topBtn = document.getElementById("topBtn");
window.addEventListener("scroll", () => {
  if (!topBtn) return;
  topBtn.style.display = window.scrollY > 500 ? "flex" : "none";
}, { passive: true });
topBtn?.addEventListener("click", () => window.scrollTo({ top:0, behavior:"smooth" }));

/* ---------- AUTO YEAR ---------- */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- SMOOTH ANCHOR SCROLL ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
  });
});
