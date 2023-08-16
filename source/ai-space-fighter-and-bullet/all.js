const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let backgroundImage = new Image();
backgroundImage.src = 'background.png';
let fighterImage = new Image();
fighterImage.src = 'fighter.png';

const drawBackground = () => {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
};

bulletSpeed = 3

const gameState = {
  mainScreen: true,
  gameScreen: false,
  gameOver: false,
  gameOverReset: false,
  gameTimer: 0,
};

let player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 20,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  maxSpeed: 3,
  keyState: {
    up: false,
    down: false,
    left: false,
    right: false,
  },
};

let bullets = [];

const createBullet = () => {
  const angle = Math.random() * Math.PI * 2;
  const x = Math.cos(angle) * (canvas.width / 2) + canvas.width / 2;
  const y = Math.sin(angle) * (canvas.height / 2) + canvas.height / 2;

  const dx = -Math.cos(angle) * bulletSpeed;
  const dy = -Math.sin(angle) * bulletSpeed;

  bullets.push({ x, y, dx, dy });
};

const updateBullets = () => {
  bullets.forEach((bullet) => {
    bullet.x += bullet.dx;
    bullet.y += bullet.dy;
  });
};

const drawBullets = () => {
  ctx.fillStyle = 'red';
  bullets.forEach((bullet) => {
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, 5, 0, Math.PI * 2);
    ctx.fill();
  });
};

const drawPlayer = () => {
  ctx.fillStyle = 'blue';
  ctx.drawImage(
    fighterImage,
    player.x - fighterImage.width / 2,
    player.y - fighterImage.height / 2,
  );
};

const drawTimer = () => {
  ctx.font = '20px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText(
    `時間: ${Math.floor(gameState.gameTimer / 60)} 秒`,
    canvas.width - 120,
    30,
  );
};

const handleInput = () => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') player.keyState.up = true;
    if (e.key === 'ArrowDown') player.keyState.down = true;
    if (e.key === 'ArrowLeft') player.keyState.left = true;
    if (e.key === 'ArrowRight') player.keyState.right = true;
  });

  document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp') player.keyState.up = false;
    if (e.key === 'ArrowDown') player.keyState.down = false;
    if (e.key === 'ArrowLeft') player.keyState.left = false;
    if (e.key === 'ArrowRight') player.keyState.right = false;
  });
};

const checkCollision = () => {
  bullets.forEach((bullet) => {
    const dist = Math.sqrt(
      (player.x - bullet.x) ** 2 + (player.y - bullet.y) ** 2,
    );
    if (dist < player.size / 2 + 7) {
      gameState.gameScreen = false;
      gameState.gameOver = true;
      setTimeout(() => {
        gameState.gameOverReset = true;
      }, 1000);
    }
  });
};

const drawMainScreen = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  ctx.font = '30px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText('按任意鍵開始遊戲', canvas.width / 2 - 130, canvas.height / 2);
};

const drawGameOverScreen = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  ctx.font = '30px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText('遊戲結束，滑鼠點擊重新開始', canvas.width / 2 - 180, canvas.height / 2 - 16);
  ctx.fillText(
    `時間: ${Math.floor(gameState.gameTimer / 60)} 秒`,
    canvas.width / 2 - 180,
    canvas.height / 2 + 24,
  );
  // drawRestartButton();
};

// 子彈的生成間隔
let bulletCreationTimer = 0;
const bulletCreationInterval = 12;

const updatePlayer = () => {
  player.ax = 0;
  player.ay = 0;

  if (player.keyState.up) player.ay = -0.2;
  if (player.keyState.down) player.ay = 0.2;
  if (player.keyState.left) player.ax = -0.2;
  if (player.keyState.right) player.ax = 0.2;

  player.vx += player.ax;
  player.vy += player.ay;

  if (Math.abs(player.vx) > player.maxSpeed)
    player.vx = player.vx > 0 ? player.maxSpeed : -player.maxSpeed;
  if (Math.abs(player.vy) > player.maxSpeed)
    player.vy = player.vy > 0 ? player.maxSpeed : -player.maxSpeed;

  player.x += player.vx;
  player.y += player.vy;

  // 確保戰鬥機不會移出畫布
  player.x = Math.min(
    Math.max(player.size / 2, player.x),
    canvas.width - player.size / 2,
  );
  player.y = Math.min(
    Math.max(player.size / 2, player.y),
    canvas.height - player.size / 2,
  );
};

const mainLoop = () => {
  if (gameState.mainScreen) {
    drawMainScreen();
  } else if (gameState.gameScreen) {
    updatePlayer();
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawPlayer();
    drawBullets();
    drawTimer();
    updateBullets();
    checkCollision();
    if (bulletCreationTimer === bulletCreationInterval) {
      createBullet();
      bulletCreationTimer = 0;
    }
    bulletCreationTimer++;
    gameState.gameTimer++;
  } else if (gameState.gameOver) {
    drawGameOverScreen();
  }

  requestAnimationFrame(mainLoop);
};

const resetGame = () => {
  gameState.mainScreen = false;
  gameState.gameScreen = true;
  gameState.gameOver = false;
  gameState.gameTimer = 0;

  player.x = canvas.width / 2;
  player.y = canvas.height / 2;

  bullets = [];
};

const handleKeyPress = () => {
  document.addEventListener('keydown', () => {
    if (gameState.mainScreen) {
      resetGame();
      // 一秒後才能重新開始遊戲
    } else if (gameState.gameOverReset) {
      gameState.mainScreen = true;
      gameState.gameOver = false;
      gameState.gameOverReset = false;
    }
  });
};

handleInput();
handleKeyPress();
mainLoop();