let canvas = document.getElementById("snake");
canvas.width = 700;
canvas.height = 700;
let context = canvas.getContext("2d");
let box = 44;
let snake = [];
let direction = "right";
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};
let createBG = () => {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, canvas.width, canvas.height);
};
let createSnake = () => {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
};
let drawFood = () => {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);
  document.addEventListener("keydown", update);
};
function update(event) {
  if (event.key === "a" && direction != "right") direction = "left";
  if (event.key === "w" && direction != "down") direction = "up";
  if (event.key === "d" && direction != "left") direction = "right";
  if (event.key === "s" && direction != "up") direction = "down";
}

let initGame = () => {
  if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
  if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

  for(i = 1 ; i < snake.length; i++){
    if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
      clearInterval(game);
      alert('Game Over :');
    }
  }
  createBG();
  createSnake();
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "up") snakeY -= box;
  if (direction == "down") snakeY += box;

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }
  let newHead = {
    x: snakeX,
    y: snakeY,
  };
  snake.unshift(newHead);
};
let game = setInterval(initGame, 100);
