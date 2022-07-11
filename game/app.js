import {
  SNAKE_SPEED,
  update as updateSnake,
  draw as drawSnake,
  init as initSnake,
  getSnakeHead,
  snakeIntersection,
} from "./snake.js";
import { update as updateFood, draw as drawFood, init as initFood } from "./food.js";
import { outsideGrid } from "./grid.js";


let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById("game-board");

function main(currentTime) {
  if (gameOver) {
    // Manual restart
    // if (confirm("You lost. Press ok to restart")) {
    //   window.location = "/";
    // }
    // return;
    // Auto restart
    init();
  }

  window.requestAnimationFrame(main);

  const secondSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function init() {
  initSnake();
  initFood();
  gameOver = false;
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
