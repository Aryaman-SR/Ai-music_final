music1="";
music2="";
music1status="";
music2status="";

scoreleftwrist=0;
scorerightwrist=0;

rightwristx=0;
rightwristy=0;

leftwristx=0;
leftwristy=0;

function preload()
{
   music1 = loadSound("music.mp3");
   music2 = loadSound("music2.mp3")
}

 function setup() 
{ 
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO); 
    video.hide();
    
    posenet=ml5.poseNet(video,modelloaded);
    posenet.on('pose',gotresult);
}

function modelloaded()
{
    console.log("Posenet Is Initialized!!!!!");
}

function gotresult(results)
{
    if(results.length>0)
    {
        console.log(results);
    
        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        console.log('leftwristx='+leftwristx , 'leftwristy='+leftwristy);

        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        console.log('rightwristx='+rightwristx , 'rightwristy='+rightwristy);
    }
}
function draw() 
{ 
    image(video, 0, 0, 600, 500);

    music1status=music1.isPlaying()
    music2status=music2.isPlaying()

    fill('red');
    stroke('red');

    if(scorerightwrist>0.2)
    {
        circle(rightwristx,rightwristy,20)
        music2.stop()
        if(music1status==false)
        {
            music1.play()
        }
    }

    if(scoreleftwrist>0.2)
    {
        circle(leftwristx,lefttwristy,20)
        music1.stop()
        if(music2status==false)
        {
            music2.play()
        }
    }
} 
