import { Schema, model } from 'mongoose';
import  carrito  from '../models/carrito.model.js';
const pedido = new Schema({
    carrito:[
        {
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
        }
    ],
    totalFinal:{
        type:Number,
        required:true
    },
    isComplete:{
        type:String,
        required:true,
        default:"pendiente"
    },fecha:{ type: Date, default: Date.now }
    

})

export default model('pedido',pedido)