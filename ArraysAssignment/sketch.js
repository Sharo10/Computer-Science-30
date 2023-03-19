// Arrays and Object Notation Assignment
// Ahmed Omar
// 3/20/2023
//
// Extra for Experts:
// I used 2D arrays before we learn it in class (Before Monday). Used the ternary operator, "condition ? value1 : value2" which is a simplified if/else statement. value1 is returned if condition is true, otherwise value2 is returned. In our case let's say the initialPlayer is 'X', then 'O' is returned; otherwise, 'X' is returned.

let board = [
  {col1: '', col2: '', col3: ''},
  {col1: '', col2: '', col3: ''},
  {col1: '', col2: '', col3: ''}
];

let initialPlayer = 'X';
let gameIsOver = false;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);

  drawingBoard();
  drawingPlayers();

  // Checking if we have a win or a tie so we can end the game if found
  if (checkingForWinner() || checkingForTie()) {
    gameIsOver = true;
    drawingGameOver();
  }
}

// A function for drawing the grid or the tic-tac-toe board
function drawingBoard() {
  strokeWeight(4); // to make the sides be thicker and more visible
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let x = j * 133;
      let y = i * 133;
      rect(x, y, 133, 133);
    }
  }
}

function drawingPlayers() {
  textSize(48);
  textAlign(CENTER, CENTER);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Drawing the players which are the "X" and the "O" in each cell of the board
      let x = j * 133 + 67;
      let y = i * 133 + 67;
      let value = board[i]['col' + (j+1)];
      text(value, x, y);
    }
  }
}

// A function responsible for the game over message
function drawingGameOver() {
  textSize(64);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  let winner = checkingForWinner();
  if (winner) {
    text(winner + ' Wins!', width/2, height/2);
  } else {
    text('Tie!', width/2, height/2);
  }
}

// A function responsible for the the mouse clicks and the players movement over the board
function mouseClicked() {
  // To ignore the mouse click if the game is over
  if (gameIsOver) {
    return;
  }

  let i = floor(mouseY / 133);
  let j = floor(mouseX / 133);

  // To ignore the mouse click if the cell has a player already
  if (board[i]['col' + (j+1)] !== '') {
    return;
  }

  board[i]['col' + (j+1)] = initialPlayer;
  initialPlayer = (initialPlayer === 'X') ? 'O' : 'X';
}
function checkingForWinner() {
  // Checking rows
  for (let i = 0; i < 3; i++) {
    if (board[i]['col1'] !== '' && board[i]['col1'] === board[i]['col2'] && board[i]['col2'] === board[i]['col3']) {
      return board[i]['col1'];
    }
  }

  // Checking columns
  for (let j = 0; j < 3; j++) {
    if (board[0]['col' + (j+1)] !== '' && board[0]['col' + (j+1)] === board[1]['col' + (j+1)] && board[1]['col' + (j+1)] === board[2]['col' + (j+1)]) {
      return board[0]['col' + (j+1)];
    }
  }

  // Checking diagonals
  if (board[0]['col1'] !== '' && board[0]['col1'] === board[1]['col2'] && board[1]['col2'] === board[2]['col3']) {
    return board[0]['col1'];
  }

  if (board[2]['col1'] !== '' && board[2]['col1'] === board[1]['col2'] && board[1]['col2'] === board[0]['col3']) {
    return board[2]['col1'];
  }

  return null;
}

// Checking if all the cells are used but still no winner
function checkingForTie() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i]['col' + (j+1)] === '') {
        return false;
      }
    }
  }

  return true;
}
