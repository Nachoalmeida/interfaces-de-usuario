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
let imageData;

function setPixel(imageData, x, y, r, g, b, a) {
    let index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;

}

picture.onload = function() {
    ctx.drawImage(picture, 270, 5);
    let imageData = ctx.getImageData(0, 0, width, height);
    ctx.putImageData(imageData, 0, 0);
}


function getRed(imageData, x, y) {
    index = (x + y * imageData.width) * 4;
    return imageData.data[index + 0];

}

function getGreen(imageData, x, y) {
    index = (x + y * imageData.width) * 4;
    return imageData.data[index + 0];

}

function getBlue(imageData, x, y) {
    index = (x + y * imageData.width) * 4;
    return imageData.data[index + 0];

}


/* GRIS = (R+G+B)/3*/

function greyScale() {
    //picture.src = "images/images.jpg";
    image.onload = function() {
        //ctx.drawImage(picture, 0, 0);
        imageData = ctx.getImageData(0, 0, width, height);
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let r = getRed(imageData, x, y);
                let g = getGreen(imageData, x, y);
                let b = getBlue(imageData, x, y);
                //setPixel(imageData, x, y, r, g, b, a);
            }

        }
    }
}

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