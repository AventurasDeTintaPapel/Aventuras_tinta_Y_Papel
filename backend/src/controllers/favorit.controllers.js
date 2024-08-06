const usuarios = require('../models/usuarios.model');
const producto = require('../models/productos.model');
const favoritos = require('../models/favorito.model')
const ctrl ={};
// Agregar un producto a favoritos
ctrl.agreFav = async (req, res) => {
    try {
        const { idUsuario } = req.params;
        const { idProducto } = req.body;
        
        const obtenerUsuario = await usuarios.findById(idUsuario);
        const obtenerProducto = await producto.findById(idProducto);

        const favorito = new favoritos({
            usuario: obtenerUsuario._id,
            producto: obtenerProducto._id
        });

        await favorito.save();
        res.json({ msg: 'Agregado a favoritos', favorito });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error al agregar el producto a favoritos' });
    }
};

// Obtener todos los favoritos
ctrl.obtFavotiros = async (req, res) => {
    try {
        const { id } = req.params;
        const ObjectId = require('mongoose').Types.ObjectId;
        const resultado = await favoritos.aggregate([
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
            { $unwind: "$usuarioInfo" },
          
        ]);

    res.status(200).json(resultado);
    console.log(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error al obtener los favoritos' });
    }
};

module.exports = ctrl