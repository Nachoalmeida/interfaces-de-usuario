class Player extends Character {
    constructor(character) {
        super(character);
        this.jumpDone = 1;
    }

    jump(clase) {
        this.jumpDone = 0;
        this.character.classList.add(clase);
        setTimeout(()=> {
            this.character.classList.remove(clase);
            this.jumpDone = 1;
        }, 2500);
    }

    bend() {

    }

    getJumpDone() {
        return this.jumpDone;
    }
}