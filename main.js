song="";
leftWristX=0;
rightWristX=0;
leftWristY=0;
rightWristY=0;
leftWristScore=0
rightWristScore=0

function preload(){
song=loadSound("music.mp3");
}


function setup(){
    canvas=createCanvas(600,500)
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded)
    posenet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log("Posenet Is Initialized")
}
function draw(){
    image(video,0,0,600,500);
    fill("red");
    stroke("black");
    if(rightWristScore>0.02){
    circle(rightWristX,rightWristY,20)
    if(rightWristY>0 && rightWristY<=100){
        document.getElementById("speed").innerHTML="Speed=0.5x";
        song.rate(0.5);
    }
    else if(rightWristY>100 && rightWristY<=200){
        document.getElementById("speed").innerHTML="Speed=1x";
        song.rate(1);
    }
    else if(rightWristY>200 && rightWristY<=300){
        document.getElementById("speed").innerHTML="Speed=1.5x";
        song.rate(1.5);
    }
    else if(rightWristY>300 && rightWristY<=400){
        document.getElementById("speed").innerHTML="Speed=2x";
        song.rate(2);
    }
    else if(rightWristY>400 && rightWristY<=500){
        document.getElementById("speed").innerHTML="Speed=2.5x";
        song.rate(2.5);
    }
    }
    if(leftWristScore>0.02){
    circle(leftWristX,leftWristY,20);
    numberleftWristY=Number(leftWristY);
    removeDcimal=floor(numberleftWristY);
    volume=removeDecimal/500;
    document.getElementById("volume1").innerHTML=" volume= "+volume;
    song.setVolume(volume); 
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        rightWristX=results[0].pose.rightWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("leftWristX= "+leftWristX+" leftWristY= "+leftWristY);
        console.log("rightWristX= "+rightWristX+" rightWristY= "+rightWristY);
        leftWristScore=results[0].pose.keypoints[9].score;
        righttWristScore=results[0].pose.keypoints[10].score;
        console.log("leftWristScores= "+leftWristScore+" RighttWristScores= "+righttWristScore);
      }
}