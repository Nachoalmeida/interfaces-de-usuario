let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width; //700
let canvasHeight = canvas.height; //400

let chips = [];
let board = null;

let rows = 6;
let columns = 7;

let player1 = null;
let player2 = null;

let lasClickedChip = null;
let isMouseDown = false;

let chip1 = document.getElementById("chip_1");
let box = document.getElementById("box");
//let chip2 = document.getElementById("chip_2");
let count = 0;
for (let i = 0; i < rows * columns; i++) {
    if (i < (rows * columns) / 2)
        addChip((canvas.width / 20), (canvas.height / 3) + (i * 10), chip1);
    else addChip(canvas.width / 1.5, (canvas.height / 3) + ((i - (rows * columns / 2)) * 10), chip1);
}
drawfigure();
addBoard();

function addBoard() {
    board = new Board(rows, columns, canvas.width, canvas.height, box, ctx);
    board.createBoard();
}

function addChip(posx, posy, image) {
    let chip = new Chip(posx, posy, 14, image, ctx);
    chips.push(chip);
}

function drawfigure() {
    clearCanvas();
    for (let i = 0; i < chips.length; i++) {
        chips[i].draw();
    }
    if (board !== null) {
        board.createBoard();
    }
}

function clearCanvas() {
    ctx.fillStyle = "#F8F8FF";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

function onMouseDown(e) {
    isMouseDown = true;

    if (lasClickedChip != null) {
        lasClickedChip.setHighlighted(false);
        lasClickedChip = null;
    }

    let clickChip = findClikedFigure(e.layerX, e.layerY);
    if (clickChip != null) {
        clickChip.setHighlighted(true);
        lasClickedChip = clickChip;
    }
    drawfigure();
}


function onMouseUp(e) {
    isMouseDown = false;
}

function onMouseMove(e) {
    if (isMouseDown && lasClickedChip != null) {
        lasClickedChip.setPosition(e.layerX, e.layerY);
        drawfigure();
    }
}


function findClikedFigure(x, y) {
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