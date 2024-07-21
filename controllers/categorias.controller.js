const { response, request } = require("express");

const { Categoria } = require("../models");

const obtenerCategorias = async (req = request, res = response) => {
  try {
    const { limite = 5, desde = 0 } = req.query;
    const categorias = await Categoria.find({ estado: true })
      .populate("usuario", "nombre correo")
      .skip(parseInt(desde))
      .limit(parseInt(limite));

    return res.status(200).json({
      msg: {
        total: categorias.length,
        categorias,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error al obtener categorias" });
  }
};

const obtenerCategoriaById = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findById(id);
    return res.json({ msg: categoria });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error al obtener categoria" });
  }
};

const crearCategoria = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  let categoria = await Categoria.findOne({ nombre });
  if (categoria) {
    return res.status(400).json({ msg: "La categoria ya existe" });
  }
  const data = {
    nombre,
    estado: true,
    usuario: req.usuario._id,
  };
  categoria = new Categoria(data);
  await categoria.save();
  return res.status(201).json({ msg: "La categoria se creo exitosamente" });
};

const actualizarCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const { nombre } = req.body;
  const categoria = await Categoria.findOne({ nombre });
  if (categoria) {
    return res.status(400).json({ msg: "La categoria ya existe" });
  }
  await Categoria.findByIdAndUpdate(id, { nombre });
  return res
    .status(200)
    .json({ msg: "La categoria se actualizo exitosamente" });
};

const eliminarCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  await Categoria.findByIdAndUpdate(id, { estado: false });
  return res.status(200).json({ msg: "La categoria se elimino exitosamente" });
};

module.exports = {
  obtenerCategorias,
  obtenerCategoriaById,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
};
