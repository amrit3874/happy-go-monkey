var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime=0;
var monkeyStop;


function preload(){
 
monkey_running =                                       loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkeyStop = loadAnimation("sprite_0.png");
}



function setup() {
  createCanvas(400,400);
  
  monkey=createSprite(80, 315,20,20);
  monkey.addAnimation(" moving",monkey_running);
   monkey.addAnimation("stop", monkeyStop);
  monkey.scale=0.1;
  
  gameState=PLAY;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX= -4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  obstaclesGroup = createGroup();
  FoodGroup = createGroup();
  
   monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  
}


function draw() {
    background(250);
  
     
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  
  if(gameState === PLAY){
  stroke("white");
    textSize(20);
    fill("white");
    text("Score: " + score,500,50);
    
    
     stroke("black");
    textSize(20);
    fill("black"); 
    if(frameCount%10===0){
     survivalTime=Math.round(frameCount/frameRate())
    } //to make the numbers count stable
      text("Survival Time :" +survivalTime,100,50);
    
     
   if(keyDown("space")&&  monkey.y >= 160)  {
         monkey.velocityY = -12;
   }
  monkey.velocityY = monkey.velocityY + 0.8;
 monkey.collide(ground);
  
    if(frameCount%80===0){
      banana=createSprite(420,Math.round(random(120,200)));
      banana.scale=0.1;
      banana.velocityX=-4;
      banana.addImage(bananaImage);
      banana.setLifetime=200;
      FoodGroup.add(banana);
    }
    
      if(frameCount%150===0){
      obstacle=createSprite(420,315,20,20);
      obstacle.addImage(obstacleImage);
      obstacle.scale=0.2
      obstacle.velocityX=-4;
      obstacle.setLifetime=200;
      obstaclesGroup.add(obstacle);
      }
    
      if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
      }
     if(monkey.isTouching(obstaclesGroup)){
       gameState=END;
     }
  }
     else if(gameState === END) { 
   stroke("white");
    textSize(20);
    fill("white");
    text("Score: " + score,500,50);
  
    stroke("black");
    textSize(20);
    fill("black");
    text("Game Over " , 100, 50);
    
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0); 
    monkey.velocityY=0;
    monkey.changeAnimation("stop", monkeyStop);
     }
  drawSprites();


}
 




