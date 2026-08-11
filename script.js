// ===========================
// DARK / LIGHT MODE TOGGLE
// ===========================

const themeToggle = document.getElementById("theme-toggle");

// Get saved theme
const savedTheme = localStorage.getItem("theme");

// Dark mode is the default
if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeToggle.textContent = "☀️";
} else {
    document.body.classList.remove("light-mode");
    themeToggle.textContent = "🌙";
}


// Toggle theme
themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const isLightMode =
        document.body.classList.contains("light-mode");

    if (isLightMode) {

        themeToggle.textContent = "☀️";

        localStorage.setItem("theme", "light");

    } else {

        themeToggle.textContent = "🌙";

        localStorage.setItem("theme", "dark");

    }

});