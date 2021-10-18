let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width; //700
let canvasHeight = canvas.height; //400

let rows = 6;
let columns = 7;
let check = 4; //Cantidad de fichas contiguas para ganar el juego.

let lasClickedChip = null; //Ultima ficha cliqueada.
let isMouseDown = false; //Mouse apretado.

let turn = 0; //Turno del jugador.
let board = null;
let timer = null; //Reloj
let time = 300000;

let title = document.getElementById("title");

//Variables cronometro.  
let h = 0;
let m = 0;
let s = 0;
let id = null;
document.getElementById("hms").innerHTML = "00:00:00";
//////////////////////

//Texturas de las fichas y casillas.
let box_empty = document.getElementById("box_empty");

let chipsTextures = [
    [{ chip: document.getElementById("chip_3"), boxChip: document.getElementById("box_chip_3") },
        { chip: document.getElementById("chip_4"), boxChip: document.getElementById("box_chip_4") }
    ],
    [{ chip: document.getElementById("chip_1"), boxChip: document.getElementById("box_chip_1") },
        { chip: document.getElementById("chip_2"), boxChip: document.getElementById("box_chip_2") }
    ]
];
///////////////////////////////////////////////////////

let playerPlay = null; //Guarda los datos del jugador que tiene el turno.
let players = [{ //Jugadores
    value: 1,
    chipTextures: chipsTextures[0][0],
    chips: [],
}, {
    value: 2,
    chipTextures: chipsTextures[0][1],
    chips: [],
}];


/////////////////////SELECT TIPO DE JUEGO///////////////////////////
document.getElementById("gameMode").addEventListener('change', function() {
    rows = 6 + parseInt(this.value);
    columns = 7 + parseInt(this.value);
    check = 4 + parseInt(this.value);
});

/////////////////////SELECT TIEMPO DE JUEGO///////////////////////////
document.getElementById("gameTime").addEventListener('change', function() {
    time = parseInt(this.value);
});

/////////////////////SELECT TIPO DE FICHA///////////////////////////
document.getElementById("chipType").addEventListener('change', function() {
    players[0]['chipTextures'] = chipsTextures[parseInt(this.value)][0];
    players[1]['chipTextures'] = chipsTextures[parseInt(this.value)][1];
});


/////////////////////BOTONES INICIAR Y REINICIAR///////////////////////////
let reset = document.getElementById('resetGame').addEventListener('click', resetGame);
document.getElementById('resetGame').disabled = true;
let start = document.getElementById('startGame').addEventListener('click', startGame);


//Reinicia el juego.
function resetGame() {
    board = null;
    turn = 0;
    playerPlay = null;
    players[0]['chips'] = [];
    players[1]['chips'] = [];
    clearCanvas();
    clearTimeout(timer);
    title.innerHTML = 'Volver a Jugar 4 en Linea';
    document.getElementById('startGame').disabled = false;
    document.getElementById('resetGame').disabled = true;
    document.getElementById("gameMode").disabled = false;
    document.getElementById("gameTime").disabled = false;
    document.getElementById("chipType").disabled = false;
    clearChronometer();
}

//Inicia el juego.
function startGame() {
    createChips();
    shifts();
    drawChip();
    addBoard();
    document.getElementById('startGame').disabled = true;
    document.getElementById('resetGame').disabled = false;
    document.getElementById("gameMode").disabled = true;
    document.getElementById("gameTime").disabled = true;
    document.getElementById("chipType").disabled = true;
    document.getElementById("hms").innerHTML = "00:00:00"; //inicia cronometro en cero:
    chronometer();
    timer = setTimeout(function() {
        alert("Fin del tiempo de Juego");
        resetGame();
    }, time); //5 min de juego por defecto

}

/////////////////////EVENTOS MOUSE///////////////////////////
canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);

//Controla los turnos.
function shifts() {
    turn = !turn;
    if (turn) { //Si es true, playerPlay pasa a ser player 1 de lo contrario playerPlay pasa a ser player 2.
        playerPlay = players[0];
        title.innerHTML = 'Juega: Jugador 1';
    } else {
        playerPlay = players[1];
        title.innerHTML = 'Juega: Jugador 2';
    }
}

//Crea 1 a 1 las fichas que utilizara cada jugador, a partir del alto y ancho del tablero.
function createChips() {
    for (let i = 0; i < rows * columns; i++) {
        if (i < (rows * columns) / 2)
            addChip((canvas.width / 20), (canvas.height / 11) + (i * 8), players[0]);
        else addChip(canvas.width / 1.4, (canvas.height / 11) + ((i - (rows * columns / 2)) * 8), players[1]);
    }
}

