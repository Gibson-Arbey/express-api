const path = require("path");
const { v4: uuid4 } = require("uuid");

const subirArchivo = (
  archivo,
  carpeta = '',
  extensionesValidas = ["png", "jpg", "jpeg", "gif"]
) => {
  return new Promise((resolve, reject) => {
    const nombreCortado = archivo.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1].toLowerCase();

    if (!extensionesValidas.includes(extension)) {
      return reject("Extensión de archivo no válida");
    }

    const nombreTemp = uuid4() + "." + extension;
    const uploadPath = path.join(__dirname, "../uploads/", carpeta, nombreTemp);

    archivo.mv(uploadPath, (err) => {
      if (err) {
        console.log(err);
        return reject(err);
      }

      return resolve(nombreTemp);
    });
  });
};

module.exports = {
  subirArchivo,
};
