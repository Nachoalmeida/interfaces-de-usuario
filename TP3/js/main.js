"use strict";

const buttonPlayStop = document.getElementById("buttonPlayStop");
const buttonRestart = document.getElementById("btnRestart");

const gameBoard = document.getElementById("game");
let background = new Animation(document.createElement("div"),'id','background','animationBackground');
let backgroundOne = new Animation(document.createElement("div"),'id','backgroundOne','animationBackgroundOne');
let backgroundTwo = new Animation(document.createElement("div"),'id','backgroundTwo','animationBackgroundTwo');

gameBoard.appendChild(background.returnDiv());
background.appendChild(backgroundOne.returnDiv());

const chronometer = document.getElementById("hms");

const spanLife = document.getElementById("lifes");
const spanPoints = document.getElementById("points");

let game = new Game(chronometer,[background,backgroundOne,backgroundTwo],spanLife,spanPoints);

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
        document.getElementById("pause").classList.add('pause2');
        buttonRestart.classList.remove('btnTrue');
        if (game.getGame() == null) {
            startGame();
        } else {
            game.unPauseGame();
        }
    } else {
        document.getElementById("pause").classList.remove('pause2');
        buttonRestart.classList.add('btnTrue');
        game.pauseGame();
    }
});

/////////////////BOTON REINICIAR////////////////////////////////
buttonRestart.addEventListener('click', () => {
    buttonRestart.classList.remove('btnTrue');
    document.getElementById("divSelect").classList.remove('selectTwo');
    document.getElementById("divPoints").classList.remove('pointsTwo');
    createBackgrouds();
    game = new Game(chronometer,[background,backgroundOne,backgroundTwo],spanLife,spanPoints);
});

function createBackgrouds(){
    backgroundTwo = new Animation(document.createElement("div"),'id','backgroundTwo','animationBackgroundTwo');
    backgroundOne = new Animation(document.createElement("div"),'id','backgroundOne','animationBackgroundOne');
    gameBoard.removeChild(background.returnDiv());
    background = new Animation(document.createElement("div"),'id','background','animationBackground');
    gameBoard.appendChild(background.returnDiv());
    background.appendChild(backgroundOne.returnDiv());
}

////////////////////////////////////////////CREAR ENEMIGOS/////////////////////
function startGame() {
    const value = document.getElementById("select").value;
    game.startGame(value);
    document.getElementById("divSelect").classList.add('selectTwo');
    document.getElementById("divPoints").classList.add('pointsTwo');
}

