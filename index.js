const globalVars = {
  foodTypes: [
    {
      type: "pasta",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt autem maxime animi. Laborum fugiat aut vel dolores ex ullam quaerat inventore accusamus explicabo pariatur. Unde ullam dolore exercitationem dicta nesciunt, distinctio numquam libero illo magnam?",
      image: "assets/images/pasta-sm-md.webp",
    },
    {
      type: "pizza",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita obcaecati nemo odit consequatur voluptatem atque, sit ab architecto inventore laudantium accusamus sed aperiam nisi. Reiciendis atque sed illo natus sunt suscipit maxime, officia sint architecto commodi iusto aperiam magni rerum?",
      image: "assets/images/pizza-sm-md.webp",
    },
    {
      type: "soups",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus dolorum impedit voluptate vero distinctio necessitatibus ipsa delectus quos! Aliquid, sunt molestias beatae iusto quaerat ipsa nesciunt quae asperiores odio possimus!",
      image: "assets/images/soup-sm-md.webp",
    },
    {
      type: "bread",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed impedit accusantium totam, voluptatum eius maiores ratione saepe explicabo vitae nam autem blanditiis dicta modi et culpa architecto quasi facilis placeat.",
      image: "assets/images/bread-sm-med.webp",
    },
    {
      type: "desserts",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus itaque amet molestias laborum, doloremque quae quas, perspiciatis id veritatis corporis voluptatem aut quaerat vitae possimus incidunt ad, tenetur exercitationem dolore? Ullam, necessitatibus. Iusto nemo saepe, labore quae architecto delectus esse.",
      image: "assets/images/desserts-sm-med.webp",
    },
  ],
};

window.addEventListener("DOMContentLoaded", () => {
  globalVars.hamburger = document.querySelector(".hamburger");
  globalVars.btnCloseNav = document.querySelector(".close-btn");
  globalVars.switcherButtons = document.querySelectorAll(".switcher-button");
  globalVars.navList = document.querySelector(".main-nav ul");
  globalVars.foodSection = document.querySelector(".our-food");
  globalVars.foodTypeHeader = document.querySelector(".food-type");
  globalVars.foodDesc = document.querySelector(".food-desc");
  globalVars.navLinks = document.querySelectorAll(".nav-link a");
  globalVars.btnNextFood = document.querySelector(".next-food");
  globalVars.btnPrevFood = document.querySelector(".prev-food");
  globalVars.dateField = document.querySelector("#date");
  globalVars.timeSelect = document.querySelector("#reservation-time");
  globalVars.bookingBtn = document.querySelector("#btn-book");
  globalVars.nameField = document.querySelector("#name");

  // If javascript isn't disabled, remove classes from all
  // elements that were styled for that case
  document.querySelectorAll(".no-js").forEach((elem) => {
    elem.classList.remove("no-js");
  });

  // Initial setup for food switcher buttons
  globalVars.btnNextFood.setAttribute("data-next-index", 1);
  globalVars.btnPrevFood.setAttribute(
    "data-next-index",
    globalVars.foodTypes.length - 1
  );

  // Display/hide mobile nav when clicking hamburger
  globalVars.hamburger.addEventListener("click", function () {
    toggleMenu();
  });

  globalVars.btnCloseNav.addEventListener("click", function () {
    toggleMenu();
  });

  // Functionality for the food-type switcher buttons on mobile
  globalVars.switcherButtons.forEach((button) => {
    button.addEventListener("click", function () {
      globalVars.switcherButtons.forEach((button) => {
        button.classList.remove("active");
      });

      this.classList.add("active");
      const foodIndex = parseInt(this.getAttribute("data-food-index"));
      globalVars.foodTypeHeader.innerText =
        globalVars.foodTypes[foodIndex].type;
      globalVars.foodDesc.innerText = globalVars.foodTypes[foodIndex].desc;
      globalVars.foodSection.style.backgroundImage = `url('${globalVars.foodTypes[foodIndex].image}')`;

      // Also update the next/previous
      globalVars.btnPrevFood.setAttribute(
        "data-next-index",
        getFoodIndex(foodIndex, "prev")
      );
      globalVars.btnNextFood.setAttribute(
        "data-next-index",
        getFoodIndex(foodIndex, "next")
      );
    });
  });

  // Functionality for food switcher chevrons on tablet and larger
  globalVars.btnNextFood.addEventListener("click", function () {
    const currentIndex = parseInt(this.getAttribute("data-next-index"));
    let nextIndex = getFoodIndex(currentIndex, "next");
    displayFoodType(this.getAttribute("data-next-index"), this, nextIndex);
    if (nextIndex - 1 < 0) {
      nextIndex = globalVars.foodTypes.length;
    }
    globalVars.btnPrevFood.setAttribute(
      "data-next-index",
      getFoodIndex(nextIndex - 1, "prev")
    );

    setActiveSwitcherBtn(nextIndex - 1);
  });

  globalVars.btnPrevFood.addEventListener("click", function () {
    const currentIndex = parseInt(this.getAttribute("data-next-index"));
    let nextIndex = getFoodIndex(currentIndex, "prev");
    displayFoodType(this.getAttribute("data-next-index"), this, nextIndex);
    if (nextIndex + 1 >= globalVars.foodTypes.length) {
      nextIndex = 0;
    }
    globalVars.btnNextFood.setAttribute(
      "data-next-index",
      getFoodIndex(nextIndex + 1, "next")
    );

    setActiveSwitcherBtn(nextIndex + 1);
  });

  // Close nav menu when clicking on links
  globalVars.navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      toggleMenu();
    });
  });

  initializeForm();

  // Set up reservation time select options
  populateDateField();
  populateReservationTimes();

  globalVars.dateField.addEventListener("change", () => {
    populateReservationTimes();
  });

  // Validate the reservation form
  globalVars.bookingBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (isFormValid()) {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      document.querySelector("body").style.overflow = "hidden";
      const modal = document.querySelector(".modal");
      const nameSpan = document.querySelector("#customer-name");
      const guestField = document.querySelector("#guest-count");
      const guestSpan = document.querySelector("#num-guests");
      const dateSpan = document.querySelector("#reservation-date");
      const timeSpan = document.querySelector("#reserve-time");
      const closeButton = document.querySelector("#btn-modal-close");

      nameSpan.innerText = globalVars.nameField.value.trim().split(" ")[0];
      guestSpan.innerText = guestField.value;
      const dateString = globalVars.dateField.value.split("-");
      let dateMonth = months[parseInt(dateString[1]) - 1];
      dateSpan.innerText =
        dateMonth + " " + dateString[2] + ", " + dateString[0];
      timeSpan.innerText =
        document.querySelector("#reservation-time").value + "PM";

      modal.classList.add("active");

      closeButton.addEventListener("click", () => {
        modal.classList.remove("active");
        document.querySelector("body").style.overflow = "initial";

        // Reset all booking fields to initial values
        document.querySelector("#tel").value = "";
        globalVars.nameField.value = "";
        populateDateField();
        populateReservationTimes();
        guestField.value = 2;
      });
    }
  });
});

