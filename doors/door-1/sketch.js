let player;
let arrowImg, playerImg;
let ball;
let goalE, goalP;
let walls;
let Enemy;
let glueJ;
let PPoints=0, EPoints=0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  //Lav alle objekter:
  player = new Player()
  goalP = new Goal()
  goalE = new Goal(true)
  ball =  new Ball()
  enemy = new EnemyPlayer()
  
  //walls
  wall1 = new Sprite(0, windowHeight/2, 10, windowHeight)
  wall2 = new Sprite(windowWidth, windowHeight/2, 10, windowHeight)
  wall3 = new Sprite(windowWidth/2, 0, windowWidth, 10)
  wall4 = new Sprite(windowWidth/2, windowHeight, windowWidth, 10)
  walls = [wall1, wall2, wall3, wall4]
  
  //Looper igennem wall array for at give hver wall disse egenskaber.
  for (let i = 0; i < walls.length; i++){
    walls[i].collider = "static"
    walls[i].visible = false
  }
}


function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}

function preload(){
  //Loader alle mine billeder.
  playerImg = loadImage("assets/Person_1.png")
  enemyImg = loadImage("assets/Person_2.png")
  arrowImg = loadImage("assets/arrow.png")
  goalPImg = loadImage("assets/player_goal.png")
  goalEImg = loadImage("assets/enemy_goal.png")
  footBall = loadImage("assets/footBall.png")
}

function draw() {
  background(96, 224, 139);
  
  //Field tegnede
  noFill()
  stroke(255)
  strokeWeight(3)
  line(windowWidth/2, 0, windowWidth/2, windowHeight)
  circle(windowWidth/2, windowHeight/2, 300)
  rect(0, windowHeight/3-10, 130, 300)
  rect(0, windowHeight/3-50, 190, 380)
  rect(windowWidth-130, windowHeight/3-10, 130, 300)
  rect(windowWidth-190, windowHeight/3-50, 190, 380)
  
  //Player bevægelse
  player.move(2.5);
  
  //Enemy bevægelse:
  enemy.move(2)
  
  //Resize images
  playerImg.resize(140, 150)
  enemyImg.resize(140, 150)
  arrowImg.resize(30, 30)
  goalEImg.resize(130, 260)
  goalPImg.resize(130, 260)

  //Check Ball
  ball.isBallOutOfBounds()
  
  //Check Goal
  goalP.scoreGoal()
  goalE.scoreGoal()
  
  strokeWeight(1)
  textSize(40)
  textAlign(CENTER, CENTER);
  text(PPoints + "  :  " + EPoints, windowWidth/2, 40)
}

this.EnemyPlayer = function(){
  this.enemySprite = new Sprite(windowWidth-200, windowHeight/2, 80, 120)
  this.enemySprite.img = enemyImg
  
  this.move = function(speed){
    
    //Når enemy får bolden hænger de sammen, indtil spiller rører ved dem.
    if(this.enemySprite.collides(player.playerSprite)){
        if(this.enemySprite.joints.length >0) {
          print("called")
          glueJ.remove()
          ball.returnBall()
          this.enemySprite.speed = 0
        }
      }
    else if(this.enemySprite.collides(ball.ballSprite)) 
      {
        ball.ballSprite.x = this.enemySprite.x - 30
        ball.ballSprite.y = this.enemySprite.y + 20
        glueJ = new GlueJoint(ball.ballSprite, this.enemySprite)
      } 
    
    
    if(this.enemySprite.joints.length > 0){
      this.enemySprite.direction = this.enemySprite.angleTo(goalP.goalSprite);
    
      this.enemySprite.speed = speed;
    } else {
        this.enemySprite.direction = this.enemySprite.angleTo(ball.ballSprite);
    
        this.enemySprite.speed = speed;
      }
    

    //Så spiller ikke roterer.
    if (this.enemySprite.rotation != 0) this.enemySprite.rotation = 0
  }
}

this.Player = function(){
  //Ny player sprite og rund tingen rundt om.
  this.playerSprite = new Sprite(100, windowHeight/2, 80, 120)
  this.arrowSprite = new Sprite(0, 0, 20, 20)
  this.playerSprite.img = playerImg
  this.arrowSprite.img = arrowImg
  
  //Giver spiller bevægelse, ved at følge mus.
  this.move = function(speed){
    //Arrow skal kun vise retning ikke være objekt, så collider er none:
    this.arrowSprite.collider = "none"
    
    //Bevæg spiller imod mus.
    this.playerSprite.direction = this.playerSprite.angleTo(mouse);
    this.playerSprite.speed = speed;
    
    //Arrow sprite følger bare player sprite.
    this.arrowSprite.x = this.playerSprite.x
    this.arrowSprite.y = this.playerSprite.y
    
    //Drej arrow mod musen
    this.arrowSprite.rotateTowards(position=mouse, tracking=0.1,facing=0);
    this.arrowSprite.offset.x = 100;
    
    //Så spiller ikke roterer.
    if (this.playerSprite.rotation != 0) this.playerSprite.rotation = 0
    
  }
}

//Målene er deres eget objekt. Man skriver om det modstanderens mål eller ej som args:
this.Goal = function(isEnemyGoal){
  this.pos = 20
  if (isEnemyGoal) this.pos = windowWidth-40;
    
  this.goalSprite = new Sprite(this.pos, windowHeight/2, 20, 140)
  this.goalSprite.collider = "static"
  
  if (isEnemyGoal){
    this.goalSprite.img = goalEImg
  } else {
    this.goalSprite.img = goalPImg
  }
  
  this.scoreGoal = function(){
    if (this.goalSprite.collides(ball.ballSprite)){
      if(isEnemyGoal){
        PPoints += 1
      } else {
        EPoints += 1
      }
      ball.returnBall();
      player.playerSprite.x = 100;
      player.playerSprite.y = windowHeight/2;
      enemy.enemySprite.x = windowWidth-100;
      enemy.enemySprite.y = windowHeight/2;
      if(glueJ) glueJ.remove()
    }
  }
}

//Boldens objekt:
this.Ball = function(){
  this.ballSprite = new Sprite(windowWidth/2, windowHeight/2, 25, 25)
  this.ballSprite.img = footBall
  this.wallTouch = false
  
  //Så bolden ikke bare flyver afsted
  this.ballSprite.drag = 0.4
  
  this.returnBall = function(){
    this.ballSprite.x = windowWidth/2
    this.ballSprite.y = windowHeight/2
    this.ballSprite.velocity.x = 0
    this.ballSprite.velocity.y = 0
    this.ballSprite.rotationSpeed = 0
  }
  
  this.isBallOutOfBounds = function(){
       
    for (let i = 0; i < walls.length; i++){
      if (this.ballSprite.collides(walls[i])){
        this.returnBall()
        this.wallTouch = true
        glueJ.remove()
      } else {
        this.wallTouch = false
      }
    }
  }
}