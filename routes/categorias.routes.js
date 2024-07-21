const { Router } = require("express");
const { check } = require("express-validator");

const { validarJwt, isAdmin, validarCampos } = require("../middlewares");
const {
  obtenerCategorias,
  obtenerCategoriaById,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
} = require("../controllers");
const { existeCategoriaPorId } = require("../helpers/db-validators");

const router = Router();

router.get("/", [validarJwt, validarCampos], obtenerCategorias);

router.get(
  "/:id",
  [
    validarJwt,
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  obtenerCategoriaById
);

router.post(
  "/",
  [
    validarJwt,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

router.put(
  "/:id",
  [
    validarJwt,
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  actualizarCategoria
);

router.delete(
  "/:id",
  [
    validarJwt,
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    isAdmin,
    validarCampos,
  ],
  eliminarCategoria
);

module.exports = router;
