
const AuthController = require('./auth.controller');
const BuscarController = require('./buscar.controller')
const CategoriaController = require('./categorias.controller');
const ProductoController = require('./productos.controller')
const UsuarioController = require('./usuarios.controller');
const UploadsController = require('./uploads.controller')
module.exports = {
    ...AuthController,
    ...BuscarController,
    ...CategoriaController,
    ...ProductoController,
    ...UsuarioController,
    ...UploadsController
}