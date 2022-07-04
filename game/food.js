import { setFood } from '../QLearning/state.js';
import { randomGridPosition } from './grid.js';
import {onSnake, expandSnake} from './snake.js';

console.log("food");

let food = getRandomFoodPosition();
const EXPANTION_RATE = 1;

export function update() {
    if(onSnake(food)) {
        expandSnake(EXPANTION_RATE);
        food = getRandomFoodPosition();
    }
}

export function draw(gameBoard) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

export function init() {
    food = getRandomFoodPosition();
}

function getRandomFoodPosition() {
    let newFoodPosition = randomGridPosition();
    while(onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition();
    }
    setFood(newFoodPosition);
    return newFoodPosition;
}
