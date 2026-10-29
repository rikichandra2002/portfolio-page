/*
 * Ritwik Chandra Portfolio — script.js
 * Navigation, theme toggle, scroll effects, typing animation,
 * reveal effects, contact form feedback, mouse spotlight,
 * and gallery lightbox.
 */

"use strict";

/* =========================================================
   1. DOM ELEMENTS
========================================================= */

const body = document.body;
const pageLoader = document.getElementById("page-loader");
const siteHeader = document.getElementById("site-header");
const themeToggle = document.getElementById("theme-toggle");
const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");
const typedText = document.getElementById("typed-text");
const backToTop = document.getElementById("back-to-top");
const contactForm = document.getElementById("contact-form");
const currentYear = document.getElementById("current-year");

/* =========================================================
   2. PAGE LOADER
========================================================= */

window.addEventListener("load", () => {
    if (!pageLoader) return;

    setTimeout(() => {
        pageLoader.classList.add("loaded");
    }, 500);
});

/* =========================================================
   3. DARK / LIGHT MODE
========================================================= */

let savedTheme = null;

try {
    savedTheme = localStorage.getItem("portfolio-theme");
} catch (error) {
    // Continue with the default theme if storage is unavailable.
}

function updateThemeIcon(isLightMode) {
    if (!themeToggle) return;

    const icon = themeToggle.querySelector("i");
    if (!icon) return;

    if (isLightMode) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

        themeToggle.setAttribute("aria-label", "Switch to dark mode");
        themeToggle.setAttribute("title", "Switch to dark mode");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

        themeToggle.setAttribute("aria-label", "Switch to light mode");
        themeToggle.setAttribute("title", "Switch to light mode");
    }
}

function setTheme(theme) {
    const isLightMode = theme === "light";

    body.classList.toggle("light-mode", isLightMode);
    updateThemeIcon(isLightMode);

    try {
        localStorage.setItem(
            "portfolio-theme",
            isLightMode ? "light" : "dark"
        );
    } catch (error) {
        // Theme still works for the current page session.
    }
}

// Dark mode is the default.
setTheme(savedTheme === "light" ? "light" : "dark");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const isLightMode = body.classList.contains("light-mode");
        setTheme(isLightMode ? "dark" : "light");
    });
}

/* =========================================================
   4. MOBILE NAVIGATION
========================================================= */

function openMobileMenu() {
    if (!mainNav || !menuToggle) return;

    mainNav.classList.add("open");
    body.classList.add("menu-open");

    const icon = menuToggle.querySelector("i");

    if (icon) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    }

    menuToggle.setAttribute("aria-label", "Close navigation menu");
}

function closeMobileMenu() {
    if (!mainNav || !menuToggle) return;

    mainNav.classList.remove("open");
    body.classList.remove("menu-open");

    const icon = menuToggle.querySelector("i");

    if (icon) {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

    menuToggle.setAttribute("aria-label", "Open navigation menu");
}

function toggleMobileMenu() {
    if (!mainNav) return;

    if (mainNav.classList.contains("open")) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

if (menuToggle) {
    menuToggle.addEventListener("click", toggleMobileMenu);
}

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
});

/* =========================================================
   5. ESCAPE KEY
========================================================= */

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMobileMenu();
    }
});

/* =========================================================
   6. HEADER SCROLL EFFECT
========================================================= */

function handleHeaderScroll() {
    if (!siteHeader) return;

    siteHeader.classList.toggle("scrolled", window.scrollY > 30);
}

window.addEventListener("scroll", handleHeaderScroll, {
    passive: true
});

handleHeaderScroll();

/* =========================================================
   7. ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("main section[id]");

function updateActiveNavigation() {
    const scrollPosition = window.scrollY + 180;
    let currentSection = "home";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {
            currentSection = sectionId;
        }
    });

    navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        link.classList.toggle(
            "active",
            href === `#${currentSection}`
        );
    });
}

window.addEventListener("scroll", updateActiveNavigation, {
    passive: true
});

window.addEventListener("resize", updateActiveNavigation);
updateActiveNavigation();

/* =========================================================
   8. TYPING ANIMATION
========================================================= */

const roles = [
    "AI/ML Engineer",
    "Full Stack Developer",
    "MERN Stack Developer",
    "Python Developer",
    "SAP ABAP Developer"
];

