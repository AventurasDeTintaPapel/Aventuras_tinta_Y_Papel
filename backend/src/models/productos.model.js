import { Schema, model } from "mongoose";

const productos = new Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
    },
    autor: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
    },
    tipo: {
      type: String,
      required: true,
      trim: true,
    },
    idioma: {
      type: String,
      required: true,
      trim: true,
    },
    categoria: {
      type: String,
      required: true,
      trim: true,
    },
    numeroEdicion: {
      type: Number,
      required: true,
      trim: true,
    },
    precio: {
      type: Number,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      trim: true,
    },
    imagen: {
      type: String,
      required: true,
    },
    comentarios: [
      {
        body: {
          type: String,
        },
        usuario: {
          type: Schema.Types.ObjectId,
          ref: "usuarios",
        },
      },
    ],
    proveedor: {
      type: Schema.Types.ObjectId,
      ref: "proveedores",
    },
  },
  {
    timestamps: true,
  }
);
export default model("productos", productos);
