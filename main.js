const  FIRST_LANE = 0,
  SECOND_LANE = 1,
  THIRD_LANE = 2;
  CANVAS_WIDTH = 450;
  CANVAS_HEIGHT = 700;
  LANE_WIDTH = CANVAS_WIDTH / 3;
  

let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d');

let carSpeed = 2;
let offset= 0 ;
canvas.style.background = "#515151"; 


firstLane = new Lane(LANE_WIDTH)
secondLane = new Lane(LANE_WIDTH *2)

let userCarImage = new Image(),
enemyCarImage = new Image();

userCarImage.src = './images/jeepll3.png'
enemyCarImage.src = './images/trashmaster.png'

let user = {
    lane : SECOND_LANE,
    y : 550,
    imgSrc : userCarImage,
    speed : 0
}

let enemy = {
    lane : Math.floor(Math.random()* 3 - 0),
    y : 30,
    imgSrc : enemyCarImage,
    speed : carSpeed
    
}

class Car {
    constructor(car){        
        this.lane = car.lane;
        this.x = (this.lane + 0.5) * LANE_WIDTH - (54/2)
        this.y = car.y
        this.src = car.imgSrc;
        this.speed= car.speed; 
        
    }

    draw(){
        context.beginPath();
        context.drawImage(this.src , this.x, this.y);
        
    }
    update() {
    this.x = (this.lane + 0.5) * LANE_WIDTH - (54/2)
    this.y += this.speed
    }
}



collisionDetection = () =>{
    if (playercar.y  == ((enemy.y += carSpeed) + 146)&& 
            playercar.lane == enemycar.lane ){
        
        clearInterval(animation)
        clearInterval(continuousFlow)
        
    }
}

document.addEventListener('keydown', (e)=>{
    if (e.key == 'ArrowLeft' ){

        if(playercar.lane > 0){
            playercar.lane -= 1

            playercar.update();
            updateAll();
            
        }
    }

    if (e.key == 'ArrowRight'){
        if (playercar.lane < 2 ){
            playercar.lane += 1
            playercar.update();
            updateAll();
            // console.log(this.y)
            
        }
    }
});

enemyList = [];

let startGame = () => {
    setInterval(() => {
        enemy.speed= carSpeed;
        let enemycar = new Car (enemy)
        enemyList.push(enemycar)
    },2000)
}

let updateScore = (enemyInstance) => {
  if (enemyInstance.y > CANVAS_HEIGHT) {
    
    enemyList.splice(enemyList.indexOf(enemyInstance), 1);
    enemyList.push(new Car(enemy))
  }
}


continuousFlow = setInterval( () => {
    context.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT)
    enemyList.map((eachEnemy, index) => {
        eachEnemy.draw();
        eachEnemy.update(); 
        updateScore(eachEnemy);
    });
  updateAll();
}, 5000)
 

playercar = new Car(user)

enemycar = new Car(enemy)

updateAll= () =>{
    firstLane.draw();
    secondLane.draw(); 
    firstLane.update();
    secondLane.update(); 
    enemycar.update();
    
    
}

let animation = setInterval(()=> {
    context.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT)
    
    updateAll();
    playercar.draw();
    enemycar.draw();
    collisionDetection();
    
    
}, 1000/60)

let init = () => {
    startGame();

}
init()

// updateAll();
