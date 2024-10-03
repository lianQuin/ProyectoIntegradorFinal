
export class Producto{
    //De esta manera encapsulo y dejo en privado datos que no deberian cambiar.no se pueden modificar estas propiedades desde afuera.

    #id;
    #nombre;
    #precio;
    #imagen;
    #descripcion;
    #stock;

    constructor(id, nombre, precio,imagen,descripcion,stock){ 
        this.#id = id;
        this.#nombre = nombre;
        this.#precio = precio;
        this.#imagen= imagen;
        this.#descripcion= descripcion;
        this.#stock= stock;
    }
    //utilizo get para "autorizar la vista de mis datos con # que significan datos privados"
    get id (){
        return this.#id;
    }
    get nombre (){
        return this.#nombre;
    }
    get precio (){
        return this.#precio;
    }
    get imagen (){
        return this.#imagen;
    }
    get descripcion (){
        return this.#descripcion;
    }
    get stock (){
        return this.#stock;
    }
    set stock(nuevoStock) {
        this._stock = nuevoStock;
    }
   /* manejarStock(cantidad, operacion) {
        if (operacion === "sumar") {
            this.actualizarStock(this.stock + cantidad);
        } else if (operacion === "restar") {
            this.actualizarStock(this.stock - cantidad);
        } else {
            console.error("Operación no válida.");
        }
    }

    actualizarStock(nuevoStock) {
        this.stock = nuevoStock;
    }*/


        
} 

