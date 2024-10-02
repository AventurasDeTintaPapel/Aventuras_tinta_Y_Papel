import productos from "../models/productos.model.js";
import publics from "../models/public.models.js";

//funcion para cargar las publicaciones
export const createPublic = async (req, res) => {
  try {
    const { titulo, autor, descripcion, precio } = req.body;
    let imagen = "";
    if (req.file) {
      imagen = "/uploads/" + req.file.filename;
    } else {
      return res.status(400).json({ msg: "La imagen es obligatoria" });
    }
    //funcion para crear una nueva publicacion
    const newPublic = new publics({
      titulo,
      autor,
      descripcion,
      precio,
      imagen,
    });

    const result = await newPublic.save();

    if (!result) {
      res.status(400).json({ msg: "ocurrio un error al crear la publicacion" });
    } else {
      return res
        .status(200)
        .json({ msg: "La publicacion fue creada correctamente " });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "ocurrio un error interno en el servidor" });
  }
};
