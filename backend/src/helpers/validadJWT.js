import jwt from "jsonwebtoken";
import usuario from "../models/usuarios.model.js";
import verify from "jsonwebtoken";

//funcion para validar jwt
export const validarJWT = async (token) => {
  try {
    const { id } = verify(token, "mysecret");
    //funcion para buscar al usuario
    const usuario = await usuario.findById(id);

    if (!usuario) {
      return false;
    } else {
      return usuario;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
