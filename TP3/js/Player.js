class Player extends Character {
    constructor(character, id, idValue, clase,clase2,clase3,clase4) {
        super(character, id, idValue, clase);
        this.clase2 = clase2;
        this.clase3 = clase3;
        this.clase4 = clase4;
        this.jumpDone = 1;
        this.bendDone = 1;
    }

    //Coloca animacion saltar al jugador
    jump() {
        this.jumpDone = 0;//parámetro que chequea si la animación ya termino de ejecutarse. (0 no termino, 1 si)
        this.character.classList.add(this.clase2);//agrega la clase saltar al player
        setTimeout(() => {//se inicializa una un temporizador para remover la clase saltar cunado esta finalice
            this.character.classList.remove(this.clase2);//Se remueve la clase saltar
            this.jumpDone = 1;//el parámetro se vuelve 1 indicando que la acción ya finalizo
        }, 1700);
    }

    //Coloca animacion agacharse al jugador
    bend() {
        this.bendDone = 0;//parámetro que chequea si la animación ya termino de ejecutarse. (0 no termino, 1 si)
        this.character.classList.add(this.clase3);//agrega la clase agacharse al player
        setTimeout(() => {//se inicializa una un temporizador para remover la clase agacharse cunado esta finalice
            this.character.classList.remove(this.clase3);//Se remueve la clase agacharse
            this.bendDone = 1;//el parámetro se vuelve 1 indicando que la acción ya finalizo
        }, 1000);
    }

    //Coloca animacion morir agacharse al jugador
    die() {
        this.character.classList.add(this.clase4);//agrega la morir al player
    }

    //Retorna un valor entre 0 y 1, que indica si la acción de agacharse ya finalizo.
    getBendDone(){
        return this.bendDone;
    }

    //Retorna un valor entre 0 y 1, que indica si la acción de saltar ya finalizo.
    getJumpDone() {
        return this.jumpDone;
    }
}