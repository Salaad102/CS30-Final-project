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
// if sound is not playing play sound
// History printing press, 

let PlantPlaced = false; let plantType; let removingPlant;
let peaPlantCreated = false, walnutCreated = false, shovelCreated = false;
let gameState = "Menu";
let grid;
const ROWS = 8;
const COLS = 11;
let cellHeight;
let cellWidth;
let lawnIMG, concreteIMG;
let shopButton, startButton, backShopButton, peaPlantButton, sunflowerPlantButton, walnutPlantButton, instructionsbutton;
let peaPlant, walnut;
let plantAR;
let tempPlant;
let peaPlantAR = [], walnutAR = [];
let zombieAR =[];
let buttonAR = [], button;
let shovelButton, shovel;
let placePlant;
let zombie, zombieCreated = false;

function preload(){
  lawnIMG = loadImage("grass.png");
  concreteIMG = loadImage("stone.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellHeight = height/ROWS;
  cellWidth = width/COLS;
  grid = create2dArray(COLS, ROWS);
  button = new Button(width/2, height/2 + height/4, 150, 300, "black", "grey", "Menu", "Rules", CENTER); // instructions
  buttonAR.push(button);
  button = new Button(width/2, height/2, 200, 400, "black", "grey", "Menu", "Game", CENTER); // start
  buttonAR.push(button);
  button = new Button(0, height - 200, 200, 200, "white", "black", "Game", "Shop", CORNER); // shop
  buttonAR.push(button);
  button = new Button(width - 200, height - 200, 200, 200, "green", "red", "Shop", "Game", CORNER); // back
  buttonAR.push(button);
  button = new Button(width/2, height/2, 150, 150, "purple", "orange", "Shop", "plant1", CENTER); // peaplant
  buttonAR.push(button);
  button = new Button(width/4, height/2, 150, 150, "purple", "yellow", "Shop", "plant2", CENTER); // walnut
  buttonAR.push(button);
  button = new Button(width/2 + width/4, height/2, 150, 150, "purple", "blue", "Shop", "shovel", CENTER); //shovel
  buttonAR.push(button);

}

function movePlant(plant, spriteName){
  if (plantType === plant){
    spriteName.x = mouse.x;
    spriteName.y = mouse.y;
  }
}

function draw() {
  rectMode(CORNER);
  console.log(gameState);
  background(220);
  displayGrid(grid);
  buttonsupdate();
  if (gameState[2] === "a"){
    checkPlant();
  }
  if (gameState === "PlacingPlant") {
    movePlant("Pea", peaPlant);
    movePlant("Walnut", walnut);
    movePlant("Shovel", shovel);
  } 
  if (zombieCreated){
    checkObjectInSquare(grid);
  }
}

function create2dArray(COLS, ROWS) {
  let emptyArray = [];
  for (let i = 0; i < ROWS; i++) {
    emptyArray[i] = Array(COLS);
    for (let j = 0; j < COLS; j++) {
      if (i === 0) {
        emptyArray[i][j] = 2;
      } 
      else {
        emptyArray[i][j] = 0;
      }
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
      else if (grid[y][x] === 2){
        fill("lightblue");
        rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      }
    }
  }
}

function keyPressed(){
  if (keyCode === 48){
    zombieCreated = true;
    zombie = new Sprite(windowWidth-1, );
    zombieAR.push(zombie);
    
  }
}

function checkObjectInSquare(grid) {
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      // Check if the object is within the square's boundaries
      if (zombie.x >= x * cellWidth && zombie.x < (x + 1) * cellWidth &&
          zombie.x >= y * cellHeight && zombie.x < (y + 1) * cellHeight) {
        console.log("Object is in square at (" + x + ", " + y + ")");
        return {x:x, y:y};
      }
    }
  }
  console.log("Object is not in any square");
  return {x:-1,y:-1};
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

  clicked(){
    if( gameState === this.state){
      if (this.mouseIsHovering() && mousePressed){
        gameState = this.changeState;
      } 
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

function buttonsupdate(){
  for(let i = buttonAR.length-1; i >= 0; i --){
    buttonAR[i].display();
  }
}

class Plant{
  constructor(x, y, damage, price, bulletSpeed, fireSpeed, health, color){
    this.x = x;
    this.y = y;
    // this.img = theImage;
    this.damage = damage;
    this.price = price;
    this.bulletSpeed = bulletSpeed;
    this.fireSpeed = fireSpeed;
    this.health = health;
    this.color = color;
    this.bulletAR = [];
    this.sprite = new Sprite(this.x, this.y);
    this.sprite.color = this.color;
    this.sprite.collider = "k";
  }

  display(){
    // image(this.img, this.x, this.y);
    this.sprite.x = this.x;
    this.sprite.y = this.y;
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
    circle(this.x, this.y, 10);
    // image(this.img, this.x, this.y);
  }

  update(){
    this.x += this.dx;
    if (this.isHitTarget()){ // make bullet disapear after.
      this.bulletAR.splice(this.bulletAR.indexOf(this), 1);
    }
    if (!this.isOnScreen()){
      this.bulletAR.splice(this.bulletAR.indexOf(this), 1);
    }
  }

  isHitTarget(){
    return this.x >= width; // fix to >= zombie x
  }

  isOnScreen(){
    return this.x > windowWidth;
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

  newZombie(){
    zombie = new Sprite();
    zombieCreated = true;

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

function checkPlant(){
  if (gameState === "plant1"){
    tempPlant = new Plant(mouseX, mouseY, 5, 100, 2, 1.5, 100, "blue");
    gameState = "Plants";

  }
  else{
    gameState = "Game";
  }
}

function mousePressed(){
  if (gameState === "Plants"){
    plantAR.push(tempPlant);
    tempPlant = "NA";
    gameState === "Game";
    console.log("yes");
  }

  for(let i = buttonAR.length-1; i >= 0; i --){
    buttonAR[i].clicked();
  }

  // if (gameState === shovelButton.changeState){
  //   if (shovelButton.mouseIsHovering()){
  //     shovelCreated = true;
  //     shovel = new Sprite(mouseX, mouseY, 50,50);
  //     shovel.shapeColor = color(0,155,155);
  //     shovel.collider = "k";
  //     gameState = "PlacingPlant";
  //     plantType = "Shovel";
  //     removingPlant = true;
  //   }
  // }
  // if (gameState === peaPlantButton.changeState){ // Turn this into an array
  //   if (peaPlantButton.mouseIsHovering()){
  //     peaPlantCreated = true;
  //     peaPlant = new Sprite(mouseX, mouseY, 50, 50); // dragging peaPlant
  //     peaPlant.shapeColor = color(255,0 ,0);
  //     peaPlant.collider = "k";
  //     gameState = "PlacingPlant";
  //     plantType = "Pea";
  //     placePlant = true;
  //     peaPlantAR.push(peaPlant);
  //   }
  // }
  // if (gameState === walnutPlantButton.changeState){
  //   if (walnutPlantButton.mouseIsHovering()){
  //     walnutCreated = true;
  //     walnut = new Sprite(mouseX, mouseY, 50, 50); // dragging walnutPlant
  //     walnut.shapeColor = color(255,255,0);
  //     walnut.collider = "k";
  //     gameState = "PlacingPlant";
  //     plantType = "Walnut";
  //     placePlant = true;
  //     walnutAR.push(walnut);
  //   }
  // }
  


  if(gameState === "PlacingPlant") { // Checks if mouseclicked while in placing plants mode
    PlantPlaced = true;
  }
  if (PlantPlaced){ // When mouse is released, turns gameState back to Game
    gameState = "Game";
    PlantPlaced = false;
  } 
  
  putPlantInGrid(walnut, walnutCreated);
  putPlantInGrid(peaPlant, peaPlantCreated);
  removePlant(shovel);

}



function mouseReleased(){
  //
}

function removePlant(shovel) { // Problem here
  if (shovelCreated){
    let gridX = Math.floor(shovel.x / cellWidth);
    let gridY = Math.floor(shovel.y / cellHeight);
    if (grid[gridY][gridX] === 1) {
      grid[gridY][gridX] = 0;
      checkPlantAR(peaPlantAR);
      checkPlantAR(walnutAR);
      shovelCreated = false;
    }
    shovel.remove();
  }
}

function checkPlantAR(plantAR){
  let gridX = Math.floor(shovel.x / cellWidth);
  let gridY = Math.floor(shovel.y / cellHeight);
  let grid1X = gridX * (width / grid[0].length) + width / grid[0].length / 2;
  let grid1Y = gridY * (height / grid.length) + height / grid.length / 2;
  for (let i=0; i<plantAR.length; i++){
    if (plantAR[i].x === grid1X && plantAR[i].y === grid1Y){
      plantAR[i].remove();
      plantAR.splice(plantAR.indexOf(this), 1);
    }
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
        walnutCreated = false;
        placePlant = false;
        peaPlantCreated = false;
        plantCreatedType = false; // maybe return?
      }
      else if (grid[gridY][gridX] === 1){
        plant.remove();
      }
    }
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
