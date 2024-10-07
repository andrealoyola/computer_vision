// Classifier Variable
let classifier;
// Model URL
let imageModelURL = "https://teachablemachine.withgoogle.com/models/YYN2ug-bE/";

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let confianza = 0;

//Pacman
let pacmanX;
let pacmanY;
let pacmanSize = 100;
let pacmanSpeed = 4;
let bolitaX;
let bolitaY;
let bolitaSize = 15;
let bolitaVisible = true;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
}

function setup() {
  createCanvas(540, 480); //se puede modificar a windowWidth y windowHeight
  // Create the video
  video = createCapture(VIDEO);
  video.size(540, 460); // se puede poner mismas dimensiones que el canvas
  video.hide();

  //flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();

  pacmanX = width / 2 - 120;
  pacmanY = height / 2;
  bolitaX = width / 2;
  bolitaY = height / 2;
}

function draw() {
  background(200, 100, 0);
  // Draw the video
  image(video, 0, 0);

  // Draw the label
  fill(255); //relleno texto
  noStroke();
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);

  noStroke();
  textAlign(LEFT);
  textSize(8);
  text(confianza, 10, height - 4);

  if (label == "crema") {
    filter(BLUR, 5);
    background(0, 98);
    noStroke();
    fill(255, 255, 0);
    let biteSize = PI / 14;
    let startAngle = biteSize * sin(frameCount * 0.1) + biteSize;
    let endAngle = TWO_PI - startAngle;
    arc(pacmanX + 50, pacmanY, 25, 25, startAngle, endAngle, PIE);

    if (bolitaVisible) {
      fill(255, 0, 100);
      ellipse(bolitaX, bolitaY, bolitaSize);
    }

    if (keyIsDown(LEFT_ARROW)) {
      pacmanX -= pacmanSpeed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      pacmanX += pacmanSpeed;
    }
    if (keyIsDown(UP_ARROW)) {
      pacmanY -= pacmanSpeed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      pacmanY += pacmanSpeed;
    }

    if (bolitaVisible && pacmanX + 58 > bolitaX) {
      bolitaVisible = false;
    }

    fill(240, 150, 80);
    noStroke();
    //horizontales
    circle(bolitaX + 100, 240, 13);
    circle(bolitaX + 200, 240, 13);
    circle(bolitaX + 200, 150, 13);
    circle(bolitaX + 200, 330, 13);
    circle(bolitaX + 100, 60, 13);
    circle(bolitaX + 200, 60, 13);
    circle(bolitaX - 90, 60, 13);
    circle(bolitaX - 180, 150, 13);
    circle(bolitaX - 180, 330, 13);
    circle(bolitaX - 90, 420, 13);
    circle(bolitaX, 60, 13);
    circle(bolitaX, 420, 13);
    circle(bolitaX + 100, 420, 13);
    circle(bolitaX + 200, 420, 13);
    circle(bolitaX - 180, 60, 13);
    circle(bolitaX - 180, 420, 13);

    fill(0, 25, 250);
    noStroke();
    //laberinto
    //verticales
    rect(20, 20, 4, 200);
    rect(20, 260, 4, 190);
    rect(520, 20, 4, 200);
    rect(520, 260, 4, 190);
    //horizontales
    rect(20, 20, 500, 4);
    rect(20, 450, 504, 4);
  }

  if (label == "perfume") {
    filter(GRAY);
    background(0, 25);
    rect(122, 260, 341, 4);
    // texto
    fill(255);
    textSize(40);
    textStyle(BOLD);
    textStyle(CENTER);
    text("Waka, waka, waka", 120, 250);

    textSize(30);
    textStyle(NORMAL);

    text("- Pac man", 320, 300);
  }
}

// Get a prediction for the current video frame
function classifyVideo() {
  //flippedVideo = ml5.flipImage(video);
  classifier.classify(video, gotResult);
  //flippedVideo.remove();
}

// When we get a result
function gotResult(results, error) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  confianza = results[0].confidence;
  // Classifiy again!
  classifyVideo();
}
