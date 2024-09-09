import { Schema, model } from "mongoose";

const pedido = new Schema({
  numPedido: {
    type: Number,
    required: true,
  },
  productos: [
    {
      producto: {
        type: Schema.Types.ObjectId,
        ref: "productos",
      },
      cantidad: {
        type: Number,
        default: 1,
        required: true,
      },
    },
  ],
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "usuarios",
    required: true,
  },
  totalFinal: {
    type: Number,
    required: true,
  },
  estado: {
    type: String,
    required: true,
    default: "incompleto",
  },
  fecha: { type: Date, default: Date.now },
});

export default model("pedido", pedido);