let roleIndex = 0;
let characterIndex = 0;
let isDeleting = false;

function typeRole() {
    if (!typedText) return;

    const currentRole = roles[roleIndex];

    if (!isDeleting) {
        characterIndex++;

        typedText.textContent = currentRole.substring(
            0,
            characterIndex
        );

        if (characterIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeRole, 1700);
            return;
        }
    } else {
        characterIndex--;

        typedText.textContent = currentRole.substring(
            0,
            characterIndex
        );

        if (characterIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeRole, isDeleting ? 45 : 85);
}

if (typedText) {
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
        typedText.textContent = roles[0];
    } else {
        setTimeout(typeRole, 900);
    }
}

/* =========================================================
   9. SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("revealed");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("revealed");
    });
}

/* =========================================================
   10. BACK TO TOP
========================================================= */

function updateBackToTop() {
    if (!backToTop) return;

    backToTop.classList.toggle("visible", window.scrollY > 600);
}

window.addEventListener("scroll", updateBackToTop, {
    passive: true
});

if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

updateBackToTop();

/* =========================================================
   11. SMOOTH INTERNAL LINKS
========================================================= */

const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        let target = null;

        try {
            target = document.querySelector(targetId);
        } catch (error) {
            return;
        }

        if (!target) return;

        event.preventDefault();

        const headerHeight = siteHeader
            ? siteHeader.offsetHeight
            : 0;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

        closeMobileMenu();
    });
});

/* =========================================================
   12. PROJECT CARD INTERACTION
========================================================= */

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
        card.style.transition =
            "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
    });
});

/* =========================================================
   13. CERTIFICATE CARD INTERACTION
========================================================= */

const certificateCards = document.querySelectorAll(
    ".certificate-card"
);

certificateCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
        card.classList.add("certificate-hover");
    });

    card.addEventListener("mouseleave", () => {
        card.classList.remove("certificate-hover");
    });
});

/* =========================================================
   14. CONTACT FORM FEEDBACK
========================================================= */

if (contactForm) {
    contactForm.addEventListener("submit", () => {
        const submitButton = contactForm.querySelector(".submit-btn");

        if (!submitButton) return;

        const buttonText = submitButton.querySelector("span");
        const buttonIcon = submitButton.querySelector("i");

        if (buttonText) {
            buttonText.textContent = "Sending...";
        }

        if (buttonIcon) {
            buttonIcon.classList.remove("fa-paper-plane");
            buttonIcon.classList.add("fa-spinner", "fa-spin");
        }

        submitButton.disabled = true;
    });
}

/* =========================================================
   15. CURRENT YEAR
========================================================= */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

/* =========================================================
   16. CLOSE MOBILE MENU WHEN WINDOW EXPANDS
========================================================= */

window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
        closeMobileMenu();
    }
});

/* =========================================================
   17. HANDLE HASH ON PAGE LOAD
========================================================= */

window.addEventListener("load", () => {
    if (!window.location.hash) return;

    let target = null;

    try {
        target = document.querySelector(window.location.hash);
    } catch (error) {
        return;
    }

    if (!target) return;

    setTimeout(() => {
        const headerHeight = siteHeader
            ? siteHeader.offsetHeight
            : 0;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });
    }, 300);
});
/* =========================================================
   18. PROFILE IMAGE ERROR HANDLING
========================================================= */

const profileImage = document.querySelector(".profile-image");

if (profileImage) {
    profileImage.addEventListener("error", () => {
        profileImage.style.display = "none";

        const container = profileImage.parentElement;

        if (container) {
            container.classList.add("image-error");

            container.innerHTML = `
                <div style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                    color: var(--text-muted);
                    font-family: var(--mono-font);
                    font-size: 0.8rem;
                    text-align: center;
                    padding: 20px;
                ">
                    Profile image not found
                </div>
            `;
        }
    });
}

/* =========================================================
   19. FINAL INITIALIZATION
========================================================= */

document.documentElement.style.setProperty(
    "--portfolio-loaded",
    "1"
);

/* =========================================================
   20. MODERN MOUSE SPOTLIGHT
========================================================= */

