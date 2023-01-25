let cellHeight, cellWidth;
const ROWS = 8;
const COLS = 11;
let grid;
let plantCounter1 = 0, plantCounter2 = 0, plantCounter3 = 0, plantCounter4 = 0;
let plantAR = [];
let sunAR = [];
let bulletAR = [];
let enemyAR= [];
let bulletDAR = [];
let bullet;
let button;
let gamestate = "title";
let buttonAR= [];
let target = 0;
let movePoints = 0;
let previousState = "none";
let tempPlant;
let sometime = 0;
let refund = false;
let sun = 500;
let centerX;
let centerXAR = [];
let enemy; 
let e1; 
let waveDone = true;
let sometime2 = 0;
let wave = 1;


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
  
  target(){//decides what enemy to shoot at and prompts the shoot
    for (let i=0; i<plantAR.length;i++){
      return plantAR[i] === centerXAR[i];
    }
  }
  
  shoot(){//shoots bullet(creates a new bullet sprite)
    if(this.targetX !== 0 || this.targetY !== 0){
      
      if (this.coolDown ===0){
        this.coolDown = this.firespeed;
        bullet = new Bullet(this.x,this.y,this.targetX,this.targetY,this.damage,this.bulletSpeed);
        bullet.sprite.moveTo(this.targetX,this.targetY,this.bulletSpeed);
        bulletAR.push(bullet);
        this.coolDown--;
      }
      else{
        this.coolDown--;
      }
    } 
  }
  
  display(){
    //image(this.imagefile,this.x,this.y)
    this.sprite.x = this.x;
    this.sprite.y = this.y;
    
  }
}

class Bullet{
  constructor(x,y,targetx,targety,damage,bulletSpeed){
    this.x = x;
    this.y = y;
    this.targetx = targetx;
    this.targety = targety;
    this.damage = damage;
    this.bulletSpeed = bulletSpeed;
    this.sprite = new Sprite(this.x,this.y,10,"d");
    
  }
  removeB(){
    this.sprite.remove();
  }
}

class Enemy{
  constructor(x,y,movementSpeed,health,damage){
    this.sprite = new Sprite();
    this.sprite.x = x;
    this.sprite.y = y;
    this.movementSpeed = movementSpeed;
    this.health = health;
    this.damage = damage;
    this.progress = 0;
    this.timer = 0;
    this.sprite.collider = "n";
    this.n = 0;
  }

  move(){
    this.sprite.x -= this.movementSpeed;
  }

  takesDamage(damageTaken){
    this.health-=damageTaken;
  }
}

class Sun{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.r = 30;
    this.speed = random(2,3);
    this.startTime = millis();
    this.fallingTime = random(5000,9000);
  }
  update() {
    if (millis() - this.startTime > this.fallingTime) {
      if (this.y < height - this.r){
        this.y += this.speed;
      }
      
    }
    if (dist(mouseX, mouseY, this.x, this.y) < this.r) {
      for (let i = 0; i < sunAR.length; i++) {
        if (sunAR[i] === this) {
          sun = sun + 25;
          sunAR.splice(i, 1);
          i--;
        }
      }
    }
  }

  display(){
    fill("yellow");
    ellipse(this.x, this.y, this.r * 2, this.r*2);
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  cellHeight = height/ROWS;
  cellWidth = width/COLS;
  grid = create2dArray(COLS, ROWS);
  
  for (let i = 0; i < 2; i++) {
    sunAR.push(new Sun(random(width), random(-height, 0)));
  }
  centerXlocation();
  button = new Button(width/2,height/2,200,100, "lightblue", "blue", "Game","title","Play");//title screen button
  buttonAR.push(button);
  button = new Button(0+0.5*cellWidth,height-0.5*cellHeight,cellWidth,cellHeight,"red","blue","shop","Game","Plants");//open shop button
  buttonAR.push(button);
  button = new Button(windowWidth-0.5*cellWidth,height-0.5*cellHeight,cellWidth,cellHeight,"green","orange","Game","shop","back");//back
  buttonAR.push(button);
  button = new Button(0+0.5*cellWidth,0+cellHeight*0.5,cellWidth,cellHeight,"blue","red","plant1","shop","Sunflower");//buy Plant 1
  buttonAR.push(button);
  button = new Button(1.5*cellWidth,0+cellHeight*0.5,cellWidth,cellHeight,"blue","red","plant2","shop","Peashooter");//buy Plant 2
  buttonAR.push(button);
  button = new Button(2.5*cellWidth,0+cellHeight*0.5,cellWidth,cellHeight,"blue","red","plant3","shop","Walnut");//buy Plant 3
  buttonAR.push(button);
  button = new Button(3.5*cellWidth,0+cellHeight*0.5,cellWidth,cellHeight,"blue","red","plant4","shop","Repeater");//buy Plant 4
  buttonAR.push(button);
}

