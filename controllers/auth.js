const { request, response } = require("express");
const  bcryptjs  = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJwt } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

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
    return res.status(500).json({ msg: "Error en el login" });
  }
};

const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body;
  try {
    const { nombre, img, correo} = await googleVerify(id_token);

    let usuario = await Usuario.findOne({correo});
    if(!usuario) {
      const data = {
        nombre, 
        correo,
        password: ':P',
        img,
        google: true,
        rol: 'USER_ROLE'
      }
      usuario = new Usuario(data);
      await usuario.save();
    }

    if( !usuario.estado) {
      return res.status(401).json({msg: "Usuario no activo"})
    }

    //   Generar Jwt
    const token = await generarJwt(usuario.id);
    return res.json({ msg: {
        usuario,
        token
    } });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error al iniciar sesion con google" });
  }
  
}

module.exports = {
  userLogin,
  googleSignIn
};
