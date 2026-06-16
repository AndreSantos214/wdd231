const myInfo = new URLSearchParams(window.location.search);

const name = myInfo.get("name");
const email = myInfo.get("email");
const projectType = myInfo.get("project-type");
const message = myInfo.get("message");
const submittedDate = myInfo.get("submitted-date");

const results = document.getElementById("thanks-results");

results.innerHTML = `
  <h2>Message Details</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Project Type:</strong> ${projectType}</p>
  <p><strong>Message:</strong> ${message}</p>
  <p><strong>Submitted:</strong> ${submittedDate}</p>
`;
