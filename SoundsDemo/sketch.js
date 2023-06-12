// Sounds demo 
// Ahmed Omar
// 6/12/2023

let backgroundTunes;
let clickSound;

function preload() {
  backgroundTunes = loadSound("background-loop.mp3");
  clickSound = loadSound("click.ogg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}

function keyPressed() {
  if (!backgroundTunes.isPlaying()) {
    backgroundTunes.play();
    backgroundTunes.setLoop(true);
  }
}

function mousePressed() {
  clickSound.play();
}