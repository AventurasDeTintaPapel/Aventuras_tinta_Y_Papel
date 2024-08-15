import { Schema, model } from 'mongoose';
const favoritos = new Schema({
    producto:{
        type: Schema.Types.ObjectId
    },usuario:{
        type: Schema.Types.ObjectId, ref: 'usuarios',
    }
})
export default model ('favoritos',favoritos);