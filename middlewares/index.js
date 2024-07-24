const validarCampos = require("./validar-campos");
const validarJwt = require("./validar-jwt");
const validarRol = require("./validar-rol");
const validarArchivo = require("./validar-archivo");

module.exports = {
    ...validarCampos,
    ...validarJwt,
    ...validarRol,
    ...validarArchivo
}