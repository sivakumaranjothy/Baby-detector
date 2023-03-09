objectDetector="";
img="";
objects=[];
status="";
percent=0;

function preload(){
 song=loadSound("good.mp3");

}

function setup(){
 canvas=createCanvas(400,400)
 canvas.position(300,300);
 video=createCapture(VIDEO);
 video.size(400,400);
 video.hide();
}
 
function modelLoaded(){
   console.log("modelLoaded")
   status=true;
 
}

   function gotResult(error,results){
       if(error){
           console.log(error);
       }
       console.log(results);
       objects=results;
   }         

   function draw(){
       image(video,0,0,400,400);

       if(status!=""){
           objectDetector.detect(video,gotResult);
           for(i=0;i<objects.length;i++){
           document.getElementById("status").innerHTML="Status: Object Detected";
           fill("black");
           percent=floor(objects[i].confidence*100);
           text(objects[i].label+" "+percent+" %",objects[i].x,objects[i].y);
           noFill();
           stroke("black");
           rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)

           if(objects[i].label=="person"){
            song.stop();
            document.getElementById("status").innerHTML="Baby is found";
           }
           else{
            song.play();
            document.getElementById("status").innerHTML="Baby is not found";
           }
          }
       }

      
   }
    function start(){
        objectDetector=ml5.objectDetector('cocossd' , modelLoaded);
        document.getElementById("status").innerHTML="status: Detecting Objects";
    }