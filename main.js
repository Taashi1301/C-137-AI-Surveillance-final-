status="";
video="";
objects=[];
function preload(){
video=createVideo("video.mp4");
video.size(400,400);
video.hide();
}

function setup(){
canvas=createCanvas(400,400);
canvas.position(500, 200);
}

function draw(){
    image(video,0,0,400,400);
    if (status !=""){
        objectdetector.detect(video, gotResults);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Objects Detected";
            document.getElementById("objectsdetected").innerHTML="Number of objects detected: "+objects.length;
            fill(255,0,0);
            stroke(255,0,0);
            percent=floor(objects[0].confidence*100)+" %";
            text(objects[0].label+percent, objects[0].x+15, objects[0].y+15);
            noFill();
            stroke(255,0,0);
            rect(objects[0].x, objects[0].y, objects[0].width, objects[0].height);
        }
    }
}

function modelLoaded(){
    console.log("Model has been loaded");
    status=true;
    video.loop();
    video.volume(0);
    video.speed(1);
}

function start(){
    objectdetector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Detecting objects";
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}