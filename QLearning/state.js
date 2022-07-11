import { GRID_SIZE } from "../game/grid.js";
import { getSnakeHead, onSnake, onSnakeAfterAction } from "../game/snake.js";

let food = { x: 1, y: 1 };

export function setFood(newPos) {
  food = newPos;
}

export function getFood() {
  return food;
}

const DANGER_UP = 0;
const DANGER_DOWN = 1;
const DANGER_RIGHT = 2;
const DANGER_LEFT = 3;
const FOOD_UP = 4;
const FOOD_DOWN = 5;
const FOOD_RIGHT = 6;
const FOOD_LEFT = 7;

const STATE_HELPER_ARR = [
  "DANGER_UP",
  "DANGER_DOWN",
  "DANGER_RIGHT",
  "DANGER_LEFT",
  "FOOD_UP",
  "FOOD_DOWN",
  "FOOD_RIGHT",
  "FOOD_LEFT"
];

function printState(tempState) {
  for(let i = 0; i < tempState.length; i++) {
    if(tempState[i] === 1) {
      console.log(STATE_HELPER_ARR[i]);
    }
  }
}

export let state = [0, 0, 0, 0, 0, 0, 0, 0];

export function calcStateFromPosition(pos) {
  let newState = [0, 0, 0, 0, 0, 0, 0, 0];
  // Danger check
  if (pos.x === 1) {
    newState[DANGER_LEFT] = 1;
  } else if (pos.x === GRID_SIZE) {
    newState[DANGER_RIGHT] = 1;
  }
  if (pos.y === 1) {
    newState[DANGER_UP] = 1;
  } else if (pos.y === GRID_SIZE) {
    newState[DANGER_DOWN] = 1;
  }
  if (onSnakeAfterAction({ ...pos, x: pos.x + 1 }, pos)) {
    newState[DANGER_RIGHT] = 1;
  }
  if (onSnakeAfterAction({ ...pos, x: pos.x - 1 }, pos)) {
    newState[DANGER_LEFT] = 1;
  }
  if (onSnakeAfterAction({ ...pos, y: pos.y + 1 }, pos)) {
    newState[DANGER_DOWN] = 1;
  }
  if (onSnakeAfterAction({ ...pos, y: pos.y - 1 }, pos)) {
    newState[DANGER_UP] = 1;
  }

  // Food check
  if (pos.x > food.x) {
    newState[FOOD_LEFT] = 1;
  } else if (pos.x < food.x) {
    newState[FOOD_RIGHT] = 1;
  }
  if (pos.y > food.y) {
    newState[FOOD_UP] = 1;
  } else if (pos.y < food.y) {
    newState[FOOD_DOWN] = 1;
  }
  return newState;
}

export function calcState() {
  // Init state
  state = [0, 0, 0, 0, 0, 0, 0, 0];
  const snakeHead = getSnakeHead();
  // Danger check
  if (snakeHead.x === 1) {
    state[DANGER_LEFT] = 1;
  } else if (snakeHead.x === GRID_SIZE) {
    state[DANGER_RIGHT] = 1;
  }
  if (snakeHead.y === 1) {
    state[DANGER_UP] = 1;
  } else if (snakeHead.y === GRID_SIZE) {
    state[DANGER_DOWN] = 1;
  }
  if (onSnake({ ...snakeHead, x: snakeHead.x + 1 })) {
    state[DANGER_RIGHT] = 1;
  }
  if (onSnake({ ...snakeHead, x: snakeHead.x - 1 })) {
    state[DANGER_LEFT] = 1;
  }
  if (onSnake({ ...snakeHead, y: snakeHead.y + 1 })) {
    state[DANGER_DOWN] = 1;
  }
  if (onSnake({ ...snakeHead, y: snakeHead.y - 1 })) {
    state[DANGER_UP] = 1;
  }

  // Food check
  if (snakeHead.x > food.x) {
    state[FOOD_LEFT] = 1;
  } else if (snakeHead.x < food.x) {
    state[FOOD_RIGHT] = 1;
  }
  if (snakeHead.y > food.y) {
    state[FOOD_UP] = 1;
  } else if (snakeHead.y < food.y) {
    state[FOOD_DOWN] = 1;
  }

}

export function calcStateNum({ direction } = {}) {
  let tempState = state;
  const snakeHead = getSnakeHead();
  if (direction) {
    tempState = calcStateFromPosition({
      x: snakeHead.x + direction.x,
      y: snakeHead.y + direction.y,
    });

  }
  let stateNum = 0;
  for (let i = 0; i < tempState.length; i++) {
    stateNum += Math.pow(2, (i + 1) * tempState[i]);
  }
  return stateNum;
}
