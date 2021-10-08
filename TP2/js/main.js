let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width; //700
let canvasHeight = canvas.height; //400

let chips = [];
let board = null;

let rows = 6;
let columns = 7;

let lasClickedChip = null;
let isMouseDown = false;

let chip4 = document.getElementById("chip_4");
let chip3 = document.getElementById("chip_3");
let box_empty = document.getElementById("box_empty");
let box_chip_4 = document.getElementById("box_chip_4");
let box_chip_3 = document.getElementById("box_chip_3");

let turn = 0;

let player1 = {
    value: 1,
    chip: box_chip_3,
};

let player2 = {
    value: 2,
    chip: box_chip_4,
};

for (let i = 0; i < rows * columns; i++) {
    if (i < (rows * columns) / 2)
        addChip((canvas.width / 20), (canvas.height / 3) + (i * 10), chip4);
    else addChip(canvas.width / 1.5, (canvas.height / 3) + ((i - (rows * columns / 2)) * 10), chip3);
}
drawChip();
addBoard();

function addBoard() {
    board = new Board(rows, columns, canvas.width, canvas.height, box_empty, ctx);
    board.createBoard();
}

function addChip(posx, posy, image) {
    let chip = new Chip(posx, posy, 14, image, ctx);
    chips.push(chip);
}

function drawChip() {
    clearCanvas();
    for (let i = 0; i < chips.length; i++) {
        chips[i].draw();
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
        let player;
        if (turn) {
            player = player1;
        } else player = player2;
        if (board.setPosition(position, player["value"], player["chip"])) {
            chips = chips.filter(c => c.getPosx() !== lasClickedChip.getPosx() && c.getPosy() !== lasClickedChip.getPosy());
            turn = !turn;
            drawChip();
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
    for (let i = 0; i < chips.length; i++) {
        const element = chips[i];
        if (element.isPointInside(x, y)) {
            return element;
        }
    }
}

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);