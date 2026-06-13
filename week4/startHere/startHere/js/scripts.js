const results = document.getElementById("results");

const myInfo = new URLSearchParams(window.location.search);

const firstName = myInfo.get("first");
const lastName = myInfo.get("last");
const phone = myInfo.get("phone");
const email = myInfo.get("email");
const ordinance = myInfo.get("ordinance");
const date = myInfo.get("date");
const locationName = myInfo.get("location");

results.innerHTML = `
  <h2>Thank you, ${firstName} ${lastName}!</h2>
  <p>Your temple appointment has been scheduled.</p>

  <p><strong>First Name:</strong> ${firstName}</p>
  <p><strong>Last Name:</strong> ${lastName}</p>
  <p><strong>Phone:</strong> ${phone}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Ordinance:</strong> ${ordinance}</p>
  <p><strong>Date:</strong> ${date}</p>
  <p><strong>Location:</strong> ${locationName}</p>
`;
