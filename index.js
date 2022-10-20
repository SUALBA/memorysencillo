
let tarjetasDestapadas = 0;
let tarjeta1= null;
let tarjeta2= null;
let primerResultado= null;
let segundoResultado= null;
let movimientos = 0;
let aciertos = 0;
let temporizador= false;
let timer = 90;
let timerInicial = 90;
let tiempoRegresivoId = null;
//Apuntando a documento HTML
//
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

//generacion de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

//creare una funcion de crear tiempo,utilizo setInterval porqu el contaodr hara una cuenta atras
function contarTiempo(){
    //la funcion setinterval va con su funcio flecha y se va a ejecutar despues de un segundo=1000
    //añado tiempoRegresicoiId para poder para el tiempo
    tiempoRegresivoId = setInterval(()=>{
        timer --;
        //mostrar lo que la variable timer tenga en ese momento
        mostrarTiempo.innerHTML =`Tiempo: ${timer} segundos`;
        //especifico q si timer es 0 acabara. setinterval se detiene con un CLearInterval
        //para eso necesito crear un identificativo de este temporizador sera un let tiempoRegresivo
        if (timer == 0){
            clearInterval(tiempoRegresivoId);
            //cuando el tiempo se detenga bloqueare las tarjetas y mostrare las cartas ya que acabo el juego
            bloquearTarjetas();

        }

    },1000);

}

//aqui creare la funcion BloquearTarjetas que nombre arriba
//recorrera las 16 tarjetas y cuando acabe bloqueara todas y mostrara la solucion. (eso cuando el tiepo llegue a cero)
function bloquearTarjetas(){
    //en cada iteracion, o sea, en cada vuelta,
    for (let i = 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML= numeros [i];
        tarjetaBloqueada.disabled = true;
    }
}

//function principal
function destapar(id){
    //inserto aqui el temporizador
    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }
    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if(tarjetasDestapadas == 1){
        //mostrar primer numero
        tarjeta1=document.getElementById(id);
        primerResultado = numeros [id];
        tarjeta1.innerHTML = primerResultado;
        //deshabilitar primer boton
        tarjeta1.disabled = true;
        //que pasa si no fuese la tarjeta 1, pregunto si es la dos
    }else if(tarjetasDestapadas ==2){
        //mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado= numeros [id];
        tarjeta2.innerHTML= segundoResultado;
        //deshabilitar segundo boton
        tarjeta2.disabled = true;

        //incrementar la variable movimientos . (Abrir un par de tarjetas es UN movimiento)
         movimientos ++;
         mostrarMovimientos.innerHTML=`Movimientos: ${movimientos}`;        
         //ahora pregunto si primer resultado y segundo son iguales.
         if (primerResultado == segundoResultado){
            //poner a cero el contador de tarjetas
        tarjetasDestapadas = 0;
        //aumentar contador aciertos
        aciertos ++;
        mostrarAciertos.innerHTML= `Aciertos: ${aciertos}`;

        //vamos a ver si ya hay 8 aciertos y resolver el juego
        if (aciertos == 8){
            clearInterval(tiempoRegresivoId);
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            //mostrar el tiempo que tardo en resolverlo creo la variable
            mostrarTiempo.innerHTML = `Fantastico..Solo has necesitado ${timerInicial - timer} segundos`
            mostrarMovimientos.innerHTML = `Mmovimientos: ${movimientos}`;
        }


                //else significa  caso contrario
    }else{
        //mostrar momentaneamente valores y volverlos a tapar
        //setTimeout es un temporizador muy util, me permite ejecutar algo despues de cierto tiempo
        setTimeout(()=>{
            tarjeta1.innerHTML = ' ';
            tarjeta2.innerHTML = ' ' ;
            tarjeta1.disabled = false ;
            tarjeta2.disabled = false;
            tarjetasDestapadas = 0;
        },800);
    }
    }
}

