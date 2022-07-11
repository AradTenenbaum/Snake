import { distance } from "../utils/helpers.js";
import { outsideGrid } from '../game/grid.js';

let reward = 0;

export function setReward(value) {
  reward = value;
  console.log(reward);
}

export function calculateReward(direction, food, head) {
  const headAfterDirection = {
    x: (head.x + direction.x),
    y: (head.y + direction.y),
  };
  // Danger rewards
  if (outsideGrid(headAfterDirection)) {
    return -100
  }
  // Food rewards
  if (
    distance(headAfterDirection, food) === 0
  ) {
    return 10
  }
  else if (distance(head, food) > distance(headAfterDirection, food)
  ) {
    return 1
  }
  else {
    return -1
  }
}
