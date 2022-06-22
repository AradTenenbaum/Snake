import {SNAKE_SPEED, update as updateSnake, draw as drawSnake} from './snake.js';


let lastRenderTime = 0;

function main(currentTime) {
  window.requestAnimationFrame(main);
  
  const secondSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if(secondSinceLastRender < (1 / SNAKE_SPEED)) return;

  console.log('render')

  lastRenderTime = currentTime;

  update();
  draw();
}


window.requestAnimationFrame(main);

function update() {
  updateSnake();
}

function draw () {
  drawSnake();
}