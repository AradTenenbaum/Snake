import { getSnakeHead } from "../game/snake.js";
import { DIRECTIONS_ARRAY } from "../utils/constant.js";
import { calculateReward } from "./reward.js";

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

const epsilon = 0.9;

export function explore(currentDirection) {
  let randomDir = Math.floor(Math.random() * DIRECTIONS_ARRAY.length);
  while (DIRECTIONS_ARRAY[randomDir] === currentDirection) {
    randomDir = Math.floor(Math.random() * DIRECTIONS_ARRAY.length);
  }
  calculateReward(DIRECTIONS_ARRAY[randomDir], {x: 10, y: 10}, getSnakeHead());
  return DIRECTIONS_ARRAY[randomDir];
}