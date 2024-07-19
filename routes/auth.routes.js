const { Router } = require('express');
const { check } = require('express-validator');
const { userLogin } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', [
    check("correo", "El correo no es valido").isEmail(),
    check("password", "La contrase es obligatoria").not().isEmpty(),
    validarCampos
], userLogin );


module.exports = router;