import { getRandomNumber, getRandomColor, calculateDistance } from "./utils.js";
import { SPEED } from "./constant.js";

export default class Ball {
  /**
   * @param {number} x X cordinates of ball
   * @param {number} y Y cordinates of ball
   * @param {number} radius Radius of ball
   */
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.dx = getRandomNumber(-1, 1);
    this.dy = getRandomNumber(-1, 1);
    this.color = getRandomColor();
    this.radius = radius;
    this.diameter = radius * 2;
    this.speed = SPEED;

    this.ball = document.createElement("div");
    this.ball.classList.add("ball");
    this.ball.style.width = this.diameter + "px";
    this.ball.style.height = this.diameter + "px";
    this.ball.style.background = this.color;
    this.ball.style.position = "absolute";
    this.ball.style.borderRadius = "50%";
    this.ball.style.border = "solid 1px red";
  }

  /**
   * Move ball with given speed
   */
  // moveBall = (delta) => {
  moveBall = () => {
    // this.x += (this.dx * this.speed * delta) / 10;
    // this.y += (this.dy * this.speed * delta) / 10;
    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;
    this.ball.style.transform = `translate(${this.x}px, ${this.y}px)`;
  };

  /**
   * Get the DOM element representing the current ball
   *
   * @returns HTMLDivElement
   */
  getBallElement = () => this.ball;

  /**
   * Check collision with wall and bounce back if collided
   *
   * @param {number} rectLeft Left position of rectangular container
   * @param {number} rectTop Top position of rectangular container
   * @param {number} rectRight Right position of rectangular container
   * @param {number} rectBottom Bottom position of rectangular container
   */
  checkWallCollision = (rectLeft, rectTop, rectRight, rectBottom) => {
    // Check for collision in x direction
    if (this.x < rectLeft || this.x + this.diameter > rectRight) {
      this.dx *= -1;
      this.x = this.x <= rectLeft ? rectLeft : rectRight - this.diameter;
    }
    // Check for collision in y direction
    if (this.y < rectTop || this.y + this.diameter > rectBottom) {
      this.dy *= -1;
      this.y = this.y <= rectTop ? rectTop : rectBottom - this.diameter;
    }
  };

  /**
   * Checks collision between two balls and change direction and speed accordingly.
   *
   * @param {Ball} ball Ball object
   */
  checkBallCollision = (ball) => {
    const distance = calculateDistance(this.x, this.y, ball.x, ball.y);
    const sumOfRadii = this.radius + ball.radius;

    if (distance < sumOfRadii) {
      // Calculate unit vector between two balls
      const nVecX = (ball.x - this.x) / distance;
      const nVecY = (ball.y - this.y) / distance;

      // Calculate the relative velocity vector
      const rVecX = this.dx - ball.dx;
      const rVecY = this.dy - ball.dy;

      // Calculate the speed at which the balls are approaching each other
      const speed = rVecX * nVecX + rVecY * nVecY;

      // Don't update anything if balls are moving away from each other
      if (speed < 0) return;

      // Add impulse and momentum to simulate collision
      // by assuming mass of ball is directly proportional to its radius
      const impulse = (2 * speed) / sumOfRadii;
      this.dx -= impulse * ball.radius * nVecX;
      this.dy -= impulse * ball.radius * nVecY;
      ball.dx += impulse * this.radius * nVecX;
      ball.dy += impulse * this.radius * nVecY;
    }
  };
}
