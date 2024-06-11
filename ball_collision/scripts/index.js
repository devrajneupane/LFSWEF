// TODO: right click to delete balls
// TODO: click/keyboard handler to increase/decrase ball speed

import {
  BALL_COUNT,
  BALL_MIN_RADIUS,
  BALL_MAX_RADIUS,
  MAX_BALL_COUNT,
  BALLS_PER_CLICK,
  FPS,
} from "./constants.js";
import { getRandomNumber } from "./utils.js";
import Ball from "./Ball.js";

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
  const ball = new Ball(x, y, radius);
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

let lastTimeStamp = Date.now();

function animate(currentTime) {
  const ballCount = balls.length;

  // Set framerate
  let delta = currentTime - lastTimeStamp;
  console.log(delta);
  if (delta > 1000 / FPS) return;
  lastTimeStamp = currentTime;

  // NOTE: Not using forEach to reduce overhead for higher `ballCount`
  for (let i = 0; i < ballCount; i++) {
    const ball = balls[i];
    ball.moveBall();
    for (let j = i + 1; j < ballCount; j++) {
      let otherBall = balls[j];
      ball.checkBallCollision(otherBall);
    }

    ball.checkWallCollision(
      0,
      0,
      rect.right - rect.left,
      rect.bottom - rect.top,
    );
  }

  // requestAnimationFrame(animate);
  setTimeout(animate, 1000 / 60);
}

animate();

// Add more balls to the container on click event
// FIX: New balls seem to overlap with each other until they collide with other ball
container.addEventListener("click", (e) => {
  console.log(e.x, e.y);
  if (MAX_BALL_COUNT - BALLS_PER_CLICK < balls.length) {
    ballCountElement.innerHTML = `Total balls: ${balls.length} max ball count reach`;
    return;
  }

  for (let i = 0; i < BALLS_PER_CLICK; i++) {
    const radius = getRandomNumber(BALL_MIN_RADIUS, BALL_MAX_RADIUS);
    const x = e.x - rect.x + getRandomNumber(-30, 30);
    const y = e.y - rect.y + getRandomNumber(-30, 30);
    const ball = new Ball(x, y, radius);
    console.log(ball);

    ball.moveBall();
    container.appendChild(ball.getBallElement());
    balls.push(ball);
  }
  ballCountElement.innerHTML = `Total balls: ${balls.length}`;
});
