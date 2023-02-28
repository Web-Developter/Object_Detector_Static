status = "";
objects = [];
img = "";

function preload(){
    img = loadImage('dog_cat.jpg');
}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    object_detected = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function draw(){
    image(img, 0, 0, 640, 420);
    if(status != ""){
        for(var i = 0;i<objects.length;i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";

            fill('#FFFF00');
            percent = floor(objects[i].confidence * 100);
            textSize(20);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 20);
            noFill();
            stroke('#FFFF00');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
    object_detected.detect(img, gotResult);
}

function gotResult(error, results){
    if(error)
    {console.log(error);}
    else{
    console.log(results);
    objects = results;
}
}
