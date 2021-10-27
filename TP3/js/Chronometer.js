class Chronometer {
    constructor(doc){
        this.doc = doc;
        this.ID = null;
        this.h = 0;
        this.m = 0;
        this.s = 0;
        this.doc.innerHTML = "00:00:00";
    }

    //Comienza con el cronometro.
    start() {
        this.write();
        this.ID = setInterval(()=>this.write(), 1000); //Cada 1 segundo manda a escribir el cronometro.
    }

    pause(){
        clearInterval(this.ID);
    }

    //Reinicia el cronometro.
    clear() {
        if(this.ID){
            clearInterval(this.ID);
            this.s = 0;
            this.m = 0;
            this.h = 0;
            this.doc.innerHTML = "00:00:00";
        }
    }

    //Escribe el cronometro con segundos,minutos y horas.
    write() {
        let hAux, mAux, sAux;
        this.s++;
        if (this.s > 59) {
            this.m++;
            this.s = 0;
        }
        if (this.m > 59) {
            this.h++;
            this.m = 0;
        }
        if (this.h > 24) { this.h = 0; }

        if (this.s < 10) { sAux = "0" + this.s; } else { sAux = this.s; }
        if (this.m < 10) { mAux = "0" + this.m; } else { mAux = this.m; }
        if (this.h < 10) { hAux = "0" + this.h; } else { hAux = this.h; }

        this.doc.innerHTML = hAux + ":" + mAux + ":" + sAux;
    }
}