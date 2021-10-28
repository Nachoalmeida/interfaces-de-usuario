class Timers{
    constructor(){
        this.timerEnemy = null;
        this.timerCoin = null;
    }

    //Inicializa los intervalos que con los cuales se van a crear los enemigos del jugador y las monedas que tendrá que recolectar en el juego.
    startTimers(game) {
        this.timerCoin = setInterval(() => {
            game.createCoins();
        }, parseInt(Math.random() * (3000 - 1000) + 1000));
        this.timerEnemy = setInterval(() => {
            game.createEnemies();
        }, parseInt(Math.random() * (10000 - 3000) + 3000));
    }

    //Eliminar las instancias de los intervalos.
    clearTimers(){
        clearInterval(this.timerEnemy);
        clearInterval(this.timerCoin);
    }
}