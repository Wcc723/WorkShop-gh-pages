const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let gameInterval;
let gameStart = false;
let obstacles = [];
let frameCount = 0;
let survivalTime = 0;
let gameTime = 0;

// 角色圖
// 跑步動作
const runningFrames = [new Image(), new Image(), new Image()];
runningFrames[0].src = 'images/running1.png';
runningFrames[1].src = 'images/running2.png';
runningFrames[2].src = 'images/running3.png';

// 跳躍動作
const jumpImg = new Image();
jumpImg.src = 'images/jump.png';

// 下滑動作
const slideImg = new Image();
slideImg.src = 'images/slide.png';

// 背景圖
let backgroundX = 0;
let backgroundSpeed = 2;
const backgroundImg = new Image();
backgroundImg.src = 'images/background.png';
const stoneImg = new Image();
stoneImg.src = 'images/stone.png';
const columnImg = new Image();
columnImg.src = 'images/column.png';

function updateBackground() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, canvas.height - 50, canvas.width, 50);

  backgroundX -= backgroundSpeed;

  if (Math.abs(backgroundX) >= backgroundImg.width * 1.5) {
    backgroundX = 0;
  }

  ctx.drawImage(
    backgroundImg,
    -backgroundX,
    0,
    backgroundImg.width / 2,
    backgroundImg.height,
    0,
    0,
    canvas.width,
    canvas.height,
  );
  ctx.drawImage(
    backgroundImg,
    -(backgroundImg.width + backgroundX),
    0,
    backgroundImg.width / 2,
    backgroundImg.height,
    0,
    0,
    canvas.width,
    canvas.height,
  );

  if (gameTime % 600 === 0) {
    backgroundSpeed *= 1.1;
  }
}

function drawStartScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = '36px Arial';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.fillText('按任何鍵可以開始遊戲', canvas.width / 2, canvas.height / 2);
}
drawStartScreen();

const character = {
  x: 50,
  y: canvas.height - 340,
  width: 200,
  height: 290,
  jumping: false,
  sliding: false,
  jumpHeight: 250,
  slideHeight: 150,
  velocity: 0,
  draw: function () {
    // ctx.fillStyle = 'red';
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.save();
    ctx.beginPath();
    if (this.jumping) {
      characterImg = jumpImg;
      // ctx.fillStyle = 'red';
      // ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.drawImage(characterImg, this.x, this.y, this.width, this.height);
    } else if (this.sliding) {
      // characterImg = slideImg;
      // ctx.fillStyle = 'red';
      characterImg = slideImg;
      ctx.drawImage(characterImg, this.x, this.y, this.width, this.height);
    } else {
      const currentRunningFrame =
        Math.floor(gameTime / 10) % runningFrames.length;
      characterImg = runningFrames[currentRunningFrame];
      ctx.drawImage(characterImg, this.x, this.y, this.width, this.height);
    }
    ctx.closePath();
    ctx.restore();
  },
  update: function () {
    if (this.jumping) {
      this.y -= this.velocity;
      this.velocity -= 0.5;
      if (this.y >= canvas.height - 340) {
        this.y = canvas.height - 340;
        this.jumping = false;
        this.velocity = 0;
      }
    } else if (this.sliding) {
      this.height = this.slideHeight;
      this.y = canvas.height - 200;
    } else {
      this.height = 290;
      this.y = canvas.height - 340;
    }
  },
};

function startGame() {
  gameTime = 0;
  survivalTime = 0;
  obstacles = [];
  clearInterval(gameInterval);
  gameInterval = setInterval(updateGameArea, 20);
}

function stopGame() {
  clearInterval(gameInterval);
  gameInterval = null;
  gameStart = false;
  ctx.font = '36px Arial';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.fillText(
    '遊戲結束，存活時間: ' + Math.floor(gameTime / 60) + ' 秒',
    canvas.width / 2,
    canvas.height / 2,
  );
}

function updateGameArea() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateBackground();

  frameCount++;
  gameTime++;

  if (gameTime % 50 === 0) {
    survivalTime++;
  }

  if (!gameStart) {
    drawStartScreen();
    return;
  }

  if (gameTime % 50 === 0) {
    const lastObstacle = obstacles[obstacles.length - 1];
    // 數字越大，障礙物越接近
    if (!lastObstacle || lastObstacle?.x < 550) {
      obstacles.push(new Obstacle());
    }
  }

  // Draw ground，地板
  // ctx.fillStyle = 'gray';
  // ctx.fillRect(0, canvas.height - 50, canvas.width, 10);

  // Draw obstacles
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].hasCollided()) {
      stopGame();
      return;
    }

    obstacles[i].draw();
    obstacles[i].x -= 5 + survivalTime * 0.5;
  }

  // Draw survival time
  ctx.font = '24px sans-serif';
  ctx.fillStyle = 'black';
  ctx.fillText('存活時間：' + survivalTime + '秒', 1200, 50);

  character.update();
  character.draw();
}

class Obstacle {
  constructor() {
    this.x = canvas.width;
    this.width = 150;

    this.isUpwardObstacle = Math.random() < 0.5;
    if (this.isUpwardObstacle) {
      this.y = canvas.height - 150;
      this.height = 100;
    } else {
      this.y = 0;
      this.height = 450;
    }
  }

  draw() {
    if (!this.isUpwardObstacle) {
      ctx.fillStyle = 'red';
      ctx.drawImage(columnImg, this.x, this.y, this.width, this.height);
    } else {
      ctx.drawImage(stoneImg, this.x, this.y, this.width, this.height);
    }
  }

  hasCollided() {
    if (character.sliding) {
      return (
        this.y === 0 &&
        this.x <= character.x + character.width &&
        this.x + this.width >= character.x &&
        this.height >= character.y + character.slideHeight
      );
    } else {
      return (
        this.x <= character.x + character.width &&
        this.x + this.width >= character.x &&
        character.y + character.height >= this.y
      );
    }
  }
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowUp' && !character.jumping && !character.sliding) {
    character.jumping = true;
    character.velocity = 20;
  } else if (
    e.code === 'ArrowDown' &&
    !character.jumping &&
    !character.sliding
  ) {
    character.sliding = true;
  } else {
    if (!gameInterval && !gameStart) {
      gameStart = true;
      startGame();
    }
  }
});

document.addEventListener('keyup', (e) => {
  if (e.code === 'ArrowDown' && character.sliding) {
    character.sliding = false;
  }
});
