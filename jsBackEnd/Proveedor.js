const Usuario = require('./Usuario');
const Producto = require('./Producto');

module.exports = class Proveedor extends Usuario{

    constructor(nombre, apellido, dni) {
        super(nombre, apellido, dni);
        this._catalogo = [];
    }

    /* SETTERS --------------------------------------------------------------*/

    set catalogo(producto) {
        
        if(producto instanceof Producto) {
            this._catalogo.push(producto);
            console.log('MENSAJE CONSOLA (proveedor) => Producto ' + producto.productoNombre + ' agregado al catálogo\n');
        }else{
            console.log('MENSAJE CONSOLA (proveedor) => Solo se pueden settear objetos en el atributo producto\n');
        }
    }

    /* GETTERS --------------------------------------------------------------*/

    get catalogo() {
        return this._catalogo;
    }
}