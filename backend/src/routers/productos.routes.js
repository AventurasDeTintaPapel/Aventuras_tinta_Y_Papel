const {cargarProducto,obtenerProducto,editarProducto,eliminarProducto}= require('../controllers/productos.controllers');
const subirImagen = require('../../middlewares/storage')
const router = require('express').Router();

//ruta para cargar los productos
router.post('/cargar',subirImagen.single('imagen'),cargarProducto);
//ruta para obtener los productos
router.get('/productos',obtenerProducto);
//ruta para obtener por id
router.get('/productos/:id',obtenerProducto);
//ruta para eliminar productos
router.delete('/eliminar/:id',eliminarProducto);
router.post('/editar/:id', subirImagen.single('imagen'),editarProducto)



module.exports = router;