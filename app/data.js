let menores, mayores, jubilados, menoresExtranjeros, mayoresExtranjeros;
let confirmarCompra;
let nacionalidad = JSON.parse(localStorage.getItem('nacionalidad')) || [];
let carrito = [];
let usuario = [];

const entrada = [
    { id: 1, name: 'menores',  tipoEntrada: 'menores', precio: 4000 },
    { id: 2, name: 'jubilados',tipoEntrada: 'jubilados', precio: 4000 },
    { id: 3, name: 'mayores',tipoEntrada: 'mayores', precio: 10000 },
    { id: 4, name: 'menores',tipoEntrada: 'menoresExtranjeros', precio: 20000 },
    { id: 5, name: 'mayores',tipoEntrada: 'mayoresExtranjeros', precio: 35000 }
];

