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

const myInfo = new URLSearchParams(window.location.search);

const firstName = myInfo.get("first-name");
const lastName = myInfo.get("last-name");
const email = myInfo.get("email");
const phone = myInfo.get("phone");
const businessName = myInfo.get("business-name");
const timestamp = myInfo.get("timestamp");

const results = document.getElementById("thankyou-results");

results.innerHTML = `
  <h2>Application Details</h2>
  <p><strong>First Name:</strong> ${firstName}</p>
  <p><strong>Last Name:</strong> ${lastName}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Mobile Phone:</strong> ${phone}</p>
  <p><strong>Business Name:</strong> ${businessName}</p>
  <p><strong>Submitted:</strong> ${timestamp}</p>
`;
