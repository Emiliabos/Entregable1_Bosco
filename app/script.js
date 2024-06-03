function showCart(nacionalidad) {
    const cart = document.getElementById('cart');
    cart.style.display = 'block';
    let spanNacionalidad = document.querySelector('#nacionalidad');
    spanNacionalidad.textContent =  nacionalidad;
    localStorage.setItem('nacionalidad', JSON.stringify(nacionalidad));
}
function addItemsArg(){
    let htmlToAdd = '';
    for (let i = 0; i <= 2; i++) { 
        const description = entrada[i].name;
        const price = entrada[i].precio;
        htmlToAdd += `<div class="cart__item">
            <div class="cart__item-description">
            ${description}
            </div>
            <div class="cart__item-quantity">
                <button class="cart__quantity-btn btn-minus" type="button" name="button">
                    <i class="fa-solid fa-minus"></i>
                </button> 
                <input type="text" name="name" value="0" disabled>
                <button class="cart__quantity-btn btn-plus" type="button" name="button">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
            <div class="cart__item-price">$${price}</div>
            <div class="cart__item-subtotal">$0</div>
        </div>`;
    }
    const cartItems = document.querySelector('.cart__items');
    cartItems.innerHTML = '';
    cartItems.innerHTML += htmlToAdd;
}
function addItemsExt(){
    let htmlToAdd = '';
    for (let i = 3; i < entrada.length; i++) { 
        const description = entrada[i].name;
        const price = entrada[i].precio;
        htmlToAdd += `<div class="cart__item">
            <div class="cart__item-description">
            ${description}
            </div>
            <div class="cart__item-quantity">
                <button class="cart__quantity-btn btn-minus" type="button" name="button">
                    <i class="fa-solid fa-minus"></i>
                </button> 
                <input type="text" name="name" value="0" disabled>
                <button class="cart__quantity-btn btn-plus" type="button" name="button">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
            <div class="cart__item-price">$${price}</div>
            <div class="cart__item-subtotal">$0</div>
        </div>`;
    }
    const cartItems = document.querySelector('.cart__items');
    cartItems.innerHTML = '';
    cartItems.innerHTML += htmlToAdd;
}
function updatePrice() {
    let quantityInput = document.querySelectorAll('.cart__item-quantity input');
    let priceElement = document.querySelectorAll('.cart__item-price');
    let subtotalElements = document.querySelectorAll('.cart__item-subtotal');
    for (let i = 0; i < quantityInput.length; i++) {
        const quantity = parseInt(quantityInput[i].value);
        const priceUnit = parseInt(priceElement[i].textContent.replace('$', ''));
        const subtotal = priceUnit * quantity;
        subtotalElements[i].textContent = `$${subtotal}`;
    }
    let total = 0;
    subtotalElements.forEach(subtotalElement => {
        let subtotal = parseInt(subtotalElement.textContent.replace('$', ''));
        total += subtotal;
    });
    let totalElement = document.querySelector('.cart__price span');
    totalElement.textContent = `$${total}`;
}
function btnsQuantity() {
    const btnMinus = document.querySelectorAll('.btn-minus');
    const btnPlus = document.querySelectorAll('.btn-plus');
    btnMinus.forEach(btnMinus => {
        btnMinus.addEventListener('click', function() {
            const inputField = this.parentNode.querySelector('input');
            let value = parseInt(inputField.value);
            if (value > 0) {
                value--;
            }
            inputField.value = value;
            updatePrice();
        });
    });
    btnPlus.forEach(btnPlus => {
        btnPlus.addEventListener('click', function() {
            const inputField = this.parentNode.querySelector('input');
            let value = parseInt(inputField.value);
            value++;
            inputField.value = value;
            updatePrice();
        });
    });
}
function addTickets () {
    localStorage.removeItem('carrito'); 
    let type = document.querySelectorAll('.cart__item-description');
    let quantityType = document.querySelectorAll('.cart__item-quantity input');
    let priceType = document.querySelectorAll('.cart__item-subtotal');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        for (let i = 0; i < type.length; i++) {
            carrito.push({ type: type[i].innerText, quantityType: quantityType[i].value, priceType: priceType[i].innerText });
        }
    localStorage.setItem('carrito', JSON.stringify(carrito));
}
function showForm() {
    const cardInfo = document.getElementById('info');
    const quantityInputs = document.querySelectorAll('.cart__item-quantity input');
    let ticketsCart = false;
    quantityInputs.forEach(input => {
        if(parseInt(input.value) !== 0){
            ticketsCart = true;
            return;
        } 
    });
    if (ticketsCart) {
        cardInfo.style.display = 'block';
    } else {
        alert('No agregó ninguna entrada a su pedido.');
    }
}
function checkEmail() {
    const emailInput = document.getElementById("email");
    if (!emailInput.checkValidity()) {
        alert('Formato de email no permitido. Debe ingresar un correo válido.');
        return false; 
    } 
    return true;
}
function showPrice() {
    const showPrice = document.getElementById('price');
    let totalElement = document.querySelector('.cart__price span');
    let total = parseInt(totalElement.textContent.replace('$', ''));
    showPrice.textContent = `$${total}`;
}
function showModal () {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
}
function hideModal () {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}
function saveInfoUser() {
    console.log(localStorage.getItem('usuario')); 
    const fullname = document.getElementById('fullname').value;
    const dni = document.getElementById('dni').value;
    const email = document.getElementById('email').value;
    if( fullname !== "" && dni !== "" && email !== "") {
        if(checkEmail()) {
            usuario.push({fullname:fullname, dni: dni, email: email });
            localStorage.setItem('usuario', JSON.stringify(usuario));
            showPrice();
            showModal();
        }
    }else {
        alert('Debe ingresar todos sus datos para poder efectuar la compra.');
    }
}
function clearStorage() {
    carrito.splice(0, carrito.length);
    usuario.splice(0, usuario.length);
    localStorage.clear();
    document.getElementById('fullname').value = '';
    document.getElementById('dni').value = '';
    document.getElementById('email').value = '';
}
function reloadSite() {
    window.scrollTo(0, 0);
    location.reload();
}
document.getElementById('btnArg').addEventListener('click', function() {
    showCart("Argentinos"); 
    addItemsArg();  
    btnsQuantity();    
});
document.getElementById('btnExt').addEventListener('click', function() {
    showCart("Extranjeros");
    addItemsExt();
    btnsQuantity();
});
document.getElementById('confirm').addEventListener('click', function() {
    addTickets();
    showForm();
});
document.getElementById('payment').addEventListener('click', function() {
    saveInfoUser();
});
document.getElementById('close').addEventListener('click', function() {
    hideModal();
});
document.getElementById('endOrder').addEventListener('click', function() {
    clearStorage();
    reloadSite();
});
