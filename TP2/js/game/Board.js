class Board {
    constructor(columns, rows, w, h, image, context) {
        this.columns = columns;
        this.rows = rows;
        this.width = w;
        this.height = h;
        this.image = image;
        this.ctx = context;
    }

    createBoard() {
        this.createMatrix();
    }

    createMatrix() {
        let columns = [];
        let posx = (this.width / 4);
        let posy = (this.height / 4);
        for (let i = 0; i < this.columns; i++) {
            let rows = [];
            for (let j = 0; j < this.rows; j++) {
                let chip = new Chip(posx, posy, 15, this.image, ctx);
                rows.push(chip);
                chip.draw();
                posx += this.image.width;
            }
            posy += this.image.height;
            posx = (this.width / 4);
            columns.push(rows);
        }
    }
}