
const snakeHead = document.getElementById("first");
const snakeBody = document.getElementsByClassName("box");

console.log(snakeBody);

for(square in snakeBody) {
  console.log(square);
}