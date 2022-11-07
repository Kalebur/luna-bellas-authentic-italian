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
  ],
};

window.addEventListener("DOMContentLoaded", () => {
  globalVars.hamburger = document.querySelector(".hamburger");
  globalVars.switcherButtons = document.querySelectorAll(".switcher-button");
  globalVars.navList = document.querySelector(".main-nav ul");
  globalVars.foodSection = document.querySelector(".our-food");
  globalVars.foodTypeHeader = document.querySelector(".food-type");
  globalVars.foodDesc = document.querySelector(".food-desc");
  globalVars.navLinks = document.querySelectorAll(".nav-link a");
  globalVars.btnNextFood = document.querySelector(".next-food");
  globalVars.btnPrevFood = document.querySelector(".prev-food");

  // If javascript isn't disabled, remove classes from all
  // elements that were styled for that case
  document.querySelectorAll(".no-js").forEach((elem) => {
    elem.classList.remove("no-js");
  });

  globalVars.btnNextFood.setAttribute("data-next-index", 1);
  globalVars.btnPrevFood.setAttribute(
    "data-next-index",
    globalVars.foodTypes.length - 1
  );

  // Display/hide mobile nav when clicking hamburger
  globalVars.hamburger.addEventListener("click", function () {
    toggleMenu();
  });

  // Functionality for the food-type switcher buttons on mobile
  globalVars.switcherButtons.forEach((button) => {
    button.addEventListener("click", function () {
      globalVars.switcherButtons.forEach((button) => {
        button.classList.remove("active");
      });

      this.classList.add("active");
      const foodIndex = this.getAttribute("data-food-index");
      globalVars.foodTypeHeader.innerText =
        globalVars.foodTypes[foodIndex].type;
      globalVars.foodDesc.innerText = globalVars.foodTypes[foodIndex].desc;
      globalVars.foodSection.style.backgroundImage = `url('${globalVars.foodTypes[foodIndex].image}')`;
    });
  });

  // Functionality for food switcher chevrons on tablet and larger
  globalVars.btnNextFood.addEventListener("click", function () {
    const currentIndex = parseInt(this.getAttribute("data-next-index"));
    const nextIndex = getFoodIndex(currentIndex, "next");
    displayFoodType(this.getAttribute("data-next-index"), this, nextIndex);
    globalVars.btnPrevFood.setAttribute(
      "data-next-index",
      getFoodIndex(nextIndex, "next")
    );
  });

  globalVars.btnPrevFood.addEventListener("click", function () {
    const currentIndex = parseInt(this.getAttribute("data-next-index"));
    const nextIndex = getFoodIndex(currentIndex, "prev");
    displayFoodType(this.getAttribute("data-next-index"), this, nextIndex);
    globalVars.btnNextFood.setAttribute(
      "data-next-index",
      getFoodIndex(nextIndex, "prev")
    );
  });

  // Close nav menu when clicking on links
  globalVars.navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      toggleMenu();
    });
  });
});

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
