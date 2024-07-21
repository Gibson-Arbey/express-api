const { response, request } = require("express");

const { Producto } = require("../models");

const obtenerProductos = async (req = request, res = response) => {
  try {
    const { limite = 5, desde = 0 } = req.query;
    const productos = await Producto.find({ estado: true })
      .populate("usuario", "nombre correo")
      .populate("categoria", "nombre")
      .skip(parseInt(desde))
      .limit(parseInt(limite));

    return res.status(200).json({
      msg: {
        total: productos.length,
        productos,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error al obtener productos" });
  }
};

const obtenerProductoById = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findById(id)
      .populate("usuario", "nombre correo")
      .populate("categoria", "nombre");
    return res.json({ msg: producto });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error al obtener producto" });
  }
};

const crearProducto = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase().trim();
  const { descripcion, precio, categoria } = req.body;
  let producto = await Producto.findOne({ nombre });
  if (producto) {
    return res.status(400).json({ msg: "El producto ya existe" });
  }
  const data = {
    nombre,
    estado: true,
    usuario: req.usuario._id,
    descripcion,
    precio,
    categoria
  };
  producto = new Producto(data);
  await producto.save();
  return res.status(201).json({ msg: "El producto se creo exitosamente" });
};

const actualizarProducto = async (req = request, res = response) => {
  const { id } = req.params;
  const nombre = req.body.nombre.toUpperCase().trim();
  const { descripcion, precio } = req.body;
  const producto = await Producto.findOne({ nombre });
  if (producto) {
    return res.status(400).json({ msg: "El producto ya existe" });
  }
  await Producto.findByIdAndUpdate(id, {
    nombre,
    usuario: req.usuario._id,
    descripcion,
    precio,
  });
  return res.status(200).json({ msg: "El producto se actualizo exitosamente" });
};

const eliminarProducto = async (req = request, res = response) => {
  const { id } = req.params;
  await Producto.findByIdAndUpdate(id, { estado: false });
  return res.status(200).json({ msg: "El producto se elimino exitosamente" });
};

module.exports = {
  obtenerProductos,
  obtenerProductoById,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};
