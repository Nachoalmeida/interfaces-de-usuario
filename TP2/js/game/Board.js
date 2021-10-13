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
            let posx = (this.width / 5);
            let posy = (this.height / 5);
            for (let i = 0; i < this.columns + 1; i++) {
                let rows = [];
                for (let j = 0; j < this.rows; j++) {
                    let chip = null;
                    if (i === 0) {
                        chip = new Chip(posx, posy, 15, new Image(), ctx);
                        rows.push(chip);
                    } else {
                        chip = new Chip(posx, posy, 15, this.image, ctx);
                        rows.push({
                            chip: chip,
                            value: 0
                        });
                    }
                    chip.draw();
                    posx += this.image.width;
                }
                posy += this.image.height;
                posx = (this.width / 5);
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

    left(line) {
        for (let r = 0; r < this.rows; r++) {
            let j = r;
            let i = 1;
            let tmp = [];
            while (j >= 0 && i <= this.columns) {
                tmp = this.checkArray(this.board[i][j]['value'], tmp);
                if (tmp.length === line) {
                    return tmp[0];
                }
                j--;
                i++;
            }
            for (let i = 2; i < this.columns + 1; i++) {
                let r = this.rows - 1;
                let column = i;
                let tmp = [];
                while (column < this.columns + 1 && r >= 0) {
                    tmp = this.checkArray(this.board[column][r]['value'], tmp);
                    if (tmp.length === line) {
                        return tmp[0];
                    }
                    r--;
                    column++;

                }
            }
        }
        return false;
    }
    right(line) {
        for (let r = this.rows - 1; r > 0; r--) {
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