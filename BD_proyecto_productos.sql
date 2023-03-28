DROP DATABASE proyecto_productos;

CREATE DATABASE IF NOT EXISTS proyecto_productos;

USE proyecto_productos;

DROP TABLE IF EXISTS comercios;
CREATE TABLE IF NOT EXISTS comercios (
	id_comercio INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255) NOT NULL,
    comercio_calle VARCHAR(255),
	comercio_altura VARCHAR(6),
    PRIMARY KEY(id_comercio)
);

DROP TABLE IF EXISTS usuarios;
CREATE TABLE IF NOT EXISTS usuarios (
	id_usuario INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    clave VARCHAR(255) NOT NULL,
    tipo_usuario VARCHAR(50) NOT NULL,
    PRIMARY KEY(id_usuario)
);

DROP TABLE IF EXISTS productos;
CREATE TABLE IF NOT EXISTS productos (
	id_producto INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(255) NOT NULL,
	fabricante VARCHAR(255) NOT NULL,
    PRIMARY KEY(id_producto)
);

DROP TABLE IF EXISTS catalogos;
CREATE TABLE IF NOT EXISTS catalogos (
	id_catalogo INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT(300),
    PRIMARY KEY(id_catalogo)
);

DROP TABLE IF EXISTS comerciantes;
CREATE TABLE IF NOT EXISTS comerciantes (
	id_comerciante INT NOT NULL AUTO_INCREMENT,
    id_usuario INT,
	id_comercio INT,
    nombre VARCHAR(255) NOT NULL,
	apellido VARCHAR(255) NOT NULL,
	dni VARCHAR(8) NOT NULL,
	cuit VARCHAR(13) NOT NULL, -- el formulario tiene que tener 3 campos para después concatenar el CUIT
    PRIMARY KEY(id_comerciante),
    CONSTRAINT `verificar_acceso_comerciante`
		FOREIGN KEY (id_usuario)
		REFERENCES usuarios(id_usuario),
	CONSTRAINT `verificar_comercio`
		FOREIGN KEY(id_comercio)
        REFERENCES comercios(id_comercio)
    ); 

DROP TABLE IF EXISTS proveedores;
CREATE TABLE IF NOT EXISTS proveedores (
	id_proveedor INT NOT NULL AUTO_INCREMENT,
    id_usuario INT,
    id_catalogo INT, -- ¿Tabla intermedia catalogo_productos?
	nombre VARCHAR(255) NOT NULL,
	apellido VARCHAR(255) NOT NULL,
	dni VARCHAR(8) NOT NULL,
	cuit VARCHAR(13) NOT NULL, -- el formulario tiene que tener 3 campos para depués concatenar el CUIT
    PRIMARY KEY(id_proveedor),
    CONSTRAINT `verificar_usuario`
		FOREIGN KEY(id_usuario)
        REFERENCES usuarios(id_usuario),
    CONSTRAINT `verificar_catalogo`
		FOREIGN KEY (id_catalogo)
        REFERENCES catalogos(id_catalogo)
);

DROP TABLE IF EXISTS comerciantes_proveedores;
CREATE TABLE IF NOT EXISTS comerciantes_proveedores (
	id_comerciante_proveedor INT NOT NULL AUTO_INCREMENT,
    id_comerciante INT,
    id_proveedor INT,
    PRIMARY KEY(id_comerciante_proveedor),
    CONSTRAINT `verificar_comerciante`
		FOREIGN KEY (id_comerciante)
        REFERENCES comerciantes(id_comerciante),
	CONSTRAINT `verificar_proveedor`
		FOREIGN KEY (id_proveedor)
        REFERENCES proveedores(id_proveedor)
);

DROP TABLE IF EXISTS catalogos_productos;
CREATE TABLE IF NOT EXISTS catalogos_productos (
	id_catalogo_producto INT NOT NULL AUTO_INCREMENT,
    id_catalogo INT,
    id_producto INT,
    PRIMARY KEY (id_catalogo_producto),
    CONSTRAINT `par_catalogo_producto` UNIQUE(id_catalogo, id_producto)
);

-- -------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS registro_usuario;

DELIMITER $$

CREATE PROCEDURE registro_usuario(p_tipo_usuario VARCHAR(50), p_nombre VARCHAR(255), 
									p_apellido VARCHAR(255), p_dni VARCHAR(8), p_cuit VARCHAR(11), 
                                    p_comercio_nombre VARCHAR(255),p_comercio_calle VARCHAR(255), 
                                    p_comercio_altura VARCHAR(6), p_email VARCHAR(255), p_clave VARCHAR(255))
	BEGIN
        
		IF LOWER(p_tipo_usuario) = "comerciante" THEN
			INSERT INTO proyecto_productos.usuarios(email, clave, tipo_usuario) VALUES(p_email, p_clave, p_tipo_usuario);
            INSERT INTO proyecto_productos.comercios(nombre, comercio_calle, comercio_altura) VALUES(p_comercio_nombre, p_comercio_calle, p_comercio_altura);
            INSERT INTO proyecto_productos.comerciantes(nombre, apellido, dni, cuit) VALUES(p_nombre, p_apellido, p_dni, p_cuit);
			
			
		
        ELSEIF LOWER(p_tipo_usuario) = "proveedor" THEN
        
			INSERT INTO proyecto_productos.proveedores(nombre, apellido, dni, cuit) VALUES(p_nombre, p_apellido, p_dni, p_cuit);
			INSERT INTO proyecto_productos.usuarios(email, clave, tipo_usuario) VALUES(p_email, p_clave, p_tipo_usuario);
		END IF;
        
	END $$
    
DELIMITER ;
-- -------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS login_control;

DELIMITER $$
CREATE PROCEDURE login_control(p_email VARCHAR(100), p_clave VARCHAR(50))

	BEGIN
		SELECT id_usuario
		FROM usuarios
		WHERE email = p_email AND clave = p_clave; 
	END $$
	
DELIMITER ;

-- use proyecto_productos;

-- CALL registro_usuario("comerciante", "Anselmo", "Torres", "23789654", "30237896543", "Un Bar", "Belaustegui", "1153", "unbar@gmail.com", "123");  

select * from proyecto_productos.comerciantes;