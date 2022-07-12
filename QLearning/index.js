import { getSnakeHead } from "../game/snake.js";
import { DIRECTIONS_ARRAY, NEUTRAL } from "../utils/constant.js";
import { calculateReward } from "./reward.js";
import { calcStateFromPosition, calcStateNum, getEpisode, getFood } from "./state.js";

// Q Matrix
const Q = Array.from(Array(Math.pow(2, 9)), () => new Array(4).fill(0));

// Epsilon - times to explore against exploit
let epsilon = 0.9;
let explorationDecayRate  = 0.001;
let maxExplorationRate = 1
let minExplorationRate = 0.001
const gamma = 0.8;
const learningRate = 0.7;

export function makeMove(currentDirection) {
  let explorationRateThreshold = Math.random();
  console.log(epsilon);
  const episode = getEpisode();
  if(explorationRateThreshold > epsilon) {
    // Exploration rate decay
    epsilon = minExplorationRate + (maxExplorationRate - minExplorationRate) * Math.exp(-explorationDecayRate*episode);
    return exploit(currentDirection);
  }
  else {
    // Exploration rate decay
    epsilon = minExplorationRate + (maxExplorationRate - minExplorationRate) * Math.exp(-explorationDecayRate*episode);
    return explore(currentDirection);
  }
}

export function explore(currentDirection) {
  console.log("Random move");
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
  const newStateNum = calcStateNum({ direction: choosenDir });
  // Bellman equation
  Q[stateNum][dirNum] =
    Q[stateNum][dirNum] * (1 - learningRate) +
    learningRate * (reward + gamma * Math.max(...Q[newStateNum]));
  return choosenDir;
}

export function exploit(currentDirection) {
  let snakeHead = getSnakeHead();
  const stateNum = calcStateNum();
  let bestDirValue = Math.max(...Q[stateNum]);
  let bestDirIndex = Q[stateNum].indexOf(bestDirValue);
  let choosenDir = DIRECTIONS_ARRAY[bestDirIndex];
  // can't choose negative directions
  if (
    (choosenDir.x === currentDirection.x * -1 ||
      choosenDir.y === currentDirection.y * -1) &&
    (currentDirection.x != 0 || currentDirection.y != 0)
  ) {
    // Pick the best direction without the negative
    bestDirValue = Math.max(
      ...Q[stateNum].filter(
        (dir, index) => index !== bestDirIndex
      )
    );
    bestDirIndex = Q[stateNum].indexOf(bestDirValue);
    choosenDir = DIRECTIONS_ARRAY[bestDirIndex];
  }
  // Reward
  const reward = calculateReward(choosenDir, getFood(), snakeHead);
  // New State
  const newStateNum = calcStateNum({ direction: choosenDir });
  // Bellman equation
  Q[stateNum][bestDirIndex] =
    Q[stateNum][bestDirIndex] * (1 - learningRate) +
    learningRate * (reward + gamma * Math.max(...Q[newStateNum]));
  return choosenDir;
}
