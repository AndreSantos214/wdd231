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

// WEATHER API INTEGRATION
const apiKey = "e523c98eeba74a3a75a2fd91d90abfdf";
const lat = "38.7546";
const lon = "-9.2734";
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
let weatherDataGlobal = null; //Stores the object we get from the API
let isCelsius = false;

// Async Function to Fetch Data
async function fetchWeather() {
  try {
    // Send the request to the API and wait for the network response
    const response = await fetch(weatherUrl);

    //Check if the server responded successfully
    if (response.ok === false) {
      console.warn(
        "Server responded, but there was a problem with the request",
      );
      return;
    }

    // Extract and convert the raw response data into a readable JSON object
    const weatherData = await response.json();

    // Save the fresh data into our global variable to use it later
    weatherDataGlobal = weatherData;

    displayWeather();
  } catch (error) {
    console.error(
      "Critical error while communicating with the Weather API:",
      error,
    );
  }
}

// Converts and formats temperature text
function formatTemp(fahrenheitTemp, toCelsius) {
  let finalTemp = fahrenheitTemp;

  if (toCelsius === true) {
    finalTemp = ((fahrenheitTemp - 32) * 5) / 9;
    return `${Math.round(finalTemp)}&deg;C`;
  }

  return `${Math.round(finalTemp)}&deg;F`;
}

// Main function to REnder Weather on Screen
function displayWeather() {
  // If there is no data, exit immediately
  if (weatherDataGlobal === null) {
    return;
  }

  const current = weatherDataGlobal.list[0];

  document.getElementById("weather-location").textContent =
    weatherDataGlobal.city.name;
  document.getElementById("weather-desc").textContent =
    current.weather[0].description;
  document.getElementById("weather-temp").innerHTML = formatTemp(
    current.main.temp,
    isCelsius,
  );

  const iconImage = document.getElementById("weather-icon");
  iconImage.src = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
  iconImage.alt = current.weather[0].description;

  // 3-day forecast tracking
  const forecastContainer = document.getElementById("forecast-container");
  forecastContainer.innerHTML = "";

  // Filter to keep only midday data, then grab the first 3 days
  const dailyData = weatherDataGlobal.list.filter((item) =>
    item.dt_txt.includes("12:00:00"),
  );
  const nextThreeDays = dailyData.slice(0, 3);

  // Loop through the 3 days
  nextThreeDays.forEach((day) => {
    // Convert date string into a readable weekday name
    const dateObj = new Date(day.dt_txt);
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });

    // Format the temperature for this specific forecast day
    const tempDisplay = formatTemp(day.main.temp, isCelsius);

    const forecastRow = document.createElement("div");
    forecastRow.classList.add("forecast-row");

    forecastRow.innerHTML = `
      <span class="forecast-day">${dayName}:</span>
      <span class="forecast-temp">${tempDisplay}</span>
    `;

    forecastContainer.appendChild(forecastRow);
  });
}

// Get the toggle button element from the HTML DOM
const toggleUnitsBtn = document.getElementById("toggle-units-btn");

// Listen for a click event on the button
toggleUnitsBtn.addEventListener("click", function () {
  isCelsius = !isCelsius;

  if (isCelsius === true) {
    toggleUnitsBtn.innerHTML = "Convert to &deg;F";
  } else {
    toggleUnitsBtn.innerHTML = "Convert to &deg;C";
  }
  displayWeather();
});

// COMPANY SPOTLIGHT ADVERTISEMENTS
const membersUrl = "data/members.json";

// Asynchronously fetches company members from the local JSON file.
async function fetchSpotlights() {
  try {
    // Request the local JSON file
    const response = await fetch(membersUrl);

    // Safety check
    if (response.ok === false) {
      console.warn("Could not find or load the members.json file");
      return;
    }

    // Turn the raw file text into a usable JavaScript array of objects
    const members = await response.json();

    displaySpotlights(members);
  } catch (error) {
    console.error("Critical error while fetching company spotlights:", error);
  }
}

// Renders 3 random premium members (Gold/Silver) onto the webpage.
function displaySpotlights(members) {
  const spotlightContainer = document.getElementById("spotlight-container");
  spotlightContainer.innerHTML = "";

  // Filter only Gold (3) and Silver (2) members
  const premiumMembers = members.filter((member) => {
    return member.membershipLevel === 3 || member.membershipLevel === 2;
  });

  // Shuffle array randomly
  const shuffledMembers = premiumMembers.sort(() => 0.5 - Math.random());

  // Take only the first 3 members from the shuffled result
  const selectedMembers = shuffledMembers.slice(0, 3);

  selectedMembers.forEach((member) => {
    let card = document.createElement("section");
    card.classList.add("member-card");

    let logo = document.createElement("img");
    logo.setAttribute("src", `images/${member.image}`);
    logo.setAttribute("alt", `${member.name} Logo`);
    logo.setAttribute("loading", "lazy");
    logo.setAttribute("width", "120");
    logo.setAttribute("height", "120");

    let name = document.createElement("h2");
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
      <span class="member-badge ${levelClass}">${levelText}</span>
    `;

    card.appendChild(logo);
    card.appendChild(name);
    card.appendChild(tagline);
    card.appendChild(info);

    spotlightContainer.appendChild(card);
  });
}

fetchWeather();
fetchSpotlights();
