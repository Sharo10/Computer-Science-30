// Generative Art
// Mar 3, 2023
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
  background("white");
  // diagnoalLine(width/2, height/2, 200);
  lotsOfLines(50, 50)
}

function draw() {

}

function lotsOfLines(cols, rows){
  for (let x = 0; x < cols; x++){
    for (let y = 0; y < rows; y++){
      let spaceAmount = width/cols;
      diagnoalLine(x*spaceAmount, y*spaceAmount, spaceAmount);
    }
  }

}

function diagnoalLine(x, y, spacing){
  if (random(100) > 50){
    // positive slope
    line(x - spacing/2, y + spacing/2, x + spacing/2, y - spacing/2);
  }
  else{
    //negative slope
    line(x - spacing/2, y + spacing/2, x + spacing/2, y - spacing/2 );
  }
}
