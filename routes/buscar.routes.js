const { Router } = require("express");

const { buscador } = require('../controllers');
const { validarJwt, validarCampos } = require("../middlewares");
const router = Router();

router.get('/:coleccion/:termino',[
    validarJwt,
    validarCampos
], buscador)

module.exports = router;