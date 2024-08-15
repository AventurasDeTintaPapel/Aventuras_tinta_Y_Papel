import { Schema, model } from 'mongoose';

const carrito = new Schema({
    cantidad:{
        type:Number,
        defaul:1,
        required:true
    },
    producto:{
        type: Schema.Types.ObjectId
    },usuario:{
        type: Schema.Types.ObjectId, ref: 'usuarios',
    }
})

export default model ('carrito',carrito);

