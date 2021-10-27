class Game {
    constructor(chronometer,backgrounds,spanLife,spanPoints){
        this.chronometer = chronometer;
        this.backgrounds = backgrounds;
        this.spanLife = spanLife;
        this.spanPoints = spanPoints;
        this.player = null;
        this.pet = null;
        this.enemies = [];
        this.coins = [];
        this.game = null;
        this.timers = new Timers();
    }

    unPauseGame() {
        this.game = 1;
        this.timers.startTimers(this);
        this.chronometer.start();
        this.animatiosState('running')
    }
    
    pauseGame() {
        this.game = 0;
        this.chronometer.pause();
        this.animatiosState('paused')
        this.timers.clearTimers();
    }

    animatiosState(state){
        this.player.animationState(state);
        this.pet.animationState(state);
        for(let i=0; i<this.backgrounds.length;i++){
            this.backgrounds[i].animationState(state);
        }
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].animationState(state);
        }
        for (let i = 0; i < this.coins.length; i++) {
            this.coins[i].animationState(state);
        }
    }
    
    createEnemies() {
        const tmp = Math.random();
        let getEnemy = null;
        if (tmp < 0.5) {
            getEnemy = new Character(document.createElement("div"), "id", "bear" + tmp, "runBear");
        } else {
            getEnemy = new Character(document.createElement("div"), "id", "bird" + tmp, "flyBird");
        }
        this.backgrounds[2].appendChild(getEnemy.returnDiv());
        this.enemies.push(getEnemy);
    }
    
    createCoins() {
        const getCoin = new Character(document.createElement("div"), "id", "coin" + Math.random(), "coin");
        this.backgrounds[2].appendChild(getCoin.returnDiv());
        this.coins.push(getCoin);
    }

    startGame(value) {
        this.chronometer.start();
        this.game = 1;
        const players = value.split("-");
        for (let i = 0; i < players.length; i++) {
            const values = players[i].split(","); //[0] id,[1]value,[2]clase,[3]clase,[4]clase
            const getPlayer = new Player(document.createElement("div"), values[0], values[1],values[2],values[3],values[4]);
            this.backgrounds[2].appendChild(getPlayer.returnDiv());
            if (i == 0) {
                this.player = getPlayer;
            } else {
                this.pet = getPlayer;
            }
        }
        this.timers.startTimers(this);
    }

    getGame(){
        return this.game;
    }

    doneEvent(key){
        if (key === 'ArrowUp' && (this.player.getJumpDone() && this.pet.getJumpDone()) && this.player.getBendDone()) {
            this.player.jump();
            this.pet.jump();
        }
        if (key === 'ArrowDown' && (this.player.getBendDone() && this.pet.getJumpDone())) {
            this.player.bend();
        }
    }


    gameRun() {
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].getId() !== this.spanLife.getLast() && this.collision(this.enemies[i])) {
                this.spanLife.setPoints(this.spanLife.getPoints()-1);
                this.spanLife.setLast(this.enemies[i].getId());
            };
        }
        if (this.enemies.length > 0) {
            if (this.enemies[0].getRight() > 900) {
                this.backgrounds[2].removeChild(this.enemies[0].returnDiv());
                this.enemies.shift();
            }
        }
        for (let i = 0; i < this.coins.length; i++) {
            let check = this.collision(this.coins[i]);
            if (check) {
                this.backgrounds[2].removeChild(this.coins[0].returnDiv());
                this.coins.shift();
                this.spanPoints.setPoints(this.spanPoints.getPoints() + 1);
                this.spanPoints.setLast(this.coins[i].getId());
            }
        }
        if (this.coins.length > 0) {
            if (this.coins[0].getRight() > 900) {
                this.backgrounds[2].removeChild(this.coins[0].returnDiv());
                this.coins.shift();
            }
        }
    }
    
    collision(enemy) {
        if (this.player.getRight() < enemy.getRight() + enemy.getWidth() && this.player.getRight() + this.player.getWidth() > enemy.getRight() && this.player.getTop() < enemy.getTop() + enemy.getHeight() && this.player.getTop() + this.player.getHeight() > enemy.getTop()) {
            return true;
        } else {
            return false;
        }
    }
}