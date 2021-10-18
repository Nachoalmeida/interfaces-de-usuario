let canvas = document.querySelector('#canvas');

canvas.width = document.querySelector('#div-canvas').offsetWidth;

let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let image = null;
let pencilBoolean = false;
let eraserBoolean = false;

let currentColor = '#000000';
let size = 1;
let a = 255;


let isMouseDown = false;
let file = document.getElementById('file');
let imageData;

let x = 0;
let y = 0;
let r = canvas.getBoundingClientRect();

/////////////////////BOTON DOWNLOAD///////////////////////////
let dwn = document.getElementById('btndownload').addEventListener('click', function() {
    download(canvas, 'estaParaPromocionar.png');
}, false);

// Event handler for download
function download(canvas, filename) {
    /// create an "off-screen" anchor tag
    let lnk = document.createElement('a'),
        e;
    /// the key here is to set the download attribute of the a tag
    lnk.download = filename;

    /// convert canvas content to data-uri for link. When download
    /// attribute is set the content pointed to by link will be
    /// pushed as "download" in HTML5 capable browsers
    lnk.href = canvas.toDataURL("image/png;base64");

    /// create a "fake" click-event to trigger the download
    if (document.createEvent) {
        e = document.createEvent("MouseEvents");
        e.initMouseEvent("click", true, true, window,
            0, 0, 0, 0, 0, false, false, false,
            false, 0, null);

        lnk.dispatchEvent(e);
    } else if (lnk.fireEvent) {
        lnk.fireEvent("onclick");
    }
}

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

