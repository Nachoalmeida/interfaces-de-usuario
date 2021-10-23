class Character {
    constructor(character) {
        this.character = character;

    }

    jump(clase) {
        //console.log(clase);
        this.character.classList.add(clase);




    }
    removeClass(clase) {
        this.character.classList.remove(clase);
    }

    bend() {

    }

    getTop() {
        return this.top;
    }



}