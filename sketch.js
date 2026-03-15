//Pong

//Vars
let xBall = 300;
let yBall = 200;
let xBallSpeed = 5;
let yBallSpeed = 5;
let diameter = 16;
let radius = diameter / 2;
let ballTail = [];

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
function Reset(){
    xBall = 300;
    yBall = 200;

    let savedXSpeed = xBallSpeed;
    let savedYSpeed = yBallSpeed;
    xBallSpeed = 0;
    yBallSpeed = 0;
    ballTrail = [];

    setTimeout(function(){
        xBallSpeed = -savedXSpeed;
        yBallSpeed = -savedYSpeed;
    }, 1500)
}
function Points(){
  if(xBall + radius > width){
    pPoints += 1;
    Reset();
  } else if(xBall - radius < 0){
    ePoints += 1;
    Reset();
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
  ballTail.push({x: xBall, y: yBall})
  if(ballTail.length > 15){
    ballTail.shift();
  }
  for (let i = 0; i < ballTail.length; i++){
    let pos = ballTail[i];
    noStroke();

    let opacity = map(i, 0, ballTail.length, 0, 150);
    let size = map(i, 0, ballTail.length, 0, diameter);

    fill(255, opacity);
    circle(pos.x, pos.y, size);
  }

  fill(255);
  circle(xBall, yBall, diameter);
  xBall += xBallSpeed;
  yBall += yBallSpeed;
  
  if(yBall + radius > height || yBall - radius < 0){
    yBallSpeed *= -1
  }
}

function Player(){
  rect(xPlayer, yPlayer, 7, lenPlayer)
  
  if(keyIsDown(UP_ARROW) || keyIsDown(87)){
    yPlayer -= 4;
  }
  if(keyIsDown(DOWN_ARROW) || keyIsDown(83)){
    yPlayer += 4;
  }
  
  if(yPlayer + lenPlayer > height){
    yPlayer = height - lenPlayer;
  } else if(yPlayer < 0){
    yPlayer = 0;
  }

  if (mouseIsPressed) {

    if (mouseX > 20 && mouseX < 100 && mouseY > height - 130 && mouseY < height - 80) {
      yPlayer -= 6;
    }
    
    if (mouseX > 20 && mouseX < 100 && mouseY > height - 60 && mouseY < height - 10) {
      yPlayer += 6;
    }
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
