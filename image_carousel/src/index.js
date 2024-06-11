var carousel = document.querySelector(".carousel");
var leftButton = document.getElementById("leftbtn");
var rightButton = document.getElementById("rightbtn");
var imgLists = document.querySelectorAll(".slide");
var indicators = document.querySelectorAll(".indicators div");
var currentIndex = 0;
var totalImages = imgLists.length - 1;
// Move to next image after given interval
var interval = setInterval(function () { return rightButton === null || rightButton === void 0 ? void 0 : rightButton.click(); }, 3000);
// Move between images
function executeMove() {
    carousel.style.left = -imgLists[currentIndex].offsetLeft + "px";
    var lastActive = document.querySelector("div.active");
    lastActive === null || lastActive === void 0 ? void 0 : lastActive.classList.remove("active");
    indicators[currentIndex].classList.add("active");
    // Reset interval
    clearInterval(interval);
    interval = setInterval(function () { return rightButton === null || rightButton === void 0 ? void 0 : rightButton.click(); }, 3000);
}
// Go to next image on clicking right button
rightButton === null || rightButton === void 0 ? void 0 : rightButton.addEventListener("click", function () {
    if (currentIndex < totalImages) {
        currentIndex++;
    }
    else {
        currentIndex = 0;
    }
    executeMove();
});
// Go to next image on clicking left button
leftButton === null || leftButton === void 0 ? void 0 : leftButton.addEventListener("click", function () {
    if (currentIndex > 0) {
        currentIndex--;
    }
    else {
        currentIndex = totalImages;
    }
    executeMove();
});
// Add Event listeners to indicators
indicators.forEach(function (element, index) {
    element.addEventListener("click", function () {
        currentIndex = index;
        executeMove();
    });
});
