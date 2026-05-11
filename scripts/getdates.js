const currentYearElement = document.getElementById("currentyear");
const lastModifiedElement = document.getElementById("lastModified");

const today = new Date();
currentYearElement.innerHTML = today.getFullYear();

const lastModifiedDate = document.lastModified;
lastModifiedElement.innerHTML = `Last Modification: ${lastModifiedDate}`;