import pedido from '../models/pedido.model.js';
import carrito from '../models/carrito.model.js'
import mongoose from 'mongoose';

 
export const agrePedido = async(req,res)=>{
    try{
        const {idUsuario,totalFinal} = req.body;
        const ObjectId = mongoose.Types.ObjectId;

        const obtCarrito = await carrito.aggregate([
          {
            $match: { usuario: new ObjectId(idUsuario) },
          },
        ]);
        

        console.log('Resultado de la consulta:', obtCarrito);
         const Carrito = obtCarrito
        //  res.json(Carrito)
        const newPedido = new pedido({
            carrito:Carrito,totalFinal
        })
        await newPedido.save();
        res.json({newPedido})
        // res.json({msg:'el pedido se cargo correctamente',newPedido});

    }catch(error){
        console.log(error)
    }
}
export const ediPedido = async (req, res) => {
    try {
        const { idPedido } = req.params;
        const { isComplete } = req.body; 

        const obtePedido = await pedido.findById(idPedido); 

        console.log(obtePedido)
        
        if (!obtePedido) {
            return res.status(404).json({ msg: 'El pedido no se encuentra registrado' }); 
        }

        // Crear un objeto con el campo que se va a actualizar
        const pedidoEdit = {
            isComplete: isComplete
        };

        // // Actualiza el pedido con el nuevo valor de isComplete
        const resultado = await pedido.findByIdAndUpdate(idPedido, pedidoEdit, { new: true });

        if (resultado) {
            res.json({ msg: 'El pedido fue actualizado correctamente', pedido: resultado });
        } else {
            res.status(500).json({ msg: 'Error al actualizar el pedido' }); 
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ocurrió un error al procesar la solicitud' }); // Responde con un error genérico en caso de excepciones
    }
};
export const obtePedidos = async (req, res) => {
    try {
        // const { idPedido } = req.params;
        const pedidos = await pedido.find().select('carrito.producto');
        // const productos = pedidos.carrito.map(item => item.producto);
        // res.json(productos);
    

        const productos = Array.isArray(pedidos.carrito) ? pedidos.carrito.map(item => item.producto) : [];


        console.log(productos);
      } catch (error) {
        console.error(error);
        if (!res.headersSent) { 
          res.status(500).json({ error: 'Ocurrió un error al obtener los carritos' });
        }
      }
}
