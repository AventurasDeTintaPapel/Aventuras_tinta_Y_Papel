import { Schema, model } from "mongoose";
const favorites = new Schema({
  producto: {
    type: Schema.Types.ObjectId,
    ref: "productos",
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "usuarios",
  },
});
export default model("favorites", favorites);
