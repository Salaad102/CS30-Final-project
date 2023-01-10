// Plants Vs Zombies
// Salaar Ahmed
// November 22, 2022
//
// Ideas:
// - Have the plants in a 2d array
// - Have the zombies act like a mouse detection if in grid?
// - Learn how to use p5.play sprite() function.
// Things to add to Plant constuctor: fireSpeed, bulletSpeed?, 
// sunflower, PeaShooter, Walnut, boxing lettuce?, plant that fights in other lanes a circle radius 
// Zombie, Buckethead Zombie, ConeZombie - All have different health depending on item they are wearing.
// Ask Ben if he premade variables for his sprites? Maybe ask Saabir?

let gameState = "Menu";
let grid;
const ROWS = 7;
const COLS = 10;
let cellHeight;
let cellWidth;
let lawnIMG, concreteIMG;
let shopButton, startButton, backShopButton, peaPlantButton, sunflowerPlantButton, walnutPlantButton;
let peaPlant;

function preload(){
  lawnIMG = loadImage("grass.png");
  concreteIMG = loadImage("stone.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellHeight = height/ROWS;
  cellWidth = width/COLS;
  grid = create2dArray(COLS, ROWS);
  startButton = new Button(width/2, height/2, 200, 400, "black", "grey", "Menu", "Game", CENTER); //Button will apear in the "Menu" State & change to "Game" state when clicked
  shopButton = new Button(0, height - 200, 200, 200, "white", "black", "Game", "Shop", CORNER); //Button will apear in the "Game" State & change to "Shop" state when clicked
  backShopButton = new Button(width - 200, height - 200, 200, 200, "green", "red", "Shop", "Game", CORNER); //Button will apear in the "Shop" State & change to "Game" state when clicked
  peaPlantButton = new Button(width/2, height/2, 150, 150, "purple", "orange", "Shop", "Plants", CENTER);
}

function buttonStartups(){
  startButton.display();

  shopButton.display();

  backShopButton.display();

  peaPlantButton.display();
}

function draw() {
  console.log(gameState);
  background(220);
  displayGrid(grid);
  buttonStartups();
}

function create2dArray(COLS, ROWS) {
  let emptyArray = [];
  for (let y=0; y<ROWS; y++){
    emptyArray.push([]);
    for (let x=0; x<COLS; x++){
      emptyArray[y].push(0);
    } 
  }
  return emptyArray;
}

function displayGrid(grid){
  for (let y=0; y<ROWS; y++){
    for (let x=0; x <COLS; x++){
      if (grid[y][x] === 0){
        image(lawnIMG, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      }
      else if(grid[y][x] === 1){
        image(concreteIMG, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      }
    }
  }
}

class Button {
  constructor(x, y, height, width, color1, color2, state, changeState, modeOfRect){
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.color1 = color1;
    this.color2 = color2;
    this.state = state;
    this.changeState = changeState;
    this.rectMode = modeOfRect;
  }

  update(){
    
  }

  display(){
    if (gameState === this.state){
      if (this.mouseIsHovering()){
        fill(this.color1);
      }
      else{
        fill(this.color2);
      }
      rectMode(this.rectMode);
      rect(this.x, this.y, this.width, this.height);
    } 
  }

  mouseIsHovering(){
    if (this.rectMode === CENTER){
      return mouseX > this.x - this.width/2 && mouseX < this.x + this.width/2 && mouseY > this.y - this.height/2 && mouseY < this.y + this.height/2;
    }
    else if (this.rectMode === CORNER) {
      return mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height;
    }
    
  }

}

class Plants {
  constructor(x, y, theImage, damage, fireSpeed, health){
    this.x = x;
    this.y = y;
    this.img = theImage;
    this.damage = damage;
    this.fireSpeed = fireSpeed;
    this.health = health;
    this.bulletAR = [];
  }

  display(){
    image(this.img, this.x, this.y);
    peaPlant = new Sprite();
  }

  animate(){
    // change the image to animate it.
  }

  newSprite(){
    
  }

  update(){
    //
  }

  mouseIsHovering(){
    return mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height;
  }

}

class Bullet {
  constructor(x, y, dx, theImage){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.img = theImage;
  }

  display(){
    image(this.img, this.x, this.y);
  }

  update(){
    this.x += this.dx;
    if (!this.isHitTarget()){ // make bullet disapear after.
      this.bulletAR.splice(this.bulletAR.indexOf(this), 1);
    }
  }

  isHitTarget(){
    return this.x >= width; // fix to >= zombie x
  }
}

class Zombie {
  constructor(x, y, dx, theImage, damage, health){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.img = theImage;
    this.damage = damage;
    this.health = health;
  }

  display(){
    image(this.img, this.x, this.y);
  }

  update(){
    this.x -= this.dx; //moving right to left
  }

  isDead(){
    //
  }
}

function mousePressed(){
  if (gameState === startButton.state) {
    if (startButton.mouseIsHovering()){
      gameState = startButton.changeState;
    }
  }
  if (gameState === shopButton.state) {
    if (shopButton.mouseIsHovering()){
      gameState = shopButton.changeState;
    }
  }
  if (gameState === backShopButton.state) {
    if (backShopButton.mouseIsHovering()){
      gameState = backShopButton.changeState;
    }
  }
  if (gameState === peaPlantButton.state) {
    if (peaPlantButton.mouseIsHovering()){
      gameState = peaPlantButton  .changeState;
    }
  }

}
