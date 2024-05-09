let nacionalidad = Number(prompt(`Bienvenido al Parque Nacional Los Glaciares.\n\nPara comenzar la reserva de su entrada, ingrese una opción:\n\n1. Soy Argentino\n2. Soy Extranjero`));
let menores, mayores, jubilados, menoresExtranjeros, mayoresExtranjeros;
let confirmarCompra;
let carrito = [];
let usuario = [];

const entrada = [
    { id: 1, name: 'menores',  tipoEntrada: 'menores', precio: 3000 },
    { id: 2, name: 'jubilados',tipoEntrada: 'jubilados', precio: 5000 },
    { id: 3, name: 'mayores',tipoEntrada: 'mayores', precio: 10000 },
    { id: 4, name: 'menores',tipoEntrada: 'menoresExtranjeros', precio: 12000 },
    { id: 5, name: 'mayores',tipoEntrada: 'mayoresExtranjeros', precio: 30000 }
];

function agregarEntradas(tipo, cantidad) {
    carrito.push({ tipoEntrada: tipo, cantidad: cantidad });
}

function modificarEntradas(posicion, cantidad) {
    carrito[posicion].cantidad = cantidad;
}

function calcularTotal(carrito, entrada) {
    let calculoTotal = 0;
    for(let i = 0; i < carrito.length; i++) {
        let itemCarrito = carrito[i];
        for(let j = 0; j < entrada.length ;j++ ) {
            if (entrada[j].tipoEntrada === itemCarrito.tipoEntrada) {
                calculoTotal += itemCarrito.cantidad * entrada[j].precio;
                break;
            }
        }
    }
    return calculoTotal;
}

function guardarDatosUsuarios(nombre, documento, correoElectronico) {
    usuario.push({ nombre: nombre, documento: documento, correoElectronico: correoElectronico });
}

