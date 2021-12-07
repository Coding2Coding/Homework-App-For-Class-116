function preload() {
    bunnyNoseFilter = loadImage("https://i.postimg.cc/HL3wz0bC/Remove-background-2.png");
    bunnyEarFilter = loadImage("https://i.postimg.cc/GtTvbZVc/136069-200.png");
}

var noseY = 0;
var noseX = 0;
var leftEarX = 0;
var leftEarY = 0;
var flag = 0;

function bothFilters() {
    flag = 0;
}

function bunnyNoseFilter() {
    flag = 1;
}

function bunnyEarFilter() {
    flag = 2;
}

function setup() {
    canvas = createCanvas(400, 400);
    canvas.position(570, 320);
    camera = createCapture(VIDEO);
    camera.size(400, 400);
    camera.hide();
    poseNet = ml5.poseNet(camera, modelLoaded);
    poseNet.on('pose', poses);
}

function draw() {
    image(camera, 0, 0, 400, 400);
    if(flag == 0) {
        image(bunnyNoseFilter, noseX - 30, noseY - 30, 70, 70);
        image(bunnyEarFilter, leftEarX - 120, leftEarY - 120, 140, 70);
    }
    if(flag == 1) {
        image(bunnyNoseFilter, noseX - 30, noseY - 30, 70, 70);
    }
    if(flag == 2) {
        image(bunnyEarFilter, leftEarX - 120, leftEarY - 120, 140, 70);
    }
}

function takePicture() {
    save("picture.png");
}

function modelLoaded() {
    console.log("inside modelLoaded function");
}

function poses(results) {
    if(results.length > 0) {
        console.log(results);
        console.log("Nose X Coordinate: " + results[0].pose.nose.x);
        console.log("Nose Y Coordinate: " + results[0].pose.nose.y);
        console.log("Left Ear X Coordinate: " + results[0].pose.leftEar.x);
        console.log("Left Ear Y Coordinate: " + results[0].pose.leftEar.y);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        leftEarX = results[0].pose.leftEar.x;
        leftEarY = results[0].pose.leftEar.y;
    }
}