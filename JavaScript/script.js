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
            <article class="cartProductos">
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
                    <div class="cantidad">
                        <i class='bx bxs-up-arrow-circle'></i>
                        <span>0</span>
                        <i class='bx bxs-down-arrow-circle' ></i>
                    </div>
                    <i class='bx bxs-trash' ></i>
                </div>
            </article>`

            carritoProducts.push(product);
            alert('Agregasté satisfactoriamente el producto');
        }else{
            if(id == idP){
                alert('Ya se agregó este producto al carrito');
            }
        }

    });

}

function borrarCrrito(){
    cartProd.innerHTML = '';
}

// renderProducts();
