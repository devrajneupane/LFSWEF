// TODO: right click to delete balls
// TODO: click/keyboard handler to increase/decrase ball speed

import { getRandomNumber } from "./utils.js";
import Ball from "./ball.js";

const BALL_COUNT = 100;
const SPEED = 5;
const BALL_MIN_RADIUS = 10;
const BALL_MAX_RADIUS = 20;

/**
 * @type {Array.<Ball>} - Array of Ball objects
 */
const balls = [];

// Create rectangular container and add some attributes to it
const container = document.createElement("div");
container.classList.add("container");
container.style.width = "90vw";
container.style.height = "80vh";
container.style.outline = "1px solid black";
container.style.backgroundColor = "transparent";
container.style.margin = "auto";

// Add the container to DOM and hide overflow
document.body.appendChild(container);
document.body.style.overflow = "hidden";

// Get the bounding rectangle of the container
const rect = container.getBoundingClientRect();

// Add balls to the container and balls Array
for (let i = 0; i < BALL_COUNT; i++) {
  const radius = getRandomNumber(BALL_MIN_RADIUS, BALL_MAX_RADIUS);
  const diameter = radius * 2;
  const x = getRandomNumber(rect.left + diameter, rect.right - diameter);
  const y = getRandomNumber(rect.top + diameter, rect.bottom - diameter);
  const ball = new Ball(x, y, radius, SPEED);
  container.appendChild(ball.getBallElement()); // Add ball to container
  balls.push(ball);
}

// Show current ball count and info message
const ballCountElement = document.createElement("p");
ballCountElement.innerHTML = `Total balls: ${balls.length}`;
ballCountElement.style.marginTop = "50px";
document.body.append(ballCountElement);

const infoElement = document.createElement("p");
infoElement.innerHTML = "Click inside container to add more balls";
document.body.append(infoElement);

function animate() {
  const ballCount = balls.length;

  // NOTE: Not using forEach to reduce overhead for higher `ballCount`
  for (let i = 0; i < ballCount; i++) {
    const ball = balls[i];
    ball.moveBall();

    for (let j = i + 1; j < ballCount; j++) {
      let otherBall = balls[j];
      ball.checkBallCollision(otherBall);
    }

    ball.checkWallCollision(rect.left, rect.top, rect.right, rect.bottom);
  }

  requestAnimationFrame(animate);
}

animate();

// Add more balls to the container on click event
// FIX: New balls seem to overlap with each other until they collide with other ball
container.addEventListener("click", (e) => {
  for (let i = 0; i < 5; i++) {
    const radius = getRandomNumber(BALL_MIN_RADIUS, BALL_MAX_RADIUS);
    const ball = new Ball(e.x, e.y, radius, SPEED);
    ball.moveBall();
    container.appendChild(ball.getBallElement());
    balls.push(ball);
  }
  ballCountElement.innerHTML = `Total balls: ${balls.length}`;
});
