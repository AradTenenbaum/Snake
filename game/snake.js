import { getInputDirection } from "./input.js";
import { DIRECTIONS_ARRAY } from "../utils/constant.js";
import { explore } from "../QLearning/index.js";

export const SNAKE_SPEED = 1;
let snakeBody = [{ x: 11, y: 11 }];
let newSegments = 0;
let currentDirection = { x: 0, y: 0 };

export function update() {
  addSegments();

  // Key input
  // const direction = getInputDirection();
  // Random direction
  const direction = explore(currentDirection);
  currentDirection = direction;

  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }
  snakeBody[0].x += direction.x;
  snakeBody[0].y += direction.y;

}

export function draw(gameBoard) {
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });
}

export function init() {
  snakeBody = [{ x: 11, y: 11 }];
}

export function expandSnake(amount) {
  newSegments += amount;
}

export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPositions(segment, position);
  });
}

export function getSnakeHead() {
  return snakeBody[0];
}

export function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true });
}

function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }

  newSegments = 0;
}


