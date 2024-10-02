import { Schema, model } from "mongoose";

const publics = new Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
    },
    autor: {
      type: Schema.Types.ObjectId,
      ref: "usuarios",
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
    },
    precio: {
      type: Number,
      required: true,
      trim: true,
    },
    imagen: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default model("publics ", publics);
