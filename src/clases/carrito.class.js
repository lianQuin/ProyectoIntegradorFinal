import { actualizarCarrito, agregarAlCarrito, mostrarCarrito, eliminarProducto, vaciarCarrito, finalizarCompra, initEventos } from "../funciones/carritofunciones.js";

export class Carrito {
    //definimos las propiedades, con el metodo constructor "construimos al momento de instanciar la clase"
    constructor() {
        this.carrito = [];//arreglo vacio de inicio q se va a ir rellenando.
        this.contadorProductosElemento = document.getElementById('contador-productos');
        this.totalProductosElemento = document.getElementById('total-productos');
        this.listaCarrito = document.getElementById('lista-carrito');
        this.modalCarrito = document.getElementById('modal-carrito');

        // Elementos del DOM
        this.botonVerCarrito = document.getElementById('boton-ver-carrito');
        this.cerrarModal = document.querySelector('.cerrar-modal');
        this.botonVaciarCarrito = document.getElementById('boton-vaciar-carrito');
        this.botonFinalizarCompra = document.getElementById('boton-finalizar-compra');
        this.totalElement = document.getElementById("total-productos");

        // Inicializar eventos
        this.initEventos = initEventos.bind(this);
        this.initEventos();
    }

    actualizarCarrito = actualizarCarrito.bind(this);
    agregarAlCarrito = agregarAlCarrito.bind(this);
    mostrarCarrito = mostrarCarrito.bind(this);
    eliminarProducto = eliminarProducto.bind(this);
    vaciarCarrito = vaciarCarrito.bind(this);
    finalizarCompra = finalizarCompra.bind(this);
}

