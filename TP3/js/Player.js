class Player extends Character {
    constructor(character, id, idValue, clase,clase2,clase3) {
        super(character, id, idValue, clase);
        this.clase2 = clase2;
        this.clase3 = clase3;
        this.jumpDone = 1;
        this.bendDone = 1;
    }

    jump() {
        this.jumpDone = 0;
        this.character.classList.add(this.clase2);
        setTimeout(() => {
            this.character.classList.remove(this.clase2);
            this.jumpDone = 1;
        }, 2500);
    }

    bend() {
        this.bendDone = 0;
        this.character.classList.add(this.clase3);
        setTimeout(() => {
            this.character.classList.remove(this.clase3);
            this.bendDone = 1;
        }, 1500);
    }

    getBendDone() {
        return this.bendDone;
    }

    getJumpDone() {
        return this.jumpDone;
    }
}