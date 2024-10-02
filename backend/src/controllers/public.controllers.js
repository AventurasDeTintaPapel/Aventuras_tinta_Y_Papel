import mongoose from "mongoose";
import publics from "../models/public.models.js";

export const createPublic = async (req, res) => {
  try {
    const { title, autor, description, price } = req.body;
    let imagen = "";

    if (req.file) {
      imagen = "/uploads/" + req.file.filename;
    } else {
      return res.status(400).json({ msg: "La imagen es obligatoria" });
    }

    const newPublic = new publics({
      title,
      autor,
      description,
      price,
      imagen,
    });

    const result = await newPublic.save();

    if (!result) {
      return res
        .status(400)
        .json({ msg: "Ocurrió un error al crear la publicación" });
    } else {
      return res
        .status(200)
        .json({ msg: "La publicación fue creada correctamente" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Ocurrió un error interno en el servidor" });
  }
};
