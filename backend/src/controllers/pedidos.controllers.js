const pedido = require('../models/pedido.model');
const moongose = require('mongoose');
const carrito = require('../models/carrito.model')

const crtl = {};
crtl.agrePedido = async(req,res)=>{
    try{
        const {idCarrito}= req.params;
        const obtenerCarrito = await carrito.findById(idCarrito)
        const {isComplete}= req.body
        const newpedido = new pedido ({
            carrito:obtenerCarrito._id,
            isComplete
        })
        console.log(isComplete)
        await newpedido.save();
          res.json({ msg: 'El carrito fue cargado correctamente', pedido });
    }catch(error){
        console.log(error)
    }
}

module.exports = crtl