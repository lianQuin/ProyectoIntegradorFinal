

/*En Script Principal: Importaciones, inicialización del carrito, generación de elementos HTML En el script principal, debes incluir todo lo relacionado con la estructura de tu página web, la visualización de los productos y la interacción con el usuario.
Esto incluye:
La creación de elementos HTML para mostrar los productos (como imágenes, títulos, descripciones y precios).
La configuración de eventos, como el clic en el botón “Comprar”.
La inicialización de instancias, como la creación de un objeto Carrito.*/

import { Carrito } from "./clases/carrito.class.js";
import { golosinasDatabase } from "./datos/golosinas.Database.js";

//aqui se instancia la clase
const carrito = new Carrito();

const productosContainer = document.getElementById('productos-container');
golosinasDatabase.forEach(producto => {
    const productoCard = document.createElement('div');
    //accedemos a la propiedad de la clase producto con .
    productoCard.classList.add('producto-card');
    productoCard.dataset.id = producto.id;
    productoCard.dataset.precio = producto.precio;

    const imagen = document.createElement('img');
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;
    productoCard.appendChild(imagen);

    const titulo = document.createElement('h3');
    titulo.textContent = producto.nombre;
    productoCard.appendChild(titulo);

    const descripcion = document.createElement('p');
    descripcion.textContent = producto.descripcion;
    productoCard.appendChild(descripcion);

    const precio = document.createElement('p');
    precio.textContent = `Precio: $${producto.precio.toFixed(2)}`;
    productoCard.appendChild(precio);

    const stock = document.createElement('stock');
    stock.textContent = producto.stock;
    productoCard.appendChild(stock);

    const botonComprar = document.createElement('button');
    botonComprar.textContent = 'Comprar';
    botonComprar.classList.add('boton-comprar');
    productoCard.appendChild(botonComprar);

    productosContainer.appendChild(productoCard);
});


//esto viene del initEventos esta es la inicializacion de los eventos y todos estos depues se ven en el html
document.querySelectorAll('.boton-comprar').forEach((boton) => {
    boton.addEventListener('click', (evento) => {
        const productoCard = evento.target.closest('.producto-card');
        const id = productoCard.getAttribute('data-id');
        const productoEncontrado = golosinasDatabase.find(item => item.id === parseInt(id));
        carrito.agregarAlCarrito(productoEncontrado);
    });
});

document.getElementById('boton-ver-carrito').addEventListener('click', () => carrito.mostrarCarrito());
document.querySelector('.cerrar-modal').addEventListener('click', () => carrito.modalCarrito.style.display = 'none');
document.getElementById('boton-vaciar-carrito').addEventListener('click', () => carrito.vaciarCarrito());
document.getElementById('boton-finalizar-compra').addEventListener('click', () => carrito.finalizarCompra());

window.addEventListener('click', (event) => {
    if (event.target === carrito.modalCarrito) {
        carrito.modalCarrito.style.display = 'none';
    }
});