function initializeForm() {
  const inputFields = document.querySelectorAll("input");

  inputFields.forEach((field) => {
    field.addEventListener("blur", function () {
      this.classList.remove("invalid");
    });
  });
}

function populateDateField() {
  const today = new Date();
  today.setDate(today.getDate() + 2);
  globalVars.dateField.value = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate() < 10 ? "0" + today.getDate() : today.getDate()}`;
}

function toggleMenu() {
  const nav = document.querySelector(".main-nav");
  let navState = nav.getAttribute("aria-expanded") === "true";

  globalVars.hamburger.classList.toggle("menu-active");
  globalVars.navList.classList.toggle("menu-active");
  nav.setAttribute("aria-expanded", !navState);
}

function displayFoodType(index, btnClicked = null, nextIndex = null) {
  globalVars.foodTypeHeader.innerText = globalVars.foodTypes[index].type;
  globalVars.foodDesc.innerText = globalVars.foodTypes[index].desc;
  globalVars.foodSection.style.backgroundImage = `url('${globalVars.foodTypes[index].image}')`;

  if (btnClicked && nextIndex !== null) {
    btnClicked.setAttribute("data-next-index", nextIndex);
  }
}

function getFoodIndex(currIndex, nextOrPrev) {
  if (nextOrPrev === "next") {
    if (currIndex + 1 >= globalVars.foodTypes.length) {
      return 0;
    } else {
      return currIndex + 1;
    }
  } else {
    if (currIndex - 1 < 0) {
      return globalVars.foodTypes.length - 1;
    } else {
      return currIndex - 1;
    }
  }
}

function populateReservationTimes() {
  const today = new Date(globalVars.dateField.value);
  let openTime = 16;
  let closingTime = 22;

  switch (today.getDay()) {
    case 4:
    case 5: {
      closingTime = 24;
      break;
    }

    case 6: {
      openTime = 12;
      closingTime = 21;
      break;
    }
  }

  // Clear out existing time options
  globalVars.timeSelect.innerHTML = "";

  // Populate options
  for (let hour = openTime; hour < closingTime; hour++) {
    const time1 = document.createElement("option");
    const time2 = document.createElement("option");
    const adjustedHour = hour === 12 ? 12 : hour - 12;

    time1.value = `${adjustedHour}:00`;
    time1.innerText = `${adjustedHour}:00 PM`;

    time2.value = `${adjustedHour}:30`;
    time2.innerText = `${adjustedHour}:30 PM`;

    globalVars.timeSelect.appendChild(time1);
    if (hour < closingTime - 1) {
      globalVars.timeSelect.appendChild(time2);
    }
  }
}

function isFormValid() {
  const nameField = document.querySelector("#name");
  const phoneField = document.querySelector("#tel");
  const phoneValidationRegex = /^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

  if (nameField.value.trim().length < 2) {
    nameField.focus();
    nameField.classList.add("invalid");
    return;
  }

  if (!phoneValidationRegex.test(phoneField.value)) {
    phoneField.focus();
    phoneField.classList.add("invalid");
    return;
  }

  if (!isValidReservationDate()) {
    globalVars.dateField.focus();
    globalVars.dateField.classList.add("invalid");
    return;
  }

  return true;
}

function isValidReservationDate() {
  // Get date two days from today and reset the time to 00:00 for easier comparison
  let earliestValidDate = new Date();
  earliestValidDate.setDate(earliestValidDate.getDate() + 2);
  const dateMonth = earliestValidDate.getMonth() + 1;
  const dateDate = earliestValidDate.getDate();
  const dateYear = earliestValidDate.getFullYear();
  earliestValidDate = new Date(`${dateMonth}/${dateDate}/${dateYear}`);

  let reservationDate = globalVars.dateField.value.split("-");
  reservationDate = new Date(
    `${reservationDate[1]}/${reservationDate[2]}/${reservationDate[0]}`
  );
  return reservationDate >= earliestValidDate;
}

function setActiveSwitcherBtn(index) {
  globalVars.switcherButtons.forEach((btn) => {
    btn.classList.remove("active");
  });

  globalVars.switcherButtons[index].classList.add("active");
}
