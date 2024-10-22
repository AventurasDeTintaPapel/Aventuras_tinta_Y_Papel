import favorites from "../models/favorito.model.js";
import { validarJWT } from "../helpers/validadJWT.js";
import producto from "../models/productos.model.js";

// add product to favorite
export const addToFav = async (req, res) => {
  try {
    const { idProducto } = req.body;

    const token = req.headers.token;

    if (!token) {
      return res
        .status(401)
        .json({ msg: "You must register to be able to perform this task" });
    }

    const usuario = await validarJWT(token);
    if (!usuario) {
      return res.status(401).json({ msg: "Invalid Token" });
    }

    const idUsuario = usuario._id;
    const ObjectId = new mongoose.Types.ObjectId();

    const obtenerUsuario = await usuario.findById(idUsuario);
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

// get favs for id
export const getFavs = async (req, res) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res
        .status(401)
        .json({ msg: "You must register to be able to perform this task" });
    }

    const usuario = await validarJWT(token);
    if (!usuario) {
      return res.status(401).json({ msg: "Invalid Token" });
    }

    const idUsuario = usuario._id;
    const ObjectId = new mongoose.Types.ObjectId();

    const resultado = await favoritos.aggregate([
      {
        $match: { usuario: new ObjectId(idUsuario) },
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
      .json({ error: "An error occurred while getting the favorites", error });
  }
};
//delete products for id
export const deleteFavs = async (req, res) => {
  try {
    const token = req.headers.token;
    const { idProd } = req.body;
    if (!token) {
      return res
        .status(401)
        .json({ msg: "You must register to be able to perform this task" });
    }

    const usuario = await validarJWT(token);
    if (!usuario) {
      return res.status(401).json({ msg: "Invalid Token" });
    }

    const idUsuario = usuario._id;
    const ObjectId = new mongoose.Types.ObjectId();

    const result = await favoritos.deleteOne({
      usuario: idUsuario,
      producto: idProd,
    });
    if (result) {
      res
        .status(200)
        .json({ msg: "Product successfully removed from favorites" });
    } else {
      res.status(400).json({ msg: "Product not found in favorites" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "interval server error" });
  }
};
