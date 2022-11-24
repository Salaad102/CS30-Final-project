// Plants Vs Zombies
// Salaar Ahmed
// November 22, 2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let grid;
const ROWS = 6;
const COLS = 10;
let cellHeight;
let cellWidth;
let lawnIMG, concreteIMG;

function preload(){
  lawnIMG = loadImage("grass.png");
  concreteIMG = loadImage("stone.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellHeight = height/ROWS;
  cellWidth = width/COLS;
}

function draw() {
  background(220);
}

function create2dArray(COLS, ROWS) {
  let emptyArray = [];
  for (let y=0; y<ROWS; y++){
    emptyArray.push([]);
    for (let x=0; x<COLS; x++){
      emptyArray[y].push(0);
    }
    return emptyArray;
  }
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

class Plants {
  constructor(x, y){
    this.x = x;
    this.y = y;
    
  }

  display(){
    //
  }
}
