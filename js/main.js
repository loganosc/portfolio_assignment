// ===============================
// Main JS (Final Stable Build)
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  html.classList.remove("no-js");
  html.classList.add("js");

  const isMobile = window.matchMedia("(max-width: 800px)").matches;

  // --------------------------------------------------------------
  // Cursor Spotlight Gradient (small, reactive, hides on nav/footer)
  // --------------------------------------------------------------
  const grad = document.querySelector(".page-gradient");

  function setHighlight(xPercent, yPercent) {
    if (!grad) return;

    document.documentElement.style.setProperty("--spot-x", `${xPercent}%`);
    document.documentElement.style.setProperty("--spot-y", `${yPercent}%`);
  }

  function enableHighlight() {
    document.documentElement.style.setProperty("--highlight-opacity", "1");
  }

  function disableHighlight() {
    document.documentElement.style.setProperty("--highlight-opacity", "0");
  }

  // Move and show gradient
  window.addEventListener("pointermove", (event) => {
    if (!grad) return;

    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;

    setHighlight(x, y);
    enableHighlight();
  });

  // Hide when leaving viewport
  window.addEventListener("mouseleave", disableHighlight);

  // Hide on header and footer, show on main
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
  const main = document.querySelector("main");

  header?.addEventListener("mouseenter", disableHighlight);
  footer?.addEventListener("mouseenter", disableHighlight);
  main?.addEventListener("mouseenter", enableHighlight);

  // --------------------------------------------------------------
  // Scroll Reveal (desktop only)
  // --------------------------------------------------------------
  function initScrollReveal() {
    if (isMobile) return;

    const items = document.querySelectorAll(".reveal-on-scroll");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    items.forEach((el) => observer.observe(el));
  }

  initScrollReveal();

  // --------------------------------------------------------------
  // Simple Preloader Fade Out
  // --------------------------------------------------------------
  function initPreloader() {
    const preloader = document.querySelector("#preloader");
    const loader = document.querySelector("#loader");

    if (!preloader || !loader) return;

    window.addEventListener("load", () => {
      loader.style.opacity = "0";

      setTimeout(() => {
        preloader.style.opacity = "0";
        setTimeout(() => {
          preloader.style.display = "none";
        }, 300);
      }, 150);
    });
  }

  initPreloader();
});