(function initMouseSpotlight() {
    const supportsMouse = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;

    if (!supportsMouse) return;

    // Create the spotlight element.
    const spotlight = document.createElement("div");
    spotlight.className = "mouse-spotlight";

    document.body.appendChild(spotlight);

    // Track the mouse position.
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let currentX = mouseX;
    let currentY = mouseY;

    document.addEventListener(
        "mousemove",
        (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;

            document.body.classList.add("mouse-active");
        },
        { passive: true }
    );

    // Smoothly animate the spotlight.
    function animate() {
        currentX += (mouseX - currentX) * 0.09;
        currentY += (mouseY - currentY) * 0.09;

        spotlight.style.transform =
            `translate3d(${currentX}px, ${currentY}px, 0) ` +
            "translate(-50%, -50%)";

        requestAnimationFrame(animate);
    }

    animate();

    // Hide the spotlight when the pointer leaves the page.
    document.addEventListener("mouseleave", () => {
        document.body.classList.remove("mouse-active");
    });

    // Add hover highlighting to selected elements.
    const interactiveElements = document.querySelectorAll(
        [
            ".project-card",
            ".skill-category",
            ".certificate-card",
            ".stat-card",
            ".experience-card",
            ".resume-card",
            ".contact-form"
        ].join(", ")
    );

    interactiveElements.forEach((element) => {
        element.classList.add("mouse-highlight");

        element.addEventListener("mouseenter", () => {
            element.classList.add("is-hovered");
        });

        element.addEventListener("mouseleave", () => {
            element.classList.remove("is-hovered");
        });
    });
})();
/* =========================================================
   21. BEYOND THE CODE — GALLERY LIGHTBOX
========================================================= */

(function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll(".gallery-item");

    if (!galleryItems.length) return;

    // Collect gallery image sources and titles.
    const images = Array.from(galleryItems).map((item) => ({
        src:
            item.dataset.galleryImage ||
            item.querySelector("img")?.src ||
            "",
        title:
            item.dataset.galleryTitle ||
            "Moment & Milestone"
    }));

    let currentIndex = 0;

    // Create the lightbox.
    const lightbox = document.createElement("div");
    lightbox.className = "gallery-lightbox";

    lightbox.innerHTML = `
        <div class="lightbox-backdrop"></div>

        <div
            class="lightbox-content"
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery"
        >
            <button
                class="lightbox-close"
                type="button"
                aria-label="Close gallery"
            >
                <i class="fas fa-xmark"></i>
            </button>

            <button
                class="lightbox-prev"
                type="button"
                aria-label="Previous image"
            >
                <i class="fas fa-chevron-left"></i>
            </button>

            <div class="lightbox-image-wrapper">
                <img
                    class="lightbox-image"
                    src=""
                    alt=""
                >
            </div>

            <button
                class="lightbox-next"
                type="button"
                aria-label="Next image"
            >
                <i class="fas fa-chevron-right"></i>
            </button>

            <div class="lightbox-info">
                <span class="lightbox-title"></span>
                <span class="lightbox-counter"></span>
            </div>
        </div>
    `;

    document.body.appendChild(lightbox);

    // Get the lightbox elements.
    const image = lightbox.querySelector(".lightbox-image");
    const title = lightbox.querySelector(".lightbox-title");
    const counter = lightbox.querySelector(".lightbox-counter");

    const closeButton = lightbox.querySelector(".lightbox-close");
    const previousButton = lightbox.querySelector(".lightbox-prev");
    const nextButton = lightbox.querySelector(".lightbox-next");
    const backdrop = lightbox.querySelector(".lightbox-backdrop");

    // Display the selected image.
    function updateLightbox(index) {
        currentIndex = (index + images.length) % images.length;

        const currentImage = images[currentIndex];

        if (currentImage.src) {
            image.src = currentImage.src;
            image.style.display = "";
        } else {
            image.removeAttribute("src");
            image.style.display = "none";
        }

        image.alt = currentImage.title;
        title.textContent = currentImage.title;

        counter.textContent =
            `${currentIndex + 1} / ${images.length}`;
    }

    // Open the lightbox.
    function openLightbox(index) {
        updateLightbox(index);

        lightbox.classList.add("is-open");
        document.body.classList.add("lightbox-open");

        closeButton.focus();
    }

    // Close the lightbox.
    function closeLightbox() {
        lightbox.classList.remove("is-open");
        document.body.classList.remove("lightbox-open");
    }

    // Navigate through gallery images.
    function showPrevious() {
        updateLightbox(currentIndex - 1);
    }

    function showNext() {
        updateLightbox(currentIndex + 1);
    }

    // Open an image when a gallery item is clicked.
    galleryItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            openLightbox(index);
        });
    });

    // Connect the lightbox controls.
    closeButton.addEventListener("click", closeLightbox);
    previousButton.addEventListener("click", showPrevious);
    nextButton.addEventListener("click", showNext);
    backdrop.addEventListener("click", closeLightbox);

    // Keyboard controls.
    document.addEventListener("keydown", (event) => {
        if (!lightbox.classList.contains("is-open")) return;

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowLeft") {
            showPrevious();
        }

        if (event.key === "ArrowRight") {
            showNext();
        }
    });
})();


