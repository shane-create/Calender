function setup() {
  createCanvas(windowWidth, windowHeight);
  intructions = select("#instructions");
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}


/* Another switch */
function switchToMainMenu(){
  location.href = "../index.html"
}