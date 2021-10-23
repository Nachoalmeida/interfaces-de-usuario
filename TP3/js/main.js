"use strict";

const buttonPlayStop = document.getElementById("buttonPlayStop");
let player = new Character(document.getElementById("player"));
let cat = new Character(document.getElementById("cat"));
let bear = new Enemy(document.getElementById("bear"));
let bird = new Enemy(document.getElementById("bird"));

/////////////////SALTAR////////////////////////////////
let bool = true;
document.addEventListener('keydown', (e) => {
    let key = e.key;
    if (key == 'ArrowUp' && bool) {
        bool = false;
        //console.log("up");
        //document.getElementById("player").classList.add("jumpPlayer");
        player.jump("jumpPlayer");
        setTimeout(function() {
            player.removeClass("jumpPlayer");
            bool = true;
        }, 2500);
    }
})

/////////////////BOTON PAUSA////////////////////////////////
buttonPlayStop.addEventListener('click', () => {
    const button = buttonPlayStop.classList.toggle("play");
    if (!button) {
        document.getElementById("pause").classList.add('pause2');
    } else {
        document.getElementById("pause").classList.remove('pause2');
    }

});

//Variables cronometro.  
let h = 0;
let m = 0;
let s = 0;
let id = null;
document.getElementById("hms").innerHTML = "00:00:00";
//////////////////////