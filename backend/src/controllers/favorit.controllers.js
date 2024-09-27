import favoritos from "../models/favorito.model.js";
import { validarJWT } from "../helpers/validadJWT.js";
import producto from "../models/productos.model.js";

// Agregar un producto a favoritos
export const agreFav = async (req, res) => {
  try {
    const { idUsuario } = req.headers.token;
    const { idProducto } = req.body;

    const obtenerUsuario = await findById(idUsuario);
    const product = await producto.findbyId({ idProducto });

    if (!product) {
      res
        .status(403)
        .json({ msg: "el producto agregado correctamente a favoritos" });
    }

    const favorito = new favoritos({
      usuario: obtenerUsuario._id,
      producto: product._id,
    });

    await favorito.save();
    res.json({ msg: "Agregado a favoritos", favorito });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Ocurrió un error al agregar el producto a favoritos" });
  }
};

// Obtener todos los favoritos
export const obtFavotiros = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await favoritos.aggregate([
      {
        $match: { usuario: new ObjectId(id) },
      },
      {
        $lookup: {
          from: "productos",
          localField: "producto",
          foreignField: "_id",
          as: "productoInfo",
        },
      },
      {
        $lookup: {
          from: "usuarios",
          localField: "usuario",
          foreignField: "_id",
          as: "usuarioInfo",
        },
      },
      { $unwind: "$productoInfo" },
      { $unwind: "$usuarioInfo" },
    ]);

    res.status(200).json(resultado);
    console.log(resultado);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Ocurrió un error al obtener los favoritos" });
  }
};
export const elimiFav = async (req, res) => {
  try {
    const { idUsuario } = req.headers.token;
    const result = await findByIdAndDelete(idfav);
    if (result) {
      res
        .status(200)
        .json({ msg: "producto eliminado correctamente de favoritos" });
    } else {
      res.status(400).json({ msg: "no hay productos agregados a favoritos" });
    }
  } catch (error) {
    console.log(error);
  }
};
