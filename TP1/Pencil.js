class Pencil {
    constructor(posx,posy,radius,fill,contex){
        this.posx = posx;
        this.posy = posy;
        this.fill = fill;
        this.ctx = contex;
        this.radius = radius;
    }

    setFill(f){
        this.fill=f;    
    }

    setPosition(x,y){
        this.posx = x;
        this.posy = y;
    }

    getPosition(){
        return {
            x: this.getPosx(),
            y: this.getPosy(),
        }
    }

    getPosx(){
        return this.posx;
    }

    getPosy(){
        return this.posy;
    }

    getFill(){
        return this.fill;
    }

    draw(){
        this.ctx.fillStyle = this.fill;
        this.ctx.beginPath();
        this.ctx.arc(this.posx, this.posy, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }

    setResult(r){
        this.result = r;
    }

    getRadius(){
        return this.radius;
    }

    isPointInside(x,y){
        let _x = this.posx - x;
        let _y = this.posy - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }
}