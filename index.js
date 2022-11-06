const globalVars = {
  foodTypes: [
    {
      type: "pasta",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt autem maxime animi. Laborum fugiat aut vel dolores ex ullam quaerat inventore accusamus explicabo pariatur. Unde ullam dolore exercitationem dicta nesciunt, distinctio numquam libero illo magnam?",
    },
    {
      type: "pizza",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita obcaecati nemo odit consequatur voluptatem atque, sit ab architecto inventore laudantium accusamus sed aperiam nisi. Reiciendis atque sed illo natus sunt suscipit maxime, officia sint architecto commodi iusto aperiam magni rerum?",
    },
    {
      type: "soups",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus dolorum impedit voluptate vero distinctio necessitatibus ipsa delectus quos! Aliquid, sunt molestias beatae iusto quaerat ipsa nesciunt quae asperiores odio possimus!",
    },
  ],
};

window.addEventListener("DOMContentLoaded", () => {
  globalVars.hamburger = document.querySelector(".hamburger");
  globalVars.switcherButtons = document.querySelectorAll(".switcher-button");
  globalVars.navList = document.querySelector(".main-nav ul");
  globalVars.foodTypeHeader = document.querySelector(".food-type");
  globalVars.foodDesc = document.querySelector(".food-desc");

  // If javascript isn't disabled, remove classes from all
  // elements that were styled for that case
  document.querySelectorAll(".no-js").forEach((elem) => {
    elem.classList.remove("no-js");
  });

  // Display/hide mobile nav when clicking hamburger
  globalVars.hamburger.addEventListener("click", function () {
    const nav = document.querySelector(".main-nav");
    let navState = nav.getAttribute("aria-expanded") === "true";

    console.log(navState);
    this.classList.toggle("menu-active");
    globalVars.navList.classList.toggle("menu-active");
    nav.setAttribute("aria-expanded", !navState);
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
    });
  });
});
