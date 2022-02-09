//Sumas consecutivas
const sumasConsecutivas=document.getElementById('sumasConsecutivas');
const btnSumasConsecutivas=document.getElementById('btnSumasConsecutivas');
const sumasConsecutivasResultado=document.getElementById('sumasConsecutivasResultado');
const msgSumasConsecutivas=document.getElementById('msgSumasConsecutivas');
btnSumasConsecutivas.addEventListener('click', sumas);
function sumas(e) {
    if(sumasConsecutivas.value){
        msgSumasConsecutivas.innerHTML="Calculando las sumas consecutivas del número "+sumasConsecutivas.value;
        axios.get('/sumasParciales?num='+sumasConsecutivas.value).then(function (response) {
            sumasConsecutivasResultado.innerHTML=response.data;
            msgSumasConsecutivas.innerHTML="Listo."
        });
    }else{
        msgSumasConsecutivas.innerHTML="Escriba un número."
        sumasConsecutivas.focus();
    }
}
//Lenguaje de la F
const txtLenguajeF=document.getElementById('txtLenguajeF');
const msgLenguajeF=document.getElementById('msgLenguajeF');
const btnLenguajeF=document.getElementById('btnLenguajeF');
const resultLenguajeF=document.getElementById('resultLenguajeF');
btnLenguajeF.addEventListener('click', traducirLenguajeF);
function traducirLenguajeF(e) {
    if(txtLenguajeF.value){
        msgLenguajeF.innerHTML="Traduciendo...";
        axios.get('/lenguajeF?txt='+txtLenguajeF.value).then(function (response) {
            resultLenguajeF.innerHTML=response.data;
            msgLenguajeF.innerHTML="Listo."
        });
    }else{
        msgLenguajeF.innerHTML="Escriba algún texto."
        txtLenguajeF.focus();
    }
}
//Ahorcado
//https://palabras-aleatorias-public-api.herokuapp.com/random
const espaciosAhorcado=document.getElementById('espaciosAhorcado');
const msgsAhorcado=document.getElementById('msgsAhorcado');
const btnAhorcado=document.getElementById('btnAhorcado');
btnAhorcado.addEventListener('click', nuevoJuego);
function nuevoJuego(e) {
    axios.get('https://palabras-aleatorias-public-api.herokuapp.com/random')
    .then(function (response) {
        let palabra=response.data.body.Word;
        console.log(palabra);
        let errores=palabra.length-3;
        let letras=palabra.length-2;
        espaciosAhorcado.innerHTML = '';
        for (let index = 0; index < palabra.length; index++) {
            let space=document.createElement('input');
            space.style.width="20px";
            space.id=index;
            space.maxLength = 1;
            space.addEventListener('change', jugar);
            espaciosAhorcado.appendChild(space);
            if(index===0){
                space.value=palabra[index].toUpperCase();
                space.disabled = true;
            }
            if(index===palabra.length-1){
                space.value=palabra[palabra.length-1].toUpperCase();
                space.disabled = true;
            }
            msgsAhorcado.innerHTML="Errores disponibles: "+errores;
        }
        function jugar(e) {
            console.log(e.srcElement.id);
            if(palabra[e.srcElement.id]===document.getElementById(e.srcElement.id).value){
                document.getElementById(e.srcElement.id).value.toUpperCase();
                document.getElementById(e.srcElement.id).disabled = true;
                letras=letras-1;
                console.log(letras);
                
                if(letras===0){
                    msgsAhorcado.innerHTML="Ganaste! Y te sobraron "+errores+" errores.";
                }
            }else{
                if(errores===0){
                    msgsAhorcado.innerHTML="Juego terminado, has perdido."
                    espaciosAhorcado.innerHTML = '';
                }
                    document.getElementById(e.srcElement.id).value='';
                    errores=errores-1;
                    msgsAhorcado.innerHTML="Errores disponibles: "+errores;
                }
            
            }
    });
}