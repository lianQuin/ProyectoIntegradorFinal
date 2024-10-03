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
export async function finalizarCompra() {
    if (this.carrito.length > 0) {
        // Solicitar el nombre y el correo del cliente
        const nombreCliente = prompt('Por favor, ingresa tu nombre:');
        const correoCliente = prompt('Por favor, ingresa tu correo electrónico:');

        if (!nombreCliente || !correoCliente) {
            alert('Debes proporcionar tu nombre y correo para finalizar la compra.');
            return;
        }

        

        // Crear un objeto con los datos del pedido
        const pedido = {
            nombre: nombreCliente,
            email: correoCliente,
            productos: this.carrito.map(item => {
                return `${item.nombre} (Precio: $${item.precio}, Stock: ${item.stock}, Descripción: ${item.descripcion})`;
            }).join('\n'), // Lista de productos separados por salto de línea

        };

        try {
            // Enviar los datos del pedido a Formspree
            const response = await fetch('https://formspree.io/f/mqakzapn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pedido),
            });

            if (response.ok) {
                alert('Compra finalizada. Gracias por tu compra. Recibirás un correo con los detalles.');
                this.vaciarCarrito();
                this.modalCarrito.style.display = 'none';
            } else {
                alert('Hubo un error al procesar la compra. Por favor, inténtalo nuevamente más tarde.');
            }
        } catch (error) {
            console.error('Error al enviar el pedido:', error);
        }
    } else {
        alert('El carrito está vacío.');
        this.modalCarrito.style.display = 'none';
    }
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
