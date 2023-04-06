// // Conweeper
// // Ahmed Omar
// // 3/28/2023
// //
// // Extra for Experts:
// // - describe what you did to take this project "above and beyond"


// Declare some variables for the size of the grid, the size of each cell, the game board, an array to store the bombs, and a variable to track if the game is over.
let gridSize = 20;
let cellSize;
let grid;
let bombs = [];
let gameOver = false;

// Set up the canvas and generate the initial grid with bombs.
function setup() {
  createCanvas(400, 400);
  cellSize = width / gridSize;
  grid = createEmptyGrid(gridSize, gridSize);
  generateBombs(50);
}

// Draw the current state of the game, including the game board and any bombs that have been revealed.
function draw() {
  background(255);
  drawGrid(grid);
  if (gameOver) {
    drawBombs();
  }
}

// When the mouse is pressed, check if the game is still going on, and if so, update the game board accordingly.
function mousePressed() {
  if (!gameOver) {
    // Get the coordinates of the cell that was clicked.
    let x = floor(mouseX / cellSize);
    let y = floor(mouseY / cellSize);

    // If the cell is not already revealed, and is a bomb, end the game.
    if (grid[y][x] === 0) {
      if (isBomb(x, y)) {
        gameOver = true;
        return;
      }
      // Otherwise, reveal the cell and update its neighboring cells.
      grid[y][x] = 1;
      updateNeighbors(x, y);
    }
  }
}

// Create an empty grid of a specified size.
function createEmptyGrid(rows, cols) {
  let emptyGrid = new Array(rows);
  for (let i = 0; i < rows; i++) {
    emptyGrid[i] = new Array(cols).fill(0);
  }
  return emptyGrid;
}

// Generate a specified number of bombs at random locations on the grid.
function generateBombs(numBombs) {
  for (let i = 0; i < numBombs; i++) {
    let x = floor(random(gridSize));
    let y = floor(random(gridSize));
    bombs.push({ x: x, y: y });
  }
}

// Draw the game board, with revealed cells shown in black and unrevealed cells shown in white.
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

// Draw all of the bombs that have been revealed.
function drawBombs() {
  fill(255, 0, 0);
  for (let bomb of bombs) {
    rect(bomb.x * cellSize, bomb.y * cellSize, cellSize, cellSize);
  }
}

// Check if a cell at a given location contains a bomb.
function isBomb(x, y) {
  for (let bomb of bombs) {
    if (bomb.x === x && bomb.y === y) {
      return true;
    }
  }
  return false;
}

// Update all of the neighboring cells of a given cell.
function updateNeighbors(x, y) {
  // Define the neighbors of the cell.
  let neighbors = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0],           [1, 0],
    [-1, 1],  [0, 1],  [1, 1]
  ];

  // Loop over each neighbor and update its state if necessary.
  for (let [dx, dy] of neighbors) {
    let newX = x + dx;
    let newY = y + dy;

    // Check that the neighboring cell is within the bounds of the grid.
    if (newX >= 0 && newY >= 0 && newX < gridSize && newY < gridSize) {
      // If the neighboring cell is not already revealed, and is not a bomb, reveal it and check its neighbors.
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

// Count the number of neighboring cells that are revealed.
function countNeighbors(x, y) {
  let count = 0;
  let neighbors = [    [-1, -1], [0, -1], [1, -1],
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

// If the "r" or "R" key is pressed, reset the game.
function keyPressed() {
  if (key === "r" || key === "R") {
    resetGame();
  }
}

// Reset the game to its initial state.
function resetGame() {
  gameOver = false;
  grid = createEmptyGrid(gridSize, gridSize);
  bombs = [];
  generateBombs(50);
}

