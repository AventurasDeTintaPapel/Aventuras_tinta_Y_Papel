import { Mongoose } from "mongoose";
import supplier from "../models/supplier.model.js";

export const createSupplier = async (req, res) => {
  const { name, company, email, address, phone } = req.body;
  try {
    if (!name || !company || !email || !address || !phone) {
      res.status(401).json({ msg: "datos insuficientes" });
    }
    const newProveedor = new supplier({
      name,
      company,
      email,
      address,
      phone,
    });
    const result = await newProveedor.save();

    if (!result) {
      res.status(401).json({ msg: "error " });
    } else {
      res.status(201).json({ msg: "proveedor creado correctamente " });
    }
  } catch (error) {
    res.status(500).json({ msg: "ocurrio un error", error });
  }
};
