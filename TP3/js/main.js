"use strict";

const buttonPlayStop = document.getElementById("buttonPlayStop");
const player = new Player(document.getElementById("player"));
const cat = new Player(document.getElementById("cat"));
const enemys = [
    new Character(document.getElementById("bear")),
    new Character(document.getElementById("bird"))
];

const background = new Animation(document.getElementById("background"));
const backgroundOne = new Animation(document.getElementById("backgroundOne"));
const backgroundTwo = new Animation(document.getElementById("backgroundTwo"));

const coin = new Animation(document.getElementById("coin"));

let game = 0;
pauseGame();
/////////////////SALTAR////////////////////////////////
document.addEventListener('keydown', (e) => {
    if(game){
        let key = e.key;
        if (key === 'ArrowUp' && (player.getJumpDone() && cat.getJumpDone())) {
            player.jump('jumpPlayer');
            cat.jump('jumpCat');
        }
    }
});

/////////////////BOTON PAUSA////////////////////////////////
buttonPlayStop.addEventListener('click', () => {
    const button = buttonPlayStop.classList.toggle("play");
    if (!button) {
        document.getElementById("pause").classList.add('pause2');
        startGame();
    } else {
        document.getElementById("pause").classList.remove('pause2');
        pauseGame();
    }
});

//Variables cronometro.  
let h = 0;
let m = 0;
let s = 0;
let id = null;
document.getElementById("hms").innerHTML = "00:00:00";
//////////////////////

setInterval(()=>{
    collision();
},50);

function collision() {
    for(let i=0; i< enemys.length;i++){
        if (player.getRight() < enemys[i].getRight() + enemys[i].getWidth() && player.getRight() + player.getWidth() > enemys[i].getRight() && player.getTop() < enemys[i].getTop() + enemys[i].getHeight() && player.getTop() + player.getHeight() > enemys[i].getTop()) {
            console.log("colision");
        }
    }
}

function startGame(){
    game = 1;
    player.animationState('running');
    cat.animationState('running');
    enemys[0].animationState('running');
    enemys[1].animationState('running');
    background.animationState('running');
    backgroundOne.animationState('running');
    backgroundTwo.animationState('running');
    coin.animationState('running');
}

function pauseGame(){
    game = 0;
    player.animationState('paused');
    cat.animationState('paused');
    enemys[0].animationState('paused');
    enemys[1].animationState('paused');
    background.animationState('paused');
    backgroundOne.animationState('paused');
    backgroundTwo.animationState('paused');
    coin.animationState('paused');
}   