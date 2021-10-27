class Animation {
    constructor(character,id, idValue, clase) {
        this.character = character;
        this.id = id;
        this.idValue = idValue;
        this.clase = clase;
        this.setAttribute(this.id, this.idValue);
        this.addClass(this.clase);
    }

    animationState(state) {
        this.character.style.animationPlayState = state;
    }

    animationDuration(state) {
        this.character.style.animationDuration = state;
    }

    addClass(clase) {
        this.character.classList.add(clase);
    }
    appendChild(child) {
        this.character.appendChild(child);
    }

    removeChild(child) {
        this.character.removeChild(child);
    }

    setAttribute(atributo, valor) {
        this.character.setAttribute(atributo, valor);
    }

    returnDiv() {
        return this.character;
    }
}