class Character extends Animation {
    constructor(character, id, idValue, clase) {
        super(character);
        this.id = id;
        this.idValue = idValue;
        this.clase = clase;
        this.setAttribute(this.id, this.idValue);
        this.addClass(this.clase);
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
        return parseInt(this.character.offsetWidth);
    }

    getHeight() {
        return parseInt(this.character.offsetHeight);
    }
    setAttribute(atributo, valor) {
        this.character.setAttribute(atributo, valor);
    }
    returnDiv() {
        return this.character;
    }
}