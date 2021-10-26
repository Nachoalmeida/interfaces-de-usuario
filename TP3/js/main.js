"use strict";

const buttonPlayStop = document.getElementById("buttonPlayStop");

let player = null;
let pet = null;
let enemies = [];

const background = new Animation(document.getElementById("background"));
const backgroundOne = new Animation(document.getElementById("backgroundOne"));
const backgroundTwo = new Animation(document.getElementById("backgroundTwo"));
const coin = new Animation(document.getElementById("coin"));

let game = null;
let timer = null;
let timerEnemy = null;

/////////////////SALTAR////////////////////////////////
document.addEventListener('keydown', (e) => {
    if (game) {
        let key = e.key;
        if (key === 'ArrowUp' && (player.getJumpDone() && pet.getJumpDone())) {
            player.jump('jumpPlayer');
            pet.jump('jumpCat');
        }
    }
});

/////////////////BOTON PAUSA////////////////////////////////
buttonPlayStop.addEventListener('click', () => {
    const button = buttonPlayStop.classList.toggle("play");
    if (!button) {
        document.getElementById("pause").classList.add('pause2');
        if (game == null) {
            startGame();
        } else {
            unPauseGame();
        }
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



function gameRun() {
    for (let i = 0; i < enemies.length; i++) {
        collision(enemies[i]);
    }
    if (enemies.length > 0) {
        if (enemies[0].getRight() > 900) {
            backgroundTwo.removeChild(enemies[0].returnDiv());
            console.log(enemies[0].returnDiv());
            enemies.shift();
            console.log("enemies[]:", enemies);
        }
    }
}

function collision(enemy) {
    if (player.getRight() < enemy.getRight() + enemy.getWidth() && player.getRight() + player.getWidth() > enemy.getRight() && player.getTop() < enemy.getTop() + enemy.getHeight() && player.getTop() + player.getHeight() > enemy.getTop()) {
        console.log("colision");
    }
}

////////////////////////////////////////////CREAR ENEMIGOS/////////////////////

function startGame() {
    game = 1;
    const value = document.getElementById("select").value; /**/
    let players = value.split("-");
    for (let i = 0; i < players.length; i++) {
        let values = players[i].split(","); //[0] id,[1]value,[2]clase 
        let getPlayer = new Player(document.createElement("div"), values[0], values[1], values[2]);
        backgroundTwo.appendChild(getPlayer.returnDiv());
        if (i == 0) {
            player = getPlayer;
        } else {
            pet = getPlayer;
        }
    }
    timers();
}

function timers() {
    timer = setInterval(() => {
        gameRun();
    }, 50);
    timerEnemy = setInterval(() => {
        createEnemies();
        //console.log("enemigo!!")
    }, parseInt(Math.random() * (10000 - 3000) + 3000));
}

function unPauseGame() {
    game = 1;
    timers();
    player.animationState('running');
    pet.animationState('running');
    background.animationState('running');
    backgroundOne.animationState('running');
    backgroundTwo.animationState('running');
    //coin.animationState('running');
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].animationState('running');
    }
}

function pauseGame() {
    game = 0;
    clearInterval(timer);
    clearInterval(timerEnemy);
    player.animationState('paused');
    pet.animationState('paused');
    background.animationState('paused');
    backgroundOne.animationState('paused');
    backgroundTwo.animationState('paused');
    //coin.animationState('paused');
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].animationState('paused');
    }

}

function createEnemies() {
    let tmp = Math.random();
    let getEnemy = null;
    if (tmp < 0.5) {
        getEnemy = new Character(document.createElement("div"), "id", "bear" + tmp, "runBear");

    } else {
        getEnemy = new Character(document.createElement("div"), "id", "bird" + tmp, "flyBird");
    }
    backgroundTwo.appendChild(getEnemy.returnDiv());
    enemies.push(getEnemy);

}