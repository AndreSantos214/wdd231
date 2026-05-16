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

const gridButton = document.getElementById("grid-view-btn");
const listButton = document.getElementById("list-view-btn");
const membersContainer = document.getElementById("members-container");

gridButton.addEventListener("click", () => {
  membersContainer.classList.add("grid-layout");
  membersContainer.classList.remove("list-layout");

  gridButton.classList.add("active-view");
  listButton.classList.remove("active-view");
});

listButton.addEventListener("click", () => {
  membersContainer.classList.add("list-layout");
  membersContainer.classList.remove("grid-layout");

  listButton.classList.add("active-view");
  gridButton.classList.remove("active-view");
});

const url = "data/members.json";

async function getMemberData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    console.error("Oops! Something went wrong fetching the data:", error);
  }
}

function displayMembers(members) {
  membersContainer.innerHTML = "";
  members.forEach((member) => {
    let card = document.createElement("section");
    card.classList.add("member-card");

    let logo = document.createElement("img");
    logo.setAttribute("src", `images/${member.image}`);
    logo.setAttribute("alt", `${member.name} Logo`);
    logo.setAttribute("loading", "lazy");
    logo.setAttribute("width", "120");
    logo.setAttribute("height", "120");

    let name = document.createElement("h3");
    name.textContent = member.name;

    let tagline = document.createElement("p");
    tagline.classList.add("member-tagline");
    tagline.textContent = `"${member.tagline}"`;

    let info = document.createElement("div");
    info.classList.add("member-info");

    let levelText = "Member";
    let levelClass = "badge-member";

    if (member.membershipLevel === 3) {
      levelText = "Gold";
      levelClass = "badge-gold";
    } else if (member.membershipLevel === 2) {
      levelText = "Silver";
      levelClass = "badge-silver";
    }

    info.innerHTML = `
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Website:</strong> <a href="${member.website}" target="_blank">Visit Site</a></p>
      <span class="badge ${levelClass}">${levelText}</span>
    `;

    card.appendChild(logo);
    card.appendChild(name);
    card.appendChild(tagline);
    card.appendChild(info);

    membersContainer.appendChild(card);
  });
}

getMemberData();
