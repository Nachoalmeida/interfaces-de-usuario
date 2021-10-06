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
        let p = this.ctx.createPattern(this.image, "repeat");
        this.ctx.fillStyle = p;
        this.ctx.fillRect((this.width / 4) + 16, (this.height / 4) - 4, this.columns * 32, this.rows * 32);
    }
}