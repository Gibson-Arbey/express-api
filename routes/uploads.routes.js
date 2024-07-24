const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { cargarArchivo, actualizarImagen, obtenerImagen } = require("../controllers");
const { validarJwt, valiarArchivoSubir } = require("../middlewares");
const { coleccionesPermitidas } = require("../helpers/db-validators");

const router = Router();

router.post("/", [valiarArchivoSubir("archivo"), validarCampos], cargarArchivo);

router.put(
  "/:coleccion/:id",
  [
    validarJwt,
    valiarArchivoSubir("archivo"),
    check("id", "El id no es valido").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  actualizarImagen
);

router.get(
  "/:coleccion/:id",
  [
    validarJwt,
    check("id", "El id no es valido").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  obtenerImagen
);

module.exports = router;
