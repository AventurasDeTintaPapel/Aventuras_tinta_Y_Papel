import { Schema, model } from 'mongoose';

const carrito = new Schema({
  
    productos:[
        {
            producto:{
                type: Schema.Types.ObjectId,
                ref:'productos'
            },
              cantidad:{
                type:Number,
                default:1,
                required:true
            }
        }    
    ],usuario:{
        type: Schema.Types.ObjectId,
         ref: 'usuarios'
    }
})

export default model ('carrito',carrito);

