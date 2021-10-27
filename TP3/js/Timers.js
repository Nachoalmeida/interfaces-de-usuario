class Timers{
    constructor(){
        this.timer = null;
        this.timerEnemy = null;
        this.timerCoin = null;
    }

    startTimers(game) {
        this.timer = setInterval(() => {
            game.gameRun();
        }, 50);
        this.timerCoin = setInterval(() => {
            game.createCoins();
        }, parseInt(Math.random() * (6000 - 1000) + 1000));
        this.timerEnemy = setInterval(() => {
            game.createEnemies();
        }, parseInt(Math.random() * (10000 - 3000) + 3000));
    }

    clearTimers(){
        clearInterval(this.timer);
        clearInterval(this.timerEnemy);
        clearInterval(this.timerCoin);
    }
}