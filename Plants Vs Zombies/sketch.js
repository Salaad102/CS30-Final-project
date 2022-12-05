// Plants Vs Zombies
// Salaar Ahmed
// November 22, 2022
//
// Ideas:
// - Have the plants in a 2d array
// - Have the zombies act like a mouse detection if in grid?
// - Learn how to use p5.play sprite() function.
// Things to add to Plant constuctor: fireSpeed, bulletSpeed?, 

let state = "Menu";
let grid;
const ROWS = 7;
const COLS = 10;
let cellHeight;
let cellWidth;
let lawnIMG, concreteIMG;
let box1; 

function preload(){
  lawnIMG = loadImage("grass.png");
  concreteIMG = loadImage("stone.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellHeight = height/ROWS;
  cellWidth = width/COLS;
  grid = create2dArray(COLS, ROWS);
  box1 = new Button(width/2, height/2, 200, 200);
  // for (let y=0; y<ROWS; y++){
  //   //
  // } figure out how to make one full row with just 1's 
}

function draw() {
  background(220);
  displayGrid(grid);
  box1.display();
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
  constructor(x, y, height, width){
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
  }

  display(){
    if (this.mouseIsHovering()){
      fill("red");
    }
    else{
      fill("black");
    }
    rect(this.x, this.y, this.width, this.height);
  }

  mouseIsHovering(){
    return mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height;
  }

}

class Plants {
  constructor(x, y, theImage, damage, fireSpeed){
    this.x = x;
    this.y = y;
    this.img = theImage;
    this.damage = damage;
    this.fireSpeed = fireSpeed;
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
}

class Bullet {
  constructor(x, y, dx, theImage,){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.img = theImage;
  }

  display(){
    image(this.img, this.x, this.y);
  }

  update(){
    if (!this.isHitTarget()){ // make bullet disapear after.
      this.x += this.dx;
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

