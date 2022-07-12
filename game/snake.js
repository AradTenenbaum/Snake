import { getInputDirection } from "./input.js";
import { DIRECTIONS_ARRAY } from "../utils/constant.js";
import { makeMove } from "../QLearning/index.js";
import { equalPositions } from "../utils/helpers.js";
import { calcState } from "../QLearning/state.js";

let snakeBody = [{ x: 11, y: 11 }];
export const SNAKE_SPEED = 200;
let newSegments = 0;
let currentDirection = { x: 0, y: 0 };

export function update() {
  // Calculate the state
  calcState();
  // Add segments if snake ate
  addSegments();
  // Key input
  // const direction = getInputDirection();
  // Random direction
  const direction = makeMove(currentDirection);
  currentDirection = direction;


  // Set body location
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

export function onSnakeAfterAction(position, snakeHead) {
  if(position === snakeHead) return true;
  return snakeBody.some((segment, index) => {
    if (index === (snakeBody.length - 1)) return false;
    return equalPositions(segment, position);
  });
}

export function getSnakeHead() {
  return snakeBody[0];
}

export function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true });
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }

  newSegments = 0;
}


