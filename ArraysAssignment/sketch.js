// Arrays and Object Notation Assignment
// Ahmed Omar
// 3/20/2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  ticBoard();
}


function ticBoard() {
  let cellSize;
  cellSize = windowHeight/3;

  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      fill("white");
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}