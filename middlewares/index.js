const validarCampos = require("./validar-campos");
const validarJwt = require("./validar-jwt");
const validarRol = require("./validar-rol");


module.exports = {
    ...validarCampos,
    ...validarJwt,
    ...validarRol
}