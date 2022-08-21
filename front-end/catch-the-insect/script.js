canvas = document.querySelector("canvas");
ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

const start = document.querySelector("#start");
const startdiv = document.querySelector(".start");
const score = document.querySelector("#score");
const time = document.querySelector("#time");
const scorecard = document.querySelector(".scorecard");
const finalscore = document.querySelector("#finalscore");
const tryagain = document.querySelector("#tryagain");
var points = 0;
var seconds = 30;

var gamerunning = false;

function gamestart(){
    setTimeout(()=>{
        gameover();
        console.log(gameover);
    },30000)
    score.style.display = "block";
    time.style.display = "block";
    scorecard.style.display = "none";
    startdiv.style.display = "none";
    points = 0;
    gamerunning = true;
    score.innerHTML = `score : 0`;
}

function gameover(){
    score.style.display = "none";
    scorecard.style.display = "flex";
    finalscore.innerHTML = `score : ${points}`;
    gamerunning = false;
    seconds = 30;
}

start.addEventListener("click", ()=> {
    gamestart();    
});

tryagain.addEventListener("click", ()=> {
    gamestart(); 
});


class point {
    constructor(){
        this.x = Math.floor(20 + Math.random() * (innerWidth-20));
        this.y = Math.floor(20 + Math.random() * (innerHeight-20));
        this.radius  = 20;
    }
    draw(){
        var spyder = new Image();
        spyder.src = "spyder.png";
        ctx.drawImage(spyder, this.x-20, this.y-20, 40, 40);
    }
}

point = new point();
    
setInterval(() => {
    if(gamerunning){
        seconds = seconds - 1;
        time.innerHTML = `time : ${seconds}`;
    }    
}, 1000);


setInterval(()=>{
if(gamerunning){
    ctx.clearRect(0, 0, canvas.width, innerHeight);
    point.draw();
}
},1000/60);

canvas.addEventListener("click", (e)=>{
    if(e.clientX > point.x - point.radius && e.clientX < point.x + point.radius && e.clientY > point.y - point.radius && e.clientY < point.y + point.radius){
        points++;
        score.innerHTML = `score : ${points}`;
        point.x = Math.floor(20 + Math.random() * (innerWidth-20));
        point.y = Math.floor(20 + Math.random() * (innerHeight-20));
    }
});