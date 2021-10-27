class Points {
    constructor(span,points) {
        this.points = points;
        this.span = span;
        this.last = null;
        this.span.innerHTML = points;
    }

    getPoints(){
        return this.points;
    }

    setPoints(points){
        this.points = points;
        this.span.innerHTML = points;
    }

    setLast(last){
        this.last = last;
    }

    getLast(){
        return this.last;
    }

}