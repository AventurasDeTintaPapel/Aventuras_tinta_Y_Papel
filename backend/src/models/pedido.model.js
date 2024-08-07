const {Schema,model}= require('mongoose'); 
const pedido = new Schema({
    carrito:{
        type:Schema.Types.ObjectId
    },
    isComplete:{
        type:String,
        required:true
    },fecha:{ type: Date, default: Date.now }
    

})

module.exports = model('pedido',pedido)