// Creating all of my variables.
let door1;
let doorSprite;
let ani;
let doors = [];
let writer;
let prevData;
let m, d;

//Here is my json start. In case someones local cache does not in fact have a json.
let dbJSON = {
  days: [],
};

function preload() {
  // This localstroge remover is only for testing purposes.
  //localStorage.removeItem("DB")

  //Here is check if a db exists. If it doesnt, i let it equal my empty days object.
  if (!localStorage.getItem("DB")) {
    console.log("Vi er inde");
    localStorage.setItem("DB", JSON.stringify(dbJSON));
  }

  //Then i fetch the locat storage and let it equal my db.
  db = JSON.parse(localStorage.getItem("DB", JSON.stringify(dbJSON)));
  console.log(db);
  ani = "assets/door1.png";
}

function setup() {
  console.log(db.days[0], "From setup");
  createCanvas(windowWidth, windowHeight);
  m = month();
  d = day();
  //Here i create all of my doors. Scrool down to see what save to cache is.
  for (i = 0; i < 24; i++) {
    if (i < 6) {
      saveToCacheStart(i);
      door1 = new Calenderdoor(i * 200 + 100, 100, doorSprite, ani, i);
    } else if (i < 12) {
      saveToCacheStart(i);
      door1 = new Calenderdoor((i - 6) * 200 + 100, 300, doorSprite, ani, i);
    } else if (i < 18) {
      saveToCacheStart(i);
      door1 = new Calenderdoor((i - 12) * 200 + 100, 500, doorSprite, ani, i);
    } else if (i < 24) {
      saveToCacheStart(i);
      door1 = new Calenderdoor((i - 18) * 200 + 100, 700, doorSprite, ani, i);
    }

    doors.push(door1);
    doors[i].show();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//Here is run my check door open func from my door objects.
function draw() {
  background(220);
  for (i = 0; i < doors.length; i++) {
    doors[i].doorOpen(i);
  }
}

//Here is my calender door object.
this.Calenderdoor = function (x, y, door, animation, number) {
  //A number, for the number label.
  this.num = 0;

  //Here is my function that creates the door.
  this.show = function () {
    //I create a new sprite.
    door = new Sprite(x, y, 200, 200);
    //The sprite sheet comes from the animation which is sent to my object when it is initialized.
    door.spriteSheet = animation;
    //if give the animations and offset of 2.
    door.anis.offset.x = 2;
    //From the sprite sheet i pick out the animation by row and columns for each stage of door opening.
    //This was i only need one asset for door opening.
    door.addAnis({
      open: { row: 0, frames: 8 },
      closed: { row: 0, frames: 1 },
      opened: { row: 2, col: 1, frames: 1 },
    });
    //Here i create the number label.
    //Make sure the number is always centered.
    this.num = createElement("h1", str(number + 1));
    if (number + 1 <= 9) {
      this.num.position(x + 21, y - 40);
    } else {
      this.num.position(x + 14, y - 40);
    }
    this.num.style("color", "#fff");

    //Here is check through my db, and check if one of my doors is opned or not.
    //If it is, it is shown to be open from the start, or else it get the closed animation.
    if (db.days[number].open) {
      this.num.hide();
      door.changeAni("opened");
    } else {
      this.num.style("color", "#fff");
      door.changeAni("closed");
    }
  };

  //Here is check if a door has been clicked and wether it was already open or not by checking the ani.
  //If the door was not opened, i make it opened and update it as such in my db in localstorage
  this.doorOpen = async function (num) {
    if (door.mouse.pressing()) {
      if (door.ani.name == "closed") {
        //MAN MÅ KUN ÅBNE EN DØR PÅ DEN DAG DER STÅR PÅ DEN.
        //if (m == 1 && d == 3) {
        this.num.hide();
        door.changeAni(["open", "opened"]);
        db.days[number].open = true;
        localStorage.setItem("DB", JSON.stringify(db));
        await sleep(1500);
        url = "../doors/door-" + str(num + 1);
        print(url);
        location.href = url;
        //}
      }
    }
  };
};

//Here i save each door to my local storage by pushing it to the array. I give it a name,
//And give it a value of open, which starts out as false.
//For every door i check if it already exists. If it does i do not create a new one.
this.saveToCacheStart = function (i) {
  if (!db.days[i]) {
    db.days.push({
      name: "day " + str(i),
      open: false,
      dateToBeOpned: i + 1,
    });

    localStorage.setItem("DB", JSON.stringify(db));
  }
};