/* =========================================
   22. 3D CERTIFICATION CAROUSEL
========================================= */

(function initCertificateCarousel() {
    const stage = document.getElementById("certificate-stage");
    const pagination = document.getElementById("certificate-pagination");
    const carousel = document.getElementById("certificate-carousel");

    if (!stage || !pagination || !carousel) return;

    // Paths matched to the assets/certification folder.
    const certificates = [
        {
            title: "SAP Certification",
            image: "assets/certification/SAPCertification.jpg",
            url: "assets/certification/SAPCertification.pdf"
        },
        {
            title: "MERN Stack Internship",
            image: "assets/certification/MERN_Internship.jpeg",
            url: "assets/certification/MERN_Internship.jpeg"
        },
        {
            title: "Artificial Intelligence Certification",
            image: "assets/certification/Fundamentals_of_Artificial_Intelligence.jpg",
            url: "assets/certification/Fundamentals%20of%20Artificial%20Intelligence.pdf"
        },
        {
            title: "Django Training",
            image: "assets/certification/Django_Training.jpg",
            url: "assets/certification/Django_Training.pdf"
        },
        {
            title: "IBM Certification",
            image: "assets/certification/IBMCertification.jpg",
            url: "assets/certification/IBMCertification.pdf"
        },
        {
            title: "IE(I) Chapter Certificate",
            image: "assets/certification/IEI_Chapter_Certificate.jpg",
            url: "assets/certification/IE(I)_Chapter_Certificate.pdf"
        },
        {
            title: "Advanced SQL Certificate",
            image: "assets/certification/sql_advanced_certificate.jpg",
            url: "assets/certification/sql_advanced%20certificate%20(1).pdf"
        }
    ];

    let activeIndex = 0;

    // Clear existing generated content.
    stage.replaceChildren();
    pagination.replaceChildren();

    const cards = [];
    const dots = [];

    // Build certificate cards.
    certificates.forEach((certificate, index) => {
        const card = document.createElement("article");
        card.className = "certificate-card is-hidden";

        const titleLink = document.createElement("a");
        titleLink.className = "certificate-title-link";
        titleLink.href = certificate.url;
        titleLink.target = "_blank";
        titleLink.rel = "noopener noreferrer";

        const title = document.createElement("span");
        title.textContent = certificate.title;

        const icon = document.createElement("i");
        icon.className = "fas fa-arrow-up-right-from-square";
        icon.setAttribute("aria-hidden", "true");

        titleLink.append(title, icon);

        const frame = document.createElement("div");
        frame.className = "certificate-image-frame";

        const image = document.createElement("img");
        image.src = certificate.image;
        image.alt = certificate.title;
        image.loading = index === 0 ? "eager" : "lazy";
        image.draggable = false;

        image.addEventListener("error", () => {
            frame.replaceChildren();

            const message = document.createElement("p");
            message.className = "certificate-preview-error";
            message.textContent =
                "Preview unavailable. Use the certificate link above.";

            frame.appendChild(message);
        });

        frame.appendChild(image);
        card.append(titleLink, frame);

        // Clicking a side card moves it to the center.
        card.addEventListener("click", (event) => {
            if (event.target.closest(".certificate-title-link")) return;
            if (index === activeIndex) return;

            showCertificate(index);
        });

        stage.appendChild(card);
        cards.push(card);
    });

    // Build pagination.
    certificates.forEach((certificate, index) => {
        const dot = document.createElement("button");

        dot.type = "button";
        dot.className = "certificate-dot";
        dot.setAttribute(
            "aria-label",
            `Show certificate ${index + 1}: ${certificate.title}`
        );

        dot.addEventListener("click", () => showCertificate(index));

        pagination.appendChild(dot);
        dots.push(dot);
    });

    // Position the cards in the 3D carousel.
    function renderCarousel() {
        const total = cards.length;

        cards.forEach((card, index) => {
            card.classList.remove(
                "is-center",
                "is-left",
                "is-right",
                "is-far-left",
                "is-far-right",
                "is-hidden"
            );

            let offset = index - activeIndex;

            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            if (offset === 0) {
                card.classList.add("is-center");
            } else if (offset === -1) {
                card.classList.add("is-left");
            } else if (offset === 1) {
                card.classList.add("is-right");
            } else if (offset === -2) {
                card.classList.add("is-far-left");
            } else if (offset === 2) {
                card.classList.add("is-far-right");
            } else {
                card.classList.add("is-hidden");
            }

            card.setAttribute("aria-current", String(offset === 0));
        });

        dots.forEach((dot, index) => {
            const active = index === activeIndex;

            dot.classList.toggle("is-active", active);
            dot.setAttribute("aria-current", String(active));
        });
    }

    function showCertificate(index) {
        activeIndex =
            (index + certificates.length) % certificates.length;

        renderCarousel();
    }

    function nextCertificate() {
        showCertificate(activeIndex + 1);
    }

    function previousCertificate() {
        showCertificate(activeIndex - 1);
    }

    carousel.querySelector(".certificate-prev")
        ?.addEventListener("click", previousCertificate);

    carousel.querySelector(".certificate-next")
        ?.addEventListener("click", nextCertificate);

    // Keyboard navigation.
    carousel.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            previousCertificate();
        } else if (event.key === "ArrowRight") {
            event.preventDefault();
            nextCertificate();
        }
    });

    // Mobile swipe navigation.
    let touchStartX = 0;
    let touchStartY = 0;

    stage.addEventListener("touchstart", (event) => {
        const touch = event.changedTouches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
    }, { passive: true });

    stage.addEventListener("touchend", (event) => {
        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - touchStartX;
        const deltaY = touch.clientY - touchStartY;

        if (
            Math.abs(deltaX) < 45 ||
            Math.abs(deltaX) < Math.abs(deltaY)
        ) return;

        deltaX < 0 ? nextCertificate() : previousCertificate();
    }, { passive: true });

    renderCarousel();
})();



