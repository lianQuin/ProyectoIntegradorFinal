// script.js
import { Carrito } from "./clases/carrito.class.js";
import { golosinasDatabase } from "./datos/golosinas.Database.js";

document.addEventListener('DOMContentLoaded', function() {
    const carrito = new Carrito();

    const productosContainer = document.getElementById('productos-container');
    if (productosContainer) {
        golosinasDatabase.forEach(producto => {
            const productoCard = document.createElement('div');
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

        document.querySelectorAll('.boton-comprar').forEach((boton) => {
            boton.addEventListener('click', (evento) => {
                const productoCard = evento.target.closest('.producto-card');
                const id = productoCard.getAttribute('data-id');
                const productoEncontrado = golosinasDatabase.find(item => item.id === parseInt(id));
                carrito.agregarAlCarrito(productoEncontrado);
            });
        });
    }

    const botonVerCarrito = document.getElementById('boton-ver-carrito');
    if (botonVerCarrito) {
        botonVerCarrito.addEventListener('click', () => carrito.mostrarCarrito());
    }

    const cerrarModal = document.querySelector('.cerrar-modal');
    if (cerrarModal) {
        cerrarModal.addEventListener('click', () => carrito.modalCarrito.style.display = 'none');
    }

    const botonVaciarCarrito = document.getElementById('boton-vaciar-carrito');
    if (botonVaciarCarrito) {
        botonVaciarCarrito.addEventListener('click', () => carrito.vaciarCarrito());
    }

    const botonFinalizarCompra = document.getElementById('boton-finalizar-compra');
    if (botonFinalizarCompra) {
        botonFinalizarCompra.addEventListener('click', () => carrito.finalizarCompra());
    }

    window.addEventListener('click', (event) => {
        if (event.target === carrito.modalCarrito) {
            carrito.modalCarrito.style.display = 'none';
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const reseñasContainer = document.getElementById('reseñas-container');
    const form = document.getElementById('reseñas-form');

    // Reseña inicial
    const nuevaReseña = {
        estrellas: '⭐⭐⭐⭐⭐',
        fecha: '2024-10-27',
        texto: '¡Las mejores golosinas que he probado! Definitivamente volveré a comprar.',
        fotos: ['../../assets/img/peinado.jpg']  
    };
    agregarReseña(nuevaReseña);

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const texto = document.getElementById('reseña').value;
        const estrellas = document.getElementById('estrellas').value;
        const fotoInput = document.getElementById('foto');
        const fecha = new Date().toISOString().split('T')[0];

        let fotos = [];
        if (fotoInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(e) {
                fotos.push(e.target.result);
                agregarReseña({ nombre, texto, estrellas, fotos, fecha });
            };
            reader.readAsDataURL(fotoInput.files[0]);
        } else {
            agregarReseña({ nombre, texto, estrellas, fotos, fecha });
        }

        form.reset();
    });

    function agregarReseña({ nombre, texto, estrellas, fotos, fecha }) {
        const reseñaCard = document.createElement('div');
        reseñaCard.classList.add('reseña-card');
    
        const reseñaInfo = document.createElement('div');
        reseñaInfo.classList.add('reseña-info');
    
        const reseñaEstrellas = document.createElement('span');
        reseñaEstrellas.classList.add('reseña-estrellas');
        reseñaEstrellas.textContent = estrellas;
    
        const reseñaFecha = document.createElement('span');
        reseñaFecha.classList.add('reseña-fecha');
        reseñaFecha.textContent = fecha;
    
        reseñaInfo.appendChild(reseñaEstrellas);
        reseñaInfo.appendChild(reseñaFecha);
    
        const reseñaTexto = document.createElement('p');
        reseñaTexto.classList.add('reseña-texto');
        reseñaTexto.textContent = texto;
    
        const reseñaNombre = document.createElement('p');
        reseñaNombre.classList.add('reseña-nombre');
        reseñaNombre.textContent = nombre ? `Escrito por: ${nombre}` : '';
    
        const reseñaFotos = document.createElement('div');
        reseñaFotos.classList.add('reseña-fotos');
        
        fotos.forEach(foto => {
            const img = document.createElement('img');
            img.src = foto;
            img.alt = 'Foto de reseña';
            reseñaFotos.appendChild(img);
        });
    
        reseñaCard.appendChild(reseñaInfo);
        reseñaCard.appendChild(reseñaNombre);
        reseñaCard.appendChild(reseñaTexto);
        reseñaCard.appendChild(reseñaFotos);
    
        const reseñasContainer = document.getElementById('reseñas-container');
        reseñasContainer.appendChild(reseñaCard);
    }
});    






