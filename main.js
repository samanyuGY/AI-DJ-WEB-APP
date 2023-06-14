song1 = "";
song2 = "";
leftWristX = 0;
leftWristy = 0;
rightWristX = 0;
rightWristy = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() {
    song1 = loadSound("music1.mp3")
    song2 = loadSound("music2.mp3")
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results)
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreRightWrist + "scoreLeftsWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function draw() {
    image(video, 0, 0, 600, 500)

    fill("#FF0000");
    stroke("#FF0000");

    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        song1.stop();
        song1.play();
        song1.setVolume(1);
        song1.rate(1);
    }

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        song2.stop();
        song2.play();
        song2.setVolume(1);
        song2.rate(1);
    }
}

function play() {
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
    song2.play();
    song2.setVolume(1);
    song2.rate(1);
}

function stop() {
    song1.stop()
    song2.stop()
}