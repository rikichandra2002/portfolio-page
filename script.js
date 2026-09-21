/* =========================================================
   RITWIK CHANDRA PORTFOLIO
   Main JavaScript
========================================================= */

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

    if (!pageLoader) {
        return;
    }

    setTimeout(() => {
        pageLoader.classList.add("loaded");
    }, 500);

});


/* =========================================================
   3. DARK / LIGHT MODE
========================================================= */

const savedTheme = localStorage.getItem("portfolio-theme");


function setTheme(theme) {

    if (theme === "light") {

        body.classList.add("light-mode");

        updateThemeIcon(true);

        localStorage.setItem(
            "portfolio-theme",
            "light"
        );

    } else {

        body.classList.remove("light-mode");

        updateThemeIcon(false);

        localStorage.setItem(
            "portfolio-theme",
            "dark"
        );
    }
}


function updateThemeIcon(isLightMode) {

    if (!themeToggle) {
        return;
    }

    const icon = themeToggle.querySelector("i");

    if (!icon) {
        return;
    }

    if (isLightMode) {

        icon.classList.remove("fa-moon");

        icon.classList.add("fa-sun");

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

        themeToggle.setAttribute(
            "title",
            "Switch to dark mode"
        );

    } else {

        icon.classList.remove("fa-sun");

        icon.classList.add("fa-moon");

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

        themeToggle.setAttribute(
            "title",
            "Switch to light mode"
        );
    }
}


/*
   Load saved theme.

   If there is no saved preference,
   dark mode is used by default.
*/

if (savedTheme === "light") {

    setTheme("light");

} else {

    setTheme("dark");
}


/* Theme button */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            const isLightMode =
                body.classList.contains("light-mode");

            if (isLightMode) {

                setTheme("dark");

            } else {

                setTheme("light");
            }

        }
    );
}


/* =========================================================
   4. MOBILE NAVIGATION
========================================================= */

function openMobileMenu() {

    if (!mainNav || !menuToggle) {
        return;
    }

    mainNav.classList.add("open");

    body.classList.add("menu-open");

    const icon =
        menuToggle.querySelector("i");

    if (icon) {

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-xmark");

    }

    menuToggle.setAttribute(
        "aria-label",
        "Close navigation menu"
    );
}


function closeMobileMenu() {

    if (!mainNav || !menuToggle) {
        return;
    }

    mainNav.classList.remove("open");

    body.classList.remove("menu-open");

    const icon =
        menuToggle.querySelector("i");

    if (icon) {

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );
}


function toggleMobileMenu() {

    if (!mainNav) {
        return;
    }

    if (mainNav.classList.contains("open")) {

        closeMobileMenu();

    } else {

        openMobileMenu();

    }
}


if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        toggleMobileMenu
    );

}


/* Close menu after clicking navigation link */

const navLinks =
    document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {

    link.addEventListener(
        "click",
        () => {

            closeMobileMenu();

        }
    );

});


/* =========================================================
   5. ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            closeMobileMenu();

        }

    }
);


/* =========================================================
   6. HEADER SCROLL EFFECT
========================================================= */

function handleHeaderScroll() {

    if (!siteHeader) {
        return;
    }

    if (window.scrollY > 30) {

        siteHeader.classList.add("scrolled");

    } else {

        siteHeader.classList.remove("scrolled");

    }
}


window.addEventListener(
    "scroll",
    handleHeaderScroll,
    { passive: true }
);

handleHeaderScroll();


/* =========================================================
   7. ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll("main section[id]");


function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 180;

    let currentSection = "home";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        const sectionId =
            section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            currentSection = sectionId;

        }

    });


    navLinks.forEach((link) => {

        const href =
            link.getAttribute("href");

        if (href === `#${currentSection}`) {

            link.classList.add("active");

        } else {

            link.classList.remove("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);

window.addEventListener(
    "resize",
    updateActiveNavigation
);

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

    if (!typedText) {
        return;
    }

    const currentRole =
        roles[roleIndex];


    if (!isDeleting) {

        characterIndex++;

        typedText.textContent =
            currentRole.substring(
                0,
                characterIndex
            );


        if (
            characterIndex ===
            currentRole.length
        ) {

            isDeleting = true;

            setTimeout(
                typeRole,
                1700
            );

            return;
        }


    } else {

        characterIndex--;

        typedText.textContent =
            currentRole.substring(
                0,
                characterIndex
            );


        if (characterIndex === 0) {

            isDeleting = false;

            roleIndex =
                (roleIndex + 1) %
                roles.length;

        }

    }


    const typingSpeed =
        isDeleting ? 45 : 85;


    setTimeout(
        typeRole,
        typingSpeed
    );
}


if (typedText) {

    setTimeout(
        typeRole,
        900
    );

}


/* =========================================================
   9. SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add(
                    "revealed"
                );

                observer.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: 0.12,

            rootMargin:
                "0px 0px -40px 0px"
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================================
   10. BACK TO TOP
========================================================= */

