class Pencil {
    constructor(radius, fill, contex) {
        this.fill = fill;
        this.ctx = contex;
        this.radius = radius;
    }

    setFill(f) {
        this.fill = f;
    }

    setPosition(x, y) {
        this.posx = x;
        this.posy = y;
    }

    getPosition() {
        return {
            x: this.getPosx(),
            y: this.getPosy(),
        }
    }

    getPosx() {
        return this.posx;
    }

    getPosy() {
        return this.posy;
    }

    getFill() {
        return this.fill;
    }

    draw(x1, y1, x2, y2) {
        this.ctx.beginPath();
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = this.fill;
        this.ctx.lineWidth = this.radius;
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    setResult(r) {
        this.result = r;
    }

    getRadius() {
        return this.radius;
    }

    isPointInside(x, y) {
        let _x = this.posx - x;
        let _y = this.posy - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }
}