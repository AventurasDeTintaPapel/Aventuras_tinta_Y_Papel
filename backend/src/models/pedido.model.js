const {Schema,model}= require('mongoose'); 
const pedido = new Schema({
    carrito:{
        type:Schema.Types.ObjectId
    },totalFinal:{
        type:Number,
        required:true
    },
    isComplete:{
        type:String,
        required:true
    },fecha:{ type: Date, default: Date.now }
    

})

module.exports = model('pedido',pedido)