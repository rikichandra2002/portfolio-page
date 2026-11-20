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
   MODERN CURSOR TRACKING
========================================================= */
(function initCursorExperience() {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    const follower = document.createElement("div");
    follower.className = "cursor-follower";
    follower.setAttribute("aria-hidden", "true");

    const aura = document.createElement("div");
    aura.className = "cursor-aura";
    aura.setAttribute("aria-hidden", "true");

    document.body.append(aura, follower);

    let targetX = -100;
    let targetY = -100;
    let currentX = targetX;
    let currentY = targetY;
    let auraX = targetX;
    let auraY = targetY;
    let frameRequested = false;

    const cards = document.querySelectorAll(
        ".project-card, .skill-category, .certificate-card, .stat-card, .experience-card, .resume-card, .contact-form"
    );

    cards.forEach((card) => {
        card.classList.add("mouse-highlight");
        card.addEventListener("pointermove", (event) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
            card.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
        }, { passive: true });
        card.addEventListener("pointerenter", () => document.body.classList.add("cursor-hover"));
        card.addEventListener("pointerleave", () => document.body.classList.remove("cursor-hover"));
    });

    function animateCursor() {
        currentX += (targetX - currentX) * 0.22;
        currentY += (targetY - currentY) * 0.22;
        auraX += (targetX - auraX) * 0.075;
        auraY += (targetY - auraY) * 0.075;

        follower.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
        aura.style.transform = `translate3d(${auraX}px, ${auraY}px, 0) translate(-50%, -50%)`;

        const followerMoving = Math.abs(targetX - currentX) > 0.35 || Math.abs(targetY - currentY) > 0.35;
        const auraMoving = Math.abs(targetX - auraX) > 0.8 || Math.abs(targetY - auraY) > 0.8;

        if (followerMoving || auraMoving) {
            requestAnimationFrame(animateCursor);
        } else {
            frameRequested = false;
        }
    }

    document.addEventListener("pointermove", (event) => {
        targetX = event.clientX;
        targetY = event.clientY;
        document.body.classList.add("cursor-active");
        if (!frameRequested) {
            frameRequested = true;
            requestAnimationFrame(animateCursor);
        }
    }, { passive: true });

    document.addEventListener("pointerleave", () => {
        document.body.classList.remove("cursor-active", "cursor-hover");
    });
})();

