let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width; //700
let canvasHeight = canvas.height; //400

let rows = 6;
let columns = 7;

let lasClickedChip = null;
let isMouseDown = false;

let turn = 0;
let board = null;

let title = document.getElementById("title");

let box_empty = document.getElementById("box_empty");

let chipsTextures = [
    { chip: document.getElementById("chip_3"), boxChip: document.getElementById("box_chip_3") },
    { chip: document.getElementById("chip_4"), boxChip: document.getElementById("box_chip_4") }
];

let playerPlay;
let players = [{
    value: 1,
    chipTextures: null,
    chips: [],
}, {
    value: 2,
    chipTextures: null,
    chips: [],
}];

players[0]['chipTextures'] = chipsTextures[0];
players[1]['chipTextures'] = chipsTextures[1];
createChips();
shifts();
drawChip();
addBoard();

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);

function shifts() {
    turn = !turn;
    if (turn) {
        playerPlay = players[0];
        title.innerHTML = 'Juega: Jugador 1';
    } else {
        playerPlay = players[1];
        title.innerHTML = 'Juega: Jugador 2';
    }
}

function createChips() {
    for (let i = 0; i < rows * columns; i++) {
        if (i < (rows * columns) / 2)
            addChip((canvas.width / 20), (canvas.height / 3) + (i * 10), players[0]);
        else addChip(canvas.width / 1.5, (canvas.height / 3) + ((i - (rows * columns / 2)) * 10), players[1]);
    }
}

function addBoard() {
    board = new Board(rows, columns, canvas.width, canvas.height, box_empty, ctx);
    board.createBoard();
}

function addChip(posx, posy, player) {
    let chip = new Chip(posx, posy, 14, player['chipTextures']['chip'], ctx);
    player['chips'].push(chip);
}

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

function clearCanvas() {
    ctx.fillStyle = "#F8F8FF";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

function onMouseDown(e) {
    isMouseDown = true;

    if (lasClickedChip != null) {
        lasClickedChip = null;
    }

    let clickChip = findClikedChip(e.layerX, e.layerY);

    if (clickChip != null) {
        lasClickedChip = clickChip;
    }
    drawChip();
}

function onMouseUp(e) {
    let position = board.itsOnTheBoard(e.layerX, e.layerY);
    if (position !== null && lasClickedChip !== null) {
        if (board.setPosition(position, playerPlay["value"], playerPlay["chipTextures"]['boxChip'])) {
            playerPlay['chips'] = playerPlay['chips'].filter(c => c.getPosx() !== lasClickedChip.getPosx() && c.getPosy() !== lasClickedChip.getPosy());
            drawChip();
            shifts();
        }
    };
    lasClickedChip = null;
    isMouseDown = false;
}

function onMouseMove(e) {
    if (isMouseDown && lasClickedChip != null) {
        lasClickedChip.setPosition(e.layerX, e.layerY);
        drawChip();
    }
}

function findClikedChip(x, y) {
    for (let i = 0; i < playerPlay['chips'].length; i++) {
        const element = playerPlay['chips'][i];
        if (element.isPointInside(x, y)) {
            return element;
        }
    }
}