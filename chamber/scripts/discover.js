import { places } from "../data/places.mjs";

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

const cardsContainer = document.getElementById("discover-cards");
const visitorMessage = document.getElementById("visitor-message");

function displayPlaces() {
  cardsContainer.innerHTML = "";

  places.forEach((place, index) => {
    const card = document.createElement("article");
    card.classList.add("discover-card");
    card.classList.add(`card-${index + 1}`);

    card.innerHTML = `
      <h2>${place.name}</h2>
      <figure>
        <img src="images/${place.image}" alt="${place.name}" loading="lazy" width="300" height="200">
      </figure>
      <address>${place.address}</address>
      <p>${place.description}</p>
      <button type="button">Learn More</button>
    `;

    cardsContainer.appendChild(card);
  });
}

function displayVisitMessage() {
  const lastVisit = localStorage.getItem("lastVisit");
  const today = Date.now();

  if (lastVisit === null) {
    visitorMessage.textContent =
      "Welcome! Let us know if you have any questions.";
  } else {
    const difference = today - Number(lastVisit);
    const daysBetween = Math.floor(difference / 86400000);

    if (daysBetween < 1) {
      visitorMessage.textContent = "Back so soon! Awesome!";
    } else if (daysBetween === 1) {
      visitorMessage.textContent = "You last visited 1 day ago.";
    } else {
      visitorMessage.textContent = `You last visited ${daysBetween} days ago.`;
    }
  }

  localStorage.setItem("lastVisit", today);
}

displayPlaces();
displayVisitMessage();
