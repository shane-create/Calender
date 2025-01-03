function setup() {
  createCanvas(windowWidth, windowHeight);
  /* I created 2 buttons in the html, and i select them here */
  startGameB= select('#startGameB');
  helpWindowB = select('#helpWindowB');
}

/* This ensures that the canvas fills the entire window no 
matter if it gets resized by the user*/
function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}

function draw() {
  background(220);
}

/* Here i switch over to the help page */
function switchToHelp(){
  location.href = "helpPage/index.html"
}

/* This function is also connected to a button in the html
once clicked it switches to the actual game */
function startGame(){
  location.href = "game/index.html"
}
