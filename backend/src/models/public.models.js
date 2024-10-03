import { Schema, model } from "mongoose";

const publics = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    autor: {
      type: Schema.Types.ObjectId,
      ref: "usuarios",
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    imagen: {
      type: String,
      required: true,
    },
    coments: [
      {
        body: {
          type: String,
        },
        user: {
          type: Schema.Types.ObjectId,
          ref: "usuarios",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
export default model("publics ", publics);