/* =========================================================
   SKILLS — ACCESSIBLE SINGLE-CARD ACCORDION
========================================================= */
(function initSkillCards() {
    const cards = [...document.querySelectorAll("[data-skill-card]")];
    if (!cards.length) return;

    function setExpanded(selectedCard) {
        const shouldExpand = !selectedCard.classList.contains("is-expanded");

        cards.forEach((card) => {
            const expanded = card === selectedCard && shouldExpand;
            card.classList.toggle("is-expanded", expanded);
            card.setAttribute("aria-expanded", String(expanded));

            const title = card.querySelector("h3")?.textContent.trim() || "skills";
            card.setAttribute("aria-label", `${expanded ? "Hide" : "Show"} ${title} skills`);
        });
    }

    cards.forEach((card) => {
        card.addEventListener("click", () => setExpanded(card));
        card.addEventListener("keydown", (event) => {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            setExpanded(card);
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


/* =========================================================
   FOOTER CROWD — drawn, animated, looks at the cursor
========================================================= */

(function () {
    const crowd = document.getElementById("ft-crowd");
    const bye = document.getElementById("ft-bye");
    if (!crowd) return;

    const INK = "#111";
    const hair = {
        short:  ['', `<path d="M33 58C30 30 48 24 62 25C80 26 90 40 87 58C82 46 70 40 58 41C46 42 37 48 33 58Z" fill="${INK}"/>`],
        bun:    ['', `<path d="M33 58C30 30 48 24 62 25C80 26 90 40 87 58C82 46 70 40 58 41C46 42 37 48 33 58Z" fill="${INK}"/><circle cx="60" cy="19" r="11" fill="${INK}"/>`],
        curly:  ['', [[38,40,10],[50,30,11],[66,28,11],[80,36,10],[87,50,8],[33,52,8]].map(c => `<circle cx="${c[0]}" cy="${c[1]}" r="${c[2]}" fill="${INK}"/>`).join("")],
        long:   [`<path d="M32 54L27 112H93L88 54Z" fill="${INK}"/>`, `<path d="M33 58C30 30 48 24 62 25C80 26 90 40 87 58C82 46 70 40 58 41C46 42 37 48 33 58Z" fill="${INK}"/>`],
        bald:   ['', ''],
        cap:    ['', `<path d="M32 52C34 26 86 26 88 52Z" fill="${INK}"/><rect x="26" y="49" width="68" height="7" rx="3.5" fill="${INK}"/>`],
        scarf:  ['', `<path d="M29 64C22 20 98 20 91 64L92 94C80 90 76 82 74 72C70 48 50 48 46 72C44 82 40 90 28 94Z" fill="#e4e4e4" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`]
    };
    const cloth = { dark: INK, light: "#fff", grey: "#d8d8d8" };
    const mouth = {
        smile: `<path d="M49 77Q60 87 71 77" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`,
        open:  `<path d="M50 76Q60 92 70 76Z" fill="${INK}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`,
        flat:  `<path d="M52 79H68" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`
    };
    const beard = `<path d="M34 64C35 98 85 98 86 64C82 80 72 82 60 82C48 82 38 80 34 64Z" fill="${INK}"/>`;

    function person(o) {
        const [back, front] = hair[o.hair];
        const glasses = o.glasses
            ? `<g fill="none" stroke="${INK}" stroke-width="3"><circle cx="48" cy="60" r="10"/><circle cx="72" cy="60" r="10"/><path d="M58 60H62"/></g>` : "";
        const mouthSvg = o.beard
            ? beard + `<path d="M52 80Q60 85 68 80" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`
            : mouth[o.mouth || "smile"];
        const collar = o.cloth !== "dark"
            ? `<path d="M46 100L60 118L74 100" fill="none" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>` : "";
        const wave = o.wave
            ? `<g class="wave"><path d="M100 150C106 128 108 112 106 92" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><circle cx="106" cy="86" r="9" fill="#fff" stroke="${INK}" stroke-width="3"/></g>` : "";
        return `<svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round">
            ${back}
            <path d="M8 150C8 114 30 98 60 98C90 98 112 114 112 150Z" fill="${cloth[o.cloth]}" stroke="${INK}" stroke-width="3"/>
            ${collar}${wave}
            <g class="head">
                <rect x="52" y="82" width="16" height="20" fill="#fff" stroke="${INK}" stroke-width="3"/>
                <circle cx="33" cy="60" r="5" fill="#fff" stroke="${INK}" stroke-width="3"/>
                <circle cx="87" cy="60" r="5" fill="#fff" stroke="${INK}" stroke-width="3"/>
                <ellipse cx="60" cy="58" rx="27" ry="31" fill="#fff" stroke="${INK}" stroke-width="3"/>
                ${front}
                <g class="eyes">
                    <circle cx="48" cy="60" r="6.5" fill="#fff" stroke="${INK}" stroke-width="2.5"/>
                    <circle cx="72" cy="60" r="6.5" fill="#fff" stroke="${INK}" stroke-width="2.5"/>
                    <circle class="pupil" cx="48" cy="60" r="3" fill="${INK}"/>
                    <circle class="pupil" cx="72" cy="60" r="3" fill="${INK}"/>
                </g>
                ${glasses}
                <path d="M60 63Q57 70 61 71" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
                ${mouthSvg}
            </g>
        </svg>`;
    }

    const cast = [
        { hair: "bun",   cloth: "grey",  s: 0.95 },
        { hair: "short", cloth: "dark",  s: 1.05, beard: true },
        { hair: "curly", cloth: "light", s: 0.9,  mouth: "open" },
        { hair: "scarf", cloth: "grey",  s: 1.0 },
        { hair: "short", cloth: "dark",  s: 1.15, glasses: true, wave: true },
        { hair: "long",  cloth: "light", s: 1.0,  glasses: true },
        { hair: "bald",  cloth: "grey",  s: 0.95, beard: true },
        { hair: "cap",   cloth: "dark",  s: 0.85, mouth: "open" },
        { hair: "bun",   cloth: "light", s: 1.05 },
        { hair: "curly", cloth: "dark",  s: 0.95, glasses: true, mouth: "flat" },
        { hair: "scarf", cloth: "light", s: 0.9 },
        { hair: "short", cloth: "grey",  s: 1.05, beard: true }
    ];

    [...cast, ...cast, ...cast, ...cast].forEach((o, i) => {
        const el = document.createElement("div");
        el.className = "ft-person";
        // the crowd rises from the middle outwards
        const fromCentre = (i % cast.length) * 0.9;
        el.style.setProperty("--s", o.s);
        el.style.setProperty("--d", (fromCentre * 0.08).toFixed(2) + "s");
        el.style.setProperty("--d2", ((i * 0.37) % 2.6).toFixed(2) + "s");
        el.innerHTML = person(o);
        el.addEventListener("click", () => {
            el.classList.remove("hop");
            void el.offsetWidth;
            el.classList.add("hop");
        });
        el.addEventListener("animationend", e => {
            if (e.animationName === "ft-hop") el.classList.remove("hop");
        });
        crowd.appendChild(el);
    });

    /* The one who stays: a full-length figure standing in the middle */
    const me = document.createElement("div");
    me.className = "ft-me";
    me.innerHTML = `<svg viewBox="0 0 120 330" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round" stroke-linecap="round">
        <g stroke="${INK}" stroke-width="3">
            <path d="M24 196H56V300H24Z" fill="#d8d8d8"/><path d="M64 196H96V300H64Z" fill="#d8d8d8"/>
            <path d="M56 196H64V300H56Z" fill="${INK}" stroke="none" opacity=".15"/>
            <path d="M16 306C16 296 24 296 40 298L56 300V314H16Z" fill="${INK}"/>
            <path d="M104 306C104 296 96 296 80 298L64 300V314H104Z" fill="${INK}"/>
            <g class="breathe">
                <path d="M26 104C26 98 42 96 60 96C78 96 94 98 94 104L98 206H22Z" fill="${INK}"/>
                <path d="M26 106L10 190L24 196L36 124Z" fill="${INK}"/>
                <circle cx="15" cy="200" r="8" fill="#fff"/>
                <g class="wave-me">
                    <path d="M94 106L110 70L100 62L84 120Z" fill="${INK}"/>
                    <circle cx="106" cy="58" r="9" fill="#fff"/>
                </g>
            </g>
        </g>
        <g class="head" transform="translate(0 -2)">
            <rect x="52" y="82" width="16" height="20" fill="#fff" stroke="${INK}" stroke-width="3"/>
            <circle cx="33" cy="60" r="5" fill="#fff" stroke="${INK}" stroke-width="3"/>
            <circle cx="87" cy="60" r="5" fill="#fff" stroke="${INK}" stroke-width="3"/>
            <ellipse cx="60" cy="58" rx="27" ry="31" fill="#fff" stroke="${INK}" stroke-width="3"/>
            ${hair.short[1]}
            <g class="eyes">
                <circle cx="48" cy="60" r="6.5" fill="#fff" stroke="${INK}" stroke-width="2.5"/>
                <circle cx="72" cy="60" r="6.5" fill="#fff" stroke="${INK}" stroke-width="2.5"/>
                <circle class="pupil" cx="48" cy="60" r="3" fill="${INK}"/>
                <circle class="pupil" cx="72" cy="60" r="3" fill="${INK}"/>
            </g>
            <g fill="none" stroke="${INK}" stroke-width="3"><circle cx="48" cy="60" r="10"/><circle cx="72" cy="60" r="10"/><path d="M58 60H62"/></g>
            <path d="M60 63Q57 70 61 71" fill="none" stroke="${INK}" stroke-width="2.5"/>
            ${mouth.smile}
        </g>
    </svg>`;
    crowd.parentNode.appendChild(me);

    /* Reveal when the footer scrolls into view */
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            crowd.classList.add("in"); me.classList.add("in");
            if (bye) bye.classList.add("in");
            io.disconnect();
        });
    }, { threshold: 0.25 });
    io.observe(document.getElementById("footer"));

    /* Eyes follow the cursor; wander on their own when it is idle */
    const people = [...crowd.children, me];
    let lastMove = 0, raf = 0;

    function look(el, tx, ty) {
        const r = el.getBoundingClientRect();
        const dx = tx - (r.left + r.width / 2);
        const dy = ty - (r.top + r.height * 0.38);
        const dist = Math.hypot(dx, dy) || 1;
        const k = Math.min(1, dist / 260) * 3.4;
        el.style.setProperty("--px", (dx / dist * k).toFixed(2) + "px");
        el.style.setProperty("--py", (dy / dist * k).toFixed(2) + "px");
    }

    window.addEventListener("pointermove", e => {
        lastMove = performance.now();
        if (raf) return;
        raf = requestAnimationFrame(() => {
            raf = 0;
            people.forEach(p => look(p, e.clientX, e.clientY));
        });
    }, { passive: true });

    setInterval(() => {
        if (performance.now() - lastMove < 3000) return;
        people.forEach(p => {
            const a = Math.random() * Math.PI * 2, m = Math.random() * 3;
            p.style.setProperty("--px", (Math.cos(a) * m).toFixed(2) + "px");
            p.style.setProperty("--py", (Math.sin(a) * m).toFixed(2) + "px");
        });
    }, 2200);
})();
