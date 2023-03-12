module.exports = class Producto {

    constructor(nombre = "") {
        this._productoNombre = nombre;
    }

    /* SETTERS --------------------------------------------------------------*/

    set productoNombre(nombre = "") {
        this._productoNombre = nombre;
    }

    set productoPrecio(precio = 0.0) {
        this._productoPrecio = precio;
    }

    /* GETTERS --------------------------------------------------------------*/

    get productoNombre() {
        return this._productoNombre;
    }
}