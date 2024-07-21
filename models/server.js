const express = require('express');
const cors = require('cors');
// swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec  = require("../swagger-config")

const { dbConexion } = require('../database/config');
const producto = require('./producto');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios:'/api/usuarios',
        };

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Documentacion de mi aplicación
        this.app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))
    }

    async conectarDB() {
        await dbConexion();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.paths.auth, require('../routes/auth.routes'));
        this.app.use( this.paths.buscar, require('../routes/buscar.routes'));
        this.app.use( this.paths.categorias, require('../routes/categorias.routes'));
        this.app.use( this.paths.productos, require('../routes/productos.routes'));
        this.app.use( this.paths.usuarios, require('../routes/usuarios.routes'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
