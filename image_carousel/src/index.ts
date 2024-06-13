const carousel = document.querySelector(".carousel") as HTMLElement;
const leftButton = document.getElementById("leftbtn") as HTMLButtonElement;
const rightButton = document.getElementById("rightbtn") as HTMLButtonElement;
const imgLists = document.querySelectorAll(".slide") as NodeListOf<HTMLElement>;
const indicators = document.querySelectorAll(
  ".indicators div",
) as NodeListOf<HTMLElement>;

let currentIndex = 0;
const totalImages = imgLists.length - 1;

// Move to next image after given interval
let interval: number = setInterval(() => rightButton?.click(), 3000);

// Move between images
function executeMove() {
  carousel.style.left = -imgLists[currentIndex].offsetLeft + "px";

  let lastActive = document.querySelector("div.active") as HTMLDivElement;
  lastActive?.classList.remove("active");
  indicators[currentIndex].classList.add("active");

  // Reset interval
  clearInterval(interval);
  interval = setInterval(() => rightButton?.click(), 3000);
}

// Go to next image on clicking right button
rightButton?.addEventListener("click", () => {
  if (currentIndex < totalImages) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  executeMove();
});

// Go to next image on clicking left button
leftButton?.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = totalImages;
  }
  executeMove();
});

// Add Event listeners to indicators
indicators.forEach((element: HTMLElement, index: number) => {
  element.addEventListener("click", () => {
    currentIndex = index;
    executeMove();
  });
});
