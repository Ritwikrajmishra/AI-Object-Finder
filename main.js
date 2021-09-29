status1 = "";
objectDetector = "";
object_name = "";
objects = [];

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
    if(status1 != "")
        {
            objectDetector.detect(video, gotResults);
            for (i = 0; i < objects.length; i++)
            {
                if(objects[i].label == object_name)
                {
                    objectDetector.detect(gotResults);
                    document.getElementById("status").innerHTML = "Status : Objects detected";
                    document.getElementById("found_or_not_found").innerHTML = object_name + " found";
                

                    fill('#FF0000');
                    percent = floor(objects[i].confidence * 100);
                    text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
                    noFill();
                    stroke('#FF0000');
                    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

                    synth = window.speechSynthesis;
                    speak_data = object_name + "found";

                    utterThis = new SpeechSynthesisUtterance(speak_data);
                    synth.speak(utterThis);
                }

                else
                {
                    document.getElementById("status").innerHTML = "Status : Objects detected";
                    document.getElementById("found_or_not_found").innerHTML = object_name + " not found";
                    
                    synth = window.speechSynthesis;
                    speak_data = object_name + "not found";

                    utterThis = new SpeechSynthesisUtterance(speak_data);
                    synth.speak(utterThis);
                }
            }
        }
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("object").value;
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status1 = true;
}

function gotResults(error, results)
{
    if(error) 
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}