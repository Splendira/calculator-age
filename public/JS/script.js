const form = document.querySelector("form");

form.addEventListener("submit", handleForm);

function handleForm(e) {
  e.preventDefault();

  // Récupérer les valeurs et les convertir en nombres
  const day = parseInt(document.querySelector(".dayInput").value);
  const month = parseInt(document.querySelector(".monthInput").value);
  const year = parseInt(document.querySelector(".yearInput").value);

  const actuallyYear = new Date();

  // Vérifier que les valeurs sont valides
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    errorMessageInput("Merci de remplir les champs correctement 😨");
    return;
  } else if (month < 1 || month > 12) {
    errorMessageInput("Merci de remplir un mois valide 📅");
    return;
  } else if (year < 0 || year > actuallyYear.getFullYear()) {
    errorMessageInput(`Merci de remplir une année valide ex: "${actuallyYear.getFullYear()}"`);
    return;
  } else if (day < 1 || day > daysInMonth(month, year)) {
    errorMessageInput("Merci de remplir un jour valide 🗓");
    return;
  } else {
    resultDate(day, month, year);
  }
}

function daysInMonth(month, year) {
  // Renvoie le nombre de jours dans un mois donné
  return new Date(year, month, 0).getDate();
}

function resultDate(day, month, year) {
  const spanResult = document.querySelectorAll("span");

  const birthDate = new Date(year, month - 1, day);
  const currentDate = new Date();

  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();
  let days = currentDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    days += daysInMonth(birthDate.getMonth() + 1, birthDate.getFullYear());
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // Calcul des jours totaux
  const daysSibling = Math.floor((currentDate - birthDate) / (24 * 60 * 60 * 1000));
  
  spanResult[0].textContent = years;
  spanResult[1].textContent = months;
  spanResult[2].textContent = days;
}

// ERROR MESSAGE FUNCTION
function errorMessageInput(message) {
  const errorContainerMessage = document.querySelector(".pop-up-container");
  const progressBar = document.querySelector(".container-progress-bar");

  progressBar.setAttribute("id", "play-animation");
  errorContainerMessage.textContent = message;

  errorContainerMessage.classList.add("error-message-pop-up-active");

  setTimeout(() => {
    errorContainerMessage.classList.remove("error-message-pop-up-active");
    progressBar.removeAttribute("id", "play-animation");
  }, 2500);
}
