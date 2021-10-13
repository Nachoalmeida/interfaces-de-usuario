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

    createMatrix() {
        if (this.board.length === 0) {
            let posx = (this.width / 4);
            let posy = (this.height / 4);
            for (let i = 0; i < this.columns + 1; i++) {
                let rows = [];
                for (let j = 0; j < this.rows; j++) {
                    let chip = null;
                    if (i === 0) {
                        chip = new Chip(posx, posy, 15, new Image(), ctx);
                        rows.push(chip); //[1,2,3,4];
                    } else {
                        chip = new Chip(posx, posy, 15, this.image, ctx);
                        rows.push({
                            chip: chip,
                            value: 0
                        }); //[{chip,value},{chip,value},{chip,value}];
                    }
                    chip.draw();
                    posx += this.image.width;
                }
                posy += this.image.height;
                posx = (this.width / 4);
                this.board.push(rows);
            }
        } else draw();
    }

    draw() {
        for (let i = 0; i < this.columns + 1; i++) {
            for (let j = 0; j < this.rows; j++) {
                if (i === 0) {
                    this.board[i][j].draw();
                } else this.board[i][j]['chip'].draw();
            }
        }
    }


    itsOnTheBoard(x, y) {
        if (this.board.length > 0) {
            let chips = this.board[0];
            for (let i = 0; i < chips.length; i++) {
                if (chips[i].isPointInside(x, y)) {
                    return i;
                }
            }
        }
        return null;
    }

    setPosition(position, value, img) {
        if (position !== null) {
            for (let i = this.board.length - 1; i > 0; i--) {
                if (!this.board[i][position]['value']) {
                    this.board[i][position]['value'] = value;
                    this.board[i][position]['chip'].setImage(img);
                    return true;
                }
            }
        }
        return false;
    }

    winnerX(line) {
        for (let i = 1; i <= this.columns; i++) {
            let tmp = [];
            for (let j = 0; j < this.rows; j++) {
                if (this.board[i][j]['value'] !== 0) {
                    if (tmp.lenght === 0) {
                        tmp.push(this.board[i][j]['value']);
                    } else if (tmp[0] === this.board[i][j]['value']) {
                        tmp.push(this.board[i][j]['value']);
                        if (tmp.length === line) {
                            return true;
                        }
                    } else {
                        tmp = [];
                        tmp.push(this.board[i][j]['value']);
                    }
                }

            }
        }
        return false;
    }

    winnerY(line) {
        for (let j = 0; j < this.rows; j++) {
            let tmp = [];
            for (let i = 1; i <= this.columns; i++) {
                if (this.board[i][j]['value'] !== 0) {
                    if (tmp.lenght === 0) {
                        tmp.push(this.board[i][j]['value']);
                    } else if (tmp[0] === this.board[i][j]['value']) {
                        tmp.push(this.board[i][j]['value']);
                        if (tmp.length === line) {
                            return true;
                        }
                    } else {
                        tmp = [];
                        tmp.push(this.board[i][j]['value']);
                    }
                }

            }
        }
        return false;
    }





}