// Arrays and Object Notation Assignment
// Ahmed Omar
// 3/20/2023

// Extra for Experts:
// I used 2D arrays before we learn it in class (Before Monday). Used the ternary operator, "condition ? value1 : value2" which is a simplified if/else statement. value1 is returned if condition is true, otherwise value2 is returned. In our case let's say the initialPlayer is 'X', then 'O' is returned; otherwise, 'X' is returned.

let board = [  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let initialPlayer = 'X';
let gameOver = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  ticBoard();
  drawingPlayers();

  if (checkingForWinner() || checkingForTie()) {
    gameOver = true;
  }

  if (gameOver) {
    drawingGameOver();
  }
}


function ticBoard() {
  let cellSize = min(windowWidth, windowHeight) / 3;
  strokeWeight(2); // add a border around each cell to make it more visible
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      noFill();
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function drawingPlayers() {
  let cellSize = min(windowWidth, windowHeight) / 3;
  strokeWeight(4); // add a border around each cell to make it more visible
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let x = i * cellSize + cellSize / 2;
      let y = j * cellSize + cellSize / 2;
      let value = board[i][j];
      if (value === "X") {
        line(x - cellSize / 4, y - cellSize / 4, x + cellSize / 4, y + cellSize / 4); //draw a diagonal in the middle of the cell
        line(x + cellSize / 4, y - cellSize / 4, x - cellSize / 4, y + cellSize / 4); //draw another diagonal line that intersects with the one before to create an "x"
      } else if (value === "O") {
        noFill(); //make the "O" empty and not filled with any colour
        ellipse(x, y, cellSize / 2, cellSize / 2); //draw and "O" in the middle of the cell
      }
    }
  }
}

function drawingGameOver() {
  textSize(64);
  textAlign(CENTER, CENTER);
  let winner = checkingForWinner();
  if (winner) {
    text(winner + ' wins!', width/2, height/2);
  } else {
    text('Tie!', width/2, height/2);
  }
}

function mouseClicked() {
  if (gameOver) {
    return;
  }

  let cellSize = min(windowWidth, windowHeight) / 3;
  let i = floor(mouseX / cellSize);
  let j = floor(mouseY / cellSize);
  if (board[i][j] !== '') {
    return;
  }

  board[i][j] = initialPlayer; //sets the current player's symbol as the value of the cell at location "i, j" on the board.
  initialPlayer = (initialPlayer === 'X') ? 'O' : 'X'; //to make the next player have the opposite symbol of the previous player.
}


function checkingForWinner() {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      return board[i][0];
    }
  }

  // Check columns
  for (let j = 0; j < 3; j++) {
    if (board[0][j] !== '' && board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
      return board[0][j];
    }
  }

  // Check diagonals
  if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return board[0][0];
  }

  if (board[2][0] !== '' && board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
    return board[2][0];
  }

  return null;
}

function checkingForTie() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        return false;
      }
    }
  }

  return true;
}
