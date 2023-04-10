// // Conweeper
// // Ahmed Omar
// // 3/28/2023



// Declaring variables for the grid size, the cell size, the grid, the bombs array, game over state, and the bomb image used
let gridSize = 20;
let cellSize;
let grid;
let bombs = [];
let gameIsOver = false;
let bombImg;

// creating a preloading function to load the bomb image
function preload() {
  bombImg = loadImage("bomb2.png");
}

function setup() {
  createCanvas(400, 400);
  cellSize = width / gridSize;
  grid = createEmptyGrid(gridSize, gridSize);
  generateBombs(50);
}

// the draw function is used here to updatethe canvas, draws the grid, and displays the bombs when the game is over
function draw() {
  background(255);
  drawGrid(grid);
  if (gameIsOver) {
    displayBombs();
  }
}

// this function handles the player's click anywhere on the grid and updates the game state (Game over or not)
function mousePressed() {
  if (!gameIsOver) {
    let x = floor(mouseX / cellSize);
    let y = floor(mouseY / cellSize);

    if (grid[y][x] === 0) {
      if (isBomb(x, y)) {
        gameIsOver = true;
        return;
      }
      grid[y][x] = 1;
      updateNeighbors(x, y);
    }
  }
}

// this function is to create an empty grid that takes in rows and columns
function createEmptyGrid(rows, cols) {
  let emptyGrid = new Array(rows);
  for (let i = 0; i < rows; i++) {
    emptyGrid[i] = new Array(cols).fill(0);
  }
  return emptyGrid;
}

// this function is to generate bombs and place them randomly all over the grid 
function generateBombs(numBombs) {
  for (let i = 0; i < numBombs; i++) {
    let x = floor(random(gridSize));
    let y = floor(random(gridSize));
    bombs.push({ x: x, y: y });
  }
}

// this function is made for drawing the grid on the canvas
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

// function is made to display or make the generated bombs appear whenever one of them is clicked (When the game is over)
function displayBombs() {
  for (let bomb of bombs) {
    image(bombImg, bomb.x * cellSize, bomb.y * cellSize, cellSize, cellSize);
  }
}

// this function is to check if there is a bomb in this specific place (coordinates since we are using x and y values)
function isBomb(x, y) {
  for (let bomb of bombs) {
    if (bomb.x === x && bomb.y === y) {
      return true;
    }
  }
  return false;
}

// here we are updating the neighbours of the clicked cell if it did not have a bomb
function updateNeighbors(x, y) {
  let neighbors = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0],           [1, 0],
    [-1, 1],  [0, 1],  [1, 1]
  ];

  // this function is made for iterating through the neighboring cells
  for (let [dx, dy] of neighbors) {
    let newX = x + dx;
    let newY = y + dy;

    // Check if the neighbor cell is within the grid boundaries
    if (newX >= 0 && newY >= 0 && newX < gridSize && newY < gridSize) {

      // here we are checking if the neighbor cell is not revealed and doesn't contain a bomb so then we would reveal it
      if (grid[newY][newX] === 0 && !isBomb(newX, newY)) {
        grid[newY][newX] = 1;

        // Update the neighbor cell's state based on the number of adjacent revealed cells (Conway's game of life)
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

// this is to count the number of revealed neighboring cells
function countNeighbors(x, y) {
  let count = 0;
  let neighbors = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0],           [1, 0],
    [-1, 1],  [0, 1],  [1, 1]
  ];

  // Again, iterating through the neighboring cells
  for (let [dx, dy] of neighbors) {
    let newX = x + dx;
    let newY = y + dy;

    // Check if the neighbor cell is within the grid boundaries
    if (newX >= 0 && newY >= 0 && newX < gridSize && newY < gridSize) {
      // If the neighbor cell is revealed, increase the count by one
      if (grid[newY][newX] === 1) {
        count++;
      }
    }
  }
  return count;
}

// this function is just to pressing the "R" or the "r" keys to reset the game 
function keyPressed() {
  if (key === "r" || key === "R") {
    resetGame();
  }
}

// this function is to reset the game by ressetting the game state, the grid, and also the bomb generation
function resetGame() {
  gameIsOver = false;
  grid = createEmptyGrid(gridSize, gridSize);
  bombs = [];
  generateBombs(50);
}

