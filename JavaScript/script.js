//Importamos los datos
import { productos } from "./data.js";

//Traemos los elementos necesarios del HTML
const productsContainer = document.getElementById('products');

//Almaceno los productos existentes
let products = productos;

//Carga inicial de la página
// document.addEventListener("DOMContentLoaded", () => {
//     renderProducts();
//   });


/*--------------------FUNCIONES-------------------------------*/

function renderProducts(){

    products.forEach((product) => {
        productsContainer.innerHTML += `
            <article class="cardProductos">
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
                    <button class="btn-agregar">
                        AGREGAR AL CARRITO
                        <i class='bx bx-cart-add' ></i>
                    </button>
                </div>
            </article>`
    });
}

renderProducts();