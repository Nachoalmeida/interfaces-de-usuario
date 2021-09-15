let canvas = document.querySelector('#canvas');

canvas.width = document.querySelector('#div-canvas').offsetWidth;

let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let image = new Image();

let currentColor = '#000000';
let size = 1;

let figures = [];
let isMouseDown = false;
let file = document.getElementById('file');

file.addEventListener('change', function() {
    image.src = window.URL.createObjectURL(file.files[0]);
    image.onload = function() {
        ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
        figures = [];
    }
});

function clearCanvas() {
    figures = [];
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

document.getElementById('clear').addEventListener('click', clearCanvas);

document.getElementById('colorpicker').addEventListener('change', function() {
    currentColor = this.value;
});

document.getElementById('size').addEventListener('change', function() {
    size = this.value;
});

document.getElementById('eraser').addEventListener('click', eraser);

function eraser() {
    currentColor = "#FFFFFF";
}

function drawfigure() {
    for (let i = 0; i < figures.length; i++) {
        figures[i].draw();
    }
}

function addPencil(x, y) {
    let pencil = new Pencil(x, y, size, currentColor, ctx);
    figures.push(pencil);
}

function onMouseDown(e) {
    isMouseDown = true;
    addPencil(e.layerX, e.layerY);
    drawfigure();
}

function onMouseUp(e) {
    isMouseDown = false;
}

function onMouseMove(e) {
    if (isMouseDown) {
        addPencil(e.layerX, e.layerY);
        drawfigure();
    }
}

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);