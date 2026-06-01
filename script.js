window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (!loader) return;
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => { loader.style.display = "none"; }, 600);
  }, 1000);
});

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- PARTICLES ---------- */
  const container = document.getElementById("particles");
  if (container) {
    const count = window.innerWidth < 768 ? 12 : 28;
    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      const size = Math.random() * 3 + 1.5;
      p.style.cssText = `left:${Math.random()*100}%;width:${size}px;height:${size}px;animation-duration:${Math.random()*18+14}s;animation-delay:${Math.random()*16}s;`;
      container.appendChild(p);
    }
  }

  /* ---------- NAVBAR SCROLL ---------- */
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 80);
  }, { passive: true });

  /* ---------- HAMBURGER + MOBILE MENU ---------- */
  const menuBtn         = document.getElementById("menuBtn");
  const mobileMenu      = document.getElementById("mobileMenu");
  const mobileMenuClose = document.getElementById("mobileMenuClose");
  const mobileLoginBtn  = document.getElementById("mobileLoginBtn");
  const loginModal      = document.getElementById("loginModal");

  function isLoginModalOpen() {
    return loginModal && loginModal.classList.contains("open");
  }

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
    if (!isLoginModalOpen()) {
      document.body.style.overflow = "";
    }
  }

  if (menuBtn) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileMenu?.classList.contains("open") ? closeMobileMenu() : openMobileMenu();
    });
    menuBtn.addEventListener("touchend", (e) => {
      e.preventDefault();
      e.stopPropagation();
      mobileMenu?.classList.contains("open") ? closeMobileMenu() : openMobileMenu();
    });
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener("click", (e) => {
      e.stopPropagation();
      closeMobileMenu();
    });
    mobileMenuClose.addEventListener("touchend", (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeMobileMenu();
    });
  }
  if (mobileMenu) {
    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) closeMobileMenu();
    });
  }

  document.querySelectorAll(".mobile-nav-link").forEach(link => {
    link.addEventListener("click", closeMobileMenu);
  });

  /* ---------- FIX: Login button goes to 404.html (no modal) ---------- */
  const loginOpenBtn = document.getElementById("loginOpenBtn");
  if (loginOpenBtn) {
    loginOpenBtn.addEventListener("click", () => {
      window.location.href = "404.html";
    });
  }

  if (mobileLoginBtn) {
    mobileLoginBtn.addEventListener("click", () => {
      closeMobileMenu();
      window.location.href = "404.html";
    });
  }

  /* ---------- ACTIVE NAV ON SCROLL ---------- */
  const sections   = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav-links li a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(sec => {
      if (window.pageYOffset >= sec.offsetTop - 160) current = sec.getAttribute("id");
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
    if (!slides.length) return;
    slides[currentSlide].classList.remove("active");
    const dots = document.querySelectorAll(".slider-dot");
    if (dots[currentSlide]) dots[currentSlide].classList.remove("active");
    currentSlide = idx;
    slides[currentSlide].classList.add("active");
    if (dots[currentSlide]) dots[currentSlide].classList.add("active");
  }

  if (slides.length) {
    setInterval(() => {
      goToSlide((currentSlide + 1) % slides.length);
    }, 4500);
  }

  /* ---------- SCROLL REVEAL ---------- */
  let counterDone = false;

  const revealItems = document.querySelectorAll(".reveal");
  if (revealItems.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("active");
        obs.unobserve(entry.target);
        if (entry.target.classList.contains("impact") && !counterDone) {
          counterDone = true;
          setTimeout(runCounters, 400);
        }
        if (entry.target.classList.contains("donation")) {
          setTimeout(() => {
            const fill = document.getElementById("progressFill");
            if (fill) fill.style.width = "75%";
          }, 400);
        }
      });
    }, { threshold: 0.07, rootMargin: "0px 0px -40px 0px" });

    revealItems.forEach(el => obs.observe(el));
  }

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
    const btn = item.querySelector(".faq-question");
    if (btn) {
      btn.addEventListener("click", () => {
        const isActive = item.classList.contains("active");
        document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("active"));
        if (!isActive) item.classList.add("active");
      });
    }
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
  const customAmt = document.getElementById("customAmt");
  if (customAmt) {
    customAmt.addEventListener("input", () => {
      document.querySelectorAll(".da-btn").forEach(b => b.classList.remove("active"));
    });
  }

  /* ---------- NEWSLETTER FORM ---------- */
  /* FIX: proper email validation, inline errors, reset fields, direct redirect */
  const nlForm = document.getElementById("newsletterForm");
  if (nlForm) {
    const nlNameInput  = document.getElementById("nlName");
    const nlEmailInput = document.getElementById("nlEmail");
    const nlNameErr    = document.getElementById("nlNameErr");
    const nlEmailErr   = document.getElementById("nlEmailErr");
    const emailRe      = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function clearNlErrors() {
      if (nlNameInput)  { nlNameInput.style.borderColor  = ""; }
      if (nlEmailInput) { nlEmailInput.style.borderColor = ""; }
      if (nlNameErr)    nlNameErr.textContent  = "";
      if (nlEmailErr)   nlEmailErr.textContent = "";
    }

    if (nlNameInput) {
      nlNameInput.addEventListener("input", () => {
        if (nlNameInput.value.trim()) {
          nlNameInput.style.borderColor = "";
          if (nlNameErr) nlNameErr.textContent = "";
        }
      });
    }
    if (nlEmailInput) {
      nlEmailInput.addEventListener("input", () => {
        if (emailRe.test(nlEmailInput.value)) {
          nlEmailInput.style.borderColor = "";
          if (nlEmailErr) nlEmailErr.textContent = "";
        }
      });
    }

    nlForm.addEventListener("submit", e => {
      e.preventDefault();
      clearNlErrors();
      let valid = true;

      if (!nlNameInput || !nlNameInput.value.trim()) {
        if (nlNameInput)  nlNameInput.style.borderColor  = "#f87171";
        if (nlNameErr)    nlNameErr.textContent = "Please enter your full name.";
        valid = false;
      }
      if (!nlEmailInput || !nlEmailInput.value.trim()) {
        if (nlEmailInput) nlEmailInput.style.borderColor = "#f87171";
        if (nlEmailErr)   nlEmailErr.textContent = "Email address is required.";
        valid = false;
      } else if (!emailRe.test(nlEmailInput.value)) {
        if (nlEmailInput) nlEmailInput.style.borderColor = "#f87171";
        if (nlEmailErr)   nlEmailErr.textContent = "Please enter a valid email address.";
        valid = false;
      }

      if (!valid) return;

      /* FIX: Reset fields first, then redirect directly — no "Subscribed!" state */
      if (nlNameInput)  nlNameInput.value  = "";
      if (nlEmailInput) nlEmailInput.value = "";
      clearNlErrors();
      window.location.href = "404.html";
    });
  }

  /* ---------- CONTACT FORM ---------- */
  /* FIX: inline per-field errors, email validation, no success message, direct redirect, form resets */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const cfName    = document.getElementById("cfName");
    const cfEmail   = document.getElementById("cfEmail");
    const cfSubject = document.getElementById("cfSubject");
    const cfMessage = document.getElementById("cfMessage");
    const cfNameErr    = document.getElementById("cfNameErr");
    const cfEmailErr   = document.getElementById("cfEmailErr");
    const cfSubjectErr = document.getElementById("cfSubjectErr");
    const cfMessageErr = document.getElementById("cfMessageErr");
    const emailRe      = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setFieldError(input, errEl, msg) {
      if (input)  input.style.borderColor = msg ? "#f87171" : "";
      if (errEl)  errEl.textContent = msg || "";
    }

    /* Live clear on typing */
    [cfName, cfSubject, cfMessage].forEach((inp, i) => {
      const errEl = [cfNameErr, cfSubjectErr, cfMessageErr][i];
      if (inp) {
        inp.addEventListener("input", () => {
          if (inp.value.trim()) setFieldError(inp, errEl, "");
        });
      }
    });
    if (cfEmail) {
      cfEmail.addEventListener("input", () => {
        if (emailRe.test(cfEmail.value)) setFieldError(cfEmail, cfEmailErr, "");
      });
    }

    contactForm.addEventListener("submit", e => {
      e.preventDefault();
      let valid = true;

      if (!cfName || !cfName.value.trim()) {
        setFieldError(cfName, cfNameErr, "Please enter your name.");
        valid = false;
      } else { setFieldError(cfName, cfNameErr, ""); }

      if (!cfEmail || !cfEmail.value.trim()) {
        setFieldError(cfEmail, cfEmailErr, "Email address is required.");
        valid = false;
      } else if (!emailRe.test(cfEmail.value)) {
        setFieldError(cfEmail, cfEmailErr, "Please enter a valid email address.");
        valid = false;
      } else { setFieldError(cfEmail, cfEmailErr, ""); }

      if (!cfSubject || !cfSubject.value.trim()) {
        setFieldError(cfSubject, cfSubjectErr, "Please enter a subject.");
        valid = false;
      } else { setFieldError(cfSubject, cfSubjectErr, ""); }

      if (!cfMessage || !cfMessage.value.trim()) {
        setFieldError(cfMessage, cfMessageErr, "Please enter your message.");
        valid = false;
      } else { setFieldError(cfMessage, cfMessageErr, ""); }

      if (!valid) return;

      /* FIX: Reset form, go directly to 404 — no "Thank you! Redirecting…" text */
      contactForm.reset();
      setFieldError(cfName, cfNameErr, "");
      setFieldError(cfEmail, cfEmailErr, "");
      setFieldError(cfSubject, cfSubjectErr, "");
      setFieldError(cfMessage, cfMessageErr, "");
      window.location.href = "404.html";
    });
  }

  /* ---------- LOGIN MODAL (kept for fallback but login btn goes to 404) ---------- */
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
    if (!mobileMenu?.classList.contains("open")) {
      document.body.style.overflow = "";
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeLoginModal);

  if (loginModal) {
    loginModal.addEventListener("click", (e) => {
      if (e.target === loginModal) closeLoginModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeLoginModal(); closeMobileMenu(); }
  });

  if (togglePass) {
    togglePass.addEventListener("click", () => {
      const passInput = document.getElementById("loginPassword");
      if (!passInput) return;
      const icon = togglePass.querySelector("i");
      if (passInput.type === "password") {
        passInput.type = "text";
        if (icon) icon.className = "fas fa-eye-slash";
      } else {
        passInput.type = "password";
        if (icon) icon.className = "fas fa-eye";
      }
    });
  }

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

      if (!name.value.trim()) {
        name.classList.add("input-error");
        if (nameErr) nameErr.textContent = "Full name is required.";
        valid = false;
      } else { name.classList.remove("input-error"); if (nameErr) nameErr.textContent = ""; }

      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim()) {
        email.classList.add("input-error");
        if (emailErr) emailErr.textContent = "Email address is required.";
        valid = false;
      } else if (!emailRe.test(email.value)) {
        email.classList.add("input-error");
        if (emailErr) emailErr.textContent = "Enter a valid email address.";
        valid = false;
      } else { email.classList.remove("input-error"); if (emailErr) emailErr.textContent = ""; }

      if (!pass.value) {
        pass.classList.add("input-error");
        if (passErr) passErr.textContent = "Password is required.";
        valid = false;
      } else if (pass.value.length < 6) {
        pass.classList.add("input-error");
        if (passErr) passErr.textContent = "Password must be at least 6 characters.";
        valid = false;
      } else { pass.classList.remove("input-error"); if (passErr) passErr.textContent = ""; }

      if (!valid) return;

      const btn = loginForm.querySelector(".modal-submit");
      if (btn) { btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in…'; btn.disabled = true; }
      setTimeout(() => { window.location.href = "404.html"; }, 900);
    });
  }

  /* ---------- BACK TO TOP ---------- */
  const topBtn = document.getElementById("topBtn");
  window.addEventListener("scroll", () => {
    if (!topBtn) return;
    topBtn.style.display = window.scrollY > 500 ? "flex" : "none";
  }, { passive: true });
  if (topBtn) topBtn.addEventListener("click", () => window.scrollTo({ top:0, behavior:"smooth" }));

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

});
