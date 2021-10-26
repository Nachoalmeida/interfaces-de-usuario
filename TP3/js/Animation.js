class Animation {
    constructor(character) {
        this.character = character;
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
}