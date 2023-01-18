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

let PlantPlaced = false; let plantType; let removingPlant;
let peaPlantCreated = false, walnutCreated = false, shovelCreated = false;
let gameState = "Menu";
let grid;
const ROWS = 7;
const COLS = 10;
let cellHeight;
let cellWidth;
let lawnIMG, concreteIMG;
let shopButton, startButton, backShopButton, peaPlantButton, sunflowerPlantButton, walnutPlantButton;
let peaPlant, walnut;
let peaPlantAR = [], walnutAR;
let shovelButton, shovel;
let placePlant;

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
  walnutPlantButton = new Button(width/4, height/2, 150, 150, "purple", "yellow", "Shop", "Plants", CENTER);
  shovelButton = new Button(width/2 + width/4, height/2, 150, 150, "purple", "blue", "Shop", "Plants", CENTER);

}

function buttonStartups(){
  startButton.display();

  shopButton.display();

  backShopButton.display();

  peaPlantButton.display();

  walnutPlantButton.display();

  shovelButton.display();
}

function draw() {
  rectMode(CORNER);
  console.log(gameState);
  background(220);
  displayGrid(grid);
  buttonStartups();
  if (gameState === "PlacingPlant") {
    if (plantType === "Pea"){
      peaPlant.x = mouse.x;
      peaPlant.y = mouse.y;
    }
    if (plantType === "Walnut"){
      walnut.x = mouse.x;
      walnut.y = mouse.y;
    }
    if (plantType === "Shovel") {
      shovel.x = mouse.x;
      shovel.y = mouse.y;
    }
  } 
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
        fill(0,150,0,255);
        rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
        // image(lawnIMG, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
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
    this.layer = 2;
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
  }

  animate(){
    // change the image to animate it.
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

function checkButton(button){
  if (gameState === button.state) {
    if (button.mouseIsHovering()) {
      gameState = button.changeState;
    }
  }
}

function placeThePlant(spriteName, plantButton, typeOfPlant, plantCreated, color){
  if (gameState === plantButton.changeState){
    if (plantButton.mouseIsHovering()){
      plantCreated = true;
      spriteName = new Sprite(mouseX, mouseY, 50, 50);
      spriteName.color = color;
      spriteName.collider = "k";
      gameState = "PlacingPlant";
      plantType = typeOfPlant;
      placePlant = true;
    }
  }
}

function mousePressed(){
  checkButton(startButton);
  checkButton(shopButton);
  checkButton(backShopButton);
  checkButton(peaPlantButton);
  checkButton(walnutPlantButton);
  checkButton(shovelButton);
  if (gameState === shovelButton.changeState){
    if (shovelButton.mouseIsHovering()){
      shovelCreated = true;
      shovel = new Sprite(mouseX, mouseY, 50,50);
      shovel.shapeColor = color(0,155,155);
      shovel.collider = "k";
      gameState = "PlacingPlant";
      plantType = "Shovel";
      removingPlant = true;
    }
  }
  if (gameState === peaPlantButton.changeState){ // Turn this into an array
    if (peaPlantButton.mouseIsHovering()){
      peaPlantCreated = true;
      peaPlant = new Sprite(mouseX, mouseY, 50, 50); // dragging peaPlant
      peaPlant.shapeColor = color(255,0 ,0);
      peaPlant.collider = "k";
      gameState = "PlacingPlant";
      plantType = "Pea";
      placePlant = true;
      peaPlantAR.push(peaPlant);
    }
  }
  if (gameState === walnutPlantButton.changeState){
    if (walnutPlantButton.mouseIsHovering()){
      walnutCreated = true;
      walnut = new Sprite(mouseX, mouseY, 50, 50); // dragging walnutPlant
      walnut.shapeColor = color(255,255,0);
      walnut.collider = "k";
      gameState = "PlacingPlant";
      plantType = "Walnut";
      placePlant = true;
    }
  }
}



function mouseReleased(){
  if(gameState === "PlacingPlant") { // Checks if mouseclicked while in placing plants mode
    PlantPlaced = true;
  }
  if (PlantPlaced){ // When mouse is released, turns gameState back to Game
    gameState = "Game";
    PlantPlaced = false;
  } 
  

  putPlantInGrid(walnut, walnutCreated);
  removePlant(shovel, walnut); 
  putPlantInGrid(peaPlant, peaPlantCreated);
  removePlant(shovel, peaPlant);
  //Only works for 1
  
}

function removePlant(shovel, plant) { // Problem here
  if (shovelCreated){
    let gridX = Math.floor(shovel.x / cellWidth);
    let gridY = Math.floor(shovel.y / cellHeight);
    if (grid[gridY][gridX] === 1) {
      grid[gridY][gridX] = 0;
      let grid1X = Math.floor(peaPlantAR[0].x / cellWidth);
      let grid1Y = Math.floor(peaPlantAR[0].y / cellHeight);
      for (let i=0; i<peaPlantAR.length; i++){
        if (peaPlantAR[i].x === grid[grid1Y][grid1X]*cellWidth){
          peaPlantAR[i].remove();
        }
      }
      
      // plant.remove(); // how to specify which plant to remove
      shovelCreated = false;
    }
    shovel.remove();
  }
}


function putPlantInGrid(plant, plantCreatedType){
  if (placePlant) {
    if (plantCreatedType){
      let gridX = Math.floor(plant.x / cellWidth);
      let gridY = Math.floor(plant.y / cellHeight);
      if (grid[gridY][gridX] === 0){
        grid[gridY][gridX] = 1;
        plant.x = gridX * (width / grid[0].length) + width / grid[0].length / 2;
        plant.y = gridY * (height / grid.length) + height / grid.length / 2;
        placePlant = false;
        walnutCreated = false;
        peaPlantCreated = false; // maybe return?
      }
      else if (grid[gridY][gridX] === 1){
        plant.remove();
      }
    }
    // if (shovelCreated){
    //   let gridX = Math.floor(shovel.x / cellWidth);
    //   let gridY = Math.floor(shovel.y / cellHeight);
    //   if (grid[gridY][gridX] === 1) {
    //     grid[gridY][gridX] = 0;
    //   }
    // }
  }
}

class plantNumberAR {
  constructor(plant){
    this.plant = plant;
  }

  createPlantAR(){
  }

  update(){

  }
}
