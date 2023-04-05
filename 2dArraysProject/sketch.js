// // Conweeper
// // Ahmed Omar
// // 3/28/2023
// //
// // Extra for Experts:
// // - describe what you did to take this project "above and beyond"


let gridSize = 20;
let cellSize;
let grid;
let bombs = [];
let gameOver = false;

function setup() {
  createCanvas(400, 400);
  cellSize = width / gridSize;
  grid = createEmptyGrid(gridSize, gridSize);
  generateBombs(50);
}

function draw() {
  background(255);
  drawGrid(grid);
  if (gameOver) {
    drawBombs();
  }
}

function mousePressed() {
  if (!gameOver) {
    let x = floor(mouseX / cellSize);
    let y = floor(mouseY / cellSize);

    if (grid[y][x] === 0) {
      if (isBomb(x, y)) {
        gameOver = true;
        return;
      }
      grid[y][x] = 1;
      updateNeighbors(x, y);
    }
  }
}

function createEmptyGrid(rows, cols) {
  let emptyGrid = new Array(rows);
  for (let i = 0; i < rows; i++) {
    emptyGrid[i] = new Array(cols).fill(0);
  }
  return emptyGrid;
}

function generateBombs(numBombs) {
  for (let i = 0; i < numBombs; i++) {
    let x = floor(random(gridSize));
    let y = floor(random(gridSize));
    bombs.push({ x: x, y: y });
  }
}

function drawGrid(grid) {
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (grid[y][x] === 1) {
        fill(0);
      } else {
        fill(255);
      }
      stroke(200);
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function drawBombs() {
  fill(255, 0, 0);
  for (let bomb of bombs) {
    rect(bomb.x * cellSize, bomb.y * cellSize, cellSize, cellSize);
  }
}

function isBomb(x, y) {
  for (let bomb of bombs) {
    if (bomb.x === x && bomb.y === y) {
      return true;
    }
  }
  return false;
}

function updateNeighbors(x, y) {
  let neighbors = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0],           [1, 0],
    [-1, 1],  [0, 1],  [1, 1]
  ];

  for (let [dx, dy] of neighbors) {
    let newX = x + dx;
    let newY = y + dy;

    if (newX >= 0 && newY >= 0 && newX < gridSize && newY < gridSize) {
      if (grid[newY][newX] === 0 && !isBomb(newX, newY)) {
        grid[newY][newX] = 1;

        // Conway's Game of Life rule: If a cell has exactly 3 neighbors, turn it on
        let count = countNeighbors(newX, newY);
        if (count === 3) {
          grid[newY][newX] = 1;
        } else {
          grid[newY][newX] = 0;
        }
      }
    }
  }
}

function countNeighbors(x, y) {
  let count = 0;
  let neighbors = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0], [1, 0],
    [-1, 1], [0, 1], [1, 1]
    ];
    
    for (let [dx, dy] of neighbors) {
    let newX = x + dx;
    let newY = y + dy;
    if (newX >= 0 && newY >= 0 && newX < gridSize && newY < gridSize) {
      if (grid[newY][newX] === 1) {
        count++;
      }
    }
  }
  return count;
  }
  
  function keyPressed() {
  if (key === 'r' || key === 'R') {
  resetGame();
  }
  }
  
  function resetGame() {
  gameOver = false;
  grid = createEmptyGrid(gridSize, gridSize);
  bombs = [];
  generateBombs(50);
  }    
