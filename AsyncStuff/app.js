const showMessage = () => {
    setTimeout(()=>{
        console.log("Hello World");
    },3000);
}


async function tarea() {
    return "tarea asíncrona";
}

async function ejecutable() {   
    const resultado = await tarea();
    console.log(resultado);
}

showMessage();

ejecutable();


const promesa = new Promise
((resolve, reject) => {
    const todobien = true ;
    setTimeout(()=>{
    if(todobien){
        resolve("La promesa se ha cumplido");
    }else{
        reject("La promesa no se ha cumplido");
    }},5000);
}
);

promesa.then(
   (respuesta)=>{console.log(respuesta)}
).catch(
    (error)=>(console.log(error))
);


const promesaUno= new Promise(
    (resolve, reject) => {
        resolve("Promesa Uno cumplida");
    }
)

const promesaDos= new Promise(  
    (resolve, reject) => {  
        resolve("Promesa Dos cumplida");
    }
)
const promesaTres= new Promise(
    (resolve, reject) => {
        reject("Promesa Tres no cumplida");
    }
)

promesaUno
.then(
    (res) => {
        console.log(res);
        return promesaDos;
    }
)
.then(
    (res) => {
        console.log(res);
        return promesaTres;
    }
)
.catch(
    (e) => {
        console.log(e);
    }
)

const contenedor = document.getElementById("pokemonContainer");

async function getPokemon() {
const respuesta = fetch("https://pokeapi.co/api/v2/pokemon?limit=1200&offset=0");
const datos = await respuesta.json();
console.log(datos);
const detalles =await fetch(datos.results[0].url);
}


getPokemon();