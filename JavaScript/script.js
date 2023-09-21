//Importamos los datos
import { productos } from "./data.js";

//Traemos los elementos necesarios del HTML
const productsContainer = document.getElementById('products');
const carrito = document.getElementById('cart');
const cerrar = document.getElementById('close');
const cartProd = document.getElementById('container-cartProd');
const btnBorrar = document.getElementById('btn-vaciar');

//Almaceno los productos existentes
let products = productos;
let carritoProducts = [];


carrito.addEventListener('click', abrirCarro);
cerrar.addEventListener('click', cerrarCarro);
btnBorrar.addEventListener('click',borrarCrrito);

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    productsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-agregar')) {
        let productoCart = event.target;
        console.log(productoCart);
        let idProduct = event.target.id;
        agregarCarrito(idProduct);
    }
    });
});

function sumarProductoCarrito(id) {
    const productoEnCarrito = carritoProducts.find(product => product.id == id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
        const cantidadElement = document.querySelector(`.cartProductos[data-id="${id}"] .accionesProducto span`);
        cantidadElement.textContent = productoEnCarrito.cantidad;

        const precioProducto = productoEnCarrito.precio;
        const precioTotal = precioProducto * productoEnCarrito.cantidad;

        const precioTotalElement = document.querySelector(`.cartProductos[data-id="${id}"] .cart-infoProducto h4`);
        precioTotalElement.textContent = `$ ${precioTotal.toFixed(2)}`;
    
        calcularYMostrarTotal();
    }
}

function restarProductoCarrito(id) {
    const productoEnCarrito = carritoProducts.find(product => product.id == id);
    if (productoEnCarrito && productoEnCarrito.cantidad > 1) {
        productoEnCarrito.cantidad--;
        const cantidadElement = document.querySelector(`.cartProductos[data-id="${id}"] .accionesProducto span`);
        cantidadElement.textContent = productoEnCarrito.cantidad;

        const precioProducto = productoEnCarrito.precio;
        const precioTotal = precioProducto * productoEnCarrito.cantidad;

        const precioTotalElement = document.querySelector(`.cartProductos[data-id="${id}"] .cart-infoProducto h4`);
        precioTotalElement.textContent = `$ ${precioTotal.toFixed(2)}`;
    
        calcularYMostrarTotal();
    }
}

function eliminarProductoCarrito(id) {
    const index = carritoProducts.findIndex(product => product.id == id);
    if (index !== -1) {
        carritoProducts.splice(index, 1);
        const elementoAEliminar = document.querySelector(`.cartProductos[data-id="${id}"]`);
        elementoAEliminar.remove();
        calcularYMostrarTotal();
    }
}

function calcularYMostrarTotal() {
    let total = 0;
    carritoProducts.forEach((product) => {
        total += product.precio * product.cantidad;
    });

    const totalValorElement = document.getElementById('total-valor');
    totalValorElement.textContent = `$ ${total.toFixed(2)}`;
}

/*--------------------FUNCIONES-------------------------------*/

function renderProducts(){

    products.forEach((product) => {
        productsContainer.innerHTML += `
            <article class="cardProductos" id=${product.id}>
                <div class="container-producto">
                    <div class="card-image">
                        <img src="${product.imagen}" alt="producto-papeleria">
                    </div>
                    <div class="card-infoProducto">
                        <span>${product.categoria}</span>
                        <h3>${product.nombre}</h3>
                        <h4>$ ${product.precio}</h4>
                    </div>
                </div>
                <div class="container-btnAdd" id="btn-Add">
                    <button class="btn-agregar" id=${product.id}>
                        AGREGAR AL CARRITO
                        <i class='bx bx-cart-add'></i>
                    </button>
                </div>
            </article>`
    });
}


function abrirCarro(){
    const visible = document.querySelector('.active');
    visible.style.visibility = 'visible'
}

function cerrarCarro(){
    const visible = document.querySelector('.active');
    visible.style.visibility = 'hidden'
}

function agregarCarrito(id){
    console.log('holi funciono');

    products.forEach((product,idP) => {

        if(id == idP && (!carritoProducts.includes(product))){
           cartProd.innerHTML += `
            <article class="cartProductos" data-id="${product.id}">
                <div class="producto">
                    <div class="cart-image">
                        <img src="${product.imagen}" alt="producto-papeleria">
                    </div>
                    <div class="cart-infoProducto">
                        <span>${product.categoria}</span>
                        <h3>${product.nombre}</h3>
                        <h4>$ ${product.precio}</h4>
                    </div>
                </div>
                <div class="accionesProducto">
                    <button class="btn-sumar-carrito" data-id="${product.id}">+</button>
                    <span>1</span>
                    <button class="btn-restar-carrito" data-id="${product.id}">-</button>
                    <button class="btn-eliminar" data-id="${product.id}">Eliminar</button>
                </div>
            </article>`;

            carritoProducts.push({ ...product, cantidad: 1 });
            alert('Agregaste satisfactoriamente el producto');
        } else if (id == idP) {
            alert('Ya se agregó este producto al carrito');
        }
    });

    // Luego de agregar un producto al carrito, actualiza los eventos para los botones de sumar, restar y eliminar
    actualizarEventosBotones();

    // Calcular total
    calcularYMostrarTotal();

}

function borrarCrrito(){
    cartProd.innerHTML = '';
    carritoProducts = [];
    calcularYMostrarTotal();
}


// renderProducts();

function actualizarEventosBotones() {
    const btnSumarCarrito = document.querySelectorAll('.btn-sumar-carrito');
    const btnRestarCarrito = document.querySelectorAll('.btn-restar-carrito');
    const btnEliminar = document.querySelectorAll('.btn-eliminar');

    btnSumarCarrito.forEach(button => {
        button.addEventListener('click', () => sumarProductoCarrito(button.dataset.id));
    });

    btnRestarCarrito.forEach(button => {
        button.addEventListener('click', () => restarProductoCarrito(button.dataset.id));
    });

    btnEliminar.forEach(button => {
        button.addEventListener('click', () => eliminarProductoCarrito(button.dataset.id));
    });
}