function addMoreSun(){
  if(sunAR.length < 3) {
    sunAR.push(new Sun(random(width), random(-height, 0)));
  }
}

function updateSun(){
  for (let i=0; i<sunAR.length;i++){
    sunAR[i].display();
    sunAR[i].update();
  }
  addMoreSun();
}

function draw() { 
  
  background(220);
  clear();
  displayGrid(grid);
  buttonsupdate();

  if (gamestate === "Game"){
    update();
    makeWave();
    updateSun();
    spawnWaves();
    
  }
  else if(gamestate === "Plants"){
    update();
    displayPlant();
  }
  else if( gamestate[2] ==="a"){
    checkPlant();
  }
  else{
    turnOffGame();
  }
  if (gamestate !== "title" && gamestate !== "end"){
    displaysun();
  }
  previousState = gamestate;
}


function placePlant(){
  for (let i=0; i<plantAR.length; i++){
    let gridX = Math.floor(plantAR[i].x / cellWidth);
    let gridY = Math.floor(plantAR[i].y / cellHeight);
    if (grid[gridY][gridX] === "a"){
      grid[gridY][gridX] = plantAR[i].id;
      plantAR[i].x = gridX * (width / grid[0].length) + width / grid[0].length / 2;
      plantAR[i].y = gridY * (height / grid.length) + height / grid.length / 2;
    }
    else if (grid[gridY][gridX] !== "a" && grid[gridY][gridX] !== plantAR[i].id) {
      console.log("yes");
      plantAR[i].sprite.remove();
      plantAR.splice(i, 1);
      i--;
      
    }
  }
}

function create2dArray(COLS, ROWS) {
  let emptyArray = [];
  for (let i = 0; i < ROWS; i++) {
    emptyArray[i] = Array(COLS);
    for (let j = 0; j < COLS; j++) {
      if (i === 0 || i === ROWS-1) {
        emptyArray[i][j] = "b";
      } 
      else {
        emptyArray[i][j] = "a";
      }
    }
  }
  return emptyArray;
}

function centerXlocation(){
  for (let y = 0; y < ROWS; y++) {
    centerX = y * cellHeight + cellWidth / 2;
    centerXAR.push(centerX);
  }
  centerXAR.pop();
  centerXAR.shift();
}

function displayGrid(grid){
  for (let y=0; y<ROWS; y++){
    for (let x=0; x <COLS; x++){
      if (grid[y][x] === "a"){
        fill(0,150,0,255);
        rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      }
      else if(grid[y][x] ==="b"){
        fill("lightblue");
        rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      }
      else if (grid[y][x] !== -1){
        fill("grey");
        rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      }
    }
  }
}

function update(){
  
  for (let i = plantAR.length-1; i>=0; i--){ // Plant shooting
    plantAR[i].sprite.visible = true;
    plantAR[i].display();
    plantAR[i].target();
    plantAR[i].shoot();
  } 

  for (let j = enemyAR.length-1; j >= 0; j--){
    for (let i = bulletAR.length-1; i >=0; i--){ // bullets
      if(bulletAR[i].sprite.overlaps(enemyAR[j].sprite)){
        enemyAR[j].takesDamage(bulletAR[i].damage);
        bulletAR[i].sprite.remove();
        bulletAR.splice(i,1);
      }
    }
  }

  for (let i = enemyAR.length-1; i >= 0; i--){ // enemy death & movement BUT IT WON'T MOVE
    enemyAR[i].sprite.visible = true;
    if(enemyAR[i].health <= 0){
      console.log("yes");
      enemyAR[i].move();
      enemyAR[i].sprite.remove();
      enemyAR.splice(i,1);
      
    }  
    
  }

  for (let i = bulletAR.length-1; i >=0; i--){ // bullet removing
    if (bulletAR[i].sprite.x === bulletAR[i].targetx && bulletAR[i].sprite.y === bulletAR[i].targety){
      bulletAR[i].sprite.remove();
      bulletAR.splice(i,1);
    }
  }
  
}