//Crea un tablero.
function addBoard() {
    board = new Board(rows, columns, canvas.width, canvas.height, box_empty, ctx);
    board.createBoard();
}

//Crea una ficha con las caracteristicas enviadas por parametro.
function addChip(posx, posy, player) {
    let chip = new Chip(posx, posy, 14, player['chipTextures']['chip'], ctx);
    player['chips'].push(chip); //Añade la ficha al jugador
}

//Redibuja el canvas. 
function drawChip() {
    clearCanvas();
    for (let i = 0; i < players[0]['chips'].length; i++) {
        players[0]['chips'][i].draw();
    }
    for (let i = 0; i < players[1]['chips'].length; i++) {
        players[1]['chips'][i].draw();
    }
    if (board !== null) {
        board.draw();
    }
}

//Dibuja un rectangulo en blaco con las medidas del canvas y lo coloca sobre el anterior. 
function clearCanvas() {
    ctx.fillStyle = "#F8F8FF";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

//Detecta cuando el mouse hace click sobre una ficha 
function onMouseDown(e) {
    if (playerPlay !== null) {
        isMouseDown = true;

        if (lasClickedChip != null) {
            lasClickedChip = null;
        }

        let clickChip = findClikedChip(e.layerX, e.layerY); //Retorna la ficha ubicada en esa posicion.

        if (clickChip != null) {
            lasClickedChip = clickChip;
        }
        drawChip();
    }
}

//Detecta cuando el mouse hace deja de hacer click sobre una ficha. 
function onMouseUp(e) {
    if (playerPlay !== null) {
        let position = board.itsOnTheBoard(e.layerX, e.layerY); // Verifica si la ficha esta sobre una posicion del tablero.
        if (position !== null && lasClickedChip !== null) { //si devuelve una posicion y existe una ficha.
            if (board.setPosition(position, playerPlay["value"], playerPlay["chipTextures"]['boxChip'])) { //Coloca la ficha en el tablero, si esta no esta lleno.
                playerPlay['chips'] = playerPlay['chips'].filter(c => c.getPosx() !== lasClickedChip.getPosx() && c.getPosy() !== lasClickedChip.getPosy()); //Elimina la ficha de las que aun tiene diponibles el jugador.
                drawChip();
                let win = board.checkWinner(check); //Chequea si hay 'x' fichas en linea.
                if (win) { //Si hay ganador 
                    setTimeout(function() {
                        alert('Gano el Jugador ' + win); //Envia una alerta de quien gano.
                        resetGame(); //Reinicia el juego.
                    }, 500); //se crea un delay de medio segundo para que muestre la ficha en su lugar antes de emitir el alert.  
                }
                shifts(); //Cambia el turno.
            }
        };
        lasClickedChip = null;
        isMouseDown = false;
    }
}

//Cambia la posicion de la ficha en el canvas.
function onMouseMove(e) {
    if (isMouseDown && lasClickedChip != null) {
        lasClickedChip.setPosition(e.layerX, e.layerY);
        drawChip();
    }
}

//Retorna una ficha si esta se encuentra en dicha posicion.
function findClikedChip(x, y) {
    for (let i = 0; i < playerPlay['chips'].length; i++) {
        const element = playerPlay['chips'][i];
        if (element.isPointInside(x, y)) {
            return element;
        }
    }
}

//Comienza con el cronometro.
function chronometer() {
    write();
    id = setInterval(write, 1000); //Cada 1 segundo manda a escribir el cronometro.
}

//Reinicia el cronometro.
function clearChronometer() {
    clearInterval(id);
    s = 0;
    m = 0;
    h = 0;
    document.getElementById("hms").innerHTML = "00:00:00";
}

//Escribe el cronometro con segundos,minutos y horas.
function write() {
    let hAux, mAux, sAux;
    s++;
    if (s > 59) {
        m++;
        s = 0;
    }
    if (m > 59) {
        h++;
        m = 0;
    }
    if (h > 24) { h = 0; }

    if (s < 10) { sAux = "0" + s; } else { sAux = s; }
    if (m < 10) { mAux = "0" + m; } else { mAux = m; }
    if (h < 10) { hAux = "0" + h; } else { hAux = h; }

    document.getElementById("hms").innerHTML = hAux + ":" + mAux + ":" + sAux;
}