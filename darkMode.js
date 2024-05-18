const inputSection = document.querySelector(".input-section");
const detailsSection = document.querySelector(".details-section");
const elementSelect = document.querySelector("select");

let darkMode = darkModeGet();

function iconMode(mode) {
  const elementIcon = document.querySelector(".mode");
  if (mode == "on") {
    elementIcon.classList.remove("fa-moon");
    elementIcon.classList.add("fa-sun");
  } else {
    elementIcon.classList.remove("fa-sun");
    elementIcon.classList.add("fa-moon");
  }
}

function darkModeReload() {
  if (darkMode == "on") {
    addClassDarkMode();
    iconMode("on");
  }
}
function darkModeToggel() {
  if (darkMode == "on") {
    darkMode = "off";
    localStorage.setItem("dark-mode", "off");
    removeClassDarkMode();
    iconMode("off");
    return;
  }
  if (darkMode == "off") {
    darkMode = "on";
    localStorage.setItem("dark-mode", "on");
    addClassDarkMode();
    iconMode("on");
    return;
  }
}
function addClassDarkMode() {
  elementSelect.classList.add("dark-mode");
  inputSection.classList.add("dark-mode");
  detailsSection.classList.add("dark-mode");
  document.body.classList.add("dark-mode");
  elememtIncomeList.classList.add("dark-mode");
  elementExpensesList.classList.add("dark-mode");
  descriptionElem.classList.add("dark-mode");
  valueElem.classList.add("dark-mode");
}
function removeClassDarkMode() {
  elementSelect.classList.remove("dark-mode");
  inputSection.classList.remove("dark-mode");
  detailsSection.classList.remove("dark-mode");
  document.body.classList.remove("dark-mode");
  elememtIncomeList.classList.remove("dark-mode");
  elementExpensesList.classList.remove("dark-mode");
  descriptionElem.classList.remove("dark-mode");
  valueElem.classList.remove("dark-mode");
}
