// Cubic Disarray
// Ahmed Omar
// March 7, 2023


let boxes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  angleMode(DEGREES);

  for (let y = 0; y < height; y += 50){
    for (let x = 0; x < width; x += 50){
      spawnBox(x, y, 50, random(y/mouseY));
    }


  }
  // for (let i = 0; i < 15; i++){
  //   spawnBox(random(width), random(height), 50, random(360));
  // }
}

function draw() {
  background(220);

  //display all boxes
  for (let i = 0; i < boxes.length; i++){
    displayBox(boxes[i]);
  }
}

function displayBox(myBox){
  push(); //saving the transformation matrix
  translate(myBox.x, myBox.y);
  rotate(myBox.rotation);
  square(0, 0, myBox.size);
  pop(); //resetting the trasnformation matrix
}

function spawnBox(theX, theY, theSize, howRotated){
  let someBox = {
    x: theX,
    y: theY,
    size: theSize,
    rotation: howRotated,
  };
  boxes.push(someBox);
}