class Character extends Animation {
    constructor(character, id, idValue, clase) {
        super(character,id, idValue, clase);
    }

    getId() {
        return this.idValue;
    }

    getTop() {
        return parseInt(window.getComputedStyle(this.character).getPropertyValue("top"));
    }

    getRight() {
        return parseInt(window.getComputedStyle(this.character).getPropertyValue("right"));
    }

    getWidth() {
        return parseInt(this.character.offsetWidth)-10;
    }

    getHeight() {
        return parseInt(this.character.offsetHeight)-10;
    }
}