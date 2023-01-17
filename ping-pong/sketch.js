// Circle shape definition
let xCircle = 100
let yCircle = 100
let diameterCircle = 20
let radius = diameterCircle / 2

// Circle moviment values
let velocityXCircle = 5
let velocitYCircle = 3

// Rect shape definition
let rectWidth = 10
let rectHeight = 80

let velocityP2;

let xRectP1 = 1;
let yRectP1 = 1;
let xRectP2 = 1;
let yRectP2 = 1;


// Score values
let pontosP1 = 0
let pontosP2 = 0

// Colission P2 (lib)
let hitP2 = false

// game sounds
let hitSound;
let point;
let soundTrack;

function preload() {
  hitSound = loadSound("raquetada.mp3")
  point = loadSound("ponto.mp3")
  soundTrack = loadSound("trilha.mp3")
}

function setup() {
  createCanvas(1325, 665);
  soundTrack.loop()
}

function draw() {
  background(0);
  setupCircle();
  setupP1();
  setupP2(false);
  createScore();
}

// Config score game
function createScore() {
  textSize(16)
  textAlign(CENTER)

  // Score p1
  fill(color(255, 140, 0))
  rect(270, 10, 70, 20)
  fill(255)
  text(pontosP1 + " Points", 300, 26)
  
  // Score p2
  fill(color(255, 140, 0))
  rect(970, 10, 70, 20)
  fill(255)
  text(pontosP2 + " Points", 1000, 26)
  
  scoreRegister()
}

// Config ball
function createCircle() {
  circle(xCircle, yCircle, diameterCircle)
}

function setupCircle() {
  createCircle(pontosP1, 200, 200)
  xCircle += velocityXCircle
  yCircle += velocitYCircle
  
  if (yCircle + radius > height || yCircle - radius < 0) {
    velocitYCircle *= -1
  }
}

function scoreRegister() {
  if (xCircle + radius > width || xCircle - radius < 0){
    velocityXCircle *= -1
    if(xCircle + radius > width){
      pontosP1 += 1
      console.log("O player 1 marcou")
    } else {
      pontosP2 += 1
      console.log("O player 2 marcou")
    }
    console.log("Pontuação: " + pontosP1 + " X " + pontosP2)
    point.play()
  }
}

// Config players
function createRect(x, y) {
  rect(x, y, rectWidth, rectHeight);
}

// Config P1
function movimentP1() {
  if(keyIsDown(UP_ARROW)){
    if(yRectP1 > 0) {
      yRectP1 -= 10
    }
  }

  if(keyIsDown(DOWN_ARROW)){
    if(yRectP1 < 600) {
      yRectP1 += 10
    }
  }
}

function verifyColissionP1() {
  if(xCircle - radius < xRectP1 + rectWidth
    && yCircle - radius < yRectP1 + rectHeight
    && yCircle + radius > yRectP1){
      velocityXCircle *= -1
      hitSound.play()
  }
}

function setupP1() {
  createRect(xRectP1, yRectP1)
  movimentP1()
  verifyColissionP1()
}

// Config P2
function verifyColissionP2() {
  hitP2 = collideRectCircle(xRectP2, yRectP2, rectWidth, rectHeight, xCircle, yCircle, radius)
  if(hitP2 == true) {
    velocityXCircle *= -1
    hitSound.play()
  }
}

function movimentP2() {
    velocityP2 = yCircle - yRectP2 - rectWidth / 2 * 15
    yRectP2 += velocityP2
}

function movimentP2Multiplayer() {
  if(keyIsDown(87)){
    if(yRectP2 > 0) {
      yRectP2 -= 10
    }
  }

  if(keyIsDown(83)){
    if(yRectP2 < 600) {
      yRectP2 += 10
    }
  }
}

function setupP2(multiplayer) {
  xRectP2 = width - 10
  createRect(xRectP2, yRectP2)
  verifyColissionP2()
  if (multiplayer){
    movimentP2()
  } else {
    movimentP2Multiplayer()
  }

}