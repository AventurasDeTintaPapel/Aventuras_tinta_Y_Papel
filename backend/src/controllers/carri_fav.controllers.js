const carrito = require('../models/carri_Y_fav.model');
const usuarios = require('../models/usuarios.model');
const producto = require('../models/productos.model');
const favoritos = require('../models/favorito.model');
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
ctrl.obtener = async (req, res) => {
    try {
        const obtenerCarri = await carrito.find();
        res.json(obtenerCarri);
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
ctrl.favoritos = async (req, res) => {
    try {
        const mostrarFavs = await favoritos.find();
        res.json(mostrarFavs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error al obtener los favoritos' });
    }
};

module.exports = ctrl;
