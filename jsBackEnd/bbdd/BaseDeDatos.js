const mysql = require('mysql');

module.exports  = {

    bdDatosConexion : {
        host : 'localhost',
        user : 'root',
        password : '7485'
    },

    bdConexion() {
        let conexion = mysql.createConnection(this.bdDatosConexion.host, this.bdDatosConexion.user, this.bdDatosConexion.password)
        conexion.connect((err) => {
            if(err) throw err;
            console.log('\n Mensaje Consola (Objeto BaseDeDatos.js) (function - bdConexion): conexión a base de datos creada');
            return conexion;
        })
    },

    bdEnviarQuery(consulta) {
        let conexion = this.bdConexion;
        conexion.query(consulta, (err) => {
            if(err) throw err;
            console.log('\n Mensaje Consola (Objeto BaseDeDatos.js) (function - bdEnviarQuery): se envío la consulta a la base de datos');
        })
    }

} 