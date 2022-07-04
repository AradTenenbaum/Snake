import { getSnakeHead } from "../game/snake.js";
import { DIRECTIONS_ARRAY, NEUTRAL } from "../utils/constant.js";
import { calculateReward } from "./reward.js";
import { getFood } from "./state.js";

console.log("index")

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
  let choosenDir = DIRECTIONS_ARRAY[randomDir];
  // Check if oposite direction
  if (
    (choosenDir.x === (currentDirection.x * -1) ||
    choosenDir.y === (currentDirection.y * -1)) &&
    (currentDirection.x != 0 ||
    currentDirection.y != 0)
  ) {
    choosenDir = currentDirection;
  }
  calculateReward(
    choosenDir,
    getFood(),
    getSnakeHead()
  );
  return choosenDir;
}
