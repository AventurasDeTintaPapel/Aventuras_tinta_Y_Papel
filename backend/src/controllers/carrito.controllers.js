const carrito = require('../models/carrito.model');
const mongoose = require('mongoose');
const usuarios = require('../models/usuarios.model');
const producto = require('../models/productos.model');
const ctrl = {};

// Agregar un producto al carrito
ctrl.agreCarrito = async (req, res) => {
    try {
        const { cantidad, idProducto,precioTota } = req.body;
        const { idUsuario } = req.params;
        
        const obtenerUsuario = await usuarios.findById(idUsuario);
        const obtenerProducto = await producto.findById(idProducto);
        // if(productoAgregado){
        //   res.json({msg:'el producto ya se encuentra dentro de su carrito'})
        // }else{
          const newCarrito = new carrito({
            usuario: obtenerUsuario._id,
            producto: obtenerProducto._id,
            cantidad,
            });
          await newCarrito.save();
          res.json({ msg: 'El carrito fue cargado correctamente', newCarrito });
        
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error al agregar el producto al carrito' });
    }
};
ctrl.editarCarrito = async(req,res)=>{
    try{
        const{
            cantidad,
            precioTotal
        }= req.body;
        const { id} = req.params;
          const carritoEncontrado = await carrito.findById(id);
        if(!carritoEncontrado){
          console.log('no encontrado')
        }
        const carritoEdit = ({
            cantidad,
            precioTotal
        })
        console.log(carritoEncontrado)
        const result = await carrito.findByIdAndUpdate(carritoEncontrado, carritoEdit, { new: true });
        if(result){
            res.status(200).json({msg:'el carrito fue actualizado correctamente'});
        }else{
            res.status(404).json({msg:'error al actualizar el carrito'})
        }
    }catch(error){
        console.log('ocurrio un error al editar el carrito',error)
    }
}
ctrl.eliminarCarrito = async(req,res)=>{
    try{
        const {id}= req.params;
        const resultado = await carrito.findByIdAndDelete(id);
    
        if(resultado){
            res.status(200).json({msg:'producto eliminado correctamente del carrito'});
        }else{
            res.status(400).json({msg:'no hay ningun producto añadido al carrito'});
        }
    }catch(error){
        console.log(error);
        
    }
    
}


// Obtener todos los carritos
ctrl.obteCarrito = async (req, res) => {
        // const obtenerCarri = await carrito.find();
        // res.json(obtenerCarri);
        try {
            const { idUsuario } = req.params;
            const ObjectId = mongoose.Types.ObjectId;


            // if (!ObjectId.isValid(idUsuario)) {
            //   return res.status(400).json({ error: 'ID de usuario no válido' });
            // }
        
            const result = await carrito.aggregate([
              {
                $match: { usuario: new ObjectId(idUsuario) }
              },
              {
                $lookup: {
                  from: "productos",
                  localField: "producto",
                  foreignField: "_id",
                  as: "productoInfo"
                }
              },
              {
                $lookup: {
                  from: "usuarios",
                  localField: "usuario",
                  foreignField: "_id",
                  as: "usuarioInfo"
                }
              },
              { $unwind: "$productoInfo" },
              { $unwind: "$usuarioInfo" }
            ]);
    
        
            res.status(200).json(result);
            console.log(result);
          } catch (error) {
            console.error(error);
            if (!res.headersSent) { // Verifica si los encabezados ya han sido enviados
              res.status(500).json({ error: 'Ocurrió un error al obtener los carritos' });
            }
          }
        }
        



module.exports = ctrl;
