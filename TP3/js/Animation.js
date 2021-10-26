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
}   