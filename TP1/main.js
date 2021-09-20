let canvas = document.querySelector('#canvas');

canvas.width = document.querySelector('#div-canvas').offsetWidth;

let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let image = new Image();

let currentColor = '#000000';
let size = 1;
let a = 255;

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

function getRed(imageData, x, y) {
    index = (x + y * imageData.width) * 4;
    return imageData.data[index + 0];
}

function getGreen(imageData, x, y) {
    index = (x + y * imageData.width) * 4;
    return imageData.data[index + 1];
}

function getBlue(imageData, x, y) {
    index = (x + y * imageData.width) * 4;
    return imageData.data[index + 2];
}

/* 
 * GRIS = (R+G+B)/3
 */
function greyScale() {
    imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    for (let x = 0; x < canvasWidth; x++) {
        for (let y = 0; y < canvasHeight; y++) {
            let r = getRed(imageData, x, y);
            let g = getGreen(imageData, x, y);
            let b = getBlue(imageData, x, y);
            setPixel(imageData, x, y, (r + g + b) / 3, (r + g + b) / 3, (r + g + b) / 3, 255);
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

function blur() {
    imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    for (let x = 0; x < canvasWidth; x++) {
        for (let y = 0; y < canvasHeight; y++) {
            let r = getBlur(imageData, x, y, 0);

            let g = getBlur(imageData, x, y, 1);

            let b = getBlur(imageData, x, y, 2);

            setPixel(imageData, x, y, r, g, b, 255);
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

function getBlur(imageData, X, Y, i) {

    let suma = getValueBlur(X + 1, Y, imageData, i) + getValueBlur(X - 1, Y, imageData, i) + getValueBlur(X, Y + 1, imageData, i) + getValueBlur(X, Y - 1, imageData, i) + getValueBlur(X + 1, Y - 1, imageData, i) + getValueBlur(X - 1, Y - 1, imageData, i) + getValueBlur(X + 1, Y + 1, imageData, i) + getValueBlur(X - 1, Y + 1, imageData, i) + getValueBlur(X, Y, imageData, i);
    let divisor = suma / 9;
    return divisor;
}

function getValueBlur(x, y, imageData, i) {
    return imageData.data[((x + y * imageData.width) * 4) + i];
}

function negative() {
    let r;
    let g;
    let b;
    imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight); //Obtiene los datos
    for (let x = 0; x < canvasWidth; x++) {
        for (let y = 0; y < canvasHeight; y++) {
            r = getRed(imageData, x, y);
            g = getGreen(imageData, x, y);
            b = getBlue(imageData, x, y);
            setPixel(imageData, x, y, 255 - r, 255 - g, 255 - b, a);
        }
    }
    ctx.putImageData(imageData, 0, 0); //Mostrar imagen en Canvas

}

function binarization() {
    let r;
    let g;
    let b;
    let medium = 255 / 2;
    console.log(medium);
    imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight); //Obtiene los datos
    for (let x = 0; x < canvasWidth; x++) {
        for (let y = 0; y < canvasHeight; y++) {
            r = getRed(imageData, x, y);
            g = getGreen(imageData, x, y);
            b = getBlue(imageData, x, y);

            let average = (r + g + b) / 3;

            setPixel(imageData, x, y, average > medium ? 255 : 0, average > medium ? 255 : 0, average > medium ? 255 : 0, a);
        }
    }
    ctx.putImageData(imageData, 0, 0); //Mostrar imagen en Canvas

}

function lightness() {
    let r;
    let g;
    let b;
    imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight); //Obtiene los datos
    for (let x = 0; x < canvasWidth; x++) {
        for (let y = 0; y < canvasHeight; y++) {
            r = getRed(imageData, x, y);
            g = getGreen(imageData, x, y);
            b = getBlue(imageData, x, y);
            //a hsl
            let hsl = rgbToHsl(r, g, b);
            //aumentar brillo 20%
            hsl[2] = hsl[2] * (1.2);
            //a rgb
            let rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
            setPixel(imageData, x, y, rgb[0], rgb[1], rgb[2], a);
        }
    }
    ctx.putImageData(imageData, 0, 0); //Mostrar imagen en Canvas

}

function saturation() {
    let r;
    let g;
    let b;
    imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight); //Obtiene los datos
    for (let x = 0; x < canvasWidth; x++) {
        for (let y = 0; y < canvasHeight; y++) {
            r = getRed(imageData, x, y);
            g = getGreen(imageData, x, y);
            b = getBlue(imageData, x, y);
            //a hsl
            let hsl = rgbToHsl(r, g, b);
            //aumentar saturación 20%
            hsl[1] = hsl[1] * (1.2);
            //a rgb
            let rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
            setPixel(imageData, x, y, rgb[0], rgb[1], rgb[2], a);
        }
    }
    ctx.putImageData(imageData, 0, 0); //Mostrar imagen en Canvas

}

function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return [h, s, l];
}

function hslToRgb(h, s, l) {
    var r, g, b;
    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function sepia() {
    let r;
    let g;
    let b;
    imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight); //Obtiene los datos
    for (let x = 0; x < canvasWidth; x++) {
        for (let y = 0; y < canvasHeight; y++) {
            r = getRed(imageData, x, y);
            g = getGreen(imageData, x, y);
            b = getBlue(imageData, x, y);

            let tr = 0.393 * r + 0.769 * g + 0.189 * b;
            let tg = 0.349 * r + 0.686 * g + 0.168 * b;
            let tb = 0.272 * r + 0.534 * g + 0.131 * b;

            setPixel(imageData, x, y, tr > 255 ? 255 : tr, tg > 255 ? 255 : tg, tb > 255 ? 255 : tb, a);
        }
    }
    ctx.putImageData(imageData, 0, 0); //Mostrar imagen en Canvas

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
////////////////BOTONES FILTROS////////////////////////////////////////////
document.getElementById('filterGrey').addEventListener('click', greyScale);
document.getElementById('filterNegative').addEventListener('click', negative);
document.getElementById('filterBinarization').addEventListener('click', binarization);
document.getElementById('filterLightness').addEventListener('click', lightness);
document.getElementById('filterSepia').addEventListener('click', sepia);
document.getElementById('filterSaturation').addEventListener('click', saturation);
document.getElementById('filterBlur').addEventListener('click', blur);


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