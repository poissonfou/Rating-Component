const form = document.getElementById("card-form");
const cardContentForm = document.getElementById("content-submittion");
const cardContentSubmitted = document.getElementById("content-submitted");
const ratingDisplay = document.getElementById("rating-selected");
const checkboxes = document.getElementsByClassName("card__rating");
const checkboxesContainer = document.getElementById("checkbox-container");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const rating = document.querySelector('.card__ratings [aria-checked="true"]');
  cardContentForm.classList.add("card__content__form--submitted");
  cardContentSubmitted.classList.remove(
    "card__content__submitted--unsubmitted"
  );
  ratingDisplay.textContent = `You selected ${rating.textContent} out of 5`;
});

function selectedCheckbox(checkbox) {
  if (checkbox.getAttribute("aria-checked") == "false") {
    const previousRating = document.querySelector(
      '.card__ratings [aria-checked="true"]'
    );

    if (previousRating) {
      previousRating.setAttribute("aria-checked", false);
      previousRating.classList.remove("card__rating--selected");
    }

    checkbox.setAttribute("aria-checked", true);
    checkbox.classList.add("card__rating--selected");
  } else {
    checkbox.setAttribute("aria-checked", false);
    checkbox.classList.remove("card__rating--selected");
  }
}

for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener("click", () =>
    selectedCheckbox(checkboxes[i])
  );
}

let i = 0;
checkboxesContainer.addEventListener("keydown", (e) => {
  const keydownLeft = 37;
  const keydownRight = 39;
  const space = 32;

  if (keydownLeft === e.keyCode || keydownRight === e.keyCode) {
    checkboxes[i].setAttribute("tabindex", -1);

    if (e.keyCode === keydownRight) {
      i++;
      if (i >= checkboxes.length) i = 0;
    } else {
      i--;
      if (i < 0) i = checkboxes.length - 1;
    }

    checkboxes[i].setAttribute("tabindex", 0);
    checkboxes[i].focus();
  }

  if (space == e.keyCode) selectedCheckbox(checkboxes[i]);
});
