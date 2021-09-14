let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

//new ImageData(canvasHeight, canvasWidth);
let image = new Image();

let currentColor = '#000000';
let size = 1;

let figures = [];
let isMouseDown = false;

document.getElementById('file').addEventListener('change', function() {
    /*image.src = this.value;
    console.log(image.src);
    image.onload = () => {
        ctx.drawImage(this, 0, 0);
    }*/

    /*    reader.readAsDataURL(inputBox.files[0]); // Iniciar una solicitud asincrónica
    reader.onload = function() {
        // Después de leer, asigna el resultado al src de img
        img.src = this.result
    }*/

});

/*
picture.onload = function() {
    ctx.drawImage(picture, 270, 5);
    let imageData = ctx.getImageData(0, 0, width, height);
    ctx.putImageData(imageData, 0, 0);
}*/

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