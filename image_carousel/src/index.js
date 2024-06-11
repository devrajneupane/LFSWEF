var carousel = document.getElementsByClassName("carousel")[0];
var leftButton = document.getElementsByClassName("leftbtn")[0];
var rightButton = document.getElementsByClassName("rightbtn")[0];
var indicators = document.getElementsByClassName("indicator");
var span = 600;
var prev = 0;
var currentIndex = 0;
/**
 * Removes the active class from indicator
 */
var clearActive = function () {
    for (var i = 0; i < indicators.length; i++) {
        indicators[i].classList.remove("active");
    }
};
/**
 * Moves between images with animation
 */
var executeMove = function (index) {
    var mov = index * span;
    carousel.animate([
        { transform: "translateX(-" + prev + "px)" },
        { transform: "translateX(-" + mov + "px)" },
    ], { duration: 500 });
    // @ts-ignore
    carousel.style.transform = "translateX(-" + mov + "px)";
    prev = mov;
};
/**
 * Moves between images in given direction
 */
var moveSlide = function (dir) {
    if (dir === "left") {
        currentIndex--;
    }
    else {
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
    interval = setInterval(function () {
        rightButton === null || rightButton === void 0 ? void 0 : rightButton.click();
    }, 3000);
};
var _loop_1 = function (i) {
    indicators[i].addEventListener("click", function () {
        clearActive();
        executeMove(i);
        indicators[i].classList.add("active");
    });
};
/**
 * Add Event listeners to indicators
 */
for (var i = 0; i < indicators.length; i++) {
    _loop_1(i);
}
leftButton.addEventListener("click", function () {
    clearActive();
    moveSlide("left");
});
var interval = setInterval(function () {
    rightButton === null || rightButton === void 0 ? void 0 : rightButton.click();
}, 3000);
rightButton.addEventListener("click", function () {
    clearActive();
    moveSlide("right");
});
