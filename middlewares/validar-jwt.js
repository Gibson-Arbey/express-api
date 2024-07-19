const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario  = require("../models/usuario");

const validarJwt = async (req = request, res = response, next) => {

    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({msg: "No hay token en la peticion"});
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);

        if(!usuario) {
            return res.status(401).json({msg: "Usuario no valido"});
        }

        if(!usuario.estado) {
            return res.status(401).json({msg: "Usuario no valido"});
        }

        req.usuario = {
            ...usuario._doc
        }

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({msg: "Token no valido"});
    }
    

}

module.exports = {
    validarJwt
}