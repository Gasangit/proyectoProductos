module.exports = class Usuario {

    // nombreUsuario (mail) puede generarse como un Symbol para asegurar que sea un dato único
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
    set nombreUsuario(nombreUsuario) {
        this._nombreUsuario = nombreUsuario;
    }
    set claveUsuario(claveUsuario) {
        this._claveUsuario = claveUsuario;
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
    get nombreUsuario() {
        return this._nombreUsuario;
    }
    get claveUsuario() {
        return this._claveUsuario;
    }

    /* FUNCTIONS ------------------------------------------------------------*/

    controlTipoDeUsuario = () => {

        if(this instanceof('Comerciante')) {

            console.log('\nMensaje Consola : EL USUARIO ES DE TIPO Comerciante');
            return true;
        }else {

            console.log('\nMensaje Consola : EL USUARIO ES DE TIPO Proovedor');
            return false;
        }
    } 
}