/* =========================================
   PROJECT CAROUSEL
========================================= */
(function () {
    const carousel = document.getElementById("project-carousel");
    const stage = document.getElementById("project-stage");
    const pagination = document.getElementById("project-pagination");

    if (!carousel || !stage || !pagination) return;

    const cards = [...stage.querySelectorAll(":scope > .project-card")];

    if (!cards.length) {
        console.error("Project cards must be direct children of #project-stage.");
        return;
    }

    let active = 0;
    pagination.replaceChildren();

    const dots = cards.map((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "project-dot";
        dot.setAttribute("aria-label", `Show project ${i + 1}`);
        dot.addEventListener("click", () => show(i));
        pagination.appendChild(dot);
        return dot;
    });

    function render() {
        cards.forEach((card, i) => {
            const offset = (i - active + cards.length) % cards.length;
            const position = offset > cards.length / 2
                ? offset - cards.length
                : offset;

            card.classList.remove(
                "is-center", "is-left", "is-right",
                "is-far-left", "is-far-right", "is-hidden"
            );

            if (position === 0) card.classList.add("is-center");
            else if (position === -1) card.classList.add("is-left");
            else if (position === 1) card.classList.add("is-right");
            else if (position === -2) card.classList.add("is-far-left");
            else if (position === 2) card.classList.add("is-far-right");
            else card.classList.add("is-hidden");

            card.setAttribute("aria-hidden", String(position !== 0));
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("is-active", i === active);
            dot.setAttribute("aria-current", String(i === active));
        });
    }

    function show(index) {
        active = (index + cards.length) % cards.length;
        render();
    }

    carousel.querySelector(".project-prev")
        ?.addEventListener("click", () => show(active - 1));

    carousel.querySelector(".project-next")
        ?.addEventListener("click", () => show(active + 1));

    cards.forEach((card, i) => {
        card.addEventListener("click", event => {
            if (event.target.closest("a")) return;
            show(i);
        });
    });

    carousel.addEventListener("keydown", event => {
        if (event.key === "ArrowLeft") show(active - 1);
        if (event.key === "ArrowRight") show(active + 1);
    });

    render();
})();
