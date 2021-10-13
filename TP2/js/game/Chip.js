class Chip {

    constructor(posx, posy, radius, image, context) {
        this.posx = posx;
        this.posy = posy;
        this.image = image;
        this.ctx = context;
        this.highlighted = false;
        this.highlightedStyle = 'red';
        this.radius = radius;
    }

    setImage(i) {
        this.image = i;
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

    getImage() {
        return this.image;
    }

    setHighlighted(r) {
        this.highlighted = r;
    }

    draw() {
        this.ctx.drawImage(this.image, this.posx - this.radius, this.posy - this.radius, this.radius * 2, this.radius * 2);
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