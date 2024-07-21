
const AuthController = require('./auth.controller');
const CategoriaController = require('./categorias.controller');
const UsuarioController = require('./usuarios.controller');

module.exports = {
    ...AuthController,
    ...CategoriaController,
    ...UsuarioController
}