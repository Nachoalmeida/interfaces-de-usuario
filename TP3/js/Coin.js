class Coin extends Character {
    constructor(character, id, idValue, clase) {
        super(character, id, idValue, clase);
    }

    getWidth() {
        return parseInt(this.character.offsetWidth)-50;
    }

    getHeight() {
        return parseInt(this.character.offsetHeight)-50;
    }
}