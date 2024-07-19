
const isAdmin = (req = request, res = response, next) => {
    
    if ( !req.usuario ) {
        return res.status(500).json({"msg": "Se quiere validar el rol sin validar el token primero"});
    }

    const rol = req.usuario.rol;
    if(!rol || rol !== "ADMIN_ROLE") {
        return res.status(401).json({"msg": "El usuario no es admin"});
    }
    next();

}

const tieneRol = (...roles) => {
    return (req = request, res = response, next) => {

        if ( !req.usuario ) {
            return res.status(500).json({"msg": "Se quiere validar el rol sin validar el token primero"});
        }

        if(!roles.includes(req.usuario.rol)) {
            return res.status(401).json({"msg": "El usuario no tiene permisos suficientes"});
        }
        next();
    }
}

module.exports = {
    isAdmin,
    tieneRol,
}