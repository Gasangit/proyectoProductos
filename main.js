const Usuario = require('./jsBackEnd/Usuario');
const Comerciante = require('./jsBackEnd/Comerciante');
const Producto = require('./jsBackEnd/Producto');
const Proveedor = require('./jsBackEnd/Proveedor');
//const BaseDatos = require('./jsBackEnd/bbdd/BaseDeDatos')
const mysql2 = require('mysql2');

const HTTP = require('http');
const URL = require('url');
const FILE_SYSTEM = require('fs');
const queryString = require('querystring');

HTTP.createServer(
    function(solicitud, respuesta){
        
        let urlSolicitud = URL.parse(solicitud.url, true);
        let nombreArchivo = urlSolicitud.pathname;
        let params = urlSolicitud.search;

        console.log('   ' + urlSolicitud.href + '-------------////////////');

        let datosLoginObjeto = {};
        let usuarioClave = {};
        let datosDelPost = [];

        console.log('\nMensaje Consola : URL DE LA SOLICITUD : ' + solicitud.headers.host + solicitud.url + '\n' + 'Mensaje Consola : NOMBRE DEL ARCHIVO : ' + nombreArchivo + ' -- ' + 'TIPO DE DATO : ' + typeof nombreArchivo);

        if(nombreArchivo == '/') {
            console.log('\nSOLICITUD DE : ' + nombreArchivo);

            FILE_SYSTEM.readFile('./proyectoProductos/html/login.html', function(err, datos) {
                if(err) {
    
                    FILE_SYSTEM.readFile('./proyectoProductos/html/error404.html', function(err404, html404){
                        respuesta.writeHead(404, {"ContenteType": "text/html"});
                        respuesta.write(html404);  
                        return respuesta.end();
                    })
    
                    
                }else {
                    console.log('   SE RESPONDE CON : ' + datos.url);
                    respuesta.writeHead(200, {"ContenteType": "text/html"});
                    respuesta.write(datos);  
                    return respuesta.end();
                }
    
            FILE_SYSTEM.readFile('./proyectoProductos/css/style.css', function(errCss, fileCss){
                if(errCss) throw errCss;
                respuesta.writeHead(200, {"ContentType" : "text/css"});
                respuesta.end(fileCss);
            });
            
            // Hay que pasar el css porque no se aplican los estilos a la pagina de error 404
            // Ya se aplica el css a 404 pero al actualizar muestra el código del mencionado css
            // Ahora no carga bootstrap en el INDEX << esto listo
    
            }
            )
        }
        
        if(nombreArchivo == '/registro.html' /* && solicitud.method != 'POST' */) {
            console.log('REGISTRO.HTML -- ingresa solicitud');
            FILE_SYSTEM.readFile('./proyectoProductos/html/registro.html', function(err, datos) {
                if(err) throw err;
                respuesta.writeHead(200, {"ContentType" : "text/html"});
                console.log('       A VER SI APARECE ESTO 1');
                respuesta.end(datos);
                console.log('       A VER SI APARECE ESTO 2');
            })
        }
        
        if(solicitud.method == 'POST' && nombreArchivo == '/') {
            console.log('SOLICITUD DE : ' + nombreArchivo);

            solicitud.on('error', function(err) {
                console.log(err);
            }).on('data', function(mensajePost) {
                
                console.log('\n Mensaje Consola : SE RECIBE DATO mensajePost : ' + mensajePost);
                console.log('   Mensaje Consola : TIPO DE DATO DE mensajePost : ' + typeof mensajePost);

                datosDelPost.push(mensajePost);
                console.log('\n Mensaje Consola : DATOS CONCATENADOS : ' + datosDelPost);                
            }).on('end', function() {

                datosDelPost = Buffer.concat(datosDelPost).toString();
                console.log('\n Mensaje Consola : CONTENIDO datosDelPost : ' + datosDelPost);
                console.log('   Mensaje Consola : TIPO DE DATO DE datosDelPost : ' + typeof datosDelPost);

                let arrayPost = datosDelPost.split('&');
                let usuario = arrayPost[0].split('=');
                let clave = arrayPost[1].split('=');
               
                usuarioClave =  {
                    'usuario': usuario[1],
                    'clave': clave[1]
                }; 
 
                respuesta.writeHead(200, {'ContentType' : 'text/plain'});
                respuesta.write(usuarioClave.usuario + '\n');
                respuesta.write(usuarioClave.clave);
                respuesta.end();
            });  
        }

        if(solicitud.method == 'POST' && nombreArchivo == '/registro.html') {

            console.log('INGRESA POST REGISTRO.HTML');

            solicitud.on('error', function(err) {
                throw err;
            }).on('data', function(mensajePost) {
                datosDelPost.push(mensajePost);
            }).on('end', function() {
                datosDelPost = Buffer.concat(datosDelPost).toString();

                let arrayPost = datosDelPost.split('&');

                let tipoUsuario = arrayPost[0].split('=');
                let nombre = arrayPost[1].split('=');
                let apellido = arrayPost[2].split('=');
                let dni = arrayPost[3].split('=');
                let cuit = arrayPost[4].split('=');
                let nombreNegocio = arrayPost[5].split('=');
                let calleNegocio = arrayPost[6].split('=');
                let alturaNegocio = arrayPost[7].split('=');
                let email = arrayPost[8].split('=');
                let clave = arrayPost[9].split('=');
                let claveConfirmacion = arrayPost[10].split('=');

                let datosRegistro =  {
                    'tipoUsuario' : tipoUsuario[1],
                    'nombre': nombre[1],
                    'apellido': apellido[1],
                    'dni': dni[1],
                    'cuit' : cuit[1],
                    'nombreNegocio' : nombreNegocio[1],
                    'calleNegocio' : calleNegocio[1],
                    'alturaNegocio' : alturaNegocio[1],
                    'email': email[1],
                    'clave': clave[1],
                    'claveConfirmacion': claveConfirmacion[1]
                }; 

                console.log('\nMensaje Consola (main) (recepción de registro) : ' +
                    '\nDATOS REGISTRO : -------------------------------------------------' +
                    '\n NOMBRE : ' + datosRegistro.nombre + 
                    '\n APELLIDO : ' + datosRegistro. apellido +
                    '\n DNI : ' + datosRegistro.dni +
                    '\n CLAVE : ' + datosRegistro.clave +
                    '\n CONFIRMACION CLAVE : ' + datosRegistro.claveConfirmacion
                );

                let con = mysql2.createConnection({host : 'localhost', user : 'root', password : '7485'});

                con.connect((err) => {
                    if(err) throw err;
                    let consulta = `CALL proyecto_productos.registro_usuario(${datosRegistro.tipoUsuario}, ${datosRegistro.nombre}, ${datosRegistro.apellido},${datosRegistro.dni}, ${datosRegistro.cuit}, ${datosRegistro.nombreNegocio}, ${datosRegistro.calleNegocio}, ${datosRegistro.alturaNegocio}, ${datosRegistro.email}, ${datosRegistro.clave});`

                    con.query(consulta, (err) => {
                        if(err) throw err;
                        console.log('\nMensaje Consola (main) (registro usuario) : se registro el usuario');
                    })
                })
            });

        }

        console.log('fIN sOLICITUD ------------------------------------------------------------------------');
    }
    
).listen(8080);