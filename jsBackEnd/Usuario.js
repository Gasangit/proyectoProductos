module.exports = class Usuario {

    constructor(nombre, apellido, dni){
        this._nombre = nombre;
        this._apellido = apellido;
        this._dni = dni;
    }

    /* SETTERS --------------------------------------------------------------*/

    set idUsuario(id) {
        this._idUsuario = id;
    }
    set nombre(nombre = ""){
        this._nombre = nombre;
    }
    set apellido(apellido = ""){
        this._apellido = apellido;
    }
    set dni(dni = ""){
        this._dni = dni;
    }
    set cuit(cuit = ""){
        this._cuit = cuit;
    }

    /* GETTERS --------------------------------------------------------------*/

    get idUsuario() {
        return this._idUsuario;
    }
    get nombre() {
        return this._nombre;
    }
    get apellido() {
        return this._apellido;
    }
    get dni() {
        return this._dni
    }
    get cuit() {
        return this._cuit
    }
}