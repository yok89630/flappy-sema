let gameScreen;
let screenHeight = window.innerHeight;
let screenWidth = window.innerWidth;
let context;

let birdWidth = screenHeight / 10;
let birdHeight = (birdWidth * 10) / 7;
let birdX = screenWidth / 7;
let birdY = screenHeight / 3;
let birdImg;
let bird = {
  x: birdX,
  y: birdY,
  width: birdWidth,
  height: birdHeight,
};

let pipeArray = [];
let pipeWidth = birdWidth * 1.5;
let pipeHeight = pipeWidth * 4;
let pipeX = screenWidth;
let pipeY = 0;
let topPipeImg;
let bottomPipeImg;

let velocityX = -4;
let velocityY = 0;
let gravity = 0.4;
let gameOver = false;
let score = 0;

window.onload = function () {
  board = document.getElementById("board");
  board.height = screenHeight;
  board.width = screenWidth;
  context = board.getContext("2d");

  birdImg = new Image();
  birdImg.src = "./sema2.png";
  birdImg.onload = function () {
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
  };

  topPipeImg = new Image();
  topPipeImg.src = "./hedi-ters.png";

  bottomPipeImg = new Image();
  bottomPipeImg.src = "./hedi-duz.png";

  window.addEventListener("keypress", startGame);
  window.addEventListener("click", startGame);
};

const startGame = (e) => {
  if (e.which == 13 || e.wh,ch == 254) {
    requestAnimationFrame(update);
    setInterval(placePipes, 1750);
    document.addEventListener("click", moveBird);
  }
};

const update = () => {
  requestAnimationFrame(update);
  if (gameOver) {
    context.fillStyle = "red";
    context.font = `${birdHeight / 4}px sans-serif`;
    context.fillText(`Game Over!`, screenWidth / 4, screenHeight / 2);
    context.fillText(` Your Score: ${score}`, screenWidth / 4, screenHeight / 2 + birdHeight / 4);
    return;
  }
  context.clearRect(0, 0, screenWidth, screenHeight);

  velocityY += gravity;
  bird.y = Math.max(bird.y + velocityY, 0);
  context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

  if (bird.y > board.height) {
    gameOver = true;
  }

  pipeArray.forEach((item) => {
    item.x += velocityX;
    context.drawImage(item.img, item.x, item.y, item.width, item.height);
    if (!item.passed && bird.x > item.x + item.width) {
      score += 0.5;
      item.passed = true;
    }
    if (detectCollision(bird, item)) {
      gameOver = true;
    }
  });

  while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
    pipeArray.shift();
  }

  context.fillStyle = "white";
  context.font = "45px sans-serif";
  context.fillText(score, 4, 45);
};

const placePipes = () => {
  if (gameOver) {
    return;
  }

  let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
  let openingSpace = screenHeight / 3;
  let topPipe = {
    img: topPipeImg,
    x: pipeX,
    y: randomPipeY,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };
  pipeArray.push(topPipe);

  let bottomPipe = {
    img: bottomPipeImg,
    x: pipeX,
    y: randomPipeY + pipeHeight + openingSpace,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };
  pipeArray.push(bottomPipe);
};

const moveBird = () => {
  velocityY = -6;
  if (gameOver) {
    bird.y = birdY;
    pipeArray = [];
    score = 0;
    gameOver = false;
  }
};

const detectCollision = (a, b) => {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
};
