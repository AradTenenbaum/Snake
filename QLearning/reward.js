let reward = 0;

export function setReward(value) {
    reward = value;
    console.log(reward);
}

export function calculateReward(direction, food, head) {
    const headAfterDirection = {
      x: head.x + direction.x,
      y: (head.y + direction.y),
    };
    // Food rewards
    if (
      Math.abs(food.x - headAfterDirection.x) <
      Math.abs(food.x - head.x) ||
      Math.abs(food.y - headAfterDirection.y) <
      Math.abs(food.y - head.y)
    ) {
      console.log("reward +1");
    }
    else {
      console.log("reward -1");
    }
  }
  