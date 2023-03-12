const Usuario = require('./Usuario');

console.log('\nMENSAJE CONSOLA (comerciante) => El tipo de dato de Usuario en el Módulo Comerciante es : ' + typeof Usuario + '\n');

module.exports = class Comerciante extends Usuario{

    constructor(nombre, apellido, dni) {
        super(nombre, apellido, dni);
    }

    /* SETTERS --------------------------------------------------------------*/


    set direccionComercio(direccion) {
        this._direccionComercio = direccion;
    }

    /* GETTERS --------------------------------------------------------------*/

    get direccionComercio() {
        return this._direccionComercio;
    }
}