function updateBackToTop() {

    if (!backToTop) {
        return;
    }

    if (window.scrollY > 600) {

        backToTop.classList.add(
            "visible"
        );

    } else {

        backToTop.classList.remove(
            "visible"
        );

    }
}


window.addEventListener(
    "scroll",
    updateBackToTop,
    { passive: true }
);


if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


updateBackToTop();


/* =========================================================
   11. SMOOTH INTERNAL LINKS
========================================================= */

const internalLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


internalLinks.forEach((link) => {

    link.addEventListener(
        "click",
        (event) => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(
                    targetId
                );


            if (!target) {
                return;
            }


            event.preventDefault();


            const headerHeight =
                siteHeader
                    ? siteHeader.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect()
                    .top +
                window.scrollY -
                headerHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });


            closeMobileMenu();

        }
    );

});


/* =========================================================
   12. PROJECT CARD INTERACTION
========================================================= */

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


projectCards.forEach((card) => {

    card.addEventListener(
        "mouseenter",
        () => {

            card.style.transition =
                "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease";

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "";

        }
    );

});


/* =========================================================
   13. CERTIFICATE CARD INTERACTION
========================================================= */

const certificateCards =
    document.querySelectorAll(
        ".certificate-card"
    );


certificateCards.forEach((card) => {

    card.addEventListener(
        "mouseenter",
        () => {

            card.classList.add(
                "certificate-hover"
            );

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.classList.remove(
                "certificate-hover"
            );

        }
    );

});


/* =========================================================
   14. CONTACT FORM
========================================================= */

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        () => {

            const submitButton =
                contactForm.querySelector(
                    ".submit-btn"
                );


            if (!submitButton) {
                return;
            }


            const buttonText =
                submitButton.querySelector(
                    "span"
                );

            const buttonIcon =
                submitButton.querySelector(
                    "i"
                );


            if (buttonText) {

                buttonText.textContent =
                    "Sending...";

            }


            if (buttonIcon) {

                buttonIcon.classList.remove(
                    "fa-paper-plane"
                );

                buttonIcon.classList.add(
                    "fa-spinner",
                    "fa-spin"
                );

            }


            submitButton.disabled =
                true;

        }
    );

}


/* =========================================================
   15. CURRENT YEAR
========================================================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   16. CLOSE MOBILE MENU WHEN WINDOW EXPANDS
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 900
        ) {

            closeMobileMenu();

        }

    }
);


/* =========================================================
   17. HANDLE HASH ON PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {

        if (!window.location.hash) {
            return;
        }


        const target =
            document.querySelector(
                window.location.hash
            );


        if (!target) {
            return;
        }


        setTimeout(() => {

            const headerHeight =
                siteHeader
                    ? siteHeader.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect()
                    .top +
                window.scrollY -
                headerHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        }, 300);

    }
);


/* =========================================================
   18. IMAGE ERROR HANDLING
========================================================= */

const profileImage =
    document.querySelector(
        ".profile-image"
    );


if (profileImage) {

    profileImage.addEventListener(
        "error",
        () => {

            profileImage.style.display =
                "none";

            const container =
                profileImage.parentElement;


            if (container) {

                container.classList.add(
                    "image-error"
                );

                container.innerHTML = `
                    <div style="
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        width:100%;
                        height:100%;
                        color:var(--text-muted);
                        font-family:var(--mono-font);
                        font-size:0.8rem;
                        text-align:center;
                        padding:20px;
                    ">
                        Profile image not found
                    </div>
                `;

            }

        }
    );

}


/* =========================================================
   19. FINAL INITIALIZATION
========================================================= */

document.documentElement.style.setProperty(
    "--portfolio-loaded",
    "1"
);

/* =========================================================
   MODERN MOUSE SPOTLIGHT
========================================================= */

