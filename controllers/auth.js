const { request, response } = require("express");
const  bcryptjs  = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJwt } = require("../helpers/generar-jwt");

const userLogin = async (req = request, res = response) => {
  const { correo, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });

    // Validar correo
    if (!usuario) {
      return res.status(400).json({ msg: "Usuario o contraseña incorrectos" });
    }

    // Validar estado usuario
    if (!usuario.estado) {
      return res.status(400).json({ msg: "Usuario o contraseña incorrectos" });
    }

    // Validar contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({ msg: "Usuario o contraseña incorrectos" });
    }

    //   Generar Jwt
    const token = await generarJwt(usuario.id);
    return res.json({ msg: {
        usuario,
        token
    } });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Eror en el login" });
  }
};

module.exports = {
  userLogin,
};
