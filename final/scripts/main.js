import { getSavedTheme, saveTheme, applyTheme } from "./storage.js";

const currentYear = new Date().getFullYear();
document.getElementById("current-year").textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById("last-modified-date").textContent = lastModified;

const menuButton = document.getElementById("menu-button");
const navigation = document.getElementById("navigation-menu");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("show");

  if (navigation.classList.contains("show")) {
    menuButton.innerHTML = "&#10005;";
    menuButton.setAttribute("aria-label", "Close navigation menu");
  } else {
    menuButton.innerHTML = "&#9776;";
    menuButton.setAttribute("aria-label", "Open navigation menu");
  }
});

const themeButton = document.getElementById("theme-button");
const savedTheme = getSavedTheme();

if (savedTheme === "light") {
  applyTheme("light");
  themeButton.textContent = "☾";
  themeButton.setAttribute("aria-label", "Change to dark mode");
} else {
  applyTheme("dark");
  themeButton.textContent = "☼";
  themeButton.setAttribute("aria-label", "Change to light mode");
}

themeButton.addEventListener("click", () => {
  if (document.body.classList.contains("light-theme")) {
    applyTheme("dark");
    saveTheme("dark");
    themeButton.textContent = "☼";
    themeButton.setAttribute("aria-label", "Change to light mode");
  } else {
    applyTheme("light");
    saveTheme("light");
    themeButton.textContent = "☾";
    themeButton.setAttribute("aria-label", "Change to dark mode");
  }
});