(function initMouseSpotlight() {

    const supportsMouse =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;

    if (!supportsMouse) {
        return;
    }


    /* -----------------------------------------------------
       CREATE SPOTLIGHT
    ----------------------------------------------------- */

    const spotlight =
        document.createElement("div");

    spotlight.className =
        "mouse-spotlight";

    document.body.appendChild(
        spotlight
    );


    /* -----------------------------------------------------
       POSITION
    ----------------------------------------------------- */

    let mouseX =
        window.innerWidth / 2;

    let mouseY =
        window.innerHeight / 2;

    let currentX =
        mouseX;

    let currentY =
        mouseY;


    document.addEventListener(
        "mousemove",
        function (event) {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;

            document.body.classList.add(
                "mouse-active"
            );
        },
        { passive: true }
    );


    /* -----------------------------------------------------
       SMOOTH FOLLOW
    ----------------------------------------------------- */

    function animate() {

        currentX +=
            (mouseX - currentX) * 0.09;

        currentY +=
            (mouseY - currentY) * 0.09;


        spotlight.style.transform =
            `translate3d(
                ${currentX}px,
                ${currentY}px,
                0
            ) translate(-50%, -50%)`;


        requestAnimationFrame(
            animate
        );
    }

    animate();


    /* -----------------------------------------------------
       HIDE WHEN MOUSE LEAVES
    ----------------------------------------------------- */

    document.addEventListener(
        "mouseleave",
        function () {

            document.body.classList.remove(
                "mouse-active"
            );
        }
    );


    /* -----------------------------------------------------
       HIGHLIGHT IMPORTANT UI
    ----------------------------------------------------- */

    const interactiveElements =
        document.querySelectorAll(
            ".project-card, " +
            ".skill-category, " +
            ".certificate-card, " +
            ".stat-card, " +
            ".experience-card, " +
            ".resume-card, " +
            ".contact-form"
        );


    interactiveElements.forEach(
        function (element) {

            element.classList.add(
                "mouse-highlight"
            );


            element.addEventListener(
                "mouseenter",
                function () {

                    element.classList.add(
                        "is-hovered"
                    );
                }
            );


            element.addEventListener(
                "mouseleave",
                function () {

                    element.classList.remove(
                        "is-hovered"
                    );
                }
            );
        }
    );

})();

/* ============================================
   BEYOND THE CODE — GALLERY LIGHTBOX
   ============================================ */

(function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll(".gallery-item");

    if (!galleryItems.length) return;

    const images = Array.from(galleryItems).map((item) => ({
        src: item.dataset.galleryImage,
        title: item.dataset.galleryTitle || "Moment & Milestone"
    }));

    let currentIndex = 0;

    /* Create lightbox */

    const lightbox = document.createElement("div");
    lightbox.className = "gallery-lightbox";

    lightbox.innerHTML = `
        <div class="lightbox-backdrop"></div>

        <div class="lightbox-content" role="dialog" aria-modal="true">

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

    const image = lightbox.querySelector(".lightbox-image");
    const title = lightbox.querySelector(".lightbox-title");
    const counter = lightbox.querySelector(".lightbox-counter");

    const closeButton = lightbox.querySelector(".lightbox-close");
    const previousButton = lightbox.querySelector(".lightbox-prev");
    const nextButton = lightbox.querySelector(".lightbox-next");
    const backdrop = lightbox.querySelector(".lightbox-backdrop");

    /* Update image */

    function updateLightbox(index) {
        currentIndex = (index + images.length) % images.length;

        const currentImage = images[currentIndex];

        image.src = currentImage.src;
        image.alt = currentImage.title;

        title.textContent = currentImage.title;
        counter.textContent = `${currentIndex + 1} / ${images.length}`;
    }

    /* Open */

    function openLightbox(index) {
        updateLightbox(index);

        lightbox.classList.add("is-open");
        document.body.classList.add("lightbox-open");

        closeButton.focus();
    }

    /* Close */

    function closeLightbox() {
        lightbox.classList.remove("is-open");
        document.body.classList.remove("lightbox-open");
    }

    /* Previous */

    function showPrevious() {
        updateLightbox(currentIndex - 1);
    }

    /* Next */

    function showNext() {
        updateLightbox(currentIndex + 1);
    }

    /* Gallery click */

    galleryItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            openLightbox(index);
        });
    });

    /* Controls */

    closeButton.addEventListener("click", closeLightbox);

    previousButton.addEventListener("click", showPrevious);

    nextButton.addEventListener("click", showNext);

    backdrop.addEventListener("click", closeLightbox);

    /* Keyboard controls */

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