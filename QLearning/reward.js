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
  // Food rewards
  if (
    distance(headAfterDirection, food) === 0
  ) {
    console.log("reward +10");
  }
  else if (distance(head, food) > distance(headAfterDirection, food)
  ) {
    console.log("reward +1");
  }
  else {
    console.log("reward -1");
  }

  // Danger rewards
  if (outsideGrid(headAfterDirection)) {
    console.log("reward -100");
  }
}
