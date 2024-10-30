import mongoose from "mongoose";
import publics from "../models/public.models.js";
import { validarJWT } from "../helpers/validadJWT.js";

// Create public
export const createPublic = async (req, res) => {
  try {
    const token = req.headers.token;
    const { title, description, price, type, phone } = req.body;
    let imagen = "";

    if (req.file) {
      imagen = "/uploads/" + req.file.filename;
    } else {
      return res.status(400).json({ msg: "the image is required" });
    }

      console.log(token)
    
    if (!token) {
      return res.status(401).json({ msg: "Debe registrarse para realizar esa tarea" });
    }

    const usuario = await validarJWT(token);
    if (!usuario) {
      return res.status(401).json({ msg: "Token inválido" });
    }


    const idUser = usuario._id;
    const newPublic = new publics({
      title,
      autor: idUser,
      description,
      price,
      imagen,
      type,
      phone,
    });

    const result = await newPublic.save();
    if (!result) {
      return res.status(400).json({ msg: "error uploading post" });
    }
    return res.status(201).json({ msg: "post uploaded" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Get all publics or by ID
export const getAllpublics = async (req, res) => {
  try {
    const { id } = req.body;
    const getPublics = id ? await publics.find({ autor: id }) : await publics.find();
    
    if (!getPublics) {
      return res.status(402).json({ msg: "no post" });
    }
    return res.status(200).json({ getPublics });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

// Edit public by ID
export const editPublics = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ msg: "Debe registrarse para realizar esa tarea" });
    }

    const usuario = await validarJWT(token);
    if (!usuario) {
      return res.status(401).json({ msg: "Token inválido" });
    }

    const idUser = usuario._id;
    const { author, title, price, description, phone } = req.body;
    const publicFind = await publics.findOne({ autor: idUser });

    if (!publicFind) {
      return res.status(402).json({ msg: "Post not found" });
    }

    if (usuario.rol === "user" && idUser != publicFind.autor) {
      return res.status(401).json({ msg: "You are not the author of this post" });
    }

    const updatedData = { author, title, price, description, phone };
    const result = await publics.findByIdAndUpdate(publicFind._id, { $set: updatedData }, { new: true });

    if (!result) {
      return res.status(304).json({ msg: "Post not updated" });
    }
    return res.status(200).json({ msg: "Post updated", result });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

// Delete public
export const deletPublic = async (req, res) => {
  try {
    const token = req.headers.token;
    console.log(token)
    
    if (!token) {
      return res.status(401).json({ msg: "Debe registrarse para realizar esa tarea" });
    }

    const usuario = await validarJWT(token);
    if (!usuario) {
      return res.status(401).json({ msg: "Token inválido" });
    }

    const idUser = usuario._id;
    const publicFind = await publics.findOne({ autor: idUser });
    console.log(publicFind);
    console.log(idUser);
    console.log("autor",publicFind.autor)
    if (!publicFind) {
      return res.status(404).json({ msg: "not post" });
    }

    if (usuario.rol === "user" && !idUser.equals(publicFind.autor)) {
      return res.status(401).json({ msg: "You are not the author of this post" });
    }

    const result = await publics.findByIdAndDelete(publicFind._id);
    if (!result) {
      return res.status(304).json({ msg: "Post not delete" });
    }
    return res.status(201).json({ msg: "post delete" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error ", error });
  }
};
