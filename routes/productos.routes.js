const { Router } = require("express");
const { check } = require("express-validator");

const { validarJwt, isAdmin, validarCampos } = require("../middlewares");
const {
  obtenerProductos,
  obtenerProductoById,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} = require("../controllers");
const {
  existeCategoriaPorId,
  existeProductoPorId,
} = require("../helpers/db-validators");

const router = Router();

router.get("/", [validarJwt, validarCampos], obtenerProductos);

router.get(
  "/:id",
  [
    validarJwt,
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProductoById
);

router.post(
  "/",
  [
    validarJwt,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("descripcion", "La descripcion es obligatoria").not().isEmpty(),
    check("precio")
      .optional()
      .isNumeric()
      .withMessage("El precio debe ser un número"),
    check("categoria").custom(existeCategoriaPorId),
    validarCampos,
  ],
  crearProducto
);

router.put(
  "/:id",
  [
    validarJwt,
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("descripcion", "La descripcion es obligatoria").not().isEmpty(),
    check("precio").isNumeric().withMessage("El precio debe ser un número"),
    validarCampos,
  ],
  actualizarProducto
);

router.delete(
  "/:id",
  [
    validarJwt,
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    isAdmin,
    validarCampos,
  ],
  eliminarProducto
);

module.exports = router;
