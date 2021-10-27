"use strict";

const buttonPlayStop = document.getElementById("buttonPlayStop");
const buttonRestart = document.getElementById("btnRestart");

const gameBoard = document.getElementById("game");
const gameOverText = document.getElementById("gameOver"); 
let background = new Animation(document.createElement("div"),'id','background','animationBackground');
let backgroundOne = new Animation(document.createElement("div"),'id','backgroundOne','animationBackgroundOne');
let backgroundTwo = new Animation(document.createElement("div"),'id','backgroundTwo','animationBackgroundTwo');

const timers = new Timers();
let timer = null;

gameBoard.appendChild(background.returnDiv());
background.appendChild(backgroundOne.returnDiv());

const chronometer = document.getElementById("hms");

const spanLife = document.getElementById("lifes");
const spanPoints = document.getElementById("points");

let game = new Game(chronometer,[background,backgroundOne,backgroundTwo],spanLife,spanPoints);

let gameOverBoolean = false;

/////////////////SALTAR////////////////////////////////
document.addEventListener('keydown', (e) => {
    if (game.getGame()) {
        let key = e.key;
        game.doneEvent(key);
    }
});

/////////////////BOTON PAUSA////////////////////////////////
buttonPlayStop.addEventListener('click', () => {
    const button = buttonPlayStop.classList.toggle("play");
    if (!button) {
        document.getElementById("pause").classList.add('pauseShow');
        buttonRestart.classList.remove('btnTrue');
        if (game.getGame() == null) {
            startGame();
        } else {
            game.unPauseGame();
            timers.startTimers(game);
            startGameTimer();
        }
    } else {
        document.getElementById("pause").classList.remove('pauseShow');
        buttonRestart.classList.add('btnTrue');
        game.pauseGame();
        timers.clearTimers();
        clearInterval(timer);
    }
});

/////////////////BOTON REINICIAR////////////////////////////////
buttonRestart.addEventListener('click', () => {
    buttonRestart.classList.remove('btnTrue');
    document.getElementById("divSelect").classList.remove('selectTwo');
    document.getElementById("divPoints").classList.remove('pointsTwo');
    createBackgrouds();
    game = new Game(chronometer,[background,backgroundOne,backgroundTwo],spanLife,spanPoints);
    if(gameOverBoolean){
        buttonPlayStop.style.display = 'block';
        gameOverText.classList.remove('gameOverShow');
        gameOverBoolean = false;
    }
});

function createBackgrouds(){
    backgroundTwo = new Animation(document.createElement("div"),'id','backgroundTwo','animationBackgroundTwo');
    backgroundOne = new Animation(document.createElement("div"),'id','backgroundOne','animationBackgroundOne');
    gameBoard.removeChild(background.returnDiv());
    background = new Animation(document.createElement("div"),'id','background','animationBackground');
    gameBoard.appendChild(background.returnDiv());
    background.appendChild(backgroundOne.returnDiv());
}

/////////////////////////////CREAR ENEMIGOS////////////////////////////////////
function startGame() {
    const value = document.getElementById("select").value;
    game.startGame(value);
    document.getElementById("divSelect").classList.add('selectTwo');
    document.getElementById("divPoints").classList.add('pointsTwo');
    timers.startTimers(game);
    startGameTimer();
}

function startGameTimer(){
    timer = setInterval(() => {
        if(game.getLifes() > 0){
            game.gameRun();
        }else {
            gameOver();
        }
    }, 50);
}

function gameOver(){
    game.pauseGame();
    game.diePlayer();
    document.getElementById("pause").classList.remove('pauseShow');
    gameOverText.classList.add('gameOverShow');
    buttonRestart.classList.add('btnTrue');
    buttonPlayStop.classList.toggle("play");
    buttonPlayStop.style.display = 'none';
    gameOverBoolean = true;
}