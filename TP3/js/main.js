"use strict";

const buttonPlayStop = document.getElementById("buttonPlayStop");
const buttonRestart = document.getElementById("btnRestart");

const gameBoard = document.getElementById("game"); //DIV que contiene el juego
const gameOverText = document.getElementById("gameOver");
let background = new Animation(document.createElement("div"), 'id', 'background', 'animationBackground');
let backgroundOne = new Animation(document.createElement("div"), 'id', 'backgroundOne', 'animationBackgroundOne');
let backgroundTwo = new Animation(document.createElement("div"), 'id', 'backgroundTwo', 'animationBackgroundTwo');

const timers = new Timers();
let timer = null;

gameBoard.appendChild(background.returnDiv());
background.appendChild(backgroundOne.returnDiv());

const chronometer = document.getElementById("hms");
const spanLife = document.getElementById("lifes");
const spanPoints = document.getElementById("points");

let game = new Game(chronometer, [background, backgroundOne, backgroundTwo], spanLife, spanPoints);
let gameOverBoolean = false;

/////////////////SALTAR////////////////////////////////
document.addEventListener('keydown', (e) => {
    if (game.getGame()) { //Chequea si el juego esta corriendo.
        let key = e.key; //Detecta el evento y obtiene el nombre de la tecla presionada
        game.doneEvent(key);
    }
});

/////////////////BOTON PAUSA////////////////////////////////
buttonPlayStop.addEventListener('click', () => {
    const button = buttonPlayStop.classList.toggle("play"); //Añade o remueve la clase "play" y devuelve un boolean
    if (!button) { //Si es falso implica Despausar el juego
        document.getElementById("pause").classList.add('pauseShow'); //Contrae el menu de pausa
        buttonRestart.classList.remove('btnTrue'); //Quita el boton "restart"
        if (game.getGame() == null) { //si el juego no ha iniciado..
            startGame(); //Inicia el juego
        } else { //Si el juego ya habia iniciado..
            game.unPauseGame(); //Despausa el juego
            timers.startTimers(game); //Inicia los timers que crean las monedas y enemigos
            startGameTimer(); //Inicia el timer que chequea que le queden vidas al jugador
        }
    } else { //Si button=true, implica pausar el juego
        document.getElementById("pause").classList.remove('pauseShow'); //Despliega el menu de pausa
        buttonRestart.classList.add('btnTrue'); //Muestra el boton "restart"
        game.pauseGame(); //Pausa el juego
        timers.clearTimers(); //Reinicia los timers que crean las monedas y enemigos
        clearInterval(timer); //Reinicia el timer que chequea que le queden vidas al jugador
    }
});

/////////////////BOTON REINICIAR////////////////////////////////
buttonRestart.addEventListener('click', () => {
    buttonRestart.classList.remove('btnTrue'); //Quita el boton "restart"
    document.getElementById("divSelect").classList.remove('selectTwo'); //Deja de mostrar la cantidad de vidas
    document.getElementById("divPoints").classList.remove('pointsTwo'); //Deja de mostrar la cantidad de monedas recolectadas
    createBackgrouds(); //Redibuja los fondos
    game = new Game(chronometer, [background, backgroundOne, backgroundTwo], spanLife, spanPoints);
    if (gameOverBoolean) { //Si reinicia por GameOver..
        buttonPlayStop.style.display = 'block'; //Se muestra boton de play
        buttonPlayStop.classList.toggle("play"); ////Añade o remueve la clase "play"
        gameOverText.classList.remove('gameOverShow'); //Deja de mostrar "Game Over"
        gameOverBoolean = false;
    }
});

function createBackgrouds() { //Crea el fondo del juego
    backgroundTwo = new Animation(document.createElement("div"), 'id', 'backgroundTwo', 'animationBackgroundTwo');
    backgroundOne = new Animation(document.createElement("div"), 'id', 'backgroundOne', 'animationBackgroundOne');
    gameBoard.removeChild(background.returnDiv()); //Elimina el background del DOM 
    background = new Animation(document.createElement("div"), 'id', 'background', 'animationBackground');
    gameBoard.appendChild(background.returnDiv()); //Inserta el background en el DOM
    background.appendChild(backgroundOne.returnDiv()); //Inserta el backgroundOne en el background
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

function startGameTimer() {
    timer = setInterval(() => {
        if (game.getLifes() > 0) {
            game.gameRun();
        } else {
            gameOver();
        }
    }, 50);
}

function gameOver() {
    game.pauseGame();
    game.diePlayer();
    document.getElementById("pause").classList.remove('pauseShow');
    gameOverText.classList.add('gameOverShow');
    buttonRestart.classList.add('btnTrue');
    //buttonPlayStop.classList.toggle("play");
    buttonPlayStop.style.display = 'none';
    gameOverBoolean = true;
}