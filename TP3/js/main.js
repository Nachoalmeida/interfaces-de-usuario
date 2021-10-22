const buttonPlayStop = document.getElementById("buttonPlayStop");

buttonPlayStop.addEventListener('click', () => {
    const button = buttonPlayStop.classList.toggle("play");
    if(!button){
        document.getElementById("pause").classList.remove('puase');
        document.getElementById("pause").classList.add('puase2');
    }else{
        document.getElementById("pause").classList.remove('puase2');
        document.getElementById("pause").classList.add('puase');
    }
    
});

//Variables cronometro.  
let h = 0;
let m = 0;
let s = 0;
let id = null;
document.getElementById("hms").innerHTML = "00:00:00";
//////////////////////