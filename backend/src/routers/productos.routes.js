const {cargarProducto,obtenerProducto}= require('../controllers/productos.controllers');
const subirImagen = require('../../middlewares/storage')
const router = require('express').Router();

//ruta para cargar los productos
router.post('/cargar',subirImagen.single('imagen'),cargarProducto);
router.get('/productos',obtenerProducto)

module.exports = router;