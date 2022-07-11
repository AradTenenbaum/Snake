import { getSnakeHead } from "../game/snake.js";
import { DIRECTIONS_ARRAY, NEUTRAL } from "../utils/constant.js";
import { calculateReward } from "./reward.js";
import { calcStateFromPosition, calcStateNum, getFood } from "./state.js";

// Q Matrix
const Q = Array.from(Array(Math.pow(2, 9)), () => new Array(4).fill(0));

// Epsilon - times to explore against exploit
const epsilon = 0.9;
const gamma = 0.8;
const learningRate = 0.7;

export function explore(currentDirection) {
  let dirNum = Math.floor(Math.random() * DIRECTIONS_ARRAY.length);
  let choosenDir = DIRECTIONS_ARRAY[dirNum];
  let snakeHead = getSnakeHead();
  // Check if oposite direction
  if (
    (choosenDir.x === currentDirection.x * -1 ||
      choosenDir.y === currentDirection.y * -1) &&
    (currentDirection.x != 0 || currentDirection.y != 0)
  ) {
    choosenDir = currentDirection;
  }
  const reward = calculateReward(choosenDir, getFood(), snakeHead);
  const stateNum = calcStateNum();
  const newStateNum = calcStateNum({direction: choosenDir});
  console.log(stateNum, newStateNum);
  // Bellman equation
  Q[stateNum][dirNum] = Q[stateNum][dirNum] * (1 - learningRate) + learningRate * (reward + gamma * Math.max(...Q[newStateNum]));
  // Q[stateNum, dirNum] = reward + gamma * Math.max(...Q[newStateNum]);
  console.log(Q);
  return choosenDir;
}
