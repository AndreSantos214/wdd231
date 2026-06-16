import { openSkillModal, setupModal } from "./modal.js";

const skillsContainer = document.getElementById("skills-container");
const filterButtons = document.querySelectorAll(".filter-button");

let allSkills = [];

async function getSkills() {
  try {
    const response = await fetch("data/skills.json");

    if (response.ok === false) {
      throw new Error("Could not load the skills file.");
    }

    allSkills = await response.json();
    displaySkills(allSkills);
  } catch (error) {
    skillsContainer.innerHTML = `
      <p>Sorry, the skills could not be loaded.</p>
    `;

    console.error(error);
  }
}

function displaySkills(skills) {
  skillsContainer.innerHTML = "";

  skills.forEach((skill) => {
    const card = document.createElement("article");
    card.classList.add("skill-card");

    card.innerHTML = `
      <h2>${skill.name}</h2>
      <p class="skill-category">${skill.category}</p>
      <p><strong>Level:</strong> ${skill.level}</p>
      <p><strong>Status:</strong> ${skill.status}</p>
      <button type="button">View Details</button>
    `;

    const detailsButton = card.querySelector("button");

    detailsButton.addEventListener("click", () => {
      openSkillModal(skill);
    });

    skillsContainer.appendChild(card);
  });
}

function setupFilters() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;

      filterButtons.forEach((btn) => {
        btn.classList.remove("active-filter");
      });

      button.classList.add("active-filter");

      if (category === "All") {
        displaySkills(allSkills);
      } else {
        const filteredSkills = allSkills.filter((skill) => {
          return skill.category === category;
        });

        displaySkills(filteredSkills);
      }
    });
  });
}

getSkills();
setupFilters();
setupModal();
