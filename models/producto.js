const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
  estado: {
    type: Boolean,
    required: [true, "El estado es obligatorio"],
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  precio: {
    type: Number,
    default: 0,
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
  descripcion: {
    type: String,
  },
  disponible: {
    type: Boolean,
    default: true
  },
});

ProductoSchema.methods.toJSON = function () {
  const { __v, _id, ...producto } = this.toObject();
  producto.uid = _id;
  return producto;
};

module.exports = model("Producto", ProductoSchema);
