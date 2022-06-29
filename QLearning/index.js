import { getSnakeHead } from "../game/snake.js";
import { DIRECTIONS_ARRAY, NEUTRAL } from "../utils/constant.js";
import { calculateReward } from "./reward.js";

// Q Matrix
const Q = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

// Epsilon - times to explore against exploit
const epsilon = 0.9;

export function explore(currentDirection) {
  let randomDir = Math.floor(Math.random() * DIRECTIONS_ARRAY.length);
  // Check if oposite direction
  if (
    (DIRECTIONS_ARRAY[randomDir].x === (currentDirection.x * -1) ||
      DIRECTIONS_ARRAY[randomDir].y === (currentDirection.y * -1)) &&
    (currentDirection.x != 0 ||
    currentDirection.y != 0)
  ) {
    return currentDirection;
  }
  calculateReward(
    DIRECTIONS_ARRAY[randomDir],
    { x: 10, y: 10 },
    getSnakeHead()
  );
  return DIRECTIONS_ARRAY[randomDir];
}