//FILTRO GRIS
function greyScale() {
    let r, g, b;
    imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    for (let x = 0; x < canvasWidth; x++) {
        for (let y = 0; y < canvasHeight; y++) {
            r = getRed(imageData, x, y);
            g = getGreen(imageData, x, y);
            b = getBlue(imageData, x, y);
            setPixel(imageData, x, y, (r + g + b) / 3, (r + g + b) / 3, (r + g + b) / 3, 255);
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

//FILTRO BLUR
function blur() {
    let r, g, b;
    imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    for (let x = 0; x < canvasWidth; x++) {
        for (let y = 0; y < canvasHeight; y++) {
            r = getBlur(imageData, x, y);
            g = getBlur(imageData, x, y, 1);
            b = getBlur(imageData, x, y, 2);
            setPixel(imageData, x, y, r, g, b, 255);
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

function getBlur(imageData, X, Y, I = 0) {
    let sum = 0;
    let divider = 0;
    let values = [
        getpixel(X + 1, Y, imageData, I),
        getpixel(X - 1, Y, imageData, I),
        getpixel(X, Y + 1, imageData, I),
        getpixel(X, Y - 1, imageData, I),
        getpixel(X + 1, Y - 1, imageData, I),
        getpixel(X - 1, Y - 1, imageData, I),
        getpixel(X + 1, Y + 1, imageData, I),
        getpixel(X - 1, Y + 1, imageData, I),
        getpixel(X, Y, imageData, I)
    ];
    for (let i = 0; i < values.length; i++) {
        if (values[i] !== undefined) {
            divider++;
            sum += values[i];
        }
    }
    return sum / divider;
}

function getpixel(x, y, imageData, i = 0) {
    return imageData.data[((x + y * imageData.width) * 4) + i];
}

//FILTRO NEGATIVO
function negative() {
    let r, g, b;
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

//FILTRO BINARIZACIÓN
function binarization() {
    let r, g, b;
    let medium = 255 / 2;
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

//FILTRO BRILLO
function lightness() {
    let r, g, b;
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

//FILTRO SATURACIÓN
function saturation() {
    let r, g, b;
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

//RGB a HSL
function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max == min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
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

//HSL a RGB
function hslToRgb(h, s, l) {
    let r, g, b;
    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        let hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

//FILTRO SEPIA
function sepia() {
    let r, g, b;
    let tr, tg, tb;
    imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight); //Obtiene los datos
    for (let x = 0; x < canvasWidth; x++) {
        for (let y = 0; y < canvasHeight; y++) {
            r = getRed(imageData, x, y);
            g = getGreen(imageData, x, y);
            b = getBlue(imageData, x, y);

            tr = 0.393 * r + 0.769 * g + 0.189 * b;
            tg = 0.349 * r + 0.686 * g + 0.168 * b;
            tb = 0.272 * r + 0.534 * g + 0.131 * b;

            setPixel(imageData, x, y, tr > 255 ? 255 : tr, tg > 255 ? 255 : tg, tb > 255 ? 255 : tb, a);
        }
    }
    ctx.putImageData(imageData, 0, 0); //Mostrar imagen en Canvas
}

//CARGAR IMAGEN
file.addEventListener('change', function() {
    image = new Image;
    image.src = window.URL.createObjectURL(file.files[0]);
    image.onload = function() {
        if (this.width > canvasWidth || this.height > canvasHeight) {
            let difW = this.width - canvasWidth;
            let proporcionW = difW / this.width;
            let difH = this.height - canvasHeight;
            let proporcionH = difH / this.height;
            if (proporcionW >= proporcionH) {
                this.width = this.width * (1 - proporcionW);
                this.height = this.height * (1 - proporcionW);
            } else {
                this.width = this.width * (1 - proporcionH);
                this.height = this.height * (1 - proporcionH);
            }
        }
        let x = (canvasWidth - this.width) / 2;
        let y = (canvasHeight - this.height) / 2;

        ctx.drawImage(image, x, y, this.width, this.height);
    }
});


////////////////BOTONES RESET, COLOR Y GROSOR////////////////////////////////////////////
document.getElementById('clear').addEventListener('click', clearCanvas);
let colorPicker = "#000000";
document.getElementById('colorpicker').addEventListener('change', function() {
    if (pencilBoolean === true) {
        currentColor = this.value;
    } else colorPicker = this.value;
});
document.getElementById('size').addEventListener('change', function() {
    size = this.value;
});

////////////////BOTONES UTILES////////////////////////////////////////////
document.getElementById('eraser').addEventListener('click', eraser);
document.getElementById('pencil').addEventListener('click', pencil);

////////////////BOTONES FILTROS////////////////////////////////////////////
document.getElementById('filterGrey').addEventListener('click', greyScale);
document.getElementById('filterNegative').addEventListener('click', negative);
document.getElementById('filterBinarization').addEventListener('click', binarization);
document.getElementById('filterLightness').addEventListener('click', lightness);
document.getElementById('filterSepia').addEventListener('click', sepia);
document.getElementById('filterSaturation').addEventListener('click', saturation);
document.getElementById('filterBlur').addEventListener('click', blur);

function clearCanvas() {
    x = 0;
    y = 0;
    file.value = '';
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

function pencil() {
    pencilBoolean = true;
    eraserBoolean = false;
    currentColor = colorPicker;
}

function eraser() {
    pencilBoolean = false;
    eraserBoolean = true;
    currentColor = "#FFFFFF";
}

function addPencil(x1, y1, x2, y2) {
    let pencil = new Pencil(size, currentColor, ctx);
    pencil.draw(x1, y1, x2, y2);
}

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);

function onMouseDown(e) {
    if (pencilBoolean === true || eraserBoolean === true) {
        x = e.clientX - r.left;
        y = e.clientY - r.top;
        isMouseDown = true;
    }
}

function onMouseUp(e) {
    if (pencilBoolean === true || eraserBoolean === true) {
        addPencil(x, y, e.clientX - r.left, e.clientY - r.top);
        x = 0;
        y = 0;
        isMouseDown = false;
    }
}

function onMouseMove(e) {
    if (isMouseDown && (pencilBoolean === true || eraserBoolean === true)) {
        addPencil(x, y, e.clientX - r.left, e.clientY - r.top);
        x = e.clientX - r.left;
        y = e.clientY - r.top;
    }
}