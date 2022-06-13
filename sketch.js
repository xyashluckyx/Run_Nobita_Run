var nobita,nobitaImg,nobitaImg2;
var gian,gianImg;
var Background, backgroundImg;
var ground;
var obstacle1Img,obstacle2Img,obstacle3Img
var obstacleGroup1,obstacleGroup2,obstacleGroup3;
var START=1;
var PLAY=2;
var BEATING=3;
var CRY=4;
var gameState=PLAY;
var score=0;
var boom,boom1Img;

function preload(){
backgroundImg=loadImage("images/Nobihouse.png");

nobitaImg=loadAnimation("images/nobita1.png","images/nobita5.png","images/nobita7.png");

nobitaImg2=loadAnimation("images/nobita cry.png");

gianImg=loadAnimation("images/gian 1.png","images/gian 2.png","images/gian 3.png")

obstacle1Img=loadImage("images/obstacle1.png");

obstacle2Img=loadImage("images/obstacle2.png");

obstacle3Img=loadImage("images/suneo.png");

boom1Img=loadAnimation("images/boom.png","images/boom3.png","images/boom2.png");
}

function setup() {
  createCanvas(1300,600);
  Background=createSprite(2820,0,100,10);
  Background.addImage(backgroundImg);
  Background.velocityX=-(15+3*score/100);
  Background.scale=3;

  nobita=createSprite(380,500,10,10);
  nobita.addAnimation("running", nobitaImg);
  nobita.scale=0.25;

  gian=createSprite(100,500,10,10);
  gian.addAnimation("running", gianImg);
  gian.scale=0.5;

  ground=createSprite(650,580,1300,10);
  ground.visible=false;
 
  boom=createSprite(300,400,100,100);
  boom.addAnimation("running",boom1Img);
  boom.scale=0.5
  boom.visible=false;

  boomtime=createSprite(0,400,10,10);
  boomtime.velocityX=0;
  boomtime.visible=false;

  obstacleGroup1=new Group();

  obstacleGroup2=new Group();

  obstacleGroup3=new Group();
 }

function draw() {
  background(0);
  
  if(gameState===PLAY){ 
    gian.visible=true;
    nobita.visible=true;
    score = score + Math.round(getFrameRate()/60);

    camera.position.x=nobita.x+260;
  if(Background.x<-2820){
  Background.x = Background.width+680;
  }

  if(keyDown("space") && nobita.y>=450){
    nobita.velocityY=-42;
  }

  var select_balloon=Math.round(random(1,5));
  console.log(Background.velocityX)

  if(frameCount % 100 == 0)
  {
      if(select_balloon == 1)
      {
        obstacle1();
      } else if(select_balloon == 2)
      {
        obstacle2();
      } else if(select_balloon == 3)
      {
        obstacle3();
      }
}

  if(obstacleGroup1.isTouching(nobita)){
    obstacleGroup1.destroyEach();
    obstacleGroup2.destroyEach();
    obstacleGroup3.destroyEach();
    Background.velocityX=0;
    gameState= BEATING;
  }

  if(obstacleGroup2.isTouching(nobita)){
    obstacleGroup1.destroyEach();
    obstacleGroup2.destroyEach();
    obstacleGroup3.destroyEach();
    Background.velocityX=0;
    gameState= BEATING;
  }

  if(obstacleGroup3.isTouching(nobita)){
    obstacleGroup1.destroyEach();
    obstacleGroup2.destroyEach();
    obstacleGroup3.destroyEach();
    Background.velocityX=0;
    gameState= BEATING;
  }

  if(obstacleGroup1.isTouching(gian)){
    gian.velocityY=-42;
  }

  if(obstacleGroup2.isTouching(gian)){
    gian.velocityY=-42;
  }

  if(obstacleGroup3.isTouching(gian)){
    gian.velocityY=-42;  
  }
}
  gian.velocityY=gian.velocityY+2.4;

  nobita.velocityY=nobita.velocityY+2.4;

  nobita.collide(ground);

  gian.collide(ground);

if(gameState===BEATING){
  gian.visible=false;
  nobita.visible=false;
  boomtime.velocityX=1;
 boom.visible=true;
 if(boomtime.x===50){
  boomtime.x=0;
  boomtime.velocityX=0;
 gameState=CRY;
 }
}

if(gameState===CRY){
  boom.visible=false;
  if(keyDown("r")){
    Background.velocityX=-15;
    score=0;
    gameState=PLAY;
  }
}


  drawSprites();

  textSize(50);
  fill("red");
  text("Score: ", 100,50);
  fill("blue");
  text(score, 260,50);

  
  if(gameState===CRY){
    fill("red");
    text("GAMEOVER",550,300);
    textSize(30);
    fill("red");
    text("Gian beat Nobita and ran away. you can't save the Nobita.....",250,100);
    fill("green");
    text("Press 'R' to restart",550,380);

    
  }

}

function obstacle1(){
  if(frameCount%100===0){
  var pipe=createSprite(1300,550,10,10);
  pipe.addImage(obstacle1Img);
  pipe.scale=0.6;
  pipe.velocityX=-(15+3*score/100);
  pipe.lifetime=260;
  obstacleGroup1.add(pipe);
}
}

function obstacle2(){
  if(frameCount%100===0){
  var car=createSprite(1300,520,10,10);
  car.addImage(obstacle2Img);
  car.scale=0.3;
  car.velocityX=-(15+3*score/100);
  car.lifetime=260;
  obstacleGroup2.add(car);
}
}

function obstacle3(){
  if(frameCount%100===0){
  var suneo=createSprite(1300,480,10,10);
  suneo.addImage(obstacle3Img);
  suneo.scale=0.15;
  suneo.velocityX=-(15+3*score/100);
  suneo.lifetime=260;
  obstacleGroup3.add(suneo);
}
}
