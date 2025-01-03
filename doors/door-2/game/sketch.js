var player

function setup() {
  createCanvas(windowWidth, windowHeight);
  let background = new Sprite(windowWidth/2-12, windowHeight/2, 550, 500);
  background.img = "assets/background.png";
  background.collider ="none"
  /* Here i create a new player with the player object */
  player = new Player()

  /* Here i use the fence object to create each fence. The first 4 numbers
  tell us in which spot the fence will be located as well as the width
  and height of the fence. The last number tells us which sprite the fence
  should have */
  let fence1 = new Fence(windowWidth/3.2, windowHeight/2, 10, 500, 1)
  let fence2 = new Fence(windowWidth/2 - 15, windowHeight/5.8, 550, 10, 2)
  let fence3 = new Fence(windowWidth/1.5, windowHeight/2, 10, 500, 1)
  let fence4 = new Fence(windowWidth/2 - 15, windowHeight/1.2, 550, 10, 2)
}

/* Again, if the window gets resized by user the canvas is also resized */
function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}

function draw() {
  background(220);

  /* This is a function on the actual player that allows movement */
  player.playerMovement()
}

/* Here is the fence object. It takes an x position, a y pos, a width
a height and a number to see the sprite to be displayed. */

this.Fence = function(x, y, w, h, num){
  this.fenceSprite = new Sprite(x, y, w, h)
  this.fenceSprite.collider = "static"
  this.fenceSprite.visible = true

  /* If the last number is 1 the vertical sprite is shown.
  otherwise the horizontal sprite is shown */

  if(num == 1){
    this.fenceSprite.img = "assets/fenceOne.png"
  } else {
    this.fenceSprite.img = "assets/fenceTwo.png"
  }
}

/* Here is our player object */
this.Player = function() {
  /* Here i create the player sprite and set its position.*/
  this.x = windowWidth/2;
  this.y = windowHeight/2;
  this.playerSprite = new Sprite(this.x, this.y, 55, 55)

  /* Under the assets there is a sprite sheet which i attach to
  the player here: */
  this.playerSprite.spriteSheet = "assets/playerAniFull.png"

  /* Her is tell the game how slow the animation should be played */
  this.playerSprite.anis.offset.x = 2;
	this.playerSprite.anis.frameDelay = 8;

  /* Here i go through the spritesheet, and create a key for each
  animation. These keys i will use to switch between animations */
  this.playerSprite.addAnis({
		front: { row: 0, frames: 4 },
		sideFrontRight: { row: 1, frames: 4 },
		sideRight: { row: 2, frames: 4 },
		sideBackRight: { row: 3, frames: 4 },
		back: { row: 4, frames: 4},
    sideFrontLeft: { row: 6, frames: 4 },
		sideLeft: { row: 7, frames: 4 },
		sideBackLeft: { row: 8, frames: 4 },
		stand: { row: 0, frames: 1}
	});

  /* This is the player movement function inside the player object */
this.playerMovement = function(){
    
  /* If the key "up" is pressed, the player moves up by 2 . If its down 
  the player moves down by 2 and so on */
    if (kb.pressing("up")) {
      this.playerSprite.vel.y = -2; 
    }
    else if (kb.pressing("down")) this.playerSprite.vel.y = 2;
    else this.playerSprite.vel.y = 0
    
    if (kb.pressing("left")) this.playerSprite.vel.x = -2;
    
    else if (kb.pressing("right")) this.playerSprite.vel.x = 2;
    
    /* If no key is being clicked the players velocity goes to 0 */
    else this.playerSprite.vel.x = 0

    /* Here i change the animations. The most important animations
    that require multiple keys to be clicked are at the top*/
    /* If player clicks the down key while ALSO clicking the left key, we change
    the animation to side front left. The same happens for the other keys*/
    if(kb.pressing("down") && kb.pressing("left")) this.playerSprite.changeAni("sideFrontLeft")
    else if (kb.pressing("down") && kb.pressing("right")) this.playerSprite.changeAni("sideFrontRight")
    else if(kb.pressing("up") && kb.pressing("left")) this.playerSprite.changeAni("sideBackLeft")
    else if (kb.pressing("up") && kb.pressing("right")) this.playerSprite.changeAni("sideBackRight")
    else if(kb.pressing("left")) this.playerSprite.changeAni("sideLeft")
    else if (kb.pressing("right")) this.playerSprite.changeAni("sideRight")
    else if(kb.pressing("down")) this.playerSprite.changeAni("front")
    else if (kb.pressing("up")) this.playerSprite.changeAni("back")
    /* The default animation is the front facing standing animation */
    else this.playerSprite.changeAni('stand');

    /* This is here just to make sure the player doesnt flip when it touches
    another object. I bascially make sure its rotation is always 0 */
    if (this.playerSprite.rotation !=0) this.playerSprite.rotation = 0
}
}