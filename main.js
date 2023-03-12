const Usuario = require('./jsBackEnd/Usuario');
const Comerciante = require('./jsBackEnd/Comerciante');
const Producto = require('./jsBackEnd/Producto');
const Proveedor = require('./jsBackEnd/Proveedor');

const HTTP = require('http');
const URL = require('url');
const FILE_SYSTEM = require('fs');
const queryString = require('querystring');

HTTP.createServer(
    function(solicitud, respuesta){
        
        let urlSolicitud = URL.parse(solicitud.url, true);
        let nombreArchivo = urlSolicitud.pathName;

        let datosLoginObjeto = {};
        let usuarioClave = {};

        console.log('URL DE LA SOLICITUD : ' + urlSolicitud + '\n' + 'NOMBRE DEL ARCHIVO : ' + nombreArchivo + '\n');

        FILE_SYSTEM.readFile('./proyectoProductos/html/login.html', function(err, datos) {
            if(err) {

                FILE_SYSTEM.readFile('./proyectoProductos/html/error404.html', function(err404, html404){
                    respuesta.writeHead(404, {"ContenteType": "text/html"});
                    respuesta.write(html404);  
                    return respuesta.end();
                })

                
            }else {
                respuesta.writeHead(200, {"ContenteType": "text/html"});
                respuesta.write(datos);  
                return respuesta.end();
            }

            FILE_SYSTEM.readFile('./proyectoProductos/css/style.css', function(errCss, fileCss){
                if(errCss) throw errCss;
                respuesta.writeHead(200, {"ContentType" : "text/css"});
                respuesta.end(fileCss);
            });
            
            //hay que pasar el css porque no se aplican los estilos a la pagina de error 404
            //ya se aplica el css a 404 pero al actualizar muestra el código del mencionado css
            //ahora no carga bootstrap en el INDEX << esto listo

        }
        )
        
        if(solicitud.method == 'POST' /* && solicitud.url == '/login.html' */) {
            
            solicitud.on('error', function(err) {
                console.log(err);
            }).on('data', function(mensajePost) {
                
                console.log('SE RECIBE DATO : ' + mensajePost);
                console.log('TIPO DE DATO : ' + typeof mensajePost + '\n');

                datosLoginObjeto = queryString.parse(mensajePost);
                console.log(datosLoginObjeto.usuario);
                usuarioClave = {'usuario' : datosLoginObjeto.usuario + '\n', 'clave' : datosLoginObjeto.clave + '\n'}
                
            }).on('end', function() {
                respuesta.writeHead(200, {'ContentType' : 'text/plain'});
                respuesta.write(usuarioClave.usuario);
                respuesta.write(usuarioClave.clave);
                respuesta.end();
            });  
        }
    }
).listen(8080);