"use strict";

const buttonPlayStop = document.getElementById("buttonPlayStop");

const background = new Animation(document.getElementById("background"));
const backgroundOne = new Animation(document.getElementById("backgroundOne"));
const backgroundTwo = new Animation(document.getElementById("backgroundTwo"));

const chronometer = new Chronometer(document.getElementById("hms"));

const spanLife = new Points(document.getElementById("lifes"),5);

const spanPoints = new Points(document.getElementById("points"),0);

const game = new Game(chronometer,[background,backgroundOne,backgroundTwo],spanLife,spanPoints);

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
        if (game.getGame() == null) {
            startGame();
        } else {
            game.unPauseGame();
        }
    } else {
        document.getElementById("pause").classList.remove('pause2');
        game.pauseGame();
    }
});

////////////////////////////////////////////CREAR ENEMIGOS/////////////////////
function startGame() {
    const value = document.getElementById("select").value;
    game.startGame(value);
}