switch(nacionalidad){
    case 1:
        alert(`Tarifas\n\n- Menores hasta 6 años: Gratis. \n- Menores de 7 a 15 años: $${entrada[0].precio}\n- Jubilados: $${entrada[1].precio}\n- Adultos desde 16 años: $${entrada[2].precio} `);
        for (let i = 0; i <= 2; i++) {
            let cantidad = parseInt(prompt(`Ingresa cantidad de ${entrada[i].name}\nEn caso de no querer entradas, ingrese 0.\nPrecio $${entrada[i].precio}.`));
            if (!isNaN(cantidad)) {
                agregarEntradas(entrada[i].tipoEntrada, cantidad);
            } else {
                alert(`No se efectuó la reserva. Los datos ingresados no son válidos.`);
                break;
            }
        }
        confirmarCompra = confirm(`Entradas agregadas al carrito:\nMenores = ${carrito[0].cantidad}\nJubilados = ${carrito[1].cantidad}\nAdultos = ${carrito[2].cantidad}\n\nPresione "aceptar" para confirmar la compra o "cancelar" si desea realizar algún cambio.`);
        if(!confirmarCompra) {
            let entradas = Number(prompt(`¿Qué entrada desea modificar? Ingrese el número correspondiente\n1.Cambiar entrada menores\n2.Cambiar entrada jubilados\n3.Cambiar entrada adultos`));
            switch(entradas){
                case 1:
                    cantidad = parseInt(prompt(`Ingresa cantidad de menores\nPrecio $${entrada[0].precio}`));
                    modificarEntradas(0, cantidad);
                    alert(`Entradas agregadas al carrito:\nMenores = ${carrito[0].cantidad}\nJubilados = ${carrito[1].cantidad}\nAdultos = ${carrito[2].cantidad}`);
                    break;
                case 2:
                    cantidad = parseInt(prompt(`Ingresa cantidad de jubilados\nPrecio $${entrada[1].precio}`));
                    modificarEntradas(1, cantidad);
                    alert(`Entradas agregadas al carrito:\nMenores = ${carrito[0].cantidad}\nJubilados = ${carrito[1].cantidad}\nAdultos = ${carrito[2].cantidad}`);
                    break;
                case 3:
                    cantidad = parseInt(prompt(`Ingresa cantidad de adultos\nPrecio $${entrada[2].precio}`));
                    modificarEntradas(2, cantidad);
                    alert(`Entradas agregadas al carrito:\nMenores = ${carrito[0].cantidad}\nJubilados = ${carrito[1].cantidad}\nAdultos = ${carrito[2].cantidad}`);
                    break;   
                default:
                    alert(`No ha realizado cambios`);
                    break;
            }
        }
        break;
    case 2:
        alert(`Tarifas\n\n- Menores hasta 6 años: Gratis. \n- Menores de 7 a 15 años: $${entrada[3].precio}\n- Adultos desde 16 años: $${entrada[4].precio} `);
        for (let i = 3; i < entrada.length; i++) {
            let cantidad = parseInt(prompt(`Ingresa cantidad de ${entrada[i].name}\nEn caso de no querer entradas, ingrese 0.\nPrecio $${entrada[i].precio}.`));
            if (!isNaN(cantidad)) {
                agregarEntradas(entrada[i].tipoEntrada, cantidad);
            } else {
                alert(`No se efectuó la reserva. Los datos ingresados no son válidos.`);
                break;
            }
        }
        confirmarCompra = confirm(`Entradas agregadas al carrito:\nMenores = ${carrito[0].cantidad}\nAdultos = ${carrito[1].cantidad}\n\nPresione "aceptar" para confirmar la compra o "cancelar" si desea realizar algún cambio.`);
        if(!confirmarCompra) {
            console.log(carrito);
            let entradas = Number(prompt(`¿Qué entrada desea modificar? Ingrese el número correspondiente\n1. Cambiar entrada menores\n2. Cambiar entrada adultos`));
            switch(entradas){
                case 1:
                    cantidad = parseInt(prompt(`Ingresa cantidad de menores\nPrecio $${entrada[3].precio} `));
                    modificarEntradas(0, cantidad);
                    alert(`Entradas agregadas al carrito:\nMenores = ${carrito[0].cantidad}\nAdultos = ${carrito[1].cantidad}`);
                    break;
                case 2:
                    cantidad = parseInt(prompt(`Ingresa cantidad de adultos\nPrecio $${entrada[4].precio}`));
                    modificarEntradas(1, cantidad);
                    alert(`Entradas agregadas al carrito:\nMenores = ${carrito[0].cantidad}\nAdultos = ${carrito[1].cantidad}`);
                    break;   
                default:
                    alert(`No ha realizado cambios`);
                    break;
            } 
        }
        break;
    default:
        alert(`Dato inválido. No ha seleccionado su nacionalidad.`);
        break;
} 
console.log(carrito);

if(nacionalidad === 1 || nacionalidad === 2) {
    //Total a Pagar
    let total = calcularTotal(carrito, entrada);
    alert(`El total a abonar es de $${total}\n\nPresione "aceptar" para confirmar la compra.`);

    //Datos para efectuar la compra
    const nombreCompleto = prompt(`Ingrese su nombre completo`);
    const dni = Number(prompt(`Ingrese su DNI (solo números)`));
    const email = prompt(`Ingrese su correo electrónico (formato email@email.com)`);
    guardarDatosUsuarios(nombreCompleto, dni, email);
    console.log(usuario);
    if(nombreCompleto != "" && dni != "" && email != "") {
        alert(`La reserva se efectuó a nombre de ${nombreCompleto} - DNI ${dni}\n\nUna vez realizado el pago, recibirá la entrada en su casilla de correo electrónico ${email}\n\nPresione "aceptar" para ser redirigido a la plataforma de pago.`);    
    }else {
        alert(`No se efectuó la reserva. Los datos ingresados no son válidos.`);    
    }
    
} 
