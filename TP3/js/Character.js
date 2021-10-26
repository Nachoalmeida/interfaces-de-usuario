class Character extends Animation{
    constructor(character) {
        super(character);
    }

    getTop() {
        return parseInt(window.getComputedStyle(this.character).getPropertyValue("top"));
    }

    getRight(){
        return parseInt(window.getComputedStyle(this.character).getPropertyValue("right"));
    }

    getWidth(){
        return parseInt(this.character.offsetWidth);
    }

    getHeight(){
        return parseInt(this.character.offsetHeight);
    }
}