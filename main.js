status1 = "";
objectDetector = "";
object_to_find = "";

function preload()
{

}

function setup()
{
    video = createCapture(VIDEO);
    video.hide();
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw()
{
    image(video, 0, 0, 480, 380);
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_to_find = document.getElementById("object").value;
    console.log(object_to_find);
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status1 = true;
}