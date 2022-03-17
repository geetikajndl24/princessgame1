var bgImage, bg
var score = 0;
var timer = 1000;
var gameState = "play"
var pinkPrincessImage, pinkPrincess
var purplePrincessImage, purplePrincess
var pinkCandyImage, pinkCandy
var purpleCandyImage, purpleCandy
var mixedCandyImage, mixedCandy
var lemonImage, lemon
var pinkGroup, purpleGroup, mixedGroup, lemonsGroup
var candiesGroup, pinkPrincess1, pinkPrincess1Img
var restart, restartImage, restart1



function preload(){
    bgImage=loadImage("images/flower background.jpg")
    pinkCandyImage=loadImage("images/candy1.png")
    purpleCandyImage=loadImage("images/candy2.png")
    mixedCandyImage=loadImage("images/candy3.png")
    pinkPrincessImage=loadImage("images/princess pink copy.png")
    lemonImage=loadImage("images/lemon cartoon.png")
    restartImage=loadImage("images/restart.png")
}

function setup(){
    createCanvas(600, 600)
	bg=createSprite(300,300)
    bg.addImage(bgImage)
    bg.scale = 2
    bg.velocityY =1.5;
    restart1=createSprite(260, 300, 150, 45)
    restart1.addImage("restartPicture",restartImage)
    restart1.scale = 0.2
    
    //pink princess
    pinkPrincess=createSprite(200, 400, 30, 30)
    pinkPrincess.addImage("pinkgirl",pinkPrincessImage)
    pinkPrincess.scale= 1
    
    candiesGroup = new Group(); 
    lemonsGroup = new Group();

}

function draw(){
    background(0)

    if (timer>0)
    {
        timer=timer-1;
    }
       

if(gameState === "play"){
  
    bg.velocityY =1.5;
   if(bg.y>400){
    bg.y=300
}
console.log("correct")

    pinkPrincess.changeImage("pinkgirl")
    pinkPrincess.visible = true
    console.log("visible")
    spawnCandies();
    spawnLemons();

    restart1.visible=false

    if(keyDown("UP_ARROW")){
		pinkPrincess.y -= 10
	}

    if(keyDown("DOWN_ARROW")){
		pinkPrincess.y+= 10
	}

	if(keyDown("LEFT_ARROW")){
		pinkPrincess.x-= 10
	}
	
	if(keyDown("RIGHT_ARROW")){
		pinkPrincess.x += 10
    }
    
   
    console.log(timer)
    console.log("hello")


	if(candiesGroup.isTouching(pinkPrincess)){
		candiesGroup.destroyEach();
		score = score + 2;
        console.log("touch")
	}

    if(lemonsGroup.isTouching(pinkPrincess)){
        lemonsGroup.destroyEach();
        score = score - 2;
    }
} //gamestate play ends

if( timer === 0){
    gameState = "end"
    restart1.visible=true

    bg.velocityY=0;
    pinkPrincess.destroy()
    
    candiesGroup.destroyEach()
    candiesGroup.setLifetimeEach(-1)
    candiesGroup.setVelocityYEach(0)

    lemonsGroup.destroyEach()
    lemonsGroup.setLifetimeEach(-1)
    lemonsGroup.setVelocityYEach(0)

    textSize(70)
    fill("green")
    text("game over", 130,300)
    //console.log("game over")
    if(mousePressedOver(restart1)){
        restart()
    }

}
drawSprites();

textSize(30);
    fill("Red")
    text("Score: " + score, 30, 80)


    text("Time Left: " + timer, 370, 80)
    fill("black")
//draw function bracket

}



function spawnCandies() {
    if(frameCount % 70 === 0) {
      var candy = createSprite(Math.round(random(20, 500)), 
      Math.round(random(20, 400), 10,40));
      //obstacle.debug = true;
      //candy.velocityY = 1
      
      //generate random obstacles
      var rand = Math.round(random(1,4));
      switch(rand) {
        case 1: candy.addImage(pinkCandyImage);
                break;
        case 2: candy.addImage(purpleCandyImage);
                break;
        case 3: candy.addImage(mixedCandyImage);
                break;
       /* case 4: candy.addImage(lemonImage);
                break;
        */
        default: break;
      }
      
      
      pinkPrincess.depth= candy.depth+1
      
      //assign scale and lifetime to the obstacle           
      candy.scale = 0.1;
      candy.lifetime = 700;
      //add each obstacle to the group
      candiesGroup.add(candy);
    }
  }

function spawnLemons(){
    if(frameCount % 100 === 0) {
        var lemon = createSprite(Math.round(random(20, 500)), 
        Math.round(random(20, 400), 10,40));
    
    lemon.addImage(lemonImage)
    lemon.scale = 0.075
    lemonsGroup.add(lemon)
    lemon.lifetime = 700;
}
  }


function restart(){
    pinkPrincess=createSprite(200, 400, 30, 30)
    pinkPrincess.addImage("pinkgirl",pinkPrincessImage)
    pinkPrincess.scale=1
    gameState="play"
    
   
   //pinkPrincess.addImage("pinkgirl",pinkPrincessImage)
   pinkPrincess.visible = true
   score = 0
    timer = 1000
}