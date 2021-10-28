class Game {
    constructor(chronometer, backgrounds, spanLife, spanPoints) { //El nuevo juego recibe el div del cronometro, un arreglo con los fondos y los span de vidas y puntos
        this.chronometer = new Chronometer(chronometer);
        this.backgrounds = backgrounds;
        this.backgrounds[1].appendChild(this.backgrounds[2].returnDiv());
        this.spanLife = new Points(spanLife, 5);
        this.spanPoints = new Points(spanPoints, 0);
        this.player = null;
        this.pet = null;
        this.enemies = [];
        this.coins = [];
        this.game = null;
    }

    unPauseGame() { //Despausar Juego
        this.game = 1;
        this.chronometer.start(); //Inicia cronometro
        this.animationState('running') //Todos los elementos del juego estan "corriendo"
    }

    pauseGame() { //Pausar el juego
        this.game = 0;
        this.chronometer.pause(); //Pausa el cronometro
        this.animationState('paused') //Todos los elementos del juego estan "pausados"
    }

    animationState(state) { //Setea el "state" a todos los elementos del juego
        this.player.animationState(state);
        this.pet.animationState(state);
        for (let i = 0; i < this.backgrounds.length; i++) {
            this.backgrounds[i].animationState(state);
        }
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].animationState(state);
        }
        for (let i = 0; i < this.coins.length; i++) {
            this.coins[i].animationState(state);
        }
    }

    createEnemies() { //Crea los enemigos
        const tmp = Math.random(); //tmp guarda un numero entre 0 y 1
        let getEnemy = null;
        if (tmp < 0.5) { //Si tmp es menor a 0.5..
            getEnemy = new Character(document.createElement("div"), "id", "bear" + tmp, "runBear"); //Crea un oso
        } else { //Si tmp es mayor o igual a 0.5..
            getEnemy = new Character(document.createElement("div"), "id", "bird" + tmp, "flyBird"); //Crea un cuervo
        }
        this.backgrounds[2].appendChild(getEnemy.returnDiv()); //Agrega el enemigo al DOM dentro de backgroundTwo
        this.enemies.push(getEnemy); //Guarda el enemigo en un arreglo
    }

    createCoins() { //Crea las monedas
        const getCoin = new Character(document.createElement("div"), "id", "coin" + Math.random(), "coin"); //Crea una moneda
        this.backgrounds[2].appendChild(getCoin.returnDiv()); //Agrega la moneda al DOM dentro de backgroundTwo
        this.coins.push(getCoin); //Guarda la moneda en un arreglo
    }

    startGame(value) { //Inicia el juego, recibe los datos del personaje seleccionado
        this.chronometer.start(); //Inicia el cronometro que muestra el juego
        this.game = 1;
        const players = value.split("-"); //Separa por "-" y guarda en un arreglo los datos obtenidos del select del personaje
        for (let i = 0; i < players.length; i++) {
            const values = players[i].split(","); //Separa por "," y guarda en un arreglo. Obtiene:[0]id,[1]value,[2]clase,[3]clase,[4]clase,[5]clase
            const getPlayer = new Player(document.createElement("div"), values[0], values[1], values[2], values[3], values[4], values[5]); //Crea el Jugador
            this.backgrounds[2].appendChild(getPlayer.returnDiv()); //Agrega el jugador al DOM dentro de backgroundTwo
            if (i == 0) {
                this.player = getPlayer; //En la primer ubicacion habrá un jugador, por lo que guarda un jugador
            } else {
                this.pet = getPlayer; //En la segunda ubicación habra una mascota, por lo que guarda una mascota
            }
        }
    }

    getGame() {
        return this.game; //Devuelve si el juego, p saber si esta iniciado
    }

    getLifes() {
        return this.spanLife.getPoints(); //Devuelve el numero de vidas
    }

    doneEvent(key) { //Chequea la tecla presionada, tambien que hayan terminado de ejecutar otra accion, y ejecuta lo que corresponda
        if (key === 'ArrowUp' && (this.player.getJumpDone() && this.pet.getJumpDone()) && this.player.getBendDone()) {
            this.player.jump(); //Saltan jugador y mascota
            this.pet.jump();
        }
        if (key === 'ArrowDown' && (this.player.getBendDone() && this.pet.getJumpDone())) {
            this.player.bend(); //Se agacha sólo el jugador
        }
    }

    //////////////////METODO DE CONTROL DE LOS PERSONAJES DEL JUEGO Y SU INTERACCION////////////////
    gameRun() {
        for (let i = 0; i < this.enemies.length; i++) { //Para cada enemigo..
            if (this.enemies[i].getId() !== this.spanLife.getLast() && this.collision(this.enemies[i])) { //Si el id del enemigo chequeado es distinto al ultimo registrado y hay colision, resto una vida
                this.spanLife.setPoints(this.spanLife.getPoints() - 1);
                this.spanLife.setLast(this.enemies[i].getId());
            };
        }
        if (this.enemies.length > 0) { //Si hay algun enemigo..
            if (this.enemies[0].getRight() > 900) { //Chequeo que el primero del arreglo se salga de la pantalla..
                this.backgrounds[2].removeChild(this.enemies[0].returnDiv()); //Elimino al enemigo del DOM 
                this.enemies.shift(); //Elimino al enemigo del arreglo que lo contenia
            }
        }
        for (let i = 0; i < this.coins.length; i++) {
            let check = this.collision(this.coins[i]); //Chequeo para una moneda si hay colision
            if (this.coins[i].getId() !== this.spanPoints.getLast() && check) { //Si el id de la moneda es distinto al ultimo registrado y hay colision..
                this.spanPoints.setLast(this.coins[i].getId()); //guardo el id de la moneda
                this.coins[i].addClass('coinShow'); //Agrego clase p mostrar la animación correspondiente
                let coin = this.coins[i]; //Guardo la moneda
                this.coins.splice(i, 1); //Elimino la moneda del arreglo
                setTimeout(() => {
                    this.spanPoints.setPoints(this.spanPoints.getPoints() + 1); //Agrego 1 a la cantidad de monedas recolectadas
                    this.backgrounds[2].removeChild(coin.returnDiv()); //Elimino la moneda del DOM
                }, 500);
            }
        }
        if (this.coins.length > 0) { //Si hay alguna moneda..
            if (this.coins[0].getRight() > 900) { //Y se sale de la pantalla..
                this.backgrounds[2].removeChild(this.coins[0].returnDiv()); //Elimino la moneda del DOM
                this.coins.shift(); //Elimino la moneda del arreglo
            }
        }
    }

    collision(enemy) { //Chequea si el jugador colisiona contra algun elemento del juego
        if (this.player.getRight() < enemy.getRight() + enemy.getWidth() && this.player.getRight() + this.player.getWidth() > enemy.getRight() && this.player.getTop() < enemy.getTop() + enemy.getHeight() && this.player.getTop() + this.player.getHeight() > enemy.getTop()) {
            return true;
        } else {
            return false;
        }
    }

    diePlayer() {
        this.player.animationState('running');
        this.player.die(); //Setea una clase para que efectue la animacion correspondiente y luego pausa el jugador
    }
}