const carrito = require('../models/carrito.model');
const usuarios = require('../models/usuarios.model');
const producto = require('../models/productos.model');
const ctrl = {};

// Agregar un producto al carrito
ctrl.agreCarrito = async (req, res) => {
    try {
        const { cantidad, idProducto } = req.body;
        const { idUsuario } = req.params;
        
        const obtenerUsuario = await usuarios.findById(idUsuario);
        const obtenerProducto = await producto.findById(idProducto);


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
        }= req.body;
        const { idProducto} = req.params;
        const productoEncontrado = await carrito.findOne({
            producto:idProducto
        })

        const carritoEdit = ({
            cantidad,
        })
        const result = await carrito.findByIdAndUpdate(productoEncontrado, carritoEdit, { new: true });
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
    try {
        const { id } = req.params;
        const ObjectId = require('mongoose').Types.ObjectId;
            const result = await carrito.aggregate([
                {
                    $match: { usuario: new ObjectId(id) }
                },
                {
                    $lookup: {
                        from: "productos",
                        localField: "producto",
                        foreignField: "_id",
                        as: "productoInfo"
                    }
                },  {
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
        res.status(500).json({ error: 'Ocurrió un error al obtener los carritos' });
    }
};


module.exports = ctrl;
