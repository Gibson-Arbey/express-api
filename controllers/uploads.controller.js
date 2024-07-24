const path = require("path");
const fs = require("fs");
const { request, response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");
const { Usuario, Producto } = require("../models");

const cargarArchivo = async (req = request, res = response) => {
  try {
    const pathCompleto = await subirArchivo(req.files.archivo, "user");
    return res.json({ msg: pathCompleto });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error });
  }
};

const actualizarImagen = async (req = request, res = response) => {
  try {
    const { id, coleccion } = req.params;

    let modelo;
    switch (coleccion) {
      case "usuarios":
        modelo = await Usuario.findById(id);
        break;
      case "productos":
        modelo = await Producto.findById(id);
        break;
      default:
        return res.status(400).json({ msg: "Coleccion no permitida" });
    }
    if (!modelo) {
      return res.status(400).json({ msg: "No se encontro el registro" });
    }
    if(modelo.img) {
      const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
      if(fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
      }
    }
    const archivo = await subirArchivo(req.files.archivo, coleccion);
    modelo.img = archivo;
    await modelo.save();
    return res.json({ msg: archivo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error al actualizar imagen" });
  }
};

const obtenerImagen = async (req = request, res = response) => {
  try {
    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
      case "usuarios":
        modelo = await Usuario.findById(id);
        break;
      case "productos":
        modelo = await Producto.findById(id);
        break;
      default:
        return res.status(400).json({ msg: "Coleccion no permitida" });
    }
    if (!modelo) {
      return res.status(400).json({ msg: "No se encontro el registro" });
    }
    if(modelo.img) {
      const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
      if(fs.existsSync(pathImagen)) {
        return res.sendFile(pathImagen)
      }
    }

    const pathImagen = path.join(__dirname, '../assets/no-image.jpg');
    return res.sendFile(pathImagen);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error al obtener imagen" });
  }
}

module.exports = {
  cargarArchivo,
  actualizarImagen,
  obtenerImagen
};