function turnOffGame(){
  for (let i = enemyAR.length-1; i >= 0; i--){
    enemyAR[i].sprite.visible = false;
  }
  for (let i = plantAR.length-1; i >= 0; i --){
    plantAR[i].sprite.visible = false;
  }
  for (let i = bulletAR.length-1; i >=0; i--){ // bullet removing
    if (bulletAR[i].sprite.x === bulletAR[i].targetx && bulletAR[i].sprite.y === bulletAR[i].targety){
      bulletAR[i].sprite.remove();
      bulletAR.splice(i,1);
    }
  }
}

let pathCollide = false;
function displayPlant(){
  tempPlant.x = mouseX;
  tempPlant.y = mouseY;
  tempPlant.display();
  

}

function mousePressed(){
  console.log(mouseX, mouseY);
  if (gamestate === "Plants"){
    if(sun >= tempPlant.price){
      sun -= tempPlant.price;
      plantAR.push(tempPlant);
      placePlant();
      tempPlant = "none";
      gamestate = "Game";    
    }
  }

  for(let i = buttonAR.length-1; i >= 0; i --){
    buttonAR[i].clicked();
  }
}


class Button{
  constructor(x,y,width,height,color1,color2,state,display,text){
    this.x = x-width/2;
    this.y = y-height/2;
    this.width = width;
    this.height = height;
    this.color1 = color1;
    this.color2 = color2;
    this.state = state;
    this.displayState = display;
    this.text = text;
  }

  display(){
    if (gamestate === this.displayState){
      if (mouseX > this.x && mouseX < this.x +this.width && mouseY > this.y && mouseY < this.y + this.height){
        fill(this.color1);
      }
      else {
        fill(this.color2);
      }
      rect(this.x,this.y,this.width,this.height);
      fill("black");
      textSize(20);
      text(this.text,this.x+this.width/2-textWidth(this.text)/2,this.y+this.height/2);
    }
  }

  clicked(){
    if (gamestate === this.displayState){
      if (mouseX > this.x && mouseX < this.x +this.width && mouseY > this.y && mouseY < this.y + this.height && mouseIsPressed){
        gamestate = this.state;
      }
    }
  }
}

function buttonsupdate(){
  for(let i = buttonAR.length-1; i >= 0; i --){
    buttonAR[i].display();
  }
}


function displaysun(){
  fill(255);
  textSize(32);
  rect(windowWidth-textWidth(sun)-70,0,textWidth(sun)+75,75);
  stroke(0);
  fill(0);
  textSize(8);
  textSize(32);
  text(sun, width-textWidth(sun)-60, 35);
  text("Sun" ,width-textWidth(sun)-60, 65);
  fill("white"); 
}

function checkPlant(){
  if(gamestate === "plant1"){// Sunflower
    if (sun >= 50){
      tempPlant = new Plant(mouseX,mouseY, 15, 50, 8,20,400,"blue");
      tempPlant.id = plantCounter1++;
      gamestate = "Plants";
    }
    else{
      gamestate = "shop";
    }
  }
  else if (gamestate === "plant2"){// Peashooter
    if(sun >=100){
      tempPlant = new Plant(mouseX,mouseY,20, 100, 10, 25,500,"green");
      tempPlant.id = "a" + plantCounter2++;
      gamestate = "Plants";
    }
    else{
      gamestate = "shop";
    }
  }
  else if (gamestate === "plant3"){// Walnut
    if (sun >= 50){
      tempPlant = new Plant(mouseX,mouseY,50,50,8,10,500,"red");
      tempPlant.id = "b" + plantCounter3++;
      gamestate = "Plants";
    }
    else{
      gamestate = "shop";
    }
  }
  else if(gamestate === "plant4"){// Double peashooter
    if(sun >= 200){
      tempPlant = new Plant(mouseX,mouseY, 5,200,12,5,500,"orange");
      tempPlant.id = "c" + plantCounter4++;
      gamestate = "Plants";
    }
    else{
      gamestate = "shop";
    }
  }
}

function makeWave(){
  if (gamestate === "Game" && waveDone){
    if (wave ===1){
      createWaves(10);
    }
  }
}

function createWaves(en1){
  e1 = en1; 
  waveDone = false;
}


function spawnWaves(){
  if (millis() - sometime2 > 800){
    console.log("yes");
    sometime2 = millis();
    if (e1 > 0){
      enemy = new Enemy(windowWidth,random(centerXAR),2,50,5,50);//basic enemy
      enemyAR.push(enemy);
      e1--;
    }
  }
}

function winScreen(){
  text("YOU WIN!", width/2, height/2);
}
