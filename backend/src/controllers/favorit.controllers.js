import { validarJWT } from "../helpers/validadJWT.js";
import usuario from "../models/usuarios.model.js";
import producto from "../models/productos.model.js";
import mongoose from "mongoose";

// Agregar producto a favoritos
export const addToFav = async (req, res) => {
  try {
    const { idProduct, idUser } = req.body;
    // const token = req.headers.token;

    // // Verificar si el token está presente
    // if (!token) {
    //   return res
    //     .status(401)
    //     .json({ msg: "You must register to be able to perform this task" });
    // }

    // const user = await validarJWT(token);
    // // Verificar si el token es válido
    // if (!user) {
    //   return res.status(401).json({ msg: "Invalid Token" });
    // }

    // const userId = user._id;
    // console.log(idProducto);
    // console.log(user);

    // Buscar el usuario
    const userFind = await usuario.findById(idUser);
    if (!userFind) {
      return res.status(404).json({ msg: "User not find" });
    }

    // Buscar el producto
    const product = await producto.findById(idProduct);
    if (!product) {
      res.status(404).json({ msg: "Product nor find" });
    }

    const result = userFind.favorites.push({
      producto: product,
    });
    await userFind.save(result);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Ocurrió un error al agregar el producto a favoritos" });
  }
};

// Obtener favoritos por ID

export const getFavs = async (req, res) => {
  try {
    const { idUser } = req.body;
    //     const token = req.headers.token;
    //     // Verificar si el token está presente
    //     if (!token) {
    //       return res
    //         .status(401)
    //         .json({ msg: "You must register to be able to perform this task" });
    //     }
    //     const usuario = await validarJWT(token);
    //     // Verificar si el token es válido
    //     if (!usuario) {
    //       return res.status(401).json({ msg: "Invalid Token" });
    //     }
    //     const idUsuario = usuario._id;

    const result = await usuario
      .findById(idUser)
      .populate("favorites.producto");

    if (!result) {
      return res.status(404).json({ msg: "User not find" });
    }

    res.status(200).json({ favorites: result.favorites });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "internal server error ", error });
  }
};

// // Eliminar productos de favoritos
// export const deleteFavs = async (req, res) => {
//   try {
//     const token = req.headers.token;
//     const { idProd } = req.body;

//     // Verificar si el token está presente
//     if (!token) {
//       return res
//         .status(401)
//         .json({ msg: "You must register to be able to perform this task" });
//     }

//     const usuario = await validarJWT(token);
//     // Verificar si el token es válido
//     if (!usuario) {
//       return res.status(401).json({ msg: "Invalid Token" });
//     }

//     const idUsuario = usuario._id;

//     // Eliminar el favorito
//     const result = await favorites.deleteOne({
//       usuario: idUsuario,
//       producto: idProd,
//     });

//     if (result.deletedCount > 0) {
//       return res
//         .status(200)
//         .json({ msg: "Product successfully removed from favorites" });
//     } else {
//       return res.status(400).json({ msg: "Product not found in favorites" });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ msg: "Internal server error" });
//   }
// };

//delete favs
export const deleteFavs = async (req, res) => {
  const { idProduct, idUser } = req.body;

  try {
    const userFind = await usuario.findById(idUser);
    if (!userFind) {
      return res.status(404).json({ msg: "User not found" });
    }

    const prodFind = userFind.favorites.find(
      (fav) => fav.producto && fav.producto.toString() === idProduct
    );

    if (!prodFind) {
      return res.status(404).json({ msg: "The product is not in favorites" });
    }

    const result = await usuario.updateOne(
      { _id: idUser },
      { $pull: { favorites: { producto: prodFind.producto } } }
    );

    if (result) {
      return res.status(200).json({ msg: "Deleted product from favorites" });
    } else {
      return res
        .status(400)
        .json({ msg: "Error removing product from favorites" });
    }
  } catch (err) {
    console.error("Internal server error:", err);
    return res.status(500).json({ msg: "Internal server error", err });
  }
};
