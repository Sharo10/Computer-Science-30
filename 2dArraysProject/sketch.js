// Project Title
// Ahmed Omar
// 3/28/2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let wordList = ["apple", "banana", "cherry", "orange", "grape"]; 

let secretWord = ""; 

let guessedLetters = []; 

let wrongGuesses = 0; 

let maxWrongGuesses = 6; 

let gameWon = false; 

let gameLost = false; 

let letterSize = 32; 

let buttonWidth = 60; 

  

function setup() { 

  createCanvas(800, 600); 

  secretWord = random(wordList); 

  for (let i = 0; i < secretWord.length; i++) { 

    guessedLetters.push("_"); 

  } 

  textSize(letterSize); 

  textAlign(CENTER, CENTER); 

} 

  

function draw() { 

  background(255); 

  drawGallows(); 

  drawHangman(); 

  drawSecretWord(); 

  drawAlphabet(); 

  checkGameState(); 

} 

  

function drawGallows() { 

  stroke(0); 

  strokeWeight(4); 

  line(100, 450, 200, 450); 

  line(150, 450, 150, 100); 

  line(150, 100, 300, 100); 

  line(300, 100, 300, 150); 

} 

  

function drawHangman() { 

  if (wrongGuesses > 0) { 

    ellipse(300, 200, 100, 100); // Head 

  } 

  if (wrongGuesses > 1) { 

    line(300, 250, 300, 350); // Body 

  } 

  if (wrongGuesses > 2) { 

    line(300, 275, 250, 225); // Left arm 

  } 

  if (wrongGuesses > 3) { 

    line(300, 275, 350, 225); // Right arm 

  } 

  if (wrongGuesses > 4) { 

    line(300, 350, 250, 400); // Left leg 

  } 

  if (wrongGuesses > 5) { 

    line(300, 350, 350, 400); // Right leg 

  } 

} 

  

function drawSecretWord() { 

  fill(0); 

  for (let i = 0; i < guessedLetters.length; i++) { 

    text(guessedLetters[i], 400 + i * letterSize, height / 2); 

  } 

} 

  

function drawAlphabet() { 

  for (let i = 0; i < 26; i++) { 

    let x = 400 + (i % 13) * buttonWidth; 

    let y = (i < 13) ? 500 : 570; 

    let letter = String.fromCharCode(65 + i); 

    fill(200); 

    rect(x, y, buttonWidth, buttonWidth, 8); 

    fill(0); 

    text(letter, x + buttonWidth / 2, y + buttonWidth /2); 

  } 

} 

  

function mouseClicked() { 

  if (!gameWon && !gameLost) { 

    let clickedLetter = getClickedLetter(); 

    if (clickedLetter) { 

      makeGuess(clickedLetter.toLowerCase()); 

    } 

  } 

} 

  

function getClickedLetter() { 

  for (let i = 0; i < 26; i++) { 

    let x = 400 + (i % 13) * buttonWidth; 

    let y = (i < 13) ? 500 : 570; 

    if (mouseX > x && mouseX < x + buttonWidth && mouseY > y && mouseY < y + buttonWidth) { 

      return String.fromCharCode(65 + i); 

    } 

  } 

  return null; 

} 

  

function makeGuess(letter) { 

  if (secretWord.includes(letter)) { 

    for (let i = 0; i < secretWord.length; i++) { 

      if (secretWord[i] === letter) { 

        guessedLetters[i] = letter; 

      } 

    } 

  } else { 

    wrongGuesses++; 

  } 

} 

  

function checkGameState() { 

  if (guessedLetters.join("") === secretWord) { 

    gameWon = true; 

    displayResult("You won!"); 

  } else if (wrongGuesses >= maxWrongGuesses) { 

    gameLost = true; 

    displayResult("You lost! The word was: " + secretWord); 

  } 

} 

  

function displayResult(message) { 

  textSize(48); 

  fill(255, 0, 0); 

  text(message, width / 2, 100); 

} 