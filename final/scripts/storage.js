function getSavedTheme() {
  return localStorage.getItem("theme");
}

function saveTheme(theme) {
  localStorage.setItem("theme", theme);
}

function applyTheme(theme) {
  if (theme === "light") {
    document.body.classList.add("light-theme");
  } else {
    document.body.classList.remove("light-theme");
  }
}

export { getSavedTheme, saveTheme, applyTheme };
