import { TOTAL_COLOR_COMBINATIONS } from "./constant.js";

/**
 * Generates random number between min and max (inclusive) by exlcuding 0.
 *
 * @param {number} min Minimum number
 * @param {number} max Maximum number
 * @returns {number} A random number
 */
function getRandomNumber(min = 0, max = 0) {
  let num = 0;
  while (num === 0) {
    num = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return num;
}

/**
 * Generates a random hex color code.
 *
 * @returns {string} Hex color code
 */
function getRandomColor() {
  const colorCode = Math.floor(Math.random() * TOTAL_COLOR_COMBINATIONS);
  return "#" + colorCode.toString(16);
}

/**
 * Calculates the Euclidean distance between two points.
 *
 * @param {number} x1 X cordinates of point 1
 * @param {number} y1 Y cordinates of point 1
 * @param {number} x2 X cordinates of point 2
 * @param {number} y2 Y cordinates of point 2
 * @returns {number} Distance between two points
 */
function calculateDistance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

export { getRandomNumber, getRandomColor, calculateDistance };
