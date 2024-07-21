
const AuthController = require('./auth.controller');
const CategoriaController = require('./categorias.controller');
const ProductoController = require('./productos.controller')
const UsuarioController = require('./usuarios.controller');

module.exports = {
    ...AuthController,
    ...CategoriaController,
    ...ProductoController,
    ...UsuarioController
}