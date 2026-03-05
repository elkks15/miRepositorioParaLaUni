// 5 FORMAS DE ACCEDER A LOS ELEMENTOS DE UN DOCUMENTO

// 1. getElementById() - Accede a un elemento por su ID (devuelve un solo elemento)
// Ejemplo: document.getElementById('miId')

// 2. getElementsByClassName() - Accede a elementos por su clase (devuelve una HTMLCollection)
// Ejemplo: document.getElementsByClassName('miClase')

// 3. getElementsByTagName() - Accede a elementos por su etiqueta HTML (devuelve una HTMLCollection)
// Ejemplo: document.getElementsByTagName('div')

// 4. querySelector() - Accede al primer elemento que coincida con un selector CSS (devuelve un solo elemento)
// Ejemplo: document.querySelector('.miClase')

// 5. querySelectorAll() - Accede a todos los elementos que coincidan con un selector CSS (devuelve un NodeList)
// Ejemplo: document.querySelectorAll('.miClase')




//const titulo = document.getElementById('titulo');
//console.log(titulo.innerText);
const contenedor = document.getElementsByClassName('contenedor');
console.log(contenedor[0].innerText);