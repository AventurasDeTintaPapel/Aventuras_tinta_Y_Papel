import pedido from '../models/pedido.model.js';
import moongose from 'mongoose';

 
export const agrePedido = async(req,res)=>{
    try{
        const {idCarrito,isComplete,totalFinal}= req.body;
        const obtenerCarrito = await _findById(idCarrito)
        const newpedido = new pedido ({
            carrito:obtenerCarrito._id,
            isComplete,totalFinal
        })
        console.log(isComplete)
        await newpedido.save();
          res.json({ msg: 'El pedido fue cargado correctamente', pedido });
    }catch(error){
        console.log(error)
    }
}
export const ediPedido = async (req, res) => {
    try {
        const { idPedido } = req.params;
        const { isComplete } = req.body; 

        const obtePedido = await findById(idPedido); 
        
        if (!obtePedido) {
            return res.status(404).json({ msg: 'El pedido no se encuentra registrado' }); 
        }

        // Crear un objeto con el campo que se va a actualizar
        const pedidoEdit = {
            isComplete: isComplete
        };

        // Actualiza el pedido con el nuevo valor de isComplete
        const resultado = await findByIdAndUpdate(idPedido, pedidoEdit, { new: true });

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
export const obtePedido = async (req, res) => {
    try {
        const { idPedido } = req.params;
        const ObjectId = moongose.Types.ObjectId;
    
        const result = await pedido.aggregate([
        {
            $lookup: {
                from: "carritos",
                localField: "carrito",
                foreignField: "_id",
                as: "carritoInfo"
            }
        },
            { $unwind: "$carritoInfo" }
        ]);

    
        res.status(200).json(result);
        console.log(result);
      } catch (error) {
        console.error(error);
        if (!res.headersSent) { 
          res.status(500).json({ error: 'Ocurrió un error al obtener los carritos' });
        }
      }
}
