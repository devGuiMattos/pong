//Pong

//Vars
let xBall = 300;
let yBall = 200;
let xBallSpeed = 5;
let yBallSpeed = 5;
let diameter = 16;
let radius = diameter / 2;

let xPlayer = 10;
let yPlayer = 200;
let lenPlayer = 90;
let pPoints = 0;

let xEnemy = 580;
let yEnemy = 145;
let lenEnemy = lenPlayer;
let ePoints = 0;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  Ball();
  Player();
  Enemy();
  VerifyCollision();
  Points();
}

function Points(){
  if(xBall + radius > width){
    pPoints += 1;
  } else if(xBall - radius < 0){
    ePoints += 1;
  }
  text(pPoints, 250, 50);
  text(ePoints, 350, 50);
  fill(255)
  textSize(32);
}
function VerifyCollision() {
  if (xBall - radius < xPlayer + 7 && 
      yBall > yPlayer && 
      yBall < yPlayer + lenPlayer) {
    xBallSpeed *= -1;
    xBall = xPlayer + 7 + radius;
  }

  if (xBall + radius > xEnemy && 
      yBall > yEnemy && 
      yBall < yEnemy + lenEnemy) {
    xBallSpeed *= -1;
    xBall = xEnemy - radius;
  }
}

function Ball(){
  circle(xBall, yBall, diameter);
  xBall += xBallSpeed;
  yBall += yBallSpeed;
  
  if(xBall + radius > width || xBall - radius < 0){
    xBallSpeed *= -1
  }
  if(yBall + radius > height || yBall - radius < 0){
    yBallSpeed *= -1
  }
}

function Player(){
  rect(xPlayer, yPlayer, 7, lenPlayer)
  
  if(keyIsDown(UP_ARROW)){
    yPlayer -= 4;
  }
  if(keyIsDown(DOWN_ARROW)){
    yPlayer += 4;
  }
  
  if(yPlayer + lenPlayer > height){
    yPlayer = height - lenPlayer;
  } else if(yPlayer < 0){
    yPlayer = 0;
  }
}

function Enemy(){
  rect(xEnemy, yEnemy, 7, lenEnemy)
  let targetY = yBall - lenEnemy / 2;
  let enemySpeed = 4;
  
  if(yEnemy + lenEnemy > height){
    yEnemy = height - lenEnemy;
  } else if(yEnemy < 0){
    yEnemy = 0;
  }
  
  if (yEnemy < targetY) {
    yEnemy += enemySpeed;
  } else {
    yEnemy -= enemySpeed;
  }
}
