const carrito = require('../models/carri_Y_fav.model');
const usuarios = require('../models/usuarios.model');
const producto = require('../models/productos.model');
const favoritos = require('../models/favorito.model');
const mongoose = require('mongoose')
const ctrl = {};

// Agregar un producto al carrito
ctrl.agreCarrito = async (req, res) => {
    try {
        const { cantidad, idProducto } = req.body;
        const { idUsuario } = req.params;
        
        const obtenerUsuario = await usuarios.findById(idUsuario);
        const obtenerProducto = await producto.findById(idProducto);

        if (!obtenerUsuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        if (!obtenerProducto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const newCarrito = new carrito({
            usuario: obtenerUsuario._id,
            producto: obtenerProducto._id,
            cantidad
        });

        await newCarrito.save();
        res.json({ msg: 'El carrito fue cargado correctamente', newCarrito });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error al agregar el producto al carrito' });
    }
};

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
// Agregar un producto a favoritos
ctrl.agreFav = async (req, res) => {
    try {
        const { idUsuario } = req.params;
        const { idProducto } = req.body;
        
        const obtenerUsuario = await usuarios.findById(idUsuario);
        const obtenerProducto = await producto.findById(idProducto);

        if (!obtenerUsuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        if (!obtenerProducto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

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

module.exports = ctrl;
