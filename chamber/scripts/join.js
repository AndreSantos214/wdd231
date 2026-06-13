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
  } else {
    menuButton.innerHTML = "&#9776;";
  }
});

const timestamp = document.getElementById("timestamp");
timestamp.value = new Date();

const npButton = document.getElementById("np-button");
const bronzeButton = document.getElementById("bronze-button");
const silverButton = document.getElementById("silver-button");
const goldButton = document.getElementById("gold-button");

const npModal = document.getElementById("np-modal");
const bronzeModal = document.getElementById("bronze-modal");
const silverModal = document.getElementById("silver-modal");
const goldModal = document.getElementById("gold-modal");

npButton.addEventListener("click", () => {
  npModal.showModal();
});

bronzeButton.addEventListener("click", () => {
  bronzeModal.showModal();
});

silverButton.addEventListener("click", () => {
  silverModal.showModal();
});

goldButton.addEventListener("click", () => {
  goldModal.showModal();
});

const closeButtons = document.querySelectorAll(".close-modal");

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.parentElement.close();
  });
});
