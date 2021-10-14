class Board {
    constructor(columns, rows, w, h, image, context) {
        this.columns = columns;
        this.rows = rows;
        this.width = w;
        this.height = h;
        this.image = image;
        this.ctx = context;
        this.board = [];
    }

    createBoard() {
        this.createMatrix();
    }

    //Crea y dibuja la matriz sobre la que se jugará. 
    createMatrix() {
        if (this.board.length === 0) {
            let posx = (this.width / 5); //Define la posicion x,y para determinar la posicion en el canvas de cada casilla.
            let posy = (this.height / 5);
            for (let i = 0; i < this.columns + 1; i++) {
                let rows = [];
                for (let j = 0; j < this.rows; j++) {
                    let chip = null;
                    if (i === 0) { //Crea la primer fila que no será visible, su finalidad es la de identificar en cual columna caerá la ficha al ser soltada.
                        chip = new Chip(posx, posy, 15, new Image(), ctx);
                        rows.push(chip);
                    } else { //Crea el resto de las casillas visibles de la matriz en el Canvas.
                        chip = new Chip(posx, posy, 15, this.image, ctx);
                        rows.push({ //Se crea un objeto que contiene la casilla (Chip) y un valor para identificar si la casilla esta vacía o al jugador que colocó alli su ficha.
                            chip: chip,
                            value: 0
                        });
                    }
                    chip.draw();
                    posx += this.image.width; //Se corre a la derecha la posicion de x segun el ancho de la imagen de la casilla.
                }
                posy += this.image.height; //Se corre hacia abajo la posicion de y segun el alto de la imagen de la casilla.
                posx = (this.width / 5); //Se reinicia la posicion de x.
                this.board.push(rows);
            }
        } else draw(); //Si la matriz ya está creada sólo la dibuja.
    }

    //Dibuja la matriz
    draw() {
        for (let i = 0; i < this.columns + 1; i++) {
            for (let j = 0; j < this.rows; j++) {
                if (i === 0) {
                    this.board[i][j].draw();
                } else this.board[i][j]['chip'].draw();
            }
        }
    }

    //Identifica si la ubicación de un objeto coincide con la de una de las casillas invisibles.
    itsOnTheBoard(x, y) {
        if (this.board.length > 0) {
            let chips = this.board[0];
            for (let i = 0; i < chips.length; i++) {
                if (chips[i].isPointInside(x, y)) {
                    return i; //Si encuentra una casilla retorna su posicion en el arreglo.
                }
            }
        }
        return null;
    }

    //Setea una nueva imagen y un valor para la casilla
    setPosition(position, value, img) {
        if (position !== null) {
            for (let i = this.board.length - 1; i > 0; i--) { //Busca de atras para adelante por el eje y de la matriz
                if (!this.board[i][position]['value']) { //Verifica si la casilla está vacia.
                    this.board[i][position]['value'] = value;
                    this.board[i][position]['chip'].setImage(img);
                    return true;
                }
            }
        }
        return false;
    }

    //Chequea si existe un ganador verificando en todos los sentidos
    checkWinner(line) {
        let winner = false;
        winner = this.winnerX(line);
        if (winner) {
            return winner;
        }
        winner = this.winnerY(line);
        if (winner) {
            return winner;
        }
        winner = this.left(line);
        if (winner) {
            return winner;
        }
        winner = this.right(line);
        if (winner) {
            return winner;
        }
        return false;
    }

    //Verifica de manera horizontal si existen "line" cantidad de fichas consecutivas de un mismo jugador
    winnerX(line) {
        for (let i = 1; i <= this.columns; i++) {
            let tmp = [];
            for (let j = 0; j < this.rows; j++) {
                tmp = this.checkArray(this.board[i][j]['value'], tmp);
                if (tmp.length === line) {
                    return tmp[0];
                }
            }
        }
        return false;
    }

    //Verifica de manera vertical si existen "line" cantidad de fichas consecutivas de un mismo jugador
    winnerY(line) {
        for (let j = 0; j < this.rows; j++) {
            let tmp = [];
            for (let i = 1; i <= this.columns; i++) {
                tmp = this.checkArray(this.board[i][j]['value'], tmp);
                if (tmp.length === line) {
                    return tmp[0];
                }
            }
        }
        return false;
    }

    //Verifica de manera diagonal de derecha a izquierda si existen "line" cantidad de fichas consecutivas de un mismo jugador
    left(line) {
        for (let r = 0; r < this.rows; r++) { //Recorre las filas de izq a der.
            let j = r;
            let i = 1;
            let tmp = [];
            while (j >= 0 && i <= this.columns) { //Recorre de der a izq (j) y de arriba a abajo(i).
                tmp = this.checkArray(this.board[i][j]['value'], tmp);
                if (tmp.length === line) { //Si tmp alcanza la cantidad "line" retorna el valor del jugador.
                    return tmp[0];
                }
                j--;
                i++;
            }
        }
        for (let i = 2; i < this.columns + 1; i++) { //Recorre de arriba a abajo.
            let r = this.rows - 1;
            let column = i;
            let tmp = [];
            while (column < this.columns + 1 && r >= 0) { //Recorre de der a izq (r) y de arriba hacia abajo (column).
                tmp = this.checkArray(this.board[column][r]['value'], tmp);
                if (tmp.length === line) {
                    return tmp[0]; //Si tmp alcanza la cantidad "line" retorna el valor del jugador.
                }
                r--;
                column++;

            }
        }

        return false;
    }

    //Verifica de manera diagonal de izquierda a derecha si existen "line" cantidad de fichas consecutivas de un mismo jugador
    right(line) {
        for (let r = this.rows - 1; r > 0; r--) { //Recorre de izquierda a derecha
            let row = r;
            let column = 1;
            let tmp = [];
            while (row < this.rows && column <= this.columns) {
                tmp = this.checkArray(this.board[column][row]['value'], tmp);
                if (tmp.length === line) {
                    return tmp[0];
                }
                row++;
                column++;
            }
        }
        for (let i = 2; i <= this.columns; i++) {
            let r = 0;
            let column = i;
            let tmp = [];
            while (column <= this.columns && r < this.rows) {
                tmp = this.checkArray(this.board[column][r]['value'], tmp);
                if (tmp.length === line) {
                    return tmp[0];
                }
                r++;
                column++;
            }
        }
        return false;
    }

    checkArray(value, tmp) {
        if (value !== 0) {
            if (tmp.lenght === 0) {
                tmp.push(value);
            } else if (tmp[0] === value) {
                tmp.push(value);
            } else {
                tmp = [];
                tmp.push(value);
            }
        } else {
            tmp = [];
        }
        return tmp;
    }
}