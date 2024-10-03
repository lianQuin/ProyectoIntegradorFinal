export function actualizarCarrito() {
    this.contadorProductosElemento.textContent = this.carrito.length;

    const totalProductos = this.carrito.reduce((total, producto) => total + producto.precio, 0);
    const totalElement = document.getElementById("total-productos");
    totalElement.textContent = `Total a pagar = $ ${totalProductos.toFixed(2)}`;
}

/*export function agregarAlCarrito(producto) {
    this.carrito.push(producto);
    this.actualizarCarrito();
}*/

// Dentro de la función agregarAlCarrito
export function agregarAlCarrito(producto) {
    if (producto.stock > 0) {
        // Agregar el producto al carrito
        this.carrito.push(producto);
        this.actualizarCarrito();
        producto.stock--; // Reducir el stock

        // Actualizar el elemento HTML que muestra el stock
        const productoCard = document.querySelector(`[data-id="${producto.id}"]`);
        const stockElement = productoCard.querySelector('stock'); // Asegúrate de tener una clase CSS para el stock
        stockElement.textContent = `Stock: ${producto.stock}`;
    } else {
        console.log("No hay suficiente stock para agregar este producto.");
    }
}
export function mostrarCarrito() {
    this.listaCarrito.innerHTML = '';
    this.carrito.forEach((producto, indice) => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.onclick = () => this.eliminarProducto(indice);

        li.appendChild(botonEliminar);
        this.listaCarrito.appendChild(li);
    });
    this.modalCarrito.style.display = 'block';
}

/*export function eliminarProducto(indice) {
    this.carrito.splice(indice, 1);
    this.actualizarCarrito();
    this.mostrarCarrito();
}*/
export function eliminarProducto(indice) {
    const productoEliminado = this.carrito[indice];
    this.carrito.splice(indice, 1);
    this.actualizarCarrito();
    productoEliminado.stock++; // Aumentar el stock
    this.mostrarCarrito();
}

export function vaciarCarrito() {
    this.carrito = [];
    this.actualizarCarrito();
    this.mostrarCarrito();
}

export function finalizarCompra() {
    if (this.carrito.length > 0 ) {
        alert('Compra finalizada. Gracias por tu compra!');
       
        this.vaciarCarrito();
        this.modalCarrito.style.display = 'none';
        
    }
    else if (this.carrito.length === 0 ) {
        alert('El carrito esta vacio.');
        this.modalCarrito.style.display = 'none';
    }
    else { alert('No hay elementos en el carrito'); }
}

export function initEventos() {
    document.querySelectorAll('.boton-comprar').forEach((boton) => {
        boton.addEventListener('click', (evento) => {
            const productoCard = evento.target.closest('.producto-card');
            const id = productoCard.getAttribute('data-id');
            const productoEncontrado = golosinasDatabase.find(item => item.id === parseInt(id));

            this.agregarAlCarrito(productoEncontrado);
        });
    });

    this.botonVerCarrito.addEventListener('click', () => this.mostrarCarrito());
    this.cerrarModal.addEventListener('click', () => this.modalCarrito.style.display = 'none');
    this.botonVaciarCarrito.addEventListener('click', () => this.vaciarCarrito());
    this.botonFinalizarCompra.addEventListener('click', () => this.finalizarCompra());

    window.addEventListener('click', (event) => {
        if (event.target === this.modalCarrito) {
            this.modalCarrito.style.display = 'none';
        }
    });
}
