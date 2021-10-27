class Timers{
    constructor(){
        this.timerEnemy = null;
        this.timerCoin = null;
    }

    startTimers(game,over) {
        this.timerCoin = setInterval(() => {
            game.createCoins();
        }, parseInt(Math.random() * (3000 - 1000) + 1000));
        this.timerEnemy = setInterval(() => {
            game.createEnemies();
        }, parseInt(Math.random() * (10000 - 3000) + 3000));
    }

    clearTimers(){
        clearInterval(this.timerEnemy);
        clearInterval(this.timerCoin);
    }
}