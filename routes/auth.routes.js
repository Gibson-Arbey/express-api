const { Router } = require("express");
const { check } = require("express-validator");

const { userLogin, googleSignIn } = require("../controllers");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   User-login:
 *    type: object
 *    properties:
 *      correo:
 *        type: string
 *        description: Correo del usuario
 *      password:
 *        type: string
 *        description: Contraseña del usuario
 *    required:
 *      - correo
 *      - password
 *    example:
 *      correo: correo@gmail.com
 *      password: 12345678
 */

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    summary: endpoint para loguear en la aplicacion
 *    tags: [User-login]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User-login'
 *    responses:
 *      200:
 *        description: Información del usuario y el token de acceso
 *      400:
 *        description: Error en las credenciales
 *      500:
 *        description: Error en el login  
 */
router.post(
  "/login",
  [
    check("correo", "El correo no es valido").isEmail(),
    check("password", "La contrase es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  userLogin
);


/**
 * @swagger
 * /api/auth/login-google:
 *  post:
 *    summary: endpoint para loguear en la aplicacion usando Google
 */
router.post(
  "/login-google",
  [
    check("id_token", "El id_token no es valido.").not().isEmpty(),
    validarCampos,
  ],
  googleSignIn
);
module.exports = router;
