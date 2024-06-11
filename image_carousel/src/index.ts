const carousel = document.getElementsByClassName("carousel")[0];
const leftButton = document.getElementsByClassName("leftbtn")[0];
const rightButton = document.getElementsByClassName(
  "rightbtn",
)[0] as HTMLButtonElement;
const indicators = document.getElementsByClassName("indicator");

const span = 600;
let prev = 0;
let currentIndex = 0;

/**
 * Removes the active class from indicator
 */
const clearActive = () => {
  for (let i = 0; i < indicators.length; i++) {
    indicators[i].classList.remove("active");
  }
};

/**
 * Moves between images with animation
 */
const executeMove = (index: number) => {
  let mov = index * span;
  carousel.animate(
    [
      { transform: "translateX(-" + prev + "px)" },
      { transform: "translateX(-" + mov + "px)" },
    ],
    { duration: 500 },
  );
  // @ts-ignore
  carousel.style.transform = "translateX(-" + mov + "px)";
  prev = mov;
};

/**
 * Moves between images in given direction
 */
const moveSlide = (dir: string) => {
  if (dir === "left") {
    currentIndex--;
  } else {
    currentIndex++;
  }
  if (currentIndex < 0) {
    currentIndex = indicators.length - 1;
  }
  if (currentIndex > indicators.length - 1) {
    currentIndex = 0;
  }

  executeMove(currentIndex);

  indicators[currentIndex].classList.add("active");
  clearInterval(interval);
  interval = setInterval(() => {
    rightButton?.click();
  }, 3000);
};

/**
 * Add Event listeners to indicators
 */
for (let i = 0; i < indicators.length; i++) {
  indicators[i].addEventListener("click", () => {
    clearActive();
    executeMove(i);
    indicators[i].classList.add("active");
  });
}

leftButton.addEventListener("click", () => {
  clearActive();
  moveSlide("left");
});

let interval: number = setInterval(() => {
  rightButton?.click();
}, 3000);

rightButton.addEventListener("click", () => {
  clearActive();
  moveSlide("right");
});
