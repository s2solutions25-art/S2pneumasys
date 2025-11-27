// Mobile navigation toggle
const navToggle = document.querySelector(".nav-toggle");
const navList = document.querySelector(".nav-list");
if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    const open = navList.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
}

// Dynamic year in footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Experience counters animation
const counters = document.querySelectorAll(".stat .value");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = Number(el.getAttribute("data-target"));
      let current = 0;
      const step = Math.max(1, Math.floor(target / 60));
      const tick = () => {
        current += step;
        if (current >= target) {
          el.textContent = target;
        } else {
          el.textContent = current;
          requestAnimationFrame(tick);
        }
      };
      requestAnimationFrame(tick);
      observer.unobserve(el);
    }
  });
}, { threshold: 0.3 });
counters.forEach((c) => observer.observe(c));

// Contact form validation + feedback
const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");

function setError(input, message) {
  const err = input.parentElement.querySelector(".error");
  if (err) err.textContent = message || "";
}

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (form) {
  form.addEventListener("submit", async (e) => {
    // Basic client-side validation
    const name = form.querySelector("#name");
    const email = form.querySelector("#email");
    const message = form.querySelector("#message");

    let ok = true;
    setError(name, "");
    setError(email, "");
    setError(message, "");

    if (!name.value.trim()) {
      setError(name, "Please enter your name.");
      ok = false;
    }
    if (!email.value.trim() || !validEmail(email.value.trim())) {
      setError(email, "Please enter a valid email address.");
      ok = false;
    }
    if (!message.value.trim()) {
      setError(message, "Please describe your project.");
      ok = false;
    }

    if (!ok) {
      e.preventDefault();
      return;
    }

    // Show optimistic status; Formspree handles actual send
    statusEl.textContent = "Submitting…";
    // Let the normal POST occur; if you prefer AJAX:
    // e.preventDefault();
    // try {
    //   const data = new FormData(form);
    //   const resp = await fetch(form.action, { method: "POST", body: data, headers: { Accept: "application/json" } });
    //   if (resp.ok) {
    //     statusEl.textContent = "Thanks! We’ll contact you soon.";
    //     form.reset();
    //   } else {
    //     statusEl.textContent = "Something went wrong. Please try again.";
    //   }
    // } catch {
    //   statusEl.textContent = "Network error. Please try again.";
    // }
  });
}
