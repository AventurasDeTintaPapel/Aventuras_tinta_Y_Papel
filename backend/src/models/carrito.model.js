const {Schema,model}= require('mongoose');

const carrito = new Schema({
    cantidad:{
        type:Number,
        defaul:1,
        required:true
    },precioTotal:{
        type:Number,
        required:true
    },producto:{
        type: Schema.Types.ObjectId
    },usuario:{
        type: Schema.Types.ObjectId, ref: 'usuarios',
    }
})

module.exports= model ('carrito',carrito);
