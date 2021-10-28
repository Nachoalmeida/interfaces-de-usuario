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

/////////////////DETECCION DE EVENTOS TECLAS////////////////////////////////
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
        timers.clearTimers(); //Elimina los timers que crean las monedas y enemigos
        clearInterval(timer); //Reinicia el timer que chequea que le queden vidas al jugador
    }
});
/////////////////FIN BOTON PAUSA////////////////////////////////

/////////////////BOTON REINICIAR////////////////////////////////
buttonRestart.addEventListener('click', () => { //Si se cliquea el boton "Restart"
    buttonRestart.classList.remove('btnTrue'); //Quita el boton "Restart"
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
/////////////////FIN BOTON REINICIAR////////////////////////////////

/////////////////METODOS CONTROL GENERAL DEL JUEGO////////////////////////////////////
function createBackgrouds() { //Crea el fondo del juego
    backgroundTwo = new Animation(document.createElement("div"), 'id', 'backgroundTwo', 'animationBackgroundTwo');
    backgroundOne = new Animation(document.createElement("div"), 'id', 'backgroundOne', 'animationBackgroundOne');
    gameBoard.removeChild(background.returnDiv()); //Elimina el background del DOM 
    background = new Animation(document.createElement("div"), 'id', 'background', 'animationBackground');
    gameBoard.appendChild(background.returnDiv()); //Inserta el background en el DOM
    background.appendChild(backgroundOne.returnDiv()); //Inserta el backgroundOne en el background
}

function startGame() { //Iniciar Juego
    const value = document.getElementById("select").value; //Obtiene y guarda los datos del personaje seleccionado
    game.startGame(value); //Inicia el juego con el personaje seleccionado
    document.getElementById("divSelect").classList.add('selectTwo'); //Muestra la cantidad de vidas
    document.getElementById("divPoints").classList.add('pointsTwo'); //Muestra la cantidad de monedas recolectadas
    timers.startTimers(game); //Inicia los timers que crean las monedas y enemigos
    startGameTimer(); //Inicia el timer que chequea que le queden vidas al jugador
}

function startGameTimer() { //Chequea en intervalos de tiempo que le queden vidas al jugador
    timer = setInterval(() => {
        if (game.getLifes() > 0) { //Si al jugador le quedan vidas..
            game.gameRun(); //El juego sigue su curso
        } else { //Si no le quedan más vidas..
            gameOver(); //El juego termina
        }
    }, 50);
}

function gameOver() { //Fin del Juego
    game.pauseGame(); //Se pausa el juego
    game.diePlayer(); //El jugador muere y se muestra la animación correspondiente
    document.getElementById("pause").classList.remove('pauseShow'); //Despliega el menu de pausa
    gameOverText.classList.add('gameOverShow'); //Muestra el mensaje "Game Over"
    buttonRestart.classList.add('btnTrue'); //Muestra el boton "Restart"
    buttonPlayStop.style.display = 'none'; //No muestra el boton Play/Pause
    gameOverBoolean = true; //Asigna true para avisar que el juego se cortó por "Game Over"
}