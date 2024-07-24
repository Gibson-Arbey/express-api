const { request, response } = require("express");

const valiarArchivoSubir = (nombreArchivo) => {
  return (req = request, res = response, next) => {
    if (
      !req.files ||
      Object.keys(req.files).length === 0 ||
      !req.files[nombreArchivo]
    ) {
      return res.status(400).json({ msg: "El archivo es obligatorio." });
    }
    next();
  };
};

module.exports = {
  valiarArchivoSubir
};
