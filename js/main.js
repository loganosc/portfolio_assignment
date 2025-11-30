/* ===================================================================
 * Luther 1.0.0 - Main JS (Final with tighter gradient)
 * ------------------------------------------------------------------- */

(function (html) {
    "use strict";

    html.className = html.className.replace(/\bno-js\b/g, "") + " js ";

    const isMobile = window.matchMedia("(max-width: 800px)").matches;
/* --------------------------------------------------------------
 * Page Gradient Cursor (small & hides on nav/footer/leave)
 * -------------------------------------------------------------- */

    const grad = document.querySelector(".page-gradient");

    function setHighlight(xPercent, yPercent) {
    if (!grad) return;

    grad.style.background = `
        radial-gradient(
        circle at ${xPercent}% ${yPercent}%,
        var(--color-accent-soft) 0%,
        transparent 13%
        ),
        linear-gradient(
        to bottom,
        var(--color-bg),
        var(--color-bg-elevated)
        )
    `;
    }

    function enableHighlight() {
    document.documentElement.style.setProperty("--highlight-opacity", "1");
    }

    function disableHighlight() {
    document.documentElement.style.setProperty("--highlight-opacity", "0");
    }

    // Mouse moves anywhere in viewport . update dot + show it
    window.addEventListener("mousemove", function (event) {
    if (!grad) return;

    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;

    setHighlight(x, y);
    enableHighlight();
    });

    // Leave viewport . hide
    window.addEventListener("mouseleave", disableHighlight);

    // Enter header or footer . hide
    const headerEl = document.querySelector("header");
    const footerEl = document.querySelector("footer");
    const mainEl   = document.querySelector("main");

    if (headerEl) {
    headerEl.addEventListener("mouseenter", disableHighlight);
    }
    if (footerEl) {
    footerEl.addEventListener("mouseenter", disableHighlight);
    }

    // Back to main content . show
    if (mainEl) {
    mainEl.addEventListener("mouseenter", enableHighlight);
    }

    /* --------------------------------------------------------------
     * Preloader
     * -------------------------------------------------------------- */
    const ssPreloader = function () {
        const preloader = document.querySelector("#preloader");
        if (!preloader) return;

        window.addEventListener("load", function () {
            html.classList.remove("ss-preload");
            html.classList.add("ss-loaded");

            setTimeout(() => {
                const tl = anime.timeline({
                    easing: "easeInOutCubic",
                    duration: 600,
                    autoplay: true,
                });

                tl.add({
                    targets: "#loader",
                    opacity: 0,
                    duration: 400,
                    begin: () => window.scrollTo(0, 0),
                }).add({
                    targets: "#preloader",
                    opacity: 0,
                    complete: () => {
                        preloader.style.display = "none";
                    },
                });
            }, 100);
        });
    };

    /* (All other sections stay the same — animations, menu, swiper, etc.) */

    /* --------------------------------------------------------------
     * Initialize JS
     * -------------------------------------------------------------- */
    (function ssInit() {
        ssPreloader();
        ssHeroGradientCursor();
        // keep your other initializers if needed:
        // ssMobileMenu();
        // ssScrollSpy();
        // ssViewAnimate();
        // ssSwiper();
        // ssLightbox();
        // ssAlertBoxes();
        // ssMoveTo();
    })();
})(document.documentElement);
