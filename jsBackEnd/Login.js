const Usuario = require('./backEnd/Usuario');

module.exports = class Login {

    constructor(tipoUsuario, Usuario) {
        
        this._Usuario = Usuario;
    }

    /* SETTERS --------------------------------------------------------------*/

    set usuario(Usuario) {
        this._Usuario = Usuario
    }

    /* GETTERS --------------------------------------------------------------*/

    get usuario() {
        return this._Usuario;
    }

    /* FUNCTIONS ------------------------------------------------------------*/

    controlLogin = (Usuario) => {


    }
}